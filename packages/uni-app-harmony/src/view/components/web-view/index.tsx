import {
  defineBuiltInComponent,
  useContextInfo,
  useSubscribe,
} from '@dcloudio/uni-components'
import { capitalize, extend, isFunction } from '@vue/shared'
import { type Ref, ref } from 'vue'
import { getRealPath } from '../../../platform/getRealPath'
import Embed from '../embed'

export type OperateWebViewType =
  | 'evalJs'
  | 'back'
  | 'forward'
  | 'reload'
  | 'stop'

function useMethods(embedRef: Ref<InstanceType<typeof Embed> | null>) {
  const MethodList = ['evalJs', 'back', 'forward', 'reload', 'stop']
  const methods = {} as Record<OperateWebViewType, Function>

  for (let i = 0; i < MethodList.length; i++) {
    const methodName = MethodList[i]
    methods[methodName as OperateWebViewType] = function (
      data: any,
      resolve: (res: any) => void
    ) {
      // @ts-expect-error
      const elId = embedRef.value!.elId
      UniViewJSBridge.invokeServiceMethod(
        'webview' + capitalize(methodName),
        {
          elId,
          data,
        },
        (res) => {
          resolve(res)
        }
      )
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
    return () => (
      <uni-web-view id={props.id}>
        <Embed
          ref={embedRef}
          tag="webview"
          options={{
            src: getRealPath(props.src),
            updateTitle: props.updateTitle,
            webviewStyles: props.webviewStyles,
          }}
          style="width:100%;height:100%"
        />
      </uni-web-view>
    )
  },
})
