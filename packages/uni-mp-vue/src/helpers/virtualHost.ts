export function parseVirtualHostClass(className: string | string[]) {
  if (Array.isArray(className)) {
    return className
      .filter(Boolean)
      .map((name) => `^${name}`)
      .join(' ')
  }
  if (typeof className === 'string') {
    return className
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => `^${name}`)
      .join(' ')
  }
  return ''
}
