function getPageType () {
  return typeof window === 'object' && typeof navigator === 'object' && typeof document === 'object' ? 'vue' : 'nvue'
}

let pageId

function getPageId () {
  return pageId || (pageId = plus.webview.currentWebview().id)
}

let initedEventListener = false
const callbacks = {}

function addEventListener (pageId, callback) {
  let type = getPageType()

  function onPlusMessage (res) {
    const message = res.data.__message
    if (!message || !message.__page) {
      return
    }
    const pageId = message.__page
    const callback = callbacks[pageId]
    callback && callback(message)
    if (!message.keep) {
      delete callbacks[pageId]
    }
  }
  if (!initedEventListener) {
    if (type === 'nvue') {
      const globalEvent = weex.requireModule('globalEvent')
      globalEvent.addEventListener('plusMessage', onPlusMessage)
    } else {
      window.__plusMessage = onPlusMessage
    }
    initedEventListener = true
  }
  callbacks[pageId] = callback
}

class Page {
  constructor (webview) {
    this.webview = webview
  }
  sendMessage (data) {
    plus.webview.postMessageToUniNView({
      __message: {
        data
      }
    }, this.webview.id)
  }
}

export function showPage ({
  url,
  data = {},
  style = {},
  onMessage,
  onClose
}) {
  const type = getPageType()
  const fromId = getPageId()
  const titleNView = {
    autoBackButton: true,
    titleSize: '17px'
  }
  const pageId = `page${Date.now()}`
  style = Object.assign({}, style)
  if (style.titleNView !== false && style.titleNView !== 'none') {
    style.titleNView = Object.assign(titleNView, style.titleNView)
  }
  const defaultStyle = {
    top: 0,
    bottom: 0,
    usingComponents: {},
    popGesture: 'close',
    scrollIndicator: 'none',
    animationType: 'pop-in',
    animationDuration: 200,
    uniNView: {
      path: `_www/${url}.js?from=${fromId}&type=${type}&data=${encodeURIComponent(JSON.stringify(data))}`,
      defaultFontSize: plus.screen.resolutionWidth / 20,
      viewport: plus.screen.resolutionWidth
    }
  }
  style = Object.assign(defaultStyle, style)
  const page = plus.webview.create('', pageId, style)
  page.addEventListener('close', onClose)
  addEventListener(pageId, message => {
    if (typeof onMessage === 'function') {
      onMessage(message.data)
    }
    if (!message.keep) {
      page.close('auto')
    }
  })
  page.show(style.animationType, style.animationDuration)
  return new Page(page)
}
