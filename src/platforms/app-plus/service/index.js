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
