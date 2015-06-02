import jwt from 'koa-jwt';
import pass from 'pwd';
import User_repo from '../repositories/user_repo';
import {JWT_SECRET as secret, JWT_EXPIRES as token_expires} from '../config';

let user_repo = new User_repo();

export function* encrypt_pwd(next) {
    var pwd = this.request.body.pwd;
    yield new Promise((resolve, reject) => {
        pass.hash(pwd, (err, salt, hash) => {
            if (err) reject(err);
            this.request.body.pwd = hash;
            this.request.body.salt = salt;
            resolve({salt, hash})
        })
    })
    yield next;
}

export function* verify_pwd(next) {
    var pwd = this.request.body.pwd;
    var salt = this.state.user.salt;

    var is_valid = yield new Promise((resolve, reject) => {
        pass.hash(pwd, salt, (err, hash) => {
            if (err) reject(err);
            resolve(this.state.user.pwd === hash);
        })
    })

    if(is_valid) return yield next;

    this.status = 401; // TODO
    return this.body = 'Login faild, either username or password was wrong';
}

export function* verify_original_pwd(next) {
    var oldpwd = this.request.body.oldpwd;
    var salt = this.state.user.salt;

    var is_valid = yield new Promise((resolve, reject) => {
        pass.hash(oldpwd, salt, (err, hash) => {
            if (err) reject(err);
            resolve(this.state.user.pwd === hash);
        })
    })

    if(is_valid) return yield next;

    this.status = 401; // TODO
    return this.body = 'original password was wrong';
}

export function* verify_username(next) {
    var username = this.request.body.username;
    var result = yield* user_repo.find_by_properties({username});

    if(result.length !== 1) {
        this.status = 401;
        return this.body = 'Login faild, either username or password was wrong';
    }

    this.state.user = result[0];
    yield next;
}

export function* sign_user(next) {
    // TODO filter the playload
    var playload = this.state.user;

    delete this.state.user.token;
    delete this.state.user.pwd;
    delete this.state.user.salt;
    this.state.user.token = jwt.sign(this.state.user, secret, {expiresInSeconds: token_expires});
    yield next;
}

export function* update_token() {
    // mainly update token
    yield* user_repo.update_entity(this.state.user.userid, this.state.user);

    this.status = 202;
    this.body = {token: this.state.user.token};
}

export function* check_duplicate_user(next) {
    var is_duplicate = yield* user_repo.is_exist({username: this.request.body.username});
    if (is_duplicate) {
        this.status = 409 // resource conflict
        return this.body = {message: 'The username has already existed'};
    }

    yield next;
}

export function* signup(next) {
    this.state.user = {
        username: this.request.body.username,
        pwd: this.request.body.pwd,
        salt: this.request.body.salt
    };

    var result = yield* user_repo.add_entity(this.state.user);
    this.state.user.userid = result.generated_keys[0];
    yield next;

    this.body = {
        token: this.state.user.token,
        message: 'signup successfully'
    };
}

export function* clean_token() {
    var result = yield* user_repo.update_token(this.state.user.userid, '');
    if (result.replaced) {
        this.body = {message: 'logout successfully'};
    }
}

// when a middleware need more user information
export function* find_user_data(next) {
    this.state.user = yield* user_repo.find_by_id(this.state.user.userid);
    yield next;
}

export function* verify_original_pwd(next) {
    var oldpwd = this.request.body.oldpwd;
    var salt = this.state.user.salt;

    var is_valid = yield new Promise((resolve, reject) => {
        pass.hash(oldpwd, salt, (err, hash) => {
            if (err) reject(err);
            resolve(this.state.user.pwd === hash);
        })
    })

    if(is_valid) return yield next;

    this.status = 401; // TODO
    return this.body = 'original password was wrong';
}

export function* unify_pwd_twice(next) {
    if (this.request.body.pwd === this.request.body.confirmpwd) return yield next;

    this.status = 403; //TODO
    this.body = {message: 'password twice were inconsistency'};
}

export function* update_pwd() {
    var result = yield* user_repo.update_entity(this.state.user.userid, {pwd: this.request.body.pwd, salt: this.request.body.salt});

    if (result.replaced) {
        this.body = {message: 'password was changed successfully'};
    }
}
