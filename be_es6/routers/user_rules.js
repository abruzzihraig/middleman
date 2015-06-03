import validator from 'validator';
var prefix = '/api/v1/user';
var rules = {};

rules[`${prefix}/password`] = {
    request: {
        method: 'PUT',
        body: {
            oldpwd: /\w{8,20/,
            pwd: /\w{8,20}/,
            confirmpwd: /\w{8,20}/
        }
    }
}

export default rules;
