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
 * LightWeightSet stores a set of values, each of which must be unique.
 *
 * @syscap SystemCapability.Utils.Lang
 * @since 8
 */
/**
 * LightWeightSet stores a set of values, each of which must be unique.
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 10
 */
/**
 * LightWeightSet stores a set of values, each of which must be unique.
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class LightWeightSet<T> {
    /**
     * A constructor used to create a LightWeightSet object.
     *
     * @throws { BusinessError } 10200012 - The LightWeightSet's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * A constructor used to create a LightWeightSet object.
     *
     * @throws { BusinessError } 10200012 - The LightWeightSet's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * A constructor used to create a LightWeightSet object.
     *
     * @throws { BusinessError } 10200012 - The LightWeightSet's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * Gets the element number of the LightWeightSet.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Gets the element number of the LightWeightSet.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Gets the element number of the LightWeightSet.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    length: number;
    /**
     * If the set does not contain the element, the specified element is added
     *
     * @param { T } obj - obj obj Added element
     * @returns { boolean } the boolean type(Is there contain this element)
     * @throws { BusinessError } 10200011 - The add method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * If the set does not contain the element, the specified element is added
     *
     * @param { T } obj - obj obj Added element
     * @returns { boolean } the boolean type(Is there contain this element)
     * @throws { BusinessError } 10200011 - The add method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * If the set does not contain the element, the specified element is added
     *
     * @param { T } obj - obj obj Added element
     * @returns { boolean } the boolean type(Is there contain this element)
     * @throws { BusinessError } 10200011 - The add method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    add(obj: T): boolean;
    /**
     * Adds all the objects in a specified LightWeightSet container to the current LightWeightSet container
     *
     * @param { LightWeightSet<T> } set - set set the Set object to provide the added element
     * @returns { boolean } the boolean type(Is there any new data added successfully)
     * @throws { BusinessError } 10200011 - The addAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Adds all the objects in a specified LightWeightSet container to the current LightWeightSet container
     *
     * @param { LightWeightSet<T> } set - set set the Set object to provide the added element
     * @returns { boolean } the boolean type(Is there any new data added successfully)
     * @throws { BusinessError } 10200011 - The addAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Adds all the objects in a specified LightWeightSet container to the current LightWeightSet container
     *
     * @param { LightWeightSet<T> } set - set set the Set object to provide the added element
     * @returns { boolean } the boolean type(Is there any new data added successfully)
     * @throws { BusinessError } 10200011 - The addAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    addAll(set: LightWeightSet<T>): boolean;
    /**
     * Returns whether this set has all the object in a specified set
     *
     * @param { LightWeightSet<T> } set - set set the Set object to compare
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether this set has all the object in a specified set
     *
     * @param { LightWeightSet<T> } set - set set the Set object to compare
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns whether this set has all the object in a specified set
     *
     * @param { LightWeightSet<T> } set - set set the Set object to compare
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    hasAll(set: LightWeightSet<T>): boolean;
    /**
     * Checks whether an LightWeightSet container has a specified key
     *
     * @param { T } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The has method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Checks whether an LightWeightSet container has a specified key
     *
     * @param { T } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The has method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Checks whether an LightWeightSet container has a specified key
     *
     * @param { T } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The has method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    has(key: T): boolean;
    /**
     * Checks whether an the objects of an LightWeighSet container are of the same type as a specified Object LightWeightSet
     *
     * @param { Object } obj - obj obj need to determine whether to include the obj
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The equal method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Checks whether an the objects of an LightWeighSet container are of the same type as a specified Object LightWeightSet
     *
     * @param { Object } obj - obj obj need to determine whether to include the obj
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The equal method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Checks whether an the objects of an LightWeighSet container are of the same type as a specified Object LightWeightSet
     *
     * @param { Object } obj - obj obj need to determine whether to include the obj
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The equal method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    equal(obj: Object): boolean;
    /**
     * Ensures that the capacity of an LightWeightSet container is greater than or equal to a specified value,
     * and that the container has all the original objects after capacity expansion
     *
     * @param { number } minimumCapacity Minimum capacity to be reserved
     * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @throws { BusinessError } 10200001 - The value of minimumCapacity is out of range.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Ensures that the capacity of an LightWeightSet container is greater than or equal to a specified value,
     * and that the container has all the original objects after capacity expansion
     *
     * @param { number } minimumCapacity Minimum capacity to be reserved
     * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @throws { BusinessError } 10200001 - The value of minimumCapacity is out of range.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Ensures that the capacity of an LightWeightSet container is greater than or equal to a specified value,
     * and that the container has all the original objects after capacity expansion
     *
     * @param { number } minimumCapacity Minimum capacity to be reserved
     * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @throws { BusinessError } 10200001 - The value of minimumCapacity is out of range.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    increaseCapacityTo(minimumCapacity: number): void;
    /**
     * Obtains the index of s key of a specified Object type in an LightWeightSet container
     *
     * @param { T } key - key key Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOf method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the index of s key of a specified Object type in an LightWeightSet container
     *
     * @param { T } key - key key Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOf method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the index of s key of a specified Object type in an LightWeightSet container
     *
     * @param { T } key - key key Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOf method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getIndexOf(key: T): number;
    /**
     * Deletes an object of a specified Object type from an LightWeightSet container
     *
     * @param { T } key - key key Target to be deleted
     * @returns { T } Target element
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Deletes an object of a specified Object type from an LightWeightSet container
     *
     * @param { T } key - key key Target to be deleted
     * @returns { T } Target element
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes an object of a specified Object type from an LightWeightSet container
     *
     * @param { T } key - key key Target to be deleted
     * @returns { T } Target element
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    remove(key: T): T;
    /**
     * Deletes an object at the location identified by index from an LightWeightSet container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { boolean } the boolean type(Is there a delete value)
     * @throws { BusinessError } 10200011 - The removeAt method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Deletes an object at the location identified by index from an LightWeightSet container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { boolean } the boolean type(Is there a delete value)
     * @throws { BusinessError } 10200011 - The removeAt method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes an object at the location identified by index from an LightWeightSet container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { boolean } the boolean type(Is there a delete value)
     * @throws { BusinessError } 10200011 - The removeAt method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    removeAt(index: number): boolean;
    /**
     * Removes all of the mapping from this map
     * The map will be empty after this call returns
     *
     * @throws { BusinessError } 10200011 - The clear method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Removes all of the mapping from this map
     * The map will be empty after this call returns
     *
     * @throws { BusinessError } 10200011 - The clear method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Removes all of the mapping from this map
     * The map will be empty after this call returns
     *
     * @throws { BusinessError } 10200011 - The clear method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    clear(): void;
    /**
     * Executes the given callback function once for each real key in the map.
     * It does not perform functions on deleted keys.
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
     * Executes the given callback function once for each real key in the map.
     * It does not perform functions on deleted keys.
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
     * Executes the given callback function once for each real key in the map.
     * It does not perform functions on deleted keys.
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
    forEach(callbackFn: (value?: T, key?: T, set?: LightWeightSet<T>) => void, thisArg?: Object): void;
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
    /**
     * Obtains a string that contains all the keys and values in an LightWeightSet container
     *
     * @returns { String }
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains a string that contains all the keys and values in an LightWeightSet container
     *
     * @returns { String }
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a string that contains all the keys and values in an LightWeightSet container
     *
     * @returns { String }
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    toString(): String;
    /**
     * Obtains an Array that contains all the objects of an LightWeightSet container.
     *
     * @returns { Array<T> }
     * @throws { BusinessError } 10200011 - The toArray method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains an Array that contains all the objects of an LightWeightSet container.
     *
     * @returns { Array<T> }
     * @throws { BusinessError } 10200011 - The toArray method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains an Array that contains all the objects of an LightWeightSet container.
     *
     * @returns { Array<T> }
     * @throws { BusinessError } 10200011 - The toArray method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    toArray(): Array<T>;
    /**
     * Obtains the object at the location  identified by index in an LightWeightSet container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { T } the value of key-value pairs
     * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the object at the location  identified by index in an LightWeightSet container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { T } the value of key-value pairs
     * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the object at the location  identified by index in an LightWeightSet container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { T } the value of key-value pairs
     * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getValueAt(index: number): T;
    /**
     * Returns a ES6 iterator of the values contained in this Set
     *
     * @returns { IterableIterator<T> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a ES6 iterator of the values contained in this Set
     *
     * @returns { IterableIterator<T> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns a ES6 iterator of the values contained in this Set
     *
     * @returns { IterableIterator<T> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<T>;
    /**
     * Returns a Iterator object that contains the [key, value] pairs for each element in the Set object in insertion order
     *
     * @returns { IterableIterator<[T, T]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a Iterator object that contains the [key, value] pairs for each element in the Set object in insertion order
     *
     * @returns { IterableIterator<[T, T]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns a Iterator object that contains the [key, value] pairs for each element in the Set object in insertion order
     *
     * @returns { IterableIterator<[T, T]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[
        T,
        T
    ]>;
    /**
     * Returns whether the set object contains elements
     *
     * @returns { boolean }
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether the set object contains elements
     *
     * @returns { boolean }
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns whether the set object contains elements
     *
     * @returns { boolean }
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    isEmpty(): boolean;
}
export default LightWeightSet;
