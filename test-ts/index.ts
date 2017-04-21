import * as Koa from 'koa';
import 'mocha';
import mochaChai from './mocha-chai';
import { 
    Route
 } from '../index';


describe('my-koa-route', ()=>{
    
    it('create apis class', ()=>{
        let app = new Koa();
        let router = new Route({
            app:app,
            apiDirPath: './apis'
        })
    })

})
 