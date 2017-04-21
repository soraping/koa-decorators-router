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
import {controller, get} from 'koa-decorators-router';
// api path
@controller('/user')
class UserController{

    // 访问路径就是/user/findOne/zhangsan
    @get('/findOne/:username')
    async getUserOne (ctx: IRouterContext): Promise<void> {
        let user = await UserModel.findOne({username: ctx.params.username});
        ctx.body = user;
    }
}
```

### 案例
https://github.com/soraping/koa-ts