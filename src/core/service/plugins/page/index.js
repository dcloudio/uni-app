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
      const options = decodedQuery(this.$route.query)
      createPage(this, options)
      callPageHook(this, 'onLoad', options)
      callPageHook(this, 'onShow')
    }
  }
}
