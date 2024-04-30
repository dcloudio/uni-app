import { isElementNode } from '@dcloudio/uni-cli-shared'
import { ElementTypes, NodeTypes, findDir } from '@vue/compiler-core'
import type { NodeTransform } from '../transform'

export const transformText: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  const dir = findDir(node, 'text')
  if (!dir) {
    return
  }
  // remove v-text
  node.props.splice(node.props.indexOf(dir), 1)
  if (node.tagType !== ElementTypes.ELEMENT) {
    return
  }
  node.isSelfClosing = false
  node.children = [
    {
      type: NodeTypes.INTERPOLATION,
      loc: dir.exp!.loc,
      content: dir.exp!,
    },
  ]
}
