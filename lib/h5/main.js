/**
 * 1.导出全局对象(UniViewJSBridge,UniServiceJSBridge,uni,getApp,getCurrentPages)
 * 2.引入 Vue 插件(uniVueServicePlugin,uniVueServicePlugin)
 * 3.引入 Vue 组件
 */
import Vue from 'vue'
import initVue from 'uni-core/vue'

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
} = require('uni-platform/service/index')

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

Vue.config.errorHandler = function (err, vm, info) {
  UniServiceJSBridge.emit('onError', err)
}

initVue(Vue)
require('uni-platform/components')
require('uni-components')
