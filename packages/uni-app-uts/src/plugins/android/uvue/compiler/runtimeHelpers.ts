import { once } from '@dcloudio/uni-shared'
import {
  CREATE_COMMENT,
  CREATE_ELEMENT_VNODE,
  CREATE_VNODE,
  NORMALIZE_CLASS,
  NORMALIZE_STYLE,
  TO_DISPLAY_STRING,
  registerRuntimeHelpers,
} from '@vue/compiler-core'
export const IS_TRUE = Symbol(`isTrue`)
export const V_SHOW = Symbol(`vShow`)
export const RENDER_LIST = Symbol(`renderList`)
export const FRAGMENT = Symbol(`Fragment`)
export const OPEN_BLOCK = Symbol(`openBlock`)
export const RESOLVE_COMPONENT = Symbol(`resolveComponent`)
export const RESOLVE_DIRECTIVE = Symbol(`resolveDirective`)
export const RESOLVE_EASY_COMPONENT = Symbol(`resolveEasyComponent`)
export const RENDER_SLOT = Symbol(`renderSlot`)
export const TO_HANDLERS = Symbol(`toHandlers`)

export const V_ON_WITH_MODIFIERS = Symbol(`vOnModifiersGuard`)

export const WITH_SLOT_CTX = Symbol(`withSlotCtx`)
export const WITH_SCOPED_SLOT_CTX = Symbol(`withScopedSlotCtx`)

export const RESOLVE_CACHE = Symbol(`resolveCache`)

export const TRY_SET_REF_VALUE = Symbol(`trySetRefValue`)
export const TRY_UPDATE_REF_NUMBER = Symbol(`tryUpdateRefNumber`)

export const LOOSE_TO_NUMBER = Symbol(`looseToNumber`)

export const initRuntimeHelpersOnce = once(() => {
  registerRuntimeHelpers({
    [IS_TRUE]: 'isTrue',
    [V_SHOW]: 'vShow',
    [RENDER_LIST]: 'RenderHelpers.renderList',
    [FRAGMENT]: 'Fragment',
    [RESOLVE_COMPONENT]: 'resolveComponent',
    [RESOLVE_EASY_COMPONENT]: 'resolveEasyComponent',
    [RESOLVE_DIRECTIVE]: 'resolveDirective',
    [RENDER_SLOT]: `renderSlot`,
    [TO_HANDLERS]: `toHandlers`,
    [V_ON_WITH_MODIFIERS]: `withModifiers`,
    [WITH_SLOT_CTX]: `withSlotCtx`,
    [WITH_SCOPED_SLOT_CTX]: `withScopedSlotCtx`,
    [RESOLVE_CACHE]: `resolveCache`,
    [TRY_SET_REF_VALUE]: `trySetRefValue`,
    [TRY_UPDATE_REF_NUMBER]: `tryUpdateRefNumber`,
    [LOOSE_TO_NUMBER]: `looseToNumber`,
    [CREATE_VNODE]: `_cV`,
    [CREATE_ELEMENT_VNODE]: `_cE`,
    [CREATE_COMMENT]: `_cC`,
    [TO_DISPLAY_STRING]: `_tD`,
    [NORMALIZE_CLASS]: `_nC`,
    [NORMALIZE_STYLE]: `_nS`,
  })
})
