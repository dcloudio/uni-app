import { registerRuntimeHelpers } from '@vue/compiler-core'
export const IS_TRUE = Symbol(`isTrue`)
export const V_SHOW = Symbol(`vShow`)

registerRuntimeHelpers({
  [IS_TRUE]: 'isTrue',
  [V_SHOW]: 'vShow',
})
