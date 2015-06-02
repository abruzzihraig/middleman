import validator from 'validator';

module.exports = {
    '/public/v1/user/login': {
        request: {
            method: 'POST',
            body: {
                username: validator.isEmail,
                pwd: /\w{6,10}/
            }
        }
    }
}
