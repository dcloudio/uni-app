import initVue from 'uni-core/vue'

import ViewPlugin from 'uni-core/view/plugins/index'

import getRealPath from 'uni-platform/helpers/get-real-path'

import {
  initData
} from './data'

import {
  initEvent
} from './event'

export default {
  install (Vue, options) {
    if (process.env.NODE_ENV !== 'production') {
      Vue.config.productionTip = false
      Vue.config.performance = true
    }

    Vue.prototype._$getRealPath = getRealPath

    initVue(Vue)

    ViewPlugin.install(Vue, options)

    initData(Vue)

    initEvent(Vue)
  }
}
