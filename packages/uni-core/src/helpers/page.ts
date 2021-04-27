import { ComponentPublicInstance, getCurrentInstance } from 'vue'

export function useCurrentPageId() {
  return getCurrentInstance()!.root.proxy!.$page.id
}

export function getPageIdByVm(vm: ComponentPublicInstance) {
  if (!vm.$) {
    return
  }
  const rootProxy = vm.$.root.proxy
  if (rootProxy && rootProxy.$page) {
    return rootProxy.$page.id
  }
}
