import { ref } from 'vue'
import {
  type EmitEvent,
  defineBuiltInComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { renderRichText } from './render-vapor'
import { props } from '../../components/rich-text'
import { UniViewElement } from '../web-vapor-elements'

// 只提供逻辑类型，根节点由渲染器创建，不构造或注册 Custom Element。
export class UniRichTextElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniRichTextElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-rich-text')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'RICH-TEXT' }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'RichText',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits: ['itemclick'],
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: {
    name: 'uni-rich-text',
    class: UniRichTextElement,
    native: true,
  },
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    function triggerItemClick(e: Event, detail = {}) {
      trigger('itemclick', e, detail)
    }

    const result = renderRichText(props, rootRef, triggerItemClick)

    // 在外部 ref 可见前设置一次类型标识，不包装原生属性 API。
    Object.defineProperty(result, 'uniTagName', uniTagName)

    return result
  },
})
