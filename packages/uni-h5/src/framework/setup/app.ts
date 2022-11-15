import { ComponentPublicInstance } from 'vue'
import AsyncLoadingComponent from '../components/async-loading'
import AsyncErrorComponent from '../components/async-error'
import {
  initAppVm,
  initService,
  initView,
  defineGlobalData,
} from '@dcloudio/uni-core'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
}

export function initApp(vm: ComponentPublicInstance) {
  appVm = vm
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
