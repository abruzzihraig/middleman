import path from 'path';
import koa from 'koa';
import scheme from 'koa-scheme';
import serve from 'koa-static';
import logger from 'koa-logger';
import parser from 'koa-bodyparser';
import router from './routers';
import {err_pages} from './middlewares/err_pages';
import {jwt_intercepter} from './middlewares/intercepter';
import rules from './routers/rules';
import {SERVER_PORT as port, APP_PATH as fe_root} from './config';

koa()
.use(logger())
.use(parser())
.use(err_pages())
.use(jwt_intercepter)
.use(scheme(rules, {debug: true}))
.use(router)
.use(serve(fe_root))
.listen(port);

console.info(`koa is listening on ${port} port`);
