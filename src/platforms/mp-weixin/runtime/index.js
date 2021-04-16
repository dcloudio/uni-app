import {
  cached,
  camelize
} from 'uni-shared'

const MPPage = Page
const MPComponent = Component

const customizeRE = /:/g

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
})

function initTriggerEvent (mpInstance) {
  if (__PLATFORM__ === 'mp-weixin' || __PLATFORM__ === 'app-plus') {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return
    }
  }
  const oldTriggerEvent = mpInstance.triggerEvent
  mpInstance.triggerEvent = function (event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customize(event), ...args])
  }
}

function initHook (name, options) {
  const oldHook = options[name]
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this)
    }
  } else {
    options[name] = function (...args) {
      initTriggerEvent(this)
      return oldHook.apply(this, args)
    }
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true
  Page = function (options = {}) {
    initHook('onLoad', options)
    return MPPage(options)
  }
  Page.after = MPPage.after

  Component = function (options = {}) {
    initHook('created', options)
    return MPComponent(options)
  }
}
