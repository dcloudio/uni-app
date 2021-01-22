import { AppConfig } from 'vue'
import { extend } from '@vue/shared'

import * as instance from './componentInstance'

import { getComponentDescriptor, handleWxsEvent } from './componentWxs'

export function initAppConfig(appConfig: AppConfig) {
  const globalProperties = appConfig.globalProperties
  extend(globalProperties, instance)
  if (__UNI_WXS_API__) {
    globalProperties.getComponentDescriptor = getComponentDescriptor
    Object.defineProperty(globalProperties, '$ownerInstance', {
      get() {
        return this.$getComponentDescriptor(this)
      },
    })
    globalProperties.$handleWxsEvent = handleWxsEvent
  }
}
