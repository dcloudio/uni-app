"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformIndexHtml = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function createTransformIndexHtml() {
    return async function (html) {
        const manifestJson = (0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR);
        const title = manifestJson.h5?.title || manifestJson.name || '';
        return {
            html: html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`),
            tags: process.env.NODE_ENV === 'development'
                ? [
                    {
                        tag: 'script',
                        children: `if (typeof globalThis === 'undefined') {
  window.globalThis = window
}`,
                        injectTo: 'head-prepend',
                    },
                ]
                : [],
        };
    };
}
exports.createTransformIndexHtml = createTransformIndexHtml;
