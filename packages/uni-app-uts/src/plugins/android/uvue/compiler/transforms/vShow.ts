import type { DirectiveTransform } from '@vue/compiler-core'
import { V_SHOW } from '../runtimeHelpers'

export const transformShow: DirectiveTransform = (dir, node, context) => {
  return {
    props: [],
    needRuntime: context.helper(V_SHOW),
  }
}
