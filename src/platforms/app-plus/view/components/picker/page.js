let plus_
let BroadcastChannel_

function getRuntime () {
  return typeof window === 'object' && typeof navigator === 'object' && typeof document === 'object' ? 'webview' : 'v8'
}

function getPageId () {
  return plus_.webview.currentWebview().id
}

let channel
const callbacks = {}

function onPlusMessage (res) {
  const message = res.data && res.data.__message
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

function addEventListener (pageId, callback) {
  if (getRuntime() === 'v8') {
    channel && channel.close()
    channel = new BroadcastChannel_(getPageId())
    channel.onmessage = onPlusMessage
  } else {
    window.__plusMessage = onPlusMessage
  }
  callbacks[pageId] = callback
}

class Page {
  constructor (webview) {
    this.webview = webview
  }
  sendMessage (data) {
    const message = {
      __message: {
        data
      }
    }
    const channel = new BroadcastChannel_(this.webview.id)
    channel.postMessage(message)
  }
  close () {
    this.webview.close()
  }
}

export function showPage ({
  context = {},
  url,
  data = {},
  style = {},
  onMessage,
  onClose
}) {
  // eslint-disable-next-line
  plus_ = context.plus || plus
  // eslint-disable-next-line
  BroadcastChannel_ = context.BroadcastChannel || BroadcastChannel
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
      path: `${(typeof process === 'object' && process.env && process.env.VUE_APP_TEMPLATE_PATH) || '/template'}/${url}.js`,
      defaultFontSize: plus_.screen.resolutionWidth / 20,
      viewport: plus_.screen.resolutionWidth
    }
  }
  style = Object.assign(defaultStyle, style)
  const page = plus_.webview.create('', pageId, style, {
    extras: {
      from: getPageId(),
      runtime: getRuntime(),
      data
    }
  })
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
