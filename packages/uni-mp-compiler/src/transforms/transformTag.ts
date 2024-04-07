import {
  HTML_TO_MINI_PROGRAM_TAGS,
  isElementNode,
} from '@dcloudio/uni-cli-shared'
import { ElementTypes } from '@vue/compiler-core'
import type { NodeTransform } from '../transform'

export const transformTag: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  const newTag = HTML_TO_MINI_PROGRAM_TAGS[node.tag]
  if (newTag) {
    node.tag = newTag
    node.tagType = ElementTypes.ELEMENT
  }
}
