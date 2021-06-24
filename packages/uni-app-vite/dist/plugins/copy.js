"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniCopyPlugin = void 0;
const path_1 = __importDefault(require("path"));
const slash_1 = __importDefault(require("slash"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniCopyPlugin() {
    return uni_cli_shared_1.uniViteCopyPlugin({
        targets: [
            {
                src: slash_1.default(path_1.default.resolve(__dirname, '../../lib/template/')),
                dest: process.env.UNI_OUTPUT_DIR,
            },
            {
                src: slash_1.default(require.resolve('@dcloudio/uni-app-plus/dist/style.css')),
                dest: process.env.UNI_OUTPUT_DIR,
            },
            {
                src: slash_1.default(require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js')),
                dest: process.env.UNI_OUTPUT_DIR,
            },
        ],
        hook: 'writeBundle',
        verbose: process.env.DEBUG ? true : false,
    });
}
exports.uniCopyPlugin = uniCopyPlugin;
