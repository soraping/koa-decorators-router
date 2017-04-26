## koa-decorators-router(koa-router封装)

### 安装

```bash
npm install --save koa-decorators-router
```

or

```bash
yarn add koa-decorators-router
```

### 使用

入口文件 app.js

```javascript
import * as Koa from 'koa'
import {Route} from 'koa-decorators-router';
const app = new Koa()
const router = new Route(app, apiPath);
//注册路由
router.registerRouters();
app.listen('3000');

```

api

```javascript
import * as Koa from 'koa';
import {controller, get, log, required, convert} from 'koa-decorators-router';
// api path
@controller('/user')
class UserController{

    aysnc middleware(ctx, next) => {
        ctx.body = 'i am middleware';
    }

    // 访问路径就是/user/findOne/zhangsan?age=40
    @get('/findOne/:username')
    //Url必传参数
    @required({
        params: 'username',
        query: 'age'
    })
    //自定义中间件，在接口执行前执行
    @convert(middleware)
    //请求日志
    @log()
    async getUserOne (ctx: Koa.Context): Promise<void> {
        let data = {
            username: ctx.params.username,
            age: ctx.query.age
        }
        ctx.body = data;
    }

    @post('list')
    // post 请求参数需要校验参数类型
    // post 只挂在body下
    @required({
        body: {
            q: 'string',
            pageNum: 'number'
        }
    })
    async getList ():Promise<void>{

    }

    @put('upd/:id')
    @required({
        params : 'id'
    })
    async updGoods() : Promise<void> {

    }

    @del('del/:id')
    @required({
        params : 'id'
    })
    async delGoods () : Promise<void> {

    }

}
```

访问:
http://localhost:3000/user/findOne/zhangsan?age=40

浏览器会显示:

```
{
    "username": "zhangsan",
    "age": 40
}
```


### 案例
https://github.com/soraping/koa-ts