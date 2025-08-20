import {
  type ExtractPropTypes,
  type Ref,
  computed,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'
import { extend } from '@vue/shared'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { getCurrentPageId } from '@dcloudio/uni-core'
import { getRealPath } from '../../../platform/getRealPath'
import {
  WEBVIEW_ID_PREFIX,
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED,
} from '../../../constants'
import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'
import { useNative } from '../../../helpers/useNative'
import { getStatusbarHeight } from '../../../helpers/statusBar'

const props = {
  src: {
    type: String,
    default: '',
  },
  updateTitle: {
    type: Boolean,
    default: true,
  },
  webviewStyles: {
    type: Object,
    default() {
      return {}
    },
  },
}
type Props = ExtractPropTypes<typeof props>

let webview: PlusWebviewWebviewObject | null

interface insertHTMLWebView {
  htmlId: string
  src: string
  webviewStyles: PlusWebviewWebviewStyles
  props: Props
}
const insertHTMLWebView = ({
  htmlId,
  src,
  webviewStyles,
  props,
}: insertHTMLWebView) => {
  const parentWebview = plus.webview.currentWebview()
  // fixed by hxy web-view 组件所在的 webview 不注入 uni-app 框架
  const styles: PlusWebviewWebviewStyles & {
    'uni-app': string
    isUniH5: boolean
  } = extend(
    {
      'uni-app': 'none',
      isUniH5: true,
      // ios 默认绘制到安全区外
      contentAdjust: false,
    },
    webviewStyles
  )
  const parentTitleNView = parentWebview.getTitleNView()
  if (parentTitleNView) {
    let defaultTop: number = NAVBAR_HEIGHT + parseFloat(styles.top || '0')
    if (plus.navigator.isImmersedStatusbar()) {
      defaultTop += getStatusbarHeight()
    }
    styles.top = String(defaultTop)
    styles.bottom = styles.bottom || '0'
  }
  webview = plus.webview.create(src, htmlId, styles)
  if (parentTitleNView) {
    webview.addEventListener('titleUpdate', function () {
      if (!props.updateTitle) return
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
    const { hidden, onParentReady } = useNative(containerRef)

    const webviewStyles = computed(() => props.webviewStyles)

    onParentReady(() => {
      const htmlId = ref(WEBVIEW_ID_PREFIX + pageId)
      insertHTMLWebView({
        htmlId: htmlId.value,
        src: getRealPath(props.src),
        webviewStyles: webviewStyles.value,
        props,
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
