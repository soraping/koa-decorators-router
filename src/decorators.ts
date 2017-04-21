import { Route , SymbolRoutePrefix} from './Route.class';
import {
    normalizePath
} from './utils'

export interface routerConfig {
    method: string;
    path: string;
}

/**
 * 修饰api类
 * @controller('/user')
 * class User{}
 */
export const controller = (path: string) => {
    return (target: any) => {
        target.prototype[SymbolRoutePrefix] = path;
    }
}

/**
 * 方法的路由
 * @router({
 *     method: 'get',
 *     path: '/list'
 * })
 */
export const router = (config: routerConfig) => {
    return (target: any, name: string, value: ParameterDecorator) => {
        config.path = normalizePath(config.path);
        //设置静态值
        Route._DecoratedRouters.set({
            target: target,
            ...config
        }, target[name])
    }
}

// methods.forEach((method)=>{
//     return exports[method] = router({
//         method: method,
//         path: arguments[0]
//     })
// })

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

// /**
//  * 接口中间件方法
//  */
// export const convert = () => {

// }

// /**
//  * 接口日志
//  */
// export const log = () => {

// }

// /**
//  * get请求URL必传参数校验
//  * @required({params: 'username'})
//  * @required({params: ['username','age']})
//  * @required({query: 'username'})
//  */
// export const required = () => {

// }
