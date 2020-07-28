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
  mpInstance.triggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customize(event), ...args])
  }
}

function initHook(name: 'onLoad' | 'created', options: Record<string, any>) {
  const oldHook = options[name]
  if (!oldHook) {
    options[name] = function(this: MPComponentInstance) {
      initTriggerEvent(this)
    }
  } else {
    options[name] = function(this: MPComponentInstance, ...args: any[]) {
      initTriggerEvent(this)
      return oldHook.apply(this, args)
    }
  }
}

Page = function(options) {
  initHook('onLoad', options)
  return MPPage(options)
}

Component = function(options) {
  initHook('created', options)
  return MPComponent(options)
}
