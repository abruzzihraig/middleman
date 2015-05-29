import {r} from '../config';
const user = r.table('user');

export function* find_by_properties(obj) {
    return yield user.filter(obj).run();
}

export function* find_by_id(user_id) {
    return yield user.get(user_id).run();
}

export function* add_user(obj) {
    return yield user.insert(obj).run();
}

export function* update_user(user_id, obj) {
    return yield user.get(user_id).update(obj).run();
}

export function* is_exist(obj){
    return !!(yield user.filter(obj).count().run());
}

export function* update_token(user_id, token) {
    return yield* this.update_user(user_id, {token: token});
}
