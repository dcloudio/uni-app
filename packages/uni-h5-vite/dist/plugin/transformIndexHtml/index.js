"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformIndexHtml = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function createTransformIndexHtml() {
    return async function (html) {
        var _a;
        const manifestJson = uni_cli_shared_1.parseManifestJsonOnce(process.env.UNI_INPUT_DIR);
        const title = ((_a = manifestJson.h5) === null || _a === void 0 ? void 0 : _a.title) || manifestJson.name || '';
        return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
    };
}
exports.createTransformIndexHtml = createTransformIndexHtml;
