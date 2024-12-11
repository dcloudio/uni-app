import {
  type DirectiveNode,
  NodeTypes,
  type SimpleExpressionNode,
  createCompoundExpression,
  createSimpleExpression,
  isSlotOutlet,
} from '@vue/compiler-core'

import type { NodeTransform } from '../transform'
import {
  ATTR_ELEMENT_ID,
  ATTR_SET_ELEMENT_STYLE,
  ATTR_VUE_SLOTS,
  rewriteExpression,
} from './utils'
import {
  createVirtualHostClass,
  findStaticClassIndex,
  isClassBinding,
  rewriteClass,
} from './transformClass'
import {
  createVirtualHostStyle,
  findStaticStyleIndex,
  isStyleBinding,
  rewriteStyle,
} from './transformStyle'
import {
  createVirtualHostHidden,
  findStaticHiddenIndex,
  isHiddenBinding,
  rewriteHidden,
} from './transformHidden'
import { TO_DISPLAY_STRING } from '../runtimeHelpers'
import { rewriteSlot } from './transformSlot'
import { rewriteVSlot } from './vSlot'
import { rewriteRef } from './transformRef'
import {
  isPropsBinding,
  rewriteBinding,
  rewritePropsBinding,
} from './transformComponent'
import {
  isSimpleExpressionNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import { isString, isSymbol } from '@vue/shared'
import { rewriteId } from './transformUniElement'

export const transformIdentifier: NodeTransform = (node, context) => {
  return function transformIdentifier() {
    if (node.type === NodeTypes.INTERPOLATION) {
      const content = node.content
      let isFilter = false
      if (content.type === NodeTypes.COMPOUND_EXPRESSION) {
        const firstChild = content.children[0]
        isFilter =
          !isString(firstChild) &&
          !isSymbol(firstChild) &&
          firstChild.type === NodeTypes.SIMPLE_EXPRESSION &&
          context.filters.includes(firstChild.content)
      }
      if (!isFilter) {
        node.content = rewriteExpression(
          createCompoundExpression([
            `${context.helperString(TO_DISPLAY_STRING)}(`,
            content,
            `)`,
          ]),
          context
        )
      }
    } else if (isSlotOutlet(node)) {
      rewriteSlot(node, context)
    } else if (node.type === NodeTypes.ELEMENT) {
      let hasClassBinding = false
      let hasStyleBinding = false
      let hasHiddenBinding = false

      rewriteRef(node, context)

      if (context.isX) {
        rewriteId(node, context)
      }

      if (isUserComponent(node, context)) {
        rewriteBinding(node, context)
      }

      const { props } = node
      const virtualHost = !!(
        context.miniProgram.component?.mergeVirtualHostAttributes &&
        context.rootNode === node
      )

      let elementId: string = ''
      let skipIndex: number[] = []
      // 第一步：在 x 中，先处理 id 属性，用于提前获取 elementId 对应的变量名
      if (context.isX) {
        for (let i = 0; i < props.length; i++) {
          const dir = props[i]
          if (dir.type === NodeTypes.DIRECTIVE) {
            const { arg, exp } = dir
            if (arg && exp && isSimpleExpressionNode(arg)) {
              if (arg.content === 'id' || arg.content === ATTR_ELEMENT_ID) {
                dir.exp = rewriteExpression(exp, context)
                elementId = (dir.exp as SimpleExpressionNode).content
                skipIndex.push(i)
              }
            }
          }
        }
      }

      for (let i = 0; i < props.length; i++) {
        if (context.isX) {
          // 已经处理过了
          if (skipIndex.includes(i)) {
            continue
          }
        }
        const dir = props[i]
        if (dir.type === NodeTypes.DIRECTIVE) {
          const arg = dir.arg
          if (arg) {
            // TODO 指令暂不不支持动态参数,v-bind:[arg] v-on:[event]
            if (!(arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.isStatic)) {
              // v-slot:[slotName] 支持
              if (dir.name === 'slot') {
                rewriteVSlot(dir, context)
              } else {
                props.splice(i, 1)
                i--
                continue
              }
            }
          }
          const exp = dir.exp
          if (exp) {
            if (isBuiltIn(dir)) {
              // noop
            } else if (isClassBinding(dir)) {
              hasClassBinding = true
              rewriteClass(i, dir, props, virtualHost, context)
            } else if (isStyleBinding(dir)) {
              hasStyleBinding = true
              rewriteStyle(i, dir, props, virtualHost, context, elementId)
            } else if (isHiddenBinding(dir)) {
              hasHiddenBinding = true
              rewriteHidden(i, dir, props, virtualHost, context)
            } else if (isPropsBinding(dir)) {
              rewritePropsBinding(dir, node, context)
            } else {
              if (
                context.isX &&
                elementId &&
                arg &&
                isSimpleExpressionNode(arg) &&
                arg.content === ATTR_SET_ELEMENT_STYLE
              ) {
                dir.exp = createSimpleExpression(`$eS[${elementId}]`)
              } else {
                dir.exp = rewriteExpression(exp, context)
              }
            }
          }
        }
      }
      if (virtualHost) {
        if (!hasClassBinding) {
          hasClassBinding = true
          props.push(createVirtualHostClass(props, context))
        }
        if (!hasStyleBinding) {
          hasStyleBinding = true
          props.push(createVirtualHostStyle(props, context))
        }
        if (!hasHiddenBinding) {
          hasHiddenBinding = true
          props.push(createVirtualHostHidden(props, context))
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
      if (hasHiddenBinding) {
        const staticHiddenIndex = findStaticHiddenIndex(props)
        if (staticHiddenIndex > -1) {
          props.splice(staticHiddenIndex, 1)
        }
      }
    }
  }
}

const builtInProps = [ATTR_VUE_SLOTS]

function isBuiltIn({ arg, exp }: DirectiveNode) {
  return (
    arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
    builtInProps.includes(arg.content) &&
    exp?.type === NodeTypes.SIMPLE_EXPRESSION
  )
}
