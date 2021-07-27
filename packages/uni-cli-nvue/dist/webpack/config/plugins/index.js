"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const define_1 = require("./define");
const banner_1 = require("./banner");
const provide_1 = require("./provide");
const vueLoader_1 = require("./vueLoader");
exports.plugins = [
    define_1.define,
    banner_1.banner,
    provide_1.provide,
    vueLoader_1.vueLoaderPlugin,
];
