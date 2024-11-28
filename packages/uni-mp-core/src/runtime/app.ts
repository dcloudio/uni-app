import { extend, hasOwn, isFunction } from '@vue/shared'
import {
  type ComponentOptions,
  type ComponentPublicInstance,
  injectHook,
  ref,
} from 'vue'

import { initBaseInstance } from './componentInstance'
import { initHooks, initUnknownHooks } from './componentHooks'
import { LOCALE_EN, normalizeLocale } from '@dcloudio/uni-i18n'

import App = WechatMiniprogram.App
import {
  ON_ERROR,
  ON_HIDE,
  ON_LAUNCH,
  ON_PAGE_NOT_FOUND,
  ON_SHOW,
  ON_THEME_CHANGE,
  ON_UNHANDLE_REJECTION,
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

export interface ParseAppOptions {
  parse: (appOptions: MiniProgramAppOptions) => void
}

export function parseApp(
  instance: ComponentPublicInstance,
  parseAppOptions?: ParseAppOptions
) {
  const internalInstance = instance.$

  if (__VUE_PROD_DEVTOOLS__) {
    // 定制 App 的 $children
    Object.defineProperty((internalInstance as any).ctx, '$children', {
      get() {
        return getCurrentPages().map((page) => page.$vm)
      },
    })
  }

  const appOptions: MiniProgramAppOptions = {
    globalData: (instance.$options && instance.$options.globalData) || {},
    $vm: instance, // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options: App.LaunchShowOption) {
      this.$vm = instance // 飞书小程序可能会把 AppOptions 序列化，导致 $vm 对象部分属性丢失
      if (__X__) {
        this.vm = this.$vm
      }
      const ctx = (internalInstance as any).ctx as Record<string, any>
      if (this.$vm && ctx.$scope && ctx.$callHook) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        // $scope值在微信小程序混合分包情况下存在，额外用$callHook兼容判断处理
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

  const onErrorHandlers = __GLOBAL__.$onErrorHandlers
  if (onErrorHandlers) {
    onErrorHandlers.forEach((fn: Function) => {
      injectHook(ON_ERROR, fn, internalInstance)
    })
    onErrorHandlers.length = 0
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
    const app =
      isFunction(getApp) &&
      getApp({
        allowDefault: true,
      })
    if (!app) return
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
    if (process.env.UNI_SUBPACKAGE) {
      ;(__GLOBAL__.$subpackages || (__GLOBAL__.$subpackages = {}))[
        process.env.UNI_SUBPACKAGE
      ] = {
        $vm: vm,
      }
    }
  }
}

export function initAppLifecycle(
  appOptions: MiniProgramAppOptions,
  vm: ComponentPublicInstance
) {
  if (isFunction(appOptions.onLaunch)) {
    const args =
      __GLOBAL__.getLaunchOptionsSync && __GLOBAL__.getLaunchOptionsSync()
    appOptions.onLaunch(args)
  }
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
}

function initLocale(appVm: ComponentPublicInstance) {
  const locale = ref<string>(
    normalizeLocale(__GLOBAL__.getSystemInfoSync().language) || LOCALE_EN
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
