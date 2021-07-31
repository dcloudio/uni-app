"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRules = void 0;
const babelLoader_1 = require("./babelLoader");
const cssLoader_1 = require("./cssLoader");
const vueLoader_1 = require("./vueLoader");
function createRules(options) {
    return [vueLoader_1.createVueLoader(options), babelLoader_1.createBabelLoader(), ...cssLoader_1.createCssLoaders()];
}
exports.createRules = createRules;
