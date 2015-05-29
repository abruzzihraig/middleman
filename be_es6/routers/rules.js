import validator from 'validator';

module.exports = {
    '/public/v1/user/login': {
        request: {
            method: 'POST',
            body: {
                username: validator.isEmail,
                psw: /\w{6,10}/
            }
        }
    }
}
