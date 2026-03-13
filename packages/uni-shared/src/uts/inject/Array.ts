export function arrayPop<T>(array: T[]): T | null {
  if (array.length === 0) {
    return null
  }
  return array.pop() as T
}

export function arrayShift<T>(array: T[]): T | null {
  if (array.length === 0) {
    return null
  }
  return array.shift() as T
}

export function arrayFind<T>(array: T[], predicate: any): T | null {
  const index = array.findIndex(predicate)
  if (index < 0) {
    return null
  }
  return array[index] as T
}

export function arrayFindLast<T>(array: T[], predicate: any): T | null {
  const index = array.findLastIndex(predicate)
  if (index < 0) {
    return null
  }
  return array[index] as T
}

export function arrayAt<T>(array: T[], index: number): T | null {
  if (index < -array.length || index >= array.length) {
    return null
  }
  return array.at(index) as T
}
