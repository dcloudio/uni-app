import { DirectiveTransform } from '@vue/compiler-core'
import { createNVueCompilerError, NVueErrorCodes } from './errors'

export const transformShow: DirectiveTransform = (dir, node, context) => {
  context.onError(createNVueCompilerError(NVueErrorCodes.X_V_SHOW, dir.loc))
  return {
    props: [],
  }
}
