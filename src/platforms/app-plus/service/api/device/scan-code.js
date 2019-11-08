import * as webview from './scan-code-webview'
import * as weex from './scan-code-weex'

export function scanCode (...array) {
  const api = __uniConfig.nvueCompiler === 'uni-app' ? weex : webview
  return api.scanCode(...array)
}
