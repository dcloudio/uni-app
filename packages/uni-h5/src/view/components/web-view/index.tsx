import {
  ref,
  onMounted,
  Ref,
  onActivated,
  onDeactivated,
  watchEffect,
  onBeforeUnmount,
} from 'vue'
import { hasOwn } from '@vue/shared'
import {
  defineBuiltInComponent,
  ResizeSensor,
  useAttrs,
} from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import {
  updateElementStyle,
  once,
  ON_WEB_INVOKE_APP_SERVICE,
} from '@dcloudio/uni-shared'
import { onWebInvokeAppService } from '../../../service/onWebInvokeAppService'

const Invoke = /*#__PURE__*/ once(() =>
  UniServiceJSBridge.on(ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService)
)

const props = {
  src: {
    type: String,
    default: '',
  },
}

type RootRef = Ref<HTMLElement | null>

export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'WebView',
  props,
  setup(props) {
    Invoke()
    const rootRef: RootRef = ref(null)
    const iframeRef: RootRef = ref(null)
    const { $attrs, $excludeAttrs, $listeners } = useAttrs({
      excludeListeners: true,
    })
    let _resize: Function

    const renderIframe = () => {
      const iframe = document.createElement('iframe')
      watchEffect(() => {
        for (const key in $attrs.value) {
          if (hasOwn($attrs.value, key)) {
            const attr = ($attrs.value as any)[key]
            ;(iframe as any)[key] = attr
          }
        }
      })
      watchEffect(() => {
        iframe.src = getRealPath(props.src)
      })
      document.body.appendChild(iframe)
      iframeRef.value = iframe
      _resize = useWebViewSize(rootRef, iframeRef)
    }

    __NODE_JS__ ? onMounted(renderIframe) : renderIframe()
    onMounted(() => {
      _resize()
    })

    onActivated(() => {
      iframeRef.value && (iframeRef.value.style.display = 'block')
    })

    onDeactivated(() => {
      iframeRef.value && (iframeRef.value.style.display = 'none')
    })

    onBeforeUnmount(() => {
      document.body.removeChild(iframeRef.value!)
    })

    return () => {
      return (
        <>
          <uni-web-view
            {...$listeners.value}
            {...$excludeAttrs.value}
            ref={rootRef}
          >
            {/* @ts-ignore */}
            <ResizeSensor onResize={_resize} />
          </uni-web-view>

          {/* TODO 等待teleport组件支持ssr */}
          {/* <Teleport to="body">
            <iframe
              ref={iframeRef}
              src={getRealPath(props.src)}
              {...$attrs.value}
            ></iframe>
          </Teleport> */}
        </>
      )
    }
  },
})

function useWebViewSize(rootRef: RootRef, iframeRef: RootRef) {
  const _resize = () => {
    const { top, left, width, height } = rootRef.value!.getBoundingClientRect()

    iframeRef.value &&
      updateElementStyle(iframeRef.value, {
        position: 'absolute',
        display: 'block',
        border: '0',
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
      })
  }

  return _resize
}
