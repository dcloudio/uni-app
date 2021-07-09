import { INVOKE_API } from '../../constants'

function invokeApi(method: string, args: Record<string, any> = {}) {
  UniViewJSBridge.publishHandler(INVOKE_API, {
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
  invokeApi('navigateTo', args)
}
export function navigateBack(args: Record<string, any>) {
  invokeApi('navigateBack', args)
}
export function reLaunch(args: Record<string, any>) {
  invokeApi('reLaunch', args)
}
export function redirectTo(args: Record<string, any>) {
  invokeApi('redirectTo', args)
}
export function switchTab(args: Record<string, any>) {
  invokeApi('switchTab', args)
}
