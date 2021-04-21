import { AppConfig } from 'vue'
import { extend } from '@vue/shared'

import * as wxInstance from './componentWx'

export function initAppConfig(appConfig: AppConfig) {
  if (__UNI_FEATURE_WX__) {
    const globalProperties = appConfig.globalProperties
    extend(globalProperties, wxInstance)
  }
}
