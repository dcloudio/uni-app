import Vue from 'vue'

// 使用白名单过滤（前期有一批自定义组件使用了 uni-）
import tags from 'uni-helpers/tags'

import 'uni-core/view/index.css'

import uni from './ui-api.js'

import {
  processEvent
} from 'uni-core/view/plugins/events'

const oldIsReservedTag = Vue.config.isReservedTag

global.uni = uni

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

const findUniTarget = function ($event, $el) {
  let target = $event.target
  for (; target && target !== $el; target = target.parentNode) {
    if (target.tagName && target.tagName.indexOf('UNI-') === 0) {
      break
    }
  }
  return target
}

Vue.prototype.$handleEvent = function ($event) {
  if ($event instanceof Event) { // 未处理的 event 对象 需要对 target 校正及包装
    // 查找 uniTarget
    const target = findUniTarget($event, this.$el)
    $event = processEvent.call(this, $event.type, $event, {}, target || $event.target, $event.currentTarget)
  }
  return $event
}

require('uni-components')
