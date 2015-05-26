var path = require('path');

'use strict'
module.exports = {
    APP_PATH: path.join(__dirname, '../fe/dist'),
    JWT_SECRET: 'middleman',
    JWT_EXPIRES: 60*60*24 // 1 day expire in seconds
}
