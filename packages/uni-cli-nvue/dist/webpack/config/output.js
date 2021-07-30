"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutput = void 0;
function createOutput() {
    return {
        path: process.env.UNI_OUTPUT_DIR,
        filename: '[name].js',
    };
}
exports.createOutput = createOutput;
