import { NodeTransform } from '@vue/compiler-core'
import { isElementNode } from '../../vite/utils/ast'
import { matchUTSComponent } from '../../utsUtils'

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
  if (matchUTSComponent(node.tag)) {
    if (!context.root.components.includes(node.tag)) {
      context.components.add(node.tag)
    }
  }
}
