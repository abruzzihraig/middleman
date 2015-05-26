var config = require('../config');
var jwt = require('koa-jwt')({secret: config.JWT_SECRET, key: 'jwtdata'});

module.exports = function() {
    'use strict'
    return function* jwt_intercepter(next) {
        if (this.url.match(/^\/api/)) {
            try {
                // hack koa-jwt here to make it work from inner of intercepter
                yield* jwt.call(this, Promise.resolve());
            } catch (err) {
                // 401 unauthorized
                this.status = err.status;
                this.body = err.message;
            }
        }
        yield next;
    }
}
