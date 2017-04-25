import * as Koa from 'koa';
import * as betterBody from 'koa-better-body';
import { 
    Route
 } from '../index';

let app = new Koa();

app.use(betterBody({
    fields: "body"
}));

let router = new Route({
    app:app,
    apiDirPath: `${__dirname}/apis`
})
router.registerRouters()

app.listen('8077', function(){
    console.log('开启端口8077');
})

export default app;