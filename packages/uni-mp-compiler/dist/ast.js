"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariableDeclaration = void 0;
function createVariableDeclaration(name, init) {
    return `const ${name} = ${init}`;
}
exports.createVariableDeclaration = createVariableDeclaration;
