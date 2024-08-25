/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
import stream from './@ohos.util.stream';
/**
 * Hash
 *
 * @namespace hash
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
/**
 * Hash
 *
 * @namespace hash
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @atomicservice
 * @since 11
 */
declare namespace hash {
    /**
     * Hash file.
     *
     * @param { string } path - path.
     * @param { string } algorithm - algorithm md5 sha1 sha256.
     * @returns { Promise<string> } return Promise
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Hash file.
     *
     * @param { string } path - path.
     * @param { string } algorithm - algorithm md5 sha1 sha256.
     * @returns { Promise<string> } return Promise
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    function hash(path: string, algorithm: string): Promise<string>;
    /**
     * Hash file.
     *
     * @param { string } path - path.
     * @param { string } algorithm - algorithm md5 sha1 sha256.
     * @param { AsyncCallback<string> } [callback] - callback.
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    /**
     * Hash file.
     *
     * @param { string } path - path.
     * @param { string } algorithm - algorithm md5 sha1 sha256.
     * @param { AsyncCallback<string> } [callback] - callback.
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @atomicservice
     * @since 11
     */
    function hash(path: string, algorithm: string, callback: AsyncCallback<string>): void;
    /**
     * Hash Stream.
     *
     * @extends stream.Transform
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 12
     */
    class HashStream extends stream.Transform {
        /**
         * Calculate the digest of all of the data passed to be hashed.
         *
         * @returns { string } Returns the hexadecimal data string of the hash result.
         * @throws { BusinessError } 401 - Parameter error
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 12
         */
        digest(): string;
        /**
         * Update the hash content with the given data.
         *
         * @param { ArrayBuffer } data - updated data.
         * @throws { BusinessError } 401 - Parameter error
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.File.FileIO
         * @since 12
         */
        update(data: ArrayBuffer): void;
    }
    /**
      * Create file read stream.
      *
      * @param { string } algorithm - hash algorithm.
      * @returns { HashStream } Returns the ReadStream object which has been created.
      * @throws { BusinessError } 401 - Parameter error
      * @throws { BusinessError } 13900020 - Invalid argument
      * @throws { BusinessError } 13900042 - Unknown error
      * @syscap SystemCapability.FileManagement.File.FileIO
      * @since 12
      */
    function createHash(algorithm: string): HashStream;
}
export default hash;
