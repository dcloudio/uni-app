import {
  formatLog,
  ON_APP_ENTER_BACKGROUND,
  ON_APP_ENTER_FOREGROUND,
  ON_THEME_CHANGE,
} from '@dcloudio/uni-shared'
import { EVENT_BACKBUTTON, backbuttonListener } from './utils'

export function initGlobalEvent() {
  const plusGlobalEvent = (plus as any).globalEvent
  const weexGlobalEvent = weex.requireModule('globalEvent')
  const emit = UniServiceJSBridge.emit

  if (weex.config.preload) {
    plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener)
  } else {
    plusGlobalEvent.addEventListener('splashclosed', () => {
      plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener)
    })
  }

  plusGlobalEvent.addEventListener('pause', () => {
    emit(ON_APP_ENTER_BACKGROUND)
  })

  plusGlobalEvent.addEventListener('resume', () => {
    emit(ON_APP_ENTER_FOREGROUND)
  })

  weexGlobalEvent.addEventListener(
    'uistylechange',
    function (event: { uistyle: string }) {
      const args = {
        theme: event.uistyle,
      }
      emit(ON_THEME_CHANGE, args)
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
