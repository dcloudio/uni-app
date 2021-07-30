"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCssLoaders = void 0;
const oneOf_1 = require("./oneOf");
function createCssLoaders() {
    return [
        {
            test: /\.css$/,
            oneOf: oneOf_1.createOneOf(),
        },
        {
            test: /\.scss$/,
            oneOf: oneOf_1.createOneOf(scssLoader),
        },
        {
            test: /\.sass$/,
            oneOf: oneOf_1.createOneOf(sassLoader),
        },
        {
            test: /\.less$/,
            oneOf: oneOf_1.createOneOf(lessLoader),
        },
        {
            test: /\.styl(us)?$/,
            oneOf: oneOf_1.createOneOf(stylusLoader),
        },
    ];
}
exports.createCssLoaders = createCssLoaders;
const scssLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: false,
        additionalData: '@import "@/uni.scss";',
        sassOptions: {
            outputStyle: 'expanded',
        },
    },
};
const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: false,
        additionalData: '@import "@/uni.sass"',
        sassOptions: {
            outputStyle: 'expanded',
            indentedSyntax: true,
        },
    },
};
const lessLoader = {
    loader: 'less-loader',
    options: {
        sourceMap: false,
    },
};
const stylusLoader = {
    loader: 'stylus-loader',
    options: {
        sourceMap: false,
        preferPathResolver: 'webpack',
    },
};
