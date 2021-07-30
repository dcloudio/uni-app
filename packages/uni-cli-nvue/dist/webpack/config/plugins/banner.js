"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBannerPlugin = void 0;
const webpack_1 = require("webpack");
function createBannerPlugin() {
    return new webpack_1.BannerPlugin({
        banner: '"use weex:vue";',
        raw: true,
        exclude: 'Vue',
    });
}
exports.createBannerPlugin = createBannerPlugin;
