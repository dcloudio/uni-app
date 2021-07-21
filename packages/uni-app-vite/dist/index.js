"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const plugin_1 = require("./plugin");
const copy_1 = require("./plugins/copy");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const resolveId_1 = require("./plugins/resolveId");
const plugins = [
    resolveId_1.uniResolveIdPlugin(),
    copy_1.uniCopyPlugin(),
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    uni_cli_shared_1.uniViteInjectPlugin(uni_cli_shared_1.initProvide()),
    plugin_1.UniAppPlugin,
];
if (!process.env.UNI_APP_CODE_SPLITING) {
    plugins.push(uni_cli_shared_1.uniCssPlugin({
        app: fs_1.default.readFileSync(require.resolve('@dcloudio/uni-app-plus/dist/style.css'), 'utf8'),
    }));
}
exports.default = plugins;
