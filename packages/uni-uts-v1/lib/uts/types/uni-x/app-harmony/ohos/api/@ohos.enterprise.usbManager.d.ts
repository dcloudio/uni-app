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
 * This module provides the capability to manage the usb of the enterprise devices.
 *
 * @namespace usbManager
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @since 10
 */
declare namespace usbManager {
    /**
     * Usb policy
     *
     * @enum { number }
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export enum UsbPolicy {
        /**
         * Policy read write
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        READ_WRITE = 0,
        /**
         * Policy read only
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        READ_ONLY = 1,
        /**
         * Policy disabled
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        DISABLED = 2
    }
    /**
     * USB device ID.
     *
     * @typedef UsbDeviceId
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export interface UsbDeviceId {
        /**
         * The vendor ID of the USB device.
         *
         * @type { number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        vendorId: number;
        /**
         * The product ID of the USB device.
         *
         * @type { number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        productId: number;
    }
    /**
     * Adds the available USB device trust list by {@link UsbDeviceId} array.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_USB
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<UsbDeviceId> } usbDeviceIds - an array of added USB device ids.
     *                                              The size of the array after setting cannot be greater 1000.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9200010 - A conflict policy has been configured.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function addAllowedUsbDevices(admin: Want, usbDeviceIds: Array<UsbDeviceId>): void;
    /**
     * Removes the available USB device trust list by {@link UsbDeviceId} array.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_USB
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<UsbDeviceId> } usbDeviceIds - an array of removed USB device ids.
     *                                              The size of the array after setting cannot be greater 1000.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function removeAllowedUsbDevices(admin: Want, usbDeviceIds: Array<UsbDeviceId>): void;
    /**
     * Gets the available USB device trust list.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_USB
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @returns { Array<UsbDeviceId> } an array of the available USB device trust list.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getAllowedUsbDevices(admin: Want): Array<UsbDeviceId>;
    /**
     * Sets USB storage device access policy by {@link UsbPolicy}.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_USB
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { UsbPolicy } usbPolicy - USB policy of storage device.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9200010 - A conflict policy has been configured.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function setUsbStorageDeviceAccessPolicy(admin: Want, usbPolicy: UsbPolicy): void;
    /**
     * Gets USB storage device access policy.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_USB
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @returns { UsbPolicy } USB policy of storage device.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getUsbStorageDeviceAccessPolicy(admin: Want): UsbPolicy;
}
export default usbManager;
