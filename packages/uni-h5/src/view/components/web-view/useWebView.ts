import {
  type ExtractPropTypes,
  type Ref,
  type SetupContext,
  onMounted,
  ref,
  watchEffect,
} from 'vue'
import { hasOwn } from '@vue/shared'
import {
  type EmitEvent,
  useAttrs,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import { ON_WEB_INVOKE_APP_SERVICE, once } from '@dcloudio/uni-shared'
import { onWebInvokeAppService } from '../../../service/onWebInvokeAppService'

const Invoke = /*#__PURE__*/ once(() =>
  UniServiceJSBridge.on(ON_WEB_INVOKE_APP_SERVICE, onWebInvokeAppService)
)

export const webViewProps = {
  src: {
    type: String,
    default: '',
  },
}

type RootRef = Ref<HTMLElement | null>

export function useWebView(
  props: ExtractPropTypes<typeof webViewProps>,
  emit: SetupContext<['load']>['emit']
) {
  Invoke()
  const rootRef: RootRef = ref(null)
  const iframeRef: RootRef = ref(null)
  const { $attrs, $excludeAttrs, $listeners } = useAttrs({
    excludeListeners: true,
  })
  const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

  const renderIframe = () => {
    const iframe = document.createElement('iframe')
    iframe.onload = function (event: Event) {
      trigger('load', event, { src: props.src, url: props.src })
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
  }

  __NODE_JS__ ? onMounted(renderIframe) : renderIframe()
  onMounted(() => {
    rootRef.value?.appendChild(iframeRef.value!)
  })

  return { rootRef, $listeners, $excludeAttrs }
}
