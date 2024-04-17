import type { ComponentPublicInstance } from 'vue'
import AsyncLoadingComponent from '../components/async-loading'
import AsyncErrorComponent from '../components/async-error'
import {
  defineGlobalData,
  initAppVm,
  initService,
  initView,
} from '@dcloudio/uni-core'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
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
  if (!app.component(AsyncLoadingComponent.name)) {
    app.component(AsyncLoadingComponent.name, AsyncLoadingComponent)
  }
  if (!app.component(AsyncErrorComponent.name)) {
    app.component(AsyncErrorComponent.name, AsyncErrorComponent)
  }
  initAppVm(appVm)
  defineGlobalData(appVm)
  initService()
  initView()
}
