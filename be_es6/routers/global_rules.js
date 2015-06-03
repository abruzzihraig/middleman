import validator from 'validator';
var prefix = '/public/v1/user';
var rules = {};

rules[`${prefix}/signup`] = {
    request: {
        method: 'POST',
        body: {
            username: validator.isEmail,
            pwd: /\w{8,20}/
        }
    }
}
rules[`${prefix}/login`] = {
    request: {
        method: 'POST',
        body: {
            username: validator.isEmail,
            pwd: /\w{8,20}/
        }
    }
}

export default rules;
