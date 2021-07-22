import { formatLog } from '@dcloudio/uni-shared'
import { INVOKE_VIEW_API } from '../../constants'
import { initBridge } from '../../helpers/bridge'

export const ViewJSBridge = /*#__PURE__*/ initBridge('service')

function normalizeViewMethodName(pageId: number, name: string) {
  return pageId + '.' + name
}

export function subscribeViewMethod(pageId: number) {
  UniViewJSBridge.subscribe(
    normalizeViewMethodName(pageId, INVOKE_VIEW_API),
    onInvokeViewMethod
  )
}
/**
 * 仅 h5 平台需要主动取消监听
 * @param pageId
 */
export function unsubscribeViewMethod(pageId: number) {
  if (__DEV__) {
    console.log(formatLog('unsubscribeViewMethod', pageId, INVOKE_VIEW_API))
  }
  UniViewJSBridge.unsubscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API))
  Object.keys(viewMethods).forEach((name) => {
    if (name.indexOf(pageId + '.') === 0) {
      if (__DEV__) {
        console.log(formatLog('unsubscribeViewMethod', name))
      }
      delete viewMethods[name]
    }
  })
}

type ViewMethod<Args = any, Res = any> = (
  args: Args,
  publish: (res: Res) => void
) => void
const viewMethods: Record<string, ViewMethod<any>> = Object.create(null)

export function registerViewMethod<Args = any, Res = any>(
  pageId: number,
  name: string,
  fn: ViewMethod<Args, Res>
) {
  name = normalizeViewMethodName(pageId, name)
  if (!viewMethods[name]) {
    viewMethods[name] = fn
  }
}

export function unregisterViewMethod(pageId: number, name: string) {
  name = normalizeViewMethodName(pageId, name)
  delete viewMethods[name]
}

function onInvokeViewMethod(
  {
    id,
    name,
    args,
  }: {
    id: number
    name: string
    args: any
  },
  pageId: number
) {
  name = normalizeViewMethodName(pageId, name)
  const publish = (res: unknown) => {
    UniViewJSBridge.publishHandler(INVOKE_VIEW_API + '.' + id, res)
  }
  const handler = viewMethods[name]
  if (handler) {
    handler(args, publish)
  } else {
    publish({})
    if (__DEV__) {
      console.error(formatLog('invokeViewMethod', name, 'not register'))
    }
  }
}
