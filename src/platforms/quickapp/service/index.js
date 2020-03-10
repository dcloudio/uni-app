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

export default {
  uni,
  Vue,
  getApp,
  getCurrentPages
}
