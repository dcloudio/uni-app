import { ComponentPublicInstance } from 'vue'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
}

export function isApp(vm: ComponentPublicInstance) {
  // @dcloudio/vite-plugin-uni/src/configResolved/plugins/mainJs.ts
  return vm.$options.mpType === 'app'
}

export function initApp(vm: ComponentPublicInstance) {
  appVm = vm
  appVm.$vm = vm
  appVm.globalData = appVm.$options.globalData || {}
}
