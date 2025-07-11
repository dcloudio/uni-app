import type { NodeTransform } from '@vue/compiler-core'
import { isElementNode } from '../../vite/utils/ast'
import { matchUTSComponent } from '../../utsUtils'
import { getUTSCustomElement } from '../../uts'

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
  // 1. 增加components，让sfc生成resolveComponent代码
  // 2. easycom插件会根据resolveComponent生成import插件代码触发编译
  const utsCustomElement = getUTSCustomElement(node.tag)
  if (utsCustomElement) {
    context.components.add(node.tag)
  } else if (matchUTSComponent(node.tag)) {
    // TODO 待处理 vapor 编译器
    if (
      context.root.components &&
      !context.root.components.includes(node.tag)
    ) {
      context.components.add(node.tag)
    }
  }
}
