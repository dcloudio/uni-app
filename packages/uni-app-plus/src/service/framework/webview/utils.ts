import { stringifyQuery } from '@dcloudio/uni-shared'

let id = 2
let preloadWebview: PlusWebviewWebviewObject

export function getWebviewId() {
  return id
}

export function genWebviewId() {
  return id++
}

export function getPreloadWebview() {
  return preloadWebview
}

function encode(val: Parameters<typeof encodeURIComponent>[0]) {
  return val as string
}

export function initUniPageUrl(path: string, query: Record<string, string>) {
  const queryString = query ? stringifyQuery(query, encode) : ''
  return {
    path: path.substr(1),
    query: queryString ? queryString.substr(1) : queryString,
  }
}
