import {
  hasOwn
} from 'uni-shared'

import compareVersions from 'compare-versions'

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

      if (hasOwn(this.pageinstance, '_$args')) {
        this.$vm.$mp.query = this.pageinstance._$args
        this.$vm.__call_hook('onLoad', this.pageinstance._$args)
        delete this.pageinstance._$args
      }
      // TODO  3.105.17以下基础库内百度 Component 作为页面时，methods 中的 onShow 不触发
      if (compareVersions.compare(swan.getEnvInfoSync().sdkVersion, '3.105.17', '<')) {
        this.$vm.__call_hook('onShow')
      }
    }
  }

  componentOptions.messages = {
    '__l': componentOptions.methods['__l']
  }
  delete componentOptions.methods['__l']

  return componentOptions
}
