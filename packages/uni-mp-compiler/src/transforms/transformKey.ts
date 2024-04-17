import {
  type DirectiveNode,
  NodeTypes,
  type SimpleExpressionNode,
} from '@vue/compiler-core'
import type { ForElementNode } from './vFor'

export function isSelfKey(
  { arg, exp }: DirectiveNode,
  vFor: ForElementNode['vFor'] | false
) {
  return (
    vFor &&
    arg &&
    exp &&
    arg.type === NodeTypes.SIMPLE_EXPRESSION &&
    arg.content === 'key' &&
    exp.type === NodeTypes.SIMPLE_EXPRESSION &&
    exp.content === vFor.valueAlias
  )
}

export function rewriteSelfKey(dir: DirectiveNode) {
  ;(dir.exp as SimpleExpressionNode).content = '*this'
}
