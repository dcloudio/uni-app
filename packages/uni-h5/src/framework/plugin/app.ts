import { ComponentPublicInstance } from 'vue'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
}

export function initApp(vm: ComponentPublicInstance) {
  appVm = vm
  appVm.$vm = vm
  appVm.globalData = appVm.$options.globalData || {}
}
