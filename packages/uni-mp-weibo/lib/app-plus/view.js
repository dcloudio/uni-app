
import Vue from 'vue'

import 'uni-platform/view/index.css'

import {
  definePage
} from 'uni-platform/page-factory'

import {
  getCurrentPages
} from 'uni-platform/view/framework/page'

import ViewPlugin from 'uni-platform/view/framework/plugins/index'

global.UniViewJSBridge = {
  subscribe: UniViewJSBridge.subscribe,
  publishHandler: UniViewJSBridge.publishHandler,
  subscribeHandler: UniViewJSBridge.subscribeHandler
}

global.getCurrentPages = getCurrentPages

global.__definePage = definePage

global.Vue = Vue

Vue.use(ViewPlugin)

require('uni-components')

export * from './view-api.js'
