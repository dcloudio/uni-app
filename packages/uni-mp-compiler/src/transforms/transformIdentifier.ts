import {
  createCompoundExpression,
  DirectiveNode,
  isSlotOutlet,
  NodeTypes,
} from '@vue/compiler-core'

import { NodeTransform } from '../transform'
import { isForElementNode } from './vFor'
import { ATTR_VUE_SLOTS, rewriteExpression } from './utils'
import { isSelfKey, rewriteSelfKey } from './transformKey'
import {
  findStaticClassIndex,
  isClassBinding,
  rewriteClass,
} from './transformClass'
import {
  findStaticStyleIndex,
  isStyleBinding,
  rewriteStyle,
} from './transformStyle'
import { TO_DISPLAY_STRING } from '../runtimeHelpers'
import { rewriteSlot } from './transformSlot'

export const transformIdentifier: NodeTransform = (node, context) => {
  return function transformIdentifier() {
    if (node.type === NodeTypes.INTERPOLATION) {
      node.content = rewriteExpression(
        createCompoundExpression([
          `${context.helperString(TO_DISPLAY_STRING)}(`,
          node.content,
          `)`,
        ]),
        context
      )
    } else if (isSlotOutlet(node)) {
      rewriteSlot(node, context)
    } else if (node.type === NodeTypes.ELEMENT) {
      const vFor = isForElementNode(node) && node.vFor
      const { props } = node
      let hasClassBinding = false
      let hasStyleBinding = false
      for (let i = 0; i < props.length; i++) {
        const dir = props[i]
        if (dir.type === NodeTypes.DIRECTIVE) {
          const arg = dir.arg
          if (arg) {
            // TODO 指令暂不不支持动态参数,v-bind:[arg] v-on:[event]
            if (!(arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.isStatic)) {
              props.splice(i, 1)
              i--
              continue
            }
          }
          const exp = dir.exp
          if (exp) {
            if (isBuiltIn(dir)) {
              // noop
            } else if (isSelfKey(dir, vFor)) {
              rewriteSelfKey(dir)
            } else if (isClassBinding(dir)) {
              hasClassBinding = true
              rewriteClass(i, dir, props, context)
            } else if (isStyleBinding(dir)) {
              hasStyleBinding = true
              rewriteStyle(i, dir, props, context)
            } else {
              dir.exp = rewriteExpression(exp, context)
            }
          }
        }
      }
      if (hasClassBinding) {
        const staticClassIndex = findStaticClassIndex(props)
        if (staticClassIndex > -1) {
          props.splice(staticClassIndex, 1)
        }
      }
      if (hasStyleBinding) {
        const staticStyleIndex = findStaticStyleIndex(props)
        if (staticStyleIndex > -1) {
          props.splice(staticStyleIndex, 1)
        }
      }
    }
  }
}

const builtInProps = [ATTR_VUE_SLOTS]

function isBuiltIn({ arg }: DirectiveNode) {
  return (
    arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
    builtInProps.includes(arg.content)
  )
}
