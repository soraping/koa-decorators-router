"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Router = require("koa-router");
const glob = require("glob");
const utils_1 = require("./utils");
const router = new Router();
exports.SymbolRoutePrefix = Symbol("routePrefix");
class Route {
    constructor(opt) {
        this.app = opt.app;
        this.apiDirPath = opt.apiDirPath;
        this.router = router;
    }
    registerRouters() {
        glob.sync(path.join(this.apiDirPath, './*.js')).forEach((item) => require(item));
        for (let [config, controller] of Route._DecoratedRouters) {
            let controllers = utils_1.isArray(controller);
            let prefixPath = config.target[exports.SymbolRoutePrefix];
            if (prefixPath) {
                prefixPath = utils_1.normalizePath(prefixPath);
            }
            let routerPath = prefixPath + config.path;
            this.router[config.method](routerPath, ...controllers);
        }
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }
}
Route._DecoratedRouters = new Map();
exports.Route = Route;
