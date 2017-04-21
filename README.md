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
        param: 'username',
        params: 'age'
    })
    //自定义中间件，在接口执行前执行
    @convert(middleware)
    //请求日志
    @log()
    async getUserOne (ctx: Koa.Context): Promise<void> {
        let user = await UserModel.findOne({username: ctx.params.username});
        ctx.body = user;
    }
}
```

### 案例
https://github.com/soraping/koa-ts