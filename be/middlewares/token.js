var r = require('rethinkdbdash')();
var config = require('../config');
var jwt = require('koa-jwt');

module.exports.update_token = function* update_token(playload, user_id) {
    'use strict'
    var token = jwt.sign(playload, config.JWT_SECRET, {expiresInSeconds: config.JWT_EXPIRES});
    yield r.db('man').table('users').get(user_id).update({token: token}).run();
    return token;
}
