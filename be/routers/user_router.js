var r = require('rethinkdbdash')();
var router = new require('koa-router')({
    prefix: '/api/v1/user'
});

router.get('/test', function*(next) {
    this.body = {message: 'user API'};
})

router.put('/logout', function* clean_token() {
    var result = yield r.db('man').table('users').get(this.state.jwtdata.userid).update({token: ''}).run();
    this.body = {message: 'logout successfully'};
})

router.put('/password',
    function* validate_user(next) {
        var result = yield r.db('man').table('users').filter({username: this.state.jwtdata.username, password: this.request.body.oldpsw}).run();
        if(result.length < 1) {
            this.status = 401; //TODO
            return this.body = 'origin password was wrong';
        }

        yield next;
    },

    function* check_newpassword(next) {
        if (this.request.body.newpsw !== this.request.body.confirmpsw) {
            console.log(this.request.body.newpsw);
            console.log(this.request.body.confirmpsw);
            this.status = 403; //TODO
            return this.body = {message: 'password twice were inconsistency'}
        }
        yield next;
    },

    function* change_password() {
        yield r.db('man').table('users').get(this.state.jwtdata.userid).update({password: this.request.body.newpsw}).run();

        // TODO encrypt the password
        this.body = {message: 'password was changed successfully'};
    }
)

module.exports = router.routes();
