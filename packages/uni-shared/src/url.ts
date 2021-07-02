import { parseQuery } from './query'

export function parseUrl(url: string) {
  const [path, querystring] = url.split('?', 2)
  return {
    path,
    query: parseQuery(querystring || ''),
  }
}
