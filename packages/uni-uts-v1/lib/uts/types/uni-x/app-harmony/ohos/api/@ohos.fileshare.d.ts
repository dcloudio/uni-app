/*
 * Copyright (C) 2022-2024 Huawei Device Co., Ltd.
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
 * Provides fileshare APIS
 *
 * @namespace fileShare
 * @syscap SystemCapability.FileManagement.AppFileService
 * @since 9
 */
declare namespace fileShare {
    /**
     * Enumerates the uri operate mode types.
     *
     * @enum { number } OperationMode
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    export enum OperationMode {
        /**
         * Indicates read permissions.
         *
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        READ_MODE = 0b1,
        /**
         * Indicates write permissions.
         *
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        WRITE_MODE = 0b10
    }
    /**
     * Enumerates the error code of the permission policy for the URI operation.
     *
     * @enum { number } PolicyErrorCode
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    export enum PolicyErrorCode {
        /**
         * Indicates that the policy is not allowed to be persisted.
         *
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        PERSISTENCE_FORBIDDEN = 1,
        /**
         * Indicates that the mode of this policy is invalid.
         *
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        INVALID_MODE = 2,
        /**
         * Indicates that the path of this policy is invalid.
         *
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        INVALID_PATH = 3,
        /**
         * Indicates that the permission is not persistent.
         *
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 12
         */
        PERMISSION_NOT_PERSISTED = 4
    }
    /**
     * Failed policy result on URI.
     *
     * @typedef { object }
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    export type PolicyErrorResult = {
        /**
         * Indicates the failed uri of the policy information.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        uri: string;
        /**
         * Indicates the error code of the failure in the policy information.
         *
         * @type { PolicyErrorCode }
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        code: PolicyErrorCode;
        /**
         * Indicates the reason of the failure in the policy information.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        message: string;
    };
    /**
     * Policy information to manager permissions on a URI.
     *
     * @interface PolicyInfo
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    export interface PolicyInfo {
        /**
         * Indicates the uri of the policy information.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        uri: string;
        /**
         * Indicates the mode of operation for the URI, example { OperationMode.READ_MODE } or { OperationMode.READ_MODE | OperationMode.WRITE_MODE }
         *
         * @type { number }
         * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
         * @since 11
         */
        operationMode: number;
    }
    /**
     * Set persistence permissions for the URI
     *
     * @permission ohos.permission.FILE_ACCESS_PERSIST
     * @param { Array<PolicyInfo> } policies - Policy information to grant permission on URIs.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900001 - Operation not permitted.
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    function persistPermission(policies: Array<PolicyInfo>): Promise<void>;
    /**
     * Revoke persistence permissions for the URI
     *
     * @permission ohos.permission.FILE_ACCESS_PERSIST
     * @param { Array<PolicyInfo> } policies - Policy information to grant permission on URIs.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900001 - Operation not permitted.
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    function revokePermission(policies: Array<PolicyInfo>): Promise<void>;
    /**
     * Enable the URI that have been permanently authorized
     *
     * @permission ohos.permission.FILE_ACCESS_PERSIST
     * @param { Array<PolicyInfo> } policies - Policy information to grant permission on URIs.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900001 - Operation not permitted.
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    function activatePermission(policies: Array<PolicyInfo>): Promise<void>;
    /**
     * Stop the authorized URI that has been enabled
     *
     * @permission ohos.permission.FILE_ACCESS_PERSIST
     * @param { Array<PolicyInfo> } policies - Policy information to grant permission on URIs.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900001 - Operation not permitted.
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 11
     */
    function deactivatePermission(policies: Array<PolicyInfo>): Promise<void>;
    /**
     * Check persistent permissions for the URI.
     *
     * @permission ohos.permission.FILE_ACCESS_PERSIST
     * @param { Array<PolicyInfo> } policies - Policy information to grant permission on URIs.
     * @returns { Promise<Array<boolean>> } Returns the persistent state of uri permissions.
     * @throws { BusinessError } 201 - Permission verification failed, usually the result returned by VerifyAccessToken.
     * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.AppFileService.FolderAuthorization
     * @since 12
     */
    function checkPersistentPermission(policies: Array<PolicyInfo>): Promise<Array<boolean>>;
}
export default fileShare;
