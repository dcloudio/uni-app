"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModuleAlias = void 0;
const module_alias_1 = __importDefault(require("module-alias"));
const utils_1 = require("../utils");
const MODULES = [
    'weex-styler',
    'weex-template-compiler',
    '@vue/component-compiler-utils',
    '@vue/component-compiler-utils/package.json',
];
function initModuleAlias() {
    MODULES.forEach((name) => module_alias_1.default.addAlias(name, utils_1.resolveLib(name)));
}
exports.initModuleAlias = initModuleAlias;
