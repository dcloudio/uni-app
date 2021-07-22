"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
const webpack_1 = require("webpack");
exports.banner = new webpack_1.BannerPlugin({
    banner: '"use weex:vue";',
    raw: true,
    exclude: 'Vue',
});
