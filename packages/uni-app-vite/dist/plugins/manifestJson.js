"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniManifestJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniManifestJsonPlugin() {
    let manifestJson;
    return uni_cli_shared_1.defineUniManifestJsonPlugin((opts) => {
        return {
            name: 'vite:uni-app-manifest-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                manifestJson = uni_cli_shared_1.normalizeAppManifestJson(JSON.parse(code), uni_cli_shared_1.parsePagesJsonOnce(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM));
                return '';
            },
            generateBundle() {
                // 生成一个空的app-config.js，兼容基座已有规范
                this.emitFile({
                    fileName: `app-config.js`,
                    type: 'asset',
                    source: '(function(){})();',
                });
                this.emitFile({
                    fileName: `manifest.json`,
                    type: 'asset',
                    source: JSON.stringify(manifestJson, null, 2),
                });
            },
        };
    });
}
exports.uniManifestJsonPlugin = uniManifestJsonPlugin;
