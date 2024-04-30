import { extend, isFunction } from '@vue/shared'

declare interface BroadcastChannel {
  new (id: string): BroadcastChannel
  name: string
  postMessage: (message: any) => void
  onmessage: (event: { type: string; data: any }) => void
  close: () => void
}

let plus_: Plus & {
  webview: {
    postMessageToUniNView?: Function
  }
}
let weex_: any
let BroadcastChannel_: BroadcastChannel

function getRuntime() {
  return typeof window === 'object' &&
    typeof navigator === 'object' &&
    typeof document === 'object'
    ? 'webview'
    : 'v8'
}

function getPageId() {
  return plus_.webview.currentWebview().id
}

let channel: BroadcastChannel
let globalEvent: any
const callbacks: Record<string, CallBack> = {}

type CallBack = (result: any) => void

function onPlusMessage(res: {
  data?: { __message: { __page: string; keep: boolean } }
}) {
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

function addEventListener(pageId: string, callback: CallBack) {
  if (getRuntime() === 'v8') {
    if (BroadcastChannel_) {
      channel && channel.close()
      channel = new BroadcastChannel_(getPageId())
      channel.onmessage = onPlusMessage
    } else if (!globalEvent) {
      globalEvent = weex_.requireModule('globalEvent')
      globalEvent.addEventListener('plusMessage', onPlusMessage)
    }
  } else {
    // @ts-expect-error
    window.__plusMessage = onPlusMessage
  }
  callbacks[pageId] = callback
}

export class Page {
  webview: PlusWebviewWebviewObject

  constructor(webview: PlusWebviewWebviewObject) {
    this.webview = webview
  }

  sendMessage(data: any) {
    const message = JSON.parse(
      JSON.stringify({
        __message: {
          data,
        },
      })
    )
    const id = this.webview.id
    if (BroadcastChannel_) {
      const channel = new BroadcastChannel_(id)
      channel.postMessage(message)
    } else {
      plus_.webview.postMessageToUniNView &&
        plus_.webview.postMessageToUniNView(message, id)
    }
  }

  close() {
    this.webview.close()
  }
}
type PageShow = Parameters<PlusWebviewWebviewObject['show']>
type ShowPage = {
  context?: { plus?: Plus; weex?: any; BroadcastChannel?: any }
  url: string
  data: any
  style?: PlusWebviewWebviewStyles & {
    animationType?: PageShow[0]
    animationDuration?: PageShow[1]
    titleNView?: PlusWebviewWebviewStyles['titleNView'] | false | 'none'
  }
  onMessage?: CallBack
  onClose: CallBack
}
export function showPage({
  context = {},
  url,
  data = {},
  style = {},
  onMessage,
  onClose,
}: ShowPage) {
  let darkmode = __uniConfig.darkmode
  // eslint-disable-next-line
  plus_ = context.plus || plus
  // eslint-disable-next-line
  weex_ = context.weex || (typeof weex === 'object' ? weex : null)
  // eslint-disable-next-line
  BroadcastChannel_ =
    context.BroadcastChannel ||
    (typeof BroadcastChannel === 'object' ? BroadcastChannel : null)
  const titleNView = {
    autoBackButton: true,
    titleSize: '17px',
  }
  const pageId = `page${Date.now()}`
  style = extend({}, style)
  if (style.titleNView !== false && style.titleNView !== 'none') {
    style.titleNView = extend(titleNView, style.titleNView)
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
      path: `/${url}.js`,
      defaultFontSize: 16,
      viewport: plus_.screen.resolutionWidth,
    },
  }
  style = extend(defaultStyle, style)
  const page = plus_.webview.create('', pageId, style, {
    extras: {
      from: getPageId(),
      runtime: getRuntime(),
      data: extend({}, data, { darkmode }),
      useGlobalEvent: !BroadcastChannel_,
    },
  })
  page.addEventListener('close', onClose)
  addEventListener(pageId, (message) => {
    if (isFunction(onMessage)) {
      onMessage(message.data)
    }
    if (!message.keep) {
      page.close('auto')
    }
  })
  page.show(style.animationType, style.animationDuration)
  return new Page(page)
}
