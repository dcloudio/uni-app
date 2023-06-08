"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformVue = exports.genClassName = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const plugins_1 = require("./plugins");
const css_1 = require("./plugins/css");
const mainUTS_1 = require("./plugins/mainUTS");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const pre_1 = require("./plugins/pre");
const uvue_1 = require("./plugins/uvue");
exports.default = () => {
    return [
        (0, pre_1.uniPrePlugin)(),
        (0, uni_cli_shared_1.uniUTSPlugin)({
            x: true,
            extApis: (0, uni_cli_shared_1.parseUniExtApiNamespacesOnce)(process.env.UNI_UTS_PLATFORM, process.env.UNI_UTS_TARGET_LANGUAGE),
        }),
        (0, plugins_1.uniAppUTSPlugin)(),
        (0, mainUTS_1.uniAppMainPlugin)(),
        (0, manifestJson_1.uniAppManifestPlugin)(),
        (0, pagesJson_1.uniAppPagesPlugin)(),
        (0, css_1.uniAppCssPlugin)(),
        (0, uvue_1.uniAppUVuePlugin)(),
    ];
};
var utils_1 = require("./plugins/utils");
Object.defineProperty(exports, "genClassName", { enumerable: true, get: function () { return utils_1.genClassName; } });
var index_1 = require("./plugins/uvue/index");
Object.defineProperty(exports, "transformVue", { enumerable: true, get: function () { return index_1.transformVue; } });
