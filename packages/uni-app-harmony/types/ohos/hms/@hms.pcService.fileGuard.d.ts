/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module providers the capability to mark and control documents.
 * @kit EnterpriseDataGuardKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * The module providers the capability to mark and control documents.
 *
 * @namespace fileGuard
 * @syscap SystemCapability.PCService.FileGuard
 * @since 4.0.0(10)
 */
declare namespace fileGuard {
    /**
     * Provides common directory scan type definition.
     *
     * @enum { number } CommonDirScanType
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    enum CommonDirScanType {
        /**
         * Indicates a scan file task type for the media directory.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        MEDIA_ONLY = 0,
        /**
         * Indicates a scan file task type for the media and sandbox directory.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        MEDIA_AND_SANDBOX
    }
    /**
     * Provides file security level.
     *
     * @enum { number } SecurityLevel
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    enum SecurityLevel {
        /**
         * Indicates that the security level is public.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        EXTERNAL = 0,
        /**
         * Indicates that the security level is internal.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        INTERNAL,
        /**
         * Indicates that the security level is secret.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        SECRET,
        /**
         * Indicates that the security level is confidential.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        CONFIDENTIAL,
        /**
         * Indicates that the security level is top secret.
         *
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        TOP_SECRET
    }
    /**
     * Provides path information of a file, including the absolute path and uri.
     *
     * @interface FilePathInfo
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    interface FilePathInfo {
        /**
         * The absolute path of a file.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        absolutePath: string;
        /**
         * The uri of a file.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        uri: string;
    }
    /**
     * Provides tag information of a file, including the security level and tag.
     *
     * @interface FileTagInfo
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    interface FileTagInfo {
        /**
         * The security level of a file, including external, internal, secret, confidential and top_secret.
         *
         * @type { number }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        securityLevel: number;
        /**
         * The tag information of a file.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        tag: string;
    }
    /**
    * Provides methods for file scanning callback.
    *
    * @interface ScanFileCallback
    * @syscap SystemCapability.PCService.FileGuard
    * @since 4.0.0(10)
    */
    interface ScanFileCallback {
        /**
         * Notifies the client of the scan result.
         *
         * @param { Array<string> } files - List of scanned files.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        onReceiveFileList(files: Array<string>): void;
        /**
         * Notifies the client that the scan task is completed.
         *
         * @param { number } count - Total number of scanned files.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        onTaskCompleted(count: number): void;
    }
    /**
     * Provides methods for file management and control.
     *
     * @syscap SystemCapability.PCService.FileGuard
     * @since 4.0.0(10)
     */
    class FileGuard {
        /**
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        constructor();
        /**
         * start to get file list from common directory.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { CommonDirScanType } type - Public directory scan scope.
         * @param { ScanFileCallback } callback - The callback of scan result.
         * @param { number } [batchNum] - The number of file lists returned each time.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        startFileScanTask(type: CommonDirScanType, callback: ScanFileCallback, batchNum?: number): void;
        /**
         * start to get file list from customized directory.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - The customized directory.
         * @param { ScanFileCallback } callback - The callback of scan result.
         * @param { number } [batchNum] - The number of file lists returned each time.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        startFileScanTask(path: string, callback: ScanFileCallback, batchNum?: number): void;
        /**
         * Open a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the file.
         * @param { AsyncCallback<number> } callback - The callback is used to return the file descriptor.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        openFile(path: string, callback: AsyncCallback<number>): void;
        /**
         * Open a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the file.
         * @returns { Promise<number> } Returns the file descriptor.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        openFile(path: string): Promise<number>;
        /**
         * Set file tag for a KIA File.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { SecurityLevel } level - File security level.
         * @param { string } tag - File attribute tag.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setFileTag(path: string, level: SecurityLevel, tag: string, callback: AsyncCallback<void>): void;
        /**
         * Set file tag for a KIA File.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { SecurityLevel } level - File security level.
         * @param { string } tag - File attribute tag.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setFileTag(path: string, level: SecurityLevel, tag: string): Promise<void>;
        /**
         * Query file tag.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { AsyncCallback<FileTagInfo> } callback - The callback is used to return the security level and tag.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        queryFileTag(path: string, callback: AsyncCallback<FileTagInfo>): void;
        /**
         * Query file tag.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @returns { Promise<FileTagInfo> } Returns the security level and tag.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        queryFileTag(path: string): Promise<FileTagInfo>;
        /**
         * get the URI of a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { AsyncCallback<FilePathInfo> } callback - The callback is used to return the absolute file path and uri
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        getFileUri(path: string, callback: AsyncCallback<FilePathInfo>): void;
        /**
         * get the URI of a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @returns { Promise<FilePathInfo> } Returns the absolute file path and uri
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        getFileUri(path: string): Promise<FilePathInfo>;
        /**
         * Delete a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        deleteFile(path: string, callback: AsyncCallback<void>): void;
        /**
         * Delete a file.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } path - Absolute path of the KIA file.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        deleteFile(path: string): Promise<void>;
        /**
         * Update the security control policy.
         * @permission ohos.permission.SET_FILE_GUARD_POLICY
         * @param { string } policy - The security control policy.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        updatePolicy(policy: string, callback: AsyncCallback<void>): void;
        /**
         * Update the security control policy.
         * @permission ohos.permission.SET_FILE_GUARD_POLICY
         * @param { string } policy - The security control policy.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        updatePolicy(policy: string): Promise<void>;
        /**
         * Set the KIA file list.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } filelist - KIA file list.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setKiaFilelist(filelist: string, callback: AsyncCallback<void>): void;
        /**
         * Set the KIA file list.
         * @permission ohos.permission.FILE_GUARD_MANAGER
         * @param { string } filelist - KIA file list.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.PCService.FileGuard
         * @since 4.0.0(10)
         */
        setKiaFilelist(filelist: string): Promise<void>;
    }
}
export default fileGuard;
