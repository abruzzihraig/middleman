import Router from 'koa-router';

var router = new Router({prefix: '/public/v1/channel'});

export default router
.get('/test', function*(next) {
    this.body = 'channel API';
})
.routes();
