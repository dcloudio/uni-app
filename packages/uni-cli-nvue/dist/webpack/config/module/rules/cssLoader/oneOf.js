"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneOf = void 0;
const path_1 = __importDefault(require("path"));
const loader_1 = require("../../../../loader");
const styleLoader = { loader: loader_1.resolveLoader('style') };
const preprocessLoader = { loader: loader_1.resolveLoader('preprocess') };
const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: false,
        parser: require('postcss-comment'),
        plugins: [
            require('postcss-import')({
                resolve(id) {
                    if (id.startsWith('~@/')) {
                        return path_1.default.resolve(process.env.UNI_INPUT_DIR, id.substr(3));
                    }
                    else if (id.startsWith('@/')) {
                        return path_1.default.resolve(process.env.UNI_INPUT_DIR, id.substr(2));
                    }
                    else if (id.startsWith('/') && !id.startsWith('//')) {
                        return path_1.default.resolve(process.env.UNI_INPUT_DIR, id.substr(1));
                    }
                    return id;
                },
            }),
        ],
    },
};
function createOneOf(preLoader) {
    const use = [styleLoader, preprocessLoader];
    use.push(postcssLoader);
    if (preLoader) {
        use.push(preLoader);
    }
    return [
        {
            resourceQuery: /\?vue/,
            use,
        },
        {
            use,
        },
    ];
}
exports.createOneOf = createOneOf;
