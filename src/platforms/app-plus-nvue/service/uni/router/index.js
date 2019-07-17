import initNavigateTo from './navigate-to'
import initRedirectTo from './redirect-to'
import initNavigateBack from './navigate-back'
import initSwitchTab from './switch-tab'
import initReLaunch from './re-launch'

function initRouter (instanceContext) {
  return {
    navigateTo: initNavigateTo(instanceContext),
    redirectTo: initRedirectTo(instanceContext),
    navigateBack: initNavigateBack(instanceContext),
    switchTab: initSwitchTab(instanceContext),
    reLaunch: initReLaunch(instanceContext)
  }
}

export default class Router {
  constructor (instanceContext) {
    this.router = initRouter(instanceContext)
  }

  push ({
    type,
    path,
    animationType,
    animationDuration
  } = {}) {
    this.router[type](path, {
      animationType,
      animationDuration
    })
  }

  go (delta, {
    animationType,
    animationDuration
  } = {}) {
    delta = Math.abs(parseInt(delta) || 1)
    this.router.navigateBack(delta, {
      animationType,
      animationDuration
    })
  }
}
