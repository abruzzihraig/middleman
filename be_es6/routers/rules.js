import validator from 'validator';
import _ from 'underscore';
import user_rules from './user_rules';
import global_rules from './global_rules';

export var rules = _.extend({}, user_rules, global_rules);
