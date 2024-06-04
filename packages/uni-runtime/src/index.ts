import '@dcloudio/uni-uts-v1/lib/javascript/lib/runtime/uts.js'
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
// @ts-expect-error TODO 处理类型冲突
export const UniError = globalThis.UniError
// @ts-expect-error TODO 处理类型冲突
export const UTSJSONObject = globalThis.UTSJSONObject
