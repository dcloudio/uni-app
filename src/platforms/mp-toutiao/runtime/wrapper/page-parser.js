import {
  isPage,
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

  return pageOptions
}
