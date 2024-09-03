/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Define cloud storage capabilities.
 * @kit CloudFoundationKit
 */
import type { AsyncCallback } from '@ohos.base';
import type request from '@ohos.request';
import type common from '@ohos.app.ability.common';
/**
 * This module provides cloud storage capabilities.
 * Cloud resources are connected to AppGallery Connect. Before using the resources, you need to enable the corresponding services.
 *
 * @namespace cloudStorage
 * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace cloudStorage {
    /**
     * Initializing a Cloud Storage Instance.
     * By default, an asynchronous task is started to query the default instance on the cloud.
     * If you do not use the default value, ensure that the storage instance exists on the cloud.
     * Otherwise, an error indicating that the storage instance cannot be found will occur in subsequent operations.
     * The format is restricted by the cloud side:
     * Only lowercase letters, digits, and hyphens (-) are allowed.
     * The value must start and end with a letter or digit and contain 9 to 63 characters.
     * Two or more consecutive hyphens (-) are not allowed.
     * @param { string } [name] - Name of the storage instance.
     * @returns { StorageBucket }  the storage instance
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function bucket(name?: string): StorageBucket;
    /**
     * Cloud storage instance, which provides cloud storage upload and download capabilities.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    class StorageBucket {
        /**
         * Uploading a Specified File to the Cloud.
         * @permission ohos.permission.INTERNET
         * @param { common.BaseContext } context - Application context.
         * @param { UploadParams } parameters - Parameters related to file upload.
         * @returns { Promise<request.agent.Task> } Upload task, which can be used to monitor the upload progress and operate the upload task.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        uploadFile(context: common.BaseContext, parameters: UploadParams): Promise<request.agent.Task>;
        /**
         * Uploading a Specified File to the Cloud
         * @permission ohos.permission.INTERNET
         * @param { common.BaseContext } context - Application context.
         * @param { UploadParams } parameters - Parameters related to file upload.
         * @param { AsyncCallback<request.agent.Task> } callback - Upload task, which can be used to monitor the upload progress and operate the upload task.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        uploadFile(context: common.BaseContext, parameters: UploadParams, callback: AsyncCallback<request.agent.Task>): void;
        /**
         * Downloading Files from the Cloud to the Local.
         * @permission ohos.permission.INTERNET
         * @param { common.BaseContext } context - Application context.
         * @param { DownloadParams } parameters - Parameters related to file download.
         * @returns { Promise<request.agent.Task> } Download task, which can be used to monitor the download progress and operate the download task.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        downloadFile(context: common.BaseContext, parameters: DownloadParams): Promise<request.agent.Task>;
        /**
         * Downloading Files from the Cloud to the Local.
         * @permission ohos.permission.INTERNET
         * @param { common.BaseContext } context - Application context.
         * @param { DownloadParams } parameters - Parameters related to file download.
         * @param { AsyncCallback<request.agent.Task> } callback - Download task,
         * which can be used to monitor the download progress and operate the download task.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        downloadFile(context: common.BaseContext, parameters: DownloadParams, callback: AsyncCallback<request.agent.Task>): void;
        /**
         * Obtaining the Cloud-side File Download Address.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @returns { Promise<string> } File download address on the cloud.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getDownloadURL(cloudPath: string): Promise<string>;
        /**
         * Obtaining the Cloud-side File Download Address.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @param { AsyncCallback<string> } callback - File download address on the cloud.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getDownloadURL(cloudPath: string, callback: AsyncCallback<string>): void;
        /**
         * Deleting Cloud-side Files.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @returns { Promise<void> } Result of deleting the file from the cloud.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deleteFile(cloudPath: string): Promise<void>;
        /**
         * Deleting Cloud-side Files.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @param { AsyncCallback<void> } callback - Result of deleting the file from the cloud.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deleteFile(cloudPath: string, callback: AsyncCallback<void>): void;
        /**
         * Obtaining the Cloud-side File List.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud. If an empty string is transferred, the file list in the root path on the cloud is obtained.
         * @param { ListOptions } [options] - Parameters for obtaining the list.
         * @returns { Promise<ListResults> } List Results.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        list(cloudPath: string, options?: ListOptions): Promise<ListResults>;
        /**
         * Obtaining the Cloud-side File List.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud. If an empty string is transferred, the file list in the root path on the cloud is obtained.
         * @param { ListOptions } options - Parameters for obtaining the list.
         * @param { AsyncCallback<ListResults> } callback - List Results.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        list(cloudPath: string, options: ListOptions, callback: AsyncCallback<ListResults>): void;
        /**
         * Obtaining the Metadata of a Cloud-side File.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @returns { Promise<Metadata> } Complete metadata information of the file on the cloud.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getMetadata(cloudPath: string): Promise<Metadata>;
        /**
         * Obtaining the Metadata of a Cloud-side File.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @param { AsyncCallback<Metadata> } callback - Complete metadata information of the file on the cloud.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getMetadata(cloudPath: string, callback: AsyncCallback<Metadata>): void;
        /**
         * Set the metadata of the file on the cloud.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @param { MetadataUpdatable } metadata - Metadata information of updatable parameters.
         * @returns { Promise<Metadata> } Complete metadata information after the update.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setMetadata(cloudPath: string, metadata: MetadataUpdatable): Promise<Metadata>;
        /**
         * Set the metadata of the file on the cloud.
         * @permission ohos.permission.INTERNET
         * @param { string } cloudPath - File path on the cloud.
         * @param { MetadataUpdatable } metadata - Metadata information of updatable parameters.
         * @param { AsyncCallback<Metadata> } callback - Complete metadata information after the update.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008220001 - Network connection error.
         * @throws { BusinessError } 1008220009 - Client internal error.
         * @throws { BusinessError } 1008221001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setMetadata(cloudPath: string, metadata: MetadataUpdatable, callback: AsyncCallback<Metadata>): void;
    }
    /**
     * Parameters related to the upload.
     * @typedef UploadParams
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface UploadParams {
        /**
         * Local File Path.
         * @type { string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        localPath: string;
        /**
         * File path on the cloud.
         * @type { string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        cloudPath: string;
        /**
         * Metadata information of updatable parameters.
         * @type { ?MetadataUpdatable }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        metadata?: MetadataUpdatable;
        /**
         * Indicates task's mode.
         * The default is BACKGROUND.
         * For frontend task, it has callbacks.
         * For background task, it has notifications and fallback.
         * The cross-platform default is FOREGROUND.
         *
         * @type { ?request.agent.Mode }
         * @default request.agent.Mode.BACKGROUND
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        mode?: request.agent.Mode;
        /**
         * The network.
         *
         * @type { ?request.agent.Network }
         * @default request.agent.Network.ANY
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        network?: request.agent.Network;
    }
    /**
     * Download Related Parameters.
     * @typedef DownloadParams
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DownloadParams {
        /**
         * Local File Path
         * @type { string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        localPath: string;
        /**
         * File path on the cloud.
         * @type { string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        cloudPath: string;
        /**
         * Indicates task's mode.
         * The default is BACKGROUND.
         * For frontend task, it has callbacks.
         * For background task, it has notifications and fallback.
         * The cross-platform default is FOREGROUND.
         *
         * @type { ?request.agent.Mode }
         * @default request.agent.Mode.BACKGROUND
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        mode?: request.agent.Mode;
        /**
         * The solution choice when path already exists during download.
         * The default is false.
         * Currently support:
         * true, rewrite the existed file.
         * false, go to fail.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        overwrite?: boolean;
        /**
         * The network.
         *
         * @type { ?request.agent.Network }
         * @default request.agent.Network.ANY
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        network?: request.agent.Network;
    }
    /**
     * Lists the parameters related to the operation.
     * @typedef ListOptions
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface ListOptions {
        /**
         * Maximum number of files to be listed. By default, all files are listed. The value ranges from 1 to 1000.
         * @type { ?number }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        maxResults?: number;
        /**
         * Page Marker.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        pageMarker?: string;
    }
    /**
     * List the results of the operation
     * @typedef ListResults
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface ListResults {
        /**
         * Cloud-side directory list returned by the listing operation
         * @type { string[] }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        directories: string[];
        /**
         * Cloud-side file list returned by the listing operation.
         * @type { string[] }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        files: string[];
        /**
         * Page Marker.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        pageMarker?: string;
    }
    /**
     * Updateable metadata information.
     * @typedef MetadataUpdatable
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MetadataUpdatable {
        /**
         * ContentType type of the standard HTTP header.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        contentType?: string;
        /**
         * CacheControl in the standard HTTP header.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        cacheControl?: string;
        /**
         * ContentDisposition of the standard HTTP header.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        contentDisposition?: string;
        /**
         * ContentEncoding of the standard HTTP header.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        contentEncoding?: string;
        /**
         * ContentLanguage of the standard HTTP header.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        contentLanguage?: string;
        /**
         * Customized file attributes on the cloud are case-insensitive and must comply with the standard HTTP header specifications.
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        customMetadata?: Record<string, string>;
    }
    /**
     * Complete metadata information.
     * @typedef Metadata
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Metadata extends MetadataUpdatable {
        /**
         * Cloud-side file name.
         * @type { string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        name: string;
        /**
         * Cloud-side file size.
         * @type { number }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        size: number;
        /**
         * Create time of the file on the cloud.
         * @type { Date }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        createTime: Date;
        /**
         * Modification time of the file on the cloud.
         * @type { Date }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        modifyTime: Date;
        /**
         * SHA256 information of the file on the cloud.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        sha256Hash?: string;
    }
}
export default cloudStorage;
