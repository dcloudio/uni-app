import { registerRuntimeHelpers } from '@vue/compiler-core'

export const WXS_PROP = Symbol(`wxsProp`)

registerRuntimeHelpers({
  [WXS_PROP]: 'wp',
})
