import {
  isPage,
  initRelation
} from './util'

import parseBasePage from '../../../mp-weixin/runtime/wrapper/page-base-parser'

function detached ($vm) {
  $vm.$children.forEach(childVm => {
    childVm.$scope.detached()
  })
  $vm.$scope.detached()
}

function onPageUnload ($vm) {
  $vm.$destroy()
  $vm.$children.forEach(childVm => {
    detached(childVm)
  })
}

export default function parsePage (vuePageOptions) {
  const pageOptions = parseBasePage(vuePageOptions, {
    isPage,
    initRelation
  })

  // 纠正百度小程序新生命周期(2.0)methods:onShow在methods:onLoad之前触发的问题
  pageOptions.methods.onShow = function onShow () {
    if (this.$vm && this.$vm.$mp.query) {
      this.$vm.__call_hook('onShow');
    }
  }

  pageOptions.methods.onLoad = function onLoad (args) {
    // 百度 onLoad 在 attached 之前触发，先存储 args, 在 attached 里边触发 onLoad
    if (this.$vm) {
      this.$vm.$mp.query = args
      this.$vm.__call_hook('onLoad', args)
      this.$vm.__call_hook('onShow')
    } else {
      this.pageinstance._$args = args
    }
  }

  pageOptions.methods.onUnload = function onUnload () {
    this.$vm.__call_hook('onUnload')
    onPageUnload(this.$vm)
  }

  return pageOptions
}
