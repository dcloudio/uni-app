import {
  type CompilerError,
  type SourceLocation,
  createCompilerError,
} from '@vue/compiler-core'

export const enum MPErrorCodes {
  X_V_ON_NO_ARGUMENT,
  X_V_ON_DYNAMIC_EVENT,
  X_V_BIND_NO_ARGUMENT,
  X_V_BIND_DYNAMIC_ARGUMENT,
  X_V_BIND_MODIFIER_PROP,
  X_V_BIND_MODIFIER_ATTR,
  X_V_IS_NOT_SUPPORTED,
  X_NOT_SUPPORTED,
  X_DYNAMIC_COMPONENT_NOT_SUPPORTED,
}

const MPErrorMessages: Record<number, string> = {
  [MPErrorCodes.X_V_ON_NO_ARGUMENT]: 'v-on="" is not supported',
  [MPErrorCodes.X_V_ON_DYNAMIC_EVENT]: 'v-on:[event]="" is not supported.',
  [MPErrorCodes.X_V_BIND_NO_ARGUMENT]: 'v-bind="" is not supported.',
  [MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT]:
    'v-bind:[name]="" is not supported.',
  [MPErrorCodes.X_V_BIND_MODIFIER_PROP]: 'v-bind .prop is not supported',
  [MPErrorCodes.X_V_BIND_MODIFIER_ATTR]: 'v-bind .attr is not supported',
  [MPErrorCodes.X_DYNAMIC_COMPONENT_NOT_SUPPORTED]:
    '<component is=""/> is not supported',
  [MPErrorCodes.X_NOT_SUPPORTED]: 'not supported: ',
  [MPErrorCodes.X_V_IS_NOT_SUPPORTED]: 'v-is not supported',
}

export interface MPCompilerError extends CompilerError {
  code: MPErrorCodes
}

export function createMPCompilerError(
  code: MPErrorCodes,
  loc?: SourceLocation,
  additionalMessage?: string
) {
  return createCompilerError(
    code,
    loc,
    MPErrorMessages,
    additionalMessage
  ) as MPCompilerError
}
