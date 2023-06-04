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
  fullscreen: {
    type: Boolean,
    default: true,
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
      iframeRef.value = iframe
      _resize = useWebViewSize(rootRef, iframeRef, props.fullscreen)
      if (props.fullscreen) {
        document.body.appendChild(iframe)
      }
    }

    __NODE_JS__ ? onMounted(renderIframe) : renderIframe()
    onMounted(() => {
      _resize()
      !props.fullscreen && rootRef.value?.appendChild(iframeRef.value!)
    })

    onActivated(() => {
      props.fullscreen && (iframeRef.value!.style.display = 'block')
    })

    onDeactivated(() => {
      props.fullscreen && (iframeRef.value!.style.display = 'none')
    })

    onBeforeUnmount(() => {
      props.fullscreen && document.body.removeChild(iframeRef.value!)
    })

    return () => {
      return (
        <>
          <uni-web-view
            class={props.fullscreen ? 'uni-webview--fullscreen' : ''}
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

function useWebViewSize(
  rootRef: RootRef,
  iframeRef: RootRef,
  fullscreen: boolean
) {
  const _resize = () => {
    if (fullscreen) {
      const { top, left, width, height } =
        rootRef.value!.getBoundingClientRect()

      updateElementStyle(iframeRef.value!, {
        position: 'absolute',
        display: 'block',
        border: '0',
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
      })
    } else {
      updateElementStyle(iframeRef.value!, {
        width: rootRef.value?.style.width || '300px',
        height: rootRef.value?.style.height || '150px',
      })
    }
  }

  return _resize
}
