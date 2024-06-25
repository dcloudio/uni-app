import {
  ON_APP_ENTER_BACKGROUND,
  ON_APP_ENTER_FOREGROUND,
} from '@dcloudio/uni-shared'
import { subscribePlusMessage } from '@dcloudio/uni-app-plus/service/framework/app/initGlobalEvent'
import {
  EVENT_BACKBUTTON,
  backbuttonListener,
} from '@dcloudio/uni-app-plus/service/framework/app/utils'

export function initGlobalEvent() {
  const plusGlobalEvent = (plus as any).globalEvent
  const { emit } = UniServiceJSBridge

  plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener)

  plusGlobalEvent.addEventListener('pause', () => {
    emit(ON_APP_ENTER_BACKGROUND)
  })

  plusGlobalEvent.addEventListener('resume', () => {
    // TODO options
    emit(ON_APP_ENTER_FOREGROUND, {})
  })

  // TODO KeyboardHeightChange

  plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage)
}
