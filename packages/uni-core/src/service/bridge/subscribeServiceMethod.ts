import { INVOKE_SERVICE_API } from '../../constants'

type ServiceMethod<Args = any, Res = any> = (
  args: Args,
  publish: (res: Res) => void
) => void
const serviceMethods: Record<string, ServiceMethod<any>> = Object.create(null)

export function subscribeServiceMethod() {
  UniServiceJSBridge.subscribe(INVOKE_SERVICE_API, onInvokeServiceMethod)
}

export function registerServiceMethod<Args = any, Res = any>(
  name: string,
  fn: ServiceMethod<Args, Res>
) {
  if (!serviceMethods[name]) {
    serviceMethods[name] = fn
  }
}

function onInvokeServiceMethod(
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
  const publish = (res: unknown) => {
    id &&
      UniServiceJSBridge.publishHandler(
        INVOKE_SERVICE_API + '.' + id,
        res,
        pageId
      )
  }
  const handler = serviceMethods[name]
  if (handler) {
    handler(args, publish)
  } else {
    publish({})
  }
}
