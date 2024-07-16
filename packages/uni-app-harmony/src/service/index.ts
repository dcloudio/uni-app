import * as uni from './api/index'
import { UniServiceJSBridge } from './bridge'
import { registerApp as __registerApp, getApp } from './framework/app'
import { definePage as __definePage } from '@dcloudio/uni-app-plus/service/framework/page'
import { getCurrentPages } from '@dcloudio/uni-app-plus/service/framework/page'
export { registerServiceMethod } from '@dcloudio/uni-core'
export * from '@dcloudio/uni-runtime'

export default {
  uni,
  getApp,
  getCurrentPages,
  __definePage,
  __registerApp,
  UniServiceJSBridge,
}
export { UniServiceJSBridge } from './bridge'
export { getEnv } from '../platform/env.js'
