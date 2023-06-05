import { registerRuntimeHelpers } from '@vue/compiler-core'
export const IS_TRUE = Symbol(`isTrue`)
export const V_SHOW = Symbol(`vShow`)
export const RENDER_LIST = Symbol(`renderList`)
export const FRAGMENT = Symbol(`Fragment`)
export const OPEN_BLOCK = Symbol(`openBlock`)
export const RESOLVE_COMPONENT = Symbol(`resolveComponent`)
export const RESOLVE_DIRECTIVE = Symbol(`resolveDirective`)
export const RENDER_SLOT = Symbol(`renderSlot`)
export const TO_HANDLERS = Symbol(`toHandlers`)

registerRuntimeHelpers({
  [IS_TRUE]: 'isTrue',
  [V_SHOW]: 'vShow',
  [RENDER_LIST]: 'RenderHelpers.renderList',
  [FRAGMENT]: 'Fragment',
  [RESOLVE_COMPONENT]: 'resolveComponent',
  [RESOLVE_DIRECTIVE]: 'resolveDirective',
  [RENDER_SLOT]: `renderSlot`,
  [TO_HANDLERS]: `toHandlers`,
})
