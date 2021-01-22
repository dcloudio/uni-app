import { isPlainObject } from '@vue/shared'

const encode = encodeURIComponent
export function stringifyQuery(obj?: Record<string, any>, encodeStr = encode) {
  const res = obj
    ? Object.keys(obj)
        .map((key) => {
          let val = obj[key]
          if (typeof val === undefined || val === null) {
            val = ''
          } else if (isPlainObject(val)) {
            val = JSON.stringify(val)
          }
          return encodeStr(key) + '=' + encodeStr(val)
        })
        .filter((x) => x.length > 0)
        .join('&')
    : null
  return res ? `?${res}` : ''
}
