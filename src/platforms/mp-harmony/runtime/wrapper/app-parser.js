import Vue from 'vue'

import parseBaseApp from '../../../mp-weixin/runtime/wrapper/app-base-parser'

import {
  mocks,
  initRefs
} from './util'

export default function parseApp (vm) {
  Vue.mixin({
    created () { // 处理 injections, triggerEvent 是异步，且触发时机很慢，故延迟 relation 设置
      if (this.mpType !== 'app') {
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
