var r = require('rethinkdbdash')();
var config = require('../config');
var jwt = require('koa-jwt');
var router = new require('koa-router')({
    prefix: '/public/v1/user'
});

router.post('/login',
    function* validate_user(next) {
        try {
            var result = yield r.db('man').table('users').filter({name: this.request.body.name, psw: this.request.body.psw}).run();
        } catch (err) {
            this.status = 500;
            this.body = {err: err};
        }

        if(result.length < 1) {
            this.status = 401;
            return this.body = 'Login faild, either username or password was wrong'
        }

        this.request.body.userid = result[0].id;
        yield next;
    },
    function* update_token(next) {
        try {
            this.request.body.token = jwt.sign(this.request.body, config.JWT_SECRET, {expiresInSeconds: config.JWT_EXPIRES});
            yield r.db('man').table('users').get(this.request.body.userid).update(this.request.body);
        } catch (err) {
            this.status = 500;
            this.body = {err: err};
        }

        this.status = 202;
        this.body = {token: this.request.body.token};
    }
)

router.post('/signup',
    function* check_duplidate_user(next) {
        try {
            var is_duplicate = yield r.db('man').table('users').filter({name: this.request.body.name}).count().run();
        } catch (err) {
            this.status = 500;
            this.body = {err: err};
        }

        if (is_duplicate) {
            this.status = 409 // resource conflict
            return this.body = {message: 'The username has already existed'};
        }
        yield next;
    },
    function* signup(next) {
        try {
            this.request.body.token = jwt.sign(this.request.body, config.JWT_SECRET,
                {expiresInSeconds: config.JWT_EXPIRES});
            this.body = yield r.db('man').table('users').insert(this.request.body);
        } catch (err) {
            this.status = 500;
            this.body = {err: err};
        }
    }
);

router.post('/logout', function*(next) {})

module.exports = router.routes();
