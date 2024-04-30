import type { AppConfig } from 'vue'
import { extend } from '@vue/shared'

import * as instance from './componentInstance'

import { getComponentDescriptor } from './componentWxs'

export function initAppConfig(appConfig: AppConfig) {
  const globalProperties = appConfig.globalProperties
  extend(globalProperties, instance)
  if (__UNI_FEATURE_WXS__) {
    //$getComponentDescriptor
    globalProperties.$gcd = getComponentDescriptor
    // Object.defineProperty(globalProperties, '$ownerInstance', {
    //   get() {
    //     return getComponentDescriptor(this)
    //   },
    // })
    // globalProperties.$handleWxsEvent = handleWxsEvent
  }
}
