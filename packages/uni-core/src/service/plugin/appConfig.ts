import { AppConfig } from 'vue'
import { extend } from '@vue/shared'

import * as wxInstance from './componentWx'

export function initAppConfig(appConfig: AppConfig) {
  const globalProperties = appConfig.globalProperties
  if (__UNI_WX_API__) {
    extend(globalProperties, wxInstance)
  }
}
