"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniSSRPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
const ENTRY_SERVER_JS = 'entry-server.js';
function uniSSRPlugin() {
    let entryServerJs;
    let resolvedConfig;
    const entryServerJsCode = (0, utils_1.generateSsrEntryServerCode)();
    return {
        name: 'uni:h5-ssr',
        config(userConfig, env) {
            if ((0, uni_cli_shared_1.isSsr)(env.command, userConfig)) {
                (0, utils_1.initSsrAliasOnce)();
                (0, utils_1.rewriteSsrVue)();
                (0, utils_1.rewriteSsrNativeTag)();
                (0, utils_1.rewriteSsrRenderStyle)(process.env.UNI_INPUT_DIR);
                return {
                    resolve: {
                        alias: [
                            {
                                find: 'vue',
                                replacement: (0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-h5-vue/dist/vue.runtime.esm.js'),
                            },
                            {
                                find: 'vue/server-renderer',
                                replacement: (0, uni_cli_shared_1.resolveBuiltIn)('@vue/server-renderer'),
                            },
                        ],
                    },
                };
            }
        },
        configResolved(config) {
            resolvedConfig = config;
            entryServerJs = path_1.default.join(process.env.UNI_INPUT_DIR, ENTRY_SERVER_JS);
            if ((0, uni_cli_shared_1.isSsr)(resolvedConfig.command, resolvedConfig)) {
                (0, utils_1.initSsrDefine)(resolvedConfig);
            }
        },
        resolveId(id) {
            if (id.endsWith(ENTRY_SERVER_JS)) {
                return entryServerJs;
            }
        },
        load(id) {
            if (id.endsWith(ENTRY_SERVER_JS)) {
                return entryServerJsCode;
            }
        },
        generateBundle(_options, bundle) {
            const chunk = bundle['entry-server.js'];
            if (chunk) {
                chunk.code =
                    (0, utils_1.generateSsrDefineCode)(resolvedConfig, (0, uni_cli_shared_1.parseRpx2UnitOnce)(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM)) +
                        '\n' +
                        chunk.code;
            }
        },
    };
}
exports.uniSSRPlugin = uniSSRPlugin;
