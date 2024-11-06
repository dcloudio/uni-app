import {
  type ArrayExpression,
  type Expression,
  type ObjectExpression,
  arrayExpression,
  binaryExpression,
  identifier,
  isArrayExpression,
  isIdentifier,
  isObjectExpression,
  isObjectProperty,
  isPrivateName,
  isSpreadElement,
  isStringLiteral,
  stringLiteral,
} from '@babel/types'
import {
  type AttributeNode,
  type DirectiveNode,
  type ExpressionNode,
  NodeTypes,
  type SourceLocation,
  createCompoundExpression,
  createSimpleExpression,
} from '@vue/compiler-core'
import { hyphenate } from '@vue/shared'
import {
  createBindDirectiveNode,
  isCompoundExpressionNode,
} from '@dcloudio/uni-cli-shared'
import { HYPHENATE, STRINGIFY_STYLE } from '../runtimeHelpers'
import { parseExpr, parseStringLiteral } from '../ast'
import { genBabelExpr } from '../codegen'
import type { TransformContext } from '../transform'
import {
  VIRTUAL_HOST_STYLE,
  isStaticLiteral,
  parseExprWithRewrite,
  rewirteWithHelper,
  rewriteExpression,
  rewriteSpreadElement,
} from './utils'

export function isStyleBinding({ arg, exp }: DirectiveNode) {
  return (
    arg && arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.content === 'style'
  )
}
export function findStaticStyleIndex(props: (AttributeNode | DirectiveNode)[]) {
  return props.findIndex((prop) => prop.name === 'style')
}

export function rewriteStyle(
  index: number,
  styleBindingProp: DirectiveNode,
  props: (AttributeNode | DirectiveNode)[],
  virtualHost: boolean,
  context: TransformContext,
  elementId?: string
) {
  const expr = styleBindingProp.exp
    ? parseExpr(styleBindingProp.exp, context)
    : undefined
  let styleBidingExpr: Expression | undefined = expr
  if (expr) {
    if (isObjectExpression(expr)) {
      styleBidingExpr = createStyleBindingByObjectExpression(
        rewriteStyleObjectExpression(expr, styleBindingProp.loc, context)
      )
    } else if (isArrayExpression(expr)) {
      styleBidingExpr = createStyleBindingByArrayExpression(
        rewriteStyleArrayExpression(expr, context)
      )
    } else {
      // 在 x 中，如果有 id 且不支持 setStyle
      if (
        elementId &&
        context.isX &&
        !context.miniProgram.filter?.setStyle &&
        isCompoundExpressionNode(styleBindingProp.exp!)
      ) {
        rewriteStyleExpression(styleBindingProp.exp!, context)
        styleBidingExpr = parseExpr(`$eS[${elementId}]`, context)
      } else {
        styleBidingExpr = parseExpr(
          rewriteStyleExpression(styleBindingProp.exp!, context).content,
          context
        )
      }
    }
    if (!styleBidingExpr) {
      return
    }
  } else if (!virtualHost) {
    return
  }
  const staticStylePropIndex = findStaticStyleIndex(props)
  if (staticStylePropIndex > -1) {
    const staticStyle = (props[staticStylePropIndex] as AttributeNode).value!
      .content
    if (staticStyle.trim()) {
      if (styleBidingExpr) {
        if (index > staticStylePropIndex) {
          styleBidingExpr = binaryExpression(
            '+',
            addSemicolon(stringLiteral(staticStyle)),
            styleBidingExpr
          )
        } else {
          styleBidingExpr = binaryExpression(
            '+',
            addSemicolon(styleBidingExpr),
            stringLiteral(staticStyle)
          )
        }
      } else {
        styleBidingExpr = stringLiteral(staticStyle)
      }
    }
  }
  if (virtualHost) {
    styleBidingExpr = styleBidingExpr
      ? binaryExpression(
          '+',
          addSemicolon(styleBidingExpr),
          identifier(VIRTUAL_HOST_STYLE)
        )
      : identifier(VIRTUAL_HOST_STYLE)
  }
  styleBindingProp.exp = createSimpleExpression(genBabelExpr(styleBidingExpr!))
}

