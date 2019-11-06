let plus_
let weex_
let uni_

let runtime

function getRuntime () {
  return runtime || (runtime = typeof window === 'object' && typeof navigator === 'object' && typeof document ===
    'object'
    ? 'webview' : 'v8')
}

function setRuntime (value) {
  runtime = value
}

function getPageId () {
  return plus_.webview.currentWebview().id
}

let initedEventListener = false
const callbacks = {}

function addEventListener (pageId, callback) {
  const runtime = getRuntime()

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
  if (!initedEventListener) {
    if (runtime === 'v8') {
      const globalEvent = weex_.requireModule('globalEvent')
      globalEvent.addEventListener('plusMessage', onPlusMessage)
    } else if (runtime === 'v8-native') {
      uni_.$on(getPageId(), onPlusMessage)
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
    const runtime = getRuntime()
    const message = {
      __message: {
        data
      }
    }
    if (runtime === 'v8-native') {
      uni_.$emit(this.webview.id, {
        data: JSON.parse(JSON.stringify(message))
      })
    } else {
      plus_.webview.postMessageToUniNView(message, this.webview.id)
    }
  }
  close () {
    this.webview.close()
  }
}

export function showPage ({
  context,
  runtime,
  url,
  data = {},
  style = {},
  onMessage,
  onClose
}) {
  if (context) {
    plus_ = context.plus
    weex_ = context.weex
    uni_ = context.uni
  } else {
    // eslint-disable-next-line
    plus_ = typeof plus === 'object' ? plus : null
    // eslint-disable-next-line
    weex_ = typeof weex === 'object' ? weex : null
    // eslint-disable-next-line
    uni_ = typeof uni === 'object' ? uni : null
  }
  if (runtime) {
    setRuntime(runtime)
  } else {
    runtime = getRuntime()
  }
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
      path: `/${url}.js?from=${getPageId()}&runtime=${runtime}&data=${encodeURIComponent(JSON.stringify(data))}`,
      defaultFontSize: plus_.screen.resolutionWidth / 20,
      viewport: plus_.screen.resolutionWidth
    }
  }
  style = Object.assign(defaultStyle, style)
  const page = plus_.webview.create('', pageId, style)
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
