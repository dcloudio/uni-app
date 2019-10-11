import Vue from 'vue'

import 'uni-core/view/index.css'

import {
  definePage
} from 'uni-platform/view/framework/page'

import {
  registerConfig
} from 'uni-platform/view/framework/config'

import ViewPlugin from 'uni-platform/view/framework/plugins/index'

global.UniViewJSBridge = {
  publishHandler: UniViewJSBridge.publishHandler,
  subscribeHandler: UniViewJSBridge.subscribeHandler
}

global.__registerConfig = registerConfig
global.__registerPage = definePage

global.Vue = Vue

Vue.use(ViewPlugin)

require('uni-components')

export * from './view-api.js'
