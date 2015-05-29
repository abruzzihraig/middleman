var r = require('rethinkdbdash')();
var router = new require('koa-router')({
    prefix: '/api/v1/channel'
});

router.get('/test', function*(next) {
    this.body = 'channel API';
})

module.exports = router.routes();
