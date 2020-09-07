// 使用白名单过滤（前期有一批自定义组件使用了 uni-）
import tags from 'uni-helpers/tags'

import {
  hasLifecycleHook
} from 'uni-helpers/index'

import {
  toRawType
} from 'uni-shared'

export default function initVue (Vue) {
  Vue.config.errorHandler = function (err, vm, info) {
    const errType = toRawType(err)
    Vue.util.warn(`Error in ${info}: "${errType === 'Error' ? err.toString() : err}"`, vm)
    const app = typeof getApp === 'function' && getApp()
    if (app && hasLifecycleHook(app.$options, 'onError')) {
      app.__call_hook('onError', err)
    } else {
      if (__PLATFORM__ === 'app-plus' && process.env.NODE_ENV !== 'production' && errType === 'Error') {
        console.error(`
  ${err.message}
  ${err.stack}
  `)
      } else {
        console.error(err)
      }
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
    return oldGetTagNamespace(tag)
  }
}
