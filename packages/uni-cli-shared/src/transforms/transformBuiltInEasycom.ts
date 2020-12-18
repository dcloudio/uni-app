import { NodeTransform } from '@vue/compiler-core'
import { isComponentNode } from './autoImport'

export const transformBuiltInEasycom: NodeTransform = node => {
  if (!isComponentNode(node)) {
    return
  }
  if (node.tag === 'match-media' && process.env.UNI_PLATFORM !== 'mp-weixin') {
    node.tag = 'uni-match-media'
  }
}
