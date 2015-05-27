var path = require('path');

'use strict'
module.exports = {
    APP_PATH: path.join(__dirname, '../fe/dist'),

    JWT_SECRET: 'middleman', // rewrite a secret for signing your jwt

    JWT_EXPIRES: 60*60*24, // 1 day expire in seconds

    TOKEN_REACT: 60*60 // reset token if an user is active in one hour left to expires
}
