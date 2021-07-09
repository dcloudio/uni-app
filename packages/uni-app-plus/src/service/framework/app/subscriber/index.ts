import { INVOKE_API, ON_WEBVIEW_READY, VD_SYNC } from '../../../../constants'
import { onVdSync } from '../../dom'
import { onPlusMessage } from '../initGlobalEvent'
import { subscribeWebviewReady } from './webviewReady'

export function initSubscribeHandlers() {
  const { subscribe, subscribeHandler } = UniServiceJSBridge

  onPlusMessage<{ type: string; data: Record<string, any>; pageId: number }>(
    'subscribeHandler',
    ({ type, data, pageId }) => {
      subscribeHandler(type, data, pageId)
    }
  )

  if (__uniConfig.renderer !== 'native') {
    // 非纯原生
    subscribe(ON_WEBVIEW_READY, subscribeWebviewReady)
    subscribe(VD_SYNC, onVdSync)
    subscribe(INVOKE_API, onInvokeApi)
  }
}

function onInvokeApi({
  data: { method, args },
}: {
  data: { method: UniApp.OpenType; args: any }
}) {
  uni[method] && uni[method](args)
}
