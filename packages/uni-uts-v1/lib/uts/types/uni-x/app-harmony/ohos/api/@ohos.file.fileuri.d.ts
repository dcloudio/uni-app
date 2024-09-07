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
import uri from './@ohos.uri';
/**
 * Provides fileUri APIS
 *
 * @namespace fileUri
 * @syscap SystemCapability.FileManagement.AppFileService
 * @since 9
 */
declare namespace fileUri {
    /**
     * FileUri represents the uri of the file.
     *
     * @extends uri.URI
     * @syscap SystemCapability.FileManagement.AppFileService
     * @since 10
     */
    class FileUri extends uri.URI {
        /**
         * Constructor for obtaining the instance of the FileUri class.
         *
         * @param { string } uriOrPath - Uri or Path.
         * @throws { BusinessError } 13900005 - I/O error
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @syscap SystemCapability.FileManagement.AppFileService
         * @since 10
         */
        constructor(uriOrPath: string);
        /**
         * Obtains the file name of uri.
         *
         * @type { string }
         * @readonly
         * @throws { BusinessError } 13900005 - I/O error
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.AppFileService
         * @since 10
         */
        readonly name: string;
        /**
         * Get the full directory uri where the file URI is located
         *
         * @returns { string } Return the directory uri
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.AppFileService
         * @since 11
         */
        getFullDirectoryUri(): string;
        /**
         * Check whether the incoming URI is a remote URI
         *
         * @returns { boolean } Return true or false
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.AppFileService
         * @since 12
         */
        isRemoteUri(): boolean;
    }
    /**
     * Get the uri from the path of file in app sandbox
     *
     * @param { string } path the path of file in app sandbox
     * @returns { string } Return the file uri
     * @throws { BusinessError } 401 - The input parameter is invalidPossible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect parameter types.
     * @syscap SystemCapability.FileManagement.AppFileService
     * @since 9
     */
    function getUriFromPath(path: string): string;
}
export default fileUri;
