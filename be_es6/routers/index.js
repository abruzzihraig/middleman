var compose = require('koa-compose');
var user_router = require('./user_router');
var channel_router = require('./channel_router');
var global_router = require('./global_router');

module.exports = function() {
    return compose([user_router, channel_router, global_router]);
}
