import {
  uni
} from 'uni-core/service/uni'

import {
  invokeCallbackHandler
} from 'uni-helpers/api'

import Vue from './framework/vue'

import {
  getApp
} from './framework/app'

import {
  getCurrentPages
} from './framework/page'

global.UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler

// TODO 补充__uniRoutes?路由校验那里用到了

export default {
  uni,
  Vue,
  getApp,
  getCurrentPages
}
