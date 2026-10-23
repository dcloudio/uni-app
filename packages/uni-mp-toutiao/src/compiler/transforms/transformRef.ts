import {
  VUE_REF,
  VUE_REF_IN_FOR,
  createAttributeNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import { ATTR_TT_REF } from '@dcloudio/uni-mp-compiler'
import {
  type ComponentNode,
  NodeTypes,
  type RootNode,
  type SimpleExpressionNode,
  type TemplateChildNode,
  type TransformContext,
  findProp,
} from '@vue/compiler-core'

/**
 * Douyin's tt:ref is only available in uni-app x builds. Keep the original
 * ref expression in u-r/u-r-i-f and let the runtime callback resolve it.
 */
export function transformRef(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (!isUserComponent(node, context)) {
    return
  }
  addVueRef(node, context)
}

function addVueRef(node: ComponentNode, context: TransformContext) {
  const refProp = findProp(node, 'ref')
  if (!refProp) {
    return
  }
  const dataRef =
    'u-' +
    ((context as unknown as { inVFor: boolean }).inVFor
      ? VUE_REF_IN_FOR
      : VUE_REF)
  if (refProp.type === NodeTypes.ATTRIBUTE) {
    refProp.name = dataRef
  } else {
    ;(refProp.arg as SimpleExpressionNode).content = dataRef
  }
  const { props } = node
  // Douyin's component ref API is exposed as the tt:ref attribute.
  props.splice(
    props.indexOf(refProp),
    0,
    createAttributeNode(ATTR_TT_REF, '__r')
  )
}
