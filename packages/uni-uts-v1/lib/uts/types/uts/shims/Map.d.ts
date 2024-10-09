interface Map<K, V> {
  forEach(callbackfn: (value: V) => void, thisArg?: any): void
  forEach(callbackfn: (value: V, key: K) => void, thisArg?: any): void
  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void
}
