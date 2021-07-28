export type MPProtocolArgsValue = {
  name?: string
  value: any
}
type MPProtocolArgsValueObject = boolean | string | MPProtocolArgsValue
type MPProtocolArgsValueFunction = (
  val: any,
  fromArgs: any,
  toArgs: any
) => MPProtocolArgsValueObject
type MPProtocolArgsObject = {
  [key: string]: MPProtocolArgsValueObject | MPProtocolArgsValueFunction
}
type MPProtocolArgsFunction<T = any> = (
  fromArgs: T,
  toArgs: T
) => MPProtocolArgsObject | void

export type MPProtocolArgs = MPProtocolArgsObject | MPProtocolArgsFunction

type MPProtocolReturnValue = MPProtocolArgs
export type MPProtocolObject = {
  name?: string
  args?: MPProtocolArgs
  returnValue?: MPProtocolReturnValue
}
type MPProtocolFunction = (arg: unknown) => MPProtocolObject
export type MPProtocol = MPProtocolObject | MPProtocolFunction

type MPProtocolsBase = {
  [key: string]: MPProtocol
}

type MPProdocolsReturnValue = {
  returnValue?: (
    methodName: string,
    res: Record<string, any>
  ) => Record<string, any>
}

export type MPProtocols = MPProtocolsBase | MPProdocolsReturnValue
