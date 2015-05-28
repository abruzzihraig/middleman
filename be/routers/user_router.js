var r = require('rethinkdbdash')();
var auth_service = require('../services/auth_service');
var router = new require('koa-router')({
    prefix: '/api/v1/user'
});

router
.get('/test', function*(next) {
    this.body = {message: 'user API'};
})
.put(
    '/logout',
    auth_service.clean_token
)
.put(
    '/password',
    auth_service.validate_origin_psw,
    auth_service.check_new_psw,
    auth_service.change_psw
)

module.exports = router.routes();
