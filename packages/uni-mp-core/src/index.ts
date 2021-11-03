declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vm: ComponentPublicInstance
    globalData: Record<string, any>
    $callHook: (hook: string, args?: unknown) => unknown
    $callCreatedHook: () => void
  }
}

export { initCreateApp } from './runtime/app'
export { initCreatePage } from './runtime/page'
export { initCreateComponent } from './runtime/component'

export { initUni } from './api/index'
export { initGetProvider } from './api/shims'

// mp-alipay
export { initData, initBehaviors } from './runtime/componentOptions'
export { initProps } from './runtime/componentProps'
export {
  PAGE_HOOKS,
  initHooks,
  initUnknownHooks,
} from './runtime/componentHooks'
export { initMocks, initComponentInstance } from './runtime/componentInstance'
export { $createComponent, $destroyComponent } from './runtime/component'
export {
  initRefs,
  initVueIds,
  initWxsCallMethods,
  findVmByVueId,
  handleEvent,
} from './runtime/util'

// protocols
export {
  redirectTo,
  navigateTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  addSafeAreaInsets,
} from './api/protocols'
// types
export { MiniProgramAppOptions, MiniProgramAppInstance } from './runtime/app'
export {
  RelationOptions,
  MPComponentOptions,
  MPComponentInstance,
  CreateLifetimesOptions,
} from './runtime/component'
export { MPProtocols } from './api/protocols'
// mp-alipay
export { CreateComponentOptions } from './runtime/componentInstance'
