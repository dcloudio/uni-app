/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
 * @kit MDMKit
 */
import type Want from './@ohos.app.ability.Want';
/**
 * This module provides the capability to manage the system of the enterprise devices.
 *
 * @namespace systemManager
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @stagemodelonly
 * @since 12
 */
declare namespace systemManager {
    /**
     * The device system update info.
     *
     * @typedef SystemUpdateInfo
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export interface SystemUpdateInfo {
        /**
         * The name of version need to update.
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        versionName: string;
        /**
         * The time when the version first received.
         *
         * @type { number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        firstReceivedTime: number;
        /**
         * The type of version package.
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        packageType: string;
    }
    /**
     * System update policy type.
     *
     * @enum { number }
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    enum PolicyType {
        /**
         * Default update policy
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        DEFAULT = 0,
        /**
         * Prohibit update policy
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        PROHIBIT = 1,
        /**
         * Update to specific software version policy
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        UPDATE_TO_SPECIFIC_VERSION = 2,
        /**
         * Update within a specified time window
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        WINDOWS = 3,
        /**
         * Delay the update for a period of time
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        POSTPONE = 4
    }
    /**
     * OTA update policy.
     *
     * @typedef OtaUpdatePolicy
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export interface OtaUpdatePolicy {
        /**
         * Software update type.
         *
         * @type { PolicyType }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        policyType: PolicyType;
        /**
         * Software version.
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        version: string;
        /**
         * The latest time of update.
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        latestUpdateTime?: number;
        /**
         * The time of delay update.
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        delayUpdateTime?: number;
        /**
         * The start time of installation window.
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        installStartTime?: number;
        /**
         * The end time of installation window.
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        installEndTime?: number;
    }
    /**
     * The device system update package info.
     *
     * @typedef UpdatePackageInfo
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export interface UpdatePackageInfo {
        /**
         * The version of system update package.
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        version: string;
        /**
         * The detail of system update packages.
         *
         * @type { Array<Package> }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        packages: Array<Package>;
        /**
         * The description of system update package.
         *
         * @type { ?PackageDescription }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        description?: PackageDescription;
    }
    /**
     * The detail of system update package.
     *
     * @typedef Package
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    interface Package {
        /**
         * The type of system update package.
         *
         * @type { PackageType }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        type: PackageType;
        /**
         * The path of system update package.
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        path: string;
        /**
         * The file descriptor of system update package.
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        fd?: number;
    }
    /**
     * Enum for system update package.
     *
     * @enum { number }
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    enum PackageType {
        /**
         * FIRMWARE
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        FIRMWARE = 1
    }
    /**
     * The description of system update package.
     *
     * @typedef PackageDescription
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    interface PackageDescription {
        /**
         * The custom notification of system update package.
         *
         * @type { ?NotifyDescription }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        notify?: NotifyDescription;
    }
    /**
     * The custom notification of system update package.
     *
     * @typedef NotifyDescription
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    interface NotifyDescription {
        /**
         * The custom notification tips of system update package.
         *
         * @type { ?string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        installTips?: string;
        /**
         * The custom notification tips detail of system update package.
         *
         * @type { ?string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        installTipsDetail?: string;
    }
    /**
     * The result of system update.
     *
     * @typedef UpdateResult
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    interface UpdateResult {
        /**
         * The current version of the system.
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        version: string;
        /**
         * The update status of the system.
         *
         * @type { UpdateStatus }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        status: UpdateStatus;
        /**
         * The update error message of the system.
         *
         * @type { ErrorInfo }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        errorInfo: ErrorInfo;
    }
    /**
     * Enum for system update status.
     *
     * @enum { number }
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    enum UpdateStatus {
        /**
         * The specified version system update package does not exist.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        NO_UPDATE_PACKAGE = -4,
        /**
         * The system update package waiting for installation.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        UPDATE_WAITING = -3,
        /**
         * The system is updating.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        UPDATING = -2,
        /**
         * The system update failed.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        UPDATE_FAILURE = -1,
        /**
         * The system update successful.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        UPDATE_SUCCESS = 0
    }
    /**
     * The update error information of the system.
     *
     * @typedef ErrorInfo
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    interface ErrorInfo {
        /**
         * The update error code of the system.
         *
         * @type { number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        code: number;
        /**
         * The update error message of the system.
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        message: string;
    }
    /**
     * Sets NTP server.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SYSTEM
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { string } server - the address of NTP server.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function setNTPServer(admin: Want, server: string): void;
    /**
     * Gets NTP server.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SYSTEM
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @returns { string } the address of NTP server.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getNTPServer(admin: Want): string;
    /**
     * Sets device OTA update policy.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SYSTEM
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { OtaUpdatePolicy } policy - OTA update policy.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function setOtaUpdatePolicy(admin: Want, policy: OtaUpdatePolicy): void;
    /**
     * Gets device OTA update policy.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SYSTEM
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @returns { OtaUpdatePolicy } OTA update policy.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getOtaUpdatePolicy(admin: Want): OtaUpdatePolicy;
    /**
     * Notifies the system of update packages information.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SYSTEM
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { UpdatePackageInfo } packageInfo - packageInfo indicates the information of system update package.
     * @returns { Promise<void> } the promise returned by the notifyUpdatePackages.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9201004 - The update packages do not exist or analyzing failed.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function notifyUpdatePackages(admin: Want, packageInfo: UpdatePackageInfo): Promise<void>;
    /**
     * Gets the result of system update.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SYSTEM
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } version - version indicates the version of update.
     * @returns { Promise<UpdateResult> } the promise returned by the getUpdateResult.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getUpdateResult(admin: Want, version: string): Promise<UpdateResult>;
}
export default systemManager;
