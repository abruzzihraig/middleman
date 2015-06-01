import Repo_base from './repo_base';
const table_name = 'user';

export default class extends Repo_base {
    constructor() {
        super(table_name);
    }

    *update_token(user_id, token) {
        return yield* super.update_entity(user_id, {token: token});
    }
}
