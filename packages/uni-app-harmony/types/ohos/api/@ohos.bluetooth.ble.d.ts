/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * @kit ConnectivityKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type constant from './@ohos.bluetooth.constant';
/**
 * Provides methods to operate or manage Bluetooth.
 *
 * @namespace ble
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @since 10
 */
declare namespace ble {
    /**
     * Indicate the profile connection state.
     *
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    type ProfileConnectionState = constant.ProfileConnectionState;
    /**
     * create a Gatt server instance.
     *
     * @returns { GattServer } Returns a Gatt server instance {@code GattServer}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function createGattServer(): GattServer;
    /**
     * create a Gatt client device instance.
     *
     * @param { string } deviceId - Indicates device ID. For example, "11:22:33:AA:BB:FF".
     * @returns { GattClientDevice } Returns a Gatt client device instance {@code GattClientDevice}.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function createGattClientDevice(deviceId: string): GattClientDevice;
    /**
     * Obtains the list of devices in the connected status.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @returns { Array<string> } Returns the list of device address.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function getConnectedBLEDevices(): Array<string>;
    /**
     * Starts scanning for specified BLE devices with filters.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { Array<ScanFilter> } filters - Indicates the list of filters used to filter out specified devices.
     * If you do not want to use filter, set this parameter to {@code null}.
     * @param { ScanOptions } options - Indicates the parameters for scanning and if the user does not assign a value, the default value will be used.
     * {@link ScanOptions#interval} set to 0, {@link ScanOptions#dutyMode} set to {@link SCAN_MODE_LOW_POWER}
     * and {@link ScanOptions#matchMode} set to {@link MATCH_MODE_AGGRESSIVE}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function startBLEScan(filters: Array<ScanFilter>, options?: ScanOptions): void;
    /**
     * Stops BLE scanning.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function stopBLEScan(): void;
    /**
     * Starts BLE advertising.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { AdvertiseSetting } setting - Indicates the settings for BLE advertising.
     * If you need to use the default value, set this parameter to {@code null}.
     * @param { AdvertiseData } advData - Indicates the advertising data.
     * @param { AdvertiseData } advResponse - Indicates the scan response associated with the advertising data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function startAdvertising(setting: AdvertiseSetting, advData: AdvertiseData, advResponse?: AdvertiseData): void;
    /**
     * Stops BLE advertising.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function stopAdvertising(): void;
    /**
     * Starts BLE advertising.
     * The API returns a advertising ID. The ID can be used to temporarily enable or disable this advertising
     * using the API {@link enableAdvertising} or {@link disableAdvertising}.
     * To completely stop the advertising corresponding to the ID, invoke the API {@link stopAdvertising} with ID.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { AdvertisingParams } advertisingParams - Indicates the params for BLE advertising.
     * @param { AsyncCallback<number> } callback - the callback of advertise ID.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function startAdvertising(advertisingParams: AdvertisingParams, callback: AsyncCallback<number>): void;
    /**
     * Starts BLE advertising.
     * The API returns a advertising ID. The ID can be used to temporarily enable or disable this advertising
     * using the API {@link enableAdvertising} or {@link disableAdvertising}.
     * To completely stop the advertising corresponding to the ID, invoke the API {@link stopAdvertising} with ID.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { AdvertisingParams } advertisingParams - Indicates the param for BLE advertising.
     * @returns { Promise<number> } Returns the promise object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function startAdvertising(advertisingParams: AdvertisingParams): Promise<number>;
    /**
     * Enable the advertising with a specific ID temporarily.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { AdvertisingEnableParams } advertisingEnableParams - Indicates the params for enable advertising.
     * @param { AsyncCallback<void> } callback - the callback result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function enableAdvertising(advertisingEnableParams: AdvertisingEnableParams, callback: AsyncCallback<void>): void;
    /**
     * Enable the advertising with a specific ID temporarily.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { AdvertisingEnableParams } advertisingEnableParams - Indicates the params for enable advertising.
     * @returns { Promise<void> } Returns the promise object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function enableAdvertising(advertisingEnableParams: AdvertisingEnableParams): Promise<void>;
    /**
     * Disable the advertising with a specific ID temporarily.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { AdvertisingDisableParams } advertisingDisableParams - Indicates the params for disable advertising.
     * @param { AsyncCallback<void> } callback - the callback result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function disableAdvertising(advertisingDisableParams: AdvertisingDisableParams, callback: AsyncCallback<void>): void;
    /**
     * Disable the advertising with a specific ID temporarily.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { AdvertisingDisableParams } advertisingDisableParams - Indicates the params for disable advertising.
     * @returns { Promise<void> } Returns the promise object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function disableAdvertising(advertisingDisableParams: AdvertisingDisableParams): Promise<void>;
    /**
     * Stops BLE advertising.
     * Completely stop the advertising corresponding to the ID.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { number } advertisingId - Indicates the ID for this BLE advertising.
     * @param { AsyncCallback<void> } callback - the callback result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function stopAdvertising(advertisingId: number, callback: AsyncCallback<void>): void;
    /**
     * Stops BLE advertising.
     * Completely stop the advertising corresponding to the ID.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { number } advertisingId - Indicates the ID for this BLE advertising.
     * @returns { Promise<void> } Returns the promise object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function stopAdvertising(advertisingId: number): Promise<void>;
    /**
     * Subscribing to advertising state change event.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'advertisingStateChange' } type - Type of the advertising state to listen for.
     * @param { Callback<AdvertisingStateChangeInfo> } callback - Callback used to listen for the advertising state.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function on(type: 'advertisingStateChange', callback: Callback<AdvertisingStateChangeInfo>): void;
    /**
     * Unsubscribe from advertising state change event.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'advertisingStateChange' } type - Type of the advertising state to listen for.
     * @param { Callback<AdvertisingStateChangeInfo> } callback - Callback used to listen for the advertising state.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    function off(type: 'advertisingStateChange', callback?: Callback<AdvertisingStateChangeInfo>): void;
    /**
     * Subscribe BLE scan result.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
     * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function on(type: 'BLEDeviceFind', callback: Callback<Array<ScanResult>>): void;
    /**
     * Unsubscribe BLE scan result.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
     * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function off(type: 'BLEDeviceFind', callback?: Callback<Array<ScanResult>>): void;
    /**
     * Manages GATT server. Before calling an Gatt server method, you must use {@link createGattServer} to create an GattServer instance.
     *
     * @typedef GattServer
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface GattServer {
        /**
         * Adds a specified service to be hosted.
         * <p>The added service and its characteristics are provided by the local device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { GattService } service - Indicates the service to add.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        addService(service: GattService): void;
        /**
         * Removes a specified service from the list of GATT services provided by this device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } serviceUuid - Indicates the UUID of the service to remove.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        removeService(serviceUuid: string): void;
        /**
         * Closes this {@code GattServer} object and unregisters its callbacks.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        close(): void;
        /**
         * Sends a notification of a change in a specified local characteristic with a asynchronous callback.
         * <p>This method should be called for every BLE peripheral device that has requested notifications.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } deviceId - Indicates device ID. For example, "11:22:33:AA:BB:FF".
         * @param { NotifyCharacteristic } notifyCharacteristic - Indicates the local characteristic that has changed.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        notifyCharacteristicChanged(deviceId: string, notifyCharacteristic: NotifyCharacteristic, callback: AsyncCallback<void>): void;
        /**
         * Sends a notification of a change in a specified local characteristic with a asynchronous callback.
         * <p>This method should be called for every BLE peripheral device that has requested notifications.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } deviceId - Indicates device ID. For example, "11:22:33:AA:BB:FF".
         * @param { NotifyCharacteristic } notifyCharacteristic - Indicates the local characteristic that has changed.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        notifyCharacteristicChanged(deviceId: string, notifyCharacteristic: NotifyCharacteristic): Promise<void>;
        /**
         * Sends a response to a specified read or write request to a given BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { ServerResponse } serverResponse - Indicates the response parameters {@link ServerResponse}.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        sendResponse(serverResponse: ServerResponse): void;
        /**
         * Subscribe characteristic read event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadRequest> } callback - Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'characteristicRead', callback: Callback<CharacteristicReadRequest>): void;
        /**
         * Unsubscribe characteristic read event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadRequest> } callback - Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'characteristicRead', callback?: Callback<CharacteristicReadRequest>): void;
        /**
         * Subscribe characteristic write event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteRequest> } callback - Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'characteristicWrite', callback: Callback<CharacteristicWriteRequest>): void;
        /**
         * Unsubscribe characteristic write event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteRequest> } callback - Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'characteristicWrite', callback?: Callback<CharacteristicWriteRequest>): void;
        /**
         * Subscribe descriptor read event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadRequest> } callback - Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'descriptorRead', callback: Callback<DescriptorReadRequest>): void;
        /**
         * Unsubscribe descriptor read event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadRequest> } callback - Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'descriptorRead', callback?: Callback<DescriptorReadRequest>): void;
        /**
         * Subscribe descriptor write event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteRequest> } callback - Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'descriptorWrite', callback: Callback<DescriptorWriteRequest>): void;
        /**
         * Unsubscribe descriptor write event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteRequest> } callback - Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'descriptorWrite', callback?: Callback<DescriptorWriteRequest>): void;
        /**
         * Subscribe server connection state changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectionChangeState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'connectionStateChange', callback: Callback<BLEConnectionChangeState>): void;
        /**
         * Unsubscribe server connection state changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectionChangeState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'connectionStateChange', callback?: Callback<BLEConnectionChangeState>): void;
        /**
         * Subscribe mtu changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEMtuChange' } type - Type of the mtu changed event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the mtu changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'BLEMtuChange', callback: Callback<number>): void;
        /**
         * Unsubscribe mtu changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEMtuChange' } type - Type of the mtu changed event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the mtu changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'BLEMtuChange', callback?: Callback<number>): void;
    }
    /**
     * Manages GATT client. Before calling an Gatt client method, you must use {@link createGattClientDevice} to create an GattClientDevice instance.
     *
     * @typedef GattClientDevice
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface GattClientDevice {
        /**
         * Connects to a BLE peripheral device.
         * <p>The 'BLEConnectionStateChange' event is subscribed to return the connection state.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        connect(): void;
        /**
         * Disconnects from or stops an ongoing connection to a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        disconnect(): void;
        /**
         * Disables a BLE peripheral device.
         * <p> This method unregisters the device and clears the registered callbacks and handles.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        close(): void;
        /**
         * Obtains the name of BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { AsyncCallback<string> } callback - Callback used to obtain the device name.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        getDeviceName(callback: AsyncCallback<string>): void;
        /**
         * Obtains the name of BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Promise<string> } Returns a string representation of the name if obtained;
         * returns {@code null} if the name fails to be obtained or the name does not exist.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        getDeviceName(): Promise<string>;
        /**
         * Starts discovering services.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { AsyncCallback<Array<GattService>> } callback - Callback used to catch the services.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        getServices(callback: AsyncCallback<Array<GattService>>): void;
        /**
         * Starts discovering services.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Promise<Array<GattService>> } Returns the list of services {@link GattService} of the BLE peripheral device.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        getServices(): Promise<Array<GattService>>;
        /**
         * Reads the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @param { AsyncCallback<BLECharacteristic> } callback - Callback invoked to return the characteristic value read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        readCharacteristicValue(characteristic: BLECharacteristic, callback: AsyncCallback<BLECharacteristic>): void;
        /**
         * Reads the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @returns { Promise<BLECharacteristic> } - Promise used to return the characteristic value read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        readCharacteristicValue(characteristic: BLECharacteristic): Promise<BLECharacteristic>;
        /**
         * Reads the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @param { AsyncCallback<BLEDescriptor> } callback - Callback invoked to return the descriptor read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        readDescriptorValue(descriptor: BLEDescriptor, callback: AsyncCallback<BLEDescriptor>): void;
        /**
         * Reads the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @returns { Promise<BLEDescriptor> } - Promise used to return the descriptor read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        readDescriptorValue(descriptor: BLEDescriptor): Promise<BLEDescriptor>;
        /**
         * Writes the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to write.
         * @param { GattWriteType } writeType - Write type of the characteristic.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        writeCharacteristicValue(characteristic: BLECharacteristic, writeType: GattWriteType, callback: AsyncCallback<void>): void;
        /**
         * Writes the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to write.
         * @param { GattWriteType } writeType - Write type of the characteristic.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        writeCharacteristicValue(characteristic: BLECharacteristic, writeType: GattWriteType): Promise<void>;
        /**
         * Writes the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to write.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        writeDescriptorValue(descriptor: BLEDescriptor, callback: AsyncCallback<void>): void;
        /**
         * Writes the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to write.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        writeDescriptorValue(descriptor: BLEDescriptor): Promise<void>;
        /**
         * Get the RSSI value of this BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { AsyncCallback<number> } callback - Callback invoked to return the RSSI, in dBm.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        getRssiValue(callback: AsyncCallback<number>): void;
        /**
         * Get the RSSI value of this BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Promise<number> } Returns the RSSI value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        getRssiValue(): Promise<number>;
        /**
         * Set the mtu size of a BLE peripheral device.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { number } mtu - The maximum transmission unit.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        setBLEMtuSize(mtu: number): void;
        /**
         * Enables or disables notification of a characteristic when value changed.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to indicate.
         * @param { boolean } enable - Specifies whether to enable indication of the characteristic. The value {@code true} indicates
         * that notification is enabled, and the value {@code false} indicates that indication is disabled.
         * @param { AsyncCallback<void> } callback - the callback of setCharacteristicChangeNotification.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        setCharacteristicChangeNotification(characteristic: BLECharacteristic, enable: boolean, callback: AsyncCallback<void>): void;
        /**
         * Enables or disables indication of a characteristic when value changed.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to indicate.
         * @param { boolean } enable - Specifies whether to enable indication of the characteristic. The value {@code true} indicates
         * that indication is enabled, and the value {@code false} indicates that indication is disabled.
         * @returns { Promise<void> } Returns the promise object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        setCharacteristicChangeNotification(characteristic: BLECharacteristic, enable: boolean): Promise<void>;
        /**
         * Enables or disables indication of a characteristic when value changed.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to indicate.
         * @param { boolean } enable - Specifies whether to enable indication of the characteristic. The value {@code true} indicates
         * that indication is enabled, and the value {@code false} indicates that indication is disabled.
         * @param { AsyncCallback<void> } callback - the callback of setCharacteristicChangeIndication.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        setCharacteristicChangeIndication(characteristic: BLECharacteristic, enable: boolean, callback: AsyncCallback<void>): void;
        /**
         * Enables or disables indication of a characteristic when value changed.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to indicate.
         * @param { boolean } enable - Specifies whether to enable indication of the characteristic. The value {@code true} indicates
         * that indication is enabled, and the value {@code false} indicates that indication is disabled.
         * @returns { Promise<void> } Returns the promise object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        setCharacteristicChangeIndication(characteristic: BLECharacteristic, enable: boolean): Promise<void>;
        /**
         * Subscribe characteristic value changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'BLECharacteristicChange', callback: Callback<BLECharacteristic>): void;
        /**
         * Unsubscribe characteristic value changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'BLECharacteristicChange', callback?: Callback<BLECharacteristic>): void;
        /**
         * Subscribe client connection state changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectionChangeState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'BLEConnectionStateChange', callback: Callback<BLEConnectionChangeState>): void;
        /**
         * Unsubscribe client connection state changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectionChangeState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'BLEConnectionStateChange', callback?: Callback<BLEConnectionChangeState>): void;
        /**
         * Subscribe mtu changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEMtuChange' } type - Type of the mtu changed event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the mtu changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        on(type: 'BLEMtuChange', callback: Callback<number>): void;
        /**
         * Unsubscribe mtu changed event.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEMtuChange' } type - Type of the mtu changed event to listen for.
         * @param { Callback<number> } callback - Callback used to listen for the mtu changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        off(type: 'BLEMtuChange', callback?: Callback<number>): void;
    }
    /**
     * Describes the Gatt service.
     *
     * @typedef GattService
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface GattService {
        /**
         * The UUID of a GattService instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
        /**
         * Indicates whether the GattService instance is primary or secondary.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        isPrimary: boolean;
        /**
         * The {@link BLECharacteristic} list belongs to this GattService instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristics: Array<BLECharacteristic>;
        /**
         * The list of GATT services contained in the service
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        includeServices?: Array<GattService>;
    }
    /**
     * Describes the Gatt characteristic.
     *
     * @typedef BLECharacteristic
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface BLECharacteristic {
        /**
         * The UUID of the {@link GattService} instance to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
        /**
         * The UUID of a BLECharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicUuid: string;
        /**
         * The value of a BLECharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicValue: ArrayBuffer;
        /**
         * The list of {@link BLEDescriptor} contained in the characteristic
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        descriptors: Array<BLEDescriptor>;
        /**
         * The properties of a BLECharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        properties?: GattProperties;
    }
    /**
     * Describes the Gatt descriptor.
     *
     * @typedef BLEDescriptor
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface BLEDescriptor {
        /**
         * The UUID of the {@link GattService} instance to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
        /**
         * The UUID of the {@link BLECharacteristic} instance to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicUuid: string;
        /**
         * The UUID of the BLEDescriptor instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        descriptorUuid: string;
        /**
         * The value of the BLEDescriptor instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        descriptorValue: ArrayBuffer;
    }
    /**
     * Describes the value of the indication or notification sent by the Gatt server.
     *
     * @typedef NotifyCharacteristic
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface NotifyCharacteristic {
        /**
         * The UUID of the {@link GattService} instance to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
        /**
         * The UUID of a NotifyCharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicUuid: string;
        /**
         * The value of a NotifyCharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicValue: ArrayBuffer;
        /**
         * Specifies whether to request confirmation from the BLE peripheral device (indication) or
         * send a notification. Value {@code true} indicates the former and {@code false} indicates the latter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        confirm: boolean;
    }
    /**
     * Describes the parameters of the Gatt client's characteristic read request.
     *
     * @typedef CharacteristicReadRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface CharacteristicReadRequest {
        /**
         * Indicates the address of the client that initiates the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId: string;
        /**
         * The Id of the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for reading characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        offset: number;
        /**
         * The UUID of a CharacteristicReadRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the of the Gatt client's characteristic write request.
     *
     * @typedef CharacteristicWriteRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface CharacteristicWriteRequest {
        /**
         * Indicates the address of the client that initiates the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for writing characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        offset: number;
        /**
         * Whether this request should be pending for later operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        isPrepared: boolean;
        /**
         * Whether the remote client need a response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        needRsp: boolean;
        /**
         * Indicates the value to be written
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        value: ArrayBuffer;
        /**
         * The UUID of a CharacteristicWriteRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the Gatt client's descriptor read request.
     *
     * @typedef DescriptorReadRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface DescriptorReadRequest {
        /**
         * Indicates the address of the client that initiates the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId: string;
        /**
         * The Id of the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for reading characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        offset: number;
        /**
         * The UUID of a DescriptorReadRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        descriptorUuid: string;
        /**
         * The UUID of the characteristic to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the Gatt client's characteristic write request.
     *
     * @typedef DescriptorWriteRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface DescriptorWriteRequest {
        /**
         * Indicates the address of the client that initiates the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for writing characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        offset: number;
        /**
         * Whether this request should be pending for later operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        isPrepared: boolean;
        /**
         * Whether the remote client need a response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        needRsp: boolean;
        /**
         * Indicates the value to be written
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        value: ArrayBuffer;
        /**
         * The UUID of a DescriptorWriteRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        descriptorUuid: string;
        /**
         * The UUID of the characteristic to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of a response send by the server to a specified read or write request.
     *
     * @typedef ServerResponse
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface ServerResponse {
        /**
         * Indicates the address of the client to which to send the response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        transId: number;
        /**
         * Indicates the status of the read or write request, set this parameter to '0' in normal cases
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        status: number;
        /**
         * Indicates the byte offset of the start position for reading or writing operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        offset: number;
        /**
         * Indicates the value to be sent
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        value: ArrayBuffer;
    }
    /**
     * Describes the Gatt profile connection state.
     *
     * @typedef BLEConnectionChangeState
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface BLEConnectionChangeState {
        /**
         * Indicates the peer device address
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId: string;
        /**
         * Connection state of the Gatt profile
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        state: ProfileConnectionState;
    }
    /**
     * Describes the contents of the scan results.
     *
     * @typedef ScanResult
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface ScanResult {
        /**
         * Address of the scanned device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId: string;
        /**
         * RSSI of the remote device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        rssi: number;
        /**
         * The raw data of broadcast packet
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        data: ArrayBuffer;
        /**
         * The local name of the BLE device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceName: string;
        /**
         * Connectable of the remote device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        connectable: boolean;
    }
    /**
     * Describes the settings for BLE advertising.
     *
     * @typedef AdvertiseSetting
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface AdvertiseSetting {
        /**
         * Minimum slot value for the advertising interval, which is {@code 32} (20 ms)
         * Maximum slot value for the advertising interval, which is {@code 16777215} (10485.759375s)
         * Default slot value for the advertising interval, which is {@code 1600} (1s)
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        interval?: number;
        /**
         * Minimum transmission power level for advertising, which is {@code -127}
         * Maximum transmission power level for advertising, which is {@code 1}
         * Default transmission power level for advertising, which is {@code -7}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        txPower?: number;
        /**
         * Indicates whether the BLE is connectable, default is {@code true}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        connectable?: boolean;
    }
    /**
     * Describes the advertising data.
     *
     * @typedef AdvertiseData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface AdvertiseData {
        /**
         * The specified service UUID list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuids: Array<string>;
        /**
         * The specified manufacturer data list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        manufactureData: Array<ManufactureData>;
        /**
         * The specified service data list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceData: Array<ServiceData>;
        /**
         * Indicates whether the device name will be included in the advertisement packet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        includeDeviceName?: boolean;
    }
    /**
     * Describes the advertising parameters.
     *
     * @typedef AdvertisingParams
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    interface AdvertisingParams {
        /**
         * Indicates the advertising settings.
         *
         * @type { AdvertiseSetting }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        advertisingSettings: AdvertiseSetting;
        /**
         * Indicates the advertising data.
         *
         * @type { AdvertiseData }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        advertisingData: AdvertiseData;
        /**
         * Indicates the advertising response.
         *
         * @type { ?AdvertiseData }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        advertisingResponse?: AdvertiseData;
        /**
         * Indicates the duration for advertising continuously.
         * The duration, in 10ms unit. Valid range is from 1 (10ms) to 65535 (655,350 ms).
         * If this parameter is not specified or is set to 0, advertisement is continuously sent.
         *
         * @type { ?number }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        duration?: number;
    }
    /**
     * Parameter for dynamically enable advertising.
     *
     * @typedef AdvertisingEnableParams
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    interface AdvertisingEnableParams {
        /**
         * Indicates the ID of current advertising.
         *
         * @type { number }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        advertisingId: number;
        /**
         * Indicates the duration for advertising continuously.
         * The duration, in 10ms unit. Valid range is from 1 (10ms) to 65535 (655,350 ms).
         * If this parameter is not specified or is set to 0, advertise is continuously sent.
         *
         * @type { ?number }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        duration?: number;
    }
    /**
     * Parameter for dynamically disable advertising.
     *
     * @typedef AdvertisingDisableParams
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    interface AdvertisingDisableParams {
        /**
         * Indicates the ID of current advertising.
         *
         * @type { number }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        advertisingId: number;
    }
    /**
     * Advertising state change information.
     *
     * @typedef AdvertisingStateChangeInfo
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    interface AdvertisingStateChangeInfo {
        /**
         * Indicates the ID of current advertising.
         *
         * @type { number }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        advertisingId: number;
        /**
         * Indicates the advertising state.
         *
         * @type { AdvertisingState }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        state: AdvertisingState;
    }
    /**
     * Describes the manufacturer data.
     *
     * @typedef ManufactureData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface ManufactureData {
        /**
         * Indicates the manufacturer ID assigned by Bluetooth SIG
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        manufactureId: number;
        /**
         * Indicates the manufacturer data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        manufactureValue: ArrayBuffer;
    }
    /**
     * Describes the service data.
     *
     * @typedef ServiceData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface ServiceData {
        /**
         * Indicates the UUID of the service data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid: string;
        /**
         * Indicates the service data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceValue: ArrayBuffer;
    }
    /**
     * Describes the criteria for filtering scanning results can be set.
     *
     * @typedef ScanFilter
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface ScanFilter {
        /**
         * The address of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        deviceId?: string;
        /**
         * The name of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        name?: string;
        /**
         * The service UUID of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuid?: string;
        /**
         * Service UUID mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceUuidMask?: string;
        /**
         * Service solicitation UUID.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceSolicitationUuid?: string;
        /**
         * Service solicitation UUID mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceSolicitationUuidMask?: string;
        /**
         * Service data.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceData?: ArrayBuffer;
        /**
         * Service data mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        serviceDataMask?: ArrayBuffer;
        /**
         * Manufacture id.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        manufactureId?: number;
        /**
         * Manufacture data.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        manufactureData?: ArrayBuffer;
        /**
         * Manufacture data mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        manufactureDataMask?: ArrayBuffer;
    }
    /**
     * Describes the parameters for scan.
     *
     * @typedef ScanOptions
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface ScanOptions {
        /**
         * Time of delay for reporting the scan result
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        interval?: number;
        /**
         * Bluetooth LE scan mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        dutyMode?: ScanDuty;
        /**
         * Match mode for Bluetooth LE scan filters hardware match
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        matchMode?: MatchMode;
    }
    /**
     * Describes the properties of a gatt characteristic.
     *
     * @typedef GattProperties
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface GattProperties {
        /**
         * Support write property of the characteristic.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        write?: boolean;
        /**
         * Support write no response property of the characteristic.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        writeNoResponse?: boolean;
        /**
         * Support read property of the characteristic.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        read?: boolean;
        /**
         * Support notify property of the characteristic.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        notify?: boolean;
        /**
         * Support indicate property of the characteristic.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        indicate?: boolean;
    }
    /**
     * The enum of gatt characteristic write type
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    enum GattWriteType {
        /**
         * Write characteristic with response.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WRITE = 1,
        /**
         * Write characteristic without response.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WRITE_NO_RESPONSE = 2
    }
    /**
     * The enum of scan duty.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    enum ScanDuty {
        /**
         * low power mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        SCAN_MODE_LOW_POWER = 0,
        /**
         * balanced power mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        SCAN_MODE_BALANCED = 1,
        /**
         * Scan using highest duty cycle
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        SCAN_MODE_LOW_LATENCY = 2
    }
    /**
     * The enum of BLE match mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    enum MatchMode {
        /**
         * aggressive mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MATCH_MODE_AGGRESSIVE = 1,
        /**
         * sticky mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MATCH_MODE_STICKY = 2
    }
    /**
     * The enum of BLE advertising state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 11
     */
    enum AdvertisingState {
        /**
         * advertising started.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        STARTED = 1,
        /**
         * advertising temporarily enabled.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        ENABLED = 2,
        /**
         * advertising temporarily disabled.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        DISABLED = 3,
        /**
         * advertising stopped.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 11
         */
        STOPPED = 4
    }
}
export default ble;
