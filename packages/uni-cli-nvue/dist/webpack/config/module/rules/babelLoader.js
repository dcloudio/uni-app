"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.babelLoader = void 0;
exports.babelLoader = {
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                babelrc: false,
            },
        },
    ],
};
