var koa = require('koa');
var serve = require('koa-static');
var path = require('path');
var err_pages = require('./middlewares/404');
var app_path = path.join(__dirname, '../../fe/dist');
var app = koa();

app.use(err_pages());
app.use(serve(app_path));
app.listen(3000);
console.log('koa is listening on 3000 port');
