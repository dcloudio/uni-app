export const API_ON = '$on'
export type API_TYPE_ON = typeof uni.$on
export const OnProtocol: ProtocolOptions<String | Function>[] = [
  {
    name: 'event',
    type: String,
    required: true,
  },
  {
    name: 'callback',
    type: Function,
    required: true,
  },
]

export const API_ONCE = '$once'
export type API_TYPE_ONCE = typeof uni.$once
export const OnceProtocol = OnProtocol

export const API_OFF = '$off'
export type API_TYPE_OFF = typeof uni.$off
export const OffProtocol: ProtocolOptions<
  String | Function | Number | Array<String>
>[] = [
  {
    name: 'event',
    type: [String, Array],
  },
  {
    name: 'callback',
    type: [Function, Number],
  },
]

export const API_EMIT = '$emit'
export type API_TYPE_EMIT = typeof uni.$emit
export const EmitProtocol: ProtocolOptions<String>[] = [
  {
    name: 'event',
    type: String,
    required: true,
  },
]
