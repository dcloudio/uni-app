"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniSetupPlugin = void 0;
const path_1 = __importDefault(require("path"));
const slash_1 = __importDefault(require("slash"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugSetup = debug_1.default('vite:uni:setup');
function uniSetupPlugin() {
    let appVuePath;
    return {
        name: 'vite:uni-setup',
        configResolved() {
            appVuePath = slash_1.default(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'App.vue'));
        },
        transform(code, id) {
            const { filename, query } = uni_cli_shared_1.parseVueRequest(id);
            if (filename === appVuePath && !query.vue) {
                debugSetup(filename);
                return (code +
                    `;import { setupApp } from '@dcloudio/uni-h5';setupApp(_sfc_main);`);
            }
            if (query.mpType === 'page') {
                debugSetup(filename);
                return (code +
                    `;import { setupPage } from '@dcloudio/uni-h5';setupPage(_sfc_main);`);
            }
        },
    };
}
exports.uniSetupPlugin = uniSetupPlugin;
