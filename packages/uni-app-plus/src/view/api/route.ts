import { INVOKE_SERVICE_API } from '../../constants'

function invokeServiceApi(method: string, args: Record<string, any> = {}) {
  UniViewJSBridge.publishHandler(INVOKE_SERVICE_API, {
    data: {
      method,
      args,
    },
    options: {
      timestamp: Date.now(),
    },
  })
}
export function navigateTo(args: Record<string, any>) {
  invokeServiceApi('navigateTo', args)
}
export function navigateBack(args: Record<string, any>) {
  invokeServiceApi('navigateBack', args)
}
export function reLaunch(args: Record<string, any>) {
  invokeServiceApi('reLaunch', args)
}
export function redirectTo(args: Record<string, any>) {
  invokeServiceApi('redirectTo', args)
}
export function switchTab(args: Record<string, any>) {
  invokeServiceApi('switchTab', args)
}
