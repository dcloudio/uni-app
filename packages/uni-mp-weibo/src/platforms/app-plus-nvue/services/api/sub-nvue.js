const UNIAPP_SERVICE_NVUE_ID = '__uniapp__service'

export function initPostMessage (nvue) {
  const plus = nvue.requireModule('plus')
  return {
    postMessage (data) {
      plus.postMessage(data, UNIAPP_SERVICE_NVUE_ID)
    }
  }
}

export function initSubNVue (nvue, plus, BroadcastChannel) {
  let origin

  const onMessageCallbacks = []

  const postMessage = nvue.requireModule('plus').postMessage

  const onSubNVueMessage = function onSubNVueMessage (data) {
    onMessageCallbacks.forEach(callback => callback({
      origin,
      data
    }))
  }

  nvue.requireModule('globalEvent').addEventListener('plusMessage', e => {
    if (e.data.type === 'UniAppSubNVue') {
      onSubNVueMessage(e.data.data, e.data.options)
    }
  })

  const webviewId = plus.webview.currentWebview().id

  const channel = new BroadcastChannel('UNI-APP-SUBNVUE')
  channel.onmessage = function (event) {
    if (event.data.to === webviewId) {
      onSubNVueMessage(event.data.data)
    }
  }

  const wrapper = function wrapper (webview) {
    webview.$processed = true

    const currentWebviewId = plus.webview.currentWebview().id
    const isPopupNVue = currentWebviewId === webview.id

    const hostNVueId = webview.__uniapp_origin_type === 'uniNView' && webview.__uniapp_origin_id
    const popupNVueId = webview.id

    webview.postMessage = function (data) {
      if (hostNVueId) {
        channel.postMessage({
          data,
          to: isPopupNVue ? hostNVueId : popupNVueId
        })
      } else {
        postMessage({
          type: 'UniAppSubNVue',
          data: data
        }, UNIAPP_SERVICE_NVUE_ID)
      }
    }
    webview.onMessage = function (callback) {
      onMessageCallbacks.push(callback)
    }

    if (!webview.__uniapp_mask_id) {
      return
    }
    origin = webview.__uniapp_host

    const maskColor = webview.__uniapp_mask

    const maskWebview = webview.__uniapp_mask_id === '0' ? {
      setStyle ({ mask }) {
        nvue.requireModule('uni-tabview').setMask({
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
      return oldClose.apply(webview, args)
    }
  }

  const getSubNVueById = function getSubNVueById (id) {
    const webview = plus.webview.getWebviewById(id)
    if (webview && !webview.$processed) {
      wrapper(webview)
    }
    return webview
  }

  return {
    getSubNVueById,
    getCurrentSubNVue () {
      return getSubNVueById(plus.webview.currentWebview().id)
    }
  }
}
