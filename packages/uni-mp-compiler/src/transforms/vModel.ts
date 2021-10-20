import {
  Property,
  transformModel as baseTransform,
  ElementTypes,
  findProp,
  NodeTypes,
  DirectiveNode,
  ElementNode,
  ExpressionNode,
} from '@vue/compiler-core'
import { DOMErrorCodes, createDOMCompilerError } from '@vue/compiler-dom'
import { camelize } from '@vue/shared'
import { createBindDirectiveNode, createOnDirectiveNode } from '../ast'
import { genExpr } from '../codegen'
import { TransformContext } from '../transform'
import { wrapperVOn } from './vOn'

export const transformModel = (
  dir: DirectiveNode,
  node: ElementNode,
  context: TransformContext
) => {
  const baseResult = baseTransform(dir, node, context as any)
  // base transform has errors OR component v-model (only need props)
  if (!baseResult.props.length || node.tagType === ElementTypes.COMPONENT) {
    return transformComponentVModel(baseResult.props, context)
  }

  if (dir.arg) {
    context.onError(
      createDOMCompilerError(
        DOMErrorCodes.X_V_MODEL_ARG_ON_ELEMENT,
        dir.arg.loc
      )
    )
  }

  function checkDuplicatedValue() {
    const value = findProp(node, 'value')
    if (value) {
      context.onError(
        createDOMCompilerError(
          DOMErrorCodes.X_V_MODEL_UNNECESSARY_VALUE,
          value.loc
        )
      )
    }
  }

  const { tag } = node
  if (tag === 'input' || tag === 'textarea') {
    checkDuplicatedValue()
  } else {
    context.onError(
      createDOMCompilerError(
        DOMErrorCodes.X_V_MODEL_ON_INVALID_ELEMENT,
        dir.loc
      )
    )
  }

  // native vmodel doesn't need the `modelValue` props since they are also
  // passed to the runtime as `binding.value`. removing it reduces code size.
  baseResult.props = baseResult.props.filter(
    (p) =>
      !(
        p.key.type === NodeTypes.SIMPLE_EXPRESSION &&
        p.key.content === 'modelValue'
      )
  )

  return []
}

function transformComponentVModel(
  props: Property[],
  context: TransformContext
): DirectiveNode[] {
  if (props.length !== 2) {
    return []
  }
  const { key: modelValueArg, value: modelValeExpr } = props[0]
  const { key: onUpdateArg, value: onUpdateExpr } = props[1]

  if (modelValueArg.type !== NodeTypes.SIMPLE_EXPRESSION) {
    return []
  }
  if (
    onUpdateArg.type !== NodeTypes.SIMPLE_EXPRESSION ||
    !onUpdateArg.content.startsWith('onUpdate:')
  ) {
    return []
  }
  const vBindModelValue = createBindDirectiveNode(
    modelValueArg.content,
    genExpr(modelValeExpr as ExpressionNode)
  )
  const vOnUpdate = createOnDirectiveNode(
    camelize(onUpdateArg.content.replace('onUpdate:', 'update-')),
    genExpr(
      wrapperVOn(
        // onUpdateExpr 通常是 ExpressionNode 或者被 cache 的 ExpressionNode
        (onUpdateExpr.type === NodeTypes.JS_CACHE_EXPRESSION
          ? onUpdateExpr.value
          : onUpdateExpr) as ExpressionNode,
        context
      )
    ).replace(`= $event`, `= $event.detail.__args__[0]`)
  )
  return [vBindModelValue, vOnUpdate]
}
