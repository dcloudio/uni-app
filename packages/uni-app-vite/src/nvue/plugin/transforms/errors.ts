import {
  type CompilerError,
  type SourceLocation,
  createCompilerError,
} from '@vue/compiler-core'

export const enum NVueErrorCodes {
  X_V_SHOW,
  X_V_MODEL_DYNAMIC_TYPE,
  X_V_MODEL_AND_V_BIND,
}
const NVueErrorMessages: Record<number, string> = {
  [NVueErrorCodes.X_V_SHOW]: 'nvue: v-show is not supported',
  [NVueErrorCodes.X_V_MODEL_DYNAMIC_TYPE]:
    'nvue: v-model with :type="" is not supported',
  [NVueErrorCodes.X_V_MODEL_AND_V_BIND]:
    'nvue: v-model with v-bind is not supported',
}

interface NVueCompilerError extends CompilerError {
  code: NVueErrorCodes
}

export function createNVueCompilerError(
  code: NVueErrorCodes,
  loc?: SourceLocation,
  additionalMessage?: string
) {
  return createCompilerError(
    code,
    loc,
    NVueErrorMessages,
    additionalMessage
  ) as NVueCompilerError
}
