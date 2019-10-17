import {
  callPageHook
} from 'uni-core/service/plugins/util'

import {
  lifecycleMixin
}
  from 'uni-core/service/plugins/lifecycle'

export function initLifecycle (Vue) {
  lifecycleMixin(Vue)

  Vue.mixin({
    beforeCreate () {
      if (this.mpType === 'page') {
        this.$scope = this.$options.pageInstance
        this.$scope.$vm = this
        delete this.$options.pageInstance
      }
    },
    created () {
      if (this.mpType === 'page') {
        callPageHook(this.$scope, 'onLoad', this.$options.pageQuery)
        callPageHook(this.$scope, 'onShow')
      }
    },
    beforeDestroy () {
      if (this.mpType === 'page') {
        callPageHook(this.$scope, 'onUnload')
      }
    },
    mounted () {
      if (this.mpType === 'page') {
        callPageHook(this.$scope, 'onReady')
      }
    }
  })
}
