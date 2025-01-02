import {
  type Expression,
  callExpression,
  identifier,
  stringLiteral,
} from '@babel/types'
import {
  type AttributeNode,
  type DirectiveNode,
  NodeTypes,
  createSimpleExpression,
} from '@vue/compiler-core'
import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'
import { parseExpr } from '../ast'
import { genBabelExpr } from '../codegen'
import type { TransformContext } from '../transform'
import { GEN_UNI_ELEMENT_ID } from '../runtimeHelpers'
import { rewriteExpression } from './utils'

export function isIdBinding({ arg, exp }: DirectiveNode) {
  return arg && arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.content === 'id'
}

export function findStaticIdIndex(props: (AttributeNode | DirectiveNode)[]) {
  return props.findIndex((prop) => prop.name === 'id')
}

export function rewriteId(
  index: number,
  idBindingProp: DirectiveNode,
  props: (AttributeNode | DirectiveNode)[],
  virtualHost: boolean,
  context: TransformContext,
  isX = false
) {
  let expr = idBindingProp.exp
    ? parseExpr(idBindingProp.exp, context)
    : undefined
  let idBindingExpr: Expression
  const staticIdPropIndex = findStaticIdIndex(props)
  if (staticIdPropIndex > -1) {
    idBindingExpr = stringLiteral(
      (props[staticIdPropIndex] as AttributeNode).value!.content
    )
  } else if (expr) {
    idBindingExpr =
      isX || virtualHost
        ? expr
        : identifier(rewriteExpression(idBindingProp.exp!, context).content)
  } else {
    idBindingExpr = stringLiteral('')
  }
  if (virtualHost) {
    idBindingExpr = callExpression(
      identifier(context.helperString(GEN_UNI_ELEMENT_ID)),
      [identifier('_ctx'), idBindingExpr]
    )
    if (!isX) {
      // 非uni-app-x id绑定表达式直接生成在了模板内
      idBindingExpr = identifier(
        rewriteExpression(
          createSimpleExpression(genBabelExpr(idBindingExpr)),
          context
        ).content
      )
    }
  }
  idBindingProp.exp = createSimpleExpression(genBabelExpr(idBindingExpr))
}

export function createVirtualHostId(
  props: (AttributeNode | DirectiveNode)[],
  context: TransformContext,
  isX: boolean = false
) {
  const idBindingProp = createBindDirectiveNode('id', '')
  delete idBindingProp.exp
  rewriteId(0, idBindingProp, props, true, context, isX)
  return idBindingProp
}
