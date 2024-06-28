/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file Defines the collections for ArkTS
 * @kit ArkTS
 */

import lang from './@arkts.lang'

/**
 * ArkTS collections.
 *
 * @namespace collections
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace collections {
  /**
   * Callback function used in the typed Array's 'from' function.
   * 
   * @param { FromElementType } value - The value in the original array.
   * @param { number } index - The index in the original array.
   * @returns { ToElementType } The transformed value.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  type TypedArrayFromMapFn<FromElementType, ToElementType> = (value: FromElementType, index: number) => ToElementType;
  /**
   * Callback function used in typed Array functions which needs to determine
   * whether some element satisfies the specified predicate test
   * 
   * @param { ElementType } value - The value of the element.
   * @param { number } index - The index of the element.
   * @param { ArrayType } array - The array that the element belongs to.
   * @returns { boolean } True if the value meets the predicate, otherwise false.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  type TypedArrayPredicateFn<ElementType, ArrayType> =
    (value: ElementType, index: number, array: ArrayType) => boolean;
  /**
   * Callback function used in typed Array functions that perform specific action for each element.
   * 
   * @param { ElementType } value - The value of the element.
   * @param { number } index - The index of the element.
   * @param { ArrayType } array - The array that the element belongs to.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  type TypedArrayForEachCallback<ElementType, ArrayType> =
    (value: ElementType, index: number, array: ArrayType) => void;
  /**
   * Callback function used in typed Array functions that require a reduction.
   * 
   * @param { AccType } previousValue - The accumulator value.
   * @param { ElementType } currentValue - The current element being processed in the array.
   * @param { number } currentIndex - The index of the current element being processed in the array.
   * @param { ArrayType } array - The array that the element belongs to.
   * @returns { AccType } The result of the reduction.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  type TypedArrayReduceCallback<AccType, ElementType, ArrayType> =
    (previousValue: AccType, currentValue: ElementType, currentIndex: number, array: ArrayType) => AccType;
  /**
   * Callback function used in the typed Array's 'sort' function.
   * 
   * @param { ElementType } first - The first element of the comparison.
   * @param { ElementType } second - The second element of the comparison.
   * @returns { number } The result of the comparison.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  type TypedArrayCompareFn<ElementType> = (first: ElementType, second: ElementType) => number;
  /**
   * Redefines ISendable for convenience.
   *
   * @typedef { lang.ISendable } ISendable
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  type ISendable = lang.ISendable;
  /**
   * Represents an array-like object that can be concatenated.
   * 
   * @interface ConcatArray
   * @syscap SystemCapability.Utils.Lang
   * @since 12
   */
  interface ConcatArray<T> extends ISendable {
    /**
     * Gets the length of the ArkTS ConcatArray. This is a number one higher than the highest index in the array.
     * 
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @since 12
     */
    readonly length: number;
    /**
     * Adds all the elements of an ArkTS ConcatArray into a string, separated by the specified separator string.
     * 
     * @param { string } [separator] - A string used to separate one element of the array from
     *     the next in the resulting string. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all array elements joined.
     *     If ConcatArray.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error. Invalid separator.
     * @syscap SystemCapability.Utils.Lang
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Returns a copy of a section of an ArkTS ConcatArray.
     *
     * @param { number } [start] - The beginning index of the specified portion of the array.
     *     If start is undefined, then the slice begins at index 0.
     * @param { number } [end] - The end index of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     *     If end is undefined, then the slice extends to the end of the array.
     * @returns { ConcatArray<T> } A new ConcatArray containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error. Invalid `start` or `end` parameters.
     * @syscap SystemCapability.Utils.Lang
     * @since 12
     */
    slice(start?: number, end?: number): ConcatArray<T>;
  }
  /**
   * Array is a data structure that stores a collection of elements. 
   * If multiple threads access a Array instance concurrently, 
   * and at least one of the threads modifies the array structurally,
   * it must be synchronized externally.
   * 
   * @implements ConcatArray<T>
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Array<T> implements ConcatArray<T> {
    /**
     * Gets the length of the ArkTS array. This is a number one higher than the highest index in the ArkTS array.
     * 
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly length: number;
    /**
     * Creates an ArkTS Array with arrayLength elements initialized to initialValue.
     *
     * @param { number } arrayLength - The length of the array.
     * @param { T } initialValue - Element initial value that will be filled into the Array.
     * @returns { Array<T> } A new Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The create method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static create<T>(arrayLength: number, initialValue: T): Array<T>;
    /**
     * Creates an ArkTS Array from an array-like object.
     * 
     * @param { ArrayLike<T> } arrayLike - An array-like object to convert to an ArkTS Array.
     * @returns { Array<T> } A new Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The from method cannot be bound.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from<T>(arrayLike: ArrayLike<T>): Array<T>;
    /**
     * A constructor used to create an ArkTS Array.
     *
     * @throws { BusinessError } 10200012 - The Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * A constructor used to create an ArkTS Array.
     *
     * @param { T } first - First element when initializing an ArkTS Array.
     * @param { T[] } left - Left elements when initializing an ArkTS Array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200012 - The Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(first: T, ...left: T[]);
    /**
     * Removes the last element from an ArkTS array and returns it.
     * If the array is empty, undefined is returned and the array is not modified.
     * 
     * @returns { T | undefined } - The removed element from the array; undefined if the array is empty.
     * @throws { BusinessError } 10200011 - The pop method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    pop(): T | undefined;
    /**
     * Appends new elements to the end of an ArkTS Array, and returns the new length of the array.
     * 
     * @param { T[] } items - New elements to add to the ArkTS array.
     * @returns { number } - The new length property of the object upon which the method was called.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The push method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    push(...items: T[]): number;
    /**
     * Adds all the elements of an ArkTS Array into a string, separated by the specified separator string.
     * 
     * @param { string } [separator] - A string used to separate one element of the array from
     *     the next in the resulting string. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all array elements joined. If Array.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The join method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Removes the first element from an ArkTS Array and returns it.
     * If the array is empty, undefined is returned and the array is not modified.
     * 
     * @returns { T | undefined } The removed element from the array; undefined if the array is empty
     * @throws { BusinessError } 10200011 - The shift method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    shift(): T | undefined;
    /**
     * Inserts new elements at the start of an array, and returns the new length of the array.
     *
     * @param { T[] } items - Elements to insert at the start of the array.
     * @returns { number } The new length property of the object upon which the method was called.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The unshift method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    unshift(...items: T[]): number;
    /**
     * Returns a copy of a section of an ArkTS Array.
     * For both start and end, a negative index can be used to indicate an offset from the end of the array.
     * For example, -2 refers to the second to last element of the array.
     *
     * @param { number } [start] - The beginning index of the specified portion of the array.
     *     If start is undefined, then the slice begins at index 0.
     * @param { number } [end] - The end index of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     *     If end is undefined, then the slice extends to the end of the array.
     * @returns { Array<T> } A new array containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(start?: number, end?: number): Array<T>;
    /**
     * Sorts an array in place. This method mutates the array and returns a reference to the same array.
     *
     * @param { function } [compareFn] - Function used to determine the order of the elements. It is expected to return
     *     a negative value if the first argument is less than the second argument, zero if they're equal,
     *     and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
     * @returns { Array<T> } The reference to the original array, now sorted.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The sort method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    sort(compareFn?: (a: T, b: T) => number): Array<T>;
    /**
     * Returns the index of the first occurrence of a value in an ArkTS Array, or -1 if it is not present.
     * 
     * @param { T } searchElement - The value to locate in the array.
     * @param { number } [fromIndex] - The array index at which to begin the search.
     *     If fromIndex is omitted, the search starts at index 0.
     * @returns { number } The first index of searchElement in the array; -1 if not found.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The indexOf method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indexOf(searchElement: T, fromIndex?: number): number;
    /**
     * Executes a provided function once for each value in the Array object.
     *
     * @param { function } callbackFn - A function that accepts up to three arguments.
     *     The function to be called for each element.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: (value: T, index: number, array: Array<T>) => void): void;
    /**
     * Calls a defined callback function on each element of an ArkTS Array,
     * and returns an array that contains the results.
     * 
     * @param { function } callbackFn - A function that accepts up to three arguments.
     *     The map method calls the callbackFn function one time for each element in the array.
     * @returns { Array<U> } A new array with each element being the result of the callback function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The map method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    map<U>(callbackFn: (value: T, index: number, array: Array<T>) => U): Array<U>;
    /**
     * Returns the elements of an ArkTS Array that meet the condition specified in a callback function.
     * 
     * @param { function } predicate - A function that accepts up to three arguments.
     *     The filter method calls the predicate function one time for each element in the array.
     * @returns { Array<T> } A shallow copy of the given containing just the elements that pass the test.
     *     If no elements pass the test, an empty array is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The filter method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    filter(predicate: (value: T, index: number, array: Array<T>) => boolean): Array<T>;
    /**
     * Calls the specified callback function for all the elements in an ArkTS Array.
     * The return value of the callback function is the accumulated result,
     * and is provided as an argument in the next call to the callback function.
     * 
     * @param { function } callbackFn - A function that accepts up to four arguments.
     *     The reduce method calls the callbackFn function one time for each element in the array.
     * @returns { T } The value that results from running the "reducer" callback function to
     *     completion over the entire array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, array: Array<T>) => T): T;
    /**
     * Calls the specified callback function for all the elements in an array.
     * The return value of the callback function is the accumulated result,
     * and is provided as an argument in the next call to the callback function.
     * 
     * @param { function } callbackFn - A function that accepts up to four arguments.
     *     The reduce method calls the callbackFn function one time for each element in the array.
     * @param { U } initialValue - If initialValue is specified,
     *     it is used as the initial value to start the accumulation.
     *     The first call to the callbackFn function provides this value as an argument instead of an array value.
     * @returns { U } The value that results from running the "reducer" callback function to
     *     completion over the entire array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
    */
    reduce<U>(
      callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: Array<T>) => U,
      initialValue: U
    ): U;
    /**
     * Returns the item located at the specified index.
     *
     * @param { number } index - The zero-based index of the desired code unit.
     *     A negative index will count back from the last item.
     * @returns { T | undefined } The element in the array matching the given index.
     *     Always returns undefined if index < -array.length or index >= array.length without
     *     attempting to access the corresponding property.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    at(index: number): T | undefined;
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     * 
     * @returns { IterableIterator<[number, T]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[number, T]>;
    /**
     * Returns an iterable of keys in the array
     * 
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an iterable of values in the array
     * 
     * @returns { IterableIterator<T> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<T>;
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * 
     * @param { function } predicate - Find calls predicate once for each element of the array, in ascending
     *     order, until it finds one where predicate returns true.
     *     If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @returns { T | undefined } The first element in the array that satisfies the provided testing function.
     *     Otherwise, undefined is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The find method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    find(predicate: (value: T, index: number, obj: Array<T>) => boolean): T | undefined;
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     *
     * @param { T } searchElement - The element to search for.
     * @param { number } [fromIndex] - The position in this array at which to begin searching for searchElement.
     * @returns { boolean } A boolean value which is true if the value searchElement is found within
     *     the array (or the part of the array indicated by the index fromIndex, if specified).
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The includes method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    includes(searchElement: T, fromIndex?: number): boolean;
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     *
     * @param { function } predicate - Find calls predicate once for each element of the array, in ascending
     *     order, until it finds one where predicate returns true. If such an element is found,
     *     findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @returns { number } The index of the first element in the array that passes the test. Otherwise, -1;
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The findIndex method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    findIndex(predicate: (value: T, index: number, obj: Array<T>) => boolean): number;
    /**
     * Returns the this object after filling the section identified by start and end with value
     * 
     * @param { T } value - Value to fill array section with
     * @param { number } [start] - Index to start filling the array at. If start is negative, it is treated as
     *     length+start where length is the length of the array.
     * @param { number } [end] - Index to stop filling the array at. If end is negative, it is treated as
     *     length+end.
     * @returns { Array<T> } The modified array, filled with value.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The fill method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fill(value: T, start?: number, end?: number): Array<T>;
    /**
     * Shrinks the ArkTS array to the given arrayLength.
     * 
     * @param { number } arrayLength - The new Array length.
     *     Throws error when arrayLength < 0 or arrayLength > 2^32.
     *     If arrayLength > array.length, array remains unchanged.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The shrinkTo method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    shrinkTo(arrayLength: number): void;
    /**
     * Extends the ArkTS array to the given arrayLength,
     * and appends new elements with given initialValue up to the arrayLength.
     * 
     * @param { number } arrayLength - The new Array length.
     *     Throws error when arrayLength < 0 or arrayLength > 2^32.
     *     If arrayLength < array.length, array remains unchanged.
     * @param { T } initialValue - Element initial value that will be appended to the array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The extendTo method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    extendTo(arrayLength: number, initialValue: T): void;
    /**
     * Returns the item at that index.
     * 
     * @param { number } index - The zero-based index of the desired code unit.
     *     Throws error if index < 0 or index >= array.length.
     * @returns { T } The element in the array matching the given index. 
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [index: number]: T;
    /**
     * Concatenates two or more arrays.
     *
     * @param { ConcatArray<T>[] } items - The arrays to concatenate.
     * @returns { Array<T> } A new array containing the elements of the concatenated arrays.
     * @throws { BusinessError } 401 - Parameter error. Not a valid array.
     * @throws { BusinessError } 10200011 - The concat method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @since 12
     */
    concat(...items: ConcatArray<T>[]): Array<T>;
  }
  
  /**
   * The Map holds key-value pairs.
   * If multiple threads access a Map instance concurrently, 
   * and at least one of the threads modifies the map structurally,
   * it must be synchronized externally.
   * 
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Map<K, V> {
    /**
     * Returns the number of elements in the Map.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly size: number;
    /**
     * A constructor used to create a Map.
     *
     * @param { readonly (readonly [K, V])[] | null } [entries] - An Array or other iterable object
     * whose elements are key-value pairs.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200012 - The Map's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(entries?: readonly (readonly [K, V])[] | null)
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     *
     * @returns { IterableIterator<[K, V]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Returns an iterable of keys in the map.
     *
     * @returns { IterableIterator<K> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<K>;
    /**
     * Returns an iterable of values in the map.
     *
     * @returns { IterableIterator<V> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<V>;
    /**
     * Clears the map.
     *
     * @throws { BusinessError } 10200011 - The clear method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    clear(): void;
    /**
     * Returns true if an element in the Map existed and has been removed, or false if the element does not exist.
     *
     * @param { K } key - The key of the element to remove from the Map object.
     * @returns { boolean } True if an element in the Map Object existed and has been removed,
     *     or false if the element does not exist.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The delete method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    delete(key: K): boolean;
    /**
     * Executes the provided callback once for each key of the map which actually exist.
     *
     * @param { function } callbackFn - A function that accepts up to three arguments.
     *     The function to be called for each element.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void): void;
    /**
     * Returns a specified element from the Map object.
     * If the value that is associated to the provided key is an object,
     * then you will get a reference to that object and any change made to that object
     * will effectively modify it inside the Map.
     *
     * @param { K } key - The key of the element to return from the Map object
     * @returns { V | undefined } The element associated with the specified key,
     *     or undefined if the key can''t be found in the Map object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The get method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    get(key: K): V | undefined;
    /**
     * Returns boolean indicating whether an element with the specified key exists or not.
     *
     * @param { K } key - The key of the element to test for presence in the Map object.
     * @returns { boolean } true if an element with the specified key exists in the Map Object; otherwise false.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The has method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    has(key: K): boolean;
    /**
     * Adds a new element with a specified key and value to the Map.
     * If an element with the same key already exists, the element will be updated.
     *
     * @param { K } key - The key of the element to add to the Map object.
     * @param { V } value - The value of the element to add to the object.
     * @returns { Map<K, V> } The Object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(key: K, value: V): Map<K, V>;
  }
  
  /**
   * Set lets you store unique values of any type.
   * If multiple threads access a Set instance concurrently, 
   * and at least one of the threads modifies the set structurally,
   * it must be synchronized externally.
   * 
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Set<T> {
    /**
     * Returns the number of elements in the Set.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly size: number;
    /**
     * A constructor used to create a Set.
     *
     * @param { readonly T[] | null } [values] - If an iterable object is passed,
     *     all of its elements will be added to the new Set.
     *     If you don't specify this parameter, or its value is null, the new Set is empty.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200012 - The Set's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(values?: readonly T[] | null);
    /**
     * Returns an iterable of [value, value] pairs for each element in this set.
     * 
     * @returns { IterableIterator<[T, T]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[T, T]>;
    /**
     * Returns an iterable of the values in the set.
     *
     * @returns { IterableIterator<T> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<T>;
    /**
     * Returns an iterable of values in the set.
     *
     * @returns { IterableIterator<T> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<T>;
    /**
     * Appends a new element with a specified value to the end of the Set.
     *
     * @param { T } value - The value of the element to add to the Set object.
     * @returns { Set<T> } The Set object with added value.
     * @throws { BusinessError } 10200011 - The add method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    add(value: T): Set<T>;
    /**
     * Clears the Set.
     *
     * @throws { BusinessError } 10200011 - The clear method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    clear(): void;
    /**
     * Returns true if an element in the Set existed and has been removed, or false if the element does not exist.
     *
     * @param { T } value - The value to remove from Set.
     * @returns { boolean } Returns true if value was already in Set; otherwise false.
     * @throws { BusinessError } 10200011 - The delete method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    delete(value: T): boolean;
    /**
     * Executes a provided function once per each value in the Set object, in insertion order.
     *
     * @param { function } callbackFn - A function that accepts up to three arguments.
     *     The function to be called for each element.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: (value: T, value2: T, set: Set<T>) => void): void;
    /**
     * A boolean indicating whether an element with the specified value exists in the Set or not.
     *
     * @param { T } value -  The value to test for presence in the Object.
     * @returns { boolean } Returns true if an element with the specified value exists in the Set object;
     *     otherwise false.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The has method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    has(value: T): boolean;
  }
  /**
   * Represents a raw buffer of binary data, which is used to store data for the
   * different typed arrays. ArrayBuffers cannot be read from or written to directly,
   * but can be passed to a typed array or DataView Object to interpret the raw
   * buffer as needed.
   * If multiple threads access a ArrayBuffer instance concurrently, 
   * and at least one of the threads modifies the buffer structurally,
   * it must be synchronized externally.
   *
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class ArrayBuffer {
    /**
     * Read-only. The length of the ArrayBuffer (in bytes).
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteLength: number;
    /**
     * A constructor used to create a ArrayBuffer.
     *
     * @param { number } byteLength - The length of the ArkTS array buffer
     * @throws { BusinessError } 10200012 - The ArrayBuffer's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(byteLength: number);
    /**
     * Returns a section of an ArrayBuffer.
     *
     * @param { number } begin - Zero-based index at which to start extraction, converted to an integer.
     * @param { number } [end] - Zero-based index at which to end extraction, converted to an integer.
     *     Default is buffer.length
     * @returns { ArrayBuffer } A new ArrayBuffer containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(begin: number, end?: number): ArrayBuffer;
  }

  /**
   * A typed array of 8-bit integer values. The contents are initialized to 0.
   * If multiple threads access a Int8Array instance concurrently, 
   * and at least one of the threads modifies the array structurally,
   * it must be synchronized externally.
   *
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Int8Array {
    /**
     * The size in bytes of each element in the array.
     *
     * @type { number }
     * @readonly
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static readonly BYTES_PER_ELEMENT: number;
    /**
     * The ArrayBuffer instance referenced by the array.
     *
     * @type { ArrayBuffer }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly buffer: ArrayBuffer;
    /**
     * The length in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteLength: number;
    /**
     * The offset in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteOffset: number;
    /**
     * The length of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly length: number;
    /**
     * A constructor used to create an Int8Array.
     *
     * @throws { BusinessError } 10200012 - The Int8Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * A constructor used to create an Int8Array.
     *
     * @param { number } length - The length of the array
     * @throws { BusinessError } 10200012 - The Int8Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(length: number);
    /**
     * A constructor used to create an Int8Array.
     *
     * @param { ArrayLike<number> | ArrayBuffer } array - An array is initialized with the given elements
     * @throws { BusinessError } 10200012 - The Int8Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(array: ArrayLike<number> | ArrayBuffer);
    /**
     * A constructor used to create an Int8Array.
     *
     * @param { ArrayBuffer } buffer - An array is initialized with the given elements
     * @param { number } [byteOffset] - The byteOffset (in bytes) parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @param { number } [length] - The length parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @throws { BusinessError } 10200012 - The Int8Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    /**
     * Creates an Int8Array from an array-like object.
     *
     * @param { ArrayLike<number> } arrayLike - An array-like object to convert to an Int8Array.
     * @returns { Int8Array } A new Int8Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: ArrayLike<number>): Int8Array;
    
    /**
     * Creates an Int8Array from an array-like object.
     *
     * @param { ArrayLike<T> } arrayLike - An array-like object to convert to an Int8Array.
     * @param { TypedArrayFromMapFn<T, number> } mapFn - A mapping function to call on every element of the array.
     * @returns { Int8Array } A new Int8Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Int8Array;
    /**
     * Creates an Int8Array from an iterable object.
     *
     * @param { Iterable<number> } arrayLike - An iterable object to convert to an Int8Array.
     * @param { TypedArrayFromMapFn<number, number> } [mapFn] - A mapping function to
     *     call on every element of the array.
     * @returns { Int8Array } A new Int8Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Int8Array;
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target.
     *
     * @param { number } target - If target is negative, it is treated as length+target where length is the
     *     length of the array.
     * @param { number } start - If start is negative, it is treated as length+start. If end is negative, it
     *     is treated as length+end.
     * @param { number } [end] - If not specified, length of the this object is used as its default value.
     * @returns { Int8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The copyWithin method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    copyWithin(target: number, start: number, end?: number): Int8Array;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     *
     * @param { TypedArrayPredicateFn<number, Int8Array> } predicate - A function that accepts up to three arguments.
     *     The every method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
     * @returns { boolean } true unless predicate returns a false value for a typed array element,
     *     in which case false is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The every method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    every(predicate: TypedArrayPredicateFn<number, Int8Array>): boolean;
    /**
     * Returns the this object after filling the section identified by start and end with value.
     *
     * @param { number } value - value to fill array section with.
     * @param { number } [start] - index to start filling the array at. If start is negative, it is treated as
     *     length+start where length is the length of the array.
     * @param { number } [end] - index to stop filling the array at. If end is negative, it is treated as
     *     length+end.
     * @returns { Int8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The fill method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fill(value: number, start?: number, end?: number): Int8Array;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param { TypedArrayPredicateFn<number, Int8Array> } predicate - A function that accepts up to three arguments.
     *     The filter method calls the predicate function one time for each element in the array.
     * @returns { Int8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The filter method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    filter(predicate: TypedArrayPredicateFn<number, Int8Array>): Int8Array;
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Int8Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true.
     *     If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @returns { number | undefined } The first element in the typed array
     *     that satisfies the provided testing function. Otherwise, undefined is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The find method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    find(predicate: TypedArrayPredicateFn<number, Int8Array>): number | undefined;
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Int8Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true. If such an element is found,
     *     findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @returns { number } The index of the first element in the typed array that passes the test. Otherwise, -1.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The findIndex method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    findIndex(predicate: TypedArrayPredicateFn<number, Int8Array>): number;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param { TypedArrayForEachCallback<number, Int8Array> } callbackFn -  A function that
     *     accepts up to three arguments.
     *     forEach calls the callbackfn function one time for each element in the array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: TypedArrayForEachCallback<number, Int8Array>): void;
    /**
     * Returns the index of the first occurrence of a value in an array.
     *
     * @param { number } searchElement - The value to locate in the array.
     * @param { number } [fromIndex] - The array index at which to begin the search. If fromIndex is omitted, the
     *      search starts at index 0.
     * @returns { number } The first index of searchElement in the typed array; -1 if not found.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The indexOf method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indexOf(searchElement: number, fromIndex?: number): number;
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param { string } [separator] - A string used to separate one element of an array from the next in the
     *     resulting String. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all typed array elements joined.
     *     If array.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The join method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     *
     * @param { TypedArrayForEachCallback<number, Int8Array> } callbackFn - A function that
     *     accepts up to three arguments.
     *     The map method calls the callbackfn function one time for each element in the array.
     * @returns { Int8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The map method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    map(callbackFn: TypedArrayForEachCallback<number, Int8Array>): Int8Array;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Int8Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int8Array>): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Int8Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { number } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int8Array>, initialValue: number): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<U, number, Int8Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { U } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { U } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Int8Array>, initialValue: U): U;
    /**
     * Reverses the elements in an Array.
     *
     * @returns { Int8Array } The reference to the original typed array, now reversed.
     *     <br>Note that the typed array is reversed in place, and no copy is made.
     * @throws { BusinessError } 10200011 - The reverse method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reverse(): Int8Array;
    /**
     * Sets a value or an array of values.
     *
     * @param { ArrayLike<number> } array - A typed or untyped array of values to set.
     * @param { number } [offset] - The index in the current array at which the values are to be written.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(array: ArrayLike<number>, offset?: number): void;
    /**
     * Returns a section of an array.
     *
     * @param { number } [start] - The beginning of the specified portion of the array.
     * @param { number } [end] - The end of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     * @returns { Int8Array } A new typed array containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(start?: number, end?: number): Int8Array;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     *
     * @param { TypedArrayPredicateFn<number, Int8Array> } predicate - A function that accepts up to three arguments.
     *     The some method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
     * @returns { boolean } false unless predicate returns a truthy value for a typed array element,
     *     in which case true is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The some method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    some(predicate: TypedArrayPredicateFn<number, Int8Array>): boolean;
    /**
     * Sorts an array.
     *
     * @param { TypedArrayCompareFn<number> } [compareFn] - Function used to determine the order of the elements.
     *     It is expected to return a negative value if first argument is less than second argument,
     *     zero if they're equal and a positive value otherwise.
     *     If omitted, the elements are sorted in ascending, ASCII character order.
     * @returns { Int8Array } The reference to the original typed array, now sorted.
     *     Note that the typed array is sorted in place and no copy is made.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The sort method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    sort(compareFn?: TypedArrayCompareFn<number>): Int8Array;
    /**
     * Gets a new Int8Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     *
     * @param { number } [begin] - The index of the beginning of the array.
     * @param { number } [end] - The index of the end of the array.
     * @returns { Int8Array } A new Int8Array object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The subarray method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    subarray(begin?: number, end?: number): Int8Array;
    /**
     * Returns the item located at the specified index.
     *
     * @param { number } index - The zero-based index of the desired code unit.<br/>
     *     A negative index will count back from the last item.
     * @returns { number | undefined } The element in the array matching the given index.<br/>
     *     Always returns undefined if index < -array.length or
     *     index >= array.length without attempting to access the corresponding property.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    at(index: number): number | undefined;
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     *
     * @returns { IterableIterator<[number, number]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an iterable of keys in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an iterable of values in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<number>;
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     *
     * @param { number } searchElement - The element to search for.
     * @param { number } [fromIndex] - The position in this array at which to begin searching for searchElement.
     * @returns { boolean } A boolean value which is true if the value searchElement is found <br/>
     *     within the typed array (or the part of the typed array indicated by the index fromIndex, if specified).
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    includes(searchElement: number, fromIndex?: number): boolean;
    /**
     * Returns the item at that index.
     * 
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [index: number]: number;
  }

  /**
   * A typed array of 8-bit unsigned integer values. The contents are initialized to 0.
   * If multiple threads access a Uint8Array instance concurrently, 
   * and at least one of the threads modifies the array structurally,
   * it must be synchronized externally.
   *
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Uint8Array {
    /**
     * The size in bytes of each element in the array.
     *
     * @type { number }
     * @readonly
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static readonly BYTES_PER_ELEMENT: number;
    /**
     * The ArrayBuffer instance referenced by the array.
     *
     * @type { ArrayBuffer }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly buffer: ArrayBuffer;
    /**
     * The length in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteLength: number;
    /**
     * The offset in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteOffset: number;
    /**
     * The length of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly length: number;
    /**
     * A constructor used to create an Uint8Array.
     *
     * @throws { BusinessError } 10200012 - The Uint8Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * A constructor used to create an Uint8Array.
     *
     * @param { number } length - The length of the array
     * @throws { BusinessError } 10200012 - The Uint8Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(length: number);
    /**
     * A constructor used to create an Uint8Array.
     *
     * @param { ArrayLike<number> | ArrayBuffer } array - An array is initialized with the given elements
     * @throws { BusinessError } 10200012 - The Uint8Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(array: ArrayLike<number> | ArrayBuffer);
    /**
     * A constructor used to create an Uint8Array.
     *
     * @param { ArrayBuffer } buffer - An array is initialized with the given elements
     * @param { number } [byteOffset] - The byteOffset (in bytes) parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @param { number } [length] - The length parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @throws { BusinessError } 10200012 - The Uint8Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    /**
     * Creates an Uint8Array from an array-like object.
     *
     * @param { ArrayLike<number> } arrayLike - An array-like object to convert to an Uint8Array.
     * @returns { Uint8Array } A new Uint8Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: ArrayLike<number>): Uint8Array;
    /**
     * Creates an Uint8Array from an array-like object.
     *
     * @param { ArrayLike<T> } arrayLike - An array-like object to convert to an Uint8Array.
     * @param { TypedArrayFromMapFn<T, number> } mapFn - A mapping function to call on every element of the array.
     * @returns { Uint8Array } A new Uint8Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Uint8Array;
    /**
     * Creates an Uint8Array from an iterable object.
     *
     * @param { Iterable<number> } arrayLike - An iterable object to convert to an Uint8Array.
     * @param { TypedArrayFromMapFn<number, number> } [mapFn] - A mapping function to
     * call on every element of the array.
     * @returns { Uint8Array } A new Uint8Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Uint8Array;
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target.
     *
     * @param { number } target - If target is negative, it is treated as length+target where length is the
     *     length of the array.
     * @param { number } start - If start is negative, it is treated as length+start. If end is negative, it
     *     is treated as length+end.
     * @param { number } [end] - If not specified, length of the this object is used as its default value.
     * @returns { Uint8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The copyWithin method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    copyWithin(target: number, start: number, end?: number): Uint8Array;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     *
     * @param { TypedArrayPredicateFn<number, Uint8Array> } predicate - A function that accepts up to three arguments.
     *     The every method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
     * @returns { boolean } true unless predicate returns a false value for a typed array element,
     *     in which case false is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The every method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    every(predicate: TypedArrayPredicateFn<number, Uint8Array>): boolean;
    /**
     * Returns the this object after filling the section identified by start and end with value.
     *
     * @param { number } value - value to fill array section with.
     * @param { number } [start] - index to start filling the array at. If start is negative, it is treated as
     *     length+start where length is the length of the array.
     * @param { number } [end] - index to stop filling the array at. If end is negative, it is treated as
     *     length+end.
     * @returns { Uint8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The fill method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fill(value: number, start?: number, end?: number): Uint8Array;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param { TypedArrayPredicateFn<number, Uint8Array> } predicate - A function that accepts up to three arguments.
     *     The filter method calls the predicate function one time for each element in the array.
     * @returns { Uint8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The filter method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    filter(predicate: TypedArrayPredicateFn<number, Uint8Array>): Uint8Array;
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Uint8Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true.
     *     If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @returns { number | undefined } The first element in the typed array
     *      that satisfies the provided testing function. Otherwise, undefined is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The find method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    find(predicate: TypedArrayPredicateFn<number, Uint8Array>): number | undefined;
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Uint8Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true. If such an element is found,
     *     findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @returns { number } The index of the first element in the typed array that passes the test. Otherwise, -1.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The findIndex method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    findIndex(predicate: TypedArrayPredicateFn<number, Uint8Array>): number;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param { TypedArrayForEachCallback<number, Uint8Array> } callbackFn -  A function that
     *     accepts up to three arguments.
     *     forEach calls the callbackfn function one time for each element in the array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: TypedArrayForEachCallback<number, Uint8Array>): void;
    /**
     * Returns the index of the first occurrence of a value in an array.
     *
     * @param { number } searchElement - The value to locate in the array.
     * @param { number } [fromIndex] - The array index at which to begin the search. If fromIndex is omitted, the
     *      search starts at index 0.
     * @returns { number } The first index of searchElement in the typed array; -1 if not found.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The indexOf method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indexOf(searchElement: number, fromIndex?: number): number;
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param { string } [separator] - A string used to separate one element of an array from the next in the
     *     resulting String. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all typed array elements joined.
     *     If array.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The join method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     *
     * @param { TypedArrayForEachCallback<number, Uint8Array> } callbackFn - A function that
     *     accepts up to three arguments.
     *     The map method calls the callbackfn function one time for each element in the array.
     * @returns { Uint8Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The map method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    map(callbackFn: TypedArrayForEachCallback<number, Uint8Array>): Uint8Array;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Uint8Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint8Array>): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Uint8Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { number } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint8Array>, initialValue: number): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<U, number, Uint8Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { U } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { U } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Uint8Array>, initialValue: U): U;
    /**
     * Reverses the elements in an Array.
     *
     * @returns { Uint8Array } The reference to the original typed array, now reversed.
     *     <br>Note that the typed array is reversed in place, and no copy is made.
     * @throws { BusinessError } 10200011 - The reverse method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reverse(): Uint8Array;
    /**
     * Sets a value or an array of values.
     *
     * @param { ArrayLike<number> } array - A typed or untyped array of values to set.
     * @param { number } [offset] - The index in the current array at which the values are to be written.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(array: ArrayLike<number>, offset?: number): void;
    /**
     * Returns a section of an array.
     *
     * @param { number } [start] - The beginning of the specified portion of the array.
     * @param { number } [end] - The end of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     * @returns { Uint8Array } A new typed array containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(start?: number, end?: number): Uint8Array;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     *
     * @param { TypedArrayPredicateFn<number, Uint8Array> } predicate - A function that accepts up to three arguments.
     *     The some method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
     * @returns { boolean } false unless predicate returns a truthy value for a typed array element,
     *     in which case true is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The some method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    some(predicate: TypedArrayPredicateFn<number, Uint8Array>): boolean;
    /**
     * Sorts an array.
     *
     * @param { TypedArrayCompareFn<number> } [compareFn] - Function used to determine the order of the elements.
     *     It is expected to return a negative value if first argument is less than second argument,
     *     zero if they're equal and a positive value otherwise.
     *     If omitted, the elements are sorted in ascending, ASCII character order.
     * @returns { Uint8Array } The reference to the original typed array, now sorted.
     *     Note that the typed array is sorted in place and no copy is made.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The sort method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    sort(compareFn?: TypedArrayCompareFn<number>): Uint8Array;
    /**
     * Gets a new Uint8Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     *
     * @param { number } [begin] - The index of the beginning of the array.
     * @param { number } [end] - The index of the end of the array.
     * @returns { Uint8Array } A new Uint8Array object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The subarray method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    subarray(begin?: number, end?: number): Uint8Array;
    /**
     * Returns the item located at the specified index.
     *
     * @param { number } index - The zero-based index of the desired code unit.<br/>
     *     A negative index will count back from the last item.
     * @returns { number | undefined } The element in the array matching the given index.<br/>
     *     Always returns undefined if index < -array.length or
     *     index >= array.length without attempting to access the corresponding property.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    at(index: number): number | undefined;
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     *
     * @returns { IterableIterator<[number, number]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an iterable of keys in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an iterable of values in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<number>;
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     *
     * @param { number } searchElement - The element to search for.
     * @param { number } [fromIndex] - The position in this array at which to begin searching for searchElement.
     * @returns { boolean } A boolean value which is true if the value searchElement is found <br/>
     *     within the typed array (or the part of the typed array indicated by the index fromIndex, if specified).
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    includes(searchElement: number, fromIndex?: number): boolean;
    /**
     * Returns the item at that index.
     * 
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [index: number]: number;
  }

  /**
   * A typed array of 16-bit integer values. The contents are initialized to 0.
   * If multiple threads access a Int16Array instance concurrently, 
   * and at least one of the threads modifies the array structurally,
   * it must be synchronized externally. 
   *
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Int16Array {
    /**
     * The size in bytes of each element in the array.
     *
     * @type { number }
     * @readonly
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static readonly BYTES_PER_ELEMENT: number;
    /**
     * The ArrayBuffer instance referenced by the array.
     *
     * @type { ArrayBuffer }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly buffer: ArrayBuffer;
    /**
     * The length in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteLength: number;
    /**
     * The offset in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteOffset: number;
    /**
     * The length of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly length: number;
    /**
     * A constructor used to create an Int16Array.
     *
     * @throws { BusinessError } 10200012 - The Int16Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * A constructor used to create an Int16Array.
     *
     * @param { number } length - The length of the array
     * @throws { BusinessError } 10200012 - The Int16Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(length: number);
    /**
     * A constructor used to create an Int16Array.
     *
     * @param { ArrayLike<number> | ArrayBuffer } array - An array is initialized with the given elements
     * @throws { BusinessError } 10200012 - The Int16Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(array: ArrayLike<number> | ArrayBuffer);
    /**
     * A constructor used to create an Int16Array.
     *
     * @param { ArrayBuffer } buffer - An array is initialized with the given elements
     * @param { number } [byteOffset] - The byteOffset (in bytes) parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @param { number } [length] - The length parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @throws { BusinessError } 10200012 - The Int16Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    /**
     * Creates an Int16Array from an array-like object.
     *
     * @param { ArrayLike<number> } arrayLike - An array-like object to convert to an Int16Array.
     * @returns { Int16Array } A new Int16Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: ArrayLike<number>): Int16Array;
    /**
     * Creates an Int16Array from an array-like object.
     *
     * @param { ArrayLike<T> } arrayLike - An array-like object to convert to an Int16Array.
     * @param { TypedArrayFromMapFn<T, number> } mapFn - A mapping function to call on every element of the array.
     * @returns { Int16Array } A new Int16Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Int16Array;
    /**
     * Creates an Int16Array from an iterable object.
     *
     * @param { Iterable<number> } arrayLike - An iterable object to convert to an Int16Array.
     * @param { TypedArrayFromMapFn<number, number> } [mapFn] - A mapping function to
     *     call on every element of the array.
     * @returns { Int16Array } A new Int16Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Int16Array;
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target.
     *
     * @param { number } target - If target is negative, it is treated as length+target where length is the
     *     length of the array.
     * @param { number } start - If start is negative, it is treated as length+start. If end is negative, it
     *     is treated as length+end.
     * @param { number } [end] - If not specified, length of the this object is used as its default value.
     * @returns { Int16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The copyWithin method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    copyWithin(target: number, start: number, end?: number): Int16Array;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     *
     * @param { TypedArrayPredicateFn<number, Int16Array> } predicate - A function that accepts up to three arguments.
     *     The every method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
     * @returns { boolean } true unless predicate returns a false value for a typed array element,
     *     in which case false is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The every method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    every(predicate: TypedArrayPredicateFn<number, Int16Array>): boolean;
    /**
     * Returns the this object after filling the section identified by start and end with value.
     *
     * @param { number } value - value to fill array section with.
     * @param { number } [start] - index to start filling the array at. If start is negative, it is treated as
     *     length+start where length is the length of the array.
     * @param { number } [end] - index to stop filling the array at. If end is negative, it is treated as
     *     length+end.
     * @returns { Int16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The fill method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fill(value: number, start?: number, end?: number): Int16Array;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param { TypedArrayPredicateFn<number, Int16Array> } predicate - A function that accepts up to three arguments.
     *     The filter method calls the predicate function one time for each element in the array.
     * @returns { Int16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The filter method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    filter(predicate: TypedArrayPredicateFn<number, Int16Array>): Int16Array;
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Int16Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true.
     *     If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @returns { number | undefined } The first element in the typed array
     *     that satisfies the provided testing function. Otherwise, undefined is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The find method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    find(predicate: TypedArrayPredicateFn<number, Int16Array>): number | undefined;
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Int16Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true. If such an element is found,
     *     findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @returns { number } The index of the first element in the typed array that passes the test. Otherwise, -1.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The findIndex method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    findIndex(predicate: TypedArrayPredicateFn<number, Int16Array>): number;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param { TypedArrayForEachCallback<number, Int16Array> } callbackFn -  A function that
     *     accepts up to three arguments.
     *     forEach calls the callbackfn function one time for each element in the array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: TypedArrayForEachCallback<number, Int16Array>): void;
    /**
     * Returns the index of the first occurrence of a value in an array.
     *
     * @param { number } searchElement - The value to locate in the array.
     * @param { number } [fromIndex] - The array index at which to begin the search. If fromIndex is omitted, the
     *      search starts at index 0.
     * @returns { number } The first index of searchElement in the typed array; -1 if not found.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The indexOf method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indexOf(searchElement: number, fromIndex?: number): number;
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param { string } [separator] - A string used to separate one element of an array from the next in the
     *     resulting String. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all typed array elements joined.
     *     If array.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The join method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     *
     * @param { TypedArrayForEachCallback<number, Int16Array> } callbackFn - A function that
     *     accepts up to three arguments.
     *     The map method calls the callbackfn function one time for each element in the array.
     * @returns { Int16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The map method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    map(callbackFn: TypedArrayForEachCallback<number, Int16Array>): Int16Array;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Int16Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int16Array>): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Int16Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { number } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int16Array>, initialValue: number): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<U, number, Int16Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { U } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { U } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Int16Array>, initialValue: U): U;
    /**
     * Reverses the elements in an Array.
     *
     * @returns { Int16Array } The reference to the original typed array, now reversed.
     *     <br>Note that the typed array is reversed in place, and no copy is made.
     * @throws { BusinessError } 10200011 - The reverse method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reverse(): Int16Array;
    /**
     * Sets a value or an array of values.
     *
     * @param { ArrayLike<number> } array - A typed or untyped array of values to set.
     * @param { number } [offset] - The index in the current array at which the values are to be written.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(array: ArrayLike<number>, offset?: number): void;
    /**
     * Returns a section of an array.
     *
     * @param { number } [start] - The beginning of the specified portion of the array.
     * @param { number } [end] - The end of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     * @returns { Int16Array } A new typed array containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(start?: number, end?: number): Int16Array;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     *
     * @param { TypedArrayPredicateFn<number, Int16Array> } predicate - A function that accepts up to three arguments.
     *     The some method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
     * @returns { boolean } false unless predicate returns a truthy value for a typed array element,
     *     in which case true is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The some method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    some(predicate: TypedArrayPredicateFn<number, Int16Array>): boolean;
    /**
     * Sorts an array.
     *
     * @param { TypedArrayCompareFn<number> } [compareFn] - Function used to determine the order of the elements.
     *     It is expected to return a negative value if first argument is less than second argument,
     *     zero if they're equal and a positive value otherwise.
     *     If omitted, the elements are sorted in ascending, ASCII character order.
     * @returns { Int16Array } The reference to the original typed array, now sorted.
     *     Note that the typed array is sorted in place and no copy is made.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The sort method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    sort(compareFn?: TypedArrayCompareFn<number>): Int16Array;
    /**
     * Gets a new Int16Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     *
     * @param { number } [begin] - The index of the beginning of the array.
     * @param { number } [end] - The index of the end of the array.
     * @returns { Int16Array } A new Int16Array object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The subarray method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    subarray(begin?: number, end?: number): Int16Array;
    /**
     * Returns the item located at the specified index.
     *
     * @param { number } index - The zero-based index of the desired code unit.<br/>
     *     A negative index will count back from the last item.
     * @returns { number | undefined } The element in the array matching the given index.<br/>
     *     Always returns undefined if index < -array.length or
     *     index >= array.length without attempting to access the corresponding property.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    at(index: number): number | undefined;
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     *
     * @returns { IterableIterator<[number, number]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an iterable of keys in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an iterable of values in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<number>;
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     *
     * @param { number } searchElement - The element to search for.
     * @param { number } [fromIndex] - The position in this array at which to begin searching for searchElement.
     * @returns { boolean } A boolean value which is true if the value searchElement is found <br/>
     *     within the typed array (or the part of the typed array indicated by the index fromIndex, if specified).
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    includes(searchElement: number, fromIndex?: number): boolean;
    /**
     * Returns the item at that index.
     * 
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [index: number]: number;
  }

  /**
   * A typed array of 16-bit unsigned integer values. The contents are initialized to 0.
   * If multiple threads access a Uint16Array instance concurrently, 
   * and at least one of the threads modifies the array structurally,
   * it must be synchronized externally. 
   *
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Uint16Array {
    /**
     * The size in bytes of each element in the array.
     *
     * @type { number }
     * @readonly
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static readonly BYTES_PER_ELEMENT: number;
    /**
     * The ArrayBuffer instance referenced by the array.
     *
     * @type { ArrayBuffer }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly buffer: ArrayBuffer;
    /**
     * The length in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteLength: number;
    /**
     * The offset in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteOffset: number;
    /**
     * The length of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly length: number;
    /**
     * A constructor used to create an Uint16Array.
     *
     * @throws { BusinessError } 10200012 - The Uint16Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * A constructor used to create an Uint16Array.
     *
     * @param { number } length - The length of the array
     * @throws { BusinessError } 10200012 - The Uint16Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(length: number);
    /**
     * A constructor used to create an Uint16Array.
     *
     * @param { ArrayLike<number> | ArrayBuffer } array - An array is initialized with the given elements
     * @throws { BusinessError } 10200012 - The Uint16Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(array: ArrayLike<number> | ArrayBuffer);
    /**
     * A constructor used to create an Uint16Array.
     *
     * @param { ArrayBuffer } buffer - An array is initialized with the given elements
     * @param { number } [byteOffset] - The byteOffset (in bytes) parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @param { number } [length] - The length parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @throws { BusinessError } 10200012 - The Uint16Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    /**
     * Creates an Uint16Array from an array-like object.
     *
     * @param { ArrayLike<number> } arrayLike - An array-like object to convert to an Uint16Array.
     * @returns { Uint16Array } A new Uint16Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: ArrayLike<number>): Uint16Array;
    /**
     * Creates an Uint16Array from an array-like object.
     *
     * @param { ArrayLike<T> } arrayLike - An array-like object to convert to an Uint16Array.
     * @param { TypedArrayFromMapFn<T, number> } mapFn - A mapping function to call on every element of the array.
     * @returns { Uint16Array } A new Uint16Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Uint16Array;
    /**
     * Creates an Uint16Array from an iterable object.
     *
     * @param { Iterable<number> } arrayLike - An iterable object to convert to an Uint16Array.
     * @param { TypedArrayFromMapFn<number, number> } [mapFn] - A mapping function to
     *     call on every element of the array.
     * @returns { Uint16Array } A new Uint16Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Uint16Array;
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target.
     *
     * @param { number } target - If target is negative, it is treated as length+target where length is the
     *     length of the array.
     * @param { number } start - If start is negative, it is treated as length+start. If end is negative, it
     *     is treated as length+end.
     * @param { number } [end] - If not specified, length of the this object is used as its default value.
     * @returns { Uint16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The copyWithin method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    copyWithin(target: number, start: number, end?: number): Uint16Array;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     *
     * @param { TypedArrayPredicateFn<number, Uint16Array> } predicate - A function that accepts up to three arguments.
     *     The every method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
     * @returns { boolean } true unless predicate returns a false value for a typed array element,
     *     in which case false is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The every method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    every(predicate: TypedArrayPredicateFn<number, Uint16Array>): boolean;
    /**
     * Returns the this object after filling the section identified by start and end with value.
     *
     * @param { number } value - value to fill array section with.
     * @param { number } [start] - index to start filling the array at. If start is negative, it is treated as
     *     length+start where length is the length of the array.
     * @param { number } [end] - index to stop filling the array at. If end is negative, it is treated as
     *     length+end.
     * @returns { Uint16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The fill method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fill(value: number, start?: number, end?: number): Uint16Array;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param { TypedArrayPredicateFn<number, Uint16Array> } predicate - A function that accepts up to three arguments.
     *     The filter method calls the predicate function one time for each element in the array.
     * @returns { Uint16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The filter method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    filter(predicate: TypedArrayPredicateFn<number, Uint16Array>): Uint16Array;
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Uint16Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true.
     *     If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @returns { number | undefined } The first element in the typed array
     *     that satisfies the provided testing function. Otherwise, undefined is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The find method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    find(predicate: TypedArrayPredicateFn<number, Uint16Array>): number | undefined;
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Uint16Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true. If such an element is found,
     *     findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @returns { number } The index of the first element in the typed array that passes the test. Otherwise, -1.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The findIndex method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    findIndex(predicate: TypedArrayPredicateFn<number, Uint16Array>): number;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param { TypedArrayForEachCallback<number, Uint16Array> } callbackFn -  A function that
     *     accepts up to three arguments.
     *     forEach calls the callbackfn function one time for each element in the array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: TypedArrayForEachCallback<number, Uint16Array>): void;
    /**
     * Returns the index of the first occurrence of a value in an array.
     *
     * @param { number } searchElement - The value to locate in the array.
     * @param { number } [fromIndex] - The array index at which to begin the search. If fromIndex is omitted, the
     *      search starts at index 0.
     * @returns { number } The first index of searchElement in the typed array; -1 if not found.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The indexOf method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indexOf(searchElement: number, fromIndex?: number): number;
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param { string } [separator] - A string used to separate one element of an array from the next in the
     *     resulting String. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all typed array elements joined.
     *     If array.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The join method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     *
     * @param { TypedArrayForEachCallback<number, Uint16Array> } callbackFn - A function that accepts up to
     *     three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @returns { Uint16Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The map method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    map(callbackFn: TypedArrayForEachCallback<number, Uint16Array>): Uint16Array;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Uint16Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint16Array>): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Uint16Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { number } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint16Array>, initialValue: number): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<U, number, Uint16Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { U } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { U } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Uint16Array>, initialValue: U): U;
    /**
     * Reverses the elements in an Array.
     *
     * @returns { Uint16Array } The reference to the original typed array, now reversed.
     *     <br/>Note that the typed array is reversed in place, and no copy is made.
     * @throws { BusinessError } 10200011 - The reverse method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reverse(): Uint16Array;
    /**
     * Sets a value or an array of values.
     *
     * @param { ArrayLike<number> } array - A typed or untyped array of values to set.
     * @param { number } [offset] - The index in the current array at which the values are to be written.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(array: ArrayLike<number>, offset?: number): void;
    /**
     * Returns a section of an array.
     *
     * @param { number } [start] - The beginning of the specified portion of the array.
     * @param { number } [end] - The end of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     * @returns { Uint16Array } A new typed array containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(start?: number, end?: number): Uint16Array;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     *
     * @param { TypedArrayPredicateFn<number, Uint16Array> } predicate - A function that accepts up to three arguments.
     *     The some method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
     * @returns { boolean } false unless predicate returns a truthy value for a typed array element,
     *     in which case true is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The some method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    some(predicate: TypedArrayPredicateFn<number, Uint16Array>): boolean;
    /**
     * Sorts an array.
     *
     * @param { TypedArrayCompareFn<number> } [compareFn] - Function used to determine the order of the elements.
     *     It is expected to return a negative value if first argument is less than second argument,
     *     zero if they're equal and a positive value otherwise.
     *     If omitted, the elements are sorted in ascending, ASCII character order.
     * @returns { Uint16Array } The reference to the original typed array, now sorted.
     *     Note that the typed array is sorted in place and no copy is made.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The sort method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    sort(compareFn?: TypedArrayCompareFn<number>): Uint16Array;
    /**
     * Gets a new Uint16Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     *
     * @param { number } [begin] - The index of the beginning of the array.
     * @param { number } [end] - The index of the end of the array.
     * @returns { Uint16Array } A new Uint16Array object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The subarray method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    subarray(begin?: number, end?: number): Uint16Array;
    /**
     * Returns the item located at the specified index.
     *
     * @param { number } index - The zero-based index of the desired code unit.<br/>
     *     A negative index will count back from the last item.
     * @returns { number | undefined } The element in the array matching the given index.<br/>
     *     Always returns undefined if index < -array.length or
     *     index >= array.length without attempting to access the corresponding property.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    at(index: number): number | undefined;
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     *
     * @returns { IterableIterator<[number, number]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an iterable of keys in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an iterable of values in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<number>;
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     *
     * @param { number } searchElement - The element to search for.
     * @param { number } [fromIndex] - The position in this array at which to begin searching for searchElement.
     * @returns { boolean } A boolean value which is true if the value searchElement is found <br/>
     *     within the typed array (or the part of the typed array indicated by the index fromIndex, if specified).
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    includes(searchElement: number, fromIndex?: number): boolean;
    /**
     * Returns the item at that index.
     * 
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [index: number]: number;
  }

  /**
   * A typed array of 32-bit integer values. The contents are initialized to 0.
   * If multiple threads access a Int32Array instance concurrently, 
   * and at least one of the threads modifies the array structurally,
   * it must be synchronized externally. 
   *
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Int32Array {
    /**
     * The size in bytes of each element in the array.
     *
     * @type { number }
     * @readonly
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static readonly BYTES_PER_ELEMENT: number;
    /**
     * The ArrayBuffer instance referenced by the array.
     *
     * @type { ArrayBuffer }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly buffer: ArrayBuffer;
    /**
     * The length in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteLength: number;
    /**
     * The offset in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteOffset: number;
    /**
     * The length of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly length: number;
    /**
     * A constructor used to create an Int32Array.
     *
     * @throws { BusinessError } 10200012 - The Int32Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * A constructor used to create an Int32Array.
     *
     * @param { number } length - The length of the array
     * @throws { BusinessError } 10200012 - The Int32Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(length: number);
    /**
     * A constructor used to create an Int32Array.
     *
     * @param { ArrayLike<number> | ArrayBuffer } array - An array is initialized with the given elements
     * @throws { BusinessError } 10200012 - The Int32Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(array: ArrayLike<number> | ArrayBuffer);
    /**
     * A constructor used to create an Int32Array.
     *
     * @param { ArrayBuffer } buffer - An array is initialized with the given elements
     * @param { number } [byteOffset] - The byteOffset (in bytes) parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @param { number } [length] - The length parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @throws { BusinessError } 10200012 - The Int32Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    /**
     * Creates an Int32Array from an array-like object.
     *
     * @param { ArrayLike<number> } arrayLike - An array-like object to convert to an Int32Array.
     * @returns { Int32Array } A new Int32Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: ArrayLike<number>): Int32Array;
    /**
     * Creates an Int32Array from an array-like object.
     *
     * @param { ArrayLike<T> } arrayLike - An array-like object to convert to an Int32Array.
     * @param { TypedArrayFromMapFn<T, number> } mapFn - A mapping function to call on every element of the array.
     * @returns { Int32Array } A new Int32Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Int32Array;
    /**
     * Creates an Int32Array from an iterable object.
     *
     * @param { Iterable<number> } arrayLike - An iterable object to convert to an Int32Array.
     * @param { TypedArrayFromMapFn<number, number> } [mapFn] - A mapping function to
     *     call on every element of the array.
     * @returns { Int32Array } A new Int32Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Int32Array;
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target.
     *
     * @param { number } target - If target is negative, it is treated as length+target where length is the
     *     length of the array.
     * @param { number } start - If start is negative, it is treated as length+start. If end is negative, it
     *     is treated as length+end.
     * @param { number } [end] - If not specified, length of the this object is used as its default value.
     * @returns { Int32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The copyWithin method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    copyWithin(target: number, start: number, end?: number): Int32Array;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     *
     * @param { TypedArrayPredicateFn<number, Int32Array> } predicate - A function that accepts up to three arguments.
     *     The every method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
     * @returns { boolean } true unless predicate returns a false value for a typed array element,
     *     in which case false is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The every method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    every(predicate: TypedArrayPredicateFn<number, Int32Array>): boolean;
    /**
     * Returns the this object after filling the section identified by start and end with value.
     *
     * @param { number } value - value to fill array section with.
     * @param { number } [start] - index to start filling the array at. If start is negative, it is treated as
     *     length+start where length is the length of the array.
     * @param { number } [end] - index to stop filling the array at. If end is negative, it is treated as
     *     length+end.
     * @returns { Int32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The fill method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fill(value: number, start?: number, end?: number): Int32Array;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param { TypedArrayPredicateFn<number, Int32Array> } predicate - A function that accepts up to three arguments.
     *     The filter method calls the predicate function one time for each element in the array.
     * @returns { Int32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The filter method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    filter(predicate: TypedArrayPredicateFn<number, Int32Array>): Int32Array;
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Int32Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true.
     *     If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @returns { number | undefined } The first element in the typed array
     *     that satisfies the provided testing function. Otherwise, undefined is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The find method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    find(predicate: TypedArrayPredicateFn<number, Int32Array>): number | undefined;
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Int32Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true. If such an element is found,
     *     findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @returns { number } The index of the first element in the typed array that passes the test. Otherwise, -1.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The findIndex method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    findIndex(predicate: TypedArrayPredicateFn<number, Int32Array>): number;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param { TypedArrayForEachCallback<number, Int32Array> } callbackFn -  A function that
     *     accepts up to three arguments.
     *     forEach calls the callbackfn function one time for each element in the array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: TypedArrayForEachCallback<number, Int32Array>): void;
    /**
     * Returns the index of the first occurrence of a value in an array.
     *
     * @param { number } searchElement - The value to locate in the array.
     * @param { number } [fromIndex] - The array index at which to begin the search. If fromIndex is omitted, the
     *      search starts at index 0.
     * @returns { number } The first index of searchElement in the typed array; -1 if not found.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The indexOf method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indexOf(searchElement: number, fromIndex?: number): number;
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param { string } [separator] - A string used to separate one element of an array from the next in the
     *     resulting String. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all typed array elements joined.
     *     If array.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The join method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     *
     * @param { TypedArrayForEachCallback<number, Int32Array> } callbackFn - A function that
     *     accepts up to three arguments.
     *     The map method calls the callbackfn function one time for each element in the array.
     * @returns { Int32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The map method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    map(callbackFn: TypedArrayForEachCallback<number, Int32Array>): Int32Array;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Int32Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int32Array>): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Int32Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { number } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int32Array>, initialValue: number): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<U, number, Int32Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { U } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { U } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Int32Array>, initialValue: U): U;
    /**
     * Reverses the elements in an Array.
     *
     * @returns { Int32Array } The reference to the original typed array, now reversed.
     *     <br/>Note that the typed array is reversed in place, and no copy is made.
     * @throws { BusinessError } 10200011 - The reverse method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reverse(): Int32Array;
    /**
     * Sets a value or an array of values.
     *
     * @param { ArrayLike<number> } array - A typed or untyped array of values to set.
     * @param { number } [offset] - The index in the current array at which the values are to be written.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(array: ArrayLike<number>, offset?: number): void;
    /**
     * Returns a section of an array.
     *
     * @param { number } [start] - The beginning of the specified portion of the array.
     * @param { number } [end] - The end of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     * @returns { Int32Array } A new typed array containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(start?: number, end?: number): Int32Array;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     *
     * @param { TypedArrayPredicateFn<number, Int32Array> } predicate - A function that accepts up to three arguments.
     *     The some method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
     * @returns { boolean } false unless predicate returns a truthy value for a typed array element,
     *     in which case true is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The some method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    some(predicate: TypedArrayPredicateFn<number, Int32Array>): boolean;
    /**
     * Sorts an array.
     *
     * @param { TypedArrayCompareFn<number> } [compareFn] - Function used to determine the order of the elements.
     *     It is expected to return a negative value if first argument is less than second argument,
     *     zero if they're equal and a positive value otherwise.
     *     If omitted, the elements are sorted in ascending, ASCII character order.
     * @returns { Int32Array } The reference to the original typed array, now sorted.
     *     Note that the typed array is sorted in place and no copy is made.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The sort method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    sort(compareFn?: TypedArrayCompareFn<number>): Int32Array;
    /**
     * Gets a new Int32Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     *
     * @param { number } [begin] - The index of the beginning of the array.
     * @param { number } [end] - The index of the end of the array.
     * @returns { Int32Array } A new Int32Array object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The subarray method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    subarray(begin?: number, end?: number): Int32Array;
    /**
     * Returns the item located at the specified index.
     *
     * @param { number } index - The zero-based index of the desired code unit.<br/>
     *     A negative index will count back from the last item.
     * @returns { number | undefined } The element in the array matching the given index.<br/>
     *     Always returns undefined if index < -array.length or
     *     index >= array.length without attempting to access the corresponding property.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    at(index: number): number | undefined;
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     *
     * @returns { IterableIterator<[number, number]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an iterable of keys in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an iterable of values in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<number>;
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     *
     * @param { number } searchElement - The element to search for.
     * @param { number } [fromIndex] - The position in this array at which to begin searching for searchElement.
     * @returns { boolean } A boolean value which is true if the value searchElement is found <br/>
     *     within the typed array (or the part of the typed array indicated by the index fromIndex, if specified).
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    includes(searchElement: number, fromIndex?: number): boolean;
    /**
     * Returns the item at that index.
     * 
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [index: number]: number;
  }

  /**
   * A typed array of 32-bit unsigned integer values. The contents are initialized to 0.
   * If multiple threads access a Uint32Array instance concurrently, 
   * and at least one of the threads modifies the array structurally,
   * it must be synchronized externally. 
   *
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  @Sendable
  class Uint32Array {
    /**
     * The size in bytes of each element in the array.
     *
     * @type { number }
     * @readonly
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static readonly BYTES_PER_ELEMENT: number;
    /**
     * The ArrayBuffer instance referenced by the array.
     *
     * @type { ArrayBuffer }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly buffer: ArrayBuffer;
    /**
     * The length in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteLength: number;
    /**
     * The offset in bytes of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly byteOffset: number;
    /**
     * The length of the array.
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    readonly length: number;
    /**
     * A constructor used to create an Uint32Array.
     *
     * @throws { BusinessError } 10200012 - The Uint32Array's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * A constructor used to create an Uint32Array.
     *
     * @param { number } length - The length of the array
     * @throws { BusinessError } 10200012 - The Uint32Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(length: number);
    /**
     * A constructor used to create an Uint32Array.
     *
     * @param { ArrayLike<number> | ArrayBuffer } array - An array is initialized with the given elements
     * @throws { BusinessError } 10200012 - The Uint32Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(array: ArrayLike<number> | ArrayBuffer);
    /**
     * A constructor used to create an Uint32Array.
     *
     * @param { ArrayBuffer } buffer - An array is initialized with the given elements
     * @param { number } [byteOffset] - The byteOffset (in bytes) parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @param { number } [length] - The length parameter specifies the memory range
     *     that will be exposed by the typed array view.
     * @throws { BusinessError } 10200012 - The Uint32Array's constructor cannot be directly invoked.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    /**
     * Creates an Uint32Array from an array-like object.
     *
     * @param { ArrayLike<number> } arrayLike - An array-like object to convert to an Uint32Array.
     * @returns { Uint32Array } A new Uint32Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: ArrayLike<number>): Uint32Array;
    /**
     * Creates an Uint32Array from an array-like object.
     *
     * @param { ArrayLike<T> } arrayLike - An array-like object to convert to an Uint32Array.
     * @param { TypedArrayFromMapFn<T, number> } mapFn - A mapping function to call on every element of the array.
     * @returns { Uint32Array } A new Uint32Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Uint32Array;
    /**
     * Creates an Uint32Array from an iterable object.
     *
     * @param { Iterable<number> } arrayLike - An iterable object to convert to an Uint32Array.
     * @param { TypedArrayFromMapFn<number, number> } [mapFn] - A mapping function to
     *     call on every element of the array.
     * @returns { Uint32Array } A new Uint32Array instance
     * @throws { BusinessError } 401 - Parameter error.
     * @static
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Uint32Array;
    /**
     * Returns the this object after copying a section of the array identified by start and end
     * to the same array starting at position target.
     *
     * @param { number } target - If target is negative, it is treated as length+target where length is the
     *     length of the array.
     * @param { number } start - If start is negative, it is treated as length+start. If end is negative, it
     *     is treated as length+end.
     * @param { number } [end] - If not specified, length of the this object is used as its default value.
     * @returns { Uint32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The copyWithin method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    copyWithin(target: number, start: number, end?: number): Uint32Array;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     *
     * @param { TypedArrayPredicateFn<number, Uint32Array> } predicate - A function that accepts up to three arguments.
     *     The every method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
     * @returns { boolean } true unless predicate returns a false value for a typed array element,
     *     in which case false is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The every method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    every(predicate: TypedArrayPredicateFn<number, Uint32Array>): boolean;
    /**
     * Returns the this object after filling the section identified by start and end with value.
     *
     * @param { number } value - value to fill array section with.
     * @param { number } [start] - index to start filling the array at. If start is negative, it is treated as
     *     length+start where length is the length of the array.
     * @param { number } [end] - index to stop filling the array at. If end is negative, it is treated as
     *     length+end.
     * @returns { Uint32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The fill method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fill(value: number, start?: number, end?: number): Uint32Array;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     *
     * @param { TypedArrayPredicateFn<number, Uint32Array> } predicate - A function that accepts up to three arguments.
     *     The filter method calls the predicate function one time for each element in the array.
     * @returns { Uint32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The filter method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    filter(predicate: TypedArrayPredicateFn<number, Uint32Array>): Uint32Array;
    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Uint32Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true.
     *     If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
     * @returns { number | undefined } The first element in the typed array
     *     that satisfies the provided testing function. Otherwise, undefined is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The find method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    find(predicate: TypedArrayPredicateFn<number, Uint32Array>): number | undefined;
    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     *
     * @param { TypedArrayPredicateFn<number, Uint32Array> } predicate - find calls predicate once for each element of
     *     the array, in ascending order, until it finds one where predicate returns true. If such an element is found,
     *     findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @returns { number } The index of the first element in the typed array that passes the test. Otherwise, -1.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The findIndex method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    findIndex(predicate: TypedArrayPredicateFn<number, Uint32Array>): number;
    /**
     * Performs the specified action for each element in an array.
     *
     * @param { TypedArrayForEachCallback<number, Uint32Array> } callbackFn -  A function that
     *     accepts up to three arguments.
     *     forEach calls the callbackfn function one time for each element in the array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: TypedArrayForEachCallback<number, Uint32Array>): void;
    /**
     * Returns the index of the first occurrence of a value in an array.
     *
     * @param { number } searchElement - The value to locate in the array.
     * @param { number } [fromIndex] - The array index at which to begin the search. If fromIndex is omitted, the
     *      search starts at index 0.
     * @returns { number } The first index of searchElement in the typed array; -1 if not found.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The indexOf method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indexOf(searchElement: number, fromIndex?: number): number;
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param { string } [separator] - A string used to separate one element of an array from the next in the
     *     resulting String. If omitted, the array elements are separated with a comma.
     * @returns { string } A string with all typed array elements joined.
     *     If array.length is 0, the empty string is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The join method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    join(separator?: string): string;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     *
     * @param { TypedArrayForEachCallback<number, Uint32Array> } callbackFn - A function that accepts up to
     *     three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @returns { Uint32Array } The array itself.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The map method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    map(callbackFn: TypedArrayForEachCallback<number, Uint32Array>): Uint32Array;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Uint32Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint32Array>): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<number, number, Uint32Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { number } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { number } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint32Array>, initialValue: number): number;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @param { TypedArrayReduceCallback<U, number, Uint32Array> } callbackFn - A function that
     *     accepts up to four arguments.
     *     The reduce method calls the callbackfn function one time for each element in the array.
     * @param { U } initialValue - If initialValue is specified, it is used as the initial value to start
     *     the accumulation. The first call to the callbackfn function provides this value as an argument
     *     instead of an array value.
     * @returns { U } The value that results from running the "reducer" callback function to
     *     completion over the entire typed array.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The reduce method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Uint32Array>, initialValue: U): U;
    /**
     * Reverses the elements in an Array.
     *
     * @returns { Uint32Array } The reference to the original typed array, now reversed.
     *     <br>Note that the typed array is reversed in place, and no copy is made.
     * @throws { BusinessError } 10200011 - The reverse method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    reverse(): Uint32Array;
    /**
     * Sets a value or an array of values.
     *
     * @param { ArrayLike<number> } array - A typed or untyped array of values to set.
     * @param { number } [offset] - The index in the current array at which the values are to be written.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(array: ArrayLike<number>, offset?: number): void;
    /**
     * Returns a section of an array.
     *
     * @param { number } [start] - The beginning of the specified portion of the array.
     * @param { number } [end] - The end of the specified portion of the array.
     *     This is exclusive of the element at the index 'end'.
     * @returns { Uint32Array } A new typed array containing the extracted elements.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The slice method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice(start?: number, end?: number): Uint32Array;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     *
     * @param { TypedArrayPredicateFn<number, Uint32Array> } predicate - A function that accepts up to three arguments.
     *     The some method calls the predicate function for each element in the array until
     *     the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
     * @returns { boolean } false unless predicate returns a truthy value for a typed array element,
     *     in which case true is immediately returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The some method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    some(predicate: TypedArrayPredicateFn<number, Uint32Array>): boolean;
    /**
     * Sorts an array.
     *
     * @param { TypedArrayCompareFn<number> } [compareFn] - Function used to determine the order of the elements.
     *     It is expected to return a negative value if first argument is less than second argument,
     *     zero if they're equal and a positive value otherwise.
     *     If omitted, the elements are sorted in ascending, ASCII character order.
     * @returns { Uint32Array } The reference to the original typed array, now sorted.
     *     Note that the typed array is sorted in place and no copy is made.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The sort method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    sort(compareFn?: TypedArrayCompareFn<number>): Uint32Array;
    /**
     * Gets a new Uint32Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     *
     * @param { number } [begin] - The index of the beginning of the array.
     * @param { number } [end] - The index of the end of the array.
     * @returns { Uint32Array } A new Uint32Array object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The subarray method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    subarray(begin?: number, end?: number): Uint32Array;
    /**
     * Returns the item located at the specified index.
     *
     * @param { number } index - The zero-based index of the desired code unit.<br/>
     *     A negative index will count back from the last item.
     * @returns { number | undefined } The element in the array matching the given index.<br/>
     *     Always returns undefined if index < -array.length or
     *     index >= array.length without attempting to access the corresponding property.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    at(index: number): number | undefined;
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     *
     * @returns { IterableIterator<[number, number]> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[number, number]>;
    /**
     * Returns an iterable of keys in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<number>;
    /**
     * Returns an iterable of values in the array
     *
     * @returns { IterableIterator<number> } A new iterable iterator object.
     * @throws { BusinessError } 10200011 - The method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<number>;
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     *
     * @param { number } searchElement - The element to search for.
     * @param { number } [fromIndex] - The position in this array at which to begin searching for searchElement.
     * @returns { boolean } A boolean value which is true if the value searchElement is found <br/>
     *     within the typed array (or the part of the typed array indicated by the index fromIndex, if specified).
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 10200011 - The at method cannot be bound.
     * @throws { BusinessError } 10200201 - Concurrent modification error.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    includes(searchElement: number, fromIndex?: number): boolean;
    /**
     * Returns the item at that index.
     * 
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [index: number]: number;
  }
}

export default collections;
