"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBabelLoader = void 0;
const loader_1 = require("../../../loader");
const preprocessLoader = {
    loader: loader_1.resolveLoader('preprocess'),
    options: {
        type: ['js'],
    },
};
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
            preprocessLoader,
        ],
    };
}
exports.createBabelLoader = createBabelLoader;
