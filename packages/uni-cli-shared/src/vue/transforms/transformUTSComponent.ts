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
  // @ts-expect-error 同时兼容 vapor 编译器
  const components = context.component || context.components
  if (!components) {
    return
  }
  // 1. 增加components，让sfc生成resolveComponent代码
  // 2. easycom插件会根据resolveComponent生成import插件代码触发编译
  const utsCustomElement = getUTSCustomElement(node.tag)
  if (utsCustomElement) {
    components.add(node.tag)
  } else if (matchUTSComponent(node.tag)) {
    if (!components.has(node.tag)) {
      components.add(node.tag)
    }
  }
}
