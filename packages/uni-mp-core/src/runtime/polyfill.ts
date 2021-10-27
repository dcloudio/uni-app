import { ON_LOAD } from '@dcloudio/uni-shared'
import { camelize } from '@vue/shared'
import { MPComponentInstance } from './component'

const MPPage = Page
const MPComponent = Component

const customizeRE = /:/g

function customize(str: string) {
  return camelize(str.replace(customizeRE, '-'))
}

function initTriggerEvent(mpInstance: MPComponentInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent
  mpInstance.triggerEvent = function (event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customize(event), ...args])
  }
}

function initHook(name: 'onLoad' | 'created', options: Record<string, any>) {
  const oldHook = options[name]
  if (!oldHook) {
    options[name] = function (this: MPComponentInstance) {
      initTriggerEvent(this)
    }
  } else {
    options[name] = function (this: MPComponentInstance, ...args: any[]) {
      initTriggerEvent(this)
      return oldHook.apply(this, args)
    }
  }
}

Page = function (options) {
  initHook(ON_LOAD, options)
  return MPPage(options)
}
if (__PLATFORM__ === 'mp-baidu') {
  // 补充after，否则百度报：Cannot read property 'historyStack' of undefined
  // https://smartprogram.baidu.com/forum/topic/show/153894
  ;(Page as any).after = (MPPage as any).after
}
Component = function (options) {
  initHook('created', options)
  return MPComponent(options)
}
