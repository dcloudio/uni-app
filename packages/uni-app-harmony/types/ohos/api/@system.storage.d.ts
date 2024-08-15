/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @kit ArkData
 */
/**
 * @typedef GetStorageOptions
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
 * @FAModelOnly
 * @since 3
 * @deprecated since 6
 */
export interface GetStorageOptions {
    /**
     * Content index.
     * the value contains a maximum of 32 characters and cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    key: string;
    /**
     * Default value returned when the key does not exist.
     * If this parameter is not specified, an empty string is returned.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    default?: string;
    /**
     * Called when the stored content is read successfully.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    success?: (data: any) => void;
    /**
     * Called when the stored content fails to be read.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    complete?: () => void;
}
/**
 * @typedef SetStorageOptions
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
 * @FAModelOnly
 * @since 3
 * @deprecated since 6
 */
export interface SetStorageOptions {
    /**
     * Index of the stored content to be modified.
     * the value contains a maximum of 32 characters and cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    key: string;
    /**
     * Target storage content.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    value: string;
    /**
     * Called when the stored content is modified successfully.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    success?: () => void;
    /**
     * Called when the stored content fails to be modified.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    complete?: () => void;
}
/**
 * @typedef ClearStorageOptions
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
 * @FAModelOnly
 * @since 3
 * @deprecated since 6
 */
export interface ClearStorageOptions {
    /**
     * Called when the stored content is cleared successfully.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    success?: () => void;
    /**
     * Called when the stored content fails to be cleared.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    complete?: () => void;
}
/**
 * @typedef DeleteStorageOptions
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
 * @FAModelOnly
 * @since 3
 * @deprecated since 6
 */
export interface DeleteStorageOptions {
    /**
     * Content index.
     * the value contains a maximum of 32 characters and cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    key: string;
    /**
     * Called when the stored content is deleted successfully.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    success?: () => void;
    /**
     * Called when the stored content fails to be deleted.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    complete?: () => void;
}
/**
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
 * @FAModelOnly
 * @since 3
 * @deprecated since 6
 */
export default class Storage {
    /**
     * Reads the stored content.
     *
     * @param { GetStorageOptions } options - Indicates the target options.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     * @useinstead ohos.preferences.preferences.get
     */
    static get(options: GetStorageOptions): void;
    /**
     * Modifies the stored content.
     *
     * @param { SetStorageOptions } options - Indicates the target options.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     */
    static set(options: SetStorageOptions): void;
    /**
     * Clears the stored content.
     *
     * @param { ClearStorageOptions } options - Indicates the target options.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     * @useinstead ohos.preferences.preferences.clear
     */
    static clear(options?: ClearStorageOptions): void;
    /**
     * Deletes the stored content.
     *
     * @param { DeleteStorageOptions } options - Indicates the target options.
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core.Lite
     * @FAModelOnly
     * @since 3
     * @deprecated since 6
     * @useinstead ohos.preferences.preferences.delete
     */
    static delete(options: DeleteStorageOptions): void;
}
