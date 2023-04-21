import { registerRuntimeHelpers } from '@vue/compiler-core'
export const IS_TRUE = Symbol(`isTrue`)

registerRuntimeHelpers({
  [IS_TRUE]: 'isTrue',
})
