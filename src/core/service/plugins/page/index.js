import {
  callPageHook
} from '../util'

import createPage from './create-page'
export function createPageMixin () {
  return {
    created: function pageCreated () {
      createPage(this)
      callPageHook(this, 'onLoad', this.$route.query)
      callPageHook(this, 'onShow')
    }
  }
}
