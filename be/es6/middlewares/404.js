module.exports = function() {
    'use strict'
    return function* page_not_found(next) {
        yield next;

        if(this.status != 404) return;
        this.status = 404;

        switch(this.accepts('html', 'json')) {
            case 'html':
                this.type = 'html';
                this.body = '<p>Page not found</p>';
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
