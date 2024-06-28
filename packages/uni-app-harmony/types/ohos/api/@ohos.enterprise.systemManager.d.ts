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
}
export default systemManager;
