// 使用白名单过滤（前期有一批自定义组件使用了 uni-）
import tags from 'uni-helpers/tags'

import {
  hasLifecycleHook
} from 'uni-helpers/index'

export default function initVue (Vue) {
  Vue.config.errorHandler = function (err) {
    const app = typeof getApp === 'function' && getApp()
    if (app && hasLifecycleHook(app.$options, 'onError')) {
      app.__call_hook('onError', err)
    } else {
      console.error(err)
    }
  }

  const oldIsReservedTag = Vue.config.isReservedTag

  Vue.config.isReservedTag = function (tag) {
    return tags.indexOf(tag) !== -1 || oldIsReservedTag(tag)
  }

  Vue.config.ignoredElements = tags

  const oldGetTagNamespace = Vue.config.getTagNamespace

  const conflictTags = ['switch', 'image', 'text', 'view']

  Vue.config.getTagNamespace = function (tag) {
    if (~conflictTags.indexOf(tag)) { // svg 部分标签名称与 uni 标签冲突
      return false
    }
    return oldGetTagNamespace(tag) || false
  }
}
