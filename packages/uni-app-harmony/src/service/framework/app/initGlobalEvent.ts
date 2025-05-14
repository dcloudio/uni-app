import {
  ON_APP_ENTER_BACKGROUND,
  ON_APP_ENTER_FOREGROUND,
  ON_KEYBOARD_HEIGHT_CHANGE,
  ON_THEME_CHANGE,
} from '@dcloudio/uni-shared'
import { subscribePlusMessage } from '@dcloudio/uni-app-plus/service/framework/app/initGlobalEvent'
import {
  EVENT_BACKBUTTON,
  backbuttonListener,
  initEnterOptions,
  parseRedirectInfo,
} from '@dcloudio/uni-app-plus/service/framework/app/utils'
import { changePagesNavigatorStyle } from '@dcloudio/uni-app-plus/service/theme'
import { getCurrentPageId } from '@dcloudio/uni-core'

export function initGlobalEvent() {
  const plusGlobalEvent = (plus as any).globalEvent
  const { emit, publishHandler } = UniServiceJSBridge

  plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener)

  plusGlobalEvent.addEventListener('pause', () => {
    emit(ON_APP_ENTER_BACKGROUND)
  })

  plusGlobalEvent.addEventListener('resume', () => {
    const info = parseRedirectInfo()
    if (info && info.userAction) {
      initEnterOptions(info)
    }
    emit(ON_APP_ENTER_FOREGROUND, {})
  })

  plusGlobalEvent.addEventListener(
    'KeyboardHeightChange',
    function (event: { height: number }) {
      emit(ON_KEYBOARD_HEIGHT_CHANGE, {
        height: event.height,
      })
    }
  )

  plusGlobalEvent.addEventListener(
    'uistylechange',
    function (event: { uistyle: string }) {
      const args = {
        theme: event.uistyle,
      }
      emit(ON_THEME_CHANGE, args)
      publishHandler(ON_THEME_CHANGE, args, getCurrentPageId())
      changePagesNavigatorStyle()
    }
  )

  plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage)
}
