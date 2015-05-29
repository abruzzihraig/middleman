import compose from 'koa-compose';
import global_router from './global_router';
import user_router from './user_router';
import channel_router from './channel_router';

export default compose([user_router, channel_router, global_router]);
