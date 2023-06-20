export const $on = [{
  name: 'event',
  type: [String, Array],
  required: true
}, {
  name: 'callback',
  type: Function,
  required: true
}]

export const $once = $on

export const $off = [{
  name: 'event',
  type: [String, Array]
}, {
  name: 'callback',
  type: Function
}]

export const $emit = [{
  name: 'event',
  type: String,
  required: true
}]
