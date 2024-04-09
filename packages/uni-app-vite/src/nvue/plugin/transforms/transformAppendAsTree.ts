import {
  createBindDirectiveNode,
  isElementNode,
  renameProp,
} from '@dcloudio/uni-cli-shared'
import { type NodeTransform, findProp } from '@vue/compiler-core'

const unitaryTags = [
  'cell',
  'header',
  'cell-slot',
  'recycle-list',
  'text',
  'u-text',
]

export const transformAppendAsTree: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  // append => appendAsTree: true
  const appendProp = findProp(node, 'append')
  if (appendProp) {
    renameProp('appendAsTree', appendProp)
    return
  }
  if (!unitaryTags.includes(node.tag)) {
    return
  }
  node.props.push(createBindDirectiveNode('appendAsTree', 'true'))
}
