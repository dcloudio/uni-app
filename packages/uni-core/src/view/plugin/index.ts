import { App } from 'vue'

import { initLongPress } from './longPress'
import { initAppConfig } from './appConfig'
import { initCostomDataset } from './costomDataset'
export { getCostomDataset } from './costomDataset'

export function initView(app: App) {
  if (__NODE_JS__) {
    return
  }
  initCostomDataset()
  if (__UNI_FEATURE_LONGPRESS__) {
    initLongPress()
  }
  initAppConfig(app._context.config)
  // TODO wxs,behaviors
}

export { createNativeEvent } from './componentInstance'
