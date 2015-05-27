var config = require('./config'),
    path = require('path'),
    app = require('koa')(),
    rules = require('./routers/rules'),
    scheme = require('koa-scheme')(rules, {debug: true}),
    serve = require('koa-static')(config.APP_PATH),
    logger = require('koa-logger')(),
    parser = require('koa-bodyparser')(),
    err_pages = require('./middlewares/err_pages')(),
    intercepter = require('./middlewares/intercepter')(),
    router = require('./routers')();

app.use(logger)
    .use(parser)
    .use(err_pages)
    .use(intercepter)
    .use(scheme)
    .use(router)
    .use(serve)
    .listen(3000);

console.log('koa is listening on 3000 port');
