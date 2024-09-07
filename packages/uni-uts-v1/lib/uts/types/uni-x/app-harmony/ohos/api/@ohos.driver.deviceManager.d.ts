/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit DriverDevelopmentKit
 */
import type { AsyncCallback } from './@ohos.base';
import type rpc from './@ohos.rpc';
/**
 * This module provides the capability of manage external device.
 *
 * @namespace deviceManager
 * @syscap SystemCapability.Driver.ExternalDevice
 * @since 10
 */
declare namespace deviceManager {
    /**
     * Query the external device list.
     *
     * @permission ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER
     * @param { number } busType - The bus type of device to be queried.
     * @returns { Array<Readonly<Device>> } External device list.
     * @throws { BusinessError } 201 - The permission check failed.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 22900001 - ExternalDeviceManager service exception.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    function queryDevices(busType?: number): Array<Readonly<Device>>;
    /**
     * Bind the device based on the device information returned by queryDevices().
     *
     * @permission ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER
     * @param { number } deviceId - Device id on the device list returned by queryDevices().
     * @param { AsyncCallback<number> } onDisconnect - Callback is invoked when device is disconnected after bind
     * success.
     * @param { AsyncCallback<{deviceId: number; remote: rpc.IRemoteObject;}> } callback - Indicates the bind result
     * including device ID and remote object.
     * @throws { BusinessError } 201 - The permission check failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 22900001 - ExternalDeviceManager service exception.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    function bindDevice(deviceId: number, onDisconnect: AsyncCallback<number>, callback: AsyncCallback<{
        deviceId: number;
        remote: rpc.IRemoteObject;
    }>): void;
    /**
     * Bind the device based on the device information returned by queryDevices().
     *
     * @permission ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER
     * @param { number } deviceId - Device id on the device list returned by queryDevices().
     * @param { AsyncCallback<number> } onDisconnect - Callback is invoked when device is disconnected after bind
     * success.
     * @param { AsyncCallback<RemoteDeviceDriver> } callback - Indicates the bind result including device ID and
     * remote object.
     * @throws { BusinessError } 201 - The permission check failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 22900001 - ExternalDeviceManager service exception.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 11
     */
    function bindDeviceDriver(deviceId: number, onDisconnect: AsyncCallback<number>, callback: AsyncCallback<RemoteDeviceDriver>): void;
    /**
     * Bind the device based on the device information returned by queryDevices().
     *
     * @permission ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER
     * @param { number } deviceId - Device id on the device list returned by queryDevices().
     * @param { AsyncCallback<number> } onDisconnect - Callback is invoked when device is disconnected after bind
     * success.
     * @returns { Promise<{deviceId: number; remote: rpc.IRemoteObject;}> } Indicates the bind result including device
     * ID and remote object.
     * @throws { BusinessError } 201 - The permission check failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 22900001 - ExternalDeviceManager service exception.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    function bindDevice(deviceId: number, onDisconnect: AsyncCallback<number>): Promise<{
        deviceId: number;
        remote: rpc.IRemoteObject;
    }>;
    /**
     * Bind the device based on the device information returned by queryDevices().
     *
     * @permission ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER
     * @param { number } deviceId - Device id on the device list returned by queryDevices().
     * @param { AsyncCallback<number> } onDisconnect - Callback is invoked when device is disconnected after bind
     * success.
     * @returns { Promise<RemoteDeviceDriver> } Indicates the bind result including device ID and remote object.
     * @throws { BusinessError } 201 - The permission check failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 22900001 - ExternalDeviceManager service exception.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 11
     */
    function bindDeviceDriver(deviceId: number, onDisconnect: AsyncCallback<number>): Promise<RemoteDeviceDriver>;
    /**
     * Unbind the device based on the device information returned by queryDevices().
     *
     * @permission ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER
     * @param { number } deviceId - Device id on the device list returned by queryDevices().
     * @param { AsyncCallback<number> } callback - Indicates the unbind result invoked when unbind is finished.
     * @throws { BusinessError } 201 - The permission check failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 22900001 - ExternalDeviceManager service exception.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    function unbindDevice(deviceId: number, callback: AsyncCallback<number>): void;
    /**
     * Unbind the device based on the device information returned by queryDevices().
     *
     * @permission ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER
     * @param { number } deviceId - Device id on the device list returned by queryDevices().
     * @returns { Promise<number> } - Indicates the unbind result invoked when unbind is finished.
     * @throws { BusinessError } 201 - The permission check failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 22900001 - ExternalDeviceManager service exception.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    function unbindDevice(deviceId: number): Promise<number>;
    /**
     * Enumerates the bus types.
     *
     * @enum { number }
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    export enum BusType {
        /**
         * USB device type
         *
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 10
         */
        USB = 1
    }
    /**
     * Represents a device.
     *
     * @typedef Device
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    interface Device {
        /**
         * Bus type of the device.
         *
         * @type { BusType }
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 10
         */
        busType: BusType;
        /**
         * Device ID.
         *
         * @type { number }
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 10
         */
        deviceId: number;
        /**
         * Description of the device.
         *
         * @type { string }
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 10
         */
        description: string;
    }
    /**
     * Represents a USB device.
     *
     * @typedef USBDevice
     * @extends Device
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 10
     */
    interface USBDevice extends Device {
        /**
         * Vendor ID.
         *
         * @type { number }
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 10
         */
        vendorId: number;
        /**
         * Product ID.
         *
         * @type { number }
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 10
         */
        productId: number;
    }
    /**
     * Driver of the remote device bound with <b>deviceId</b>.
     *
     * @typedef RemoteDeviceDriver
     * @syscap SystemCapability.Driver.ExternalDevice
     * @since 11
     */
    interface RemoteDeviceDriver {
        /**
         * Device ID.
         *
         * @type { number }
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 11
         */
        deviceId: number;
        /**
         * Remote driver object.
         *
         * @type { rpc.IRemoteObject }
         * @syscap SystemCapability.Driver.ExternalDevice
         * @since 11
         */
        remote: rpc.IRemoteObject;
    }
}
export default deviceManager;
