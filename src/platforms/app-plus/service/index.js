import {
  getApp,
  registerApp
} from './framework/app'

import {
  registerPage,
  getCurrentPages
} from './framework/page'

import {
  registerConfig
} from './framework/config'

import {
  uni
} from 'uni-core/service/uni'

import {
  invokeCallbackHandler
} from 'uni-helpers/api'

UniServiceJSBridge.publishHandler = UniServiceJSBridge.emit // TODO
UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler

export default {
  __registerConfig: registerConfig,
  __registerApp: registerApp,
  __registerPage: registerPage,
  uni,
  getApp,
  getCurrentPages
}
