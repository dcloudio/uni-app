import { isDirectiveNode, isElementNode } from '@dcloudio/uni-cli-shared'
import { NodeTransform } from '../transform'
import { rewriteObjectExpression } from '../utils'

export const transformObjectExpression: NodeTransform = (node, context) => {
  // 因为 v-bind without arg 是被 transformElements.ts 直接处理的，没办法在 vBind 中解析处理objectExpression
  // 所以 统一在这里拦截处理
  return function postTransformObjectExpression() {
    node = context.currentNode!
    if (!isElementNode(node)) {
      return
    }
    node.props.forEach((p) => {
      if (!isDirectiveNode(p) || !p.exp) {
        return
      }
      if (p.name === 'bind' || p.name === 'on') {
        const newExp = rewriteObjectExpression(p.exp, context)
        if (newExp) {
          p.exp = newExp
        }
      }
    })
  }
}
