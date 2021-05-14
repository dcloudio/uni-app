import { ElementNode, NodeTransform } from '@vue/compiler-core'

export const block: NodeTransform = (node) => {
  if ((node as ElementNode).tag !== 'block') {
    return
  }
  const platform = process.env.UNI_PLATFORM
  if (platform === 'h5' || platform === 'app') {
    ;(node as ElementNode).tag = 'template'
  }
}
