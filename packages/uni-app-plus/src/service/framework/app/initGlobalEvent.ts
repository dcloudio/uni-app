import {
  formatLog,
  ON_APP_ENTER_BACKGROUND,
  ON_APP_ENTER_FOREGROUND,
  ON_THEME_CHANGE,
  ON_KEYBOARD_HEIGHT_CHANGE,
  addLeadingSlash,
} from '@dcloudio/uni-shared'
import { $reLaunch } from '../../api/route/_reLaunch'
import {
  EVENT_BACKBUTTON,
  backbuttonListener,
  parseRedirectInfo,
  initEnterOptions,
  getEnterOptions,
  RedirectInfo,
} from './utils'

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
    const info = parseRedirectInfo()
    if (info && info.userAction) {
      initEnterOptions(info)
      initEnterReLaunch(info)
    }
    emit(ON_APP_ENTER_FOREGROUND, getEnterOptions())
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

  let keyboardHeightChange = 0
  plusGlobalEvent.addEventListener(
    'KeyboardHeightChange',
    function (event: { height: number }) {
      // 安卓设备首次获取高度为 0
      if (keyboardHeightChange !== event.height) {
        keyboardHeightChange = event.height
        emit(ON_KEYBOARD_HEIGHT_CHANGE, {
          height: keyboardHeightChange,
        })
      }
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

function initEnterReLaunch(info: RedirectInfo) {
  __uniConfig.realEntryPagePath =
    __uniConfig.realEntryPagePath || __uniConfig.entryPagePath
  __uniConfig.entryPagePath = info.path
  __uniConfig.entryPageQuery = info.query
  $reLaunch(
    { url: addLeadingSlash(info.path) + info.query },
    { resolve() {}, reject() {} }
  )
}
