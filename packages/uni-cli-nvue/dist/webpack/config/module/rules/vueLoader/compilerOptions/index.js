"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompilerOptions = void 0;
const modules_1 = require("./modules");
function createCompilerOptions(options) {
    return {
        modules: modules_1.createModules(options),
    };
}
exports.createCompilerOptions = createCompilerOptions;
