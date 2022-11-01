export function cached(fn: Function) {
  const cache = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

export const parseStyleText = cached(function (cssText: string) {
  const res: Record<string, any> = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
})

export const firstLetterToLowerCase = cached((str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1)
})

export function isDef(v: any) {
  return typeof v !== 'undefined'
}
