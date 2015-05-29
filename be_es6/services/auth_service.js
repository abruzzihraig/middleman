import jwt from 'koa-jwt';
import * as user_dao from '../persistences/user_dao';
import {JWT_SECRET as secret, JWT_EXPIRES as token_expires} from '../config';

export function* validate_user(next) {
    var obj = {
        username: this.request.body.username,
        password: this.request.body.psw
    }

    var result = yield* user_dao.find_by_properties(obj);

    if(result.length < 1) {
        this.status = 401;
        return this.body = 'Login faild, either username or password was wrong'
    }

    this.state.user = result[0];
    yield next;
}

export function* sign_user(next) {
    // TODO filter the playload
    var playload = this.state.user;

    delete this.state.user.token;
    this.state.user.token = jwt.sign(this.state.user, secret, {expiresInSeconds: token_expires});
    yield next;
}

export function* update_token() {
    // mainly update token
    yield* user_dao.update_user(this.state.user.userid, this.state.user);

    this.status = 202;
    this.body = {token: this.state.user.token};
}

export function* check_duplicate_user(next) {
    var is_duplicate = yield* user_dao.is_exist({username: this.request.body.username});
    if (is_duplicate) {
        this.status = 409 // resource conflict
        return this.body = {message: 'The username has already existed'};
    }

    yield next;
}

export function* signup(next) {
    this.state.user = {username: this.request.body.username, password: this.request.body.password};
    var result = yield* user_dao.add_user(this.state.user);
    this.state.user.userid = result.generated_keys[0];
    yield next;

    this.body = {
        token: this.state.user.token,
        message: 'signup successfully'
    };
}

export function* clean_token() {
    var result = yield* user_dao.update_token(this.state.user.userid, '');
    if (result.replaced) {
        this.body = {message: 'logout successfully'};
    }
}

export function* validate_origin_psw(next) {
    var is_exist = yield* user_dao.is_exist({username: this.state.user.username, password: this.request.body.oldpsw})
    if (is_exist) return yield next;

    this.status = 401; //TODO
    return this.body = 'origin password was wrong';
}

export function* check_new_psw(next) {
    if (this.request.body.newpsw === this.request.body.confirmpsw) return yield next;

    this.status = 403; //TODO
    this.body = {message: 'password twice were inconsistency'};
}

export function* change_psw() {
    var result = yield* user_dao.update_user(this.state.user.userid, {password: this.request.body.newpsw});

    // TODO encrypt the password
    if (result.replaced) {
        this.body = {message: 'password was changed successfully'};
    }
}
