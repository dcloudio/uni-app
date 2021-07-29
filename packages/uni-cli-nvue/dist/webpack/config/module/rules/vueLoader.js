"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vueLoader = void 0;
exports.vueLoader = {
    test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
    use: [
        {
            loader: 'vue-loader',
            options: {
                compiler: require('../../../../../lib/weex-template-compiler'),
            },
        },
    ],
};
