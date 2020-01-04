import {
  requireNativePlugin
} from './require-native-plugin'

function wrapper (webview) {
  webview.$processed = true

  webview.postMessage = function (data) {
    plus.webview.postMessageToUniNView({
      type: 'UniAppSubNVue',
      data
    }, webview.id)
  }
  let callbacks = []
  webview.onMessage = function (callback) {
    callbacks.push(callback)
  }
  webview.$consumeMessage = function (e) {
    callbacks.forEach(callback => callback(e))
  }

  if (!webview.__uniapp_mask_id) {
    return
  }
  const maskColor = webview.__uniapp_mask
  let maskWebview = webview.__uniapp_mask_id === '0' ? {
    setStyle ({
      mask
    }) {
      requireNativePlugin('uni-tabview').setMask({
        color: mask
      })
    }
  } : plus.webview.getWebviewById(webview.__uniapp_mask_id)
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
    callbacks = []
    return oldClose.apply(webview, args)
  }
}

export function getSubNVueById (id) {
  const webview = plus.webview.getWebviewById(id)
  if (webview && !webview.$processed) {
    wrapper(webview)
  }
  return webview
}

export function getCurrentSubNVue () {
  return getSubNVueById(plus.webview.currentWebview().id)
}
