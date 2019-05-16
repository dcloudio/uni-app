import {
  isPage,
  initRelation
} from './util'

import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-base-parser'

export default function parseComponent (vueOptions) {
  const componentOptions = parseBaseComponent(vueOptions, {
    isPage,
    initRelation
  })

  const oldAttached = componentOptions.lifetimes.attached

  componentOptions.lifetimes.attached = function attached () {
    oldAttached.call(this)
    if (isPage.call(this)) { // 百度 onLoad 在 attached 之前触发
      // 百度 当组件作为页面时 pageinstancce 不是原来组件的 instance
      this.pageinstance.$vm = this.$vm

      this.$vm.$mp.query = this.pageinstance._$args // 兼容 mpvue
      this.$vm.__call_hook('onLoad', this.pageinstance._$args)
    }
  }

  componentOptions.messages = {
    '__l': componentOptions.methods['__l']
  }
  delete componentOptions.methods['__l']

  return componentOptions
}
