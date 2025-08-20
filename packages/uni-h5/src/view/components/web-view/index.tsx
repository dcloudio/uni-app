import {
  type Ref,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  watchEffect,
} from 'vue'
import { hasOwn } from '@vue/shared'
import {
  type EmitEvent,
  ResizeSensor,
  UniElement,
  defineBuiltInComponent,
  useAttrs,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import {
  ON_WEB_INVOKE_APP_SERVICE,
  once,
  updateElementStyle,
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

class UniWebViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'WebView',
  props,
  emits: ['load'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-web-view',
    class: UniWebViewElement,
  },
  //#endif
  setup(props, { emit }) {
    Invoke()
    const rootRef: RootRef = ref(null)
    const iframeRef: RootRef = ref(null)
    const { $attrs, $excludeAttrs, $listeners } = useAttrs({
      excludeListeners: true,
    })
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    let _resize: Function

    const renderIframe = () => {
      const iframe = document.createElement('iframe')
      iframe.onload = function (event: Event) {
        trigger('load', event, { src: props.src })
      }
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

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniWebViewElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      return (
        <>
          <uni-web-view
            class={props.fullscreen ? 'uni-webview--fullscreen' : ''}
            {...$listeners.value}
            {...$excludeAttrs.value}
            ref={rootRef}
          >
            {/* @ts-expect-error */}
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
