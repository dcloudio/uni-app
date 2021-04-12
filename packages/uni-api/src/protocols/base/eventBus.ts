export const $on: ProtocolOptions<String | Array<String> | Function>[] = [
  {
    name: 'event',
    type: [String, Array],
    required: true,
  },
  {
    name: 'callback',
    type: Function,
    required: true,
  },
]

export const $once = $on

export const $off: ProtocolOptions<String | Array<String> | Function>[] = [
  {
    name: 'event',
    type: [String, Array],
  },
  {
    name: 'callback',
    type: Function,
  },
]

export const $emit: ProtocolOptions<String>[] = [
  {
    name: 'event',
    type: String,
    required: true,
  },
]
