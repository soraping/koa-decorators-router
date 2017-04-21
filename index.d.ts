import * as Koa from 'koa';

declare interface routerConfig{
    method: string,
    path: string
}

declare interface RouteConfig{
    //koa实例
    app: Koa,
    //api文件夹的相对路径
    apiDirPath: string
}

declare namespace koa_decorators_router {

    export class Route{
        constructor(opt: RouteConfig)
        registerRouters(): ()=>void; 
    }
    //修饰类的路由方法
    export function controller(path: string): Function;
    //全router写法
    export function router(opt: routerConfig): Function;
    //get请求
    export function get(path: string): Function;
    //post
    export function post(path: string): Function;
    //delete
    export function del(path: string): Function;
    //put
    export function put(path: string): Function;

}

export = koa_decorators_router;