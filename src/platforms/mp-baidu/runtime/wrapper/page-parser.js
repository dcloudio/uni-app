import {
  isPage,
  isIOS,
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

  pageOptions.methods.onLoad = function onLoad (args) {
    // 百度 onLoad 在 attached 之前触发，先存储 args, 在 attached 里边触发 onLoad
    this.pageinstance._$args = args

    if (isIOS) {
      this.$vm.$mp.query = this.pageinstance._$args // 兼容 mpvue
      this.$vm.__call_hook('onLoad', this.pageinstance._$args)
    }
  }
  // TODO  目前版本 百度 Component 作为页面时，methods 中的 onShow 不触发
  delete pageOptions.methods.onShow

  pageOptions.methods.onUnload = function onUnload () {
    this.$vm.__call_hook('onUnload')
    onPageUnload(this.$vm)
  }

  return pageOptions
}
