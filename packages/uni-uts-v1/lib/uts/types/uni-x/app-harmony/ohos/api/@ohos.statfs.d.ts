/*
 * Copyright (C) 2021-2023 Huawei Device Co., Ltd.
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
 */
import { AsyncCallback } from './@ohos.base';
/**
 * Provides filesystem statistics APIs
 *
 * @namespace Statfs
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.file.statvfs.statfs
 */
declare namespace Statfs {
    /**
     * Get the number of free bytes on the specified path.
     *
     * @param { string } path
     * @param { AsyncCallback<number> } callback - callback
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.file.statvfs.getFreeSize
     */
    function getFreeBytes(path: string, callback: AsyncCallback<number>): void;
    /**
     * Get the number of free bytes on the specified path.
     *
     * @param { string } path
     * @returns { Promise<number> } return Promise
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.file.statvfs.getFreeSize
     */
    function getFreeBytes(path: string): Promise<number>;
    /**
     * Get the total number of bytes of the specified path.
     *
     * @param { string } path
     * @param { AsyncCallback<number> } callback - callback
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.file.statvfs.getTotalSize
     */
    function getTotalBytes(path: string, callback: AsyncCallback<number>): void;
    /**
     * Get the total number of bytes of the specified path.
     *
     * @param { string } path
     * @returns { Promise<number> } return Promise
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.file.statvfs.getTotalSize
     */
    function getTotalBytes(path: string): Promise<number>;
}
export default Statfs;
