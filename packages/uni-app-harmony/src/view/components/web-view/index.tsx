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
  | 'canBack'
  | 'canForward'
  | 'loadData'
  | 'getContentHeight'
  | 'clear'
  | 'loadUrl'

const HarmonyNativeMethodMap: Record<OperateWebViewType, string> = {
  evalJS: 'runJavaScript',
  back: 'backward',
  forward: 'forward',
  reload: 'refresh',
  stop: 'stop',
  canBack: 'accessBackward',
  canForward: 'accessForward',
  loadData: 'loadData',
  getContentHeight: 'getPageHeight',
  clear: 'removeCache',
  loadUrl: 'loadUrl',
}

function useMethods(embedRef: Ref<InstanceType<typeof Embed> | null>) {
  const MethodList: OperateWebViewType[] = [
    'evalJS',
    'back',
    'forward',
    'reload',
    'stop',
    'canBack',
    'canForward',
    'loadData',
    'getContentHeight',
    'clear',
    'loadUrl',
  ]
  const methods = {} as Record<OperateWebViewType, Function>

  for (let i = 0; i < MethodList.length; i++) {
    const methodName = MethodList[i]
    methods[methodName as OperateWebViewType] = function (
      data: any,
      resolve: (res: any) => void
    ) {
      const embed = embedRef.value!
      switch (methodName) {
        case 'evalJS':
          return resolve(embed['runJavaScript']((data || {}).jsCode || ''))
        case 'loadUrl':
          resolve(
            embed[HarmonyNativeMethodMap[methodName]](data.url, data.headers)
          )
          break
        case 'loadData': {
          /**
           * @tutorial https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-webview#loaddata
           *
           * 若加载本地图片，可以给baseUrl或historyUrl任一参数赋值空格，详情请参考示例代码。
           * 加载本地图片场景，baseUrl和historyUrl不能同时为空，否则图片无法成功加载。
           * 若html中的富文本中带有注入#等特殊字符，建议将baseUrl和historyUrl两个参数的值设置为"空格"。
           * data数据必须使用base64编码或将内容中的任何#字符编码为%23。否则#将被视为内容的结尾而剩余的文本将被用作文档片段标识符。
           */
          let _data = data.data
          if (data.encoding?.toLowerCase() !== 'base64') {
            _data = _data.replace(/#/g, '%23')
          }
          resolve(
            embed[HarmonyNativeMethodMap[methodName]](
              _data,
              data.mimeType,
              data.encoding,
              data.baseUrl
            )
          )
          break
        }
        case 'clear':
          resolve(embed[HarmonyNativeMethodMap[methodName]](data.clearRom))
          break
        default:
          resolve(embed[HarmonyNativeMethodMap[methodName]]())
          break
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
          methods={[
            'runJavaScript',
            'backward',
            'forward',
            'refresh',
            'stop',
            'accessBackward',
            'accessForward',
            'loadData',
            'getPageHeight',
            'removeCache',
            'loadUrl',
          ]}
          style="width:100%;height:100%"
        />
      </uni-web-view>
    )
  },
})
