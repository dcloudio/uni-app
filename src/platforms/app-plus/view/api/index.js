import {
  INVOKE_API
} from '../../constants'

function invokeApi (method, args = {}) {
  UniViewJSBridge.publishHandler(INVOKE_API, {
    data: {
      method,
      args
    },
    options: {
      timestamp: Date.now()
    }
  })
}

export function navigateTo (args) {
  invokeApi('navigateTo', args)
}
export function navigateBack (args) {
  invokeApi('navigateBack', args)
}
export function reLaunch (args) {
  invokeApi('reLaunch', args)
}
export function redirectTo (args) {
  invokeApi('redirectTo', args)
}
export function switchTab (args) {
  invokeApi('switchTab', args)
}
