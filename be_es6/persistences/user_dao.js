var r = require('rethinkdbdash')();
var db_name = 'man';
var user_table = 'user';

module.exports = {
    find_by_properties: function* find_by_porperties(obj) {
        return yield r.db('man').table('user').filter(obj).run();
    },

    find_by_id: function* find_by_id(user_id) {
        return yield r.db('man').table('user').get(user_id).run();
    },

    add_user: function* add_user(obj) {
        return yield r.db('man').table('user').insert(obj).run();
    },

    update_user: function* update_user(user_id, obj) {
        return yield r.db('man').table('user').get(user_id).update(obj).run();
    },

   is_exist: function* is_duplicate(obj){
        return !!(yield r.db('man').table('user').filter(obj).count().run());
    },

    update_token: function* update_token(user_id, token) {
        return yield* this.update_user(user_id, {token: token});
    }
}
