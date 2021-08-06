"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniAppPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const uni_1 = require("./uni");
const build_1 = require("./build");
const configResolved_1 = require("./configResolved");
exports.UniAppPlugin = {
    name: 'vite:uni-app',
    uni: uni_1.uniOptions(),
    config() {
        return {
            build: build_1.buildOptions(),
        };
    },
    configResolved: configResolved_1.configResolved,
    resolveId(id) {
        if (id === 'vue') {
            return uni_cli_shared_1.resolveBuiltIn('@dcloudio/uni-app-vue');
        }
    },
};
