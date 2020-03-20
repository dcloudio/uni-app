import {
  uni
} from 'uni-core/service/uni'

import {
  invokeCallbackHandler
} from 'uni-helpers/api'

import {
  publishHandler
} from 'uni-platform/service/publish-handler'

import {
  wx
} from './wx'

import {
  definePage
} from '../page-factory'

import {
  getApp,
  registerApp
} from './framework/app'

import {
  registerPage,
  getCurrentPages
} from './framework/page'

import vuePlugin from './framework/plugins'

// 挂靠在uni上，暂不做全局导出
uni.__$wx__ = wx

UniServiceJSBridge.publishHandler = publishHandler
UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler

export default {
  __vuePlugin: vuePlugin,
  __definePage: definePage,
  __registerApp: registerApp,
  __registerPage: registerPage,
  uni,
  getApp,
  getCurrentPages
}
