import path from 'path';

export const SERVER_PORT = 3000;

export const APP_PATH = path.join(__dirname, '../fe/dist');

export const JWT_SECRET = 'middleman'; // rewrite a secret for signing your jwt

export const JWT_EXPIRES = 60*60*24; // 1 day expire in seconds

export const TOKEN_REACT = 60*60; // reset token if an user is active in one hour left to expires

export const PAGE_404 = path.join(__dirname, '../fe/dist/404.html');

export const DATABASE = 'xxx';

export const r = rethinkdbdash().db('xxx');
