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
 * LightWeightMap stores key-value (KV) pairs. Each key must be unique and have only one value.
 *
 * @syscap SystemCapability.Utils.Lang
 * @since 8
 */
/**
 * LightWeightMap stores key-value (KV) pairs. Each key must be unique and have only one value.
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 10
 */
/**
 * LightWeightMap stores key-value (KV) pairs. Each key must be unique and have only one value.
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class LightWeightMap<K, V> {
    /**
     * A constructor used to create a LightWeightMap object.
     *
     * @throws { BusinessError } 10200012 - The LightWeightMap's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * A constructor used to create a LightWeightMap object.
     *
     * @throws { BusinessError } 10200012 - The LightWeightMap's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * A constructor used to create a LightWeightMap object.
     *
     * @throws { BusinessError } 10200012 - The LightWeightMap's constructor cannot be directly invoked.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * Gets the element number of the LightWeightMap.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Gets the element number of the LightWeightMap.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Gets the element number of the LightWeightMap.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    length: number;
    /**
     * Returns whether this map has all the object in a specified map
     *
     * @param { LightWeightMap<K, V> } map - map map the Map object to compare
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether this map has all the object in a specified map
     *
     * @param { LightWeightMap<K, V> } map - map map the Map object to compare
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns whether this map has all the object in a specified map
     *
     * @param { LightWeightMap<K, V> } map - map map the Map object to compare
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    hasAll(map: LightWeightMap<K, V>): boolean;
    /**
     * Returns whether a key is contained in this map
     *
     * @param { K } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether a key is contained in this map
     *
     * @param { K } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns whether a key is contained in this map
     *
     * @param { K } key - key key need to determine whether to include the key
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    hasKey(key: K): boolean;
    /**
     * Returns whether a value is contained in this map
     *
     * @param { V } value - value value need to determine whether to include the value
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether a value is contained in this map
     *
     * @param { V } value - value value need to determine whether to include the value
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns whether a value is contained in this map
     *
     * @param { V } value - value value need to determine whether to include the value
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The hasValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    hasValue(value: V): boolean;
    /**
     * Ensures that the capacity of an LightWeightMap container is greater than or equal to a specified value,
     * and that the container has all the original objects after capacity expansion
     *
     * @param { number } minimumCapacity - minimumCapacity minimumCapacity Minimum capacity to be reserved
     * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Ensures that the capacity of an LightWeightMap container is greater than or equal to a specified value,
     * and that the container has all the original objects after capacity expansion
     *
     * @param { number } minimumCapacity - minimumCapacity minimumCapacity Minimum capacity to be reserved
     * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Ensures that the capacity of an LightWeightMap container is greater than or equal to a specified value,
     * and that the container has all the original objects after capacity expansion
     *
     * @param { number } minimumCapacity - minimumCapacity minimumCapacity Minimum capacity to be reserved
     * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    increaseCapacityTo(minimumCapacity: number): void;
    /**
     * Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The entries method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    entries(): IterableIterator<[
        K,
        V
    ]>;
    /**
     * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
     *
     * @param { K } key - key key the index in LightWeightMap
     * @returns { V } value or undefined
     * @throws { BusinessError } 10200011 - The get method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
     *
     * @param { K } key - key key the index in LightWeightMap
     * @returns { V } value or undefined
     * @throws { BusinessError } 10200011 - The get method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
     *
     * @param { K } key - key key the index in LightWeightMap
     * @returns { V } value or undefined
     * @throws { BusinessError } 10200011 - The get method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    get(key: K): V;
    /**
     * Obtains the index of the key equal to a specified key in an LightWeightMap container
     *
     * @param { K } key - key key Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOfKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the index of the key equal to a specified key in an LightWeightMap container
     *
     * @param { K } key - key key Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOfKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the index of the key equal to a specified key in an LightWeightMap container
     *
     * @param { K } key - key key Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOfKey method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getIndexOfKey(key: K): number;
    /**
     * Obtains the index of the value equal to a specified value in an LightWeightMap container
     *
     * @param { V } value - value value Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOfValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the index of the value equal to a specified value in an LightWeightMap container
     *
     * @param { V } value - value value Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOfValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the index of the value equal to a specified value in an LightWeightMap container
     *
     * @param { V } value - value value Looking for goals
     * @returns { number } Subscript corresponding to target
     * @throws { BusinessError } 10200011 - The getIndexOfValue method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getIndexOfValue(value: V): number;
    /**
     * Returns whether the Map object contains elements
     *
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns whether the Map object contains elements
     *
     * @returns { boolean } the boolean type
     * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns whether the Map object contains elements
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
     * Obtains the key at the location identified by index in an LightWeightMap container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { K } the key of key-value pairs
     * @throws { BusinessError } 10200011 - The getKeyAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the key at the location identified by index in an LightWeightMap container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { K } the key of key-value pairs
     * @throws { BusinessError } 10200011 - The getKeyAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the key at the location identified by index in an LightWeightMap container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { K } the key of key-value pairs
     * @throws { BusinessError } 10200011 - The getKeyAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getKeyAt(index: number): K;
    /**
     * Obtains a ES6 iterator that contains all the keys of an LightWeightMap container
     *
     * @returns { IterableIterator<K> }
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains a ES6 iterator that contains all the keys of an LightWeightMap container
     *
     * @returns { IterableIterator<K> }
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a ES6 iterator that contains all the keys of an LightWeightMap container
     *
     * @returns { IterableIterator<K> }
     * @throws { BusinessError } 10200011 - The keys method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keys(): IterableIterator<K>;
    /**
     * Adds all element groups in one map to another map
     *
     * @param { LightWeightMap<K, V> } map - map map the Map object to add members
     * @throws { BusinessError } 10200011 - The setAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Adds all element groups in one map to another map
     *
     * @param { LightWeightMap<K, V> } map - map map the Map object to add members
     * @throws { BusinessError } 10200011 - The setAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Adds all element groups in one map to another map
     *
     * @param { LightWeightMap<K, V> } map - map map the Map object to add members
     * @throws { BusinessError } 10200011 - The setAll method cannot be bound.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    setAll(map: LightWeightMap<K, V>): void;
    /**
     * Adds or updates a(new) key-value pair with a key and value specified for the Map object
     *
     * @param { K } key - key key Added or updated targets
     * @param { V } value - value  Added or updated value
     * @returns { Object } the map object after set
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Adds or updates a(new) key-value pair with a key and value specified for the Map object
     *
     * @param { K } key - key key Added or updated targets
     * @param { V } value - value  Added or updated value
     * @returns { Object } the map object after set
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Adds or updates a(new) key-value pair with a key and value specified for the Map object
     *
     * @param { K } key - key key Added or updated targets
     * @param { V } value - value  Added or updated value
     * @returns { Object } the map object after set
     * @throws { BusinessError } 10200011 - The set method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    set(key: K, value: V): Object;
    /**
     * Remove the mapping for this key from this map if present
     *
     * @param { K } key - key key Target to be deleted
     * @returns { V } Target mapped value
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Remove the mapping for this key from this map if present
     *
     * @param { K } key - key key Target to be deleted
     * @returns { V } Target mapped value
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Remove the mapping for this key from this map if present
     *
     * @param { K } key - key key Target to be deleted
     * @returns { V } Target mapped value
     * @throws { BusinessError } 10200011 - The remove method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    remove(key: K): V;
    /**
     * Deletes a key-value pair at the location identified by index from an LightWeightMap container
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
     * Deletes a key-value pair at the location identified by index from an LightWeightMap container
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
     * Deletes a key-value pair at the location identified by index from an LightWeightMap container
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
     * Sets the value identified by index in an LightWeightMap container to a specified value
     *
     * @param { number } index - index index Target subscript for search
     * @param { V } newValue - newValue value Updated the target mapped value
     * @returns { boolean } the boolean type(Is there a value corresponding to the subscript)
     * @throws { BusinessError } 10200011 - The setValueAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Sets the value identified by index in an LightWeightMap container to a specified value
     *
     * @param { number } index - index index Target subscript for search
     * @param { V } newValue - newValue value Updated the target mapped value
     * @returns { boolean } the boolean type(Is there a value corresponding to the subscript)
     * @throws { BusinessError } 10200011 - The setValueAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the value identified by index in an LightWeightMap container to a specified value
     *
     * @param { number } index - index index Target subscript for search
     * @param { V } newValue - newValue value Updated the target mapped value
     * @returns { boolean } the boolean type(Is there a value corresponding to the subscript)
     * @throws { BusinessError } 10200011 - The setValueAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    setValueAt(index: number, newValue: V): boolean;
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
    forEach(callbackFn: (value?: V, key?: K, map?: LightWeightMap<K, V>) => void, thisArg?: Object): void;
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * returns an ES6 iterator.Each item of the iterator is a Javascript Object
     *
     * @returns { IterableIterator<[K, V]> }
     * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    [Symbol.iterator](): IterableIterator<[
        K,
        V
    ]>;
    /**
     * Obtains a string that contains all the keys and values in an LightWeightMap container
     *
     * @returns { String }
     * @throws { BusinessError } 10200011 - The toString method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains a string that contains all the keys and values in an LightWeightMap container
     *
     * @returns { String }
     * @throws { BusinessError } 10200011 - The toString method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a string that contains all the keys and values in an LightWeightMap container
     *
     * @returns { String }
     * @throws { BusinessError } 10200011 - The toString method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    toString(): String;
    /**
     * Obtains the value identified by index in an LightWeightMap container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { V } the value of key-value pairs
     * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Obtains the value identified by index in an LightWeightMap container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { V } the value of key-value pairs
     * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the value identified by index in an LightWeightMap container
     *
     * @param { number } index - index index Target subscript for search
     * @returns { V } the value of key-value pairs
     * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
     * @throws { BusinessError } 10200001 - The value of index is out of range.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1.Mandatory parameters are left unspecified;
     * 2.Incorrect parameter types;
     * 3.Parameter verification failed.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getValueAt(index: number): V;
    /**
     * Returns an iterator of the values contained in this map
     *
     * @returns { IterableIterator<V> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns an iterator of the values contained in this map
     *
     * @returns { IterableIterator<V> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns an iterator of the values contained in this map
     *
     * @returns { IterableIterator<V> }
     * @throws { BusinessError } 10200011 - The values method cannot be bound.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    values(): IterableIterator<V>;
}
export default LightWeightMap;
