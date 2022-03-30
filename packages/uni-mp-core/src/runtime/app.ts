import { extend, hasOwn, isFunction } from '@vue/shared'
import { ComponentPublicInstance, ComponentOptions, ref } from 'vue'

import { initBaseInstance } from './componentInstance'
import { initHooks, initUnknownHooks } from './componentHooks'

import App = WechatMiniprogram.App
import {
  ON_ERROR,
  ON_HIDE,
  ON_LAUNCH,
  ON_PAGE_NOT_FOUND,
  ON_SHOW,
  ON_THEME_CHANGE,
  ON_UNHANDLE_REJECTION,
  ON_SHARE_APP_MESSAGE,
} from '@dcloudio/uni-shared'

export interface CustomAppInstanceProperty extends Record<string, any> {
  globalData: Record<string, any>
  $vm?: ComponentPublicInstance
}

export type MiniProgramAppOptions = App.Options<CustomAppInstanceProperty>
export type MiniProgramAppInstance = App.Instance<CustomAppInstanceProperty>

const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
]

if (__PLATFORM__ === 'mp-alipay') {
  HOOKS.push(ON_SHARE_APP_MESSAGE)
}

export interface ParseAppOptions {
  parse: (appOptions: MiniProgramAppOptions) => void
}

export function parseApp(
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
      instance.$callHook(ON_LAUNCH, options)
    },
  }

  initLocale(instance)

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

export function initCreateSubpackageApp(parseAppOptions?: ParseAppOptions) {
  return function createApp(vm: ComponentPublicInstance) {
    const appOptions = parseApp(vm, parseAppOptions)
    const app = getApp({
      allowDefault: true,
    })
    ;(vm.$ as any).ctx.$scope = app
    const globalData = app.globalData
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name]
        }
      })
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name]
      }
    })
    initAppLifecycle(appOptions, vm)
  }
}

export function initAppLifecycle(
  appOptions: MiniProgramAppOptions,
  vm: ComponentPublicInstance
) {
  if (isFunction(appOptions.onShow) && __GLOBAL__.onAppShow) {
    __GLOBAL__.onAppShow((args: unknown) => {
      vm.$callHook('onShow', args)
    })
  }
  if (isFunction(appOptions.onHide) && __GLOBAL__.onAppHide) {
    __GLOBAL__.onAppHide((args: unknown) => {
      vm.$callHook('onHide', args)
    })
  }
  if (isFunction(appOptions.onLaunch)) {
    const args =
      __GLOBAL__.getLaunchOptionsSync && __GLOBAL__.getLaunchOptionsSync()
    vm.$callHook('onLaunch', args || {})
  }
}

function initLocale(appVm: ComponentPublicInstance) {
  const locale = ref<string>(
    __GLOBAL__.getSystemInfoSync().language || 'zh-Hans'
  )
  Object.defineProperty(appVm, '$locale', {
    get() {
      return locale.value
    },
    set(v) {
      locale.value = v
    },
  })
}
