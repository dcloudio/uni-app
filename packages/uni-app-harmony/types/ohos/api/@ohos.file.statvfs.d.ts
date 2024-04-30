/*
 * Copyright (C) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit CoreFileKit
 */
import type { AsyncCallback } from './@ohos.base';
/**
 * Provides filesystem statistics APIs
 *
 * @namespace statfs
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare namespace statfs {
    /**
     * Get the number of free bytes on the specified path.
     *
     * @param { string } path - path
     * @returns { Promise<number> } return Promise
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900031 - Function not implemented
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function getFreeSize(path: string): Promise<number>;
    /**
     * Get the number of free bytes on the specified path.
     *
     * @param { string } path - path
     * @param { AsyncCallback<number> } [callback] - callback
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900031 - Function not implemented
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function getFreeSize(path: string, callback: AsyncCallback<number>): void;
    /**
     * Get the number of free bytes on the specified path with sync interface.
     *
     * @param { string } path - path
     * @returns { number } return the number of free bytes on the specified path
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900031 - Function not implemented
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    function getFreeSizeSync(path: string): number;
    /**
     * Get the number of total bytes on the specified path.
     *
     * @param { string } path - path
     * @returns { Promise<number> } return Promise
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900031 - Function not implemented
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function getTotalSize(path: string): Promise<number>;
    /**
     * Get the number of total bytes on the specified path.
     *
     * @param { string } path - path
     * @param { AsyncCallback<number> } [callback] - callback
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900031 - Function not implemented
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function getTotalSize(path: string, callback: AsyncCallback<number>): void;
    /**
     * Get the number of total bytes on the specified path with sync interface.
     *
     * @param { string } path - path
     * @returns { number } return the number of total bytes
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900005 - I/O error
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900031 - Function not implemented
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 10
     */
    function getTotalSizeSync(path: string): number;
}
export default statfs;
