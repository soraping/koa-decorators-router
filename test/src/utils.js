"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = (arr) => {
    return Array.isArray(arr) ? arr : [arr];
};
exports.normalizePath = (path) => {
    if (!path.startsWith('/')) {
        path = `/${path}`;
    }
    return path;
};
