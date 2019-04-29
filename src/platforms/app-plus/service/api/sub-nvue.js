function wrapper (webview) {
  webview.$processed = true
  if (!webview.__uniapp_mask_id) {
    return
  }
  const maskColor = webview.__uniapp_mask
  const maskWebview = plus.webview.getWebviewById(webview.__uniapp_mask_id)
  const oldShow = webview.show
  const oldHide = webview.hide
  const oldClose = webview.close

  const showMask = function () {
    maskWebview.setStyle({
      mask: maskColor
    })
  }
  const closeMask = function () {
    maskWebview.setStyle({
      mask: 'none'
    })
  }
  webview.show = function (...args) {
    showMask()
    return oldShow.apply(webview, args)
  }
  webview.hide = function (...args) {
    closeMask()
    return oldHide.apply(webview, args)
  }
  webview.close = function (...args) {
    closeMask()
    return oldClose.apply(webview, args)
  }
}

export const subNVue = {
  getSubNVueById (id) {
    const webview = plus.webview.getWebviewById(id)
    if (webview && !webview.$processed) {
      wrapper(webview)
    }
    return webview
  }
}
