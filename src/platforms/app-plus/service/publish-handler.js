import {
  V_IF,
  V_ELSE_IF,
  V_SHOW
}
  from './constants'

function optimize (k, v) {
  if (typeof v === 'undefined') {
    return ''
  }
  if (
    k === V_IF ||
    k === V_ELSE_IF ||
    k === V_SHOW
  ) {
    return v ? 1 : 0
  }
  return v
}

export function publishHandler (eventType, args, pageIds) {
  args = JSON.stringify(args, optimize)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`UNIAPP[publishHandler]:[${+new Date()}]`, eventType, args, pageIds)
  }
  if (!Array.isArray(pageIds)) {
    pageIds = [pageIds]
  }
  const evalJSCode =
    `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${eventType}",${args})`
  pageIds.forEach(id => {
    const webview = plus.webview.getWebviewById(String(id))
    webview && webview.evalJS(evalJSCode)
  })
}
