"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("./plugin");
const copy_1 = require("./plugins/copy");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
exports.default = [
    copy_1.uniCopyPlugin(),
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    plugin_1.UniAppPlugin,
];
