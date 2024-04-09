import {
  type DirectiveTransform,
  NodeTypes,
  transformModel as baseTransform,
  isStaticExp,
} from '@vue/compiler-core'
import { isString } from '@vue/shared'
const tags = ['u-input', 'u-textarea']
export const transformModel: DirectiveTransform = (dir, node, context) => {
  const result = baseTransform(dir, node, context)
  // 将 u-input,u-textarea 的 onUpdate:modelValue 事件转换为 onInput
  if (tags.includes(node.tag) && result.props.length >= 2) {
    const key = result.props[1].key
    let value = result.props[1].value
    if (value.type === NodeTypes.JS_CACHE_EXPRESSION) {
      value = value.value
    }
    if (
      isStaticExp(key) &&
      key.content === 'onUpdate:modelValue' &&
      value.type === NodeTypes.COMPOUND_EXPRESSION
    ) {
      key.content = 'onInput'
      // 替换 $event 为 $event.detail.value
      value.children = value.children.map((child) => {
        if (isString(child)) {
          return child.replace(/=\s\$event/g, `= $event.detail.value`)
        }
        return child
      })
    }
  }
  return result
}
