export {
  isFunction,
  isString,
  isPlainObject,
  hasOwn,
  extend,
  isArray,
} from '@vue/shared'

// export * from './helpers/api'
export {
  defineAsyncApi,
  defineSyncApi,
  defineTaskApi,
  defineOnApi,
  defineOffApi,
} from '@dcloudio/uni-api'
export { Emitter } from '@dcloudio/uni-shared'
export { getRealPath } from '@dcloudio/uni-platform'
export {
  getCurrentPage,
  getCurrentPageId,
  getCurrentPageMeta,
  getCurrentPageVm,
  getPageIdByVm,
} from '@dcloudio/uni-core'
export const __uniConfig = globalThis.__uniConfig
