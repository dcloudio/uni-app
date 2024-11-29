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
 * @kit BasicServicesKit
 */
import { AsyncCallback } from './@ohos.base';
import { Callback } from './@ohos.base';
import BaseContext from './application/BaseContext';
/**
 * upload and download
 *
 * @namespace request
 * @since 6
 */
/**
 * upload and download
 *
 * @namespace request
 * @syscap SystemCapability.Request.FileTransferAgent
 * @crossplatform
 * @since 10
 */
/**
 * upload and download
 *
 * @namespace request
 * @syscap SystemCapability.Request.FileTransferAgent
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace request {
    /**
     * Error code 201 - the permissions check fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 201 - the permissions check fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const EXCEPTION_PERMISSION: number;
    /**
     * Error code 401 - the parameters check fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 401 - the parameters check fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const EXCEPTION_PARAMCHECK: number;
    /**
     * Error code 801 - call unsupported api.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 801 - call unsupported api.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const EXCEPTION_UNSUPPORTED: number;
    /**
     * Error code 13400001 - file operation error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 13400001 - file operation error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const EXCEPTION_FILEIO: number;
    /**
     * Error code 13400002 - bad file path.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 13400002 - bad file path.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const EXCEPTION_FILEPATH: number;
    /**
     * Error code 13400003 - task service ability error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 13400003 - task service ability error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const EXCEPTION_SERVICE: number;
    /**
     * Error code 13499999 - others error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 13499999 - others error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const EXCEPTION_OTHERS: number;
    /**
     * Code 0x00000001 - Bit flag indicating download is allowed when using the cellular network.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 6
     */
    /**
     * Code 0x00000001 - Bit flag indicating download is allowed when using the cellular network.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const NETWORK_MOBILE: number;
    /**
     * Code 0x00010000 - Bit flag indicating download is allowed when using the WLAN.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 6
     */
    /**
     * Code 0x00010000 - Bit flag indicating download is allowed when using the WLAN.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const NETWORK_WIFI: number;
    /**
     * Error code 0 - Indicates that the download cannot be resumed for network reasons.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 0 - Indicates that the download cannot be resumed for network reasons.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_CANNOT_RESUME: number;
    /**
     * Error code 1 - Indicates that no storage device, such as an SD card, is found.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 1 - Indicates that no storage device, such as an SD card, is found.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_DEVICE_NOT_FOUND: number;
    /**
     * Error code 2 - Indicates that files to be downloaded already exist, and that the download session cannot overwrite the existing files.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 2 - Indicates that files to be downloaded already exist, and that the download session cannot overwrite the existing files.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_FILE_ALREADY_EXISTS: number;
    /**
     * Error code 3 - Indicates that a file operation fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 3 - Indicates that a file operation fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_FILE_ERROR: number;
    /**
     * Error code 4 - Indicates that the HTTP transmission fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 4 - Indicates that the HTTP transmission fails.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_HTTP_DATA_ERROR: number;
    /**
     * Error code 5 - Indicates insufficient storage space.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 5 - Indicates insufficient storage space.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_INSUFFICIENT_SPACE: number;
    /**
     * Error code 6 - Indicates an error caused by too many network redirections.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 6 - Indicates an error caused by too many network redirections.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_TOO_MANY_REDIRECTS: number;
    /**
     * Error code 7 - Indicates an HTTP code that cannot be identified.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 7 - Indicates an HTTP code that cannot be identified.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_UNHANDLED_HTTP_CODE: number;
    /**
     * Error code 8 - Indicates an undefined error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Error code 8 - Indicates an undefined error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_UNKNOWN: number;
    /**
     * Error code 9 - Indicates network offline.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 9 - Indicates network offline.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_OFFLINE: number;
    /**
     * Error code 10 - Indicates network type configuration error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Error code 10 - Indicates network type configuration error.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const ERROR_UNSUPPORTED_NETWORK_TYPE: number;
    /**
     * Paused code 0 - Indicates that the download is paused and waiting for a WLAN connection,
     * because the file size exceeds the maximum allowed for a session using the cellular network.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Paused code 0 - Indicates that the download is paused and waiting for a WLAN connection,
     * because the file size exceeds the maximum allowed for a session using the cellular network.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const PAUSED_QUEUED_FOR_WIFI: number;
    /**
     * Paused code 1 - Indicates that the download is paused due to a network problem, for example, network disconnection.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Paused code 1 - Indicates that the download is paused due to a network problem, for example, network disconnection.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const PAUSED_WAITING_FOR_NETWORK: number;
    /**
     * Paused code 2 - Indicates that a network error occurs, and the download session will be retried.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Paused code 2 - Indicates that a network error occurs, and the download session will be retried.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const PAUSED_WAITING_TO_RETRY: number;
    /**
     * Paused code 3 - Indicates that the download is paused due to the user.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Paused code 3 - Indicates that the download is paused due to the user.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const PAUSED_BY_USER: number;
    /**
     * Paused code 4 - Indicates that the download is paused for some reasons.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Paused code 4 - Indicates that the download is paused for some reasons.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const PAUSED_UNKNOWN: number;
    /**
     * Session status code 0 - Indicates that the download session is completed.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Session status code 0 - Indicates that the download session is completed.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const SESSION_SUCCESSFUL: number;
    /**
     * Session status code 1 - Indicates that the download session is in progress.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Session status code 1 - Indicates that the download session is in progress.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const SESSION_RUNNING: number;
    /**
     * Session status code 2 - Indicates that the download session is being scheduled.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Session status code 2 - Indicates that the download session is being scheduled.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const SESSION_PENDING: number;
    /**
     * Session status code 3 - Indicates that the download session has been paused.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Session status code 3 - Indicates that the download session has been paused.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const SESSION_PAUSED: number;
    /**
     * Session status code 4 - Indicates that the download session has failed and will not be retried.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     */
    /**
     * Session status code 4 - Indicates that the download session has failed and will not be retried.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    const SESSION_FAILED: number;
    /**
     * Starts a download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { DownloadConfig } config Download config
     * @param { AsyncCallback<DownloadTask> } callback Indicate the callback function to receive DownloadTask.
     * @throws { BusinessError } 201 - the permissions check fails
     * @syscap SystemCapability.MiscServices.Download
     * @FAModelOnly
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.request.downloadFile
     */
    function download(config: DownloadConfig, callback: AsyncCallback<DownloadTask>): void;
    /**
     * Starts a download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { DownloadConfig } config Download config
     * @param { AsyncCallback<DownloadTask> } callback Indicate the callback function to receive DownloadTask.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400001 - file operation error
     * @throws { BusinessError } 13400002 - bad file path
     * @throws { BusinessError } 13400003 - task service ability error
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Starts a download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { DownloadConfig } config Download config
     * @param { AsyncCallback<DownloadTask> } callback Indicate the callback function to receive DownloadTask.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400001 - file operation error
     * @throws { BusinessError } 13400002 - bad file path
     * @throws { BusinessError } 13400003 - task service ability error
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    function downloadFile(context: BaseContext, config: DownloadConfig, callback: AsyncCallback<DownloadTask>): void;
    /**
     * Starts a download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { DownloadConfig } config Download config
     * @returns { Promise<DownloadTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the permissions check fails
     * @syscap SystemCapability.MiscServices.Download
     * @FAModelOnly
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.request.downloadFile
     */
    function download(config: DownloadConfig): Promise<DownloadTask>;
    /**
     * Starts a download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { DownloadConfig } config Download config
     * @returns { Promise<DownloadTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400001 - file operation error
     * @throws { BusinessError } 13400002 - bad file path
     * @throws { BusinessError } 13400003 - task service ability error
     * @syscap SystemCapability.MiscServices.Download
     * @since 9
     */
    /**
     * Starts a download task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { DownloadConfig } config Download config
     * @returns { Promise<DownloadTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400001 - file operation error
     * @throws { BusinessError } 13400002 - bad file path
     * @throws { BusinessError } 13400003 - task service ability error
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    function downloadFile(context: BaseContext, config: DownloadConfig): Promise<DownloadTask>;
    /**
     * Starts an upload task.
     *
     * @permission ohos.permission.INTERNET
     * @param { UploadConfig } config Upload config
     * @param { AsyncCallback<UploadTask> } callback Indicate the callback function to receive UploadTask.
     * @throws { BusinessError } 201 - the permissions check fails
     * @syscap SystemCapability.MiscServices.Upload
     * @FAModelOnly
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.request.uploadFile
     */
    function upload(config: UploadConfig, callback: AsyncCallback<UploadTask>): void;
    /**
     * Starts an upload task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { UploadConfig } config Upload config
     * @param { AsyncCallback<UploadTask> } callback Indicate the callback function to receive UploadTask.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400002 - bad file path
     * @syscap SystemCapability.MiscServices.Upload
     * @since 9
     */
    /**
     * Starts an upload task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { UploadConfig } config Upload config
     * @param { AsyncCallback<UploadTask> } callback Indicate the callback function to receive UploadTask.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400002 - bad file path
     * @syscap SystemCapability.MiscServices.Upload
     * @crossplatform
     * @since 10
     */
    function uploadFile(context: BaseContext, config: UploadConfig, callback: AsyncCallback<UploadTask>): void;
    /**
     * Starts an upload task.
     *
     * @permission ohos.permission.INTERNET
     * @param { UploadConfig } config Upload config
     * @returns { Promise<UploadTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the permissions check fails
     * @syscap SystemCapability.MiscServices.Upload
     * @FAModelOnly
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.request.uploadFile
     */
    function upload(config: UploadConfig): Promise<UploadTask>;
    /**
     * Starts an upload task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { UploadConfig } config Upload config
     * @returns { Promise<UploadTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400002 - bad file path
     * @syscap SystemCapability.MiscServices.Upload
     * @since 9
     */
    /**
     * Starts an upload task.
     *
     * @permission ohos.permission.INTERNET
     * @param { BaseContext } context Indicates the application BaseContext.
     * @param { UploadConfig } config Upload config
     * @returns { Promise<UploadTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the permissions check fails
     * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
     * <br>2. Incorrect parameter type. 3. Parameter verification failed.
     * @throws { BusinessError } 13400002 - bad file path
     * @syscap SystemCapability.MiscServices.Upload
     * @crossplatform
     * @since 10
     */
    function uploadFile(context: BaseContext, config: UploadConfig): Promise<UploadTask>;
    /**
     * DownloadConfig data Structure
     *
     * @interface DownloadConfig
     * @syscap SystemCapability.MiscServices.Download
     * @since 6
     * @name DownloadConfig
     */
    /**
     * DownloadConfig data Structure
     *
     * @typedef DownloadConfig
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     * @name DownloadConfig
     */
    interface DownloadConfig {
        /**
         * Resource address.
         * Verification rule: Starting with http (s)://and with a length not exceeding 2048 characters.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Resource address.
         * Verification rule: Starting with http (s)://and with a length not exceeding 2048 characters.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        url: string;
        /**
         * Adds an HTTP or HTTPS header to be included with the download request.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Adds an HTTP or HTTPS header to be included with the download request.
         *
         * @type { ?Object }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        header?: Object;
        /**
         * Allows download under a metered connection.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Allows download under a metered connection.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        enableMetered?: boolean;
        /**
         * Allows download in a roaming network.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Allows download in a roaming network.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        enableRoaming?: boolean;
        /**
         * Sets the description of a download session.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Sets the description of a download session.
         *
         * @type { ?string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        description?: string;
        /**
         * Sets the network type allowed for download.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Sets the network type allowed for download.
         *
         * @type { ?number }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        networkType?: number;
        /**
         * Sets the path for downloads.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * Sets the path for downloads.
         *
         * @type { ?string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        filePath?: string;
        /**
         * Sets a download session title.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Sets a download session title.
         *
         * @type { ?string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        title?: string;
        /**
         * Allow download background task notifications.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Allow download background task notifications.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        background?: boolean;
    }
    /**
     * DownloadInfo data Structure
     *
     * @interface DownloadInfo
     * @syscap SystemCapability.MiscServices.Download
     * @since 7
     * @name DownloadInfo
     */
    /**
     * DownloadInfo data Structure
     *
     * @typedef DownloadInfo
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    interface DownloadInfo {
        /**
         * the description of a file to be downloaded.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the description of a file to be downloaded.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        description: string;
        /**
         * the real-time downloads size (in bytes).
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the real-time downloads size (in bytes).
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        downloadedBytes: number;
        /**
         * the ID of a file to be downloaded.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the ID of a file to be downloaded.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        downloadId: number;
        /**
         * a download failure cause, which can be any DownloadSession.ERROR_* constant.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * a download failure cause, which can be any DownloadSession.ERROR_* constant.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        failedReason: number;
        /**
         * the name of a file to be downloaded.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the name of a file to be downloaded.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        fileName: string;
        /**
         * the URI of a stored file.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the URI of a stored file.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        filePath: string;
        /**
         * the reason why a session is paused, which can be any DownloadSession.PAUSED_* constant.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the reason why a session is paused, which can be any DownloadSession.PAUSED_* constant.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        pausedReason: number;
        /**
         * the download status code, which can be any DownloadSession.SESSION_* constant.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the download status code, which can be any DownloadSession.SESSION_* constant.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        status: number;
        /**
         * the URI of files to be downloaded.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the URI of files to be downloaded.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        targetURI: string;
        /**
         * the title of a file to be downloaded.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the title of a file to be downloaded.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        downloadTitle: string;
        /**
         * the total size of files to be downloaded (in bytes).
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * the total size of files to be downloaded (in bytes).
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        downloadTotalBytes: number;
    }
    /**
     * Download task interface
     *
     * @interface DownloadTask
     * @syscap SystemCapability.MiscServices.Download
     * @since 6
     */
    /**
     * Download task interface
     *
     * @typedef DownloadTask
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    interface DownloadTask {
        /**
         * Called when the current download session is in process.
         *
         * @param { 'progress' } type progress Indicates the download task progress.
         * @param { function } callback
         *        The callback function for the download progress change event
         *        receivedSize the length of downloaded data, in bytes
         *        totalSize the length of data expected to be downloaded, in bytes.
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Called when the current download session is in process.
         *
         * @param { 'progress' } type progress Indicates the download task progress.
         * @param { function } callback
         *        The callback function for the download progress change event
         *        receivedSize the length of downloaded data, in bytes
         *        totalSize the length of data expected to be downloaded, in bytes.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current download session is in process.
         *
         * @param { 'progress' } type progress Indicates the download task progress.
         * @param { function } callback
         * <br>The callback function for the download progress change event
         * <br>receivedSize the length of downloaded data, in bytes
         * <br>totalSize the length of data expected to be downloaded, in bytes.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        on(type: 'progress', callback: (receivedSize: number, totalSize: number) => void): void;
        /**
         * Called when the current download session is in process.
         *
         * @param { 'progress' } type progress Indicates the download task progress.
         * @param { function } [callback]
         *        The callback function for the download progress change event
         *        receivedSize the length of downloaded data, in bytes
         *        totalSize the length of data expected to be downloaded, in bytes.
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Called when the current download session is in process.
         *
         * @param { 'progress' } type progress Indicates the download task progress.
         * @param { function } [callback]
         *        The callback function for the download progress change event
         *        receivedSize the length of downloaded data, in bytes
         *        totalSize the length of data expected to be downloaded, in bytes.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current download session is in process.
         *
         * @param { 'progress' } type progress Indicates the download task progress.
         * @param { function } [callback]
         * <br>The callback function for the download progress change event
         * <br>receivedSize the length of downloaded data, in bytes
         * <br>totalSize the length of data expected to be downloaded, in bytes.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        off(type: 'progress', callback?: (receivedSize: number, totalSize: number) => void): void;
        /**
         * Called when the current download session complete pause or remove.
         *
         * @param { 'complete' | 'pause' | 'remove' } type Indicates the download session event type
         *        complete: download task completed,
         *        pause: download task stopped,
         *        remove: download task deleted.
         * @param { function } callback The callback function for the download complete pause or remove change event.
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * Called when the current download session complete pause or remove.
         *
         * @param { 'complete' | 'pause' | 'remove' } type Indicates the download session event type
         *        complete: download task completed,
         *        pause: download task stopped,
         *        remove: download task deleted.
         * @param { function } callback The callback function for the download complete pause or remove change event.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current download session complete pause or remove.
         *
         * @param { 'complete' | 'pause' | 'remove' } type Indicates the download session event type
         * <br>complete: download task completed,
         * <br>pause: download task stopped,
         * <br>remove: download task deleted.
         * @param { function } callback The callback function for the download complete pause or remove change event.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        on(type: 'complete' | 'pause' | 'remove', callback: () => void): void;
        /**
         * Called when the current download session complete pause or remove.
         *
         * @param { 'complete' | 'pause' | 'remove' } type Indicates the download session event type
         *        complete: download task completed,
         *        pause: download task stopped,
         *        remove: download task deleted.
         * @param { function } [callback] The callback function for the download complete pause or remove change event.
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * Called when the current download session complete pause or remove.
         *
         * @param { 'complete' | 'pause' | 'remove' } type Indicates the download session event type
         *        complete: download task completed,
         *        pause: download task stopped,
         *        remove: download task deleted.
         * @param { function } [callback] The callback function for the download complete pause or remove change event.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current download session complete pause or remove.
         *
         * @param { 'complete' | 'pause' | 'remove' } type Indicates the download session event type
         * <br>complete: download task completed,
         * <br>pause: download task stopped,
         * <br>remove: download task deleted.
         * @param { function } [callback] The callback function for the download complete pause or remove change event.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        off(type: 'complete' | 'pause' | 'remove', callback?: () => void): void;
        /**
         * Called when the current download session fails.
         *
         * @param { 'fail' } type Indicates the download session type, fail: download task has failed.
         * @param { function } callback The callback function for the download fail change event
         *        err The error code for download task.
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * Called when the current download session fails.
         *
         * @param { 'fail' } type Indicates the download session type, fail: download task has failed.
         * @param { function } callback The callback function for the download fail change event
         *        err The error code for download task.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current download session fails.
         *
         * @param { 'fail' } type Indicates the download session type, fail: download task has failed.
         * @param { function } callback The callback function for the download fail change event
         * <br>err The error code for download task.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        on(type: 'fail', callback: (err: number) => void): void;
        /**
         * Called when the current download session fails.
         *
         * @param { 'fail' } type Indicates the download session type, fail: download task has failed.
         * @param { function } [callback] Indicate the callback function to receive err.
         *        err The error code for download task.
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         */
        /**
         * Called when the current download session fails.
         *
         * @param { 'fail' } type Indicates the download session type, fail: download task has failed.
         * @param { function } [callback] Indicate the callback function to receive err.
         *        err The error code for download task.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current download session fails.
         *
         * @param { 'fail' } type Indicates the download session type, fail: download task has failed.
         * @param { function } [callback] Indicate the callback function to receive err.
         * <br>err The error code for download task.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        off(type: 'fail', callback?: (err: number) => void): void;
        /**
         * Deletes a download session and the downloaded files.
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback Indicates asynchronous invoking Result.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.request.delete
         */
        remove(callback: AsyncCallback<boolean>): void;
        /**
         * Deletes a download session and the downloaded files.
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.request.delete
         */
        remove(): Promise<boolean>;
        /**
         * Pause a download session.
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<void> } callback Indicates asynchronous invoking Result.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.suspend
         */
        pause(callback: AsyncCallback<void>): void;
        /**
         * Pause a download session.
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.suspend
         */
        pause(): Promise<void>;
        /**
         * Resume a paused download session.
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<void> } callback Indicates asynchronous invoking Result.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.restore
         */
        resume(callback: AsyncCallback<void>): void;
        /**
         * Resume a paused download session.
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.restore
         */
        resume(): Promise<void>;
        /**
         * Queries download information of a session, which is defined in DownloadSession.DownloadInfo.
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<DownloadInfo> } callback Indicate the callback function to receive download info.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.getTaskInfo
         */
        query(callback: AsyncCallback<DownloadInfo>): void;
        /**
         * Queries download information of a session, which is defined in DownloadSession.DownloadInfo.
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<DownloadInfo> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.getTaskInfo
         */
        query(): Promise<DownloadInfo>;
        /**
         * Queries the MIME type of the download file.
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<string> } callback Indicate the callback function to receive download file MIME type.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.getTaskMimeType
         */
        queryMimeType(callback: AsyncCallback<string>): void;
        /**
         * Queries the MIME type of the download file.
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.request.getTaskMimeType
         */
        queryMimeType(): Promise<string>;
        /**
         * Delete the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Delete the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Delete the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        delete(callback: AsyncCallback<boolean>): void;
        /**
         * Delete the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Delete the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Delete the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        delete(): Promise<boolean>;
        /**
         * Suspend the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Suspend the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Suspend the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        suspend(callback: AsyncCallback<boolean>): void;
        /**
         * Suspend the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Suspend the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Suspend the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        suspend(): Promise<boolean>;
        /**
         * Restore the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Restore the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Restore the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        restore(callback: AsyncCallback<boolean>): void;
        /**
         * Restore the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Restore the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Restore the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        restore(): Promise<boolean>;
        /**
         * Get the download task info
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<DownloadInfo> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Get the download task info
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<DownloadInfo> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Get the download task info
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<DownloadInfo> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        getTaskInfo(callback: AsyncCallback<DownloadInfo>): void;
        /**
         * Get the download task info
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<DownloadInfo> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Get the download task info
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<DownloadInfo> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Get the download task info
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<DownloadInfo> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        getTaskInfo(): Promise<DownloadInfo>;
        /**
         * Get mimetype of the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<string> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Get mimetype of the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<string> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Get mimetype of the download task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<string> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        getTaskMimeType(callback: AsyncCallback<string>): void;
        /**
         * Get mimetype of the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @since 9
         */
        /**
         * Get mimetype of the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        /**
         * Get mimetype of the download task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 12
         */
        getTaskMimeType(): Promise<string>;
    }
    /**
     * File data Structure
     *
     * @interface File
     * @syscap SystemCapability.MiscServices.Download
     * @since 6
     * @name File
     */
    /**
     * File data Structure
     *
     * @typedef File
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    interface File {
        /**
         * When multipart is submitted, the file name in the request header.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * When multipart is submitted, the file name in the request header.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        filename: string;
        /**
         * When multipart is submitted, the name of the form item. The default is file.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * When multipart is submitted, the name of the form item. The default is file.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        name: string;
        /**
         * The local storage path of the file (please refer to the storage directory definition for path usage).
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * The local storage path of the file (please refer to the storage directory definition for path usage).
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        uri: string;
        /**
         * The content type of the file is obtained by default according to the suffix of the file name or path.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * The content type of the file is obtained by default according to the suffix of the file name or path.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        type: string;
    }
    /**
     * RequestData data Structure
     *
     * @interface RequestData
     * @syscap SystemCapability.MiscServices.Download
     * @since 6
     * @name RequestData
     */
    /**
     * RequestData data Structure
     *
     * @typedef RequestData
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    interface RequestData {
        /**
         * Represents the name of the form element.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Represents the name of the form element.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        name: string;
        /**
         * Represents the value of the form element.
         *
         * @syscap SystemCapability.MiscServices.Download
         * @since 6
         */
        /**
         * Represents the value of the form element.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Download
         * @crossplatform
         * @since 10
         */
        value: string;
    }
    /**
     * UploadConfig data Structure
     *
     * @interface UploadConfig
     * @syscap SystemCapability.MiscServices.Upload
     * @since 6
     * @name UploadConfig
     */
    /**
     * UploadConfig data Structure
     *
     * @typedef UploadConfig
     * @syscap SystemCapability.MiscServices.Upload
     * @crossplatform
     * @since 10
     */
    interface UploadConfig {
        /**
         * Resource address.
         * Verification rule: Starting with http (s)://and with a length not exceeding 2048 characters.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         */
        /**
         * Resource address.
         * Verification rule: Starting with http (s)://and with a length not exceeding 2048 characters.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        url: string;
        /**
         * Adds an HTTP or HTTPS header to be included with the upload request.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         */
        /**
         * Adds an HTTP or HTTPS header to be included with the upload request.
         *
         * @type { Object }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        header: Object;
        /**
         * Request method: POST, PUT. The default POST.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         */
        /**
         * Request method: POST, PUT. The default POST.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        method: string;
        /**
         * The index of paths for a task.
         * Usually used for a continuous job.
         * The default is 0.
         *
         * @type { ?number }
         * @syscap SystemCapability.MiscServices.Upload
         * @since 11
         */
        index?: number;
        /**
         * The start point of a file.
         * Usually used for a continuous job.
         * It will start read at the point in upload.
         * The default is 0.
         *
         * @type { ?number }
         * @syscap SystemCapability.MiscServices.Upload
         * @since 11
         */
        begins?: number;
        /**
         * The end point of a file.
         * Usually used for a continuous job.
         * It will end read at the point in upload.
         * The default is -1 indicating the end of the data for upload.
         *
         * @type { ?number }
         * @syscap SystemCapability.MiscServices.Upload
         * @since 11
         */
        ends?: number;
        /**
         * A list of files to be uploaded. Please use multipart/form-data to submit.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         */
        /**
         * A list of files to be uploaded. Please use multipart/form-data to submit.
         *
         * @type { Array<File> }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        files: Array<File>;
        /**
         * The requested form data.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         */
        /**
         * The requested form data.
         *
         * @type { Array<RequestData> }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        data: Array<RequestData>;
    }
    /**
     * TaskState data Structure
     *
     * @interface TaskState
     * @syscap SystemCapability.MiscServices.Upload
     * @since 9
     * @name TaskState
     */
    /**
     * TaskState data Structure
     *
     * @typedef TaskState
     * @syscap SystemCapability.MiscServices.Upload
     * @crossplatform
     * @since 10
     */
    interface TaskState {
        /**
         * Upload file path.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 9
         */
        /**
         * Upload file path.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        path: string;
        /**
         * Upload task return value.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 9
         */
        /**
         * Upload task return value.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        responseCode: number;
        /**
         * Upload task information.
         *
         * @syscap SystemCapability.MiscServices.Upload
         * @since 9
         */
        /**
         * Upload task information.
         *
         * @type { string }
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        message: string;
    }
    /**
     * Upload task interface
     *
     * @interface UploadTask
     * @syscap SystemCapability.MiscServices.Download
     * @since 6
     */
    /**
     * Upload task interface
     *
     * @typedef UploadTask
     * @syscap SystemCapability.MiscServices.Download
     * @crossplatform
     * @since 10
     */
    interface UploadTask {
        /**
         * Called when the current upload session is in process.
         *
         * @param { 'progress' } type progress Indicates the upload task progress.
         * @param { function } callback
         *        The callback function for the upload progress change event
         *        uploadedSize The length of uploaded data, in bytes
         *        totalSize The length of data expected to be uploaded, in bytes.
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         */
        /**
         * Called when the current upload session is in process.
         *
         * @param { 'progress' } type progress Indicates the upload task progress.
         * @param { function } callback
         *        The callback function for the upload progress change event
         *        uploadedSize The length of uploaded data, in bytes
         *        totalSize The length of data expected to be uploaded, in bytes.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current upload session is in process.
         *
         * @param { 'progress' } type progress Indicates the upload task progress.
         * @param { function } callback
         * <br>The callback function for the upload progress change event
         * <br>uploadedSize The length of uploaded data, in bytes
         * <br>totalSize The length of data expected to be uploaded, in bytes.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        on(type: 'progress', callback: (uploadedSize: number, totalSize: number) => void): void;
        /**
         * Called when the current upload session is in process.
         *
         * @param { 'progress' } type progress Indicates the upload task progress.
         * @param { function } [callback]
         *        The callback function for the upload progress change event
         *        uploadedSize The length of uploaded data, in bytes
         *        totalSize The length of data expected to be uploaded, in bytes.
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         */
        /**
         * Called when the current upload session is in process.
         *
         * @param { 'progress' } type progress Indicates the upload task progress.
         * @param { function } [callback]
         *        The callback function for the upload progress change event
         *        uploadedSize The length of uploaded data, in bytes
         *        totalSize The length of data expected to be uploaded, in bytes.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current upload session is in process.
         *
         * @param { 'progress' } type progress Indicates the upload task progress.
         * @param { function } [callback]
         * <br>The callback function for the upload progress change event
         * <br>uploadedSize The length of uploaded data, in bytes
         * <br>totalSize The length of data expected to be uploaded, in bytes.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        off(type: 'progress', callback?: (uploadedSize: number, totalSize: number) => void): void;
        /**
         * Called when the header of the current upload session has been received.
         *
         * @param { 'headerReceive' } type headerReceive Indicates the upload task headed receive.
         * @param { function } callback The callback function for the HTTP Response Header event
         *        header HTTP Response Header returned by the developer server.
         * @syscap SystemCapability.MiscServices.Upload
         * @since 7
         */
        /**
         * Called when the header of the current upload session has been received.
         *
         * @param { 'headerReceive' } type headerReceive Indicates the upload task headed receive.
         * @param { function } callback The callback function for the HTTP Response Header event
         *        header HTTP Response Header returned by the developer server.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the header of the current upload session has been received.
         *
         * @param { 'headerReceive' } type headerReceive Indicates the upload task headed receive.
         * @param { function } callback The callback function for the HTTP Response Header event
         * <br>header HTTP Response Header returned by the developer server.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        on(type: 'headerReceive', callback: (header: object) => void): void;
        /**
         * Called when the header of the current upload session has been received.
         *
         * @param { 'headerReceive' } type headerReceive Indicates the upload task headed receive.
         * @param { function } [callback] The callback function for the HTTP Response Header event
         *        header HTTP Response Header returned by the developer server.
         * @syscap SystemCapability.MiscServices.Upload
         * @since 7
         */
        /**
         * Called when the header of the current upload session has been received.
         *
         * @param { 'headerReceive' } type headerReceive Indicates the upload task headed receive.
         * @param { function } [callback] The callback function for the HTTP Response Header event
         *        header HTTP Response Header returned by the developer server.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the header of the current upload session has been received.
         *
         * @param { 'headerReceive' } type headerReceive Indicates the upload task headed receive.
         * @param { function } [callback] The callback function for the HTTP Response Header event
         * <br>header HTTP Response Header returned by the developer server.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        off(type: 'headerReceive', callback?: (header: object) => void): void;
        /**
         * Called when the current upload session complete or fail.
         *
         * @param { 'complete' | 'fail' } type Indicates the upload session event type
         *        complete: upload task completed
         *        fail: upload task failed
         * @param { Callback<Array<TaskState>> } callback The callback function for the upload complete or fail change event.
         * @syscap SystemCapability.MiscServices.Upload
         * @since 9
         */
        /**
         * Called when the current upload session complete or fail.
         *
         * @param { 'complete' | 'fail' } type Indicates the upload session event type
         *        complete: upload task completed
         *        fail: upload task failed
         * @param { Callback<Array<TaskState>> } callback The callback function for the upload complete or fail change event.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current upload session complete or fail.
         *
         * @param { 'complete' | 'fail' } type Indicates the upload session event type
         * <br>complete: upload task completed
         * <br>fail: upload task failed
         * @param { Callback<Array<TaskState>> } callback The callback function for the upload complete or fail change event.
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        on(type: 'complete' | 'fail', callback: Callback<Array<TaskState>>): void;
        /**
         * Called when the current upload session complete or fail.
         *
         * @param { 'complete' | 'fail' } type Indicates the upload session event type
         *        complete: upload task completed
         *         fail: upload task failed
         * @param { Callback<Array<TaskState>> } [callback]
         * @syscap SystemCapability.MiscServices.Upload
         * @since 9
         */
        /**
         * Called when the current upload session complete or fail.
         *
         * @param { 'complete' | 'fail' } type Indicates the upload session event type
         *        complete: upload task completed
         *         fail: upload task failed
         * @param { Callback<Array<TaskState>> } [callback]
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Called when the current upload session complete or fail.
         *
         * @param { 'complete' | 'fail' } type Indicates the upload session event type
         * <br>complete: upload task completed
         * <br>fail: upload task failed
         * @param { Callback<Array<TaskState>> } [callback]
         * @throws { BusinessError } 401 - the parameters check fails. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        off(type: 'complete' | 'fail', callback?: Callback<Array<TaskState>>): void;
        /**
         * Deletes an upload session.
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback Indicates asynchronous invoking Result.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.request.delete
         */
        remove(callback: AsyncCallback<boolean>): void;
        /**
         * Deletes an upload session.
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.request.delete
         */
        remove(): Promise<boolean>;
        /**
         * Delete the upload task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @since 9
         */
        /**
         * Delete the upload task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Delete the upload task
         *
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        delete(callback: AsyncCallback<boolean>): void;
        /**
         * Delete the upload task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @since 9
         */
        /**
         * Delete the upload task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @throws { BusinessError } 401 - the parameters check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 10
         */
        /**
         * Delete the upload task
         *
         * @permission ohos.permission.INTERNET
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 201 - the permissions check fails
         * @syscap SystemCapability.MiscServices.Upload
         * @crossplatform
         * @since 12
         */
        delete(): Promise<boolean>;
    }
    /**
     * The request agent api.
     * Supports "background" and "frontend" tasks as while.
     * Though "background" and "frontend" here do not the same with process's concept.
     * All tasks will be executed at request manager service and recorded.
     * Background tasks is for concurrent transfer, such as caching videos for a later play.
     * Frontend tasks is for instant transfer, such as submitting forms for a consumption bill.
     * Background tasks use notification to tell user tasks' status information.
     * Frontend tasks use callback to tell caller tasks' status information.
     * Background has some automatically restore mechanism.
     * Frontend tasks controlled by caller.
     * Uses `multipart/form-data` in client request for upload.
     * A `Content-Disposition: attachment; filename=<filename>` response from server leads to download.
     * More details, please see the architecture documents of the request subsystem.
     *
     * @namespace agent
     * @syscap SystemCapability.Request.FileTransferAgent
     * @since 10
     */
    /**
     * The request agent api.
     * Supports "background" and "frontend" tasks as while.
     * Though "background" and "frontend" here do not the same with process's concept.
     * All tasks will be executed at request manager service and recorded.
     * Background tasks is for concurrent transfer, such as caching videos for a later play.
     * Frontend tasks is for instant transfer, such as submitting forms for a consumption bill.
     * Background tasks use notification to tell user tasks' status information.
     * Frontend tasks use callback to tell caller tasks' status information.
     * Background has some automatically restore mechanism.
     * Frontend tasks controlled by caller.
     * Uses `multipart/form-data` in client request for upload.
     * A `Content-Disposition: attachment; filename=<filename>` response from server leads to download.
     * More details, please see the architecture documents of the request subsystem.
     * Only front-end mode is supported in cross-platform scenarios.
     *
     * @namespace agent
     * @syscap SystemCapability.Request.FileTransferAgent
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    namespace agent {
        /**
         * The action options.
         *
         * @enum { number } Action
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The action options.
         *
         * @enum { number } Action
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        enum Action {
            /**
             * Indicates download task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates download task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            DOWNLOAD,
            /**
             * Indicates upload task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates upload task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            UPLOAD
        }
        /**
         * The mode options.
         *
         * @enum { number } Mode
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The mode options.
         *
         * @enum { number } Mode
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        enum Mode {
            /**
             * Indicates background task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates background task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 11
             */
            BACKGROUND,
            /**
             * Indicates foreground task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates foreground task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            FOREGROUND
        }
        /**
         * The network options.
         *
         * @enum { number } Network
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The network options.
         *
         * @enum { number } Network
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        enum Network {
            /**
             * Indicates no restriction on network type.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates no restriction on network type.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            ANY,
            /**
             * Indicates Wi-Fi only.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates Wi-Fi only.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            WIFI,
            /**
             * Indicates cellular only.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates cellular only.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            CELLULAR
        }
        /**
         * Broadcast events for the request.
         *
         * @enum { string } BroadcastEvent
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 11
         */
        enum BroadcastEvent {
            /**
             * Completion event for the task.
             * The code in the commonEventData can only be "0x40"(COMPLETE) or "0x41"(FAILED), same as "State".
             * The data in the commonEventData contains the id of the task.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            COMPLETE = 'ohos.request.event.COMPLETE'
        }
        /**
         * The file information for a form item.
         *
         * @typedef FileSpec
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The file information for a form item.
         *
         * @typedef FileSpec
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        interface FileSpec {
            /**
             * A relative path string, like "./xxx/yyy/zzz.html", "xxx/yyy/zzz.html", in the caller's cache directory.
             *
             * @type { string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * A relative path string, like "./xxx/yyy/zzz.html", "xxx/yyy/zzz.html", in the caller's cache directory.
             *
             * @type { string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            /**
             * The path to save the uploaded file.
             * Currently support:
             * 1: relative path, like "./xxx/yyy/zzz.html", "xxx/yyy/zzz.html", under caller's cache folder.
             * 2: internal protocol path, starting with "internal://", like "internal://cache/path/to/file.txt".
             * 3: application storage path, only the base directory and its subdirectories are supported, like "/data/storage/el1/base/path/to/file.txt".
             * 4: file protocol path with self bundle name, only the base directory and its subdirectories are supported, like "file://com.example.test/data/storage/el2/base/file.txt".
             * 5: user file url, like "file://media/Photo/path/to/file.png".
             *
             * @type { string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            path: string;
            /**
             * The MIME type of the file.
             * The default is obtained by the suffix of the filename.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The MIME type of the file.
             * The default is obtained by the suffix of the filename.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            mimeType?: string;
            /**
             * The filename, the default is obtained by path.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The filename, the default is obtained by path.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            filename?: string;
            /**
             * The extras for the file information.
             *
             * @type { ?object }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The extras for the file information.
             *
             * @type { ?object }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            extras?: object;
        }
        /**
         * The form item information for a task.
         *
         * @typedef FormItem
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The form item information for a task.
         *
         * @typedef FormItem
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        interface FormItem {
            /**
             * The item's name.
             *
             * @type { string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The item's name.
             *
             * @type { string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            name: string;
            /**
             * The item's value.
             *
             * @type { string | FileSpec | Array<FileSpec> }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The item's value.
             *
             * @type { string | FileSpec | Array<FileSpec> }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            value: string | FileSpec | Array<FileSpec>;
        }
        /**
         * The configurations for a task.
         * Using a flexible configuration for clear upload and download functions.
         * If without emphasis, an option is for any task.
         *
         * @typedef Config
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The configurations for a task.
         * Using a flexible configuration for clear upload and download functions.
         * If without emphasis, an option is for any task.
         *
         * @typedef Config
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        interface Config {
            /**
             * The task action, upload or download.
             *
             * @type { Action }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The task action, upload or download.
             *
             * @type { Action }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            action: Action;
            /**
             * The Universal Resource Locator for a task.
             * Starting with http(s)://
             * The maximum length is 2048 characters.
             * Using raw `url` option, even url parameters in it.
             *
             * @type { string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The Universal Resource Locator for a task.
             * The maximum length is 2048 characters.
             * Using raw `url` option, even url parameters in it.
             *
             * @type { string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            url: string;
            /**
             * The title for a task, give a meaningful title please.
             * The maximum length is 256 characters.
             * The default is the same with its action.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The title for a task, give a meaningful title please.
             * The maximum length is 256 characters.
             * The default is upload or download, consistent with its action.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            title?: string;
            /**
             * The details for a task.
             * The maximum length is 1024 characters.
             * The default is empty string.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The details for a task.
             * The maximum length is 1024 characters.
             * The default is empty string.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            description?: string;
            /**
             * Indicates task's mode.
             * The default is background.
             * For frontend task, it has callbacks.
             * For background task, it has notifications and fallback.
             *
             * @type { ?Mode }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates task's mode.
             * The default is BACKGROUND.
             * For frontend task, it has callbacks.
             * For background task, it has notifications and fallback.
             * The cross-platform default is FOREGROUND.
             *
             * @type { ?Mode }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            mode?: Mode;
            /**
             * The solution choice when path already exists during download.
             * Currently support:
             * true, rewrite the existed file.
             * false, go to fail.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The solution choice when path already exists during download.
             * The default is false.
             * Currently support:
             * true, rewrite the existed file.
             * false, go to fail.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            overwrite?: boolean;
            /**
             * The HTTP standard method for upload or download: GET/POST/PUT.
             * Case insensitive.
             * For upload, use PUT/POST, the default is PUT.
             * For download, use GET/POST, the default is GET.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The HTTP standard method for upload or download: GET/POST/PUT.
             * Case insensitive.
             * For upload, use PUT/POST, the default is PUT.
             * For download, use GET/POST, the default is GET.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            method?: string;
            /**
             * The HTTP headers.
             * For upload request, the `Content-Type` is forced to `multipart/form-data`.
             * For download request, the default `Content-Type` is `application/json`.
             *
             * @type { ?object }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The HTTP headers.
             * For upload request, the `Content-Type` is forced to `multipart/form-data`.
             * For download request, the default `Content-Type` is `application/json`.
             *
             * @type { ?object }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            headers?: object;
            /**
             * The arguments, it can be any text, uses json usually.
             * For download, it can be raw string, the default is empty string.
             * For upload, it can be form items, the default is a empty form.
             * there must be one `FileSpec` item at least or will be a parameter error.
             *
             * @type { ?(string | Array<FormItem>) }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The arguments, it can be any text, uses json usually.
             * For download, it can be raw string, the default is empty string.
             * For upload, it can be form items, the default is a empty form.
             * there must be one `FileSpec` item at least or will be a parameter error.
             *
             * @type { ?(string | Array<FormItem>) }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            data?: string | Array<FormItem>;
            /**
             * The path to save the downloaded file, the default is "./".
             * Currently support:
             * 1: relative path, like "./xxx/yyy/zzz.html", "xxx/yyy/zzz.html", under caller's cache folder.
             * 2: uri path, like "datashare://bundle/xxx/yyy/zzz.html", the data provider must allow the caller's access.
             *
             * @type { ?string }
             * @default ./
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The path to save the downloaded file, the default is "./".
             * Currently support:
             * 1: relative path, like "./xxx/yyy/zzz.html", "xxx/yyy/zzz.html", under caller's cache folder.
             * 2: uri path, like "datashare://bundle/xxx/yyy/zzz.html", the data provider must allow the caller's access.
             *
             * @type { ?string }
             * @default ./
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            /**
             * The path to save the downloaded file, the default is "./".
             * Currently support:
             * 1: relative path, like "./xxx/yyy/zzz.html", "xxx/yyy/zzz.html", under caller's cache folder.
             * 2: internal protocol path, starting with "internal://", like "internal://cache/path/to/file.txt".
             * 3: application storage path, only the base directory and its subdirectories are supported, like "/data/storage/el1/base/path/to/file.txt".
             * 4: file protocol path with self bundle name, only the base directory and its subdirectories are supported, like "file://com.example.test/data/storage/el2/base/file.txt".
             *
             * @type { ?string }
             * @default ./
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            saveas?: string;
            /**
             * The network.
             *
             * @type { ?Network }
             * @default Network.ANY
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The network.
             *
             * @type { ?Network }
             * @default Network.ANY
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            network?: Network;
            /**
             * Allows work in metered network or not.
             * The default is false.
             *
             * @type { ?boolean }
             * @default false
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Allows work in metered network or not.
             * The default is false.
             *
             * @type { ?boolean }
             * @default false
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            metered?: boolean;
            /**
             * Allows work in roaming network or not.
             * The default is true.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Allows work in roaming network or not.
             * The default is true.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            roaming?: boolean;
            /**
             * Enable automatic retry or not for the background task.
             * The frontend task is always fast-fail.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Enable automatic retry or not for the background task.
             * The frontend task is always fast-fail.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 11
             */
            retry?: boolean;
            /**
             * Allows redirect or not.
             * The default is yes.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Allows redirect or not.
             * The default is true.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            redirect?: boolean;
            /**
             * The proxy url for the task.
             * Only this format is supported: http://<domain or IP-address>:<port>
             * Username and password are not supported.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 12
             */
            proxy?: string;
            /**
             * The index of paths for a task.
             * Usually used for a continuous job.
             * The default is 0.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The index of paths for a task.
             * Usually used for a continuous job.
             * The default is 0.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            index?: number;
            /**
             * The start point of a file.
             * Usually used for a continuous job.
             * It will set the "Range" header in download.
             * It will start read at the point in upload.
             * The default is 0.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The start point of a file.
             * Usually used for a continuous job.
             * It will set the "Range" header in download.
             * It will start read at the point in upload.
             * The default is 0.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            begins?: number;
            /**
             * The end point of a file.
             * Usually used for a continuous job.
             * It will set The "Range" header in download.
             * It will end read at the point in upload.
             * The default is -1 indicating the end of the data for upload or download.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The end point of a file.
             * Usually used for a continuous job.
             * It will set The "Range" header in download.
             * It will end read at the point in upload.
             * The default is -1 indicating the end of the data for upload or download.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            ends?: number;
            /**
             * The policy of the progress notification for background task.
             * If false: only completed or failed notification, the default.
             * If true, emits every progress, completed or failed notifications.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The policy of the progress notification for background task.
             * If false: only completed or failed notification, the default.
             * If true, emits every progress, completed or failed notifications.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 11
             */
            gauge?: boolean;
            /**
             * Breaks when fail to fetch filesize before upload/download or not.
             * Uses filesize for a precise gauge.
             * The default is not, set size as -1 indicating the case.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Breaks when fail to fetch filesize before upload/download or not.
             * Uses filesize for a precise gauge.
             * The default is false, set size as -1 indicating the case.
             *
             * @type { ?boolean }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            precise?: boolean;
            /**
             * For in-application layer isolation.
             * If given:
             *   the minimum is 8 bytes.
             *   the maximum is 2048 bytes.
             * Creates a task with token, then must provide it during normal query.
             * So saves the token carefully, it can not be retrieved by query.
             * Or leave it empty.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * For in-application layer isolation.
             * If given:
             *   the minimum is 8 bytes.
             *   the maximum is 2048 bytes.
             * Creates a task with token, then must provide it during normal query.
             * So saves the token carefully, it can not be retrieved by query.
             * Or leave it empty.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            token?: string;
            /**
             * The priority of this task.
             * Front-end tasks have higher priority than back-end tasks.
             * In tasks of the same mode, the smaller the number, the higher the priority.
             * The default is 0.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            priority?: number;
            /**
             * The extras for the configuration.
             *
             * @type { ?object }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The extras for the configuration.
             *
             * @type { ?object }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            extras?: object;
        }
        /**
         * Indicate the current state of the task.
         *
         * @enum { number } State
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Indicate the current state of the task.
         *
         * @enum { number } State
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        enum State {
            /**
             * Indicates a task created by `new Task(Config)`.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a task created by `new Task(Config)`.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            INITIALIZED = 0x00,
            /**
             * Indicates a task lack of resources or conditions to run or retry.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a task lack of resources or conditions to run or retry.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            WAITING = 0x10,
            /**
             * Indicates a task in processing now.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a task in processing now.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            RUNNING = 0x20,
            /**
             * Indicates a task failed once at least and in processing again now.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a task failed once at least and in processing again now.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            RETRYING = 0x21,
            /**
             * Indicates a paused task which tends to be resumed for continuous work.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a paused task which tends to be resumed for continuous work.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            PAUSED = 0x30,
            /**
             * Indicates a stopped task which must be started again.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a stopped task which must be started again.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            STOPPED = 0x31,
            /**
             * Indicates a completed task which finish its data transfer.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a completed task which finish its data transfer.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            COMPLETED = 0x40,
            /**
             * Indicates a failed task which interrupted by some error.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a failed task which interrupted by some error.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            FAILED = 0x41,
            /**
             * Indicates a removed task which can not be processed again.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates a removed task which can not be processed again.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            REMOVED = 0x50
        }
        /**
         * The progress data structure.
         * Upload allows multiple files per upload task.
         * Only one file in a download task.
         * So using a unified data structure for progress.
         * Generally:
         * 1: sum(sizes) is total files size of the task.
         * 2: float(processed)/sizes[counter] is the progress for the current processing file.
         * 3: float(sum(sizes[:index])+processed)/sum(sizes) is the summary progress for a task.
         * If fetch file size in failure, the size of the file in sizes will be set as -1.
         *
         * @typedef Progress
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The progress data structure.
         * Upload allows multiple files per upload task.
         * Only one file in a download task.
         * So using a unified data structure for progress.
         * Generally:
         * 1: sum(sizes) is total files size of the task.
         * 2: float(processed)/sizes[counter] is the progress for the current processing file.
         * 3: float(sum(sizes[:index])+processed)/sum(sizes) is the summary progress for a task.
         * If fetch file size in failure, the size of the file in sizes will be set as -1.
         *
         * @typedef Progress
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        interface Progress {
            /**
             * The current state of the task.
             *
             * @type { State }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The current state of the task.
             *
             * @type { State }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            readonly state: State;
            /**
             * The current processing file index in a task.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The current processing file index in a task.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            readonly index: number;
            /**
             * The processed data size for the current file in a task.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The processed data size for the current file in a task.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            readonly processed: number;
            /**
             * The sizes of files in a task.
             *
             * @type { Array<number> }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The sizes of files in a task.
             *
             * @type { Array<number> }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            readonly sizes: Array<number>;
            /**
             * The extras for an interaction.
             * Such as headers and body of response from server.
             * But when the Content-Disposition header responded, the body will be into the uri of its attachment only, the body here is empty.
             * {"headers": {"key": v}, "body": "contents"}.
             *
             * @type { ?object }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The extras for an interaction.
             * Such as headers and body of response from server.
             * But when the Content-Disposition header responded, the body will be into the uri of its attachment only, the body here is empty.
             * {"headers": {"key": v}, "body": "contents"}.
             * The "body" field is not supported in cross-platform scenarios.
             *
             * @type { ?object }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            readonly extras?: object;
        }
        /**
         * Indicates the reason for the failure.
         *
         * @enum { number }
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Indicates the reason for the failure.
         *
         * @enum { number }
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        enum Faults {
            /**
             * Indicates others failure.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates others failure.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            OTHERS = 0xFF,
            /**
             * Indicates network disconnection.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates network disconnection.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            DISCONNECTED = 0x00,
            /**
             * Indicates task timeout.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates task timeout.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            TIMEOUT = 0x10,
            /**
             * Indicates protocol error, such as 5xx response from server.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates protocol error, such as 5xx response from server.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            PROTOCOL = 0x20,
            /**
             * Indicates parameter error, such as url format error.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            PARAM = 0x30,
            /**
             * Indicates filesystem io error, such as open/seek/read/write/close.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Indicates filesystem io error, such as open/seek/read/write/close.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            FSIO = 0x40,
            /**
             * Indicates DNS resolution error.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            DNS = 0x50,
            /**
             * Indicates TCP connection error.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            TCP = 0x60,
            /**
             * Indicates SSL connection error, such as a certificate error or certificate verification failure.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            SSL = 0x70,
            /**
             * Indicates redirect error.
             *
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            REDIRECT = 0x80
        }
        /**
         * The filter data structure.
         * Used for search, given fields works as **LOGICAL AND**.
         * Invalid value may cause a parameter error.
         *
         * @typedef Filter
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The filter data structure.
         * Used for search, given fields works as **LOGICAL AND**.
         * Invalid value may cause a parameter error.
         *
         * @typedef Filter
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        interface Filter {
            /**
             * Specify the end Unix timestamp.
             * The default is the moment of calling.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Specify the end Unix timestamp.
             * The default is the moment of calling.
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            before?: number;
            /**
             * Specify the start Unix timestamp.
             * The default is "`before` - 24 hours".
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Specify the start Unix timestamp.
             * The default is "`before` - 24 hours".
             *
             * @type { ?number }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            after?: number;
            /**
             * Specify the state of tasks.
             * The default is any state.
             *
             * @type { ?State }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Specify the state of tasks.
             * The default is any state.
             *
             * @type { ?State }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            state?: State;
            /**
             * Specify the action of tasks, "upload" or "download", case insensitive.
             * The default is upload and download.
             *
             * @type { ?Action }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Specify the action of tasks, "upload" or "download", case insensitive.
             * The default is upload and download.
             *
             * @type { ?Action }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            action?: Action;
            /**
             * Specify task's mode.
             * The default is frontend and background.
             *
             * @type { ?Mode }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Specify task's mode.
             * The default is FOREGROUND and BACKGROUND.
             *
             * @type { ?Mode }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            mode?: Mode;
        }
        /**
         * The task information data structure for query results.
         * Provides common query and advanced query, visible range of fields is different.
         *
         * @typedef TaskInfo
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The task information data structure for query results.
         * Provides common query and advanced query, visible range of fields is different.
         *
         * @typedef TaskInfo
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        interface TaskInfo {
            /**
             * The path to save the downloaded file.
             *
             * @type { ?string }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The path to save the downloaded file.
             *
             * @type { ?string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly saveas?: string;
            /**
             * The url of a task.
             * For `${ show }` and `${ touch }`.
             * It is empty string in `${ query }`.
             *
             * @type { ?string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The url of a task.
             * For `${ show }` and `${ touch }`.
             *
             * @type { ?string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly url?: string;
            /**
             * The arguments.
             * For `${ show }` and `${ touch }`.
             * It is empty string in `${ query }`.
             *
             * @type { ?(string | Array<FormItem>) }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The arguments.
             * For `${ show }` and `${ touch }`.
             *
             * @type { ?(string | Array<FormItem>) }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly data?: string | Array<FormItem>;
            /**
             * The task id.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The task id.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly tid: string;
            /**
             * The task title.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The task title.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly title: string;
            /**
             * The task details.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The task details.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly description: string;
            /**
             * The task action.
             *
             * @type { Action }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The task action.
             *
             * @type { Action }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly action: Action;
            /**
             * Specify task mode.
             * The default is frontend and background.
             *
             * @type { Mode }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Specify task mode.
             * The default is frontend.
             *
             * @type { Mode }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly mode: Mode;
            /**
             * The priority of this task.
             * Front-end tasks have higher priority than back-end tasks.
             * In tasks of the same mode, the smaller the number, the higher the priority.
             * The default is 0.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            readonly priority: number;
            /**
             * The MIME type in the configuration of the task.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The MIME type in the configuration of the task.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly mimeType: string;
            /**
             * An instance of `Progress` for a task.
             *
             * @type { Progress }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * An instance of `Progress` for a task.
             *
             * @type { Progress }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly progress: Progress;
            /**
             * The progress notification policy of a background task.
             *
             * @type { boolean }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            readonly gauge: boolean;
            /**
             * The creating date and time of a task in Unix timestamp.
             * It is generated by system of current device.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The creating date and time of a task in Unix timestamp.
             * It is generated by system of current device.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly ctime: number;
            /**
             * The modified date and time of a task in Unix timestamp.
             * It is generated by system of current device.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The modified date and time of a task in Unix timestamp.
             * It is generated by system of current device.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly mtime: number;
            /**
             * The retry switch of a task.
             * Just for background, frontend always disabled.
             *
             * @type { boolean }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            readonly retry: boolean;
            /**
             * The tried times of a task.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            readonly tries: number;
            /**
             * The faults case of a task.
             *
             * @type { Faults }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The faults case of a task.
             *
             * @type { Faults }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly faults: Faults;
            /**
             * The reason of a waiting/failed/stopped/paused task.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The reason of a waiting/failed/stopped/paused task.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly reason: string;
            /**
             * The extras of a task.
             * For background, the last response from server.
             * For frontend, nothing now.
             *
             * @type { ?object }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The extras of a task.
             * For frontend, nothing now.
             *
             * @type { ?object }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @since 11
             */
            readonly extras?: object;
        }
        /**
         * The HTTP response.
         *
         * @interface HttpResponse
         * @syscap SystemCapability.Request.FileTransferAgent
         * @atomicservice
         * @since 12
         */
        interface HttpResponse {
            /**
             * The version of the HTTP response.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 12
             */
            readonly version: string;
            /**
             * The status code of the HTTP response.
             *
             * @type { number }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 12
             */
            readonly statusCode: number;
            /**
             * The reason of the HTTP response.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 12
             */
            readonly reason: string;
            /**
             * The headers of the HTTP response.
             *
             * @type { Map<string, Array<string>> }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 12
             */
            readonly headers: Map<string, Array<string>>;
        }
        /**
         * The task entry.
         * New task' status is "initialized" and enqueue.
         * Can `start` a initialized task.
         * Can `pause` a waiting/running/retrying background task.
         * Can `resume` a paused background task.
         * Can `stop` a running/waiting/retrying task and dequeue it.
         *
         * @typedef Task
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * The task entry.
         * New task' status is "initialized" and enqueue.
         * Can `start` a initialized task.
         * Can `pause` a waiting/running/retrying background task.
         * Can `resume` a paused background task.
         * Can `stop` a running/waiting/retrying task and dequeue it.
         *
         * @typedef Task
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        interface Task {
            /**
             * The task id, unique on system.
             * Generated automatically by system.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The task id, unique on system.
             * Generated automatically by system.
             *
             * @type { string }
             * @readonly
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            readonly tid: string;
            /**
             * The configurations for the task.
             *
             * @type { Config }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * The configurations for the task.
             *
             * @type { Config }
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            config: Config;
            /**
             * Enable the specified callback for a frontend task.
             *
             * @param { 'progress' } event event types.
             * @param { function } callback callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @throws { BusinessError } 21900005 - task mode error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Enables the specified callback.
             *
             * @param { 'progress' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            on(event: 'progress', callback: (progress: Progress) => void): void;
            /**
             * Disable the specified callback for a frontend task.
             *
             * @param { 'progress' } event event types.
             * @param { function } callback callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @throws { BusinessError } 21900005 - task mode error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Disables the specified callback.
             *
             * @param { 'progress' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            off(event: 'progress', callback?: (progress: Progress) => void): void;
            /**
             * Enable the specified callback for a frontend task.
             *
             * @param { 'completed' } event event types.
             * @param { function } callback callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @throws { BusinessError } 21900005 - task mode error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Enables the specified callback.
             *
             * @param { 'completed' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            on(event: 'completed', callback: (progress: Progress) => void): void;
            /**
             * Disable the specified callback for a frontend task.
             *
             * @param { 'completed' } event event types.
             * @param { function } callback callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @throws { BusinessError } 21900005 - task mode error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Disables the specified callback.
             *
             * @param { 'completed' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            off(event: 'completed', callback?: (progress: Progress) => void): void;
            /**
             * Enable the specified callback for a frontend task.
             *
             * @param { 'failed' } event event types.
             * @param { function } callback callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @throws { BusinessError } 21900005 - task mode error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Enables the specified callback.
             *
             * @param { 'failed' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            on(event: 'failed', callback: (progress: Progress) => void): void;
            /**
             * Disable the specified callback for a frontend task.
             *
             * @param { 'failed' } event event types.
             * @param { function } callback callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @throws { BusinessError } 21900005 - task mode error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Disables the specified callback.
             *
             * @param { 'failed' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            off(event: 'failed', callback?: (progress: Progress) => void): void;
            /**
             * Enables the specified callback.
             *
             * @param { 'pause' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            on(event: 'pause', callback: (progress: Progress) => void): void;
            /**
             * Disables the specified callback.
             *
             * @param { 'pause' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            off(event: 'pause', callback?: (progress: Progress) => void): void;
            /**
             * Enables the specified callback.
             *
             * @param { 'resume' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            on(event: 'resume', callback: (progress: Progress) => void): void;
            /**
             * Disables the specified callback.
             *
             * @param { 'resume' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            off(event: 'resume', callback?: (progress: Progress) => void): void;
            /**
             * Enables the specified callback.
             *
             * @param { 'remove' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            on(event: 'remove', callback: (progress: Progress) => void): void;
            /**
             * Disables the specified callback.
             *
             * @param { 'remove' } event - event types.
             * @param { function } callback - callback function with a `Progress` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            off(event: 'remove', callback?: (progress: Progress) => void): void;
            /**
             * Enables the response callback.
             *
             * @param { 'response' } event - event types.
             * @param { Callback<HttpResponse> } callback - callback function with an `HttpResponse` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 12
             */
            on(event: 'response', callback: Callback<HttpResponse>): void;
            /**
             * Disables the response callback.
             *
             * @param { 'response' } event - event types.
             * @param { Callback<HttpResponse> } callback - callback function with an `HttpResponse` argument.
             * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Missing mandatory parameters.
             * <br>2. Incorrect parameter type. 3. Parameter verification failed.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @atomicservice
             * @since 12
             */
            off(event: 'response', callback?: Callback<HttpResponse>): void;
            /**
             * Starts the task.
             *
             * @permission ohos.permission.INTERNET
             * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Starts the task.
             *
             * @permission ohos.permission.INTERNET
             * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            /**
             * Starts the task. The following tasks can be started:
             * 1. Tasks just created.
             * 2. Download tasks that are stopped or become FAILED.
             *
             * @permission ohos.permission.INTERNET
             * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            start(callback: AsyncCallback<void>): void;
            /**
             * Starts the task.
             *
             * @permission ohos.permission.INTERNET
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Starts the task.
             *
             * @permission ohos.permission.INTERNET
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            /**
             * Starts the task. The following tasks can be started:
             * 1. Tasks just created.
             * 2. Download tasks that are stopped or become FAILED.
             *
             * @permission ohos.permission.INTERNET
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 12
             */
            start(): Promise<void>;
            /**
             * Pauses the background task.
             *
             * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900005 - task mode error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Pauses the task.
             *
             * @param { AsyncCallback<void> } callback - callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            pause(callback: AsyncCallback<void>): void;
            /**
             * Pauses the background task.
             *
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900005 - task mode error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Pauses the task.
             *
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            pause(): Promise<void>;
            /**
             * Resumes the background task.
             *
             * @permission ohos.permission.INTERNET
             * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900005 - task mode error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Resumes the task.
             *
             * @permission ohos.permission.INTERNET
             * @param { AsyncCallback<void> } callback - callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            resume(callback: AsyncCallback<void>): void;
            /**
             * Resumes the background task.
             *
             * @permission ohos.permission.INTERNET
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900005 - task mode error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Resumes the task.
             *
             * @permission ohos.permission.INTERNET
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 201 - Permission denied.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 11
             */
            resume(): Promise<void>;
            /**
             * Stops the task.
             *
             * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Stops the task.
             *
             * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating the calling result.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            stop(callback: AsyncCallback<void>): void;
            /**
             * Stops the task.
             *
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @since 10
             */
            /**
             * Stops the task.
             *
             * @returns { Promise<void> } the promise returned by the function.
             * @throws { BusinessError } 13400003 - task service ability error.
             * @throws { BusinessError } 21900007 - task state error.
             * @syscap SystemCapability.Request.FileTransferAgent
             * @crossplatform
             * @atomicservice
             * @since 11
             */
            stop(): Promise<void>;
        }
        /**
         * Creates a task for upload or download and enqueue it.
         * Only foreground application can create the frontend task.
         * It can deal only one frontend task at a time.
         * A in processing frontend task will be forced to stop when its application had switched to background.
         * A new frontend task will interrupt a existed in processing frontend task.
         * The background task is highly recommended.
         *
         * @permission ohos.permission.INTERNET
         * @param { BaseContext } context context of the caller.
         * @param { Config } config configurations for a task.
         * @param { AsyncCallback<Task> } callback indicate the callback function to receive Task.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400001 - file operation error.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900004 - the application task queue is full.
         * @throws { BusinessError } 21900005 - task mode error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Creates a task for upload or download and enqueue it.
         * When an application enters the background, the frontend tasks associated
         * with it will gradually be paused until the application returns to the foreground.
         *
         * @permission ohos.permission.INTERNET
         * @param { BaseContext } context context of the caller.
         * @param { Config } config configurations for a task.
         * @param { AsyncCallback<Task> } callback indicate the callback function to receive Task.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400001 - file operation error.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900004 - the application task queue is full.
         * @throws { BusinessError } 21900005 - task mode error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        function create(context: BaseContext, config: Config, callback: AsyncCallback<Task>): void;
        /**
         * Creates a task for upload or download and enqueue it.
         * Only foreground application can create the frontend task.
         * It can deal only one frontend task at a time.
         * A in processing frontend task will be forced to stop when its application had switched to background.
         * A new frontend task will interrupt a existed in processing frontend task.
         * The background task is highly recommended.
         *
         * @permission ohos.permission.INTERNET
         * @param { BaseContext } context context of the caller.
         * @param { Config } config configurations for a task.
         * @returns { Promise<Task> } the promise returned by the function.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400001 - file operation error.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900004 - the application task queue is full.
         * @throws { BusinessError } 21900005 - task mode error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Creates a task for upload or download and enqueue it.
         * When an application enters the background, the frontend tasks associated.
         * with it will gradually be paused until the application returns to the foreground.
         *
         * @permission ohos.permission.INTERNET
         * @param { BaseContext } context context of the caller.
         * @param { Config } config configurations for a task.
         * @returns { Promise<Task> } the promise returned by the function.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400001 - file operation error.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900004 - the application task queue is full.
         * @throws { BusinessError } 21900005 - task mode error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        function create(context: BaseContext, config: Config): Promise<Task>;
        /**
         * Gets the task with the specified id.
         *
         * @param { BaseContext } context - context of the caller.
         * @param { string } id - the id of the task.
         * @param { string } token - the token of the task, length between 8 and 2048 bytes.
         * @returns { Promise<Task> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 11
         */
        function getTask(context: BaseContext, id: string, token?: string): Promise<Task>;
        /**
         * Removes specified task belongs to the caller.
         * The task will be forced to stop if in processing.
         *
         * @param { string } id the task id.
         * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating success or not.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Removes specified task belongs to the caller.
         * The task will be forced to stop if in processing.
         *
         * @param { string } id the task id.
         * @param { AsyncCallback<void> } callback callback function with a boolean argument indicating success or not.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        function remove(id: string, callback: AsyncCallback<void>): void;
        /**
         * Removes specified task belongs to the caller.
         * The task will be forced to stop if in processing.
         *
         * @param { string } id the task id.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Removes specified task belongs to the caller.
         * The task will be forced to stop if in processing.
         *
         * @param { string } id the task id.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        function remove(id: string): Promise<void>;
        /**
         * Shows specified task details belongs to the caller.
         *
         * @param { string } id the task id.
         * @param { AsyncCallback<TaskInfo> } callback callback function with a `TaskInfo` argument for informations of the current task.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Shows specified task details belongs to the caller.
         *
         * @param { string } id the task id.
         * @param { AsyncCallback<TaskInfo> } callback callback function with a `TaskInfo` argument for informations of the current task.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        function show(id: string, callback: AsyncCallback<TaskInfo>): void;
        /**
         * Shows specified task details belongs to the caller.
         *
         * @param { string } id the task id.
         * @returns { Promise<TaskInfo> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Shows specified task details belongs to the caller.
         *
         * @param { string } id the task id.
         * @returns { Promise<TaskInfo> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        function show(id: string): Promise<TaskInfo>;
        /**
         * Touches specified task with token.
         *
         * @param { string } id the task id.
         * @param { string } token the in-application isolation key.
         * @param { AsyncCallback<TaskInfo> } callback callback function with a `TaskInfo` argument for informations of the current task.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Touches specified task with token.
         *
         * @param { string } id the task id.
         * @param { string } token the in-application isolation key, length between 8 and 2048 bytes.
         * @param { AsyncCallback<TaskInfo> } callback callback function with a `TaskInfo` argument for informations of the current task.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        function touch(id: string, token: string, callback: AsyncCallback<TaskInfo>): void;
        /**
         * Touches specified task with token.
         *
         * @param { string } id the task id.
         * @param { string } token the in-application isolation key, length between 8 and 2048 bytes.
         * @returns { Promise<TaskInfo> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Touches specified task with token.
         *
         * @param { string } id the task id.
         * @param { string } token the in-application isolation key, length between 8 and 2048 bytes.
         * @returns { Promise<TaskInfo> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Missing mandatory parameters.
         * <br>2. Incorrect parameter type. 3. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @throws { BusinessError } 21900006 - task not found.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        function touch(id: string, token: string): Promise<TaskInfo>;
        /**
         * Searches tasks, for system.
         *
         * @param { AsyncCallback<Array<string>> } callback callback function with a `Array<string>` argument contains task ids match filter.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Incorrect parameter type.
         * <br>2. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Searches tasks, for system.
         *
         * @param { AsyncCallback<Array<string>> } callback callback function with a `Array<string>` argument contains task ids match filter.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Incorrect parameter type.
         * <br>2. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        function search(callback: AsyncCallback<Array<string>>): void;
        /**
         * Searches tasks, for system.
         *
         * @param { Filter } filter an instance of `Filter`.
         * @param { AsyncCallback<Array<string>> } callback callback function with a `Array<string>` argument contains task ids match filter.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Incorrect parameter type.
         * <br>2. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Searches tasks, for system.
         *
         * @param { Filter } filter an instance of `Filter`.
         * @param { AsyncCallback<Array<string>> } callback callback function with a `Array<string>` argument contains task ids match filter.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Incorrect parameter type.
         * <br>2. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        function search(filter: Filter, callback: AsyncCallback<Array<string>>): void;
        /**
         * Searches tasks, for system.
         *
         * @param { Filter } filter an instance of `Filter`.
         * @returns { Promise<Array<string>> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Incorrect parameter type.
         * <br>2. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @since 10
         */
        /**
         * Searches tasks, for system.
         *
         * @param { Filter } filter an instance of `Filter`.
         * @returns { Promise<Array<string>> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes: 1. Incorrect parameter type.
         * <br>2. Parameter verification failed.
         * @throws { BusinessError } 13400003 - task service ability error.
         * @syscap SystemCapability.Request.FileTransferAgent
         * @crossplatform
         * @since 11
         */
        function search(filter?: Filter): Promise<Array<string>>;
    }
}
export default request;
