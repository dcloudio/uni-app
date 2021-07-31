"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
const optimization_1 = require("./optimization");
const output_1 = require("./output");
const module_1 = require("./module");
const plugins_1 = require("./plugins");
const resolve_1 = require("./resolve");
function createConfig(mode, options) {
    return {
        mode: mode,
        devtool: false,
        watch: mode === 'development',
        entry() {
            return process.UNI_NVUE_ENTRY;
        },
        externals: {
            vue: 'Vue',
        },
        module: module_1.createModule(options),
        optimization: optimization_1.createOptimization(),
        output: output_1.createOutput(),
        resolve: resolve_1.createResolve(),
        plugins: plugins_1.createPlugins(),
    };
}
exports.createConfig = createConfig;
