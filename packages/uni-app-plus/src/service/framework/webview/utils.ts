import { stringifyQuery } from '@dcloudio/uni-shared'

let id = __X__ ? 1 : 2

export function getWebviewId() {
  return id
}

export function genWebviewId() {
  return id++
}

export function resetWebviewId() {
  id = __X__ ? 1 : 2
}

function encode(val: Parameters<typeof encodeURIComponent>[0]) {
  return val as string
}

export type InitUniPageUrl = ReturnType<typeof initUniPageUrl>
export type DebugRefresh = ReturnType<typeof initDebugRefresh>

export function initUniPageUrl(path: string, query: Record<string, any>) {
  const queryString = query ? stringifyQuery(query, encode) : ''
  return {
    path: path.slice(1),
    query: queryString ? queryString.slice(1) : queryString,
  }
}

export function initDebugRefresh(
  isTab: boolean,
  path: string,
  query: Record<string, any>
) {
  const queryString = query ? stringifyQuery(query, encode) : ''
  return {
    isTab,
    arguments: JSON.stringify({
      path: path.slice(1),
      query: queryString ? queryString.slice(1) : queryString,
    }),
  }
}
