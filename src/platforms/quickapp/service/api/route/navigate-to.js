import {
  parseQuery
} from 'uni-shared'

import {
  parseUri
} from './util'

import router from '@system.router'

export function navigateTo ({
  url
}) {
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  router.push({
    uri: parseUri(path),
    params: query
  })
  return {
    errMsg: 'navigateTo:ok'
  }
}
