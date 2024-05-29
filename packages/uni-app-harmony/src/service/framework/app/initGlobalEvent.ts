import { subscribePlusMessage } from '@dcloudio/uni-app-plus/service/framework/app/initGlobalEvent'
import {
  EVENT_BACKBUTTON,
  backbuttonListener,
} from '@dcloudio/uni-app-plus/service/framework/app/utils'

export function initGlobalEvent() {
  const plusGlobalEvent = (plus as any).globalEvent

  plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener)

  // TODO KeyboardHeightChange

  plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage)
}
