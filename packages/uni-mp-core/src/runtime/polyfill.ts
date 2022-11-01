import { customizeEvent, ON_LOAD } from '@dcloudio/uni-shared'
import { MPComponentInstance } from './component'
import { initPropsObserver } from './componentOptions'
import { initProps } from './componentProps'

const MPPage = Page
const MPComponent = Component

function initTriggerEvent(mpInstance: MPComponentInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent
  mpInstance.triggerEvent = function (event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args])
  }
}

function initMiniProgramHook(
  name: 'onLoad' | 'created',
  options: Record<string, any>,
  isComponent?: boolean
) {
  if (
    (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') &&
    isComponent
  ) {
    // fix by Lxh 字节自定义组件Component构造器文档上写有created，但是实测只触发了lifetimes上的created
    options = options.lifetimes || {}
  }
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
  initMiniProgramHook(ON_LOAD, options)
  return MPPage(options)
}
if (__PLATFORM__ === 'mp-baidu') {
  // 补充after，否则百度报：Cannot read property 'historyStack' of undefined
  // https://smartprogram.baidu.com/forum/topic/show/153894
  ;(Page as any).after = (MPPage as any).after
}
Component = function (options) {
  initMiniProgramHook('created', options, true)
  // 小程序组件
  const isVueComponent = options.properties && options.properties.uP
  if (!isVueComponent) {
    initProps(options)
    initPropsObserver(options)
  }
  return MPComponent(options)
}
