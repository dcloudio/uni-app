import { ref, watch, onBeforeUnmount, Ref, computed } from 'vue'
import { extend } from '@vue/shared'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { getCurrentPageId } from '@dcloudio/uni-core'
import { getRealPath } from '../../../platform/getRealPath'
import {
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED,
  WEBVIEW_ID_PREFIX,
} from '../../../constants'
import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'
import { useNative } from '../../../helpers/useNative'

const props = {
  src: {
    type: String,
    default: '',
  },
  webviewStyles: {
    type: Object,
    default() {
      return {}
    },
  },
}

let webview: PlusWebviewWebviewObject | null

const insertHTMLWebView = ({
  htmlId,
  src,
  webviewStyles,
}: {
  htmlId: string
  src: string
  webviewStyles: PlusWebviewWebviewStyles
}) => {
  const parentWebview = plus.webview.currentWebview()
  // fixed by hxy web-view 组件所在的 webview 不注入 uni-app 框架
  const styles: PlusWebviewWebviewStyles & {
    'uni-app': string
    isUniH5: boolean
  } = extend(webviewStyles, {
    'uni-app': 'none',
    isUniH5: true,
  })
  const parentTitleNView = parentWebview.getTitleNView()
  if (parentTitleNView) {
    let defaultTop: number = NAVBAR_HEIGHT + parseFloat(styles.top || '0')
    if (plus.navigator.isImmersedStatusbar()) {
      defaultTop += plus.navigator.getStatusbarHeight()
    }
    styles.top = String(defaultTop)
    styles.bottom = styles.bottom || '0'
  }
  webview = plus.webview.create(src, htmlId, styles)
  if (parentTitleNView) {
    webview.addEventListener('titleUpdate', function () {
      const title = webview?.getTitle()
      parentWebview.setStyle({
        titleNView: {
          // iOS titleText 为空字符串时 按钮会隐藏
          titleText: !title || title === 'null' ? ' ' : title,
        },
      })
    })
  }
  plus.webview.currentWebview().append(webview as any)
}

const removeHTMLWebView = () => {
  plus.webview.currentWebview().remove(webview as any)
  webview?.close('none')
  webview = null
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'WebView',
  props,
  setup(props) {
    const pageId = getCurrentPageId()
    const containerRef: Ref<HTMLElement | null> = ref(null)
    const { position, hidden, onParentReady } = useNative(containerRef)

    const webviewStyles = computed(() => props.webviewStyles)

    onParentReady(() => {
      const htmlId = ref(WEBVIEW_ID_PREFIX + pageId)
      insertHTMLWebView({
        htmlId: htmlId.value,
        src: getRealPath(props.src),
        webviewStyles: webviewStyles.value,
      })
      UniViewJSBridge.publishHandler(WEBVIEW_INSERTED, {}, pageId)
      if (hidden.value) webview?.hide()
    })

    onBeforeUnmount(() => {
      removeHTMLWebView()
      UniViewJSBridge.publishHandler(WEBVIEW_REMOVED, {}, pageId)
    })

    watch(
      () => props.src,
      (val) => {
        const realPath = getRealPath(val) || ''
        if (!realPath) {
          return
        }
        if (
          /^(http|https):\/\//.test(realPath) &&
          props.webviewStyles.progress
        ) {
          webview?.setStyle({
            progress: {
              color: props.webviewStyles.progress.color,
            },
          })
        }
        webview?.loadURL(realPath)
      }
    )
    watch(webviewStyles, (webviewStyles) => {
      webview?.setStyle(webviewStyles)
    })
    watch(hidden, (val) => {
      webview && webview[val ? 'hide' : 'show']()
    })

    return () => <uni-web-view ref={containerRef} />
  },
})
