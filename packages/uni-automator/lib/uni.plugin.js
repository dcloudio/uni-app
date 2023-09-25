"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
exports.default = [
    (0, uni_cli_shared_1.defineUniMainJsPlugin)((opts) => {
        return {
            name: 'uni:automator',
            enforce: 'pre',
            configResolved() {
                if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
                    return;
                }
                const pkg = JSON.parse(fs_extra_1.default.readFileSync(path_1.default.resolve(__dirname, '../package.json'), 'utf8'));
                const automatorJson = JSON.stringify({
                    version: pkg.version,
                    wsEndpoint: process.env.UNI_AUTOMATOR_WS_ENDPOINT,
                });
                fs_extra_1.default.outputFileSync(path_1.default.resolve(process.env.UNI_OUTPUT_DIR, '../.automator/' + (0, uni_cli_shared_1.getPlatformDir)() + '/.automator.json'), automatorJson);
            },
            transform(code, id) {
                if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
                    return null;
                }
                if (opts.filter(id)) {
                    const platform = process.env.UNI_PLATFORM;
                    if (platform === 'app' && process.env.UNI_APP_X === 'true') {
                        const automatorPath = (0, uni_cli_shared_1.normalizePath)((0, uni_cli_shared_1.resolveBuiltIn)(`@dcloudio/uni-app-uts/lib/automator/index.uts`));
                        return {
                            code: 
                            // 增加个换行，避免最后是注释且无换行
                            code + `;\nimport { initAutomator } from '${automatorPath}';`,
                            map: null,
                        };
                    }
                    const automatorPath = (0, uni_cli_shared_1.normalizePath)((0, uni_cli_shared_1.resolveBuiltIn)(`@dcloudio/uni-${platform === 'app' ? 'app-plus' : platform}/lib/automator.js`));
                    return {
                        code: code + `;\nimport '${automatorPath}';`,
                        map: null,
                    };
                }
            },
        };
    }),
];
