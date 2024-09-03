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
 * @kit DistributedServiceKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
/**
 * Providers interfaces to create a {@link deviceManager} instances.
 *
 * @namespace distributedDeviceManager
 * @syscap SystemCapability.DistributedHardware.DeviceManager
 * @since 10
 */
declare namespace distributedDeviceManager {
    /**
     * Basic description information of a distributed device.
     * @interface DeviceBasicInfo
     * @syscap SystemCapability.DistributedHardware.DeviceManager
     * @since 10
     */
    interface DeviceBasicInfo {
        /**
         * Device unique identifier, The actual value is the udid-hash confused with the appid based on sha256.
         * @type { string }
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        deviceId: string;
        /**
         * Device name.
         * @type { string }
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        deviceName: string;
        /**
         * Obtains the device type represented by a string,
         * which can be {@code phone}, {@code tablet}, {@code tv}, {@code smartVision}, {@code car}.
         * @type { string }
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        deviceType: string;
        /**
         * Device network id.
         * @type { ?string }
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        networkId?: string;
    }
    /**
     * The state of the nearby devices.
     * @enum { number }
     * @syscap SystemCapability.DistributedHardware.DeviceManager
     * @since 10
     */
    enum DeviceStateChange {
        /**
         * This state indicates the device is online but the state is unknown,The distributed function cannot used until
         * state changes to AVAILABLE.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        UNKNOWN = 0,
        /**
         * This state indicates the device has been synchronized to the database, Now the distributed function can be used.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        AVAILABLE = 1,
        /**
         * This state indicates the device is offline.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        UNAVAILABLE = 2
    }
    /**
     * Creates an {@code DeviceManager} instance.
     *
     * To manage devices, you must first call this method to obtain a {@code DeviceManager} instance and then
     * use this instance to call other device management methods.
     *
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @returns { DeviceManager } - Return the DeviceManager object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *                                                  1. Mandatory parameters are left unspecified;
     *                                                  2. Incorrect parameter type;
     *                                                  3. Parameter verification failed.
     * @syscap SystemCapability.DistributedHardware.DeviceManager
     * @since 10
     */
    function createDeviceManager(bundleName: string): DeviceManager;
    /**
     * Releases the {@code DeviceManager} instance that is no longer used.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { DeviceManager } deviceManager - Indicates the {@code DeviceManager} instance.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *                                                  1. Mandatory parameters are left unspecified;
     *                                                  2. Incorrect parameter types;
     *                                                  3. Parameter verification failed.
     * @throws { BusinessError } 11600101 - Failed to execute the function.
     * @syscap SystemCapability.DistributedHardware.DeviceManager
     * @since 10
     */
    function releaseDeviceManager(deviceManager: DeviceManager): void;
    /**
     * Provides methods for managing devices.
     *
     * @interface DeviceManager
     * @syscap SystemCapability.DistributedHardware.DeviceManager
     * @since 10
     */
    interface DeviceManager {
        /**
         * Get a list of available devices. This interface query all authorized and connectable devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @returns { Array<DeviceBasicInfo> } - Returns a list of available devices.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter types;
         *                                                  3. Parameter verification failed.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getAvailableDeviceListSync(): Array<DeviceBasicInfo>;
        /**
         * Get a list of available devices. This interface query all authorized and connectable devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { AsyncCallback<Array<DeviceBasicInfo>> } callback - Indicates the callback to be
         * invoked upon getAvailableDeviceList.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getAvailableDeviceList(callback: AsyncCallback<Array<DeviceBasicInfo>>): void;
        /**
         * Get a list of available devices. This interface query all authorized and connectable devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @returns { Promise<Array<DeviceBasicInfo>> } - Returns a list of available devices.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getAvailableDeviceList(): Promise<Array<DeviceBasicInfo>>;
        /**
         * Get the network id of the local device.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @returns { string } - Returns local device network id.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getLocalDeviceNetworkId(): string;
        /**
         * Get the device name of the local device.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @returns { string } - Returns local device name.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getLocalDeviceName(): string;
        /**
         * Get the device type of the local device.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @returns { number } - Returns local device type.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getLocalDeviceType(): number;
        /**
         * Get the device id of the local device.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @returns { string } - Returns local device id.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getLocalDeviceId(): string;
        /**
         * Get the device name by network id.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } networkId - Device network id.
         * @returns { string } - Returns device name.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified networkId is greater than 255.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getDeviceName(networkId: string): string;
        /**
         * Get the device type by network id.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } networkId - Device network id.
         * @returns { number } - Returns device type.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified networkId is greater than 255.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        getDeviceType(networkId: string): number;
        /**
         * Start to discover nearby devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { object } discoverParam - Identifies the type of target discovered:
         *       discoverTargetType : 1     - Discovery target as a device by default, the value is 1.
         * @param { object } filterOptions - FilterOptions to filter discovery device.
         * The type of filterOptions is map. The map are as follows:
         *       availableStatus: 0-1       - Discover devices only are credible, The value is 0 indicates device isn't credible;
         *                                      0: Devices are offline, client need to bind the device by calling bindTarget() and then connect to it.
         *                                      1: Devices already online, client can make connection.
         *       discoverDistance: 0-100    - Discover devices within a certain distance from the local, the unit is cm.
         *       authenticationStatus: 0-1  - Discover devices based on different authentication status:
         *                                      0: Devices not authenticated.
                                                1: Devices already authenticated.
         *                                The value is 1 indicates device is trust.
         *       authorizationType: 0-2     - Discover devices based on different authorization type:
         *                                      0: Devices authenticated based on temporary negotiated session key.
         *                                      1: Devices authenticated based on the same account credential key.
         *                                      2: Devices authenticated based on different account credential keys.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600104 - Discovery unavailable.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        startDiscovering(discoverParam: {
            [key: string]: Object;
        }, filterOptions?: {
            [key: string]: Object;
        }): void;
        /**
         * Stop discovering nearby devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600104 - Discovery unavailable.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        stopDiscovering(): void;
        /**
         * Bind the specified target.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } deviceId - id of device to bind.
         * @param { object } bindParam - parameters of device to bind, The parameter type is map,such as:
         *      "bindType" : 1,           - This value is type of bind, the values are as follows:
         *                                  1 - The bind type is pin code .
    
         *      "targetPkgName" : "xxxx", - The package name of binding target.
         *      "appName" : "xxxx",       - The app name that try to bind the target.
         *      "appOperation" : "xxxx"   - The reason why the app want to bind the target package.
         *      "customDescription" : "xxxx" - The detail description of the operation.
         * @param { AsyncCallback<{deviceId: string;}> } callback - indicates the callback to be invoked upon bindDevice.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified deviceId is greater than 255.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @throws { BusinessError } 11600103 - Authentication unavailable.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        bindTarget(deviceId: string, bindParam: {
            [key: string]: Object;
        }, callback: AsyncCallback<{
            deviceId: string;
        }>): void;
        /**
         * Unbind the specified target.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } deviceId - id of device to unbind
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified deviceId is greater than 255.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 11600101 - Failed to execute the function.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        unbindTarget(deviceId: string): void;
        /**
         * Register a device state callback so that the application can be notified upon device state changes based on
         * the application bundle name.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'deviceStateChange' } type - Device state change.
         * @param { Callback<{ action: DeviceStateChange; device: DeviceBasicInfo; }> } callback
         * Indicates the device state callback to register.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        on(type: 'deviceStateChange', callback: Callback<{
            action: DeviceStateChange;
            device: DeviceBasicInfo;
        }>): void;
        /**
         * UnRegister device state callback based on the application bundle name.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'deviceStateChange' } type - Device state change.
         * @param { Callback<{ action: DeviceStateChange; device: DeviceBasicInfo; }> } callback
         * Indicates the device state callback to unregister.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        off(type: 'deviceStateChange', callback?: Callback<{
            action: DeviceStateChange;
            device: DeviceBasicInfo;
        }>): void;
        /**
         * Register a device discovery result callback so that the application can be notified when discovery success.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'discoverSuccess' } type - Successfully discovered device.
         * @param { Callback<{ device: DeviceBasicInfo; }> } callback - Indicates the device discovery callback to register.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        on(type: 'discoverSuccess', callback: Callback<{
            device: DeviceBasicInfo;
        }>): void;
        /**
         * UnRegister the device discovery result callback.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'discoverSuccess' } type - Successfully discovered device.
         * @param { Callback<{ device: DeviceBasicInfo; }> } callback - Indicates the device discovery callback to unregister.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        off(type: 'discoverSuccess', callback?: Callback<{
            device: DeviceBasicInfo;
        }>): void;
        /**
         * Register a device name change callback so that the application can be notified when discovery success.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'deviceNameChange' } type - Changed device name.
         * @param { Callback<{ deviceName: string; }> } callback - Indicates the device name change callback to register.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        on(type: 'deviceNameChange', callback: Callback<{
            deviceName: string;
        }>): void;
        /**
         * UnRegister the device name change result callback.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'deviceNameChange' } type - Changed device name.
         * @param { Callback<{ deviceName: string; }> } callback - Indicates the device name change callback to unregister.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        off(type: 'deviceNameChange', callback?: Callback<{
            deviceName: string;
        }>): void;
        /**
         * Register a device discovery result callback so that the application can be notified when discover failed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'discoverFailure' } type - Discovery Device Failure.
         * @param { Callback<{ reason: number; }> } callback
         * Indicates the device found result callback to register.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        on(type: 'discoverFailure', callback: Callback<{
            reason: number;
        }>): void;
        /**
         * UnRegister the device discovery result callback.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'discoverFailure' } type - Discovery Device Failure.
         * @param { Callback<{ reason: number; }> } callback
         * Indicates the device found result callback to unregister.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        off(type: 'discoverFailure', callback?: Callback<{
            reason: number;
        }>): void;
        /**
         * Register a serviceError callback so that the application can be notified when devicemanager service died
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'serviceDie' } type - Service death.
         * @param { Callback<{}> } callback - Indicates the service error callback to register.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        on(type: 'serviceDie', callback?: Callback<{}>): void;
        /**
         * UnRegister the service error callback.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { 'serviceDie' } type - Service death.
         * @param { Callback<{}> } callback - Indicates the service error callback to unregister.
         * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *                                                  1. Mandatory parameters are left unspecified;
         *                                                  2. Incorrect parameter type;
         *                                                  3. Parameter verification failed;
         *                                                  4. The size of specified type is greater than 255.
         * @syscap SystemCapability.DistributedHardware.DeviceManager
         * @since 10
         */
        off(type: 'serviceDie', callback?: Callback<{}>): void;
    }
}
export default distributedDeviceManager;
