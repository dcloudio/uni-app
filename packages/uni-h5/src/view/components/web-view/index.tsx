import {
  defineComponent,
  watch,
  ref,
  ExtractPropTypes,
  onMounted,
  Ref,
  onActivated,
  onDeactivated,
  onUnmounted,
} from 'vue'
import { ResizeSensor } from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import { updateElementStyle } from '@dcloudio/uni-shared'

const props = {
  src: {
    type: String,
    default: '',
  },
  allow: String,
  sandbox: String,
}

type WebViewProps = ExtractPropTypes<typeof props>
type RootRef = Ref<HTMLElement | null>
type ReSize = ReturnType<typeof useWebViewSize>['_resize']

export default /*#__PURE__*/ defineComponent({
  name: 'WebView',
  props,
  setup(props) {
    const rootRef: RootRef = ref(null)
    const iframe = document.createElement('iframe')
    const { _resize } = useWebViewSize(rootRef, iframe)
    useWebViewLoader(iframe, props, _resize)

    return () => (
      <uni-web-view ref={rootRef}>
        <ResizeSensor onResize={_resize} />
      </uni-web-view>
    )
  },
})

function useWebViewLoader(
  iframe: HTMLIFrameElement,
  props: WebViewProps,
  _resize: ReSize
) {
  props.allow && iframe.setAttribute('allow', props.allow)
  props.sandbox && iframe.setAttribute('sandbox', props.sandbox)
  iframe.src = getRealPath(props.src)
  document.body.appendChild(iframe)

  onMounted(() => {
    _resize()
  })

  onActivated(() => {
    iframe.style.display = 'block'
  })

  onDeactivated(() => {
    iframe.style.display = 'none'
  })

  onUnmounted(() => {
    document.body.removeChild(iframe)
  })

  watch(
    () => props.src,
    (val) => {
      iframe.src = getRealPath(val)
    }
  )
}

function useWebViewSize(rootRef: RootRef, iframe: HTMLIFrameElement) {
  const _resize = () => {
    const { top, left, width, height } = rootRef.value!.getBoundingClientRect()

    updateElementStyle(iframe, {
      position: 'absolute',
      display: 'block',
      border: '0',
      top: top + 'px',
      left: left + 'px',
      width: width + 'px',
      height: height + 'px',
    })
  }

  return {
    _resize,
  }
}
