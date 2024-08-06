/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/// <reference no-default-lib="true"/>

interface WeakMap<K extends WeakKey, V> {
  /**
   * Removes the specified element from the WeakMap.
   * @returns true if the element was successfully removed, or false if it was not present.
   */
  delete(key: K): boolean
  /**
   * @returns a specified element.
   */
  get(key: K): V | undefined
  /**
   * @returns a boolean indicating whether an element with the specified key exists or not.
   */
  has(key: K): boolean
  /**
   * Adds a new element with a specified key and value.
   * @param key Must be an object or symbol.
   */
  set(key: K, value: V): this
}

interface WeakMapConstructor {
  new <K extends WeakKey = WeakKey, V = any>(
    entries?: readonly (readonly [K, V])[] | null
  ): WeakMap<K, V>
  readonly prototype: WeakMap<WeakKey, any>
}
declare var WeakMap: WeakMapConstructor

interface ReadonlySet<T> {
  forEach(
    callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void,
    thisArg?: any
  ): void
  has(value: T): boolean
  readonly size: number
}

interface WeakSet<T extends WeakKey> {
  /**
   * Appends a new value to the end of the WeakSet.
   */
  add(value: T): this
  /**
   * Removes the specified element from the WeakSet.
   * @returns Returns true if the element existed and has been removed, or false if the element does not exist.
   */
  delete(value: T): boolean
  /**
   * @returns a boolean indicating whether a value exists in the WeakSet or not.
   */
  has(value: T): boolean
}

interface WeakSetConstructor {
  new <T extends WeakKey = WeakKey>(values?: readonly T[] | null): WeakSet<T>
  readonly prototype: WeakSet<WeakKey>
}
declare var WeakSet: WeakSetConstructor
