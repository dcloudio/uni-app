import Vue from 'vue'

import parseBaseApp from '../../../mp-weixin/runtime/wrapper/app-base-parser'

import {
  mocks,
  initRefs
} from './util'

export default function parseApp (vm) {
  Vue.prototype._$fallback = true // 降级（调整原 vue 的部分生命周期，如 created，beforeMount,inject,provide）

  Vue.mixin({
    created () { // 处理 injections,头条 triggerEvent 是异步，且触发时机很慢，故延迟 relation 设置
      if (this.mpType !== 'app') {
        if (
          this.mpType === 'page' &&
                    !this.$scope.route &&
                    this.$scope.__route__
        ) {
          this.$scope.route = this.$scope.__route__
        }

        initRefs(this)

        this.__init_injections(this)
        this.__init_provide(this)
      }
    }
  })

  return parseBaseApp(vm, {
    mocks,
    initRefs: function () {} // attached 时，可能查询不到
  })
}
