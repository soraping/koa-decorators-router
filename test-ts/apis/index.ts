import * as Koa from 'koa';
import { 
    controller,
    router,
    required,
    get,
    post,
    put,
    del
 } from '../../index';
@controller('userPath')
class User{
    @get('list')
    async getlist(ctx: Koa.Context): Promise<void>{
        ctx.body = 'ok'
    }

    @get('query')
    @required({
        query: 'q'
    })
    async getQueryList(ctx: Koa.Context): Promise<void>{
        ctx.body = ctx.query.q
    }

    @get('detail/:id')
    @required({
        params: 'id'
    })
    async getDetail(ctx: Koa.Context): Promise<void>{
        ctx.body = ctx.params.id;
    }

    @put('upd/:id')
    @required({
        params: 'id'
    })
    async updId(ctx: Koa.Context): Promise<void>{
        ctx.body = ctx.params.id;
    }

    @post('reqPost')
    @required({
        body: {
            username: 'string',
            age: 'number'
        }
    })
    async postValue(ctx: Koa.Context) : Promise<void> {
        let body = ctx.request.body;
        ctx.body = body;
    }

}