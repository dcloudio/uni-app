export function getType(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

export function isPlainObject(val: any): boolean {
  if (val == null || typeof val !== 'object') {
    return false
  }
  const proto = Object.getPrototypeOf(val)
  return proto === Object.prototype || proto === null
}
