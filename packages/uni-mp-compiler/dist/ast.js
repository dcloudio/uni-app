"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParam = exports.parseExpr = exports.createVForCallExpression = exports.createVIfSpreadElement = exports.createVIfConditionalExpression = exports.createVIfProperty = exports.createObjectExpression = exports.createSpreadElement = exports.createObjectProperty = exports.createIdentifier = void 0;
const shared_1 = require("@vue/shared");
const parser_1 = require("@babel/parser");
const types_1 = require("@babel/types");
const compiler_core_1 = require("@vue/compiler-core");
const codegen_1 = require("./codegen");
function createIdentifier(name) {
    return (0, types_1.identifier)(name);
}
exports.createIdentifier = createIdentifier;
function createObjectProperty(name, value) {
    return (0, types_1.objectProperty)((0, types_1.identifier)(name), value);
}
exports.createObjectProperty = createObjectProperty;
function createSpreadElement(argument) {
    return (0, types_1.spreadElement)(argument);
}
exports.createSpreadElement = createSpreadElement;
function createObjectExpression(properties) {
    return (0, types_1.objectExpression)(properties);
}
exports.createObjectExpression = createObjectExpression;
function createVIfProperty(condition, { id }) {
    return (0, types_1.objectProperty)((0, types_1.identifier)(id.next()), condition);
}
exports.createVIfProperty = createVIfProperty;
function createVIfConditionalExpression({ condition, properties, }) {
    return (0, types_1.conditionalExpression)(condition, (0, types_1.objectExpression)(properties), (0, types_1.objectExpression)([]));
}
exports.createVIfConditionalExpression = createVIfConditionalExpression;
function createVIfSpreadElement(vIfScope) {
    return (0, types_1.spreadElement)(createVIfConditionalExpression(vIfScope));
}
exports.createVIfSpreadElement = createVIfSpreadElement;
function numericLiteralToArrayExpr(num) {
    const elements = [];
    for (let i = 0; i < num; i++) {
        elements.push((0, types_1.numericLiteral)(i + 1));
    }
    return (0, types_1.arrayExpression)(elements);
}
function createVForCallExpression(vForScope) {
    let sourceExpr = vForScope.sourceExpr;
    if ((0, types_1.isNumericLiteral)(sourceExpr)) {
        sourceExpr = numericLiteralToArrayExpr(sourceExpr.value);
    }
    return (0, types_1.callExpression)((0, types_1.identifier)('vFor'), [
        sourceExpr,
        createVForArrowFunctionExpression(vForScope),
    ]);
}
exports.createVForCallExpression = createVForCallExpression;
function parseExpr(code, context, node) {
    if (!(0, shared_1.isString)(code)) {
        node = code;
        code = (0, codegen_1.genExpr)(code);
    }
    try {
        return (0, parser_1.parseExpression)(code);
    }
    catch (e) {
        context.onError((0, compiler_core_1.createCompilerError)(44 /* X_INVALID_EXPRESSION */, node && node.loc, undefined, e.message));
    }
}
exports.parseExpr = parseExpr;
function parseParam(code, context, node) {
    const { params: [expr], } = parseExpr(`(${code})=>{}`, context, node);
    return expr;
}
exports.parseParam = parseParam;
function createVForArrowFunctionExpression({ valueExpr, keyExpr, indexExpr, properties, }) {
    const params = [];
    if (valueExpr) {
        params.push(valueExpr);
    }
    else if (keyExpr || indexExpr) {
        params.push((0, types_1.identifier)('_'));
    }
    if (keyExpr) {
        params.push(keyExpr);
    }
    else if (indexExpr) {
        params.push((0, types_1.identifier)('__'));
    }
    if (indexExpr) {
        params.push(indexExpr);
    }
    return (0, types_1.arrowFunctionExpression)(params, (0, types_1.blockStatement)([(0, types_1.returnStatement)((0, types_1.objectExpression)(properties))]));
}
