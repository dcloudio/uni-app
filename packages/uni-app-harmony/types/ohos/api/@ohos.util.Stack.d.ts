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
 * Stack is implemented based on the array data structure.
 * It follows the principle Last Out First In (LOFI) and supports data insertion and removal at one end.
 *
 * @syscap SystemCapability.Utils.Lang
 * @since 8
 */
/**
 * Stack is implemented based on the array data structure.
 * It follows the principle Last Out First In (LOFI) and supports data insertion and removal at one end.
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 10
 */
/**
 * Stack is implemented based on the array data structure.
 * It follows the principle Last Out First In (LOFI) and supports data insertion and removal at one end.
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class Stack<T> {
    /**
     * A constructor used to create a Stack object.
     *
     * @throws { BusinessError } 10200012 - The Stack's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * A constructor used to create a Stack object.
     *
     * @throws { BusinessError } 10200012 - The Stack's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * A constructor used to create a Stack object.
     *
     * @throws { BusinessError } 10200012 - The Stack's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * Gets the element number of the Stack. This is a number one higher than the highest index in the Stack.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Gets the element number of the Stack. This is a number one higher than the highest index in the Stack.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Gets the element number of the Stack. This is a number one higher than the highest index in the Stack.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    length: number;
    /**
     * Tests if this stack is empty
     *
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Tests if this stack is empty
     *
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Tests if this stack is empty
     *
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    isEmpty(): boolean;
    /**
     * Looks at the object at the top of this stack without removing it from the stack
     * Return undefined if this stack is empty
     *
     * @returns { T } the top value or undefined
     * @throws { BusinessError } 10200011 - The peek method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Looks at the object at the top of this stack without removing it from the stack
     * Return undefined if this stack is empty
     *
     * @returns { T } the top value or undefined
     * @throws { BusinessError } 10200011 - The peek method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Looks at the object at the top of this stack without removing it from the stack
     * Return undefined if this stack is empty
     *
     * @returns { T } the top value or undefined
     * @throws { BusinessError } 10200011 - The peek method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    peek(): T;
    /**
     * Removes the object at the top of this stack and returns that object as the value of this function
     * an exception if the stack is empty
     *
     * @returns { T } Stack top value or undefined
     * @throws { BusinessError } 10200011 - The pop method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Removes the object at the top of this stack and returns that object as the value of this function
     * an exception if the stack is empty
     *
     * @returns { T } Stack top value or undefined
     * @throws { BusinessError } 10200011 - The pop method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Removes the object at the top of this stack and returns that object as the value of this function
     * an exception if the stack is empty
     *
     * @returns { T } Stack top value or undefined
     * @throws { BusinessError } 10200011 - The pop method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    pop(): T;
    /**
     * Pushes an item onto the top of this stack
     *
     * @param { T } item - item item to be appended to this Stack
     * @returns { T } the T type
     * @throws { BusinessError } 10200011 - The push method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Pushes an item onto the top of this stack
     *
     * @param { T } item - item item to be appended to this Stack
     * @returns { T } the T type
     * @throws { BusinessError } 10200011 - The push method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Pushes an item onto the top of this stack
     *
     * @param { T } item - item item to be appended to this Stack
     * @returns { T } the T type
     * @throws { BusinessError } 10200011 - The push method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    push(item: T): T;
    /**
     * Returns the 1-based position where an object is on this stack
     *
     * @param { T } element - element element Target to be deleted
     * @returns { number } the T type,If there is no such element, return -1
     * @throws { BusinessError } 10200011 - The locate method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns the 1-based position where an object is on this stack
     *
     * @param { T } element - element element Target to be deleted
     * @returns { number } the T type,If there is no such element, return -1
     * @throws { BusinessError } 10200011 - The locate method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns the 1-based position where an object is on this stack
     *
     * @param { T } element - element element Target to be deleted
     * @returns { number } the T type,If there is no such element, return -1
     * @throws { BusinessError } 10200011 - The locate method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    locate(element: T): number;
    /**
     * Executes a provided function once for each value in the Stack object.
     *
     * @param { function } callbackFn - callbackFn
     * callbackFn (required) A function that accepts up to three arguments.
     * The function to be called for each element.
     * @param { Object } [thisArg] - thisArg
     * thisArg (Optional) The value to be used as this value for when callbackFn is called.
     * If thisArg is omitted, undefined is used as the this value.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Executes a provided function once for each value in the Stack object.
     *
     * @param { function } callbackFn - callbackFn
     * callbackFn (required) A function that accepts up to three arguments.
     * The function to be called for each element.
     * @param { Object } [thisArg] - thisArg
     * thisArg (Optional) The value to be used as this value for when callbackFn is called.
     * If thisArg is omitted, undefined is used as the this value.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Executes a provided function once for each value in the Stack object.
     *
     * @param { function } callbackFn - callbackFn
     * callbackFn (required) A function that accepts up to three arguments.
     * The function to be called for each element.
     * @param { Object } [thisArg] - thisArg
     * thisArg (Optional) The value to be used as this value for when callbackFn is called.
     * If thisArg is omitted, undefined is used as the this value.
     * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    forEach(callbackFn: (value: T, index?: number, stack?: Stack<T>) => void, thisArg?: Object): void;
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<T> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<T> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<T> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [Symbol.iterator](): IterableIterator<T>;
}
export default Stack;
