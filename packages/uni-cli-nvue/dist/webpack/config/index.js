"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
const optimization_1 = require("./optimization");
const output_1 = require("./output");
function createConfig(mode) {
    return {
        target: 'node',
        mode: mode,
        devtool: false,
        watch: mode === 'development',
        entry() {
            return {};
        },
        externals: {
            vue: 'Vue',
        },
        optimization: optimization_1.optimization,
        output: output_1.output,
    };
}
exports.createConfig = createConfig;
