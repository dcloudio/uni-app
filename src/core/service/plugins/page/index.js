import {
  callPageHook
} from '../util'

import createPage from './create-page'

// 与小程序保持一致，尝试decodeURIComponent一次参数
function getDecodedQuery (query = {}) {
  const decodedQuery = {}
  Object.keys(query).forEach(name => {
    try {
      decodedQuery[name] = decodeURIComponent(query[name])
    } catch (e) {
      decodedQuery[name] = query[name]
    }
  })
  return decodedQuery
}

export function createPageMixin () {
  return {
    created: function pageCreated () {
      const options = getDecodedQuery(this.$route.query)
      createPage(this, options)
      callPageHook(this, 'onLoad', options)
      callPageHook(this, 'onShow')
    }
  }
}
