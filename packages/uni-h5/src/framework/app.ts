import { App, ComponentPublicInstance } from 'vue'

let appVm: ComponentPublicInstance

export function getApp() {
  return appVm
}

export function getCurrentPages() {
  return []
}

let id = 1
export function createPageState(
  type: 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'
) {
  return {
    __id__: id++,
    __type__: type,
  }
}

export function initAppMount(app: App) {
  const oldMount = app.mount
  app.mount = function mount(
    rootContainer: any,
    isHydrate?: boolean | undefined
  ) {
    return (appVm = oldMount.call(app, rootContainer, isHydrate))
  }
}
