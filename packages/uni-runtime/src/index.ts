export {
  isFunction,
  isString,
  isPlainObject,
  hasOwn,
  extend,
  isArray,
} from '@vue/shared'

// export * from './helpers/api'
export { defineAsyncApi } from '@dcloudio/uni-api'
export { Emitter } from '@dcloudio/uni-shared'
export { getRealPath } from '@dcloudio/uni-platform'
export const __uniConfig = globalThis.__uniConfig
