import {
  type Expression,
  binaryExpression,
  booleanLiteral,
  conditionalExpression,
  identifier,
  isIdentifier,
  logicalExpression,
  stringLiteral,
  unaryExpression,
} from '@babel/types'
import {
  type AttributeNode,
  type DirectiveNode,
  NodeTypes,
  createSimpleExpression,
} from '@vue/compiler-core'
import { VIRTUAL_HOST_HIDDEN } from '@dcloudio/uni-shared'
import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'
import { parseExpr } from '../ast'
import { genBabelExpr } from '../codegen'
import type { TransformContext } from '../transform'
import { rewriteExpression } from './utils'

export function isHiddenBinding({ arg, exp }: DirectiveNode) {
  return (
    arg && arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.content === 'hidden'
  )
}

export function findStaticHiddenIndex(
  props: (AttributeNode | DirectiveNode)[]
) {
  return props.findIndex((prop) => prop.name === 'hidden')
}

export function findVShowIndex(props: (AttributeNode | DirectiveNode)[]) {
  return props.findIndex(
    (prop) => prop.name === 'show' && prop.type === NodeTypes.DIRECTIVE
  )
}

export function rewriteHidden(
  index: number,
  hiddenBindingProp: DirectiveNode,
  props: (AttributeNode | DirectiveNode)[],
  virtualHost: boolean,
  context: TransformContext
) {
  let bindingProp = hiddenBindingProp
  const vShowIndex = findVShowIndex(props)
  if (vShowIndex > -1) {
    bindingProp = props[vShowIndex] as DirectiveNode
  }
  let expr = bindingProp.exp ? parseExpr(bindingProp.exp, context) : undefined
  let hiddenBindingExpr: Expression
  if (virtualHost) {
    const staticClassPropIndex = findStaticHiddenIndex(props)
    // skyline模式hidden传undefined会导致元素被隐藏
    const virtualHostHiddenPolyfill = logicalExpression(
      '||',
      identifier(VIRTUAL_HOST_HIDDEN),
      booleanLiteral(false)
    )
    if (expr || staticClassPropIndex > -1) {
      let res: Expression = booleanLiteral(true)
      if (expr) {
        // TODO ignore all simple expression
        res = isIdentifier(expr)
          ? expr
          : identifier(rewriteExpression(bindingProp.exp!, context).content)
        if (vShowIndex > -1) {
          props.splice(vShowIndex, 1)
          res = unaryExpression('!', res)
        }
      }
      hiddenBindingExpr = conditionalExpression(
        binaryExpression(
          '!==',
          identifier(VIRTUAL_HOST_HIDDEN),
          stringLiteral('')
        ),
        virtualHostHiddenPolyfill,
        res
      )
    } else {
      hiddenBindingExpr = virtualHostHiddenPolyfill
    }
  } else if (expr) {
    hiddenBindingExpr = identifier(
      rewriteExpression(bindingProp.exp!, context).content
    )
  } else {
    // ignore rewrite without virtualHost
    return
  }
  hiddenBindingProp.exp = createSimpleExpression(
    genBabelExpr(hiddenBindingExpr)
  )
}

export function createVirtualHostHidden(
  props: (AttributeNode | DirectiveNode)[],
  context: TransformContext
) {
  const hiddenBindingProp = createBindDirectiveNode('hidden', '')
  delete hiddenBindingProp.exp
  rewriteHidden(0, hiddenBindingProp, props, true, context)
  return hiddenBindingProp
}
