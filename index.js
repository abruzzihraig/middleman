var koa = require('koa');
var serve = require('koa-static');
var path = require('path');
var app_path = path.join(__dirname, 'fe', 'dist');
var app = koa();

app.use(serve(app_path));
app.listen(3000);
