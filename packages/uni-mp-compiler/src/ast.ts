import { isString } from '@vue/shared'
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
  arrayExpression,
  NumericLiteral,
  numericLiteral,
  isNumericLiteral,
  Pattern,
  RestElement,
  ArrowFunctionExpression,
} from '@babel/types'
import {
  createCompilerError,
  ErrorCodes,
  ExpressionNode,
} from '@vue/compiler-core'
import { CodegenScope, CodegenVForScope, CodegenVIfScope } from './options'
import { TransformContext } from './transform'
import { genExpr } from './codegen'

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

function numericLiteralToArrayExpr(num: number) {
  const elements: NumericLiteral[] = []
  for (let i = 0; i < num; i++) {
    elements.push(numericLiteral(i + 1))
  }
  return arrayExpression(elements)
}

export function createVForCallExpression(vForScope: CodegenVForScope) {
  let sourceExpr: Expression = vForScope.sourceExpr!
  if (isNumericLiteral(sourceExpr)) {
    sourceExpr = numericLiteralToArrayExpr((sourceExpr as NumericLiteral).value)
  }
  return callExpression(identifier('vFor'), [
    sourceExpr,
    createVForArrowFunctionExpression(vForScope),
  ])
}

type FunctionParam = Identifier | Pattern | RestElement

export function parseExpr(
  code: string | ExpressionNode,
  context: TransformContext,
  node?: ExpressionNode
) {
  if (!isString(code)) {
    node = code
    code = genExpr(code)
  }
  try {
    return parseExpression(code)
  } catch (e: any) {
    context.onError(
      createCompilerError(
        ErrorCodes.X_INVALID_EXPRESSION,
        node && node.loc,
        undefined,
        e.message
      )
    )
  }
}

export function parseParam(
  code: string,
  context: TransformContext,
  node: ExpressionNode
) {
  const {
    params: [expr],
  } = parseExpr(`(${code})=>{}`, context, node) as ArrowFunctionExpression
  return expr
}

function createVForArrowFunctionExpression({
  valueExpr,
  keyExpr,
  indexExpr,
  properties,
}: CodegenVForScope) {
  const params: FunctionParam[] = []
  if (valueExpr) {
    params.push(valueExpr)
  } else if (keyExpr || indexExpr) {
    params.push(identifier('_'))
  }
  if (keyExpr) {
    params.push(keyExpr)
  } else if (indexExpr) {
    params.push(identifier('__'))
  }
  if (indexExpr) {
    params.push(indexExpr)
  }
  return arrowFunctionExpression(
    params,
    blockStatement([returnStatement(objectExpression(properties))])
  )
}
