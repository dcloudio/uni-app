export function publishHandler (eventType, args, pageIds) {
  args = JSON.stringify(args)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`UNIAPP[publishHandler]:[${+new Date()}]`, eventType, args, pageIds)
  }
  if (!Array.isArray(pageIds)) {
    pageIds = [pageIds]
  }
  const evalJSCode =
    `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${eventType}",${args},__PAGE_ID__)`
  pageIds.forEach(id => {
    const webview = plus.webview.getWebviewById(String(id))
    webview && webview.evalJS(evalJSCode.replace('__PAGE_ID__', id))
  })
}
