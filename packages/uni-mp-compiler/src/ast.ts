import { parseExpression } from '@babel/parser'
import {
  identifier,
  blockStatement,
  callExpression,
  objectProperty,
  objectExpression,
  spreadElement,
  ObjectProperty,
  ObjectExpression,
  Expression,
  SpreadElement,
  ConditionalExpression,
  arrowFunctionExpression,
  Identifier,
  returnStatement,
  conditionalExpression,
} from '@babel/types'
import { CodegenScope, CodegenVForScope, CodegenVIfScope } from './options'

export function createIdentifier(name: string) {
  return identifier(name)
}
export function createObjectProperty(
  name: string,
  value: Expression
): ObjectProperty {
  return objectProperty(identifier(name), value)
}
export function createSpreadElement(argument: ConditionalExpression) {
  return spreadElement(argument)
}
export function createObjectExpression(
  properties: Array<ObjectProperty | SpreadElement>
): ObjectExpression {
  return objectExpression(properties)
}

export function createVIfProperty(condition: Expression, { id }: CodegenScope) {
  return objectProperty(identifier(id.next()), condition)
}

export function createVIfConditionalExpression({
  condition,
  properties,
}: CodegenVIfScope) {
  return conditionalExpression(
    condition!,
    objectExpression(properties),
    objectExpression([])
  )
}

export function createVIfSpreadElement(vIfScope: CodegenVIfScope) {
  return spreadElement(createVIfConditionalExpression(vIfScope))
}

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

export function createVForCallExpression(vForScope: CodegenVForScope) {
  return callExpression(identifier('vFor'), [
    parseExpression(vForScope.source),
    createVForArrowFunctionExpression(vForScope),
  ])
}

function createVForArrowFunctionExpression(vForScope: CodegenVForScope) {
  const params: Identifier[] = []
  if (vForScope.value) {
    params.push(identifier(vForScope.value))
  }
  if (vForScope.key) {
    params.push(identifier(vForScope.key))
  }
  if (vForScope.index) {
    params.push(identifier(vForScope.index))
  }
  return arrowFunctionExpression(
    params,
    blockStatement([returnStatement(objectExpression(vForScope.properties))])
  )
}
