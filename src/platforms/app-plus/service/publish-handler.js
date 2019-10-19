export function publishHandler (eventType, args, pageIds) {
  args = JSON.stringify(args, (k, v) => { //  将 undefined 格式化为空字符串
    return typeof v === 'undefined' ? '' : v
  })
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
