import type { DirectiveTransform } from '@vue/compiler-core'
import { NVueErrorCodes, createNVueCompilerError } from './errors'

export const transformShow: DirectiveTransform = (dir, node, context) => {
  context.onError(createNVueCompilerError(NVueErrorCodes.X_V_SHOW, dir.loc))
  return {
    props: [],
  }
}
