var app = require('koa')();
var router = require('koa-router')();
var serve = require('koa-static');
var path = require('path');
var err_pages = require('./middlewares/404');
var app_path = path.join(__dirname, '../fe/dist');

router.get('/test', function*(next) {
    this.body = 'test API';
})

app.use(err_pages());
app.use(router.routes());
app.use(serve(app_path));
app.listen(3000);
console.log('koa is listening on 3000 port');
