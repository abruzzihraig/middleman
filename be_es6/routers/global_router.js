import {validate_user, sign_user, update_token, check_duplicate_user, signup} from '../services/auth_service';
import Router from 'koa-router';

var router = new Router({prefix: '/public/v1/user'});

export default router
.post(
    '/login',
    encrypt_psw,
    validate_user,
    sign_user,
    update_token
)
.post(
    '/signup',
    check_duplicate_user,
    encrypt_psw,
    signup,
    sign_user,
    update_token
)
.routes();
