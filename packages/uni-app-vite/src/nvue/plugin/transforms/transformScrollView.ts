import { NodeTransform, NodeTypes } from '@vue/compiler-core'

export const transformScrollView: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ROOT) {
    return
  }
  console.log(context)
}
