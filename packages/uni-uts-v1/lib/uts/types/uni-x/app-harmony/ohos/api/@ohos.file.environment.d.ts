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
 * @kit CoreFileKit
 */

/**
 * Provides Environment APIs.
 *
 * @namespace Environment
 * @syscap SystemCapability.FileManagement.File.Environment
 * @since 11
 */
declare namespace Environment {
    /**
     * Get the public download directory.
     *
     * @permission ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY
     * @returns { string } Return the public download directory.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.File.Environment.FolderObtain
     * @since 11
     */
    /**
     * Get the public download directory.
     *
     * @returns { string } Return the public download directory.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.File.Environment.FolderObtain
     * @since 12
     */
    function getUserDownloadDir(): string;
    /**
     * Get the public desktop directory.
     *
     * @permission ohos.permission.READ_WRITE_DESKTOP_DIRECTORY
     * @returns { string } Return the public desktop directory.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.File.Environment.FolderObtain
     * @since 11
     */
    /**
     * Get the public desktop directory.
     *
     * @returns { string } Return the public desktop directory.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.File.Environment.FolderObtain
     * @since 12
     */
    function getUserDesktopDir(): string;
    /**
     * Get the public document directory.
     *
     * @permission ohos.permission.READ_WRITE_DOCUMENTS_DIRECTORY
     * @returns { string } Return the public document directory.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.File.Environment.FolderObtain
     * @since 11
     */
    /**
     * Get the public document directory.
     *
     * @returns { string } Return the public document directory.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.File.Environment.FolderObtain
     * @since 12
     */
    function getUserDocumentDir(): string;
}
export default Environment;
