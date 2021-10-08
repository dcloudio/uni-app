"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformIf = void 0;
const parser_1 = require("@babel/parser");
const types_1 = require("@babel/types");
const compiler_core_1 = require("@vue/compiler-core");
const ast_1 = require("../ast");
const codegen_1 = require("../codegen");
const transformExpression_1 = require("./transformExpression");
const transformIdentifier_1 = require("./transformIdentifier");
exports.transformIf = (0, compiler_core_1.createStructuralDirectiveTransform)(/^(if|else|else-if)$/, (node, dir, _context) => {
    const context = _context;
    if (dir.name !== 'else' &&
        (!dir.exp || !dir.exp.content.trim())) {
        const loc = dir.exp ? dir.exp.loc : node.loc;
        context.onError((0, compiler_core_1.createCompilerError)(28 /* X_V_IF_NO_EXPRESSION */, dir.loc));
        dir.exp = (0, compiler_core_1.createSimpleExpression)(`true`, false, loc);
    }
    if (context.prefixIdentifiers && dir.exp) {
        dir.exp = (0, transformExpression_1.processExpression)(dir.exp, context);
    }
    const condition = dir.exp
        ? (0, parser_1.parseExpression)((0, codegen_1.genNode)(dir.exp).code)
        : undefined;
    const { currentScope: parentScope, popScope } = context;
    const vIfScope = context.addVIfScope({
        name: dir.name,
        condition,
    });
    return () => {
        const ifNode = {
            name: dir.name,
            condition: '',
        };
        if (condition) {
            if (!(0, types_1.isLiteral)(condition)) {
                ifNode.condition = (0, transformIdentifier_1.rewriteExpression)(dir.exp, parentScope, condition).content;
            }
            else {
                ifNode.condition = dir.exp.content;
            }
        }
        ;
        node.ifNode = ifNode;
        if (dir.name === 'if') {
            parentScope.properties.push((0, ast_1.createVIfSpreadElement)(vIfScope));
        }
        else {
            const vIfSpreadElement = findVIfSpreadElement(parentScope);
            if (!vIfSpreadElement) {
                popScope();
                return context.onError((0, compiler_core_1.createCompilerError)(30 /* X_V_ELSE_NO_ADJACENT_IF */, dir.loc));
            }
            let alternate = (0, ast_1.createObjectExpression)([]);
            if (dir.name === 'else-if') {
                alternate = (0, ast_1.createVIfConditionalExpression)(vIfScope);
            }
            else if (dir.name === 'else') {
                alternate = (0, ast_1.createObjectExpression)(vIfScope.properties);
            }
            findVIfConditionalExpression(vIfSpreadElement.argument).alternate = alternate;
        }
        popScope();
    };
});
function findVIfSpreadElement({ properties }) {
    const len = properties.length;
    for (let i = len - 1; i >= 0; i--) {
        const prop = properties[i];
        if ((0, types_1.isSpreadElement)(prop)) {
            return prop;
        }
    }
}
function findVIfConditionalExpression(vIfConditionalExpression) {
    if ((0, types_1.isConditionalExpression)(vIfConditionalExpression.alternate)) {
        return findVIfConditionalExpression(vIfConditionalExpression.alternate);
    }
    return vIfConditionalExpression;
}
