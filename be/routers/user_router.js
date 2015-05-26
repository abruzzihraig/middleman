var r = require('rethinkdbdash')();
var router = new require('koa-router')({
    prefix: '/public/v1/user'
});

router.get('/test', function*(next) {
    this.body = 'user API';
})

router.post('/rigister', function*(next) {
    try {
        var all_users = yield r.db('man').table('users').run();
        this.body = yield r.db('man').table('users').insert(this.request.body);
    } catch (err) {
        this.status = 500;
        this.body = {err: err};
    }
})

module.exports = router.routes();
