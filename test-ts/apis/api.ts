import * as Koa from 'koa';
import { 
    controller,
    router,
    get,
    post,
    put,
    del
 } from '../../index';
@controller('user')
class User{
    @get('list')
    async getlist(ctx: Koa.Context): Promise<void>{}
}