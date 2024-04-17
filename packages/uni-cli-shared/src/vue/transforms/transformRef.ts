import {
  type ComponentNode,
  NodeTypes,
  type RootNode,
  type SimpleExpressionNode,
  type TemplateChildNode,
  type TransformContext,
  findProp,
} from '@vue/compiler-core'
import {
  VUE_REF,
  VUE_REF_IN_FOR,
  addStaticClass,
  isUserComponent,
} from '../utils'

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
  if (refProp.type === NodeTypes.ATTRIBUTE) {
    refProp.name = 'u-' + VUE_REF
  } else {
    ;(refProp.arg as SimpleExpressionNode).content = 'u-' + VUE_REF
  }

  return addStaticClass(
    node,
    // ref-in-for
    // ref
    (context as unknown as { inVFor: boolean }).inVFor
      ? VUE_REF_IN_FOR
      : VUE_REF
  )
}
