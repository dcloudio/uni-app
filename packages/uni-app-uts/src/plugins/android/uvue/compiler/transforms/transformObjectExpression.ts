import { isDirectiveNode, isElementNode } from '@dcloudio/uni-cli-shared'
import { NodeTransform } from '../transform'
import { rewriteObjectExpression } from '../utils'
import { NodeTypes, SimpleExpressionNode } from '@vue/compiler-core'
import { isString } from '@vue/shared'

export const transformObjectExpression: NodeTransform = (node, context) => {
  // 因为 v-bind without arg 是被 transformElements.ts 直接处理的，没办法在 vBind 中解析处理objectExpression
  // 所以 统一在这里拦截处理
  const needTransformAttributes = ['style', 'id', 'class', 'nodes']
  return function postTransformObjectExpression() {
    node = context.currentNode!
    if (!isElementNode(node)) {
      return
    }
    node.props.forEach((p) => {
      if (!isDirectiveNode(p) || !p.exp) {
        return
      }
      if (p.name === 'bind' && !p.arg) {
        // v-bind="{key: value}"
        if (p.exp.type === NodeTypes.SIMPLE_EXPRESSION) {
          if (p.exp.content.startsWith('{') && p.exp.content.endsWith('}')) {
            p.exp.content = `utsMapOf(${p.exp.content})`
          }
          // v-bind="x"
        } else if (p.exp.type === NodeTypes.COMPOUND_EXPRESSION) {
          const children = p.exp.children
          if (
            children.length > 1 &&
            isString(children[0]) &&
            isString(children[children.length - 1]) &&
            (children[0] as string).startsWith('{') &&
            (children[children.length - 1] as string).endsWith('}')
          ) {
            children[0] = `utsMapOf(${children[0]}`
            children[children.length - 1] = `${
              children[children.length - 1] as string
            })`
          }
        }
        return
      }
      if (
        (p.name === 'bind' &&
          needTransformAttributes.includes(
            (p.arg as SimpleExpressionNode)?.content
          )) ||
        p.name === 'on'
      ) {
        const newExp = rewriteObjectExpression(p.exp, context)
        if (newExp) {
          p.exp = newExp
        }
      }
    })
  }
}
