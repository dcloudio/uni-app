"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRules = void 0;
const babelLoader_1 = require("./babelLoader");
const cssLoader_1 = require("./cssLoader");
const recyclableLoader_1 = require("./recyclableLoader");
const templateLoader_1 = require("./templateLoader");
const vueLoader_1 = require("./vueLoader");
function createRules(options) {
    const rules = [
        vueLoader_1.createVueLoader(options),
        babelLoader_1.createBabelLoader(),
        recyclableLoader_1.createRecyclableLoader(),
        ...cssLoader_1.createCssLoaders(),
    ];
    if (process.env.UNI_NVUE_COMPILER === 'uni-app') {
        rules.push(templateLoader_1.createTemplateLoader());
    }
    return rules;
}
exports.createRules = createRules;
