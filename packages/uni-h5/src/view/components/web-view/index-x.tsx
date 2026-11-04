import { onMounted } from 'vue'
import { UniElement, defineBuiltInComponent } from '@dcloudio/uni-components'
import { useWebView, webViewProps } from './useWebView'

export class UniWebViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'WebView',
  props: webViewProps,
  emits: ['load'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-web-view',
    class: UniWebViewElement,
  },
  //#endif
  setup(props, { emit }) {
    const { rootRef, $listeners, $excludeAttrs } = useWebView(props, emit)

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniWebViewElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      return (
        <uni-web-view
          class="uni-webview"
          {...$listeners.value}
          {...$excludeAttrs.value}
          ref={rootRef}
        />
      )
    }
  },
})
