export {
  ViewJSBridge,
  subscribeViewMethod,
  unsubscribeViewMethod,
  registerViewMethod,
  unregisterViewMethod,
} from './bridge'
export { initView } from './init'
export { initViewPlugin } from './plugin'
export {
  createNativeEvent,
  $nne as normalizeNativeEvent,
} from './plugin/componentInstance'
export type { WxsElement, ComponentDescriptorVm } from './plugin/componentWxs'
export {
  ComponentDescriptor,
  getComponentDescriptor,
  createComponentDescriptorVm,
} from './plugin/componentWxs'
