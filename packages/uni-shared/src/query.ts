import { isArray, isPlainObject } from '@vue/shared'

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
/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
export function decode(text: string | number): string {
  try {
    return decodeURIComponent('' + text)
  } catch (err) {}
  return '' + text
}

export function decodedQuery(query: Record<string, any> = {}) {
  const decodedQuery: Record<string, string> = {}
  Object.keys(query).forEach((name) => {
    try {
      decodedQuery[name] = decode(query[name])
    } catch (e) {
      decodedQuery[name] = query[name]
    }
  })
  return decodedQuery
}

export const PLUS_RE = /\+/g // %2B

/**
 * https://github.com/vuejs/vue-router-next/blob/master/src/query.ts
 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
export function parseQuery(search: string) {
  const query: Record<string, any> = {}
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?') return query
  const hasLeadingIM = search[0] === '?'
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, ' ')
    // allow the = character
    let eqPos = searchParam.indexOf('=')
    let key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos))
    let value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1))

    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key]
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue]
      }
      currentValue.push(value)
    } else {
      query[key] = value
    }
  }
  return query
}
