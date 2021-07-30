"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBabelLoader = void 0;
function createBabelLoader() {
    return {
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
}
exports.createBabelLoader = createBabelLoader;
