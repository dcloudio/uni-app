import {
  initHooks,
  PAGE_EVENT_HOOKS
} from 'uni-wrapper/util'

import parseComponent from 'uni-platform/runtime/wrapper/component-parser'

const hooks = [
  'onShow',
  'onHide',
  'onUnload'
]

hooks.push(...PAGE_EVENT_HOOKS)

export default function parseBasePage (vuePageOptions, {
  isPage,
  initRelation
}) {
  const pageOptions = parseComponent(vuePageOptions, {
    isPage,
    initRelation
  })

  initHooks(pageOptions.methods, hooks)

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args)
  }

  return pageOptions
}
