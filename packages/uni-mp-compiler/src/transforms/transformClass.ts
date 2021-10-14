import {
  Expression,
  isObjectExpression,
  isArrayExpression,
  arrayExpression,
  stringLiteral,
  ArrayExpression,
  isStringLiteral,
  identifier,
  isSpreadElement,
  ObjectExpression,
  objectProperty,
  booleanLiteral,
  isObjectProperty,
  Identifier,
  isLiteral,
  isIdentifier,
  LogicalExpression,
  logicalExpression,
  StringLiteral,
} from '@babel/types'
import {
  DirectiveNode,
  NodeTypes,
  AttributeNode,
  createSimpleExpression,
  ExpressionNode,
  createCompoundExpression,
  NORMALIZE_CLASS,
  SourceLocation,
} from '@vue/compiler-core'
import { parseExpr, isTrueExpr, isUndefined, parseStringLiteral } from '../ast'
import { genBabelExpr } from '../codegen'
import { TransformContext } from '../transform'
import {
  parseExprWithRewrite,
  rewriteExpression,
  rewriteSpreadElement,
} from './utils'

export function isClassBinding({ arg, exp }: DirectiveNode) {
  return (
    arg && arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.content === 'class'
  )
}

export function findStaticClassIndex(props: (AttributeNode | DirectiveNode)[]) {
  return props.findIndex((prop) => prop.name === 'class')
}

export function rewriteClass(
  index: number,
  classBindingProp: DirectiveNode,
  props: (AttributeNode | DirectiveNode)[],
  context: TransformContext
) {
  if (!classBindingProp.exp) {
    return
  }
  const expr = parseExpr(classBindingProp.exp, context)
  if (!expr) {
    return
  }
  let classBidingExpr: Expression = expr
  if (isObjectExpression(expr)) {
    classBidingExpr = createClassBindingByObjectExpression(
      rewriteClassObjectExpression(expr, classBindingProp.loc, context)
    )
  } else if (isArrayExpression(expr)) {
    classBidingExpr = createClassBindingByArrayExpression(
      rewriteClassArrayExpression(expr, context)
    )
  } else {
    classBidingExpr = parseExpr(
      rewriteClassExpression(classBindingProp.exp, context).content,
      context
    ) as Expression
  }
  const staticClassPropIndex = findStaticClassIndex(props)
  if (staticClassPropIndex > -1) {
    const staticClass = (props[staticClassPropIndex] as AttributeNode).value!
      .content
    if (staticClass.trim()) {
      if (!isArrayExpression(classBidingExpr)) {
        classBidingExpr = arrayExpression([classBidingExpr])
      }
      if (index > staticClassPropIndex) {
        classBidingExpr.elements.unshift(stringLiteral(staticClass))
      } else {
        classBidingExpr.elements.push(stringLiteral(staticClass))
      }
    }
  }
  classBindingProp.exp = createSimpleExpression(genBabelExpr(classBidingExpr))
}

function rewriteClassExpression(
  expr: ExpressionNode,
  context: TransformContext
) {
  return rewriteExpression(
    createCompoundExpression([
      context.helperString(NORMALIZE_CLASS) + '(',
      expr,
      ')',
    ]),
    context
  )
}

function rewriteClassArrayExpression(
  expr: ArrayExpression,
  context: TransformContext
) {
  expr.elements.forEach((prop, index) => {
    if (!isStringLiteral(prop)) {
      const code = genBabelExpr(
        arrayExpression([isSpreadElement(prop) ? prop.argument : prop])
      )
      expr.elements[index] = identifier(
        rewriteClassExpression(
          createSimpleExpression(code.slice(1, -1), false),
          context
        ).content
      )
    }
  })
  return expr
}

function rewriteClassObjectExpression(
  expr: ObjectExpression,
  loc: SourceLocation,
  context: TransformContext
) {
  expr.properties.forEach((prop, index) => {
    if (isSpreadElement(prop)) {
      // <view :class="{...obj}"/>
      // <view class="{{[a]}}"/>
      const newExpr = rewriteSpreadElement(NORMALIZE_CLASS, prop, loc, context)
      if (newExpr) {
        expr.properties[index] = objectProperty(
          newExpr,
          booleanLiteral(true),
          true
        )
      }
    } else if (isObjectProperty(prop)) {
      const { key, value, computed } = prop
      if (computed) {
        // {[handle(computedKey)]:1} => {[a]:1}
        prop.key = parseExprWithRewrite(
          genBabelExpr(key as Expression),
          loc,
          context,
          key as Expression
        ) as Identifier
      }
      if (isLiteral(value)) {
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
  })
  return expr
}

function createClassBindingByArrayExpression(expr: ArrayExpression) {
  const elements: (StringLiteral | Identifier)[] = []
  expr.elements.forEach((prop) => {
    if (isStringLiteral(prop) || isIdentifier(prop)) {
      elements.push(prop)
    }
  })
  return arrayExpression(elements)
}

function createClassBindingByObjectExpression(expr: ObjectExpression) {
  const elements: (LogicalExpression | StringLiteral | Identifier)[] = []
  expr.properties.forEach((prop) => {
    if (isObjectProperty(prop)) {
      const { value } = prop
      if (isUndefined(value as Expression)) {
        // remove {a:undefined}
        return
      }
      if (isLiteral(value)) {
        // {a:true,b:1,c:0} => ['a','b']
        if (isTrueExpr(value)) {
          elements.push(
            prop.computed
              ? (prop.key as Identifier)
              : parseStringLiteral(prop.key)
          )
        }
        return
      }
      elements.push(
        logicalExpression(
          '&&',
          value as Expression,
          prop.computed ? prop.key : parseStringLiteral(prop.key)
        )
      )
    }
  })
  return arrayExpression(elements)
}
