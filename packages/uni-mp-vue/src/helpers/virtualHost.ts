export function parseVirtualHostClass(className: string | string[]) {
  if (Array.isArray(className)) {
    return className.map((name) => `^${name}`).join(' ')
  }
  if (typeof className === 'string') {
    return className
      .split(/\s+/)
      .map((name) => `^${name}`)
      .join(' ')
  }
  return ''
}
