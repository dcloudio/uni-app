import { INVOKE_VIEW_API } from '../../constants'

type ViewMethod<Args = any, Res = any> = (
  args: Args,
  publish: (res: Res) => void
) => void
const viewMethods: Record<string, ViewMethod<any>> = Object.create(null)

function normalizeViewMethodName(pageId: number, name: string) {
  return pageId + '.' + name
}

export function subscribeViewMethod(pageId: number, wrapper?: Function) {
  UniViewJSBridge.subscribe(
    normalizeViewMethodName(pageId, INVOKE_VIEW_API),
    wrapper ? wrapper(onInvokeViewMethod) : onInvokeViewMethod
  )
}
/**
 * 仅 h5 平台需要主动取消监听
 * @param pageId
 */
export function unsubscribeViewMethod(pageId: number) {
  UniViewJSBridge.unsubscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API))
  Object.keys(viewMethods).forEach((name) => {
    if (name.indexOf(pageId + '.') === 0) {
      delete viewMethods[name]
    }
  })
}

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
    id && UniViewJSBridge.publishHandler(INVOKE_VIEW_API + '.' + id, res)
  }
  const handler = viewMethods[name]
  if (handler) {
    handler(args, publish)
  } else {
    publish({})
  }
}
