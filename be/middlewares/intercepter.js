var jwt = require('koa-jwt')({secret: 'shared-secret'});

module.exports = function(app) {
    'use strict'
    return function* jwt_intercepter(next) {
        if (this.url.match(/^\/api/)) {
            try {
                yield* jwt.call(this);
            } catch (err) {
                // 401 unauthorized
                this.status = err.status;
                this.body = err.message;
            }
        }
        yield next;
    }
}
