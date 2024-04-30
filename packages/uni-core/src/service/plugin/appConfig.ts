import type { AppConfig } from 'vue'
import { extend } from '@vue/shared'

import * as wxInstance from './componentWx'
import { getOpenerEventChannel } from './componentInstance'

export function initAppConfig(appConfig: AppConfig) {
  const globalProperties = appConfig.globalProperties
  globalProperties.getOpenerEventChannel = getOpenerEventChannel
  if (__UNI_FEATURE_WX__) {
    extend(globalProperties, wxInstance)
  }
}
