import {
  instances,
  components
} from './util'

import parseBasePage from '../../../mp-weixin/runtime/wrapper/page-base-parser'

export default function parsePage (vuePageOptions) {
  const pageOptions = parseBasePage(vuePageOptions)
  const lifetimes = pageOptions.lifetimes
  const oldCreated = lifetimes.created
  lifetimes.created = function created () {
    const webviewId = this.__webviewId__
    components[webviewId] = []
    if (typeof oldCreated === 'function') {
      oldCreated.call(this)
    }
  }
  // 页面需要在 ready 中触发，其他组件是在 handleLink 中触发
  lifetimes.ready = function ready () {
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
  const oldDetached = lifetimes.detached
  lifetimes.detached = function detached () {
    if (typeof oldDetached === 'function') {
      oldDetached.call(this)
    }
    // 清理
    const webviewId = this.__webviewId__
    webviewId && Object.keys(instances).forEach(key => {
      if (key.indexOf(webviewId + '_') === 0) {
        delete instances[key]
      }
    })
    delete components[webviewId]
  }

  return pageOptions
}
