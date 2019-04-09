import {
  cached,
  camelize
} from 'uni-shared'

const WXPage = Page
const WXComponent = Component

const customizeRE = /:/g

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
})

function initTriggerEvent (mpInstance) {
  if (wx.canIUse('nextTick')) { // 微信旧版本基础库不支持重写triggerEvent
    const oldTriggerEvent = mpInstance.triggerEvent
    mpInstance.triggerEvent = function (event, ...args) {
      return oldTriggerEvent.apply(mpInstance, [customize(event), ...args])
    }
  }
}

Page = function (options = {}) {
  const name = 'onLoad'
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
  return WXPage(options)
}

const behavior = Behavior({
  created () {
    initTriggerEvent(this)
  }
})

Component = function (options = {}) {
  (options.behaviors || (options.behaviors = [])).unshift(behavior)
  return WXComponent(options)
}
