import {
  type Expression,
  binaryExpression,
  conditionalExpression,
  identifier,
  isStringLiteral,
  logicalExpression,
  memberExpression,
  stringLiteral,
} from '@babel/types'
import {
  type AttributeNode,
  type DirectiveNode,
  NodeTypes,
  createSimpleExpression,
} from '@vue/compiler-core'
import { VIRTUAL_HOST_ID } from '@dcloudio/uni-shared'
import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'
import { parseExpr } from '../ast'
import { genBabelExpr } from '../codegen'
import type { TransformContext } from '../transform'
import { rewriteExpression } from './utils'

export function isIdBinding({ arg, exp }: DirectiveNode) {
  return arg && arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.content === 'id'
}

export function findStaticIdIndex(props: (AttributeNode | DirectiveNode)[]) {
  return props.findIndex((prop) => prop.name === 'id')
}

function genVirtualHostId(isX = false) {
  const id = identifier(VIRTUAL_HOST_ID)
  return isX ? memberExpression(identifier('_ctx'), id) : id
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
    idBindingExpr = isX
      ? expr
      : identifier(rewriteExpression(idBindingProp.exp!, context).content)
  } else {
    idBindingExpr = stringLiteral('')
  }
  if (virtualHost) {
    if (
      idBindingExpr &&
      !isStringLiteral(idBindingExpr, {
        value: '',
      })
    ) {
      /**
       * 组件属性中声明id属性时，id不会被绑定到element上。`'id' in _ctx.$.type.props`
       * virtualHostId存在且id不在props内时，virtualHostId绑定到element上
       * TODO class、style也有类似的问题，但是用法并不常见，暂时遗留
       */
      idBindingExpr = conditionalExpression(
        logicalExpression(
          '||',
          binaryExpression(
            'in',
            stringLiteral('id'),
            memberExpression(
              memberExpression(
                memberExpression(identifier('_ctx'), identifier('$')),
                identifier('type')
              ),
              identifier('props')
            )
          ),
          binaryExpression('===', genVirtualHostId(isX), stringLiteral(''))
        ),
        idBindingExpr,
        genVirtualHostId(isX)
      )
    } else {
      idBindingExpr = genVirtualHostId(isX)
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
