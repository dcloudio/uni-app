import {
  AttributeNode,
  createCompilerError,
  createCompoundExpression,
  DirectiveNode,
  ErrorCodes,
  ExpressionNode,
  isBindKey,
  isStaticExp,
  NodeTypes,
  SimpleExpressionNode,
  SlotOutletNode,
} from '@vue/compiler-core'
import { camelize } from '@vue/shared'
import { RENDER_SLOT } from '../runtimeHelpers'
import { genExpr } from '../codegen'
import { TransformContext } from '../transform'
import { processProps } from './transformElement'
import { rewriteExpression } from './utils'

export function rewriteSlot(node: SlotOutletNode, context: TransformContext) {
  let slotName: string | ExpressionNode = `"default"`
  let hasOtherDir = false
  const nonNameProps: (AttributeNode | DirectiveNode)[] = []
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i]
    if (p.type === NodeTypes.ATTRIBUTE) {
      if (p.value) {
        if (p.name === 'name') {
          slotName = JSON.stringify(p.value.content)
        } else {
          p.name = camelize(p.name)
          nonNameProps.push(p)
        }
      }
    } else {
      if (p.name !== 'bind') {
        hasOtherDir = true
      }
      if (p.name === 'bind' && isBindKey(p.arg, 'name')) {
        if (p.exp) slotName = p.exp
      } else {
        if (p.name === 'bind' && p.arg && isStaticExp(p.arg)) {
          p.arg.content = camelize(p.arg.content)
        }
        nonNameProps.push(p)
      }
    }
  }
  if (hasOtherDir) {
    context.onError(
      createCompilerError(
        ErrorCodes.X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET,
        node.loc
      )
    )
  }
  if (nonNameProps.length > 0) {
    processProps(node, context, nonNameProps)
    const properties: string[] = []
    nonNameProps.forEach((prop) => {
      if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'bind') {
        const property = transformProperty(prop, context)
        property && properties.push(property)
      }
    })
    if (properties.length) {
      rewriteExpression(
        createCompoundExpression([
          context.helperString(RENDER_SLOT) + '(',
          slotName,
          ',',
          `{${properties.join(',')}}`,
          ')',
        ]),
        context
      )
    }
  }
}

function transformProperty(dir: DirectiveNode, context: TransformContext) {
  if (!dir.arg || !dir.exp) {
    return
  }

  const isStaticArg =
    dir.arg.type === NodeTypes.SIMPLE_EXPRESSION && dir.arg.isStatic

  if (isStaticArg) {
    return `${(dir.arg as SimpleExpressionNode).content}:${genExpr(dir.exp)}`
  }
  return `[${genExpr(dir.arg)}||'']:${genExpr(dir.exp)}`
}
