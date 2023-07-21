import {
  stringifyQuery
} from 'uni-shared/query'

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
  const pageOptions = parseBasePage(vuePageOptions)

  // 纠正百度小程序生命周期methods:onShow在methods:onLoad之前触发的问题
  pageOptions.methods.onShow = function onShow () {
    if (this.$vm && this.$vm.$mp.query) {
      this.$vm.__call_hook('onShow')
    }
  }

  pageOptions.methods.onLoad = function onLoad (query) {
    // 百度 onLoad 在 attached 之前触发（基础库小于 3.70），先存储 args, 在 attached 里边触发 onLoad
    if (this.$vm) {
      const copyQuery = Object.assign({}, query)
      delete copyQuery.__id__
      this.pageinstance.$page = this.$page = {
        fullPath: '/' + this.pageinstance.route + stringifyQuery(copyQuery)
      }
      this.$vm.$mp.query = query
      this.$vm.__call_hook('onLoad', query)
      this.$vm.__call_hook('onShow')
    } else {
      this.pageinstance._$args = query
    }
  }

  pageOptions.methods.onUnload = function onUnload () {
    this.$vm.__call_hook('onUnload')
    onPageUnload(this.$vm)
  }

  return pageOptions
}
