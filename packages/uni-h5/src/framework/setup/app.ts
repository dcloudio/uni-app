import { ComponentPublicInstance } from 'vue'
import { initService, initView } from '@dcloudio/uni-core'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
}

export function initApp(vm: ComponentPublicInstance) {
  appVm = vm
  appVm.$vm = vm
  appVm.globalData = appVm.$options.globalData || {}
  initService()
  initView()
}
