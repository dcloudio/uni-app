interface Set<T> {
  forEach(callbackfn: (value: T) => void, thisArg?: any): void
  forEach(callbackfn: (value: T, value2: T) => void, thisArg?: any): void
  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: any
  ): void

}

