import { NodeTransform } from '@vue/compiler-core'

export const transformPageHead: NodeTransform = (node, context) => {
  if (!context.ssr) {
    return
  }
}
