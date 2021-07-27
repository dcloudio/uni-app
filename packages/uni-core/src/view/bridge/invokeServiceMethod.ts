import { INVOKE_SERVICE_API } from '../../constants'

let invokeServiceMethodId = 1

export const invokeServiceMethod: UniApp.UniViewJSBridge['invokeServiceMethod'] =
  (name: string, args: unknown, callback?: (res: any) => void) => {
    const { subscribe, publishHandler } = UniViewJSBridge
    const id = callback ? invokeServiceMethodId++ : 0
    callback && subscribe(INVOKE_SERVICE_API + '.' + id, callback, true)
    publishHandler(INVOKE_SERVICE_API, { id, name, args })
  }
