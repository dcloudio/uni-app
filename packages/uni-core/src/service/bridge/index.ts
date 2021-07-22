import { extend } from '@vue/shared'
import { INVOKE_VIEW_API } from '../../constants'
import { getCurrentPageId } from '../../helpers'

import { initBridge } from '../../helpers/bridge'

let invokeViewMethodId = 0

function publishViewMethodName() {
  return getCurrentPageId() + '.' + INVOKE_VIEW_API
}

const invokeViewMethod: UniApp.UniServiceJSBridge['invokeViewMethod'] = (
  name: string,
  args: unknown,
  callback: (res: any) => void,
  pageId: number
) => {
  const { subscribe, publishHandler } = UniServiceJSBridge
  const id = invokeViewMethodId++
  subscribe(INVOKE_VIEW_API + '.' + id, callback, true)
  publishHandler(publishViewMethodName(), { id, name, args }, pageId)
}

const invokeViewMethodKeepAlive: UniApp.UniServiceJSBridge['invokeViewMethodKeepAlive'] =
  (
    name: string,
    args: unknown,
    callback: (res: any) => void,
    pageId: number
  ) => {
    const { subscribe, unsubscribe, publishHandler } = UniServiceJSBridge
    const id = invokeViewMethodId++
    const subscribeName = INVOKE_VIEW_API + '.' + id
    subscribe(subscribeName, callback)
    publishHandler(publishViewMethodName(), { id, name, args }, pageId)
    return () => {
      unsubscribe(subscribeName)
    }
  }

const invokeOnCallback: UniApp.UniServiceJSBridge['invokeOnCallback'] = (
  name: string,
  res: unknown
) => UniServiceJSBridge.emit('api.' + name, res)

export const ServiceJSBridge = /*#__PURE__*/ extend(
  initBridge('view' /* view 指的是 service 层订阅的是 view 层事件 */),
  {
    invokeOnCallback,
    invokeViewMethod,
    invokeViewMethodKeepAlive,
  }
)
