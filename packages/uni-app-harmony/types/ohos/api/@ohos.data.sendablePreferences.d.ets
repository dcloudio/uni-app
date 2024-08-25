/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
import { Callback } from './@ohos.base';
import Context from './application/BaseContext';
import lang from '../arkts/@arkts.lang';
/**
 * Provides interfaces to obtain and modify preferences data.
 *
 * @namespace sendablePreferences
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @atomicservice
 * @since 12
 * @name sendablePreferences
 */
declare namespace sendablePreferences {
    /**
     * Maximum length of a key.
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    const MAX_KEY_LENGTH: number;
    /**
     * Maximum length of a value.
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    const MAX_VALUE_LENGTH: number;
    /**
     * Defines the configuration of a preferences file.
     *
     * @interface Options
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    interface Options {
        /**
         * Name of the preferences file.
         *
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        name: string;
        /**
         * Application group ID.
         *
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @StageModelOnly
         * @atomicservice
         * @since 12
         */
        dataGroupId?: string | null;
    }
    /**
     * Obtains a {@link Preferences} instance matching the specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the cache. You can use removePreferencesFromCache to remove the instance from the cache.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates information about the preferences file. For details, see {@link Options}.
     * @returns { Promise<Preferences> } Promise used to return the {@link Preferences}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    function getPreferences(context: Context, options: Options): Promise<Preferences>;
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * This API returns the result synchronously.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the cache. You can use removePreferencesFromCache to remove the instance from the cache.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates information about the preferences file. For details, see {@link Options}.
     * @returns { Preferences } return the {@link Preferences}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    function getPreferencesSync(context: Context, options: Options): Preferences;
    /**
     * Deletes a {@link Preferences} instance matching the specified preferences file name
     * from the cache (which is equivalent to calling removePreferencesFromCache) and deletes
     * the preferences file.
     * <p>When deleting a {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates information about the preferences file. For details, see {@link Options}.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    function deletePreferences(context: Context, options: Options): Promise<void>;
    /**
     * Removes a {@link Preferences} instance matching the specified preferences file name
     * from the cache.
     * <p>When removing a {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates information about the preferences file. For details, see {@link Options}.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    function removePreferencesFromCache(context: Context, options: Options): Promise<void>;
    /**
     * Removes a {@link Preferences} instance matching the specified preferences file name
     * from the cache. This API returns the result synchronously.
     * <p>When removing a {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates information about the preferences file. For details, see {@link Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    function removePreferencesFromCacheSync(context: Context, options: Options): void;
    /**
     * Provides interfaces to obtain and modify preferences data.
     * <p>The preferences data is stored in a file, which matches only one {@link Preferences} instance in the cache.
     * You can use getPreferences to obtain the {@link Preferences} instance matching
     * the file that stores preferences data, and use removePreferencesFromCache
     * to remove the {@link Preferences} instance from the cache.
     *
     * @interface Preferences
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    interface Preferences extends lang.ISendable {
        /**
         * Obtains the value of a preferences instance.
         * <p>If the value is {@code null} or not in the lang.ISendable format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { lang.ISendable } defValue - Indicates the default value to return.
         * @returns { Promise<lang.ISendable> } Promise used to return the result. If a value matching the specified key
         * is found, the value is returned. Otherwise, the default value is returned.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        get(key: string, defValue: lang.ISendable): Promise<lang.ISendable>;
        /**
         * Obtains the value of a preferences instance. This API returns the result synchronously.
         * <p>If the value is {@code null} or not in the lang.ISendable format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { lang.ISendable } defValue - Indicates the default value to return.
         * @returns { lang.ISendable } If a value matching the specified key is found, the value is returned. Otherwise,
         * the default value is returned.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        getSync(key: string, defValue: lang.ISendable): lang.ISendable;
        /**
         * Obtains all the keys and values of a preferences instance in an object.
         *
         * @returns { Promise<lang.ISendable> } Promise used to return the values and keys obtained in an object.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        getAll(): Promise<lang.ISendable>;
        /**
         * Obtains all the keys and values of a preferences instance. This API returns the result synchronously.
         *
         * @returns { lang.ISendable } Returns the values and keys obtained in an object.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        getAllSync(): lang.ISendable;
        /**
         * Checks whether the {@link Preferences} instance contains a value matching the specified key.
         *
         * @param { string } key - Indicates the key of the value to check. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<boolean> } Promise used to return the result. {@code true} is returned if the
         * {@link Preferences} object contains a value matching the specified key; {@code false} is returned otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        has(key: string): Promise<boolean>;
        /**
         * Checks whether the {@link Preferences} instance contains a value matching the specified key.
         * This API returns the result synchronously.
         *
         * @param { string } key - Indicates the key of the value to check. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @returns { boolean } {@code true} is returned if the {@link Preferences} object contains a value matching
         * the specified key; {@code false} is returned otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        hasSync(key: string): boolean;
        /**
         * Sets an lang.ISendable value for the key in the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param { string } key - Indicates the key of the preferences to set. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { lang.ISendable } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        put(key: string, value: lang.ISendable): Promise<void>;
        /**
         * Sets an lang.ISendable value for the key in the {@link Preferences} object.
         * This API returns the result synchronously.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param { string } key - Indicates the key of the preferences to set. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { lang.ISendable } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        putSync(key: string, value: lang.ISendable): void;
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        delete(key: string): Promise<void>;
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object. This API returns the result
         * synchronously.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        deleteSync(key: string): void;
        /**
         * Clears all preferences from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        clear(): Promise<void>;
        /**
         * Clears all preferences from the {@link Preferences} object. This API returns the result synchronously.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        clearSync(): void;
        /**
         * Flushes the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        flush(): Promise<void>;
        /**
         * Registers an observer to listen for the change of a {@link Preferences} object.
         *
         * @param { 'change' } type - Indicates the type of the event to observe.
         * @param { Callback<string> } callback - Indicates the callback used to return the preferences changes.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'change', callback: Callback<string>): void;
        /**
         * Registers an observer to listen for the change of a {@link Preferences} object in multiple processes.
         *
         * @param { 'multiProcessChange' } type - Indicates the type of the event to observe.
         * @param { Callback<string> } callback - Indicates the callback used to return the preferences changed
         * in multiple processes.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @throws { BusinessError } 15500019 - Failed to obtain subscription service.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'multiProcessChange', callback: Callback<string>): void;
        /**
         * Registers an observer to listen for changes to the {@link Preferences} object.
         *
         * @param { 'dataChange' } type - Indicates the type of the event to observe.
         * @param { Array<string> } keys - Indicates one or more keys to listen for.
         * @param { Callback<lang.ISendable> } callback - Indicates the callback used to return the data change.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'dataChange', keys: Array<string>, callback: Callback<lang.ISendable>): void;
        /**
         * Unregisters an observer used to listen for changes to the {@link Preferences} object.
         *
         * @param { 'change' } type - Indicates the event type.
         * @param { Callback<string> } callback - Indicates the callback to unregister.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'change', callback?: Callback<string>): void;
        /**
         * Unregisters an observer used to listen for the preferences changed in multiple processes.
         *
         * @param { 'multiProcessChange' } type - Indicates the event type.
         * @param { Callback<string> } callback - Indicates the callback to unregister.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'multiProcessChange', callback?: Callback<string>): void;
        /**
         * Unregisters an observer for changes to the {@ link Preferences} object.
         *
         * @param { 'dataChange' } type - Indicates the event type.
         * @param { Array<string> } keys - Indicates the data whose changes are not observed.
         * @param { Callback<lang.ISendable> } callback - Indicates the callback to unregister.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'dataChange', keys: Array<string>, callback?: Callback<lang.ISendable>): void;
    }
}
export default sendablePreferences;
