import navigateBack from './navigate-back'
import navigateTo from './navigate-to'
import reLaunch from './re-launch'
import redirectTo from './redirect-to'
import switchTab from './switch-tab'

const route = {
  navigateBack,
  navigateTo,
  reLaunch,
  redirectTo,
  switchTab
}

export default class Router {
  constructor (instanceContext) {
    this.instanceContext = instanceContext
    this.$emit = instanceContext.UniServiceJSBridge.emit
  }

  push ({
    type,
    path,
    animationType,
    animationDuration
  } = {}) {
    this.$emit('onAppRoute', {
      type,
      path
    })

    route[type]({
      path,
      animationType,
      animationDuration
    }, this.instanceContext)
  }

  go (delta, {
    animationType,
    animationDuration
  } = {}) {
    delta = Math.abs(parseInt(delta) || 1)
    route.navigateBack({
      delta,
      animationType,
      animationDuration
    }, this.instanceContext, () => {
      this.$emit('onAppRoute', {
        type: 'navigateBack'
      })
    })
  }
}
