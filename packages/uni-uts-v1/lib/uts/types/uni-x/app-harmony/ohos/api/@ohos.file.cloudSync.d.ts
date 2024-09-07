/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
import type { AsyncCallback, Callback } from './@ohos.base';
/**
 * Provides the capabilities to control cloud file synchronization.
 *
 * @namespace cloudSync
 * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
 * @since 11
 */
declare namespace cloudSync {
    /**
     * Describes the State type of download.
     *
     * @enum { number }
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
     * @since 11
     */
    enum State {
        /**
         * Indicates that the download task in process now.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        RUNNING,
        /**
         * Indicates that the download task finished.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        COMPLETED,
        /**
         * Indicates that the download task failed.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        FAILED,
        /**
         * Indicates that the download task stopped.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        STOPPED
    }
    /**
     * Describes the download Error type.
     *
     * @enum { number }
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
     * @since 11
     */
    enum DownloadErrorType {
        /**
         * No error occurred.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        NO_ERROR,
        /**
         * download aborted due to unknown error.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        UNKNOWN_ERROR,
        /**
         * download aborted due to network unavailable.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        NETWORK_UNAVAILABLE,
        /**
         * download aborted due to local storage is full.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        LOCAL_STORAGE_FULL,
        /**
         * download aborted due to content is not found in the cloud.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        CONTENT_NOT_FOUND,
        /**
         * download aborted due to frequent user requests.
         *
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        FREQUENT_USER_REQUESTS
    }
    /**
     * The DownloadProgress data structure.
     *
     * @interface DownloadProgress
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
     * @since 11
     */
    interface DownloadProgress {
        /**
         * The current download state.
         *
         * @type { State }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        state: State;
        /**
         * The processed data size for current file.
         *
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        processed: number;
        /**
         * The size of current file.
         *
         * @type { number }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        size: number;
        /**
         * The uri of current file.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        uri: string;
        /**
         * The error type of download.
         *
         * @type { DownloadErrorType }
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        error: DownloadErrorType;
    }
    /**
     * CloudFileCache object.
     *
     * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
     * @since 11
     */
    class CloudFileCache {
        /**
         * A constructor used to create a CloudFileCache object.
         *
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:Incorrect parameter types.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        constructor();
        /**
         * Subscribes to cloud file cache download progress change event. This method uses a callback to get download progress changes.
         *
         * @param { 'progress' } event - event type.
         * @param { Callback<DownloadProgress> } callback - callback function with a `DownloadProgress` argument.
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameter types.
         * @throws { BusinessError } 13600001 - IPC error
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        on(event: 'progress', callback: Callback<DownloadProgress>): void;
        /**
         * Unsubscribes from cloud file cache download progress event.
         *
         * @param { 'progress' } event - event type.
         * @param { Callback<DownloadProgress> } [callback] - callback function with a `DownloadProgress` argument.
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameter types.
         * @throws { BusinessError } 13600001 - IPC error
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        off(event: 'progress', callback?: Callback<DownloadProgress>): void;
        /**
         * Start the cloud file cache download task.
         *
         * @param { string } uri - uri of file.
         * @returns { Promise<void> } - Return Promise.
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameter types.
         * @throws { BusinessError } 13600001 - IPC error.
         * @throws { BusinessError } 13900002 - No such file or directory.
         * @throws { BusinessError } 13900025 - No space left on device.
         * @throws { BusinessError } 14000002 - Invalid uri.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        start(uri: string): Promise<void>;
        /**
         * Start the cloud file cache download task with callback.
         *
         * @param { string } uri - uri of file.
         * @param { AsyncCallback<void> } callback - Callback function.
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameter types.
         * @throws { BusinessError } 13600001 - IPC error.
         * @throws { BusinessError } 13900002 - No such file or directory.
         * @throws { BusinessError } 13900025 - No space left on device.
         * @throws { BusinessError } 14000002 - Invalid uri.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        start(uri: string, callback: AsyncCallback<void>): void;
        /**
         * Stop the cloud file cache download task.
         *
         * @param { string } uri - uri of file.
         * @returns { Promise<void> } - Return Promise.
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameter types.
         * @throws { BusinessError } 13600001 - IPC error.
         * @throws { BusinessError } 13900002 - No such file or directory.
         * @throws { BusinessError } 14000002 - Invalid uri.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        /**
         * Stop the cloud file cache download task.
         *
         * @param { string } uri - uri of file.
         * @param { boolean } [needClean] - whether to delete the file that already downloaded.
         * @returns { Promise<void> } - Return Promise.
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameter types.
         * @throws { BusinessError } 13600001 - IPC error.
         * @throws { BusinessError } 13900002 - No such file or directory.
         * @throws { BusinessError } 14000002 - Invalid uri.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 12
         */
        stop(uri: string, needClean?: boolean): Promise<void>;
        /**
         * Stop the cloud file cache download task with callback.
         *
         * @param { string } uri - uri of file.
         * @param { AsyncCallback<void> } callback - Callback function.
         * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameter types.
         * @throws { BusinessError } 13600001 - IPC error.
         * @throws { BusinessError } 13900002 - No such file or directory.
         * @throws { BusinessError } 14000002 - Invalid uri.
         * @syscap SystemCapability.FileManagement.DistributedFileService.CloudSync.Core
         * @since 11
         */
        stop(uri: string, callback: AsyncCallback<void>): void;
    }
}
export default cloudSync;
