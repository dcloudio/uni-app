import { consumePlusMessage } from './plusMessage'
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

  plusGlobalEvent.addEventListener('plusMessage', onPlusMessage)
  // nvue webview post message
  plusGlobalEvent.addEventListener('WebviewPostMessage', onPlusMessage)
}

function onPlusMessage(e: {
  data: { type: string; args: Record<string, any> }
}) {
  if (e.data && e.data.type) {
    const type = e.data.type
    consumePlusMessage(type, e.data.args || {})
  }
}
