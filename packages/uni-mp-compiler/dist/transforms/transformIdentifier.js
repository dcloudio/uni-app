"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteExpression = exports.transformIdentifier = void 0;
const estree_walker_1 = require("estree-walker");
const parser_1 = require("@babel/parser");
const types_1 = require("@babel/types");
const compiler_core_1 = require("@vue/compiler-core");
const ast_1 = require("../ast");
const codegen_1 = require("../codegen");
const transform_1 = require("../transform");
const transformIdentifier = (node, context) => {
    return () => {
        const { currentScope } = context;
        if (node.type === 5 /* INTERPOLATION */) {
            node.content = rewriteExpression(node.content, currentScope);
        }
        else if (node.type === 1 /* ELEMENT */) {
            for (let i = 0; i < node.props.length; i++) {
                const dir = node.props[i];
                if (dir.type === 7 /* DIRECTIVE */) {
                    const exp = dir.exp;
                    const arg = dir.arg;
                    if (exp) {
                        dir.exp = rewriteExpression(exp, currentScope);
                    }
                    if (arg) {
                        dir.arg = rewriteExpression(arg, currentScope);
                    }
                }
            }
        }
    };
};
exports.transformIdentifier = transformIdentifier;
function rewriteExpression(node, scope, babelNode) {
    if (node.type === 4 /* SIMPLE_EXPRESSION */ && node.isStatic) {
        return node;
    }
    babelNode = babelNode || (0, parser_1.parseExpression)((0, codegen_1.genNode)(node).code);
    scope = findScope(babelNode, scope);
    const id = scope.id.next();
    scope.properties.push((0, ast_1.createObjectProperty)(id, babelNode));
    if (node.type === 8 /* COMPOUND_EXPRESSION */) {
        const firstChild = node.children[0];
        if (isSimpleExpression(firstChild)) {
            const content = firstChild.content.trim();
            if (scope.identifiers.includes(content)) {
                return (0, compiler_core_1.createSimpleExpression)(content + '.' + id);
            }
        }
    }
    return (0, compiler_core_1.createSimpleExpression)(id);
}
exports.rewriteExpression = rewriteExpression;
function findScope(node, scope) {
    if ((0, transform_1.isRootScope)(scope) || (0, transform_1.isVIfScope)(scope)) {
        return scope;
    }
    return findVForScope(node, scope);
}
function findVForScope(node, scope) {
    if ((0, transform_1.isVForScope)(scope)) {
        if (isReferencedScope(node, scope)) {
            return scope;
        }
    }
    // if (scope.parent) {
    //   return findVForScope(node, scope.parent)
    // }
}
function isReferencedScope(node, scope) {
    const knownIds = [];
    if (scope.value) {
        knownIds.push(scope.value);
    }
    if (scope.key) {
        knownIds.push(scope.key);
    }
    if (scope.index) {
        knownIds.push(scope.index);
    }
    let referenced = false;
    (0, estree_walker_1.walk)(node, {
        enter(node, parent) {
            if (referenced) {
                return this.skip();
            }
            if (!(0, types_1.isIdentifier)(node)) {
                return;
            }
            if (knownIds.includes(node.name) && (0, types_1.isReferenced)(node, parent)) {
                referenced = true;
                return this.skip();
            }
        },
    });
    return referenced;
}
function isSimpleExpression(val) {
    return val.type && val.type === 4 /* SIMPLE_EXPRESSION */;
}
