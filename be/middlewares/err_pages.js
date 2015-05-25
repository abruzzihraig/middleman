var path = require('path');
var page_404 = path.join(__dirname, '../../fe/dist/404.html');
var send = require('koa-send');
var compose = require('koa-compose');

module.exports = function() {
    'use strict'
    return compose([
        function* page_not_found(next) {
            yield next;

            if(this.status != 404) return;
            this.status = 404;

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
        },

        function* unauthorized(next) {
            yield next;
            if(this.status != 401) return;
            this.status = 401;

            switch(this.accepts('html', 'json')) {
                case 'html':
                    this.body = '<p>User with unauthorized token\n</p>'
                    break;
                case 'json':
                    this.body = {
                        message: 'User with unauthorized token'
                    };
                    break;
                default:
                    this.type = 'text';
                    this.body = 'User with unauthorized token';
            }
        }
    ]);
}
