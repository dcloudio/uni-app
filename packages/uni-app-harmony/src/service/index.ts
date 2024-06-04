// TODO 使用@dcloudio进行引用
import {
  UTSJSONObject,
  UniError,
} from '../../../uni-uts-v1/lib/javascript/lib/runtime/uts.js'
import * as uni from './api/index'
import { UniServiceJSBridge } from './bridge'
import { registerApp as __registerApp, getApp } from './framework/app'
import { definePage as __definePage } from '@dcloudio/uni-app-plus/service/framework/page'
import { getCurrentPages } from '@dcloudio/uni-app-plus/service/framework/page'
export * from '@dcloudio/uni-runtime'

export default {
  uni,
  getApp,
  getCurrentPages,
  __definePage,
  __registerApp,
  UniServiceJSBridge,
  UTSJSONObject,
  UniError,
}
