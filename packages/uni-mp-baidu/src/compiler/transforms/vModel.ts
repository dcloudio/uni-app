import { isUserComponent } from '@dcloudio/uni-cli-shared'
import {
  DirectiveNode,
  DirectiveTransform,
  SimpleExpressionNode,
  transformModel as baseTransformModel,
} from '@dcloudio/uni-mp-compiler'
import { ComponentNode } from '@vue/compiler-core'
import { addEventOpts, createCustomEventExpr } from './vOn'
/**
 * 百度小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整
 * @param dir
 * @param node
 * @param context
 * @param augmentor
 * @returns
 */
export const transformModel: DirectiveTransform = (
  dir,
  node,
  context,
  augmentor
) => {
  const res = baseTransformModel(dir, node, context, augmentor)
  const props = res.props as unknown as DirectiveNode[]
  if (props.length < 2 || !isUserComponent(node, context)) {
    return res
  }
  const { arg, exp } = props[1]

  addEventOpts(
    (arg as SimpleExpressionNode).content,
    exp as SimpleExpressionNode,
    node as ComponentNode
  )
  props[1].exp = createCustomEventExpr()
  return res
}
