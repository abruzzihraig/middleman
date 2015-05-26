var config = require('./config'),
    path = require('path'),
    app = require('koa')(),
    serve = require('koa-static')(config.APP_PATH),
    logger = require('koa-logger')(),
    parser = require('koa-bodyparser')(),
    err_pages = require('./middlewares/err_pages')(),
    intercepter = require('./middlewares/intercepter')(),
    router = require('./routers')();

app.use(logger)
    .use(parser)
    .use(intercepter)
    .use(err_pages)
    .use(router)
    .use(serve)
    .listen(3000);

console.log('koa is listening on 3000 port');
