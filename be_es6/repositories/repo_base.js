import {R} from '../config';

export default class {
    constructor(table) {
        this.entity = R.table(table);
    }

    *find_by_id(id) {
        return yield this.entity.get(id).run();
    }

    *find_by_properties(obj) {
        return yield this.entity.filter(obj).run();
    }

    *add_entity(obj) {
        return yield this.entity.insert(obj).run();
    }

    *update_entity(id, obj) {
        return yield this.entity.get(id).update(obj).run();
    }

    *delete_entity(id) {
        return yield this.entity.delete(id).run();
    }

    *is_exist(obj) {
        return !!(yield this.entity.filter(obj).count().run());
    }
}
