"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const inputDir = process.env.UNI_INPUT_DIR;
exports.resolve = {
    extensions: ['.js', '.nvue', '.vue', '.json'],
    alias: {
        '@': inputDir,
        'uni-pages': path_1.default.resolve(inputDir, 'pages.json'),
        '@dcloudio/uni-stat': require.resolve('@dcloudio/uni-stat'),
        'uni-app-style': uni_cli_shared_1.resolveMainPathOnce(inputDir) +
            '?' +
            JSON.stringify({
                type: 'appStyle',
            }),
        'uni-stat-config': path_1.default.resolve(inputDir, 'pages.json') +
            '?' +
            JSON.stringify({
                type: 'stat',
            }),
    },
    modules: [
        'node_modules',
        path_1.default.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules'),
        path_1.default.resolve(inputDir, 'node_modules'),
    ],
};
