"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const plugin_1 = require("./plugin");
const css_1 = require("./plugins/css");
const inject_1 = require("./plugins/inject");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const resolveId_1 = require("./plugins/resolveId");
const setup_1 = require("./plugins/setup");
const ssr_1 = require("./plugins/ssr");
exports.default = [
    uni_cli_shared_1.uniCssScopedPlugin(),
    resolveId_1.uniResolveIdPlugin(),
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    inject_1.uniInjectPlugin(),
    css_1.uniCssPlugin(),
    ssr_1.uniSSRPlugin(),
    setup_1.uniSetupPlugin(),
    plugin_1.UniH5Plugin,
];
