import {
  UniViewElement,
  defineBuiltInComponent,
} from '@dcloudio/uni-components'
import { useWebView, webViewProps } from './useWebView'

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniWebViewElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniWebViewElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-web-view')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'WEB-VIEW' }

export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'WebView',
  props: webViewProps,
  emits: ['load'],
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: { name: 'uni-web-view', class: UniWebViewElement, native: true },
  setup(props, { emit }) {
    const { rootRef, $listeners, $excludeAttrs } = useWebView(props, emit)
    const root = (
      <div
        uni-web-view=""
        uni-view=""
        class="uni-webview"
        {...$listeners.value}
        {...$excludeAttrs.value}
        ref={rootRef}
      />
    )
    // 在外部 ref 可见前标记类型，iframe 和通信逻辑继续复用旧实现。
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})
