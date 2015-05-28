var r = require('rethinkdbdash')();
var config = require('../config');
var jwt = require('koa-jwt');
var update_token = require('../middlewares/token').update_token;
var user_service = require('../services/user_service');
var router = new require('koa-router')({
    prefix: '/public/v1/user'
});

router.post('/login', user_service.validate_user, user_service.reset_token);

router.post('/signup', user_service.check_duplicate_user, user_service.signup);

module.exports = router.routes();
