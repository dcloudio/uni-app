import {
  cached,
  camelize
} from 'uni-shared'
import { markMPComponent } from './wrapper/util'

const MPPage = Page
const MPComponent = Component

const customizeRE = /:/g

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
})

function initTriggerEvent (mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent
  const newTriggerEvent = function (event, ...args) {
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || (this.dataset && this.dataset.comType)) {
      event = customize(event)
    } else if (__PLATFORM__ === 'mp-weixin' || __PLATFORM__ === 'mp-qq') {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      const newEvent = customize(event)
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent, ...args])
      }
    }
    return oldTriggerEvent.apply(this, [event, ...args])
  }
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent
  }
}

function initHook (name, options, isComponent) {
  if (__PLATFORM__ === 'mp-toutiao') {
    // fix by Lxh 字节自定义组件Component构造器文档上写有created，但是实测只触发了lifetimes上的created
    isComponent && options.lifetimes && options.lifetimes[name] && (options = options.lifetimes)
  }
  const oldHook = options[name]
  options[name] = function (...args) {
    markMPComponent(this)
    initTriggerEvent(this)
    if (oldHook) {
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
    initHook('created', options, true)
    return MPComponent(options)
  }
}
