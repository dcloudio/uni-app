import { ATTR_MAP, COMPONENT_MAP } from './encode'

const DECODED_ATTR_MAP = /*#__PURE__*/ Object.keys(ATTR_MAP).reduce(
  (map, name) => {
    map[ATTR_MAP[name as keyof typeof ATTR_MAP]] = name
    return map
  },
  Object.create(null)
)

export function decodeAttr(name: string) {
  return DECODED_ATTR_MAP[name as keyof typeof DECODED_ATTR_MAP] || name
}

const DECODED_COMPONENT_ARR = /*#__PURE__*/ Object.keys(COMPONENT_MAP).reduce(
  (arr, name) => {
    arr.push(name.toLowerCase())
    return arr
  },
  ['']
)

export function decodeTag(tag: string | number) {
  return DECODED_COMPONENT_ARR[tag as number] || tag
}
