import {clean_token, validate_origin_psw, check_new_psw, change_psw} from '../services/auth_service';
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
    validate_origin_psw,
    check_new_psw,
    change_psw
)
.routes();
