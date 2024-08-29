import type { ComponentPublicInstance } from 'vue'
import AsyncLoadingComponent from '../components/async-loading'
import AsyncErrorComponent from '../components/async-error'
import {
  defineGlobalData,
  initAppVm,
  initService,
  initView,
} from '@dcloudio/uni-core'
import {
  type EmitterEmit,
  type EmitterOff,
  type EmitterOn,
  type EmitterOnce,
  EventBus,
} from '@dcloudio/uni-api'

let appVm: ComponentPublicInstance
let $uniApp: UniApp
if (__X__) {
  class UniApp {
    on: EmitterOn
    once: EmitterOnce
    off: EmitterOff
    emit: EmitterEmit
    constructor() {
      const eventBus = new EventBus()
      this.on = (eventName: string, callback: (result: any) => void) => {
        eventBus.$on(eventName, callback)
      }
      this.once = (eventName: string, callback: (result: any) => void) => {
        eventBus.$once(eventName, callback)
      }
      this.off = (
        eventName?: string | string[],
        callback?: (result: any) => void
      ) => {
        eventBus.$off(eventName, callback)
      }
      this.emit = (eventName: string, ...args: any[]) => {
        eventBus.$emit(eventName, ...args)
      }
    }

    get vm() {
      return appVm
    }
    get $vm() {
      return appVm
    }
    get globalData() {
      return appVm?.globalData || {}
    }
  }
  // @ts-expect-error
  $uniApp = new UniApp()
}

export function getApp() {
  if (__X__) {
    return $uniApp
  } else {
    return appVm
  }
}

export function initApp(vm: ComponentPublicInstance) {
  appVm = vm

  // 定制 App 的 $children 为 devtools 服务 __VUE_PROD_DEVTOOLS__
  Object.defineProperty((appVm.$ as any).ctx, '$children', {
    get() {
      return getCurrentPages().map((page) => page.$vm)
    },
  })

  const app = appVm.$.appContext.app
  if (!app.component(AsyncLoadingComponent.name!)) {
    app.component(AsyncLoadingComponent.name!, AsyncLoadingComponent)
  }
  if (!app.component(AsyncErrorComponent.name!)) {
    app.component(AsyncErrorComponent.name!, AsyncErrorComponent)
  }
  initAppVm(appVm)
  defineGlobalData(appVm)
  initService()
  initView()
}
