import {
  isDirectiveNode,
  isElementNode,
  isSimpleExpressionNode,
} from '@dcloudio/uni-cli-shared'
import { ATTR_CHANGE_PREFIX } from '@dcloudio/uni-shared'
import {
  type NodeTransform,
  createCompoundExpression,
  findProp,
} from '@vue/compiler-core'
import { WXS_PROP } from './runtimeHelpers'

export const transformWxsProps: NodeTransform = (node, context) => {
  if (!isElementNode(node)) {
    return
  }
  node.props.forEach((prop) => {
    if (isDirectiveNode(prop) && prop.arg && isSimpleExpressionNode(prop.arg)) {
      const { content } = prop.arg
      if (content.startsWith(ATTR_CHANGE_PREFIX)) {
        const propName = content.substring(ATTR_CHANGE_PREFIX.length)
        const wxsProp = findProp(node, propName, true)
        if (wxsProp && isDirectiveNode(wxsProp) && wxsProp.exp) {
          wxsProp.exp = createCompoundExpression([
            context.helperString(WXS_PROP),
            '(',
            wxsProp.exp,
            ')',
          ])
        }
      }
    }
  })
}
