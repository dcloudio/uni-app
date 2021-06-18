"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const resolveId_1 = require("./plugins/resolveId");
const UniAppPlugin = {
    name: 'vite:uni-app',
    uni: {
        transformEvent: {
            tap: 'click',
        },
    },
};
exports.default = [
    resolveId_1.uniResolveIdPlugin(),
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    UniAppPlugin,
];
