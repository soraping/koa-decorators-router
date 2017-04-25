
import 'mocha';
import * as supertest from 'supertest';
import mochaChai from './mocha-chai';
import app from './app';

describe('my-koa-route', ()=>{

    let request: any;

    before(()=>{
        request = supertest(app.listen());
    })

    it('should router path', async () => {
        let {text} : any = await request
                    .get('/userPath/list')
                    .expect(200)
        mochaChai(text).to.equal('ok');
    })

    it('should get request query required', async () => {
        await request 
            .get('/userPath/query')
            .expect(412)
    })

    it('should get request query value', async () => {
        let {text}: any = await request 
                .get('/userPath/query?q=123456')
                .expect(200)
        mochaChai(text).to.equal('123456');
    })

    it('should get request params required', async () => {
        await request 
            .get('/userPath/detail')
            .expect(404)
    })

    it('should get request params value', async () => {
        let {text}: any = await request
            .get('/userPath/detail/g456789')
            .expect(200)
        mochaChai(text).to.equal('g456789')
    })

    it('should put delete request params required', async () => {
        await request 
            .put('/userPath/upd')
            .expect(404)
    })

    it('should put delete request params value', async () => {
        let {text} = await request 
            .put('/userPath/upd/g99999')
            .expect(200)
        mochaChai(text).to.equal('g99999');
    })

    it('should post request body required', async () => {
        await request
            .post('/userPath/reqPost')
            .expect(412)
    })

    it('should post request body type', async () => {
        await request
            .post('/userPath/reqPost')
            .send({ username: 1234 })
            .send({ age: 'zhangsan' })
            .expect(412)
    })

    it('should post request body value', async () => {
        let {text} = await request
            .post('/userPath/reqPost')
            .send({ username: 'zhangsan' })
            .send({ age: 12 })
            .expect(200)
        mochaChai(JSON.parse(text)).to.deep.equal({username:'zhangsan',age:12})
    })

})
 