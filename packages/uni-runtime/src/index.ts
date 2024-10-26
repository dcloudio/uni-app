export {
  isFunction,
  isString,
  isPlainObject,
  hasOwn,
  extend,
  isArray,
} from '@vue/shared'
export type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
export * from './utils/index'
export {
  defineAsyncApi,
  defineSyncApi,
  defineTaskApi,
  defineOnApi,
  defineOffApi,
} from '@dcloudio/uni-api'
export {
  Emitter,
  resolveComponentInstance,
  //#if _X_
  isSystemActionSheetDialogPage,
  //#endif
} from '@dcloudio/uni-shared'
export {
  getRealPath,
  requestComponentInfo,
  addIntersectionObserver,
  removeIntersectionObserver,
  //#if _X_
  registerSystemRoute,
  //#endif
} from '@dcloudio/uni-platform'
export {
  getCurrentPage,
  getCurrentPageId,
  getCurrentPageMeta,
  getCurrentPageVm,
  getPageIdByVm,
} from '@dcloudio/uni-core'
export const __uniConfig = globalThis.__uniConfig
