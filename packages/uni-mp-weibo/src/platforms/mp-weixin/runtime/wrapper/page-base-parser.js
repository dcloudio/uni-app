import {
  stringifyQuery
} from 'uni-shared/query'

import {
  initHooks,
  initUnknownHooks,
  PAGE_EVENT_HOOKS
} from 'uni-wrapper/util'

import parseComponent from 'uni-platform/runtime/wrapper/component-parser'

import { initWorkletMethods } from './util'

const hooks = [
  'onShow',
  'onHide',
  'onUnload'
]

hooks.push(...PAGE_EVENT_HOOKS)

export default function parseBasePage (vuePageOptions) {
  const [pageOptions, vueOptions] = parseComponent(vuePageOptions, true)

  initHooks(pageOptions.methods, hooks, vueOptions)

  pageOptions.methods.onLoad = function (query) {
    this.options = query
    const copyQuery = Object.assign({}, query)
    delete copyQuery.__id__
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    }
    this.$vm.$mp.query = query // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query)
  }
  if (__PLATFORM__ === 'mp-baidu') {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onInit', 'onReady'])
  } else {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady'])
  }
  if (__PLATFORM__ === 'mp-weixin') {
    initWorkletMethods(pageOptions.methods, vueOptions.methods)
  }

  return pageOptions
}
