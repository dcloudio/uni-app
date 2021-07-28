"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
exports.rules = [
    {
        test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
        loader: 'vue-loader',
    },
    {
        test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                },
            },
        ],
    },
];
