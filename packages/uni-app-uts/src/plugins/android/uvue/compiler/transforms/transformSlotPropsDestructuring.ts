import {
  type CompoundExpressionNode,
  NodeTypes,
  type SimpleExpressionNode,
} from '@vue/compiler-core'
import { isString } from '@vue/shared'
import type { CodegenContext } from '../codegen'

export const SLOT_PROPS_NAME = 'slotProps'
export function isDestructuringSlotProps(
  isSlot: boolean,
  params: CompoundExpressionNode
): boolean {
  if (isSlot && params?.children?.length > 2) {
    const firstParam = params.children[0]
    const lastParam = params.children[params.children.length - 1]
    return (
      isString(firstParam) &&
      firstParam.startsWith('{') &&
      isString(lastParam) &&
      lastParam.endsWith('}')
    )
  }
  return false
}

export function createDestructuringSlotProps(
  params: CompoundExpressionNode,
  context: CodegenContext
) {
  params.children.forEach((child, index) => {
    if ((child as SimpleExpressionNode).type === NodeTypes.SIMPLE_EXPRESSION) {
      context.newline()
      const content = (child as SimpleExpressionNode).content

      if (isRename(params, index)) {
        const originKey = getOriginKey(params.children[index - 1] as string)
        context.push(`const ${content} = ${SLOT_PROPS_NAME}["${originKey}"]`)
      } else if (hasDefaultValue(params, index)) {
        const defaultValue = getDefaultValue(
          params.children[index + 1] as string
        )
        context.push(
          `const ${content} = ${SLOT_PROPS_NAME}["${content}"] !== null ? ${SLOT_PROPS_NAME}["${content}"] : ${defaultValue}`
        )
      } else {
        context.push(`const ${content} = ${SLOT_PROPS_NAME}["${content}"]`)
      }
    }
  })
}

function isRename(params: CompoundExpressionNode, index: number): boolean {
  const prevChild = params.children[index - 1]
  return isString(prevChild) && prevChild.trim().endsWith(':')
}

function getOriginKey(prevChild: string): string {
  const originKey = prevChild.substring(0, prevChild.indexOf(':')).trim()
  return originKey.startsWith('{') ? originKey.substring(1).trim() : originKey
}

function hasDefaultValue(
  params: CompoundExpressionNode,
  index: number
): boolean {
  const nextChild = params.children[index + 1]
  return isString(nextChild) && nextChild.trim().startsWith('=')
}

function getDefaultValue(nextChild: string): string {
  const defaultValue = nextChild.trim().substring(1).trim()
  return defaultValue.endsWith('}')
    ? defaultValue.substring(0, defaultValue.length - 1).trim()
    : defaultValue
}
