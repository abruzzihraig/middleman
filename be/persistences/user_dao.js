var r = require('rethinkdbdash')();
var db_name = 'man';
var user_table = 'users';

module.exports = {
    find_by_properties: function* find_by_porperties(obj) {
        return yield r.db('man').table('users').filter(obj).run();
    },

    find_by_id: function* find_by_id(user_id) {
        return yield r.db('man').table('users').get(user_id).run();
    },

    add_user: function* add_user(obj) {
        return yield r.db('man').table('users').insert(obj).run();
    },

    update_user: function* update_user(user_id, obj) {
        return yield r.db('man').table('users').get(user_id).update(obj).run();
    },

    is_duplicate: function* is_duplicate(obj){
        return !!(yield r.db('man').table('users').filter(obj).count().run());
    },

    update_token: function* update_token(user_id, token) {
        return yield r.db('man').table('users').get(user_id).update({token: token}).run();
    }
}
