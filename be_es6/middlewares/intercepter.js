var config = require('../config');
var jwt = require('koa-jwt');
var auth_service = require('../services/auth_service');

module.exports = function() {
    'use strict'
    return function* jwt_intercepter(next) {
        if (!this.url.match(/^\/api/)) return yield next;

        // hack koa-jwt here to make it work from inner of intercepter
        yield* jwt({secret: config.JWT_SECRET, key: 'user'}).call(this, Promise.resolve());

        yield next;

        if(!this.body || this.url.match(/\/logout$/)) return;

        // TODO
        // reset token if an user is actived in one hour left to expires
        var cur_time = parseInt(new Date().getTime() / 1000);
        if (this.state.user.exp - cur_time < config.TOKEN_REACT) {
            this.body['token'] = yield* auth_service.update_token.call(this);
        }
    }
}
