import { App } from 'vue'

import { initLongPress } from './longPress'
import { initAppConfig } from './appConfig'

export function initView(app: App) {
  if (__UNI_FEATURE_LONGPRESS__) {
    initLongPress()
  }
  initAppConfig(app._context.config)
  // TODO wxs,behaviors
}
