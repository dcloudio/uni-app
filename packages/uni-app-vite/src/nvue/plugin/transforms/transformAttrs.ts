import {
  isDirectiveNode,
  isElementNode,
  isSimpleExpressionNode,
} from '@dcloudio/uni-cli-shared'
import { isAppNVueNativeTag } from '@dcloudio/uni-shared'
import type { NodeTransform } from '@vue/compiler-core'
import { camelize } from '@vue/shared'
/**
 * 将内置组件属性调整为驼峰
 * @param node
 * @param context
 * @returns
 */
export const transformAttrs: NodeTransform = (node, context) => {
  if (!isElementNode(node)) {
    return
  }
  if (!isAppNVueNativeTag(node.tag)) {
    return
  }
  node.props.forEach((prop) => {
    if (isDirectiveNode(prop)) {
      const { arg } = prop
      if (arg && isSimpleExpressionNode(arg)) {
        arg.content = normalizePropName(arg.content)
      }
    } else {
      prop.name = normalizePropName(prop.name)
    }
  })
}

function normalizePropName(name: string) {
  if (name.startsWith('data-')) {
    return name
  }
  return camelize(name)
}
