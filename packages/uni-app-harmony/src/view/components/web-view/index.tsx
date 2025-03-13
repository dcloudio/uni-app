import {
  defineBuiltInComponent,
  useContextInfo,
  useSubscribe,
} from '@dcloudio/uni-components'
import { extend, isFunction } from '@vue/shared'
import { getCurrentPageId } from '@dcloudio/uni-core'
import { type Ref, onBeforeUnmount, onMounted, ref } from 'vue'
import { getRealPath } from '../../../platform/getRealPath'
import Embed from '../embed'
import {
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED,
} from '@dcloudio/uni-app-plus/constants'

export type OperateWebViewType =
  | 'evalJS'
  | 'back'
  | 'forward'
  | 'reload'
  | 'stop'

function useMethods(embedRef: Ref<InstanceType<typeof Embed> | null>) {
  const MethodList = ['evalJS', 'back', 'forward', 'reload', 'stop']
  const methods = {} as Record<OperateWebViewType, Function>

  for (let i = 0; i < MethodList.length; i++) {
    const methodName = MethodList[i]
    methods[methodName as OperateWebViewType] = function (
      data: any,
      resolve: (res: any) => void
    ) {
      const embed = embedRef.value!
      if (methodName === 'evalJS') {
        return resolve(embed['runJavaScript']((data || {}).jsCode || ''))
      } else {
        resolve(embed[methodName]())
      }
    }
  }
  function _handleSubscribe(
    type: OperateWebViewType,
    data: any,
    resolve: (res: { callbackId: number; data: any }) => void
  ) {
    let method = methods[type]
    if (type.indexOf('_') !== 0 && isFunction(method)) {
      method(data as any, resolve)
    }
  }

  return extend(methods, {
    _handleSubscribe,
  })
}

const props = {
  id: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
  updateTitle: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
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

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'WebView',
  props,
  setup(props) {
    const embedRef = ref<InstanceType<typeof Embed> | null>(null)
    const pageId = getCurrentPageId()
    const { _handleSubscribe } = useMethods(embedRef)
    useSubscribe(
      _handleSubscribe as (
        type: string,
        data: unknown,
        resolve: (res: any) => void
      ) => void,
      useContextInfo(props.id),
      true
    )

    onMounted(() => {
      UniViewJSBridge.publishHandler(WEBVIEW_INSERTED, {}, pageId)
    })

    onBeforeUnmount(() => {
      UniViewJSBridge.publishHandler(WEBVIEW_REMOVED, {}, pageId)
    })

    return () => (
      <uni-web-view
        id={props.id}
        class={props.fullscreen ? 'uni-webview--fullscreen' : ''}
      >
        <Embed
          ref={embedRef}
          tag="webview"
          options={{
            src: getRealPath(props.src),
            updateTitle: props.updateTitle,
            webviewStyles: props.webviewStyles,
          }}
          methods={['runJavaScript', 'back', 'forward', 'reload', 'stop']}
          style="width:100%;height:100%"
        />
      </uni-web-view>
    )
  },
})
