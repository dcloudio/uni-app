import initVue from 'uni-core/vue'

import ViewPlugin from 'uni-core/view/plugins/index'

import {
  initData
} from './data'

import {
  initEvent
} from './event'

export default {
  install (Vue, options) {
    if (process.env.NODE_ENV !== 'production') {
      Vue.config.performance = true
    }

    initVue(Vue)

    ViewPlugin.install(Vue, options)

    initData(Vue)

    initEvent(Vue)
  }
}
