import {
  parseQuery
} from 'uni-shared'

import {
  showWebview
} from './util'

import {
  setStatusBarStyle
} from '../../bridge'

export function redirectTo ({
  url
}) {
  const urls = url.split('?')
  const path = urls[0]

  const query = parseQuery(urls[1] || '')

  const pages = getCurrentPages()
  const lastPage = pages[pages.length - 1]

  lastPage && lastPage.$remove()

  showWebview(
    __registerPage({
      path,
      query,
      openType: 'redirect'
    }),
    'none',
    0,
    () => {
      lastPage && lastPage.$getAppWebview().close('none')
    }
  )

  setStatusBarStyle()
}
