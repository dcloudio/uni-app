import {
  decodedQuery
} from 'uni-shared'

import {
  callPageHook
} from '../util'

import createPage from './create-page'

export function createPageMixin () {
  return {
    created: function pageCreated () {
      try {
        const options = decodedQuery(this.$route.query)
        createPage(this, options)
        callPageHook(this, 'onLoad', options)
        callPageHook(this, 'onShow')
      } catch (e) {
        console.error(e)
      }
      if (__PLATFORM__ === 'mp-weibo') {
        var onShareAppMessage = this.$options.onShareAppMessage
        if (onShareAppMessage && typeof onShareAppMessage === 'function') {
          uni.sendShareMessage({
            data: onShareAppMessage.call(this)
          })
        } else if (Array.isArray(onShareAppMessage) && onShareAppMessage.length && typeof onShareAppMessage[0] === 'function') {
          uni.sendShareMessage({
            data: onShareAppMessage[0].call(this)
          })
        } else {
          uni.sendShareMessage({
            data: null
          })
        }
      }
    }
  }
}
