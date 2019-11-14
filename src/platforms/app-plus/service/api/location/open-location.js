import * as webview from './open-location-webview'
import * as weex from './open-location-weex'

export function openLocation (...array) {
  const api = __uniConfig.nvueCompiler === 'uni-app' ? weex : webview
  return api.openLocation(...array)
}
