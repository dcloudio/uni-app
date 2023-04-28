import {
  transformModel as baseTransform,
  DirectiveTransform,
  isStaticExp,
  NodeTypes,
} from '@vue/compiler-core'
import { isString } from '@vue/shared'

const tags = ['input', 'textarea']

export const transformModel: DirectiveTransform = (dir, node, context) => {
  const result = baseTransform(dir, node, context)
  // 将 input,textarea 的 onUpdate:modelValue 事件转换为 onInput
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
      // 调整函数类型及返回表达式，适配 uts
      value.children = value.children.map((child) => {
        if (isString(child)) {
          if (child === '$event => ((') {
            return '($event: InputEvent): any => {'
          } else if (child === ') = $event)') {
            return ' = $event.detail.value;\nreturn $event.detail.value;}'
          }
        }
        return child
      })
    }
  }
  return result
}
