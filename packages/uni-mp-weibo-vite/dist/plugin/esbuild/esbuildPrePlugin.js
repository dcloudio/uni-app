"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esbuildPrePlugin = exports.JS_TYPES_RE = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
exports.JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/;
function esbuildPrePlugin() {
    return {
        name: 'uni:dep-scan',
        setup(build) {
            build.onLoad({ filter: exports.JS_TYPES_RE }, ({ path: id }) => {
                let ext = path_1.default.extname(id).slice(1);
                if (ext === 'mjs')
                    ext = 'js';
                let contents = fs_1.default.readFileSync(id, 'utf-8');
                if (contents.includes('#endif')) {
                    contents = (0, uni_cli_shared_1.preJs)(contents);
                }
                return {
                    loader: ext,
                    contents,
                };
            });
        },
    };
}
exports.esbuildPrePlugin = esbuildPrePlugin;
