import pass from 'pwd';
import {HASH_ITERATION as iterations} from '../config';
// make the hash slower
pass.iterations(iterations);

export function encrypt(pwd) {
    return new Promise((resolve, reject) => {
        pass.hash(pwd, (err, salt, hash) => {
            if (err) reject(err);
            resolve({salt, hash})
        })
    })
}

export function verify(salt, rawpwd, pwd) {
    return new Promise((resolve, reject) => {
        pass.hash(rawpwd, salt, (err, hash) => {
            if (err) reject(err);
            resolve(pwd === hash);
        })
    })
}
