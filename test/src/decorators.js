"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_class_1 = require("./Route.class");
const utils_1 = require("./utils");
let requestID = 0;
exports.controller = (path) => {
    return (target) => {
        target.prototype[Route_class_1.SymbolRoutePrefix] = path;
    };
};
exports.router = (config) => {
    return (target, name, value) => {
        config.path = utils_1.normalizePath(config.path);
        Route_class_1.Route._DecoratedRouters.set(Object.assign({ target: target }, config), target[name]);
    };
};
exports.get = (path) => {
    return exports.router({
        method: 'get',
        path: path
    });
};
exports.post = (path) => {
    return exports.router({
        method: 'post',
        path: path
    });
};
exports.put = (path) => {
    return exports.router({
        method: 'put',
        path: path
    });
};
exports.del = (path) => {
    return exports.router({
        method: 'delete',
        path: path
    });
};
exports.convert = (convert) => {
    return (...args) => {
        return Decorate(args, convert);
    };
};
exports.log = () => {
    return (...args) => {
        return Decorate(args, function Logger(ctx, next) {
            return __awaiter(this, void 0, void 0, function* () {
                let currentRequestID = requestID++;
                const startTime = process.hrtime();
                console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${ctx.url}`);
                if ((ctx.method).toLowerCase() == 'post') {
                    console.log(`→ (ID:${currentRequestID}) ${ctx.method} ${JSON.stringify(ctx.request.body)}`);
                }
                yield next();
                const endTime = process.hrtime();
                const elapsed = (endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1000000;
                console.log(`← (ID:${currentRequestID}) ${ctx.method} ${ctx.url} : Status(${ctx.status}) Time(${elapsed.toFixed(0)}ms)`);
            });
        });
    };
};
exports.required = (rules) => {
    return (...args) => {
        return Decorate(args, (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            if (rules.query) {
                rules.query = utils_1.isArray(rules.query);
                for (let name of rules.query) {
                    if (!ctx.query[name])
                        ctx.throw(412, `GET Request query: ${name} required`);
                }
            }
            if (rules.params) {
                rules.params = utils_1.isArray(rules.params);
                for (let name of rules.params) {
                    if (!ctx.params[name])
                        ctx.throw(412, `GET Request params: ${name} required`);
                }
            }
            yield next();
        }));
    };
};
function Decorate(args, middleware) {
    let [target, name, descriptor] = args;
    target[name] = utils_1.isArray(target[name]);
    target[name].unshift(middleware);
    return descriptor;
}
