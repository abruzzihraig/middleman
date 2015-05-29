var auth_service = require('../services/auth_service');
var router = new require('koa-router')({
    prefix: '/public/v1/user'
});

router
.post(
    '/login',
    auth_service.validate_user,
    auth_service.sign_user,
    auth_service.update_token
)
.post(
    '/signup',
    auth_service.check_duplicate_user,
    auth_service.signup,
    auth_service.sign_user,
    auth_service.update_token
)

module.exports = router.routes();
