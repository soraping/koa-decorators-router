import * as Koa from 'koa';
import { Route , SymbolRoutePrefix} from './Route.class';
import {
    normalizePath,
    isArray
} from './utils'

//记录请求数
let requestID = 0;

/**
 * 修饰api类
 * @controller('/user')
 * class User{}
 */
export const controller = (path: string):Function => {
    return (target: any) => {
        target.prototype[SymbolRoutePrefix] = path;
    }
}

export interface routerConfig {
    method: string;
    path: string;
}

/**
 * 方法的路由
 * @router({
 *     method: 'get',
 *     path: '/list'
 * })
 */
export const router = (config: routerConfig): Function => {
    return (target: any, name: string, value: ParameterDecorator) => {
        config.path = normalizePath(config.path);
        //设置静态值
        Route._DecoratedRouters.set({
            target: target,
            ...config
        }, target[name])
    }
}

export const get = (path: string) => {
    return router({
        method: 'get',
        path: path
    })
}

export const post = (path: string) => {
    return router({
        method: 'post',
        path: path
    })
}

export const put = (path: string) => {
    return router({
        method: 'put',
        path: path
    })
}

export const del = (path: string) => {
    return router({
        method: 'delete',
        path: path
    })
}

/**
 * 挂载自定义的中间件方法
 */
export const convert = (convert: (ctx: Koa.Context, next: any)=>Promise<any>) => {
    return (...args: any[]) => {
        return Decorate(
            args,
            convert
        )
    }
}

/**
 * 挂载接口日志
 */
export const log = () => {
    return (...args: any[]) => {
        return Decorate(
            args,
            async (ctx: Koa.Context, next: any) => {
                //请求数加1
                let currentRequestID = requestID++;
            
                //请求开始时间
                const startTime = process.hrtime();
                console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${ctx.url}`);
                if((ctx.method).toLowerCase()  == 'post'){
                    console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${JSON.stringify(ctx.request.body)}`);
                }
                await next();
            
                //返回response结束时间
                const endTime = process.hrtime();
                //计算进程总时间
                const elapsed = (endTime[0]-startTime[0]) * 1000 + (endTime[1]-startTime[1]) / 1000000;
                console.log(`← (ID:${currentRequestID}) ${ctx.method} ${ctx.url} : Status(${ctx.status}) Time(${elapsed.toFixed(0)}ms)`);
            
            }
        )
    }
}

export interface requiredConfig{
    params?: string | string[],
    query?: string | string[]
}

/**
 * get请求URL必传参数校验
 * @required({params: 'username'})
 * @required({params: ['username','age']})
 * @required({query: 'username'})
 */
export const required = (rules: requiredConfig) => {
    return (...args: any[]) => {
        return Decorate(
            args,
            async (ctx: Koa.Context, next: any) => {
            if(rules.query){
                rules.query = isArray(rules.query);
                for (let name of rules.query) {
                    if (!ctx.query[name]) ctx.throw(412, `GET Request query: ${name} required`);
                }
            }
            if (rules.params) {
                rules.params = isArray(rules.params);
                for (let name of rules.params) {
                    if (!ctx.params[name]) ctx.throw(412, `GET Request params: ${name} required`);
                }
            }
            await next();
        })
    }
}

/**
 * 挂在中间件执行函数
 */
function Decorate(args: any[], middleware: (ctx: Koa.Context, next: any)=>Promise<any>): ParameterDecorator{
    let [target,name,descriptor] = args;
    target[name] = isArray(target[name]);
    target[name].unshift(middleware)
    return descriptor;
}
