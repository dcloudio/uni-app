/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import Context from './application/BaseContext';
/**
 * Provides interfaces to obtain and modify preferences data.
 *
 * @namespace preferences
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @since 9
 * @name preferences
 */
/**
 * Provides interfaces to obtain and modify preferences data.
 *
 * @namespace preferences
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @crossplatform
 * @since 10
 * @name preferences
 */
/**
 * Provides interfaces to obtain and modify preferences data.
 *
 * @namespace preferences
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 * @name preferences
 */
declare namespace preferences {
    /**
     * Indicates possible value types
     *
     * @typedef {number | string | boolean | Array<number> | Array<string> | Array<boolean>}
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Indicates possible value types
     *
     * @typedef {number | string | boolean | Array<number> | Array<string> | Array<boolean>}
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 10
     */
    /**
     * Indicates possible value types
     *
     * @typedef {number | string | boolean | Array<number> | Array<string> | Array<boolean> | Uint8Array}
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 11
     */
    /**
     * Indicates possible value types
     *
     * @typedef {number | string | boolean | Array<number> | Array<string> | Array<boolean> | Uint8Array | object | bigint}
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @atomicservice
     * @since 12
     */
    type ValueType = number | string | boolean | Array<number> | Array<string> | Array<boolean> | Uint8Array | object | bigint;
    /**
     * Indicates the maximum length of a key (80 characters).
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Indicates the maximum length of a key (80 characters).
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the maximum length of a key (80 characters).
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Maximum length of a key.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    const MAX_KEY_LENGTH: number;
    /**
     * Indicates the maximum length of a string (8192 characters).
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Indicates the maximum length of a string (8192 characters).
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the maximum length of a string (8192 characters).
     *
     * @constant
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Maximum length of a value.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    const MAX_VALUE_LENGTH: number;
    /**
     * Manages preferences file configurations.
     *
     * @interface Options
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Manages preferences file configurations.
     *
     * @interface Options
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface Options {
        /**
         * The preferences file name.
         *
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * The preferences file name.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * Application Group Id.
         *
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @StageModelOnly
         * @since 10
         */
        /**
         * Application Group Id.
         *
         * @type { ?(string | null | undefined) }
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        dataGroupId?: string | null | undefined;
    }
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<Preferences> } callback - The {@link Preferences} instance matching the specified
     *        preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<Preferences> } callback - The {@link Preferences} instance matching the specified
     *        preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<Preferences> } callback - The {@link Preferences} instance matching the specified
     *        preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500000 - Inner error.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getPreferences(context: Context, name: string, callback: AsyncCallback<Preferences>): void;
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @param { AsyncCallback<Preferences> } callback - The {@link Preferences} instance matching the specified
     *        preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @param { AsyncCallback<Preferences> } callback - The {@link Preferences} instance matching the specified
     *        preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getPreferences(context: Context, options: Options, callback: AsyncCallback<Preferences>): void;
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<Preferences> } The {@link Preferences} instance matching the specified preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<Preferences> } The {@link Preferences} instance matching the specified preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<Preferences> } The {@link Preferences} instance matching the specified preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500000 - Inner error.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getPreferences(context: Context, name: string): Promise<Preferences>;
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Promise<Preferences> } The {@link Preferences} instance matching the specified preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Promise<Preferences> } The {@link Preferences} instance matching the specified preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getPreferences(context: Context, options: Options): Promise<Preferences>;
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * This interface is executed synchronously.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Preferences } The {@link Preferences} instance matching the specified preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     * This interface is executed synchronously.
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Preferences } The {@link Preferences} instance matching the specified preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getPreferencesSync(context: Context, options: Options): Preferences;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function deletePreferences(context: Context, name: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function deletePreferences(context: Context, options: Options, callback: AsyncCallback<void>): void;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function deletePreferences(context: Context, name: string): Promise<void>;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15500010 - Failed to delete preferences file.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function deletePreferences(context: Context, options: Options): Promise<void>;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500000 - Inner error.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function removePreferencesFromCache(context: Context, name: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @param { AsyncCallback<void> } callback - Indicates the callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function removePreferencesFromCache(context: Context, options: Options, callback: AsyncCallback<void>): void;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500000 - Inner error.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function removePreferencesFromCache(context: Context, name: string): Promise<void>;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @returns { Promise<void> } A promise object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function removePreferencesFromCache(context: Context, options: Options): Promise<void>;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache. This interface is executed synchronously.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache. This interface is executed synchronously.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the preferences file name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 15500000 - Inner error.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function removePreferencesFromCacheSync(context: Context, name: string): void;
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache. This interface is executed synchronously.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache. This interface is executed synchronously.
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Options } options - Indicates the {@link Options} option of preferences file position.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                                                   2. Incorrect parameter types;
     *                                                                   3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 15500000 - Inner error.
     * @throws { BusinessError } 15501001 - Only supported in stage mode.
     * @throws { BusinessError } 15501002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function removePreferencesFromCacheSync(context: Context, options: Options): void;
    /**
     * Provides interfaces to obtain and modify preferences data.
     * <p>The preferences data is stored in a file, which matches only one {@link Preferences} instance in the memory.
     * You can use getPreferences to obtain the {@link Preferences} instance matching
     * the file that stores preferences data, and use movePreferencesFromCache
     * to remove the {@link Preferences} instance from the memory.
     *
     * @interface Preferences
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @since 9
     */
    /**
     * Provides interfaces to obtain and modify preferences data.
     * <p>The preferences data is stored in a file, which matches only one {@link Preferences} instance in the memory.
     * You can use getPreferences to obtain the {@link Preferences} instance matching
     * the file that stores preferences data, and use movePreferencesFromCache
     * to remove the {@link Preferences} instance from the memory.
     *
     * @interface Preferences
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Provides interfaces to obtain and modify preferences data.
     * <p>The preferences data is stored in a file, which matches only one {@link Preferences} instance in the memory.
     * You can use getPreferences to obtain the {@link Preferences} instance matching
     * the file that stores preferences data, and use movePreferencesFromCache
     * to remove the {@link Preferences} instance from the memory.
     *
     * @interface Preferences
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface Preferences {
        /**
         * Obtains the value of a preferences in the ValueType format.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @param { AsyncCallback<ValueType> } callback - The value matching the specified key if it is found;
         *        returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Obtains the value of a preferences in the ValueType format.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @param { AsyncCallback<ValueType> } callback - The value matching the specified key if it is found;
         *        returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of a preferences in the ValueType format.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @param { AsyncCallback<ValueType> } callback - The value matching the specified key if it is found;
         *        returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        get(key: string, defValue: ValueType, callback: AsyncCallback<ValueType>): void;
        /**
         * Obtains the value of a preferences in the ValueType format.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @returns { Promise<ValueType> } The value matching the specified key if it is found;
         *          returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Obtains the value of a preferences in the ValueType format.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @returns { Promise<ValueType> } The value matching the specified key if it is found;
         *          returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of a preferences in the ValueType format.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @returns { Promise<ValueType> } The value matching the specified key if it is found;
         *          returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        get(key: string, defValue: ValueType): Promise<ValueType>;
        /**
         * Obtains the value of a preferences in the ValueType format. This interface is executed synchronously.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @returns { ValueType } The value matching the specified key if it is found;
         *          returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of a preferences in the ValueType format. This interface is executed synchronously.
         * <p>If the value is {@code null} or not in the ValueType format, the default value is returned.
         *
         * @param { string } key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } defValue - Indicates the default value to return.
         * @returns { ValueType } The value matching the specified key if it is found;
         *          returns the default value otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getSync(key: string, defValue: ValueType): ValueType;
        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @param { AsyncCallback<Object> } callback - The values and keys in an object.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @param { AsyncCallback<Object> } callback - The values and keys in an object.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @param { AsyncCallback<Object> } callback - The values and keys in an object.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getAll(callback: AsyncCallback<Object>): void;
        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @returns { Promise<Object> } The values and keys in an object.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @returns { Promise<Object> } The values and keys in an object.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @returns { Promise<Object> } The values and keys in an object.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getAll(): Promise<Object>;
        /**
         * Obtains all the keys and values of a preferences in an object.  This interface
         * is executed synchronously.
         *
         * @returns { Object } The values and keys in an object.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains all the keys and values of a preferences in an object.  This interface
         * is executed synchronously.
         *
         * @returns { Object } The values and keys in an object.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getAllSync(): Object;
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { AsyncCallback<boolean> } callback - {@code true} if the {@link Preferences} object contains a preferences
         *         with the specified key;returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { AsyncCallback<boolean> } callback - {@code true} if the {@link Preferences} object contains a preferences
         *         with the specified key;returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @param { AsyncCallback<boolean> } callback - {@code true} if the {@link Preferences} object contains a preferences
         *         with the specified key;returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        has(key: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<boolean> } {@code true} if the {@link Preferences} object contains
         *         a preferences with the specified key; returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<boolean> } {@code true} if the {@link Preferences} object contains
         *         a preferences with the specified key; returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<boolean> } {@code true} if the {@link Preferences} object contains
         *         a preferences with the specified key; returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        has(key: string): Promise<boolean>;
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key. This interface
         * is executed synchronously.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @returns { boolean } {@code true} if the {@link Preferences} object contains
         *         a preferences with the specified key; returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key. This interface
         * is executed synchronously.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *         <tt>MAX_KEY_LENGTH</tt>.
         * @returns { boolean } {@code true} if the {@link Preferences} object contains
         *         a preferences with the specified key; returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        hasSync(key: string): boolean;
        /**
         * Sets an int value for the key in the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Sets an int value for the key in the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Sets an int value for the key in the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        put(key: string, value: ValueType, callback: AsyncCallback<void>): void;
        /**
         * Sets an int value for the key in the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Sets an int value for the key in the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Sets an int value for the key in the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        put(key: string, value: ValueType): Promise<void>;
        /**
         * Sets an int value for the key in the {@link Preferences} object. This interface is executed synchronously.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Sets an int value for the key in the {@link Preferences} object. This interface is executed synchronously.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { ValueType } value - Indicates the value of the preferences.
         *        <tt>MAX_VALUE_LENGTH</tt>.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        putSync(key: string, value: ValueType): void;
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        delete(key: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        delete(key: string): Promise<void>;
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object. This interface is
         * executed synchronously. <p>You can call the {@link #flush} method to save the {@link Preferences}
         * object to the file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object. This interface is
         * executed synchronously. <p>You can call the {@link #flush} method to save the {@link Preferences}
         * object to the file.
         *
         * @param { string } key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        deleteSync(key: string): void;
        /**
         * Clears all preferences from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Clears all preferences from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Clears all preferences from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        clear(callback: AsyncCallback<void>): void;
        /**
         * Clears all preferences from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } A promise object.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Clears all preferences from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } A promise object.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Clears all preferences from the {@link Preferences} object.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        clear(): Promise<void>;
        /**
         * Clears all preferences from the {@link Preferences} object. This interface is executed synchronously.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Clears all preferences from the {@link Preferences} object. This interface is executed synchronously.
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        clearSync(): void;
        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified;
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified;
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @param { AsyncCallback<void> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Mandatory parameters are left unspecified.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        flush(callback: AsyncCallback<void>): void;
        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } A promise object.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } A promise object.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @returns { Promise<void> } A promise object.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        flush(): Promise<void>;
        /**
         * Registers an observer to listen for the change of a {@link Preferences} object.
         *
         * @param { 'change' } type - Indicates the callback when preferences changes.
         * @param { Callback<{ key: string }> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Registers an observer to listen for the change of a {@link Preferences} object.
         *
         * @param { 'change' } type - Indicates the callback when preferences changes.
         * @param { Function } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Registers an observer to listen for the change of a {@link Preferences} object.
         *
         * @param { 'change' } type - Indicates the callback when preferences changes.
         * @param { Callback<string> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'change', callback: Callback<string>): void;
        /**
         * Registers an observer to listen for the change of a {@link Preferences} object.
         *
         * @param { 'multiProcessChange' } type - Indicates the callback when preferences changed in multiple processes.
         * @param { Function } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500019 - Failed to obtain subscription service.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 10
         */
        /**
         * Registers an observer to listen for the change of a {@link Preferences} object.
         *
         * @param { 'multiProcessChange' } type - Indicates the callback when preferences changed in multiple processes.
         * @param { Callback<string> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @throws { BusinessError } 15500019 - Failed to obtain subscription service.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 11
         */
        on(type: 'multiProcessChange', callback: Callback<string>): void;
        /**
         * Registers an observer to listen for changes to the {@ link Preferences} object.
         *
         * @param { 'dataChange' } type - Indicates the type of the event to observe.
         * @param { Array<string> } keys - Indicates one or more keys to listen for.
         * @param { Callback<Record<string, ValueType>> } callback - Indicates the callback used to return the data change.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'dataChange', keys: Array<string>, callback: Callback<Record<string, ValueType>>): void;
        /**
         * Unregisters an existing observer.
         *
         * @param { 'change' } type - Indicates the callback when preferences changes.
         * @param { Callback<{ key: string }> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 9
         */
        /**
         * Unregisters an existing observer.
         *
         * @param { 'change' } type - Indicates the callback when preferences changes.
         * @param { Function } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Unregisters an existing observer.
         *
         * @param { 'change' } type - Indicates the callback when preferences changes.
         * @param { Callback<string> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        off(type: 'change', callback?: Callback<string>): void;
        /**
         * Unregisters an existing observer.
         *
         * @param { 'multiProcessChange' } type - Indicates the callback when preferences changed in multiple processes.
         * @param { Function } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @since 10
         */
        /**
         * Unregisters an existing observer.
         *
         * @param { 'multiProcessChange' } type - Indicates the callback when preferences changed in multiple processes.
         * @param { Callback<string> } callback - Indicates the callback function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 11
         */
        off(type: 'multiProcessChange', callback?: Callback<string>): void;
        /**
         * Unregisters an observer for changes to the {@ link Preferences} object.
         *
         * @param { 'dataChange' } type - Indicates the event type.
         * @param { Array<string> } keys - Indicates the data whose changes are not observed.
         * @param { Callback<Record<string, ValueType>> } callback - Indicates the callback to unregister.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         *                                                                   2. Incorrect parameter types;
         *                                                                   3. Parameter verification failed.
         * @throws { BusinessError } 15500000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.Preferences.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'dataChange', keys: Array<string>, callback?: Callback<Record<string, ValueType>>): void;
    }
}
export default preferences;
