import {
  parseQuery
} from 'uni-shared'

import {
  showWebview
} from './util'

import {
  setStatusBarStyle
} from '../../bridge'

export function navigateTo ({
  url,
  animationType,
  animationDuration
}) {
  const urls = url.split('?')
  const path = urls[0]

  const query = parseQuery(urls[1] || '')

  UniServiceJSBridge.emit('onAppRoute', {
    type: 'navigateTo',
    path
  })

  showWebview(
    __registerPage({
      path,
      query,
      openType: 'navigate'
    }),
    animationType,
    animationDuration
  )

  setStatusBarStyle()
}
