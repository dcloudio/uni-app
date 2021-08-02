"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaderUtils = require('loader-utils');
function recyclableLoader(content, map) {
    const vueLoaderOptions = this.loaders.find((loader) => loader.ident === 'vue-loader-options');
    if (vueLoaderOptions) {
        const params = loaderUtils.parseQuery(this.resourceQuery);
        if (params.recyclable) {
            ;
            vueLoaderOptions.options.compilerOptions.recyclable = true;
        }
    }
    else {
        throw new Error('vue-loader-options parse error');
    }
    this.callback(null, content, map);
}
exports.default = recyclableLoader;
