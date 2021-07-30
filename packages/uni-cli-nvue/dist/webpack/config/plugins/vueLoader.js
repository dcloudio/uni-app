"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVueLoaderPlugin = void 0;
function createVueLoaderPlugin() {
    const { VueLoaderPlugin } = require('../../../../lib/vue-loader');
    return new VueLoaderPlugin();
}
exports.createVueLoaderPlugin = createVueLoaderPlugin;
