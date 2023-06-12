import { INVOKE_VIEW_API } from '../../constants'
import { getCurrentPageId } from '../../helpers/page'

let invokeViewMethodId = 1

function publishViewMethodName(pageId?: number) {
  return (pageId || getCurrentPageId()) + '.' + INVOKE_VIEW_API
}

export const invokeViewMethod: UniApp.UniServiceJSBridge['invokeViewMethod'] = (
  name: string,
  args: unknown,
  pageId: number,
  callback?: (res: any) => void
) => {
  const { subscribe, publishHandler } = UniServiceJSBridge
  const id = callback ? invokeViewMethodId++ : 0
  callback && subscribe(INVOKE_VIEW_API + '.' + id, callback, true)
  publishHandler(publishViewMethodName(pageId), { id, name, args }, pageId)
}

export const invokeViewMethodKeepAlive: UniApp.UniServiceJSBridge['invokeViewMethodKeepAlive'] =
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
    publishHandler(publishViewMethodName(pageId), { id, name, args }, pageId)
    return () => {
      unsubscribe(subscribeName)
    }
  }
