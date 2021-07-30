"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
const rules_1 = require("./rules");
function createModule() {
    return {
        rules: rules_1.createRules(),
    };
}
exports.createModule = createModule;
