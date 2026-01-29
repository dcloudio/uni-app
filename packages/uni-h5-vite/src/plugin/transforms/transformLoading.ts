import { isElementNode } from '@dcloudio/uni-cli-shared'
import type { NodeTransform } from '@vue/compiler-core'
import {
  ElementTypes,
} from '@vue/compiler-core'

export const transformLoading: NodeTransform = (node, context) => {
  if (!isElementNode(node)) {
    return
  }
  /**
   * loading组件在easycom目录名为uniloading，
   * 不使用loading作为名称，是因为app平台内置了loading，easycom会覆盖内置loading
   * 不使用uni-loading作为名称，是因为uni-ui有同名组件
   */
  if (node.tag === 'loading') {
    node.tag = 'uniloading'
    node.tagType = ElementTypes.COMPONENT
  }
}
