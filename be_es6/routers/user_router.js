import {clean_token, encrypt_pwd, verify_original_pwd, unify_pwd_twice, update_pwd, find_user_data} from '../services/auth_service';
import Router from 'koa-router';

var router = new Router({prefix: '/api/v1/user'});

export default router
.get('/test', function*(next) {
    this.body = {message: 'user API'};
})
.put(
    '/logout',
    clean_token
)
.put(
    '/password',
    unify_pwd_twice,
    find_user_data,
    verify_original_pwd,
    encrypt_pwd,
    update_pwd
)
.routes();
