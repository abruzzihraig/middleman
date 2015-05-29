import path from 'path';
import send from 'koa-send';
import compose from 'koa-compose';
import {PAGE_404 as page_404} from '../config';

export function err_pages() {
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
                    this.body = `<p>${this.body}</p>`
                    break;
                case 'json':
                    this.body = {
                        message: this.body || 'User with unauthorized token'
                    };
                    break;
                default:
                    this.type = 'text';
                    this.body = this.body || 'User with unauthorized token';
            }
        }
    ]);
}
