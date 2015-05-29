var user_dao = require('../persistences/user_dao');
var jwt = require('koa-jwt');
var config = require('../config');

module.exports = {
    validate_user: function* validate_user(next) {
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
    },

    sign_user: function* sign_user(next) {
        // TODO filter the playload
        var playload = this.state.user;

        this.state.user.token = jwt.sign(this.state.user, config.JWT_SECRET, {expiresInSeconds: config.JWT_EXPIRES});
        yield next;
    },

    update_token: function* update_token() {
        // mainly update token
        yield* user_dao.update_user(this.state.user.userid, this.state.user);

        this.status = 202;
        this.body = {token: this.state.user.token};
    },

    check_duplicate_user: function* check_duplicate_user(next) {
        var is_duplicate = yield* user_dao.is_exist({username: this.request.body.username});
        if (is_duplicate) {
            this.status = 409 // resource conflict
            return this.body = {message: 'The username has already existed'};
        }

        yield next;
    },

    signup: function* signup(next) {
        this.state.user = {username: this.request.body.username, password: this.request.body.password};
        var result = yield* user_dao.add_user(this.state.user);
        this.state.user.userid = result.generated_keys[0];
        yield next;

        this.body = {
            token: this.state.user.token,
            message: 'signup successfully'
        };
    },

    clean_token: function* clean_token() {
        var result = yield* user_dao.update_token(this.state.user.userid, '');
        if (result.replaced) {
            this.body = {message: 'logout successfully'};
        }
    },

    validate_origin_psw: function* validate_origin_password(next) {
        var is_exist = yield* user_dao.is_exist({username: this.state.user.username, password: this.request.body.oldpsw})
        if (is_exist) return yield next;

        this.status = 401; //TODO
        return this.body = 'origin password was wrong';
    },

    check_new_psw: function* check_new_password(next) {
        if (this.request.body.newpsw === this.request.body.confirmpsw) return yield next;

        this.status = 403; //TODO
        this.body = {message: 'password twice were inconsistency'};
    },

    change_psw: function* change_password() {
        var result = yield* user_dao.update_user(this.state.user.userid, {password: this.request.body.newpsw});

        // TODO encrypt the password
        if (result.replaced) {
            this.body = {message: 'password was changed successfully'};
        }
    }
}
