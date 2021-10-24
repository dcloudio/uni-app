export function getDataByPath(
  obj: Record<string | number, any>,
  path: string
): unknown {
  const parts = path.split('.')
  const key: number | string = parts[0]
  if (!obj) {
    obj = {}
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getDataByPath(obj[key], parts.slice(1).join('.'))
}
