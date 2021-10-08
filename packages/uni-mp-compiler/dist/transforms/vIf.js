"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processIf = exports.transformIf = exports.isIfElementNode = void 0;
const parser_1 = require("@babel/parser");
const types_1 = require("@babel/types");
const compiler_core_1 = require("@vue/compiler-core");
const ast_1 = require("../ast");
const codegen_1 = require("../codegen");
const transform_1 = require("../transform");
const transformExpression_1 = require("./transformExpression");
const transformIdentifier_1 = require("./transformIdentifier");
function isIfElementNode(node) {
    return !!node.vIf;
}
exports.isIfElementNode = isIfElementNode;
exports.transformIf = (0, compiler_core_1.createStructuralDirectiveTransform)(/^(if|else|else-if)$/, (node, dir, _context) => {
    const context = _context;
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
        const { currentScope: parentScope, popScope } = context;
        const ifOptions = {
            name: dir.name,
        };
        branch.vIf = ifOptions;
        const condition = dir.exp
            ? (0, parser_1.parseExpression)((0, codegen_1.genNode)(dir.exp).code)
            : undefined;
        const vIfScope = context.addVIfScope({
            name: dir.name,
            condition,
        });
        return () => {
            if (condition) {
                if (!(0, types_1.isLiteral)(condition)) {
                    ifOptions.condition = (0, transformIdentifier_1.rewriteExpression)(dir.exp, parentScope, condition).content;
                }
                else {
                    ifOptions.condition = dir.exp.content;
                }
            }
            if (isRoot) {
                parentScope.properties.push((0, ast_1.createVIfSpreadElement)(vIfScope));
            }
            else {
                const vIfSpreadElement = findVIfSpreadElement(parentScope);
                if (!vIfSpreadElement) {
                    popScope();
                    return context.onError((0, compiler_core_1.createCompilerError)(30 /* X_V_ELSE_NO_ADJACENT_IF */, node.loc));
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
});
function processIf(node, dir, context, processCodegen) {
    if (dir.name !== 'else' &&
        (!dir.exp || !dir.exp.content.trim())) {
        const loc = dir.exp ? dir.exp.loc : node.loc;
        context.onError((0, compiler_core_1.createCompilerError)(28 /* X_V_IF_NO_EXPRESSION */, dir.loc));
        dir.exp = (0, compiler_core_1.createSimpleExpression)(`true`, false, loc);
    }
    if (context.prefixIdentifiers && dir.exp) {
        // dir.exp can only be simple expression because vIf transform is applied
        // before expression transform.
        dir.exp = (0, transformExpression_1.processExpression)(dir.exp, context);
    }
    if (dir.name === 'if') {
        const ifNode = {
            type: 9 /* IF */,
            loc: node.loc,
            branches: [node],
        };
        context.replaceNode(ifNode);
        if (processCodegen) {
            return processCodegen(ifNode, node, true);
        }
    }
    else {
        // locate the adjacent v-if
        const siblings = context.parent.children;
        let i = siblings.indexOf(node);
        while (i-- >= -1) {
            const sibling = siblings[i];
            if (sibling && sibling.type === 3 /* COMMENT */) {
                context.removeNode(sibling);
                continue;
            }
            if (sibling &&
                sibling.type === 2 /* TEXT */ &&
                !sibling.content.trim().length) {
                context.removeNode(sibling);
                continue;
            }
            if (sibling && sibling.type === 9 /* IF */) {
                // Check if v-else was followed by v-else-if
                if (dir.name === 'else-if' &&
                    sibling.branches[sibling.branches.length - 1].vIf.condition === undefined) {
                    context.onError((0, compiler_core_1.createCompilerError)(30 /* X_V_ELSE_NO_ADJACENT_IF */, node.loc));
                }
                // move the node to the if node's branches
                context.removeNode();
                sibling.branches.push(node);
                const onExit = processCodegen &&
                    processCodegen(sibling, node, false);
                // since the branch was removed, it will not be traversed.
                // make sure to traverse here.
                (0, transform_1.traverseNode)(node, context);
                // call on exit
                if (onExit)
                    onExit();
                // make sure to reset currentNode after traversal to indicate this
                // node has been removed.
                context.currentNode = null;
            }
            else {
                context.onError((0, compiler_core_1.createCompilerError)(30 /* X_V_ELSE_NO_ADJACENT_IF */, node.loc));
            }
            break;
        }
    }
}
exports.processIf = processIf;
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
