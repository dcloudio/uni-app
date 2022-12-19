import { isElementNode } from '@dcloudio/uni-cli-shared'

import { NodeTransform } from '@vue/compiler-core'

import { isUTSComponent } from '../../utils'

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
  if (isUTSComponent(node.tag)) {
    if (!context.root.components.includes(node.tag)) {
      context.components.add(node.tag)
    }
  }
}
