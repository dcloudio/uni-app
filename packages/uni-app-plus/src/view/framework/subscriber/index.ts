import { useI18n } from '@dcloudio/uni-core'
import { SET_LOCALE_API, VD_SYNC } from '../../../constants'
import { onVdSync } from '../dom'

export function initSubscribeHandlers() {
  const { subscribe } = UniViewJSBridge
  subscribe(VD_SYNC, onVdSync)
  subscribe(SET_LOCALE_API, useI18n().setLocale)
}
