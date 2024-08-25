/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * @file
 * @kit ArkTS
 */
/**
 * Vector is a linear data structure that is implemented based on arrays. When the memory of a vector is used up,
 * a larger contiguous memory area is automatically allocated, all the elements are copied to the new memory area,
 * and the current memory area is reclaimed.
 *
 * @syscap SystemCapability.Utils.Lang
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.util.ArrayList
 */
declare class Vector<T> {
    /**
     * A constructor used to create a Vector object.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    constructor();
    /**
     * Gets the element number of the Vector. This is a number one higher than the highest index in the vector.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    length: number;
    /**
     * Appends the specified element to the end of this vector.
     *
     * @param { T } element - Element to be appended to this vector
     * @returns { boolean } the boolean type, returns true if the addition is successful, and returns false if it fails.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    add(element: T): boolean;
    /**
     * Inserts the specified element at the specified position in this
     * vector. Shifts the element currently at that position (if any) and
     * any subsequent elements to the right (adds one to their index).
     *
     * @param { T } element - Element at which the specified element is to be inserted
     * @param { number } index - Index to be inserted
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    insert(element: T, index: number): void;
    /**
     * Check if vector contains the specified element
     *
     * @param { T } element - Element to be contained
     * @returns { boolean } the boolean type,if vector contains the specified element,return true,else return false
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    has(element: T): boolean;
    /**
     * Returns the element at the specified position in this Vector,or returns undefined if vector is empty
     *
     * @param { number } index - Index to be contained
     * @returns { T } the number type ,returns the lowest index such that or -1 if there is no such index.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    get(index: number): T;
    /**
     * Returns the index of the first occurrence of the specified element
     * in this vector, or -1 if this vector does not contain the element.
     *
     * @param { T } element - Element current index
     * @returns { number } the number type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    getIndexOf(element: T): number;
    /**
     * Returns the first component (the item at index 0) of this vector.
     * or returns undefined if vector is empty
     *
     * @returns { T } the T type ,returns undefined if vector is empty
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    getFirstElement(): T;
    /**
     * Returns the Last component (the item at index length-1) of this vector.
     * or returns undefined if vector is empty
     *
     * @returns { T } the T type ,returns undefined if vector is empty
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    getLastElement(): T;
    /**
     * Find the corresponding element according to the index,
     * delete the element, and move the index of all elements to the right of the element forward by one.
     *
     * @param { number } index - The index in the vector
     * @returns { T } the T type ,returns undefined if vector is empty,If the index is
     * out of bounds (greater than or equal to length or less than 0), throw an exception
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    removeByIndex(index: number): T;
    /**
     * Removes the first occurrence of the specified element from this vector,
     * if it is present.  If the vector does not contain the element, it is
     * unchanged.  More formally, removes the element with the lowest index
     *
     * @param { T } element - Element to remove
     * @returns { boolean } the boolean type ,If there is no such element, return false
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    remove(element: T): boolean;
    /**
     * Replaces the element at the specified position in this Vector with the specified element
     *
     * @param { number } index - Index to find
     * @param { T } element - Element replaced element
     * @returns { T } the T type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    set(index: number, element: T): T;
    /**
     * Returns in the index of the last occurrence of the specified element in this vector ,
     * or -1 if the vector does not contain the element.
     *
     * @param { T } element - Element to find
     * @returns { number } The number type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    getLastIndexOf(element: T): number;
    /**
     * Returns the index of the last occurrence of the specified element in this vector ,searching backwards from index,
     * or returns -1 if the element is not found,or -1 if there is no such index
     *
     * @param { T } element - Element to find
     * @param { number } index - Index start index
     * @returns { number } the number type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    getLastIndexFrom(element: T, index: number): number;
    /**
     * Returns the index of the first occurrence of the specified element in this vector ,searching forwards from index,
     * or returns -1 if the element is not found,or -1 if there is no such index
     *
     * @param { T } element - Element to find
     * @param { number } index - Index start index
     * @returns { number } the number type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    getIndexFrom(element: T, index: number): number;
    /**
     * Removes from this vector all of the elements whose index is between fromIndex,inclusive,and toIndex ,exclusive.
     *
     * @param { number } fromIndex - The starting position of the index, containing the value at that index position
     * @param { number } toIndex - The end of the index, excluding the value at that index
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    removeByRange(fromIndex: number, toIndex: number): void;
    /**
     * Replaces each element of this vector with the result of applying the operator to that element.
     *
     * @param { function } callbackFn - A function that accepts up to four arguments.The function to be called
     * for each element in the vector,Returns the result of an operation
     * @param { Object } thisArg - The value passed to the function generally uses the
     * "this" value.If this parameter is empty, "undefined" will be passed to the "this" value
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    replaceAllElements(callbackFn: (value: T, index?: number, vector?: Vector<T>) => T, thisArg?: Object): void;
    /**
     * Executes a provided function once for each value in the vector object.
     *
     * @param { function } callbackFn - callbackFn
     * callbackFn (required) A function that accepts up to four arguments.The function to be
     * called for each element in the vector
     * @param { Object } thisArg - The value passed to the function generally uses the "this" value.
     * If this parameter is empty, "undefined" will be passed to the "this" value
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    forEach(callbackFn: (value: T, index?: number, vector?: Vector<T>) => void, thisArg?: Object): void;
    /**
     * Sorts this vector according to the order induced by the specified comparator,without comparator
     * this parameter, it will default to ASCII sorting
     *
     * @param { function } comparator - comparator
     * (Optional) A function that accepts up to two arguments.Specifies the sort order.
     * Must be a function,return number type,If it returns firstValue minus secondValue, it returns an vector sorted
     * in ascending order;If it returns secondValue minus firstValue, it returns an vector sorted in descending order;
     * If this parameter is empty, it will default to ASCII sorting
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    sort(comparator?: (firstValue: T, secondValue: T) => number): void;
    /**
     * Returns a view of the portion of this vector between the specified fromIndex,inclusive,and toIndex,exclusive
     *
     * @param { number } fromIndex - The starting position of the index, containing the value at that index position
     * @param { number } toIndex - The end of the index, excluding the value at that index
     * @returns { Vector<T> }
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    subVector(fromIndex: number, toIndex: number): Vector<T>;
    /**
     * Removes all of the elements from this vector.The vector will
     * be empty after this call returns.length becomes 0
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    clear(): void;
    /**
     * Returns a shallow copy of this instance. (The elements themselves are not copied.)
     *
     * @returns { Vector<T> } this vector instance
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    clone(): Vector<T>;
    /**
     * Sets the length of this vector
     *
     * @param { number } newSize - newSize
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    setLength(newSize: number): void;
    /**
     * returns the capacity of this vector
     *
     * @returns { number } the number type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    getCapacity(): number;
    /**
     * convert vector to array
     *
     * @returns { Array<T> } the Array type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    convertToArray(): Array<T>;
    /**
     * Determine whether vector is empty and whether there is an element
     *
     * @returns { boolean } the boolean type
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    isEmpty(): boolean;
    /**
     * If the newCapacity provided by the user is greater than or equal to length,
     * change the capacity of the vector to newCapacity, otherwise the capacity will not be changed
     *
     * @param { number } newCapacity - newCapacity
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    increaseCapacityTo(newCapacity: number): void;
    /**
     * Returns a string representation of this Vector,
     * containing the String representation of each element
     *
     * @returns { string }
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    toString(): string;
    /**
     * Limit the capacity to the current length
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    trimToCurrentLength(): void;
    /**
     * Copies the components of this vector into the specified array,
     * to overwrite elements of the same index
     *
     * @param { Array<T> } array - Replaced array
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    copyToArray(array: Array<T>): void;
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<T> }
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     */
    [Symbol.iterator](): IterableIterator<T>;
}
export default Vector;
