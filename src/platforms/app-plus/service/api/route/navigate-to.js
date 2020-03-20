import {
  parseQuery
} from 'uni-shared'

import {
  ANI_SHOW,
  ANI_DURATION
} from '../../constants'

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

let isNavigating = false

function _navigateTo ({
  url,
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
      url,
      path,
      query,
      openType: 'navigate'
    }),
    animationType,
    animationDuration,
    () => {
      isNavigating = false
      invoke(callbackId, {
        errMsg: 'navigateTo:ok'
      })
    }
  )
  setStatusBarStyle()
}

export function navigateTo ({
  url,
  openType,
  animationType,
  animationDuration
}, callbackId) {
  if(isNavigating) {
    return
  }
  isNavigating = true
  const urls = url.split('?')
  const path = urls[0]
  const routeStyles = __uniRoutes.find(route => route.path === path).window
  const globalStyle = __uniConfig.window
  if (!animationType) {
    animationType = routeStyles.animationType || globalStyle.animationType || ANI_SHOW
  }
  if (!animationDuration) {
    animationDuration = routeStyles.animationDuration || globalStyle.animationDuration || ANI_DURATION
  }
  const query = parseQuery(urls[1] || '')
  navigate(path, function () {
    _navigateTo({
      url,
      path,
      query,
      animationType,
      animationDuration
    }, callbackId)
  }, openType === 'appLaunch')
}
