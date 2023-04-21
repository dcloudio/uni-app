import { isString } from '@vue/shared'
import { ParseResult, parseExpression } from '@babel/parser'
import {
  identifier,
  objectProperty,
  objectExpression,
  spreadElement,
  ObjectProperty,
  ObjectExpression,
  Expression,
  SpreadElement,
  ConditionalExpression,
  Identifier,
  conditionalExpression,
  NumericLiteral,
  isNumericLiteral,
  ArrowFunctionExpression,
  stringLiteral,
  StringLiteral,
  isIdentifier,
  isStringLiteral,
  isBooleanLiteral,
  isBigIntLiteral,
  isDecimalLiteral,
  Literal,
  isNullLiteral,
} from '@babel/types'
import {
  createCompilerError,
  ErrorCodes,
  ExpressionNode,
} from '@vue/compiler-core'
import { CodegenScope, CodegenVIfScope } from './options'
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

// function numericLiteralToArrayExpr(num: number) {
//   const elements: NumericLiteral[] = []
//   for (let i = 0; i < num; i++) {
//     elements.push(numericLiteral(i + 1))
//   }
//   return arrayExpression(elements)
// }

export function parseExpr(
  code: string | ExpressionNode,
  context: TransformContext,
  node?: ExpressionNode
): ParseResult<Expression> | undefined {
  if (!isString(code)) {
    node = code
    code = genExpr(code)
  }
  try {
    return parseExpression(code, {
      plugins: context.expressionPlugins,
    })
  } catch (e: any) {
    context.onError(
      createCompilerError(
        ErrorCodes.X_INVALID_EXPRESSION,
        node && node.loc,
        undefined,
        '\n' + code + '\n' + e.message
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

export function isUndefined(expr: Expression) {
  return isIdentifier(expr) && expr.name === 'undefined'
}

export function isTrueExpr(expr: Literal) {
  if (isNullLiteral(expr)) {
    return false
  }
  if (
    isStringLiteral(expr) ||
    isNumericLiteral(expr) ||
    isBooleanLiteral(expr) ||
    isBigIntLiteral(expr) ||
    isDecimalLiteral(expr)
  ) {
    return !!expr.value
  }
  return true
}

export function parseStringLiteral(
  expr: Expression | Identifier | StringLiteral | NumericLiteral
) {
  if (isIdentifier(expr)) {
    return stringLiteral(expr.name)
  }
  if (isStringLiteral(expr)) {
    return stringLiteral(expr.value)
  }
  return stringLiteral('')
}
