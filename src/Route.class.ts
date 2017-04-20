import { controller } from './decorators';
import * as path from 'path';
import * as Koa from 'koa';
import * as Router from 'koa-router' ;
import * as glob from 'glob';
import {
    isArray
} from './utils';

const router = new Router();

export interface routeConfig {
    apiDirPath: string;
    app: Koa;
}

//定义不变字段，在使用时读取
export const SymbolRoutePrefix:symbol = Symbol("routePrefix");

export class Route{
    
    //koa 实例
    private app: Koa;

    //api文件夹路径
    private apiDirPath: string;

    // 路由实例
    private router: any;

    /**
     * 静态方法，储存各个接口的path以及修饰方法
     * Map({
     *     target: any // 类的实例
     *     method: 'GET' // http method
     *     path: '/list' // 接口路径
     * }, testFunction)
     */
    static _DecoratedRouters: 
        Map<{target:any, method: string, path: string}, Function | Function[]> = new Map();
    
    constructor(opt: routeConfig){
        this.app = opt.app;
        this.apiDirPath = opt.apiDirPath;
        this.router = router;
    }

    /**
     * 注册路由
     * const router = new Route(opt);
     * router.registerRouters();
     */
    registerRouters(){
        //载入api接口,使用sync同步载入
        glob.sync(path.join(this.apiDirPath, './*.js')).forEach((item)=>System.import(item));
        //遍历静态属性_DecoratedRouters
        for(let [config, controller] of Route._DecoratedRouters){
            let controllers = isArray(controller);
            let prefixPath = config.target[SymbolRoutePrefix];
            if(prefixPath && (!prefixPath.startsWith('/'))){
                prefixPath = '/' + prefixPath;
            }
            //拼接api路由
            let routerPath = prefixPath + config.path;
            //遍历追加方法
            this.router[config.method](routerPath, controllers.join(','));
        }
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }

}