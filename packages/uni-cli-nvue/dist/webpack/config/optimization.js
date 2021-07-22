"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimization = void 0;
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
exports.optimization = {
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
