export function objToString(obj: any): string {
  if (obj === null || obj === undefined) {
    return JSON.stringify(obj)
  }

  if (typeof obj === 'object' && 'toJSON' in obj) {
    return obj.toJSON()
  }

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const entries = Object.entries(obj).map(([key, value]) => {
      return `"${key}": ${objToString(value)}`
    })
    return `{ ${entries.join(',')} }`
  }

  return JSON.stringify(obj)
}
