"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
chai.config.includeStack = true;
exports.default = chai.expect;
