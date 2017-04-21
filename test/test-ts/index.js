"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
require("mocha");
const index_1 = require("../index");
describe('my-koa-route', () => {
    it('create apis class', () => {
        let app = new Koa();
        let router = new index_1.Route({
            app: app,
            apiDirPath: './apis'
        });
    });
});