export function createVirtualHostStyle(
  props: (AttributeNode | DirectiveNode)[],
  context: TransformContext
) {
  const styleBindingProp = createBindDirectiveNode('style', '')
  delete styleBindingProp.exp
  rewriteStyle(0, styleBindingProp, props, true, context)
  return styleBindingProp
}

function rewriteStyleExpression(
  expr: ExpressionNode,
  context: TransformContext
) {
  return rewriteExpression(
    createCompoundExpression([
      context.helperString(STRINGIFY_STYLE) + '(',
      expr,
      ')',
    ]),
    context
  )
}

function rewriteStyleArrayExpression(
  expr: ArrayExpression,
  context: TransformContext
) {
  expr.elements.forEach((prop, index) => {
    if (!isStringLiteral(prop)) {
      const code = genBabelExpr(
        arrayExpression([isSpreadElement(prop) ? prop.argument : prop])
      )
      expr.elements[index] = identifier(
        rewriteStyleExpression(
          createSimpleExpression(code.slice(1, -1), false),
          context
        ).content
      )
    }
  })
  return expr
}

function rewriteStyleObjectExpression(
  expr: ObjectExpression,
  loc: SourceLocation,
  context: TransformContext
) {
  expr.properties.forEach((prop, index) => {
    if (isSpreadElement(prop)) {
      // <view :style="{...obj}"/>
      // <view style="{{a}}"/>
      const newExpr = rewriteSpreadElement(STRINGIFY_STYLE, prop, loc, context)
      if (newExpr) {
        prop.argument = newExpr
      }
    } else if (isObjectProperty(prop)) {
      const { key, value, computed } = prop
      if (!isPrivateName(key)) {
        if (computed) {
          // {[handle(computedKey)]:1} => {[a]:1}
          const newExpr = rewirteWithHelper(HYPHENATE, key, loc, context)
          if (newExpr) {
            prop.key = newExpr
          }
        } else {
          // {fontSize:'15px'} => {'font-size':'15px'}
          prop.key = parseStringLiteral(key)
          prop.key.value = hyphenate(prop.key.value) + ':'
        }
        // {fontSize:`${fontSize}px`} => {'font-size':a}
        if (isStaticLiteral(value)) {
          return
        } else {
          const newExpr = parseExprWithRewrite(
            genBabelExpr(value as Expression),
            loc,
            context,
            value as Expression
          )
          if (newExpr) {
            prop.value = newExpr
          }
        }
      }
    }
  })
  return expr
}

function addSemicolon(expr: Expression) {
  return createBinaryExpression(expr, stringLiteral(';'))
}

function createBinaryExpression(left: Expression, right: Expression) {
  return binaryExpression('+', left, right)
}

function createStyleBindingByArrayExpression(expr: ArrayExpression) {
  let result: Expression | undefined
  function concat(expr: Expression) {
    if (!result) {
      result = expr
    } else {
      result = createBinaryExpression(addSemicolon(result), expr)
    }
  }
  expr.elements.forEach((prop) => {
    if (isStringLiteral(prop) || isIdentifier(prop)) {
      concat(prop)
    }
  })
  return result
}

function createStyleBindingByObjectExpression(expr: ObjectExpression) {
  let result: Expression | undefined
  function concat(expr: Expression) {
    if (!result) {
      result = expr
    } else {
      result = createBinaryExpression(addSemicolon(result), expr)
    }
  }
  expr.properties.forEach((prop) => {
    if (isSpreadElement(prop)) {
      concat(prop.argument)
    } else if (isObjectProperty(prop)) {
      const { key, value } = prop
      if (!isPrivateName(key)) {
        const expr = createBinaryExpression(
          isStringLiteral(key)
            ? key // 之前已经补充了:
            : createBinaryExpression(key, stringLiteral(':')),
          value as Expression
        )
        concat(expr)
      }
    }
  })
  return result
}
