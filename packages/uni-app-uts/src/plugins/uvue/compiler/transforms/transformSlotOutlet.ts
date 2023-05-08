import { NodeTransform, TransformContext } from '../transform'
import {
  NodeTypes,
  CallExpression,
  createCallExpression,
  ExpressionNode,
  SlotOutletNode,
} from '@vue/compiler-core'
import { isSlotOutlet, isStaticArgOf, isStaticExp } from '@vue/compiler-core'
import { PropsExpression } from '@vue/compiler-core'
import { RENDER_SLOT } from '../runtimeHelpers'
import { camelize } from '@vue/shared'

export const transformSlotOutlet: NodeTransform = (node, context) => {
  if (isSlotOutlet(node)) {
    const { loc } = node
    const { slotName } = processSlotOutlet(node, context)

    const slotArgs: CallExpression['arguments'] = [
      context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
      slotName,
    ]

    ;(node as any).codegenNode = createCallExpression(
      context.helper(RENDER_SLOT),
      slotArgs,
      loc
    )
  }
}

interface SlotOutletProcessResult {
  slotName: string | ExpressionNode
  slotProps: PropsExpression | undefined
}

export function processSlotOutlet(
  node: SlotOutletNode,
  context: TransformContext
): SlotOutletProcessResult {
  let slotName: string | ExpressionNode = `"default"`
  let slotProps: PropsExpression | undefined = undefined

  const nonNameProps = []
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
      if (p.name === 'bind' && isStaticArgOf(p.arg, 'name')) {
        if (p.exp) slotName = p.exp
      } else {
        if (p.name === 'bind' && p.arg && isStaticExp(p.arg)) {
          p.arg.content = camelize(p.arg.content)
        }
        nonNameProps.push(p)
      }
    }
  }

  return {
    slotName,
    slotProps,
  }
}
