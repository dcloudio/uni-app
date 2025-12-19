import {
  type DirectiveNode,
  ElementTypes,
  NodeTypes,
  type SimpleExpressionNode,
  createCompoundExpression,
  createSimpleExpression,
  isSlotOutlet,
} from '@vue/compiler-core'

import type { NodeTransform } from '../transform'
import {
  ATTR_ELEMENT_ID,
  ATTR_SET_ELEMENT_ANIMATION,
  ATTR_SET_ELEMENT_STYLE,
  ATTR_VUE_SLOTS,
  isFilterExpr,
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
import {
  createVirtualHostId,
  findStaticIdIndex,
  isIdBinding,
  rewriteId,
} from './transformId'
import { MERGE_PART_CLASS, TO_DISPLAY_STRING } from '../runtimeHelpers'
import { rewriteSlot } from './transformSlot'
import { rewriteVSlot } from './vSlot'
import { rewriteRef } from './transformRef'
import {
  isPropsBinding,
  rewriteBinding,
  rewritePropsBinding,
} from './transformComponent'
import {
  isDirectiveNode,
  isElementNode,
  isSimpleExpressionNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import { rewriteId as rewriteIdX } from './transformUniElement'

export const transformIdentifier: NodeTransform = (node, context) => {
  return function transformIdentifier() {
    if (node.type === NodeTypes.INTERPOLATION) {
      const content = node.content
      let isFilter = isFilterExpr(content, context)
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
    } else if (isElementNode(node)) {
      let hasClassBinding = false
      let hasStyleBinding = false
      let hasHiddenBinding = false
      let hasIdBinding = false

      const { props, tagType } = node
      const virtualHost = !!(
        context.miniProgram.component?.mergeVirtualHostAttributes &&
        context.rootNode === node
      )

      const isElement = tagType === ElementTypes.ELEMENT
      rewriteRef(node, context)

      if (context.isX) {
        if (virtualHost) {
          for (let i = 0; i < props.length; i++) {
            const dir = props[i]
            if (isDirectiveNode(dir)) {
              if (isIdBinding(dir)) {
                hasIdBinding = true
                rewriteId(i, dir, props, virtualHost, context, true)
              }
            }
          }
          if (!hasIdBinding) {
            hasIdBinding = true
            props.push(createVirtualHostId(props, context, true))
          }
          const staticIdIndex = findStaticIdIndex(props)
          if (staticIdIndex > -1) {
            props.splice(staticIdIndex, 1)
          }
        }
        rewriteIdX(node, context)
      }

      if (isUserComponent(node, context)) {
        rewriteBinding(node, context)
      }

      let elementId: string = ''
      let skipIndex: number[] = []
      // 第一步：在 x 中，先处理 id 属性，用于提前获取 elementId 对应的变量名
      if (context.isX) {
        for (let i = 0; i < props.length; i++) {
          const dir = props[i]
          if (isDirectiveNode(dir)) {
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

      // 合并part class到class内
      if (context.isX && isElement) {
        const partProp = props.find((prop) => {
          if (isDirectiveNode(prop)) {
            const { arg } = prop
            if (arg && isSimpleExpressionNode(arg)) {
              return arg.content === 'part'
            }
          } else {
            return prop.name === 'part'
          }
        })
        if (partProp) {
          const classProp = props.find((prop) => {
            if (isDirectiveNode(prop)) {
              const { arg } = prop
              if (arg && isSimpleExpressionNode(arg)) {
                return arg.content === 'class'
              }
            } else {
              return prop.name === 'class'
            }
            return false
          })
          if (classProp == null) {
            const newClassDirExpr = rewriteExpression(
              createCompoundExpression([
                context.helperString(MERGE_PART_CLASS),
                `(`,
                isDirectiveNode(partProp)
                  ? partProp.exp!
                  : createSimpleExpression(
                      `'${partProp.value?.content || ''}'`
                    ),
                `)`,
              ]),
              context
            )
            props.push({
              type: NodeTypes.DIRECTIVE,
              name: 'bind',
              exp: newClassDirExpr,
              arg: createSimpleExpression('class', true),
              modifiers: [],
              loc: partProp.loc,
            })
            skipIndex.push(props.length - 1)
          } else if (isDirectiveNode(classProp)) {
            const originalClassExpr = classProp.exp!
            classProp.exp = rewriteExpression(
              createCompoundExpression([
                context.helperString(MERGE_PART_CLASS),
                `(`,
                isDirectiveNode(partProp)
                  ? partProp.exp!
                  : createSimpleExpression(
                      `'${partProp.value?.content || ''}'`
                    ),
                `, `,
                originalClassExpr,
                `)`,
              ]),
              context
            )
            skipIndex.push(props.indexOf(classProp))
          } else {
            const staticClass = classProp.value?.content || ''
            const newClassDirExpr = rewriteExpression(
              createCompoundExpression([
                context.helperString(MERGE_PART_CLASS),
                `(`,
                isDirectiveNode(partProp)
                  ? partProp.exp!
                  : createSimpleExpression(
                      `'${partProp.value?.content || ''}'`
                    ),
                `, '${staticClass}')`,
              ]),
              context
            )
            const classPropIndex = props.indexOf(classProp)
            props.splice(classPropIndex, 1, {
              type: NodeTypes.DIRECTIVE,
              name: 'bind',
              exp: newClassDirExpr,
              arg: createSimpleExpression('class', true),
              modifiers: [],
              loc: classProp.loc,
            })
            skipIndex.push(classPropIndex)
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
        if (isDirectiveNode(dir)) {
          const arg = dir.arg
          if (arg) {
            // TODO 指令暂不不支持动态参数,v-bind:[arg] v-on:[event]
            if (!(isSimpleExpressionNode(arg) && arg.isStatic)) {
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
            } else if (isIdBinding(dir)) {
              hasIdBinding = true
              rewriteId(i, dir, props, virtualHost, context)
            } else if (isPropsBinding(dir)) {
              rewritePropsBinding(dir, node, context)
            } else {
              if (
                context.isX &&
                elementId &&
                arg &&
                isSimpleExpressionNode(arg)
              ) {
                if (arg.content === ATTR_SET_ELEMENT_STYLE) {
                  dir.exp = createSimpleExpression(`$eS[${elementId}]`)
                } else if (arg.content === ATTR_SET_ELEMENT_ANIMATION) {
                  dir.exp = createSimpleExpression(`$eA[${elementId}]`)
                } else {
                  dir.exp = rewriteExpression(exp, context)
                }
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
        if (!hasIdBinding) {
          hasIdBinding = true
          props.push(createVirtualHostId(props, context))
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
      if (hasIdBinding) {
        const staticIdIndex = findStaticIdIndex(props)
        if (staticIdIndex > -1) {
          props.splice(staticIdIndex, 1)
        }
      }
    }
  }
}

const builtInProps = [ATTR_VUE_SLOTS]

function isBuiltIn({ arg, exp }: DirectiveNode) {
  return (
    arg &&
    isSimpleExpressionNode(arg) &&
    builtInProps.includes(arg.content) &&
    exp &&
    isSimpleExpressionNode(exp)
  )
}
