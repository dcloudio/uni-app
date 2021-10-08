"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
exports.default = [
    (0, mainJs_1.uniMainJsPlugin)(),
    (0, manifestJson_1.uniManifestJsonPlugin)(),
    (0, pagesJson_1.uniPagesJsonPlugin)(),
    plugin_1.UniMpPlugin,
];
