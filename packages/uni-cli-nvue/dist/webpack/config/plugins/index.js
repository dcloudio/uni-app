"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlugins = void 0;
const define_1 = require("./define");
const banner_1 = require("./banner");
const provide_1 = require("./provide");
const vueLoader_1 = require("./vueLoader");
function createPlugins() {
    return [
        define_1.createDefinePlugin(),
        banner_1.createBannerPlugin(),
        provide_1.createProvidePlugin(),
        vueLoader_1.createVueLoaderPlugin(),
    ];
}
exports.createPlugins = createPlugins;
