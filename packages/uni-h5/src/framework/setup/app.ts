import { ComponentPublicInstance } from 'vue'
import { initAppVm, initService, initView } from '@dcloudio/uni-core'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
}

export function initApp(vm: ComponentPublicInstance) {
  appVm = vm
  initAppVm(appVm)
  appVm.globalData = appVm.$options.globalData || {}
  initService()
  initView()
}
