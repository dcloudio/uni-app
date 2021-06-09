"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("./plugins/css");
const cssScoped_1 = require("./plugins/cssScoped");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const resolveId_1 = require("./plugins/resolveId");
const UniH5Plugin = {
    name: 'vite:uni-h5',
    uni: {
        transformEvent: {
            tap: 'click',
        },
    },
};
exports.default = [
    cssScoped_1.uniCssScopedPlugin(),
    resolveId_1.uniResolveIdPlugin(),
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    css_1.uniCssPlugin(),
    UniH5Plugin,
];
