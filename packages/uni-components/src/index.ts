// #if _X_
export * from './vue/index-x'
// #else
// @ts-expect-error
export * from './vue/index'
// #endif

export { useOn, useSubscribe } from './helpers/useSubscribe'
export { useContextInfo, getContextInfo } from './helpers/useContextInfo'
export {
  withWebEvent,
  useCustomEvent,
  useNativeEvent,
} from './helpers/useEvent'
export type {
  CustomEventTrigger,
  NativeEventTrigger,
  EmitEvent,
} from './helpers/useEvent'
export * from './helpers/scroller'
export { parseText } from './helpers/text'
export {
  useUserAction,
  addInteractListener,
  getInteractStatus,
} from './helpers/useUserAction'
export { useAttrs } from './helpers/useAttrs'
export { useBooleanAttr } from './helpers/useBooleanAttr'
export { useTouchtrack } from './helpers/useTouchtrack'
export {
  defineBuiltInComponent,
  defineSystemComponent,
  defineUnsupportedComponent,
} from './helpers/component'
export { flatVNode } from './helpers/flatVNode'
export { uniFormKey } from './vue/form'
export type { UniFormCtx } from './vue/form'
export type { DecodeOptions } from './helpers/text'
export { useRebuild } from './helpers/useRebuild'
export { default as animation } from './helpers/animation'
export { UniElement } from './helpers/UniElement'
