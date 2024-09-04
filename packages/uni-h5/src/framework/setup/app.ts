import type { ComponentPublicInstance } from 'vue'
import AsyncLoadingComponent from '../components/async-loading'
import AsyncErrorComponent from '../components/async-error'
import {
  defineGlobalData,
  initAppVm,
  initService,
  initView,
} from '@dcloudio/uni-core'
import { EventBus } from '@dcloudio/uni-api'
import type { UniApp } from '@dcloudio/uni-app-x/types/app'

let appVm: ComponentPublicInstance
let $uniApp: UniApp
if (__X__) {
  class UniAppImpl extends EventBus implements UniApp {
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
  $uniApp = new UniAppImpl()
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
