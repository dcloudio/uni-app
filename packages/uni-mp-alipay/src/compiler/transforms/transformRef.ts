import {
  createAttributeNode,
  isUserComponent,
  VUE_REF,
  VUE_REF_IN_FOR,
} from '@dcloudio/uni-cli-shared'
import {
  ComponentNode,
  findProp,
  NodeTypes,
  RootNode,
  SimpleExpressionNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'

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
  // 仅配置了 ref 属性的，才需要增补 vue-ref
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
