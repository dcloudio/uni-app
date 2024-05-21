import { subscribePlusMessage } from '@dcloudio/uni-app-plus/service/framework/app/initGlobalEvent'

export function initGlobalEvent() {
  const plusGlobalEvent = (plus as any).globalEvent

  // TODO KeyboardHeightChange

  plusGlobalEvent.addEventListener('plusMessage', subscribePlusMessage)
}
