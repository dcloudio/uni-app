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
    const entryServerJsCode = utils_1.generateSsrEntryServerCode();
    return {
        name: 'vite:uni-h5-ssr',
        configResolved(config) {
            resolvedConfig = config;
            entryServerJs = path_1.default.join(process.env.UNI_INPUT_DIR, ENTRY_SERVER_JS);
            if (utils_1.isSsr(resolvedConfig.command, resolvedConfig)) {
                const { MODE } = uni_cli_shared_1.parseCompatConfigOnce(process.env.UNI_INPUT_DIR);
                utils_1.initSsrDefine(resolvedConfig);
                utils_1.rewriteSsrVue(MODE);
                utils_1.rewriteSsrResolve(MODE);
                utils_1.rewriteSsrNativeTag();
                utils_1.rewriteSsrRenderStyle(process.env.UNI_INPUT_DIR);
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
                    utils_1.generateSsrDefineCode(resolvedConfig, uni_cli_shared_1.parseRpx2UnitOnce(process.env.UNI_INPUT_DIR)) +
                        '\n' +
                        chunk.code;
            }
        },
    };
}
exports.uniSSRPlugin = uniSSRPlugin;
