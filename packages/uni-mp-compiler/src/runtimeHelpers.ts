import { registerRuntimeHelpers } from '@vue/compiler-core'

export const V_ON = Symbol(`vOn`)
export const V_FOR = Symbol(`vFor`)
export const EXTEND = Symbol(`extend`)
export const HYPHENATE = Symbol(`hyphenate`)
export const STRINGIFY_STYLE = Symbol(`stringifyStyle`)
registerRuntimeHelpers({
  [V_ON]: 'vOn',
  [V_FOR]: 'vFor',
  [EXTEND]: 'extend',
  [HYPHENATE]: 'hyphenate',
  [STRINGIFY_STYLE]: 'stringifyStyle',
})
