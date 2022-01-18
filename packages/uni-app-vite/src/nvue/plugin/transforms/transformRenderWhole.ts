import { renameProp, isElementNode } from '@dcloudio/uni-cli-shared'
import { findProp, NodeTransform } from '@vue/compiler-core'

export const transformRenderWhole: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  debugger
  const prop = findProp(node, 'render-whole')
  if (!prop) {
    return
  }
  // render-whole => append
  renameProp('append', prop)
}
