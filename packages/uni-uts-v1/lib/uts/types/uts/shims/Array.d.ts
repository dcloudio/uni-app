interface Array<T> {
  every<S extends T>(
    predicate: (value: T) => value is S,
    thisArg?: any
  ): this is S[]
  every<S extends T>(
    predicate: (value: T, index: number) => value is S,
    thisArg?: any
  ): this is S[]
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): this is S[]
  every(predicate: (value: T) => unknown, thisArg?: any): boolean
  every(predicate: (value: T, index: number) => unknown, thisArg?: any): boolean
  every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean
  some(predicate: (value: T) => unknown, thisArg?: any): boolean
  some(predicate: (value: T, index: number) => unknown, thisArg?: any): boolean
  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean
  forEach(callbackfn: (value: T) => void, thisArg?: any): void
  forEach(callbackfn: (value: T, index: number) => void, thisArg?: any): void
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void
  map<U>(callbackfn: (value: T) => U, thisArg?: any): U[]
  map<U>(callbackfn: (value: T, index: number) => U, thisArg?: any): U[]
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[]
  filter<S extends T>(predicate: (value: T) => value is S, thisArg?: any): S[]
  filter<S extends T>(
    predicate: (value: T, index: number) => value is S,
    thisArg?: any
  ): S[]
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[]
  filter(predicate: (value: T) => unknown, thisArg?: any): T[]
  filter(predicate: (value: T, index: number) => unknown, thisArg?: any): T[]
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[]
  reduce(callbackfn: (previousValue: T, currentValue: T) => T): T
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T
  ): T
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T
  reduce(
    callbackfn: (previousValue: T, currentValue: T) => T,
    initialValue: T
  ): T
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T,
    initialValue: T
  ): T
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T
  reduce<U>(
    callbackfn: (previousValue: U, currentValue: T) => U,
    initialValue: U
  ): U
  reduce<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U,
    initialValue: U
  ): U
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U
  reduceRight(callbackfn: (previousValue: T, currentValue: T) => T): T
  reduceRight(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T
  ): T
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T
  reduceRight(
    callbackfn: (previousValue: T, currentValue: T) => T,
    initialValue: T
  ): T
  reduceRight(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T,
    initialValue: T
  ): T
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T
  reduceRight<U>(
    callbackfn: (previousValue: U, currentValue: T) => U,
    initialValue: U
  ): U
  reduceRight<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U,
    initialValue: U
  ): U
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U
  find<S extends T>(
    predicate: (value: T) => value is S,
    thisArg?: any
  ): S | null
  find<S extends T>(
    predicate: (value: T, index: number) => value is S,
    thisArg?: any
  ): S | null
  find<S extends T>(
    predicate: (value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | null
  find(predicate: (value: T) => unknown, thisArg?: any): T | null
  find(predicate: (value: T, index: number) => unknown, thisArg?: any): T | null
  find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | null
  findIndex(predicate: (value: T) => unknown, thisArg?: any): number
  findIndex(
    predicate: (value: T, index: number) => unknown,
    thisArg?: any
  ): number
  findIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number
}