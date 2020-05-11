import {
  parseQuery
} from 'uni-shared'

import {
  parseUri
} from './util'

import router from '@system.router'

export function redirectTo ({
  url
}) {
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  router.replace({
    uri: parseUri(path),
    params: query
  })
  return {
    errMsg: 'redirectTo:ok'
  }
}
