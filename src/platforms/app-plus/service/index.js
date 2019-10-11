import {
  getApp,
  registerApp
} from './framework/app'

import {
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

import {
  registerPage
} from 'uni-platform/service/register-page'

import {
  publishHandler
} from 'uni-platform/service/publish-handler'

UniServiceJSBridge.publishHandler = publishHandler
UniServiceJSBridge.invokeCallbackHandler = invokeCallbackHandler

export default {
  __registerConfig: registerConfig,
  __registerApp: registerApp,
  __registerPage: registerPage,
  uni,
  getApp,
  getCurrentPages
}
