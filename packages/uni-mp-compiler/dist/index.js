"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.parse = void 0;
const shared_1 = require("@vue/shared");
const compiler_core_1 = require("@vue/compiler-core");
const compile_1 = require("./compile");
const parserOptions_1 = require("./parserOptions");
function parse(template, options = {}) {
    return (0, compiler_core_1.baseParse)(template, (0, shared_1.extend)({}, parserOptions_1.parserOptions, options));
}
exports.parse = parse;
function compile(template, options = {}) {
    return (0, compile_1.baseCompile)(template, (0, shared_1.extend)({}, parserOptions_1.parserOptions, options, {
        directiveTransforms: (0, shared_1.extend)({}, options.directiveTransforms || {}),
    }));
}
exports.compile = compile;
