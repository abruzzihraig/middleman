import jwt from 'koa-jwt';
import {update_token} from '../services/auth_service';
import {JWT_SECRET as secret, TOKEN_REACT as react} from '../config';

export function* jwt_intercepter(next) {
    if (!this.url.match(/^\/api/)) return yield next;

    // hack koa-jwt here to make it work from inner of intercepter
    yield* jwt({secret, key: 'user'}).call(this, Promise.resolve());

    yield next;

    if(!this.body || this.url.match(/\/logout$/)) return;

    // TODO
    // reset token if an user is actived in one hour left to expires
    var cur_time = parseInt(new Date().getTime() / 1000);
    if (this.state.user.exp - cur_time < react) {
        this.body['token'] = yield* update_token.call(this);
    }
}
