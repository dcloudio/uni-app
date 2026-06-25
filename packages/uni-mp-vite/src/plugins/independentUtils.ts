export const INDEPENDENT_ROOT_QUERY = 'uni_mp_independent_root'

export function parseIndependentRoot(id: string): string | undefined {
  const query = splitIdQuery(id).query
  if (!query) {
    return
  }
  for (const item of query.split('&')) {
    const [name, value = ''] = splitQueryItem(item)
    if (name === INDEPENDENT_ROOT_QUERY) {
      return decodeURIComponent(value)
    }
  }
}

export function withIndependentRoot(id: string, root: string): string {
  const cleanId = withoutIndependentRoot(id)
  const { filename, query } = splitIdQuery(cleanId)
  const rootQuery = `${INDEPENDENT_ROOT_QUERY}=${encodeURIComponent(root)}`
  return `${filename}?${query ? query + '&' : ''}${rootQuery}`
}

export function withoutIndependentRoot(id: string): string {
  const { filename, query } = splitIdQuery(id)
  if (!query) {
    return id
  }
  const nextQuery = query
    .split('&')
    .filter((item) => splitQueryItem(item)[0] !== INDEPENDENT_ROOT_QUERY)
    .join('&')
  return nextQuery ? `${filename}?${nextQuery}` : filename
}

export function hasIndependentRoot(id: string): boolean {
  return parseIndependentRoot(id) !== undefined
}

function splitIdQuery(id: string) {
  const queryIndex = id.indexOf('?')
  if (queryIndex === -1) {
    return { filename: id, query: '' }
  }
  return {
    filename: id.slice(0, queryIndex),
    query: id.slice(queryIndex + 1),
  }
}

function splitQueryItem(item: string) {
  const equalIndex = item.indexOf('=')
  if (equalIndex === -1) {
    return [item, ''] as const
  }
  return [item.slice(0, equalIndex), item.slice(equalIndex + 1)] as const
}
