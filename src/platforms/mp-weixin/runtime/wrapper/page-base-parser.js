import {
  stringifyQuery
} from 'uni-shared/query'

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

  initHooks(pageOptions.methods, hooks, vuePageOptions)

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

  return pageOptions
}
