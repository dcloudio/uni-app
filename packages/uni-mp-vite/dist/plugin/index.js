"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniMpPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const uni_1 = require("./uni");
const build_1 = require("./build");
const configResolved_1 = require("./configResolved");
exports.UniMpPlugin = {
    name: 'vite:uni-mp',
    uni: (0, uni_1.uniOptions)(),
    config() {
        return {
            resolve: {
                alias: {
                    vue: (0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-mp-vue'),
                },
            },
            build: (0, build_1.buildOptions)(),
        };
    },
    configResolved: configResolved_1.configResolved,
};
