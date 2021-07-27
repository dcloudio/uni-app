"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescriptor = exports.setDescriptor = void 0;
const fs = require("fs");
const compiler_sfc_1 = require("@vue/compiler-sfc");
const cache = new Map();
function setDescriptor(filename, entry) {
    cache.set(cleanQuery(filename), entry);
}
exports.setDescriptor = setDescriptor;
function getDescriptor(filename) {
    filename = cleanQuery(filename);
    if (cache.has(filename)) {
        return cache.get(filename);
    }
    // This function should only be called after the descriptor has been
    // cached by the main loader.
    // If this is somehow called without a cache hit, it's probably due to sub
    // loaders being run in separate threads. The only way to deal with this is to
    // read from disk directly...
    const source = fs.readFileSync(filename, 'utf-8');
    const { descriptor } = compiler_sfc_1.parse(source, {
        filename,
        sourceMap: true,
    });
    cache.set(filename, descriptor);
    return descriptor;
}
exports.getDescriptor = getDescriptor;
function cleanQuery(str) {
    const i = str.indexOf('?');
    return i > 0 ? str.slice(0, i) : str;
}
