declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $scope: WechatMiniprogram.App.Instance<any>
    globalData: Record<string, any>
    $callHook: (hook: string, args?: unknown) => unknown
    $callSyncHook: (hook: 'created') => void
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
  initUnknownHooks
} from './runtime/componentHooks'
export { initMocks, initComponentInstance } from './runtime/componentInstance'
export { handleEvent } from './runtime/componentEvents'
export { $createComponent, $destroyComponent } from './runtime/component'
export {
  initVueIds,
  initRefs,
  initWxsCallMethods,
  findVmByVueId
} from './runtime/util'

// protocols
export {
  addSafeAreaInsets,
  previewImage,
  getSystemInfo,
  getSystemInfoSync
} from './api/protocols'
// types
export { MiniProgramAppOptions, MiniProgramAppInstance } from './runtime/app'
export {
  RelationOptions,
  MPComponentOptions,
  MPComponentInstance,
  CreateLifetimesOptions
} from './runtime/component'
export { MPProtocols } from './api/protocols'
// mp-alipay
export { CreateComponentOptions } from './runtime/componentInstance'
