import { isAttributeNode, isElementNode } from '@dcloudio/uni-cli-shared'
import { parseStringStyle, stringifyStyle } from '@vue/shared'
import type { NodeTransform } from '../transform'

export const transformAttr: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  node.props.forEach((prop) => {
    if (isAttributeNode(prop) && prop.value) {
      switch (prop.name) {
        case 'style':
          prop.value.content = stringifyStyle(
            parseStringStyle(prop.value.content)
          ).slice(0, -1) // 移除最后一个分号，省点大小吧
          break
      }
    }
  })
}
