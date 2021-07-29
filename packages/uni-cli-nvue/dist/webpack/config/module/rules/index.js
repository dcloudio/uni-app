"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const babelLoader_1 = require("./babelLoader");
const vueLoader_1 = require("./vueLoader");
exports.rules = [vueLoader_1.vueLoader, babelLoader_1.babelLoader];
