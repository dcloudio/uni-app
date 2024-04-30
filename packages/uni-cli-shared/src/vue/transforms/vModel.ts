import type {
  ComponentNode,
  DirectiveNode,
  DirectiveTransform,
  ElementNode,
  SimpleExpressionNode,
  TransformContext,
} from '@vue/compiler-core'
import { isUserComponent } from '../utils'
import { addEventOpts, createCustomEventExpr } from './vOn'
export function defaultMatch(node: ElementNode, context: TransformContext) {
  return isUserComponent(node, context)
}
interface CreateTransformModelOptions {
  match: typeof defaultMatch
}

/**
 * 百度、快手小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整
 * @param baseTransformModel
 * @returns
 */
export function createTransformModel(
  baseTransformModel: DirectiveTransform,
  { match }: CreateTransformModelOptions = {
    match: defaultMatch,
  }
): DirectiveTransform {
  return (dir, node, context, augmentor) => {
    const res = baseTransformModel(dir, node, context, augmentor)
    if (!match(node, context)) {
      return res
    }
    const props = res.props as unknown as DirectiveNode[]
    if (props[1]) {
      // input,textarea 的 v-model 事件可能会被合并到已有的 input 中
      const { arg, exp } = props[1]
      addEventOpts(
        (arg as SimpleExpressionNode).content,
        exp as SimpleExpressionNode,
        node as ComponentNode,
        context
      )
      props[1].exp = createCustomEventExpr()
    }
    return res
  }
}
