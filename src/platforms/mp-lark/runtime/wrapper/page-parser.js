import {
  isPage,
  instances,
  initRelation
} from './util'

import parseBasePage from '../../../mp-weixin/runtime/wrapper/page-base-parser'

export default function parsePage (vuePageOptions) {
  const pageOptions = parseBasePage(vuePageOptions, {
    isPage,
    initRelation
  })
  // 页面需要在 ready 中触发，其他组件是在 handleLink 中触发
  pageOptions.lifetimes.ready = function ready () {
    if (this.$vm && this.$vm.mpType === 'page') {
      this.$vm.__call_hook('created')
      this.$vm.__call_hook('beforeMount')
      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted')
      this.$vm.__call_hook('onReady')
    } else {
      this.is && console.warn(this.is + ' is not ready')
    }
  }

  pageOptions.lifetimes.detached = function detached () {
    this.$vm && this.$vm.$destroy()
    // 清理
    const webviewId = this.__webviewId__
    webviewId && Object.keys(instances).forEach(key => {
      if (key.indexOf(webviewId + '_') === 0) {
        delete instances[key]
      }
    })
  }

  return pageOptions
}
