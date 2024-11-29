import { ON_LOAD, customizeEvent } from '@dcloudio/uni-shared'
import type { MPComponentInstance } from './component'
import { initPropsObserver } from './componentOptions'
import { initProps } from './componentProps'
import { wrapTriggerEventArgs } from './util'

const MPPage = Page
const MPComponent = Component

function initTriggerEvent(mpInstance: MPComponentInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent
  const newTriggerEvent = function (event: string, ...args: any[]) {
    if (__PLATFORM__ === 'mp-harmony' || __PLATFORM__ === 'quickapp-webview') {
      if (event !== '__l' && event !== '__e') {
        // 忽略 handleLink，还有其他内置事件吗？
        // triggerEvent的参数被序列化，导致vue的响应式数据对比始终不相等，从而陷入死循环
        // 比如 uni-ui 的 collapse 组件的v-model
        args = wrapTriggerEventArgs(args[0], args[1])
      }
    }
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args,
    ] as any)
  }
  // 京东小程序triggerEvent为只读属性
  try {
    mpInstance.triggerEvent = newTriggerEvent
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent
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

declare let Component: WechatMiniprogram.Component.Constructor

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
