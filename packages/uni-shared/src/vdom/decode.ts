import { ATTR_MAP, COMPONENT_MAP } from './encode'

function decodeObjMap(objMap: Record<string, string>) {
  return Object.keys(objMap).reduce((map, name) => {
    map[objMap[name]] = name
    return map
  }, Object.create(null))
}

function decodeArrMap(objMap: Record<string, number>) {
  return Object.keys(objMap).reduce(
    (arr, name) => {
      arr.push(name.toLowerCase())
      return arr
    },
    ['']
  )
}

const DECODED_ATTR_MAP = /*#__PURE__*/ decodeObjMap(ATTR_MAP)

export function decodeAttr(name: string) {
  return DECODED_ATTR_MAP[name as keyof typeof DECODED_ATTR_MAP] || name
}

const DECODED_COMPONENT_ARR = /*#__PURE__*/ decodeArrMap(COMPONENT_MAP)

export function decodeTag(tag: string | number) {
  return (DECODED_COMPONENT_ARR[tag as number] || tag) as string
}
