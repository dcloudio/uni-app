"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOptimization = void 0;
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
function createOptimization() {
    return {
        nodeEnv: false,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        minimizer: [
            new terser_webpack_plugin_1.default({
                terserOptions: {
                    output: {
                        ascii_only: true,
                    },
                },
            }),
        ],
    };
}
exports.createOptimization = createOptimization;
