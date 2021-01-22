import { extend } from '@vue/shared'
import { ComponentPublicInstance, ComponentOptions } from 'vue'

import { initBaseInstance } from './componentInstance'
import { initHooks, initUnknownHooks } from './componentHooks'

import App = WechatMiniprogram.App
export interface CustomAppInstanceProperty extends Record<string, any> {
  globalData: Record<string, any>
  $vm?: ComponentPublicInstance
}

export type MiniProgramAppOptions = App.Options<CustomAppInstanceProperty>
export type MiniProgramAppInstance = App.Instance<CustomAppInstanceProperty>

const HOOKS = [
  'onShow',
  'onHide',
  'onError',
  'onThemeChange',
  'onPageNotFound',
  'onUnhandledRejection',
]

export interface ParseAppOptions {
  parse: (appOptions: MiniProgramAppOptions) => void
}

function parseApp(
  instance: ComponentPublicInstance,
  parseAppOptions?: ParseAppOptions
) {
  const internalInstance = instance.$
  const appOptions: MiniProgramAppOptions = {
    globalData: (instance.$options && instance.$options.globalData) || {},
    $vm: instance, // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options: App.LaunchShowOption) {
      const ctx = (internalInstance as any).ctx as Record<string, any>
      if (this.$vm && ctx.$scope) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return
      }

      initBaseInstance(internalInstance, {
        mpType: 'app',
        mpInstance: this,
        slots: [],
      })

      ctx.globalData = this.globalData
      instance.$callHook('onLaunch', options)
    },
  }

  const vueOptions = instance.$.type as ComponentOptions

  initHooks(appOptions, HOOKS)
  initUnknownHooks(appOptions, vueOptions)

  if (__VUE_OPTIONS_API__) {
    const methods = vueOptions.methods
    methods && extend(appOptions, methods)
  }

  if (parseAppOptions) {
    parseAppOptions.parse(appOptions)
  }

  return appOptions
}

export function initCreateApp(parseAppOptions?: ParseAppOptions) {
  return function createApp(vm: ComponentPublicInstance) {
    return App(parseApp(vm, parseAppOptions))
  }
}
