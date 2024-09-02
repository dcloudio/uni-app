import type { ComponentPublicInstance } from 'vue'
import AsyncLoadingComponent from '../components/async-loading'
import AsyncErrorComponent from '../components/async-error'
import {
  defineGlobalData,
  initAppVm,
  initService,
  initView,
} from '@dcloudio/uni-core'
import { UniEventBus } from '@dcloudio/uni-api'
import type { EventBus } from '@dcloudio/uni-app-x/types/uni'

let appVm: ComponentPublicInstance
// @ts-expect-error
let $uniApp: UniApp
if (__X__) {
  class UniApp implements EventBus {
    private $eventBus = new UniEventBus()
    on = (eventName: string, callback: Function) => {
      this.$eventBus.on(eventName, callback)
    }
    once = (eventName: string, callback: Function) => {
      this.$eventBus.once(eventName, callback)
    }
    off = (eventName?: string, callback?: Function | null) => {
      this.$eventBus.off(eventName, callback)
    }
    emit = (eventName: string, ...args: any[]) => {
      this.$eventBus.emit(eventName, ...args)
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
