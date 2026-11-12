import { type Ref, ref } from 'vue'
import {
  type EmitEvent,
  UniElement,
  defineBuiltInComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import { initWebViewBridge, webViewProps } from './useWebView'

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniWebViewElement extends UniElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    const el = value as Element | null | undefined
    return (
      (this === UniWebViewElement &&
        el?.nodeType === 1 &&
        el.localName === 'iframe' &&
        el.hasAttribute('uni-web-view')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'WebView',
  props: webViewProps,
  emits: ['load'],
  rootElement: { name: 'uni-web-view', class: UniWebViewElement },
  setup(props, { emit }) {
    initWebViewBridge()
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    return (
      <iframe
        uni-web-view=""
        uni-view=""
        class="uni-webview"
        src={getRealPath(props.src)}
        onLoad={(event: Event) =>
          trigger('load', event, { src: props.src, url: props.src })
        }
        ref={rootRef}
      />
    )
  },
})
