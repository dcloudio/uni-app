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
export { encode } from '@dcloudio/uni-api/src/helpers/base64-arraybuffer'
export { Emitter, resolveComponentInstance } from '@dcloudio/uni-shared'
export {
  getRealPath,
  requestComponentInfo,
  addIntersectionObserver,
  removeIntersectionObserver,
} from '@dcloudio/uni-platform'
export {
  getCurrentPage,
  getCurrentPageId,
  getCurrentPageMeta,
  getCurrentPageVm,
  getPageIdByVm,
} from '@dcloudio/uni-core'
export const __uniConfig = globalThis.__uniConfig
