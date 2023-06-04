"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniSetupPlugin = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugSetup = (0, debug_1.default)('uni:setup');
function uniSetupPlugin() {
    let appVuePath;
    let resolvedConfig;
    return {
        name: 'uni:setup',
        configResolved(config) {
            resolvedConfig = config;
            appVuePath = (0, uni_cli_shared_1.normalizePath)(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'App.vue'));
        },
        transform(code, id) {
            const { filename, query } = (0, uni_cli_shared_1.parseVueRequest)(id);
            if (filename === appVuePath && !query.vue) {
                debugSetup(filename);
                return {
                    code: code +
                        `;import { setupApp } from '@dcloudio/uni-mp-weibo';setupApp(_sfc_main);`,
                    map: (0, uni_cli_shared_1.withSourcemap)(resolvedConfig)
                        ? this.getCombinedSourcemap()
                        : null,
                };
            }
        },
    };
}
exports.uniSetupPlugin = uniSetupPlugin;
