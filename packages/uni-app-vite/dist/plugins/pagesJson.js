"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniPagesJsonPlugin() {
    return uni_cli_shared_1.defineUniPagesJsonPlugin((opts) => {
        return {
            name: 'vite:uni-app-pages-json',
            enforce: 'pre',
            transform(code, id) {
                if (!opts.filter(id)) {
                    return;
                }
                return (`import './manifest.json.js'\n` +
                    uni_cli_shared_1.normalizeAppPagesJson(JSON.parse(code)));
            },
        };
    });
}
exports.uniPagesJsonPlugin = uniPagesJsonPlugin;
