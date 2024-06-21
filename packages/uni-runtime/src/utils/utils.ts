export function getType(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

export function disableEnumerable(obj: object, properties: string[]) {
  const propertyDescriptorMap: PropertyDescriptorMap = {}
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    propertyDescriptorMap[property] = {
      enumerable: false,
      value: obj[property],
    }
  }
  Object.defineProperties(obj, propertyDescriptorMap)
}
