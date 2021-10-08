"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniPagesJsonPlugin() {
    let pagesJson;
    return (0, uni_cli_shared_1.defineUniPagesJsonPlugin)((opts) => {
        return {
            name: 'vite:uni-mp-pages-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                this.addWatchFile(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'pages.json'));
                (0, uni_cli_shared_1.getLocaleFiles)(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'locale')).forEach((filepath) => {
                    this.addWatchFile(filepath);
                });
                pagesJson = (0, uni_cli_shared_1.normalizePagesJson)(code, process.env.UNI_PLATFORM);
                // TODO subpackages
                pagesJson.pages.forEach((page) => {
                    this.addWatchFile(path_1.default.resolve(process.env.UNI_INPUT_DIR, page.path + '.vue'));
                });
                return {
                    code: `import './manifest.json.js'\n` + (0, uni_cli_shared_1.normalizeAppPagesJson)(pagesJson),
                    map: this.getCombinedSourcemap(),
                };
            },
            generateBundle() {
                // this.emitFile({
                //   fileName: `app-config-service.js`,
                //   type: 'asset',
                //   source: normalizeAppConfigService(
                //     pagesJson,
                //     parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
                //   ),
                // })
            },
        };
    });
}
exports.uniPagesJsonPlugin = uniPagesJsonPlugin;
