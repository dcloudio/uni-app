import {
  VUE_REF,
  VUE_REF_IN_FOR,
  createAttributeNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
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
 * component.ref is only available in uni-app x builds. Keep the original
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
  props.splice(props.indexOf(refProp), 0, createAttributeNode('ref', '__r'))
}
