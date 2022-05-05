"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSwift = exports.toKotlin = void 0;
const path_1 = require("path");
__exportStar(require("./types"), exports);
// Allow overrides to the location of the .node binding file
const bindingsOverride = process.env['UTS_BINARY_PATH'];
const bindings = !!bindingsOverride
    ? require((0, path_1.resolve)(bindingsOverride))
    : require('./binding').default;
function toKotlin(options) {
    const result = Promise.resolve({});
    const { input, output } = options;
    if (!(input === null || input === void 0 ? void 0 : input.root)) {
        return result;
    }
    if (!(input === null || input === void 0 ? void 0 : input.filename)) {
        return result;
    }
    if (!(output === null || output === void 0 ? void 0 : output.outDir)) {
        return result;
    }
    return bindings.toKotlin(toBuffer(options));
}
exports.toKotlin = toKotlin;
function toSwift(options) {
    return bindings.toSwift(toBuffer(options));
}
exports.toSwift = toSwift;
function toBuffer(t) {
    return Buffer.from(JSON.stringify(t));
}
