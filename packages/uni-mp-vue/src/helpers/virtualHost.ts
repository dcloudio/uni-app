import { isArray, isString } from '@vue/shared'

export function parseVirtualHostClass(className: string | string[]) {
  if (isArray(className)) {
    return className
      .filter(Boolean)
      .map((name) => `^${name}`)
      .join(' ')
  }
  if (isString(className)) {
    return className
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => `^${name}`)
      .join(' ')
  }
  return ''
}
