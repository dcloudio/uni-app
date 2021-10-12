import { registerRuntimeHelpers } from '@vue/compiler-core'

export const V_ON = Symbol(`vOn`)
export const V_FOR = Symbol(`vFor`)

registerRuntimeHelpers({
  [V_ON]: 'vOn',
  [V_FOR]: 'vFor',
})
