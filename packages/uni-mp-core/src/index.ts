declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vm: ComponentPublicInstance
    globalData: Record<string, any>
    $callHook: (hook: string, args?: unknown, extras?: unknown) => unknown
    $callCreatedHook: () => void
  }
}

export { initCreateApp, initCreateSubpackageApp } from './runtime/app'
export { initCreatePage } from './runtime/page'
export { initCreateComponent } from './runtime/component'
export { initCreatePluginApp } from './runtime/plugin'
export { findPropsData } from './runtime/componentProps'
export { fixSetDataEnd, fixSetDataStart } from './runtime/fixSetData'

export { initUni } from './api/index'
export { initGetProvider } from './api/shims'

// mp-alipay
export {
  initData,
  initBehaviors,
  updateComponentProps,
} from './runtime/componentOptions'
export { initProps, initFormField } from './runtime/componentProps'
export {
  initHooks,
  initUnknownHooks,
  initRuntimeHooks,
  PAGE_INIT_HOOKS,
} from './runtime/componentHooks'
export { initMocks, initComponentInstance } from './runtime/componentInstance'
export { $createComponent, $destroyComponent } from './runtime/component'
export {
  initRefs,
  initVueIds,
  initWxsCallMethods,
  findVmByVueId,
  handleEvent,
  fixProperties,
  nextSetDataTick,
  initSetRef,
} from './runtime/util'

// protocols
export {
  redirectTo,
  navigateTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  addSafeAreaInsets,
  useDeviceId,
  populateParameters,
  showActionSheet,
  getDeviceInfo,
  getAppBaseInfo,
  getWindowInfo,
  getAppAuthorizeSetting,
} from './api/protocols'
// types
export { MiniProgramAppOptions, MiniProgramAppInstance } from './runtime/app'
export {
  RelationOptions,
  MPComponentOptions,
  MPComponentInstance,
  CreateLifetimesOptions,
} from './runtime/component'
export { MPProtocols, MPProtocol } from './api/protocols'
// mp-alipay
export { CreateComponentOptions } from './runtime/componentInstance'
