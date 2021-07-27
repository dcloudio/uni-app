"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("webpack");
let Plugin;
if (webpack.version && webpack.version[0] > '4') {
    // webpack5 and upper
    Plugin = require('./pluginWebpack5').default;
}
else {
    // webpack4 and lower
    Plugin = require('./pluginWebpack4').default;
}
exports.default = Plugin;
