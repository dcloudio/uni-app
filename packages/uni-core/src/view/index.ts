export {
  ViewJSBridge,
  subscribeViewMethod,
  unsubscribeViewMethod,
  registerViewMethod,
  unregisterViewMethod,
} from './bridge'
export { initView } from './init'
export { initViewPlugin } from './plugin'
//#if _X_VAPOR_
export { normalizeVaporNativeEvent } from './plugin/componentInstance-vapor'
//#endif
export {
  createNativeEvent,
  $nne as normalizeNativeEvent,
} from './plugin/componentInstance'
export {
  WxsElement,
  ComponentDescriptor,
  ComponentDescriptorVm,
  getComponentDescriptor,
  createComponentDescriptorVm,
} from './plugin/componentWxs'
