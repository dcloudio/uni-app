import * as webview from './choose-location-webview'
import * as weex from './choose-location-weex'

export function chooseLocation (...array) {
  const api = __uniConfig.nvueCompiler !== 'weex' ? weex : webview
  return api.chooseLocation(...array)
}
