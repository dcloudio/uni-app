/**
 * 1.导出全局对象(UniViewJSBridge,UniServiceJSBridge,uni,getApp,getCurrentPages)
 * 2.引入 Vue 插件(uniVueServicePlugin,uniVueServicePlugin)
 * 3.引入 Vue 组件
 */
import Vue from 'vue'

global.UniViewJSBridge = {
  subscribeHandler: UniViewJSBridge.subscribeHandler
}

global.UniServiceJSBridge = {
  subscribeHandler: UniServiceJSBridge.subscribeHandler
}

const {
  default: uni,
  getApp,
  getCurrentPages
} = require('uni-service')

global.uni = uni

global.wx = global.uni

global.getApp = getApp
global.getCurrentPages = getCurrentPages

Vue.use(require('uni-service/plugins').default, {
  routes: __uniRoutes
})

Vue.use(require('uni-view/plugins').default, {
  routes: __uniRoutes
})

require('uni-core/vue')
require('uni-platform/components')
require('uni-components')
