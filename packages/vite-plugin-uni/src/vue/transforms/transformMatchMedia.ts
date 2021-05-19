import { ElementNode, NodeTransform } from '@vue/compiler-core'

export const transformMatchMedia: NodeTransform = (node) => {
  if ((node as ElementNode).tag === 'match-media') {
    ;(node as ElementNode).tag = 'uni-match-media'
  }
}
