import {
  arrowFunctionExpression,
  assignmentExpression,
  blockStatement,
  callExpression,
  conditionalExpression,
  Expression,
  expressionStatement,
  identifier,
  logicalExpression,
  memberExpression,
  Statement,
  stringLiteral,
} from '@babel/types'
import {
  AttributeNode,
  BindingTypes,
  DirectiveNode,
  ElementNode,
  findProp,
  IS_REF,
} from '@vue/compiler-core'
import {
  createBindDirectiveNode,
  isDirectiveNode,
  VUE_REF,
  VUE_REF_IN_FOR,
} from '@dcloudio/uni-cli-shared'
import { TransformContext } from '../transform'
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
    const code = parseRefCode(refProp, vueIdProp, context)
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
    rewriteRefProp(refProp, vueIdProp, context)
  }
}

function parseRefCode(
  prop: AttributeNode | DirectiveNode,
  vueIdProp: AttributeNode | DirectiveNode,
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
        ? processInlineRef(context, prop.value.content)
        : stringLiteral(prop.value.content)
    }
  }

  if (!expr) {
    return
  }
  return genBabelExpr(expr)
}

function rewriteRefProp(
  prop: AttributeNode | DirectiveNode,
  vueIdProp: AttributeNode | DirectiveNode,
  context: TransformContext
) {
  let id = ''
  if (isDirectiveNode(vueIdProp)) {
    const vueIdExpr = parseExpr(vueIdProp.exp!, context, vueIdProp.exp)
    if (vueIdExpr) {
      id = genBabelExpr(vueIdExpr)
    }
  } else {
    id = `'${vueIdProp.value!.content}'`
  }
  if (!id) {
    return
  }
  parseExprWithRewrite(
    context.helperString(SET_REF) +
      '(' +
      parseRefCode(prop, vueIdProp, context) +
      ', ' +
      id +
      ')',
    prop.loc,
    context
  )
}

function processInlineRef(context: TransformContext, raw: string) {
  const statements: Statement[] = []
  statements.push(
    expressionStatement(
      assignmentExpression(
        '=',
        memberExpression(identifier('_refs'), stringLiteral(raw), true),
        identifier('_value')
      )
    )
  )
  const { bindingMetadata, helperString } = context
  const type = bindingMetadata[raw]
  if (type === BindingTypes.SETUP_REF) {
    statements.push(
      expressionStatement(
        assignmentExpression(
          '=',
          memberExpression(identifier(raw), identifier('value')),
          identifier('_value')
        )
      )
    )
  } else if (type === BindingTypes.SETUP_MAYBE_REF) {
    statements.push(
      expressionStatement(
        logicalExpression(
          '&&',
          callExpression(identifier(helperString(IS_REF)), [identifier(raw)]),
          assignmentExpression(
            '=',
            memberExpression(identifier(raw), identifier('value')),
            identifier('_value')
          )
        )
      )
    )
  } else if (type === BindingTypes.SETUP_LET) {
    statements.push(
      expressionStatement(
        conditionalExpression(
          callExpression(identifier(helperString(IS_REF)), [identifier(raw)]),
          assignmentExpression(
            '=',
            memberExpression(identifier(raw), identifier('value')),
            identifier('_value')
          ),
          assignmentExpression('=', identifier(raw), identifier('_value'))
        )
      )
    )
  }
  return arrowFunctionExpression(
    [identifier('_value'), identifier('_refs')],
    blockStatement(statements)
  )
}
