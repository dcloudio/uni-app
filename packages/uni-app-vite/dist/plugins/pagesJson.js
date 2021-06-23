"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniPagesJsonPlugin() {
    let pagesJson;
    return uni_cli_shared_1.defineUniPagesJsonPlugin((opts) => {
        return {
            name: 'vite:uni-app-pages-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                pagesJson = uni_cli_shared_1.normalizePagesJson(code, process.env.UNI_PLATFORM);
                return (`import './manifest.json.js'\n` + uni_cli_shared_1.normalizeAppPagesJson(pagesJson));
            },
            generateBundle() {
                this.emitFile({
                    fileName: `app-config-service.js`,
                    type: 'asset',
                    source: uni_cli_shared_1.normalizeAppConfigService(pagesJson, uni_cli_shared_1.parseManifestJsonOnce(process.env.UNI_INPUT_DIR)),
                });
            },
        };
    });
}
exports.uniPagesJsonPlugin = uniPagesJsonPlugin;
