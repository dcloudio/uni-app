import type { ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'

export interface LaunchOptions {
  path: string
  query: Record<string, any>
  scene: number
  referrerInfo: { appId: string; extraData: Record<string, any> }
  appScheme?: string
  appLink?: string
}

export function createLaunchOptions() {
  return {
    path: '',
    query: {},
    scene: 1001,
    referrerInfo: {
      appId: '',
      extraData: {},
    },
  }
}

export function defineGlobalData(
  app: ComponentPublicInstance,
  defaultGlobalData?: Record<string, unknown>
) {
  const options = app.$options || {}
  options.globalData = extend(options.globalData || {}, defaultGlobalData)
  Object.defineProperty(app, 'globalData', {
    get() {
      return options.globalData
    },
    set(newGlobalData) {
      options.globalData = newGlobalData
    },
  })
}
