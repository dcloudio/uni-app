/*
* Copyright (c) 2021 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file
 * @kit ArkData
 */
import { AsyncCallback, Callback } from './@ohos.base';
/**
 * Provides interfaces to obtain and modify storage data.
 *
 * @namespace storage
 * @name storage
 * @since 6
 * @deprecated since 9
 * @useinstead ohos.preferences.preferences
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 *
 */
declare namespace storage {
    /**
     * Obtains a {@link Storage} instance matching a specified storage file name.
     *
     * <p>The {@link references} instance loads all data of the storage file and
     * resides in the memory. You can use removeStorageFromCache to remove the instance from the memory.
     *
     * @param path Indicates the path of storage file stored.
     * @returns Returns the {@link Storage} instance matching the specified storage file name.
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.getPreferences
     */
    function getStorageSync(path: string): Storage;
    /**
     * Obtains a {@link Storage} instance matching a specified storage file name.
     *
     * <p>The {@link references} instance loads all data of the storage file and
     * resides in the memory. You can use removeStorageFromCache to remove the instance from the memory.
     *
     * @param path Indicates the path of storage file stored.
     * @returns Returns the {@link Storage} instance matching the specified storage file name.
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.getPreferences
     */
    function getStorage(path: string, callback: AsyncCallback<Storage>): void;
    /**
     * Obtains a {@link Storage} instance matching a specified storage file name.
     *
     * <p>The {@link references} instance loads all data of the storage file and
     * resides in the memory. You can use removeStorageFromCache to remove the instance from the memory.
     *
     * @param path Indicates the path of storage file stored.
     * @returns Returns the {@link Storage} instance matching the specified storage file name.
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.getPreferences
     */
    function getStorage(path: string): Promise<Storage>;
    /**
     * Deletes a {@link Storage} instance matching a specified storage file name
     * from the cache which is performed by removeStorageFromCache and deletes the
     * storage file.
     *
     * <p>When deleting the {@link Storage} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, inconsistent data
     * will occur.
     *
     * @param path Indicates the path of storage file
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.deletePreferences
     */
    function deleteStorageSync(path: string): void;
    /**
     * Deletes a {@link Storage} instance matching a specified storage file name
     * from the cache which is performed by removeStorageFromCache and deletes the
     * storage file.
     *
     * <p>When deleting the {@link Storage} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, inconsistent data
     * will occur.
     *
     * @param path Indicates the path of storage file
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.deletePreferences
     */
    function deleteStorage(path: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes a {@link Storage} instance matching a specified storage file name
     * from the cache which is performed by removeStorageFromCache and deletes the
     * storage file.
     *
     * <p>When deleting the {@link Storage} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, inconsistent data
     * will occur.
     *
     * @param path Indicates the path of storage file
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.deletePreferences
     */
    function deleteStorage(path: string): Promise<void>;
    /**
     * Deletes a {@link Storage} instance matching a specified storage file name
     * from the cache.
     *
     * <p>When deleting the {@link Storage} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, inconsistent data
     * will occur.
     *
     * @param path Indicates the path of storage file.
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.removePreferencesFromCache
     */
    function removeStorageFromCacheSync(path: string): void;
    /**
     * Deletes a {@link Storage} instance matching a specified storage file name
     * from the cache.
     *
     * <p>When deleting the {@link Storage} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, inconsistent data
     * will occur.
     *
     * @param path Indicates the path of storage file.
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.removePreferencesFromCache
     */
    function removeStorageFromCache(path: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes a {@link Storage} instance matching a specified storage file name
     * from the cache.
     *
     * <p>When deleting the {@link Storage} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, inconsistent data
     * will occur.
     *
     * @param path Indicates the path of storage file.
     * @throws BusinessError if invoked failed
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences.removePreferencesFromCache
     */
    function removeStorageFromCache(path: string): Promise<void>;
    /**
     * Provides interfaces to obtain and modify storage data.
     *
     * <p>The storage data is stored in a file, which matches only one {@link Storage} instance in the memory.
     * You can use getStorage to obtain the {@link Storage} instance matching
     * the file that stores storage data, and use removeStorageFromCache
     * to remove the {@link Storage} instance from the memory.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     *
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.preferences.preferences
     */
    interface Storage {
        /**
        * Obtains the value of a storage in the int format.
        *
        * <p>If the value is {@code null} or not in the int format, the default value is returned.
        *
        * @param key Indicates the key of the storage. It cannot be {@code null} or empty.
        * @param defValue Indicates the default value to return.
        * @returns Returns the value matching the specified key if it is found; returns the default value otherwise.
        * @throws BusinessError if invoked failed
        * @since 6
        * @deprecated since 9
        * @useinstead ohos.preferences.preferences.get
        */
        getSync(key: string, defValue: ValueType): ValueType;
        /**
        * Obtains the value of a storage in the int format.
        *
        * <p>If the value is {@code null} or not in the int format, the default value is returned.
        *
        * @param key Indicates the key of the storage. It cannot be {@code null} or empty.
        * @param defValue Indicates the default value to return.
        * @returns Returns the value matching the specified key if it is found; returns the default value otherwise.
        * @throws BusinessError if invoked failed
        * @since 6
        * @deprecated since 9
        * @useinstead ohos.preferences.preferences.get
        */
        get(key: string, defValue: ValueType, callback: AsyncCallback<ValueType>): void;
        /**
        * Obtains the value of a storage in the int format.
        *
        * <p>If the value is {@code null} or not in the int format, the default value is returned.
        *
        * @param key Indicates the key of the storage. It cannot be {@code null} or empty.
        * @param defValue Indicates the default value to return.
        * @returns Returns the value matching the specified key if it is found; returns the default value otherwise.
        * @throws BusinessError if invoked failed
        * @since 6
        * @deprecated since 9
        * @useinstead ohos.preferences.preferences.get
        */
        get(key: string, defValue: ValueType): Promise<ValueType>;
        /**
         * Checks whether the {@link Storage} object contains a storage matching a specified key.
         *
         * @param key Indicates the key of the storage to check for.
         * @returns Returns {@code true} if the {@link Storage} object contains a storage with the specified key;
         * returns {@code false} otherwise.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.has
         */
        hasSync(key: string): boolean;
        /**
         * Checks whether the {@link Storage} object contains a storage matching a specified key.
         *
         * @param key Indicates the key of the storage to check for.
         * @returns Returns {@code true} if the {@link Storage} object contains a storage with the specified key;
         * returns {@code false} otherwise.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.has
         */
        has(key: string, callback: AsyncCallback<boolean>): boolean;
        /**
         * Checks whether the {@link Storage} object contains a storage matching a specified key.
         *
         * @param key Indicates the key of the storage to check for.
         * @returns Returns {@code true} if the {@link Storage} object contains a storage with the specified key;
         * returns {@code false} otherwise.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.has
         */
        has(key: string): Promise<boolean>;
        /**
         * Sets an int value for the key in the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} or {@link #flushSync} method to save the {@link Storage} object to the
         * file.
         *
         * @param key Indicates the key of the storage to modify. It cannot be {@code null} or empty.
         * @param value Indicates the value of the storage.
         * <tt>MAX_KEY_LENGTH</tt>.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.put
         */
        putSync(key: string, value: ValueType): void;
        /**
         * Sets an int value for the key in the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} or {@link #flushSync} method to save the {@link Storage} object to the
         * file.
         *
         * @param key Indicates the key of the storage to modify. It cannot be {@code null} or empty.
         * @param value Indicates the value of the storage.
         * <tt>MAX_KEY_LENGTH</tt>.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.put
         */
        put(key: string, value: ValueType, callback: AsyncCallback<void>): void;
        /**
         * Sets an int value for the key in the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} or {@link #flushSync} method to save the {@link Storage} object to the
         * file.
         *
         * @param key Indicates the key of the storage to modify. It cannot be {@code null} or empty.
         * @param value Indicates the value of the storage.
         * <tt>MAX_KEY_LENGTH</tt>.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.put
         */
        put(key: string, value: ValueType): Promise<void>;
        /**
         * Deletes the storage with a specified key from the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Storage} object to the
         * file.
         *
         * @param key Indicates the key of the storage to delete. It cannot be {@code null} or empty.
         * <tt>MAX_KEY_LENGTH</tt>.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.delete
         */
        deleteSync(key: string): void;
        /**
         * Deletes the storage with a specified key from the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Storage} object to the
         * file.
         *
         * @param key Indicates the key of the storage to delete. It cannot be {@code null} or empty.
         * <tt>MAX_KEY_LENGTH</tt>.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.delete
         */
        delete(key: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes the storage with a specified key from the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Storage} object to the
         * file.
         *
         * @param key Indicates the key of the storage to delete. It cannot be {@code null} or empty.
         * <tt>MAX_KEY_LENGTH</tt>.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.delete
         */
        delete(key: string): Promise<void>;
        /**
         * Clears all storage from the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Storage} object to the
         * file.
         *
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.clear
         */
        clearSync(): void;
        /**
         * Clears all storage from the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Storage} object to the
         * file.
         *
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.clear
         */
        clear(callback: AsyncCallback<void>): void;
        /**
         * Clears all storage from the {@link Storage} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Storage} object to the
         * file.
         *
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.clear
         */
        clear(): Promise<void>;
        /**
         * Asynchronously saves the {@link Storage} object to the file.
         *
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.flush
         */
        flushSync(): void;
        /**
         * Asynchronously saves the {@link Storage} object to the file.
         *
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.flush
         */
        flush(callback: AsyncCallback<void>): void;
        /**
         * Asynchronously saves the {@link Storage} object to the file.
         *
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.flush
         */
        flush(): Promise<void>;
        /**
         * Registers an observer to listen for the change of a {@link Storage} object.
         *
         * @param callback Indicates the callback when storage changes.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.on
         */
        on(type: 'change', callback: Callback<StorageObserver>): void;
        /**
         * Unregister an existing observer.
         *
         * @param callback Indicates the registered callback.
         * @throws BusinessError if invoked failed
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.preferences.preferences.off
         */
        off(type: 'change', callback: Callback<StorageObserver>): void;
    }
    /**
     * Indicates possible value types
     *
     * @since 6
     * @deprecated since 9
     */
    type ValueType = number | string | boolean;
    /**
     * Define the change data information object.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     *
     * @since 6
     * @deprecated since 9
     */
    interface StorageObserver {
        /**
         * Indicates which key changes
         *
         * @since 6
         * @deprecated since 9
         */
        key: string;
    }
    /**
     * Indicates the maximum length of a key (80 characters).
     *
     * @since 6
     * @deprecated since 9
     */
    const MAX_KEY_LENGTH: 80;
    /**
     * Indicates the maximum length of a string (8192 characters).
     *
     * @since 6
     * @deprecated since 9
     */
    const MAX_VALUE_LENGTH: 8192;
}
/**
 * Provides interfaces to obtain and modify storage data.
 * @since 6
 * @deprecated since 9
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 */
export default storage;
