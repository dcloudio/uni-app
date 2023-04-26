import { registerRuntimeHelpers } from '@vue/compiler-core'
export const IS_TRUE = Symbol(`isTrue`)
export const V_SHOW = Symbol(`vShow`)
export const RENDER_LIST = Symbol(`renderList`)
export const FRAGMENT = Symbol(`Fragment`)
export const OPEN_BLOCK = Symbol(`openBlock`)

registerRuntimeHelpers({
  [IS_TRUE]: 'isTrue',
  [V_SHOW]: 'vShow',
  [RENDER_LIST]: 'renderList',
  [FRAGMENT]: 'Fragment',
})
