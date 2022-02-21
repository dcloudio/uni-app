import {
  transformModel as baseTransform,
  DirectiveTransform,
  ElementTypes,
  findProp,
  NodeTypes,
  hasDynamicKeyVBind,
} from '@vue/compiler-core'
import { createDOMCompilerError, DOMErrorCodes } from '@vue/compiler-dom'
import { createNVueCompilerError, NVueErrorCodes } from './errors'

export const transformModel: DirectiveTransform = (dir, node, context) => {
  const baseResult = baseTransform(dir, node, context)
  // base transform has errors OR component v-model (only need props)
  if (!baseResult.props.length || node.tagType === ElementTypes.COMPONENT) {
    return baseResult
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
  const isCustomElement = context.isCustomElement(tag)
  if (
    tag === 'input' ||
    tag === 'u-input' ||
    tag === 'textarea' ||
    tag === 'u-textarea' ||
    isCustomElement
  ) {
    if (tag === 'input' || tag === 'u-input' || isCustomElement) {
      const type = findProp(node, `type`)
      if (type) {
        if (type.type === NodeTypes.DIRECTIVE) {
          // :type="foo"
          context.onError(
            createNVueCompilerError(
              NVueErrorCodes.X_V_MODEL_DYNAMIC_TYPE,
              dir.loc
            )
          )
        } else if (type.value) {
          checkDuplicatedValue()
        }
      } else if (hasDynamicKeyVBind(node)) {
        // element has bindings with dynamic keys, which can possibly contain
        // "type".
        // directiveToUse = V_MODEL_DYNAMIC
        context.onError(
          createNVueCompilerError(NVueErrorCodes.X_V_MODEL_AND_V_BIND, dir.loc)
        )
      } else {
        // text type
        checkDuplicatedValue()
      }
    } else {
      // textarea
      checkDuplicatedValue()
    }
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

  return baseResult
}
