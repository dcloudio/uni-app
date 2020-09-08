import {
  parseQuery
} from 'uni-shared'
import {
  initEventChannel
} from 'uni-helpers/navigate-to'

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

function _navigateTo ({
  url,
  path,
  query,
  events,
  animationType,
  animationDuration
}, callbackId) {
  UniServiceJSBridge.emit('onAppRoute', {
    type: 'navigateTo',
    path
  })

  const eventChannel = initEventChannel(events, false)
  showWebview(
    registerPage({
      url,
      path,
      query,
      openType: 'navigate',
      eventChannel
    }),
    animationType,
    animationDuration,
    () => {
      invoke(callbackId, {
        errMsg: 'navigateTo:ok',
        eventChannel
      })
    }
  )
  setStatusBarStyle()
}

export function navigateTo ({
  url,
  events,
  openType,
  animationType,
  animationDuration
}, callbackId) {
  const urls = url.split('?')
  const path = urls[0]
  const routeStyles = __uniRoutes.find(route => route.path === path).window
  const globalStyle = __uniConfig.window || {}
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
      events,
      animationType,
      animationDuration
    }, callbackId)
  }, openType === 'appLaunch')
}
