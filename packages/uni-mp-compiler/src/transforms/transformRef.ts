import {
  type Expression,
  type ObjectProperty,
  arrowFunctionExpression,
  identifier,
  numericLiteral,
  objectExpression,
  objectProperty,
  stringLiteral,
} from '@babel/types'
import {
  type AttributeNode,
  type DirectiveNode,
  type ElementNode,
  findProp,
} from '@vue/compiler-core'
import {
  VUE_REF,
  VUE_REF_IN_FOR,
  createBindDirectiveNode,
  isDirectiveNode,
} from '@dcloudio/uni-cli-shared'
import type { TransformContext } from '../transform'
import { ATTR_VUE_ID, parseExprWithRewrite } from './utils'

import { SET_REF } from '../runtimeHelpers'
import { genBabelExpr } from '../codegen'
import { parseExpr } from '../ast'

export function rewriteRef(node: ElementNode, context: TransformContext) {
  const vueIdProp = findProp(node, ATTR_VUE_ID)
  if (!vueIdProp) {
    return
  }
  const refProp =
    findProp(node, 'u-' + VUE_REF) || findProp(node, 'u-' + VUE_REF_IN_FOR)
  if (!refProp) {
    return
  }
  if (findProp(node, 'ref')) {
    // 支付宝小程序
    const code = parseAlipayRefCode(refProp, context)
    if (code && context.inline && !isDirectiveNode(refProp)) {
      refProp.value!.content = code
      const refPropIndex = node.props.findIndex((prop) => prop === refProp)
      node.props.splice(
        refPropIndex,
        1,
        createBindDirectiveNode(refProp.name, code)
      )
    }
  } else {
    rewriteRefProp(SET_REF, refProp, vueIdProp, {}, context)
  }
}

function parseRef(
  prop: AttributeNode | DirectiveNode,
  context: TransformContext
) {
  let expr: Expression | undefined
  let refKey = ''
  const isDir = isDirectiveNode(prop)
  if (isDir) {
    if (prop.exp) {
      expr = parseExpr(prop.exp, context, prop.exp)
    }
  } else {
    const { value } = prop
    if (value && value.content) {
      if (context.inline && context.bindingMetadata[value.content]) {
        expr = identifier(value.content)
        refKey = value.content
      } else {
        expr = stringLiteral(value.content)
      }
    }
  }
  return { expr, refKey }
}

export function parseRefCode(
  prop: AttributeNode | DirectiveNode,
  context: TransformContext
) {
  const { expr, refKey } = parseRef(prop, context)
  if (!expr) {
    return { code: '', refKey }
  }
  return { code: genBabelExpr(expr), refKey }
}

export function rewriteRefProp(
  helper: symbol,
  prop: AttributeNode | DirectiveNode,
  idProp: AttributeNode | DirectiveNode,
  opts: Record<string, any>,
  context: TransformContext
) {
  let id = ''
  if (isDirectiveNode(idProp)) {
    const vueIdExpr = parseExpr(idProp.exp!, context, idProp.exp)
    if (vueIdExpr) {
      id = genBabelExpr(vueIdExpr)
    }
  } else {
    id = `'${idProp.value!.content}'`
  }
  if (!id) {
    return
  }
  const { code, refKey } = parseRefCode(prop, context)

  if (refKey) {
    opts.k = refKey
  }
  if (context.inVFor) {
    opts.f = 1
  }
  parseExprWithRewrite(
    context.helperString(helper) +
      '(' +
      code +
      ', ' +
      id +
      (Object.keys(opts).length ? ', ' + JSON.stringify(opts) : '') +
      ')',
    prop.loc,
    context
  )
}

function parseAlipayRefCode(
  prop: AttributeNode | DirectiveNode,
  context: TransformContext
) {
  let expr: Expression | undefined
  const isDir = isDirectiveNode(prop)
  if (isDir) {
    if (prop.exp) {
      expr = parseExpr(prop.exp, context, prop.exp)
    }
  } else {
    if (prop.value?.content) {
      expr = context.inline
        ? processInlineRef(prop, context)
        : stringLiteral(prop.value.content)
    }
  }

  if (!expr) {
    return
  }
  return genBabelExpr(expr)
}

function processInlineRef(prop: AttributeNode, context: TransformContext) {
  const properties: ObjectProperty[] = []
  const { refKey } = parseRef(prop, context)
  properties.push(
    objectProperty(identifier('r'), identifier(prop.value!.content))
  )
  if (refKey) {
    properties.push(objectProperty(identifier('k'), stringLiteral(refKey)))
  }
  if (context.inVFor) {
    properties.push(objectProperty(identifier('f'), numericLiteral(1)))
  }
  return arrowFunctionExpression([], objectExpression(properties))
}
