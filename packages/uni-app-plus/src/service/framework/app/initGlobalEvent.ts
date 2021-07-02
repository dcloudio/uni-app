import { formatLog } from '@dcloudio/uni-shared'
import { backbuttonListener } from './utils'

export function initGlobalEvent() {
  const plusGlobalEvent = (plus as any).globalEvent
  const weexGlobalEvent = weex.requireModule('globalEvent')
  const emit = UniServiceJSBridge.emit

  if (weex.config.preload) {
    plus.key.addEventListener('backbutton', backbuttonListener)
  } else {
    plusGlobalEvent.addEventListener('splashclosed', () => {
      plus.key.addEventListener('backbutton', backbuttonListener)
    })
  }

  plusGlobalEvent.addEventListener('pause', () => {
    emit('onAppEnterBackground')
  })

  plusGlobalEvent.addEventListener('resume', () => {
    emit('onAppEnterForeground')
  })

  weexGlobalEvent.addEventListener(
    'uistylechange',
    function (event: { uistyle: string }) {
      const args = {
        theme: event.uistyle,
      }
      emit('onThemeChange', args)
    }
  )

  plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage)
  // nvue webview post message
  plusGlobalEvent.addEventListener('WebviewPostMessage', subscribePlusMessage)
}

function subscribePlusMessage({
  data,
}: {
  data: { type: string; args: Record<string, any> }
}) {
  if (__DEV__) {
    console.log(formatLog('plusMessage', data))
  }
  if (data && data.type) {
    UniServiceJSBridge.subscribeHandler('plusMessage.' + data.type, data.args)
  }
}

export function onPlusMessage<T>(
  type: string,
  callback: (args: T) => void,
  once: boolean = false
) {
  UniServiceJSBridge.subscribe('plusMessage.' + type, callback, once)
}
