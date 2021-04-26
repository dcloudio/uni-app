import { ElementNode, NodeTransform } from '@vue/compiler-core'

export const matchMedia: NodeTransform = (node) => {
  if (
    process.env.UNI_PLATFORM !== 'mp-weixin' &&
    (node as ElementNode).tag === 'match-media'
  ) {
    ;(node as ElementNode).tag = 'uni-match-media'
  }
}
