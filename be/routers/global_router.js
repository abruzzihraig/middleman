var r = require('rethinkdbdash')();
var config = require('../config');
var jwt = require('koa-jwt');
var update_token = require('../middlewares/token').update_token;
var router = new require('koa-router')({
    prefix: '/public/v1/user'
});

router.post('/login',
    function* validate_user(next) {
        var result = yield r.db('man').table('users').filter({username: this.request.body.username, password: this.request.body.password}).run();

        if(result.length < 1) {
            this.status = 401;
            return this.body = 'Login faild, either username or password was wrong'
        }

        this.request.body.userid = result[0].id;
        yield next;
    },
    function* reset_token() {
        this.request.body.token = yield* update_token(this.request.body, this.request.body.userid);

        this.status = 202;
        this.body = {token: this.request.body.token};
    }
)

router.post('/signup',
    function* check_duplidate_user(next) {
        var is_duplicate = yield r.db('man').table('users').filter({username: this.request.body.username}).count().run();

        if (is_duplicate) {
            this.status = 409 // resource conflict
            return this.body = {message: 'The username has already existed'};
        }
        yield next;
    },
    function* signup() {
        this.request.body.token = jwt.sign(this.request.body, config.JWT_SECRET, {expiresInSeconds: config.JWT_EXPIRES});
        yield r.db('man').table('users').insert(this.request.body);
        this.body = {message: 'signup successfully'};
    }
);

module.exports = router.routes();
