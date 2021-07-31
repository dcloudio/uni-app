"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolve = void 0;
const path_1 = __importDefault(require("path"));
// import { resolveMainPathOnce } from '@dcloudio/uni-cli-shared'
function createResolve() {
    const inputDir = process.env.UNI_INPUT_DIR;
    return {
        extensions: ['.js', '.nvue', '.vue', '.json'],
        alias: {
            '@': inputDir,
            // '@dcloudio/uni-stat': require.resolve('@dcloudio/uni-stat')
            // 'uni-app-style':
            //   resolveMainPathOnce(inputDir) +
            //   '?' +
            //   JSON.stringify({
            //     type: 'appStyle'
            //   })
        },
        modules: [
            'node_modules',
            path_1.default.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules'),
            path_1.default.resolve(inputDir, 'node_modules'),
        ],
    };
}
exports.createResolve = createResolve;
