var user_dao = require('../persistences/user_dao');
var jwt = require('koa-jwt');
var config = require('../config');

module.exports = {
    validate_user: function* validate_user(next) {
        var obj = {
            username: this.request.body.username,
            password: this.request.body.psw
        }

        var result = yield* user_dao.find_by_properties(obj)

        if(result.length < 1) {
            this.status = 401;
            return this.body = 'Login faild, either username or password was wrong'
        }

        this.request.body.userid = result[0].id;
        yield next;
    },

    reset_token: function* reset_token() {
        // TODO filter the playload
        var playload = this.request.body;

        this.request.body.token = jwt.sign(playload, config.JWT_SECRET, {expiresInSeconds: config.JWT_EXPIRES});
        yield* user_dao.update_token(this.request.body.userid, this.request.body.token)

        this.status = 202;
        this.body = {token: this.request.body.token};
    },

    check_duplicate_user: function* check_duplicate_user(next) {
        var is_duplicate = yield* user_dao.is_duplicate({username: this.request.body.username});
        if (is_duplicate) {
            this.status = 409 // resource conflict
            return this.body = {message: 'The username has already existed'};
        }
        yield next;
    },

    signup: function* signup() {
        this.request.body.token = jwt.sign(this.request.body, config.JWT_SECRET, {expiresInSeconds: config.JWT_EXPIRES});
        yield* user_dao.add_user(this.request.body);

        this.body = {
            token: this.request.body.token,
            message: 'signup successfully'
        };
    }
}
