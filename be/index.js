var path = require('path');
var app = require('koa')();
var router = require('koa-router')();
var serve = require('koa-static');
var jwt = require('koa-jwt');
var logger = require('koa-logger')();
var parser = require('koa-bodyparser')();
var err_pages = require('./middlewares/err_pages');
var intercepter = require('./middlewares/intercepter')();
var app_path = path.join(__dirname, '../fe/dist');
var r = require('rethinkdbdash')();

app.use(logger);
app.use(parser);
app.use(intercepter);



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
