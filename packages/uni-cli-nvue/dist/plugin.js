"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const webpack_1 = require("./webpack");
const UniAppNVuePlugin = () => {
    let pagesJsonPath;
    let watching;
    let lastNVueEntry;
    let isPagesJsonChanged = false;
    return {
        name: 'vite:uni-cli-nvue',
        config() {
            if (process.env.UNI_NVUE_COMPILER === 'vue') {
                return;
            }
            pagesJsonPath = uni_cli_shared_1.normalizePath(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'pages.json'));
            if (process.env.NODE_ENV === 'production') {
                return webpack_1.runWebpackBuild().then(() => { });
            }
            return webpack_1.runWebpackDev().then((compiler) => {
                watching = compiler.watching;
            });
        },
        configResolved() {
            if (process.env.UNI_NVUE_COMPILER === 'vue') {
                return;
            }
            const entry = process.UNI_NVUE_ENTRY;
            if (entry) {
                lastNVueEntry = JSON.stringify(Object.keys(entry));
            }
        },
        watchChange(id) {
            if (process.env.UNI_NVUE_COMPILER === 'vue') {
                return;
            }
            if (pagesJsonPath === id && watching) {
                isPagesJsonChanged = true;
            }
        },
        generateBundle() {
            if (!isPagesJsonChanged) {
                return;
            }
            const entry = process.UNI_NVUE_ENTRY;
            if (!entry) {
                return;
            }
            const curNVueEntry = JSON.stringify(Object.keys(entry));
            if (curNVueEntry !== lastNVueEntry) {
                lastNVueEntry = curNVueEntry;
                watching.invalidate();
            }
        },
    };
};
exports.default = [UniAppNVuePlugin()];
