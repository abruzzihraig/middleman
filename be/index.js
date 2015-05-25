var app = require('koa')();
var router = require('koa-router')();
var serve = require('koa-static');
var path = require('path');
var parser = require('koa-bodyparser')();
var err_pages = require('./middlewares/404');
var app_path = path.join(__dirname, '../fe/dist');
var r = require('rethinkdbdash')();

app.use(parser);

router.get('/test', function*(next) {
    this.body = 'test API';
})

router.post('/user/rigister', function*(next) {
    try {
        var all_users = yield r.db('man').table('users').run();
        this.body = yield r.db('man').table('users').insert(this.request.body);
    } catch (err) {
        this.status = 500;
        this.body = {err: err};
    }
})

app.use(err_pages());
app.use(router.routes());
app.use(serve(app_path));
app.listen(3000);
console.log('koa is listening on 3000 port');
