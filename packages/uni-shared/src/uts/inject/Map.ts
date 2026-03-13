export function mapGet<K, V>(map: Map<K, V>, key: K): V | null {
  if (!map.has(key)) {
    return null
  }
  return map.get(key) as V
}
