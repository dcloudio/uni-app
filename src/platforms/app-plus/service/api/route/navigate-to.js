import {
  parseQuery
} from 'uni-shared'

import {
  showWebview
} from './util'

import {
  setStatusBarStyle,
  invoke
} from '../../bridge'

import {
  registerPage
} from '../../framework/page'

import {
  navigate
} from '../../framework/navigator'

function _navigateTo ({
  path,
  query,
  animationType,
  animationDuration
}, callbackId) {
  UniServiceJSBridge.emit('onAppRoute', {
    type: 'navigateTo',
    path
  })

  showWebview(
    registerPage({
      path,
      query,
      openType: 'navigate'
    }),
    animationType,
    animationDuration,
    () => {
      invoke(callbackId, {
        errMsg: 'navigateTo:ok'
      })
    }
  )
  setStatusBarStyle()
}

export function navigateTo ({
  url,
  animationType,
  animationDuration
}) {
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  navigate(path, function () {
    _navigateTo({
      path,
      query,
      animationType,
      animationDuration
    })
  })
}
