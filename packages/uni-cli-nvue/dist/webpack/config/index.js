"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
const optimization_1 = require("./optimization");
const output_1 = require("./output");
const module_1 = require("./module");
const plugins_1 = require("./plugins");
function createConfig(mode) {
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
        optimization: optimization_1.createOptimization(),
        output: output_1.createOutput(),
        module: module_1.createModule(),
        plugins: plugins_1.createPlugins(),
    };
}
exports.createConfig = createConfig;
