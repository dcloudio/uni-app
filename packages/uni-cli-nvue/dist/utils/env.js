"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEnv = void 0;
function initEnv(options) {
    if (options.styleCompiler === 'uni-app') {
        process.env.UNI_NVUE_STYLE_COMPILER = 'uni-app';
    }
}
exports.initEnv = initEnv;
