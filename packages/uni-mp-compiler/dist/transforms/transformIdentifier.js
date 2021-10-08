"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformIdentifier = void 0;
const compiler_core_1 = require("@vue/compiler-core");
const ast_1 = require("../ast");
const codegen_1 = require("../codegen");
const transformIdentifier = (node, context) => {
    const { currentScope } = context;
    return () => {
        if (node.type === 5 /* INTERPOLATION */) {
            const id = currentScope.id.next();
            const genNodeContext = (0, codegen_1.genNode)(node.content);
            currentScope.body.push((0, ast_1.createVariableDeclaration)(id, genNodeContext.code));
            node.content = (0, compiler_core_1.createSimpleExpression)(id);
        }
    };
};
exports.transformIdentifier = transformIdentifier;
