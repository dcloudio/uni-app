import type { NodeTransform } from '@vue/compiler-core'
import { isElementNode } from '../../vite/utils/ast'
import { matchUTSComponent } from '../../utsUtils'
import { getUTSCustomElement } from '../../uts'

export const UTS_CUSTOM_ELEMENT_IMPORT_PLACEHOLDER =
  '__UTS_CUSTOM_ELEMENT_IMPORT_PLACEHOLDER__'
/**
 * 将uts组件保存到自定义组件列表中
 * @param node
 * @param context
 * @returns
 */
export const transformUTSComponent: NodeTransform = (node, context) => {
  if (!isElementNode(node)) {
    return
  }
  const utsCustomElement = getUTSCustomElement(node.tag)
  if (utsCustomElement) {
    const { source } = utsCustomElement
    if (!context.imports.find((i) => i.path === source)) {
      context.imports.push({
        path: source,
        exp: UTS_CUSTOM_ELEMENT_IMPORT_PLACEHOLDER,
      })
    }
  } else if (matchUTSComponent(node.tag)) {
    if (!context.root.components.includes(node.tag)) {
      context.components.add(node.tag)
    }
  }
}
