export const enum MPErrorCodes {
  X_V_ON_NO_ARGUMENT,
  X_V_ON_DYNAMIC_EVENT,
  X_V_BIND_NO_ARGUMENT,
  X_V_BIND_DYNAMIC_ARGUMENT,
  X_V_BIND_MODIFIER_PROP,
  X_V_BIND_MODIFIER_ATTR,
}

export const errorMessages: Record<number, string> = {
  [MPErrorCodes.X_V_ON_NO_ARGUMENT]: 'v-on="" is not supported',
  [MPErrorCodes.X_V_ON_DYNAMIC_EVENT]: 'v-on:[event]="" is not supported.',
  [MPErrorCodes.X_V_BIND_NO_ARGUMENT]: 'v-bind="" is not supported.',
  [MPErrorCodes.X_V_BIND_DYNAMIC_ARGUMENT]:
    'v-bind:[name]="" is not supported.',
  [MPErrorCodes.X_V_BIND_MODIFIER_PROP]: 'v-bind .prop is not supported',
  [MPErrorCodes.X_V_BIND_MODIFIER_ATTR]: 'v-bind .attr is not supported',
}
