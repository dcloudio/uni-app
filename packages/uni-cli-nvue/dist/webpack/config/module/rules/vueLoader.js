"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vueLoader = void 0;
exports.vueLoader = {
    test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
    use: [
        {
            loader: 'vue-loader',
            options: {
                hotReload: false,
                compiler: require('../../../../../lib/weex-template-compiler'),
            },
        },
    ],
};
