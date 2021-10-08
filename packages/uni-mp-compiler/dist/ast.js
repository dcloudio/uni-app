"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVForCallExpression = exports.createVIfSpreadElement = exports.createVIfConditionalExpression = exports.createVIfProperty = exports.createObjectExpression = exports.createSpreadElement = exports.createObjectProperty = exports.createIdentifier = void 0;
const parser_1 = require("@babel/parser");
const types_1 = require("@babel/types");
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
// export function createVIfProperties(
//   vIfScope: CodegenVIfScope,
//   { id, scopes }: CodegenScope
// ) {
//   const index = scopes.indexOf(vIfScope)
//   const vIfProperties: ObjectProperty[] = []
//   let vIfspreadElement: SpreadElement
//   let alternateExpr: ConditionalExpression | ObjectExpression =
//     objectExpression([])
//   for (let i = scopes.length - 1; i >= index; i--) {
//     const { name, condition, properties } = scopes[i] as CodegenVIfScope
//     if (name === 'if') {
//       vIfProperties.push(objectProperty(identifier(id.next()), condition!))
//       vIfspreadElement = spreadElement(
//         conditionalExpression(
//           condition!,
//           objectExpression(properties),
//           alternateExpr
//         )
//       )
//     } else if (name === 'else-if') {
//       vIfProperties.push(objectProperty(identifier(id.next()), condition!))
//       alternateExpr = conditionalExpression(
//         condition!,
//         objectExpression(properties),
//         alternateExpr
//       )
//     } else if (name === 'else') {
//       alternateExpr = objectExpression(properties)
//     }
//   }
//   return [...vIfProperties.reverse(), vIfspreadElement!]
// }
function createVForCallExpression(vForScope) {
    return (0, types_1.callExpression)((0, types_1.identifier)('vFor'), [
        (0, parser_1.parseExpression)(vForScope.source),
        createVForArrowFunctionExpression(vForScope),
    ]);
}
exports.createVForCallExpression = createVForCallExpression;
function createVForArrowFunctionExpression(vForScope) {
    const params = [];
    if (vForScope.value) {
        params.push((0, types_1.identifier)(vForScope.value));
    }
    if (vForScope.key) {
        params.push((0, types_1.identifier)(vForScope.key));
    }
    if (vForScope.index) {
        params.push((0, types_1.identifier)(vForScope.index));
    }
    return (0, types_1.arrowFunctionExpression)(params, (0, types_1.blockStatement)([(0, types_1.returnStatement)((0, types_1.objectExpression)(vForScope.properties))]));
}
