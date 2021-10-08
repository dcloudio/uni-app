"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniManifestJsonPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniManifestJsonPlugin() {
    // let manifestJson: Record<string, any>
    return (0, uni_cli_shared_1.defineUniManifestJsonPlugin)((opts) => {
        return {
            name: 'vite:uni-mp-manifest-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                this.addWatchFile(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'manifest.json'));
                (0, uni_cli_shared_1.getLocaleFiles)(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'locale')).forEach((filepath) => {
                    this.addWatchFile(filepath);
                });
                // manifestJson = normalizeAppManifestJson(
                //   parseJson(code),
                //   parsePagesJsonOnce(
                //     process.env.UNI_INPUT_DIR,
                //     process.env.UNI_PLATFORM
                //   )
                // )
                return {
                    code: '',
                    map: this.getCombinedSourcemap(),
                };
            },
            generateBundle() {
                // 生成一个空的app-config.js，兼容基座已有规范
                // this.emitFile({
                //   fileName: `app-config.js`,
                //   type: 'asset',
                //   source: '(function(){})();',
                // })
                // this.emitFile({
                //   fileName: `manifest.json`,
                //   type: 'asset',
                //   source: JSON.stringify(manifestJson, null, 2),
                // })
            },
        };
    });
}
exports.uniManifestJsonPlugin = uniManifestJsonPlugin;
