'use strict';

module.exports = function () {
    'use strict';
    return regeneratorRuntime.mark(function page_not_found(next) {
        return regeneratorRuntime.wrap(function page_not_found$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return next;

                case 2:
                    if (!(this.status != 404)) {
                        context$2$0.next = 4;
                        break;
                    }

                    return context$2$0.abrupt('return');

                case 4:
                    this.status = 404;

                    context$2$0.t0 = this.accepts('html', 'json');
                    context$2$0.next = context$2$0.t0 === 'html' ? 8 : context$2$0.t0 === 'json' ? 11 : 13;
                    break;

                case 8:
                    this.type = 'html';
                    this.body = '<p>Page not found</p>';
                    return context$2$0.abrupt('break', 15);

                case 11:
                    this.body = {
                        message: 'Page not found'
                    };
                    return context$2$0.abrupt('break', 15);

                case 13:
                    this.type = 'text';
                    this.body = 'Page not found';

                case 15:
                case 'end':
                    return context$2$0.stop();
            }
        }, page_not_found, this);
    });
};