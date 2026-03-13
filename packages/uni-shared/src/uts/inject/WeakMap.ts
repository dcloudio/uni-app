export function weakMapGet<K extends symbol | object, V>(
  map: WeakMap<K, V>,
  key: K
): V | null {
  if (!map.has(key)) {
    return null
  }
  return map.get(key) as V
}
