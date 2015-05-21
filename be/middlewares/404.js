var path = require('path');
var page_404 = path.join(__dirname, '../../fe/dist/404.html');
var send = require('koa-send');

module.exports = function() {
    'use strict'
    return function* page_not_found(next) {
        yield next;

        if(this.status != 404) return;
        this.status = 404;
        console.log(page_404)

        switch(this.accepts('html', 'json')) {
            case 'html':
                yield send(this, page_404);
                break;
            case 'json':
                this.body = {
                    message: 'Page not found'
                };
                break;
            default:
                this.type = 'text';
                this.body = 'Page not found';
        }
    }
}
