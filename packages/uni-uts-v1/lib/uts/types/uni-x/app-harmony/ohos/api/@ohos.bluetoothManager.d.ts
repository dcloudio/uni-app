/*
 * Copyright (C) 2022-2023 Huawei Device Co., Ltd.
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
/**
 * Provides methods to operate or manage Bluetooth.
 *
 * @namespace bluetoothManager
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @since 9
 * @deprecated since 10
 */
declare namespace bluetoothManager {
    /**
     * Obtains the Bluetooth status of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { BluetoothState } Returns the Bluetooth status, which can be {@link BluetoothState#STATE_OFF},
     * {@link BluetoothState#STATE_TURNING_ON}, {@link BluetoothState#STATE_ON}, {@link BluetoothState#STATE_TURNING_OFF},
     * {@link BluetoothState#STATE_BLE_TURNING_ON}, {@link BluetoothState#STATE_BLE_ON},
     * or {@link BluetoothState#STATE_BLE_TURNING_OFF}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access#getState
     */
    /**
     * Obtains the Bluetooth status of a device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @returns { BluetoothState } Returns the Bluetooth status, which can be {@link BluetoothState#STATE_OFF},
     * {@link BluetoothState#STATE_TURNING_ON}, {@link BluetoothState#STATE_ON}, {@link BluetoothState#STATE_TURNING_OFF},
     * {@link BluetoothState#STATE_BLE_TURNING_ON}, {@link BluetoothState#STATE_BLE_ON},
     * or {@link BluetoothState#STATE_BLE_TURNING_OFF}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access#getState
     */
    function getState(): BluetoothState;
    /**
     * Get the local device connection state to any profile of any remote device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { ProfileConnectionState } One of {@link ProfileConnectionState#STATE_DISCONNECTED},
     * {@link ProfileConnectionState#STATE_CONNECTING}, {@link ProfileConnectionState#STATE_CONNECTED},
     * {@link ProfileConnectionState#STATE_DISCONNECTING}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getProfileConnectionState
     */
    /**
     * Get the local device connection state to any profile of any remote device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @returns { ProfileConnectionState } One of {@link ProfileConnectionState#STATE_DISCONNECTED},
     * {@link ProfileConnectionState#STATE_CONNECTING}, {@link ProfileConnectionState#STATE_CONNECTED},
     * {@link ProfileConnectionState#STATE_DISCONNECTING}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getProfileConnectionState
     */
    function getBtConnectionState(): ProfileConnectionState;
    /**
     * Starts pairing with a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { string } deviceId - The address of the remote device to pair.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#pairDevice
     */
    /**
     * Starts pairing with a remote Bluetooth device.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } deviceId - The address of the remote device to pair.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#pairDevice
     */
    function pairDevice(deviceId: string): void;
    /**
     * Obtains the name of a peer Bluetooth device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } deviceId - The address of the remote device.
     * @returns { string } Returns the device name in character string format.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getRemoteDeviceName
     */
    /**
     * Obtains the name of a peer Bluetooth device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } deviceId - The address of the remote device.
     * @returns { string } Returns the device name in character string format.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getRemoteDeviceName
     */
    function getRemoteDeviceName(deviceId: string): string;
    /**
     * Obtains the class of a peer Bluetooth device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } deviceId - The address of the remote device.
     * @returns { DeviceClass } The class of the remote device, {@link DeviceClass}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getRemoteDeviceClass
     */
    /**
     * Obtains the class of a peer Bluetooth device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } deviceId - The address of the remote device.
     * @returns { DeviceClass } The class of the remote device, {@link DeviceClass}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getRemoteDeviceClass
     */
    function getRemoteDeviceClass(deviceId: string): DeviceClass;
    /**
     * Enables Bluetooth on a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access#enableBluetooth
     */
    /**
     * Enables Bluetooth on a device.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access#enableBluetooth
     */
    function enableBluetooth(): void;
    /**
     * Disables Bluetooth on a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access#disableBluetooth
     */
    /**
     * Disables Bluetooth on a device.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access#disableBluetooth
     */
    function disableBluetooth(): void;
    /**
     * Obtains the Bluetooth local name of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { string } Returns the name the device.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getLocalName
     */
    /**
     * Obtains the Bluetooth local name of a device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @returns { string } Returns the name the device.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getLocalName
     */
    function getLocalName(): string;
    /**
     * Obtains the list of Bluetooth devices that have been paired with the current device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { Array<string> } Returns a list of paired Bluetooth devices's address.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getPairedDevices
     */
    /**
     * Obtains the list of Bluetooth devices that have been paired with the current device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @returns { Array<string> } Returns a list of paired Bluetooth devices's address.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getPairedDevices
     */
    function getPairedDevices(): Array<string>;
    /**
     * Obtains the connection state of profile.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { ProfileId } profileId - The profile id.
     * @returns { ProfileConnectionState } Returns the connection state.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getProfileConnectionState
     */
    /**
     * Obtains the connection state of profile.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { ProfileId } profileId - The profile id.
     * @returns { ProfileConnectionState } Returns the connection state.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getProfileConnectionState
     */
    function getProfileConnectionState(profileId: ProfileId): ProfileConnectionState;
    /**
     * Sets the confirmation of pairing with a certain device.
     *
     * @permission ohos.permission.MANAGE_BLUETOOTH
     * @param { string } device - The address of the remote device.
     * @param { boolean } accept - Indicates whether to accept the pairing request, {@code true} indicates accept or {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#setDevicePairingConfirmation
     */
    /**
     * Sets the confirmation of pairing with a certain device.
     * The permission required by this interface is changed from MANAGE_BLUETOOTH to ACCESS_BLUETOOTH and MANAGE_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH and ohos.permission.MANAGE_BLUETOOTH
     * @param { string } device - The address of the remote device.
     * @param { boolean } accept - Indicates whether to accept the pairing request, {@code true} indicates accept or {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#setDevicePairingConfirmation
     */
    function setDevicePairingConfirmation(device: string, accept: boolean): void;
    /**
     * Sets the Bluetooth friendly name of a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { string } name - Indicates a valid Bluetooth name.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#setLocalName
     */
    /**
     * Sets the Bluetooth friendly name of a device.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } name - Indicates a valid Bluetooth name.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#setLocalName
     */
    function setLocalName(name: string): void;
    /**
     * Sets the Bluetooth scan mode for a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { ScanMode } mode - Indicates the Bluetooth scan mode to set, {@link ScanMode}.
     * @param { number } duration - Indicates the duration in seconds, in which the host is discoverable.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#setBluetoothScanMode
     */
    /**
     * Sets the Bluetooth scan mode for a device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { ScanMode } mode - Indicates the Bluetooth scan mode to set, {@link ScanMode}.
     * @param { number } duration - Indicates the duration in seconds, in which the host is discoverable.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#setBluetoothScanMode
     */
    function setBluetoothScanMode(mode: ScanMode, duration: number): void;
    /**
     * Obtains the Bluetooth scanning mode of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { ScanMode } Returns the Bluetooth scanning mode, {@link ScanMode}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getBluetoothScanMode
     */
    /**
     * Obtains the Bluetooth scanning mode of a device.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @returns { ScanMode } Returns the Bluetooth scanning mode, {@link ScanMode}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#getBluetoothScanMode
     */
    function getBluetoothScanMode(): ScanMode;
    /**
     * Starts scanning Bluetooth devices.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH and ohos.permission.LOCATION
     *     and ohos.permission.APPROXIMATELY_LOCATION
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#startBluetoothDiscovery
     */
    /**
     * Starts scanning Bluetooth devices.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH and LOCATION and APPROXIMATELY_LOCATION to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#startBluetoothDiscovery
     */
    function startBluetoothDiscovery(): void;
    /**
     * Stops Bluetooth device scanning.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#stopBluetoothDiscovery
     */
    /**
     * Stops Bluetooth device scanning.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection#stopBluetoothDiscovery
     */
    function stopBluetoothDiscovery(): void;
    /**
     * Subscribe the event reported when a remote Bluetooth device is discovered.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bluetoothDeviceFind' } type - Type of the discovering event to listen for.
     * @param { Callback<Array<string>> } callback - Callback used to listen for the discovering event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.on#event:bluetoothDeviceFind
     */
    /**
     * Subscribe the event reported when a remote Bluetooth device is discovered.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'bluetoothDeviceFind' } type - Type of the discovering event to listen for.
     * @param { Callback<Array<string>> } callback - Callback used to listen for the discovering event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.on#event:bluetoothDeviceFind
     */
    function on(type: 'bluetoothDeviceFind', callback: Callback<Array<string>>): void;
    /**
     * Unsubscribe the event reported when a remote Bluetooth device is discovered.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bluetoothDeviceFind' } type - Type of the discovering event to listen for.
     * @param { Callback<Array<string>> } callback - Callback used to listen for the discovering event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.off#event:bluetoothDeviceFind
     */
    /**
     * Unsubscribe the event reported when a remote Bluetooth device is discovered.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'bluetoothDeviceFind' } type - Type of the discovering event to listen for.
     * @param { Callback<Array<string>> } callback - Callback used to listen for the discovering event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.off#event:bluetoothDeviceFind
     */
    function off(type: 'bluetoothDeviceFind', callback?: Callback<Array<string>>): void;
    /**
     * Subscribe the event reported when a remote Bluetooth device is bonded.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bondStateChange' } type - Type of the bond state event to listen for.
     * @param { Callback<BondStateParam> } callback - Callback used to listen for the bond state event, {@link BondStateParam}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.on#event:bondStateChange
     */
    /**
     * Subscribe the event reported when a remote Bluetooth device is bonded.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'bondStateChange' } type - Type of the bond state event to listen for.
     * @param { Callback<BondStateParam> } callback - Callback used to listen for the bond state event, {@link BondStateParam}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.on#event:bondStateChange
     */
    function on(type: 'bondStateChange', callback: Callback<BondStateParam>): void;
    /**
     * Unsubscribe the event reported when a remote Bluetooth device is bonded.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bondStateChange' } type - Type of the bond state event to listen for.
     * @param { Callback<BondStateParam> } callback - Callback used to listen for the bond state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.off#event:bondStateChange
     */
    /**
     * Unsubscribe the event reported when a remote Bluetooth device is bonded.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'bondStateChange' } type - Type of the bond state event to listen for.
     * @param { Callback<BondStateParam> } callback - Callback used to listen for the bond state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.off#event:bondStateChange
     */
    function off(type: 'bondStateChange', callback?: Callback<BondStateParam>): void;
    /**
     * Subscribe the event of a pairing request from a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { 'pinRequired' } type - Type of the pairing request event to listen for.
     * @param { Callback<PinRequiredParam> } callback - Callback used to listen for the pairing request event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.on#event:pinRequired
     */
    /**
     * Subscribe the event of a pairing request from a remote Bluetooth device.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'pinRequired' } type - Type of the pairing request event to listen for.
     * @param { Callback<PinRequiredParam> } callback - Callback used to listen for the pairing request event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.on#event:pinRequired
     */
    function on(type: 'pinRequired', callback: Callback<PinRequiredParam>): void;
    /**
     * Unsubscribe the event of a pairing request from a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { 'pinRequired' } type - Type of the pairing request event to listen for.
     * @param { Callback<PinRequiredParam> } callback - Callback used to listen for the pairing request event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.off#event:pinRequired
     */
    /**
     * Unsubscribe the event of a pairing request from a remote Bluetooth device.
     * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'pinRequired' } type - Type of the pairing request event to listen for.
     * @param { Callback<PinRequiredParam> } callback - Callback used to listen for the pairing request event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.off#event:pinRequired
     */
    function off(type: 'pinRequired', callback?: Callback<PinRequiredParam>): void;
    /**
     * Subscribe the event reported when the Bluetooth state changes.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'stateChange' } type - Type of the Bluetooth state changes event to listen for.
     * @param { Callback<BluetoothState> } callback - Callback used to listen for the Bluetooth state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access.on#event:stateChange
     */
    /**
     * Subscribe the event reported when the Bluetooth state changes.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'stateChange' } type - Type of the Bluetooth state changes event to listen for.
     * @param { Callback<BluetoothState> } callback - Callback used to listen for the Bluetooth state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access.on#event:stateChange
     */
    function on(type: 'stateChange', callback: Callback<BluetoothState>): void;
    /**
     * Unsubscribe the event reported when the Bluetooth state changes.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'stateChange' } type - Type of the Bluetooth state changes event to listen for.
     * @param { Callback<BluetoothState> } callback - Callback used to listen for the Bluetooth state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access.off#event:stateChange
     */
    /**
     * Unsubscribe the event reported when the Bluetooth state changes.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { 'stateChange' } type - Type of the Bluetooth state changes event to listen for.
     * @param { Callback<BluetoothState> } callback - Callback used to listen for the Bluetooth state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access.off#event:stateChange
     */
    function off(type: 'stateChange', callback?: Callback<BluetoothState>): void;
    /**
     * Creates a Bluetooth server listening socket.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } name - Indicates the service name.
     * @param { SppOption } option - Indicates the listen parameters {@link SppOption}.
     * @param { AsyncCallback<number> } callback - Callback used to return a server socket ID.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppListen
     */
    /**
     * Creates a Bluetooth server listening socket.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } name - Indicates the service name.
     * @param { SppOption } option - Indicates the listen parameters {@link SppOption}.
     * @param { AsyncCallback<number> } callback - Callback used to return a server socket ID.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppListen
     */
    function sppListen(name: string, option: SppOption, callback: AsyncCallback<number>): void;
    /**
     * Waits for a remote device to connect.
     *
     * @param { number } serverSocket - Indicates the server socket ID, returned by {@link sppListen}.
     * @param { AsyncCallback<number> } callback - Callback used to return a client socket ID.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppAccept
     */
    function sppAccept(serverSocket: number, callback: AsyncCallback<number>): void;
    /**
     * Connects to a remote device over the socket.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } device - The address of the remote device to connect.
     * @param { SppOption } option - Indicates the connect parameters {@link SppOption}.
     * @param { AsyncCallback<number> } callback - Callback used to return a client socket ID.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppConnect
     */
    /**
     * Connects to a remote device over the socket.
     * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } device - The address of the remote device to connect.
     * @param { SppOption } option - Indicates the connect parameters {@link SppOption}.
     * @param { AsyncCallback<number> } callback - Callback used to return a client socket ID.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppConnect
     */
    function sppConnect(device: string, option: SppOption, callback: AsyncCallback<number>): void;
    /**
     * Disables an spp server socket and releases related resources.
     *
     * @param { number } socket - Indicates the server socket ID, returned by {@link sppListen}.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppCloseServerSocket
     */
    function sppCloseServerSocket(socket: number): void;
    /**
     * Disables an spp client socket and releases related resources.
     *
     * @param { number } socket - Indicates the client socket ID, returned by {@link sppAccept} or {@link sppConnect}.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppCloseClientSocket
     */
    function sppCloseClientSocket(socket: number): void;
    /**
     * Write data through the socket.
     *
     * @param { number } clientSocket - Indicates the client socket ID, returned by {@link sppAccept} or {@link sppConnect}.
     * @param { ArrayBuffer } data - Indicates the data to write.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2901054 - IO error.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket#sppWrite
     */
    function sppWrite(clientSocket: number, data: ArrayBuffer): void;
    /**
     * Subscribe the event reported when data is read from the socket.
     *
     * @param { 'sppRead' } type - Type of the spp read event to listen for.
     * @param { number } clientSocket - Client socket ID, which is obtained by sppAccept or sppConnect.
     * @param { Callback<ArrayBuffer> } callback - Callback used to listen for the spp read event.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2901054 - IO error.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket.on#event:sppRead
     */
    function on(type: 'sppRead', clientSocket: number, callback: Callback<ArrayBuffer>): void;
    /**
     * Unsubscribe the event reported when data is read from the socket.
     *
     * @param { 'sppRead' } type - Type of the spp read event to listen for.
     * @param { number } clientSocket - Client socket ID, which is obtained by sppAccept or sppConnect.
     * @param { Callback<ArrayBuffer> } callback - Callback used to listen for the spp read event.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket.off#event:sppRead
     */
    function off(type: 'sppRead', clientSocket: number, callback?: Callback<ArrayBuffer>): void;
    /**
     * Obtains the instance of profile.
     *
     * @param { ProfileId } profileId - The profile id..
     * @returns { A2dpSourceProfile | HandsFreeAudioGatewayProfile | HidHostProfile | PanProfile } Returns the instance of profile.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     */
    function getProfileInstance(profileId: ProfileId): A2dpSourceProfile | HandsFreeAudioGatewayProfile | HidHostProfile | PanProfile;
    /**
     * Base interface of profile.
     *
     * @typedef BaseProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.baseProfile/baseProfile.BaseProfile
     */
    interface BaseProfile {
        /**
         * Obtains the connected devices list of profile.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Array<string> } Returns the address of connected devices list.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.baseProfile/baseProfile#getConnectedDevices
         */
        /**
         * Obtains the connected devices list of profile.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Array<string> } Returns the address of connected devices list.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.baseProfile/baseProfile#getConnectedDevices
         */
        getConnectionDevices(): Array<string>;
        /**
         * Obtains the profile state of device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { string } device - The address of bluetooth device.
         * @returns { ProfileConnectionState } Returns {@link ProfileConnectionState} of device.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.baseProfile/baseProfile#getConnectionState
         */
        /**
         * Obtains the profile state of device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } device - The address of bluetooth device.
         * @returns { ProfileConnectionState } Returns {@link ProfileConnectionState} of device.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.baseProfile/baseProfile#getConnectionState
         */
        getDeviceState(device: string): ProfileConnectionState;
    }
    /**
     * Manager a2dp source profile.
     *
     * @typedef A2dpSourceProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile
     */
    interface A2dpSourceProfile extends BaseProfile {
        /**
         * Connect to device with a2dp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to connect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile#connect
         */
        /**
         * Connect to device with a2dp.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } device - The address of the remote device to connect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile#connect
         */
        connect(device: string): void;
        /**
         * Disconnect to device with a2dp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile#disconnect
         */
        /**
         * Disconnect to device with a2dp.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } device - The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile#disconnect
         */
        disconnect(device: string): void;
        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile.on#event:connectionStateChange
         */
        /**
         * Subscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile.on#event:connectionStateChange
         */
        on(type: 'connectionStateChange', callback: Callback<StateChangeParam>): void;
        /**
         * Unsubscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile.off#event:connectionStateChange
         */
        /**
         * Unsubscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile.off#event:connectionStateChange
         */
        off(type: 'connectionStateChange', callback?: Callback<StateChangeParam>): void;
        /**
         * Obtains the playing state of device.
         *
         * @param { string } device - The address of the remote device.
         * @returns { PlayingState } Returns {@link PlayingState} of the remote device.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile#getPlayingState
         */
        /**
         * Obtains the playing state of device.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } device - The address of the remote device.
         * @returns { PlayingState } Returns {@link PlayingState} of the remote device.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.A2dpSourceProfile#getPlayingState
         */
        getPlayingState(device: string): PlayingState;
    }
    /**
     * Manager handsfree AG profile.
     *
     * @typedef HandsFreeAudioGatewayProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile
     */
    interface HandsFreeAudioGatewayProfile extends BaseProfile {
        /**
         * Connect to device with hfp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to connect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile#connect
         */
        /**
         * Connect to device with hfp.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } device - The address of the remote device to connect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile#connect
         */
        connect(device: string): void;
        /**
         * Disconnect to device with hfp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile#disconnect
         */
        /**
         * Disconnect to device with hfp.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } device - The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile#disconnect
         */
        disconnect(device: string): void;
        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile.on#event:connectionStateChange
         */
        /**
         * Subscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile.on#event:connectionStateChange
         */
        on(type: 'connectionStateChange', callback: Callback<StateChangeParam>): void;
        /**
         * Unsubscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile.off#event:connectionStateChange
         */
        /**
         * Unsubscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hfp/hfp.HandsFreeAudioGatewayProfile.off#event:connectionStateChange
         */
        off(type: 'connectionStateChange', callback?: Callback<StateChangeParam>): void;
    }
    /**
     * Manager hid host profile.
     *
     * @typedef HidHostProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.hid/hid.HidHostProfile
     */
    interface HidHostProfile extends BaseProfile {
        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hid/hid.HidHostProfile.on#event:connectionStateChange
         */
        /**
         * Subscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hid/hid.HidHostProfile.on#event:connectionStateChange
         */
        on(type: 'connectionStateChange', callback: Callback<StateChangeParam>): void;
        /**
         * Unsubscribe the event reported when the profile connection state changes.
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for.
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hid/hid.HidHostProfile.off#event:connectionStateChange
         */
        /**
         * Unsubscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for.
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.hid/hid.HidHostProfile.off#event:connectionStateChange
         */
        off(type: 'connectionStateChange', callback?: Callback<StateChangeParam>): void;
    }
    /**
     * Manager pan profile.
     *
     * @typedef PanProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.pan/pan.PanProfile
     */
    interface PanProfile extends BaseProfile {
        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.pan/pan.PanProfile.on#event:connectionStateChange
         */
        /**
         * Subscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.pan/pan.PanProfile.on#event:connectionStateChange
         */
        on(type: 'connectionStateChange', callback: Callback<StateChangeParam>): void;
        /**
         * Unsubscribe the event reported when the profile connection state changes.
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for.
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.pan/pan.PanProfile.off#event:connectionStateChange
         */
        /**
         * Unsubscribe the event reported when the profile connection state changes.
         * The permission required by this interface is changed to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for.
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.pan/pan.PanProfile.off#event:connectionStateChange
         */
        off(type: 'connectionStateChange', callback?: Callback<StateChangeParam>): void;
    }
    /**
     * Provides methods to operate or manage Bluetooth.
     *
     * @namespace BLE
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble
     */
    namespace BLE {
        /**
         * create a JavaScript Gatt server instance.
         *
         * @returns { GattServer } Returns a JavaScript Gatt server instance {@code GattServer}.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#createGattServer
         */
        function createGattServer(): GattServer;
        /**
         * create a JavaScript Gatt client device instance.
         *
         * @param { string } deviceId - The address of the remote device.
         * @returns { GattClientDevice } Returns a JavaScript Gatt client device instance {@code GattClientDevice}.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#createGattClientDevice
         */
        function createGattClientDevice(deviceId: string): GattClientDevice;
        /**
         * Obtains the list of devices in the connected status.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Array<string> } Returns the list of device address.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#getConnectedBLEDevices
         */
        /**
         * Obtains the list of devices in the connected status.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Array<string> } Returns the list of device address.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#getConnectedBLEDevices
         */
        function getConnectedBLEDevices(): Array<string>;
        /**
         * Starts scanning for specified BLE devices with filters.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH and ohos.permission.MANAGE_BLUETOOTH and ohos.permission.LOCATION
         *     and ohos.permission.APPROXIMATELY_LOCATION
         * @param { Array<ScanFilter> } filters - Indicates the list of filters used to filter out specified devices.
         * If you do not want to use filter, set this parameter to {@code null}.
         * @param { ScanOptions } options - Indicates the parameters for scanning and if the user does not assign a value, the default value will be used.
         * {@link ScanOptions#interval} set to 0, {@link ScanOptions#dutyMode} set to {@link SCAN_MODE_LOW_POWER}
         * and {@link ScanOptions#matchMode} set to {@link MATCH_MODE_AGGRESSIVE}.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#startBLEScan
         */
        /**
         * Starts scanning for specified BLE devices with filters.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH and MANAGE_BLUETOOTH and LOCATION to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { Array<ScanFilter> } filters - Indicates the list of filters used to filter out specified devices.
         * If you do not want to use filter, set this parameter to {@code null}.
         * @param { ScanOptions } options - Indicates the parameters for scanning and if the user does not assign a value, the default value will be used.
         * {@link ScanOptions#interval} set to 0, {@link ScanOptions#dutyMode} set to {@link SCAN_MODE_LOW_POWER}
         * and {@link ScanOptions#matchMode} set to {@link MATCH_MODE_AGGRESSIVE}.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#startBLEScan
         */
        function startBLEScan(filters: Array<ScanFilter>, options?: ScanOptions): void;
        /**
         * Stops BLE scanning.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#stopBLEScan
         */
        /**
         * Stops BLE scanning.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#stopBLEScan
         */
        function stopBLEScan(): void;
        /**
         * Subscribe BLE scan result.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
         * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.on#event:BLEDeviceFind
         */
        /**
         * Subscribe BLE scan result.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
         * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.on#event:BLEDeviceFind
         */
        function on(type: 'BLEDeviceFind', callback: Callback<Array<ScanResult>>): void;
        /**
         * Unsubscribe BLE scan result.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
         * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.off#event:BLEDeviceFind
         */
        /**
         * Unsubscribe BLE scan result.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
         * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.off#event:BLEDeviceFind
         */
        function off(type: 'BLEDeviceFind', callback?: Callback<Array<ScanResult>>): void;
    }
    /**
     * Manages GATT server. Before calling an Gatt server method, you must use {@link createGattServer} to create an GattServer instance.
     *
     * @typedef GattServer
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.GattServer
     */
    interface GattServer {
        /**
         * Starts BLE advertising.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { AdvertiseSetting } setting - Indicates the settings for BLE advertising.
         * If you need to use the default value, set this parameter to {@code null}.
         * @param { AdvertiseData } advData - Indicates the advertising data.
         * @param { AdvertiseData } advResponse - Indicates the scan response associated with the advertising data.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#startAdvertising
         */
        /**
         * Starts BLE advertising.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { AdvertiseSetting } setting - Indicates the settings for BLE advertising.
         * If you need to use the default value, set this parameter to {@code null}.
         * @param { AdvertiseData } advData - Indicates the advertising data.
         * @param { AdvertiseData } advResponse - Indicates the scan response associated with the advertising data.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#startAdvertising
         */
        startAdvertising(setting: AdvertiseSetting, advData: AdvertiseData, advResponse?: AdvertiseData): void;
        /**
         * Stops BLE advertising.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#stopAdvertising
         */
        /**
         * Stops BLE advertising.
         * The permission required by this interface is changed from DISCOVER_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble#stopAdvertising
         */
        stopAdvertising(): void;
        /**
         * Adds a specified service to be hosted.
         * <p>The added service and its characteristics are provided by the local device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { GattService } service - Indicates the service to add.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#addService
         */
        /**
         * Adds a specified service to be hosted.
         * <p>The added service and its characteristics are provided by the local device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { GattService } service - Indicates the service to add.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#addService
         */
        addService(service: GattService): void;
        /**
         * Removes a specified service from the list of GATT services provided by this device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { string } serviceUuid - Indicates the UUID of the service to remove.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#removeService
         */
        /**
         * Removes a specified service from the list of GATT services provided by this device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } serviceUuid - Indicates the UUID of the service to remove.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900004 - Profile not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#removeService
         */
        removeService(serviceUuid: string): void;
        /**
         * Closes this {@code GattServer} object and unregisters its callbacks.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#close
         */
        /**
         * Closes this {@code GattServer} object and unregisters its callbacks.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#close
         */
        close(): void;
        /**
         * Sends a notification of a change in a specified local characteristic.
         * <p>This method should be called for every BLE peripheral device that has requested notifications.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { string } deviceId - Indicates the address of the BLE peripheral device to receive the notification.
         * @param { NotifyCharacteristic } notifyCharacteristic - Indicates the local characteristic that has changed.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#notifyCharacteristicChanged
         */
        /**
         * Sends a notification of a change in a specified local characteristic.
         * <p>This method should be called for every BLE peripheral device that has requested notifications.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { string } deviceId - Indicates the address of the BLE peripheral device to receive the notification.
         * @param { NotifyCharacteristic } notifyCharacteristic - Indicates the local characteristic that has changed.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#notifyCharacteristicChanged
         */
        notifyCharacteristicChanged(deviceId: string, notifyCharacteristic: NotifyCharacteristic): void;
        /**
         * Sends a response to a specified read or write request to a given BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { ServerResponse } serverResponse - Indicates the response parameters {@link ServerResponse}.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#sendResponse
         */
        /**
         * Sends a response to a specified read or write request to a given BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { ServerResponse } serverResponse - Indicates the response parameters {@link ServerResponse}.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer#sendResponse
         */
        sendResponse(serverResponse: ServerResponse): void;
        /**
         * Subscribe characteristic read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadRequest> } callback - Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:characteristicRead
         */
        /**
         * Subscribe characteristic read event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadRequest> } callback - Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:characteristicRead
         */
        on(type: 'characteristicRead', callback: Callback<CharacteristicReadRequest>): void;
        /**
         * Unsubscribe characteristic read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadRequest> } callback - Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:characteristicRead
         */
        /**
         * Unsubscribe characteristic read event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadRequest> } callback - Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:characteristicRead
         */
        off(type: 'characteristicRead', callback?: Callback<CharacteristicReadRequest>): void;
        /**
         * Subscribe characteristic write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteRequest> } callback - Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:characteristicWrite
         */
        /**
         * Subscribe characteristic write event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteRequest> } callback - Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:characteristicWrite
         */
        on(type: 'characteristicWrite', callback: Callback<CharacteristicWriteRequest>): void;
        /**
         * Unsubscribe characteristic write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteRequest> } callback - Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:characteristicWrite
         */
        /**
         * Unsubscribe characteristic write event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteRequest> } callback - Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:characteristicWrite
         */
        off(type: 'characteristicWrite', callback?: Callback<CharacteristicWriteRequest>): void;
        /**
         * Subscribe descriptor read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadRequest> } callback - Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:descriptorRead
         */
        /**
         * Subscribe descriptor read event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadRequest> } callback - Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:descriptorRead
         */
        on(type: 'descriptorRead', callback: Callback<DescriptorReadRequest>): void;
        /**
         * Unsubscribe descriptor read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadRequest> } callback - Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:descriptorRead
         */
        /**
         * Unsubscribe descriptor read event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadRequest> } callback - Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:descriptorRead
         */
        off(type: 'descriptorRead', callback?: Callback<DescriptorReadRequest>): void;
        /**
         * Subscribe descriptor write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteRequest> } callback - Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:descriptorWrite
         */
        /**
         * Subscribe descriptor write event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteRequest> } callback - Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:descriptorWrite
         */
        on(type: 'descriptorWrite', callback: Callback<DescriptorWriteRequest>): void;
        /**
         * Unsubscribe descriptor write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteRequest> } callback - Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:descriptorWrite
         */
        /**
         * Unsubscribe descriptor write event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteRequest> } callback - Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:descriptorWrite
         */
        off(type: 'descriptorWrite', callback?: Callback<DescriptorWriteRequest>): void;
        /**
         * Subscribe server connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'connectStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:connectionStateChange
         */
        /**
         * Subscribe server connection state changed event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.on#event:connectionStateChange
         */
        on(type: 'connectStateChange', callback: Callback<BLEConnectChangedState>): void;
        /**
         * Unsubscribe server connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'connectStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:connectionStateChange
         */
        /**
         * Unsubscribe server connection state changed event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'connectStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattServer.off#event:connectionStateChange
         */
        off(type: 'connectStateChange', callback?: Callback<BLEConnectChangedState>): void;
    }
    /**
     * Manages GATT client. Before calling an Gatt client method, you must use {@link createGattClientDevice} to create an GattClientDevice instance.
     *
     * @typedef GattClientDevice
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.GattClientDevice
     */
    interface GattClientDevice {
        /**
         * Connects to a BLE peripheral device.
         * <p>The 'BLEConnectionStateChange' event is subscribed to return the connection state.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#connect
         */
        /**
         * Connects to a BLE peripheral device.
         * <p>The 'BLEConnectionStateChange' event is subscribed to return the connection state.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#connect
         */
        connect(): void;
        /**
         * Disconnects from or stops an ongoing connection to a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#disconnect
         */
        /**
         * Disconnects from or stops an ongoing connection to a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#disconnect
         */
        disconnect(): void;
        /**
         * Disables a BLE peripheral device.
         * <p> This method unregisters the device and clears the registered callbacks and handles.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#close
         */
        /**
         * Disables a BLE peripheral device.
         * <p> This method unregisters the device and clears the registered callbacks and handles.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth disabled.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#close
         */
        close(): void;
        /**
         * Obtains the name of BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { AsyncCallback<string> } callback - Callback used to obtain the device name.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getDeviceName
         */
        /**
         * Obtains the name of BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { AsyncCallback<string> } callback - Callback used to obtain the device name.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getDeviceName
         */
        getDeviceName(callback: AsyncCallback<string>): void;
        /**
         * Obtains the name of BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<string> } Returns a string representation of the name if obtained;
         * returns {@code null} if the name fails to be obtained or the name does not exist.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getDeviceName
         */
        /**
         * Obtains the name of BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Promise<string> } Returns a string representation of the name if obtained;
         * returns {@code null} if the name fails to be obtained or the name does not exist.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getDeviceName
         */
        getDeviceName(): Promise<string>;
        /**
         * Starts discovering services.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { AsyncCallback<Array<GattService>> } callback - Callback used to catch the services.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getServices
         */
        /**
         * Starts discovering services.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { AsyncCallback<Array<GattService>> } callback - Callback used to catch the services.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getServices
         */
        getServices(callback: AsyncCallback<Array<GattService>>): void;
        /**
         * Starts discovering services.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<Array<GattService>> } Returns the list of services {@link GattService} of the BLE peripheral device.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getServices
         */
        /**
         * Starts discovering services.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Promise<Array<GattService>> } Returns the list of services {@link GattService} of the BLE peripheral device.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getServices
         */
        getServices(): Promise<Array<GattService>>;
        /**
         * Reads the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @param { AsyncCallback<BLECharacteristic> } callback - Callback invoked to return the characteristic value read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readCharacteristicValue
         */
        /**
         * Reads the characteristic of a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @param { AsyncCallback<BLECharacteristic> } callback - Callback invoked to return the characteristic value read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readCharacteristicValue
         */
        readCharacteristicValue(characteristic: BLECharacteristic, callback: AsyncCallback<BLECharacteristic>): void;
        /**
         * Reads the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @returns { Promise<BLECharacteristic> } - Promise used to return the characteristic value read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readCharacteristicValue
         */
        /**
         * Reads the characteristic of a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @returns { Promise<BLECharacteristic> } - Promise used to return the characteristic value read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readCharacteristicValue
         */
        readCharacteristicValue(characteristic: BLECharacteristic): Promise<BLECharacteristic>;
        /**
         * Reads the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @param { AsyncCallback<BLEDescriptor> } callback - Callback invoked to return the descriptor read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readDescriptorValue
         */
        /**
         * Reads the descriptor of a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @param { AsyncCallback<BLEDescriptor> } callback - Callback invoked to return the descriptor read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readDescriptorValue
         */
        readDescriptorValue(descriptor: BLEDescriptor, callback: AsyncCallback<BLEDescriptor>): void;
        /**
         * Reads the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @returns { Promise<BLEDescriptor> } - Promise used to return the descriptor read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readDescriptorValue
         */
        /**
         * Reads the descriptor of a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @returns { Promise<BLEDescriptor> } - Promise used to return the descriptor read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#readDescriptorValue
         */
        readDescriptorValue(descriptor: BLEDescriptor): Promise<BLEDescriptor>;
        /**
         * Writes the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to write.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#writeCharacteristicValue
         */
        /**
         * Writes the characteristic of a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to write.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#writeCharacteristicValue
         */
        writeCharacteristicValue(characteristic: BLECharacteristic): void;
        /**
         * Writes the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to write.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#writeDescriptorValue
         */
        /**
         * Writes the descriptor of a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to write.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#writeDescriptorValue
         */
        writeDescriptorValue(descriptor: BLEDescriptor): void;
        /**
         * Get the RSSI value of this BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { AsyncCallback<number> } callback - Callback invoked to return the RSSI, in dBm.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getRssiValue
         */
        /**
         * Get the RSSI value of this BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { AsyncCallback<number> } callback - Callback invoked to return the RSSI, in dBm.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getRssiValue
         */
        getRssiValue(callback: AsyncCallback<number>): void;
        /**
         * Get the RSSI value of this BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<number> } Returns the RSSI value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getRssiValue
         */
        /**
         * Get the RSSI value of this BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @returns { Promise<number> } Returns the RSSI value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#getRssiValue
         */
        getRssiValue(): Promise<number>;
        /**
         * Set the mtu size of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { number } mtu - The maximum transmission unit.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#setBLEMtuSize
         */
        /**
         * Set the mtu size of a BLE peripheral device.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { number } mtu - The maximum transmission unit.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#setBLEMtuSize
         */
        setBLEMtuSize(mtu: number): void;
        /**
         * Enables or disables notification of a characteristic when value changed.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - BLE characteristic to listen for.
         * @param { boolean } enable - Specifies whether to enable notification of the characteristic. The value {@code true} indicates
         * that notification is enabled, and the value {@code false} indicates that notification is disabled.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#setCharacteristicChangeNotification
         */
        /**
         * Enables or disables notification of a characteristic when value changed.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { BLECharacteristic } characteristic - BLE characteristic to listen for.
         * @param { boolean } enable - Specifies whether to enable notification of the characteristic. The value {@code true} indicates
         * that notification is enabled, and the value {@code false} indicates that notification is disabled.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice#setCharacteristicChangeNotification
         */
        setNotifyCharacteristicChanged(characteristic: BLECharacteristic, enable: boolean): void;
        /**
         * Subscribe characteristic value changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.on#event:BLECharacteristicChange
         */
        /**
         * Subscribe characteristic value changed event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.on#event:BLECharacteristicChange
         */
        on(type: 'BLECharacteristicChange', callback: Callback<BLECharacteristic>): void;
        /**
         * Unsubscribe characteristic value changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.off#event:BLECharacteristicChange
         */
        /**
         * Unsubscribe characteristic value changed event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.off#event:BLECharacteristicChange
         */
        off(type: 'BLECharacteristicChange', callback?: Callback<BLECharacteristic>): void;
        /**
         * Subscribe client connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.on#event:BLEConnectionStateChange
         */
        /**
         * Subscribe client connection state changed event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.on#event:BLEConnectionStateChange
         */
        on(type: 'BLEConnectionStateChange', callback: Callback<BLEConnectChangedState>): void;
        /**
         * Unsubscribe client connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.off#event:BLEConnectionStateChange
         */
        /**
         * Unsubscribe client connection state changed event.
         * The permission required by this interface is changed from USE_BLUETOOTH to ACCESS_BLUETOOTH.
         *
         * @permission ohos.permission.ACCESS_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattClientDevice.off#event:BLEConnectionStateChange
         */
        off(type: 'BLEConnectionStateChange', callback?: Callback<BLEConnectChangedState>): void;
    }
    /**
     * Describes the Gatt service.
     *
     * @typedef GattService
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.GattService
     */
    interface GattService {
        /**
         * The UUID of a GattService instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattService#serviceUuid
         */
        serviceUuid: string;
        /**
         * Indicates whether the GattService instance is primary or secondary.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattService#isPrimary
         */
        isPrimary: boolean;
        /**
         * The {@link BLECharacteristic} list belongs to this GattService instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattService#characteristics
         */
        characteristics: Array<BLECharacteristic>;
        /**
         * The list of GATT services contained in the service
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.GattService#includeServices
         */
        includeServices?: Array<GattService>;
    }
    /**
     * Describes the Gatt characteristic.
     *
     * @typedef BLECharacteristic
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.BLECharacteristic
     */
    interface BLECharacteristic {
        /**
         * The UUID of the {@link GattService} instance to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLECharacteristic#serviceUuid
         */
        serviceUuid: string;
        /**
         * The UUID of a BLECharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLECharacteristic#characteristicUuid
         */
        characteristicUuid: string;
        /**
         * The value of a BLECharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLECharacteristic#characteristicValue
         */
        characteristicValue: ArrayBuffer;
        /**
         * The list of {@link BLEDescriptor} contained in the characteristic
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLECharacteristic#descriptors
         */
        descriptors: Array<BLEDescriptor>;
    }
    /**
     * Describes the Gatt descriptor.
     *
     * @typedef BLEDescriptor
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.BLEDescriptor
     */
    interface BLEDescriptor {
        /**
         * The UUID of the {@link GattService} instance to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLEDescriptor#serviceUuid
         */
        serviceUuid: string;
        /**
         * The UUID of the {@link BLECharacteristic} instance to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLEDescriptor#characteristicUuid
         */
        characteristicUuid: string;
        /**
         * The UUID of the BLEDescriptor instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLEDescriptor#descriptorUuid
         */
        descriptorUuid: string;
        /**
         * The value of the BLEDescriptor instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLEDescriptor#descriptorValue
         */
        descriptorValue: ArrayBuffer;
    }
    /**
     * Describes the value of the indication or notification sent by the Gatt server.
     *
     * @typedef NotifyCharacteristic
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.NotifyCharacteristic
     */
    interface NotifyCharacteristic {
        /**
         * The UUID of the {@link GattService} instance to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.NotifyCharacteristic#serviceUuid
         */
        serviceUuid: string;
        /**
         * The UUID of a NotifyCharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.NotifyCharacteristic#characteristicUuid
         */
        characteristicUuid: string;
        /**
         * The value of a NotifyCharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.NotifyCharacteristic#characteristicValue
         */
        characteristicValue: ArrayBuffer;
        /**
         * Specifies whether to request confirmation from the BLE peripheral device (indication) or
         * send a notification. Value {@code true} indicates the former and {@code false} indicates the latter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.NotifyCharacteristic#confirm
         */
        confirm: boolean;
    }
    /**
     * Describes the parameters of the Gatt client's characteristic read request.
     *
     * @typedef CharacteristicReadRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.CharacteristicReadRequest
     */
    interface CharacteristicReadRequest {
        /**
         * Indicates the address of the client that initiates the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicReadRequest#deviceId
         */
        deviceId: string;
        /**
         * The Id of the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicReadRequest#transId
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for reading characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicReadRequest#offset
         */
        offset: number;
        /**
         * The UUID of a CharacteristicReadRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicReadRequest#characteristicUuid
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicReadRequest#serviceUuid
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the of the Gatt client's characteristic write request.
     *
     * @typedef CharacteristicWriteRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest
     */
    interface CharacteristicWriteRequest {
        /**
         * Indicates the address of the client that initiates the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#deviceId
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#transId
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for writing characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#offset
         */
        offset: number;
        /**
         * Whether this request should be pending for later operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#isPrepared
         */
        isPrep: boolean;
        /**
         * Whether the remote client need a response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#needRsp
         */
        needRsp: boolean;
        /**
         * Indicates the value to be written
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#value
         */
        value: ArrayBuffer;
        /**
         * The UUID of a CharacteristicWriteRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#characteristicUuid
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.CharacteristicWriteRequest#serviceUuid
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the Gatt client's descriptor read request.
     *
     * @typedef DescriptorReadRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.DescriptorReadRequest
     */
    interface DescriptorReadRequest {
        /**
         * Indicates the address of the client that initiates the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorReadRequest#deviceId
         */
        deviceId: string;
        /**
         * The Id of the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorReadRequest#transId
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for reading characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorReadRequest#offset
         */
        offset: number;
        /**
         * The UUID of a DescriptorReadRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorReadRequest#descriptorUuid
         */
        descriptorUuid: string;
        /**
         * The UUID of the characteristic to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorReadRequest#characteristicUuid
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorReadRequest#serviceUuid
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the Gatt client's characteristic write request.
     *
     * @typedef DescriptorWriteRequest
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest
     */
    interface DescriptorWriteRequest {
        /**
         * Indicates the address of the client that initiates the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#deviceId
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#transId
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for writing characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#offset
         */
        offset: number;
        /**
         * Whether this request should be pending for later operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#isPrepared
         */
        isPrep: boolean;
        /**
         * Whether the remote client need a response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#needRsp
         */
        needRsp: boolean;
        /**
         * Indicates the value to be written
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#value
         */
        value: ArrayBuffer;
        /**
         * The UUID of a DescriptorWriteRequest instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#descriptorUuid
         */
        descriptorUuid: string;
        /**
         * The UUID of the characteristic to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#characteristicUuid
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.DescriptorWriteRequest#serviceUuid
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of a response send by the server to a specified read or write request.
     *
     * @typedef ServerResponse
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.ServerResponse
     */
    interface ServerResponse {
        /**
         * Indicates the address of the client to which to send the response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ServerResponse#deviceId
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ServerResponse#transId
         */
        transId: number;
        /**
         * Indicates the status of the read or write request, set this parameter to '0' in normal cases
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ServerResponse#status
         */
        status: number;
        /**
         * Indicates the byte offset of the start position for reading or writing operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ServerResponse#offset
         */
        offset: number;
        /**
         * Indicates the value to be sent
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ServerResponse#value
         */
        value: ArrayBuffer;
    }
    /**
     * Describes the Gatt profile connection state.
     *
     * @typedef BLEConnectChangedState
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.BLEConnectionChangeState
     */
    interface BLEConnectChangedState {
        /**
         * Indicates the peer device address
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLEConnectionChangeState#deviceId
         */
        deviceId: string;
        /**
         * Connection state of the Gatt profile
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.BLEConnectionChangeState#state
         */
        state: ProfileConnectionState;
    }
    /**
     * Describes the contents of the scan results.
     *
     * @typedef ScanResult
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.ScanResult
     */
    interface ScanResult {
        /**
         * Address of the scanned device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanResult#deviceId
         */
        deviceId: string;
        /**
         * RSSI of the remote device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanResult#rssi
         */
        rssi: number;
        /**
         * The raw data of broadcast packet
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanResult#data
         */
        data: ArrayBuffer;
    }
    /**
     * Describes the settings for BLE advertising.
     *
     * @typedef AdvertiseSetting
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.AdvertiseSetting
     */
    interface AdvertiseSetting {
        /**
         * Minimum slot value for the advertising interval, which is {@code 32} (20 ms)
         * Maximum slot value for the advertising interval, which is {@code 16777215} (10485.759375s)
         * Default slot value for the advertising interval, which is {@code 1600} (1s)
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.AdvertiseSetting#interval
         */
        interval?: number;
        /**
         * Minimum transmission power level for advertising, which is {@code -127}
         * Maximum transmission power level for advertising, which is {@code 1}
         * Default transmission power level for advertising, which is {@code -7}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.AdvertiseSetting#txPower
         */
        txPower?: number;
        /**
         * Indicates whether the BLE is connectable, default is {@code true}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.AdvertiseSetting#connectable
         */
        connectable?: boolean;
    }
    /**
     * Describes the advertising data.
     *
     * @typedef AdvertiseData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.AdvertiseData
     */
    interface AdvertiseData {
        /**
         * The specified service UUID list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.AdvertiseData#serviceUuids
         */
        serviceUuids: Array<string>;
        /**
         * The specified manufacturer data list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.AdvertiseData#manufactureData
         */
        manufactureData: Array<ManufactureData>;
        /**
         * The specified service data list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.AdvertiseData#serviceData
         */
        serviceData: Array<ServiceData>;
    }
    /**
     * Describes the manufacturer data.
     *
     * @typedef ManufactureData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.ManufactureData
     */
    interface ManufactureData {
        /**
         * Indicates the manufacturer ID assigned by Bluetooth SIG
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ManufactureData#manufactureId
         */
        manufactureId: number;
        /**
         * Indicates the manufacturer data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ManufactureData#manufactureValue
         */
        manufactureValue: ArrayBuffer;
    }
    /**
     * Describes the service data.
     *
     * @typedef ServiceData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.ServiceData
     */
    interface ServiceData {
        /**
         * Indicates the UUID of the service data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ServiceData#serviceUuid
         */
        serviceUuid: string;
        /**
         * Indicates the service data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ServiceData#serviceValue
         */
        serviceValue: ArrayBuffer;
    }
    /**
     * Describes the criteria for filtering scanning results can be set.
     *
     * @typedef ScanFilter
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.ScanFilter
     */
    interface ScanFilter {
        /**
         * The address of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#deviceId
         */
        deviceId?: string;
        /**
         * The name of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#name
         */
        name?: string;
        /**
         * The service UUID of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#serviceUuid
         */
        serviceUuid?: string;
        /**
         * Service UUID mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#serviceUuidMask
         */
        serviceUuidMask?: string;
        /**
         * Service solicitation UUID.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#serviceSolicitationUuid
         */
        serviceSolicitationUuid?: string;
        /**
         * Service solicitation UUID mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#serviceSolicitationUuidMask
         */
        serviceSolicitationUuidMask?: string;
        /**
         * Service data.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#serviceData
         */
        serviceData?: ArrayBuffer;
        /**
         * Service data mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#serviceDataMask
         */
        serviceDataMask?: ArrayBuffer;
        /**
         * Manufacture id.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#manufactureId
         */
        manufactureId?: number;
        /**
         * Manufacture data.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#manufactureData
         */
        manufactureData?: ArrayBuffer;
        /**
         * Manufacture data mask.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanFilter#manufactureDataMask
         */
        manufactureDataMask?: ArrayBuffer;
    }
    /**
     * Describes the parameters for scan.
     *
     * @typedef ScanOptions
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.ScanOptions
     */
    interface ScanOptions {
        /**
         * Time of delay for reporting the scan result
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanOptions#interval
         */
        interval?: number;
        /**
         * Bluetooth LE scan mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanOptions#dutyMode
         */
        dutyMode?: ScanDuty;
        /**
         * Match mode for Bluetooth LE scan filters hardware match
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanOptions#matchMode
         */
        matchMode?: MatchMode;
    }
    /**
     * Describes the spp parameters.
     *
     * @typedef SppOption
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket.SppOptions
     */
    interface SppOption {
        /**
         * Indicates the UUID in the SDP record.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.socket/socket.SppOptions#uuid
         */
        uuid: string;
        /**
         * Indicates secure channel or not
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.socket/socket.SppOptions#secure
         */
        secure: boolean;
        /**
         * Spp link type {@link SppType}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.socket/socket.SppOptions#type
         */
        type: SppType;
    }
    /**
     * Describes the bond key param.
     *
     * @typedef PinRequiredParam
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.PinRequiredParam
     */
    interface PinRequiredParam {
        /**
         * ID of the device to pair.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.PinRequiredParam#deviceId
         */
        deviceId: string;
        /**
         * Key for the device pairing.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.PinRequiredParam#pinCode
         */
        pinCode: string;
    }
    /**
     * Describes the class of a bluetooth device.
     *
     * @typedef DeviceClass
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.DeviceClass
     */
    interface DeviceClass {
        /**
         * Major classes of Bluetooth devices.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.DeviceClass#majorClass
         */
        majorClass: MajorClass;
        /**
         * Major and minor classes of Bluetooth devices.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.DeviceClass#majorMinorClass
         */
        majorMinorClass: MajorMinorClass;
        /**
         * Class of the device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.DeviceClass#classOfDevice
         */
        classOfDevice: number;
    }
    /**
     * Describes the class of a bluetooth device.
     *
     * @typedef BondStateParam
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.BondStateParam
     */
    interface BondStateParam {
        /**
         * Address of a Bluetooth device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.BondStateParam#deviceId
         */
        deviceId: string;
        /**
         * Profile connection state of the device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.BondStateParam#state
         */
        state: BondState;
    }
    /**
     * Profile state change parameters.
     *
     * @typedef StateChangeParam
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.baseProfile/baseProfile.StateChangeParam
     */
    interface StateChangeParam {
        /**
         * The address of device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.baseProfile/baseProfile.StateChangeParam#deviceId
         */
        deviceId: string;
        /**
         * Profile state value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.baseProfile/baseProfile.StateChangeParam#state
         */
        state: ProfileConnectionState;
    }
    /**
     * The enum of scan duty.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.ScanDuty
     */
    enum ScanDuty {
        /**
         * low power mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanDuty#SCAN_MODE_LOW_POWER
         */
        SCAN_MODE_LOW_POWER = 0,
        /**
         * balanced power mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanDuty#SCAN_MODE_BALANCED
         */
        SCAN_MODE_BALANCED = 1,
        /**
         * Scan using highest duty cycle
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.ScanDuty#SCAN_MODE_LOW_LATENCY
         */
        SCAN_MODE_LOW_LATENCY = 2
    }
    /**
     * The enum of BLE match mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.ble/ble.MatchMode
     */
    enum MatchMode {
        /**
         * aggressive mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.MatchMode#MATCH_MODE_AGGRESSIVE
         */
        MATCH_MODE_AGGRESSIVE = 1,
        /**
         * sticky mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.ble/ble.MatchMode#MATCH_MODE_STICKY
         */
        MATCH_MODE_STICKY = 2
    }
    /**
     * The enum of profile connection state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.constant/constant.ProfileConnectionState
     */
    enum ProfileConnectionState {
        /**
         * the current profile is disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileConnectionState#STATE_DISCONNECTED
         */
        STATE_DISCONNECTED = 0,
        /**
         * the current profile is being connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileConnectionState#STATE_CONNECTING
         */
        STATE_CONNECTING = 1,
        /**
         * the current profile is connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileConnectionState#STATE_CONNECTED
         */
        STATE_CONNECTED = 2,
        /**
         * the current profile is being disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileConnectionState#STATE_DISCONNECTING
         */
        STATE_DISCONNECTING = 3
    }
    /**
     * The enum of bluetooth state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.access/access.BluetoothState
     */
    enum BluetoothState {
        /**
         * Indicates the local Bluetooth is off
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.access/access.BluetoothState#STATE_OFF
         */
        STATE_OFF = 0,
        /**
         * Indicates the local Bluetooth is turning on
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.access/access.BluetoothState#STATE_TURNING_ON
         */
        STATE_TURNING_ON = 1,
        /**
         * Indicates the local Bluetooth is on, and ready for use
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.access/access.BluetoothState#STATE_ON
         */
        STATE_ON = 2,
        /**
         * Indicates the local Bluetooth is turning off
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.access/access.BluetoothState#STATE_TURNING_OFF
         */
        STATE_TURNING_OFF = 3,
        /**
         * Indicates the local Bluetooth is turning LE mode on
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.access/access.BluetoothState#STATE_BLE_TURNING_ON
         */
        STATE_BLE_TURNING_ON = 4,
        /**
         * Indicates the local Bluetooth is in LE only mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.access/access.BluetoothState#STATE_BLE_ON
         */
        STATE_BLE_ON = 5,
        /**
         * Indicates the local Bluetooth is turning off LE only mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.access/access.BluetoothState#STATE_BLE_TURNING_OFF
         */
        STATE_BLE_TURNING_OFF = 6
    }
    /**
     * The enum of SPP type.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.socket/socket.SppType
     */
    enum SppType {
        /**
         * RFCOMM
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.socket/socket.SppType#SPP_RFCOMM
         */
        SPP_RFCOMM
    }
    /**
     * The enum of BR scan mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.ScanMode
     */
    enum ScanMode {
        /**
         * Indicates the scan mode is none
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.ScanMode#SCAN_MODE_NONE
         */
        SCAN_MODE_NONE = 0,
        /**
         * Indicates the scan mode is connectable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.ScanMode#SCAN_MODE_CONNECTABLE
         */
        SCAN_MODE_CONNECTABLE = 1,
        /**
         * Indicates the scan mode is general discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.ScanMode#SCAN_MODE_GENERAL_DISCOVERABLE
         */
        SCAN_MODE_GENERAL_DISCOVERABLE = 2,
        /**
         * Indicates the scan mode is limited discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.ScanMode#SCAN_MODE_LIMITED_DISCOVERABLE
         */
        SCAN_MODE_LIMITED_DISCOVERABLE = 3,
        /**
         * Indicates the scan mode is connectable and general discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.ScanMode#SCAN_MODE_CONNECTABLE_GENERAL_DISCOVERABLE
         */
        SCAN_MODE_CONNECTABLE_GENERAL_DISCOVERABLE = 4,
        /**
         * Indicates the scan mode is connectable and limited discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.ScanMode#SCAN_MODE_CONNECTABLE_LIMITED_DISCOVERABLE
         */
        SCAN_MODE_CONNECTABLE_LIMITED_DISCOVERABLE = 5
    }
    /**
     * The enum of bond state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.connection/connection.BondState
     */
    enum BondState {
        /**
         * Indicate the bond state is invalid
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.BondState#BOND_STATE_INVALID
         */
        BOND_STATE_INVALID = 0,
        /**
         * Indicate the bond state is bonding
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.BondState#BOND_STATE_BONDING
         */
        BOND_STATE_BONDING = 1,
        /**
         * Indicate the bond state is bonded
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.connection/connection.BondState#BOND_STATE_BONDED
         */
        BOND_STATE_BONDED = 2
    }
    /**
     * The enum of major class of a bluetooth device.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.constant/constant.MajorClass
     */
    enum MajorClass {
        /**
         * Miscellaneous device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_MISC
         */
        MAJOR_MISC = 0x0000,
        /**
         * Computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_COMPUTER
         */
        MAJOR_COMPUTER = 0x0100,
        /**
         * Mobile phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_PHONE
         */
        MAJOR_PHONE = 0x0200,
        /**
         * Network device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_NETWORKING
         */
        MAJOR_NETWORKING = 0x0300,
        /**
         * Audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_AUDIO_VIDEO
         */
        MAJOR_AUDIO_VIDEO = 0x0400,
        /**
         * Peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_PERIPHERAL
         */
        MAJOR_PERIPHERAL = 0x0500,
        /**
         * Imaging device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_IMAGING
         */
        MAJOR_IMAGING = 0x0600,
        /**
         * Wearable device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_WEARABLE
         */
        MAJOR_WEARABLE = 0x0700,
        /**
         * Toy.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_TOY
         */
        MAJOR_TOY = 0x0800,
        /**
         * Health device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_HEALTH
         */
        MAJOR_HEALTH = 0x0900,
        /**
         * Unclassified device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorClass#MAJOR_UNCATEGORIZED
         */
        MAJOR_UNCATEGORIZED = 0x1F00
    }
    /**
     * The enum of major minor class of a bluetooth device.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass
     */
    enum MajorMinorClass {
        /**
         * The Minor Device Class field
         * Computer Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_UNCATEGORIZED
         */
        COMPUTER_UNCATEGORIZED = 0x0100,
        /**
         * Desktop computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_DESKTOP
         */
        COMPUTER_DESKTOP = 0x0104,
        /**
         * Server.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_SERVER
         */
        COMPUTER_SERVER = 0x0108,
        /**
         * Laptop.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_LAPTOP
         */
        COMPUTER_LAPTOP = 0x010C,
        /**
         * Hand-held computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_HANDHELD_PC_PDA
         */
        COMPUTER_HANDHELD_PC_PDA = 0x0110,
        /**
         * Palmtop computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_PALM_SIZE_PC_PDA
         */
        COMPUTER_PALM_SIZE_PC_PDA = 0x0114,
        /**
         * Wearable computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_WEARABLE
         */
        COMPUTER_WEARABLE = 0x0118,
        /**
         * Tablet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#COMPUTER_TABLET
         */
        COMPUTER_TABLET = 0x011C,
        /**
         * Phone Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PHONE_UNCATEGORIZED
         */
        PHONE_UNCATEGORIZED = 0x0200,
        /**
         * Portable phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PHONE_CELLULAR
         */
        PHONE_CELLULAR = 0x0204,
        /**
         * Cordless phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PHONE_CORDLESS
         */
        PHONE_CORDLESS = 0x0208,
        /**
         * Smartphone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PHONE_SMART
         */
        PHONE_SMART = 0x020C,
        /**
         * Modem or gateway phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PHONE_MODEM_OR_GATEWAY
         */
        PHONE_MODEM_OR_GATEWAY = 0x0210,
        /**
         * ISDN phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PHONE_ISDN
         */
        PHONE_ISDN = 0x0214,
        /**
         * LAN/Network Access Point Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_FULLY_AVAILABLE
         */
        NETWORK_FULLY_AVAILABLE = 0x0300,
        /**
         * Device used on network 1 to 17.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_1_TO_17_UTILIZED
         */
        NETWORK_1_TO_17_UTILIZED = 0x0320,
        /**
         * Device used on network 17 to 33.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_17_TO_33_UTILIZED
         */
        NETWORK_17_TO_33_UTILIZED = 0x0340,
        /**
         * Device used on network 33 to 50.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_33_TO_50_UTILIZED
         */
        NETWORK_33_TO_50_UTILIZED = 0x0360,
        /**
         * Device used on network 60 to 67.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_60_TO_67_UTILIZED
         */
        NETWORK_60_TO_67_UTILIZED = 0x0380,
        /**
         * Device used on network 67 to 83.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_67_TO_83_UTILIZED
         */
        NETWORK_67_TO_83_UTILIZED = 0x03A0,
        /**
         * Device used on network 83 to 99.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_83_TO_99_UTILIZED
         */
        NETWORK_83_TO_99_UTILIZED = 0x03C0,
        /**
         * Device without network service.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#NETWORK_NO_SERVICE
         */
        NETWORK_NO_SERVICE = 0x03E0,
        /**
         * Unclassified audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_UNCATEGORIZED
         */
        AUDIO_VIDEO_UNCATEGORIZED = 0x0400,
        /**
         * Wearable audio or video headset.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_WEARABLE_HEADSET
         */
        AUDIO_VIDEO_WEARABLE_HEADSET = 0x0404,
        /**
         * Hands-free audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_HANDSFREE
         */
        AUDIO_VIDEO_HANDSFREE = 0x0408,
        /**
         * Audio or video microphone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_MICROPHONE
         */
        AUDIO_VIDEO_MICROPHONE = 0x0410,
        /**
         * Audio or video loudspeaker.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_LOUDSPEAKER
         */
        AUDIO_VIDEO_LOUDSPEAKER = 0x0414,
        /**
         * Audio or video headphones.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_HEADPHONES
         */
        AUDIO_VIDEO_HEADPHONES = 0x0418,
        /**
         * Portable audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_PORTABLE_AUDIO
         */
        AUDIO_VIDEO_PORTABLE_AUDIO = 0x041C,
        /**
         * In-vehicle audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_CAR_AUDIO
         */
        AUDIO_VIDEO_CAR_AUDIO = 0x0420,
        /**
         * Audio or video STB device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_SET_TOP_BOX
         */
        AUDIO_VIDEO_SET_TOP_BOX = 0x0424,
        /**
         * High-fidelity speaker device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_HIFI_AUDIO
         */
        AUDIO_VIDEO_HIFI_AUDIO = 0x0428,
        /**
         * Video cassette recording (VCR) device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_VCR
         */
        AUDIO_VIDEO_VCR = 0x042C,
        /**
         * Camera.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_VIDEO_CAMERA
         */
        AUDIO_VIDEO_VIDEO_CAMERA = 0x0430,
        /**
         * Camcorder.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_CAMCORDER
         */
        AUDIO_VIDEO_CAMCORDER = 0x0434,
        /**
         * Audio or video monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_VIDEO_MONITOR
         */
        AUDIO_VIDEO_VIDEO_MONITOR = 0x0438,
        /**
         * Video display or loudspeaker.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_VIDEO_DISPLAY_AND_LOUDSPEAKER
         */
        AUDIO_VIDEO_VIDEO_DISPLAY_AND_LOUDSPEAKER = 0x043C,
        /**
         * Video conferencing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_VIDEO_CONFERENCING
         */
        AUDIO_VIDEO_VIDEO_CONFERENCING = 0x0440,
        /**
         * Audio or video gaming toy.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#AUDIO_VIDEO_VIDEO_GAMING_TOY
         */
        AUDIO_VIDEO_VIDEO_GAMING_TOY = 0x0448,
        /**
         * Peripheral Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_NON_KEYBOARD_NON_POINTING
         */
        PERIPHERAL_NON_KEYBOARD_NON_POINTING = 0x0500,
        /**
         * Keyboard device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_KEYBOARD
         */
        PERIPHERAL_KEYBOARD = 0x0540,
        /**
         * Pointing peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_POINTING_DEVICE
         */
        PERIPHERAL_POINTING_DEVICE = 0x0580,
        /**
         * Keyboard pointing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_KEYBOARD_POINTING
         */
        PERIPHERAL_KEYBOARD_POINTING = 0x05C0,
        /**
         * Unclassified peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_UNCATEGORIZED
         */
        PERIPHERAL_UNCATEGORIZED = 0x0500,
        /**
         * Peripheral joystick.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_JOYSTICK
         */
        PERIPHERAL_JOYSTICK = 0x0504,
        /**
         * Peripheral game pad.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_GAMEPAD
         */
        PERIPHERAL_GAMEPAD = 0x0508,
        /**
         * Peripheral remote control device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_REMOTE_CONTROL
         */
        PERIPHERAL_REMOTE_CONTROL = 0x05C0,
        /**
         * Peripheral sensing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_SENSING_DEVICE
         */
        PERIPHERAL_SENSING_DEVICE = 0x0510,
        /**
         * Peripheral digitizer tablet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_DIGITIZER_TABLET
         */
        PERIPHERAL_DIGITIZER_TABLET = 0x0514,
        /**
         * Peripheral card reader.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_CARD_READER
         */
        PERIPHERAL_CARD_READER = 0x0518,
        /**
         * Peripheral digital pen.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_DIGITAL_PEN
         */
        PERIPHERAL_DIGITAL_PEN = 0x051C,
        /**
         * Peripheral RFID scanner.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_SCANNER_RFID
         */
        PERIPHERAL_SCANNER_RFID = 0x0520,
        /**
         * Gesture input device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#PERIPHERAL_GESTURAL_INPUT
         */
        PERIPHERAL_GESTURAL_INPUT = 0x0522,
        /**
         * Imaging Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#IMAGING_UNCATEGORIZED
         */
        IMAGING_UNCATEGORIZED = 0x0600,
        /**
         * Imaging display device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#IMAGING_DISPLAY
         */
        IMAGING_DISPLAY = 0x0610,
        /**
         * Imaging camera device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#IMAGING_CAMERA
         */
        IMAGING_CAMERA = 0x0620,
        /**
         * Imaging scanner.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#IMAGING_SCANNER
         */
        IMAGING_SCANNER = 0x0640,
        /**
         * Imaging printer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#IMAGING_PRINTER
         */
        IMAGING_PRINTER = 0x0680,
        /**
         * Wearable Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#WEARABLE_UNCATEGORIZED
         */
        WEARABLE_UNCATEGORIZED = 0x0700,
        /**
         * Smart watch.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#WEARABLE_WRIST_WATCH
         */
        WEARABLE_WRIST_WATCH = 0x0704,
        /**
         * Wearable pager.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#WEARABLE_PAGER
         */
        WEARABLE_PAGER = 0x0708,
        /**
         * Smart jacket.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#WEARABLE_JACKET
         */
        WEARABLE_JACKET = 0x070C,
        /**
         * Wearable helmet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#WEARABLE_HELMET
         */
        WEARABLE_HELMET = 0x0710,
        /**
         * Wearable glasses.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#WEARABLE_GLASSES
         */
        WEARABLE_GLASSES = 0x0714,
        /**
         * Minor Device Class field - Toy Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#TOY_UNCATEGORIZED
         */
        TOY_UNCATEGORIZED = 0x0800,
        /**
         * Toy robot.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#TOY_ROBOT
         */
        TOY_ROBOT = 0x0804,
        /**
         * Toy vehicle.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#TOY_VEHICLE
         */
        TOY_VEHICLE = 0x0808,
        /**
         * Humanoid toy doll.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#TOY_DOLL_ACTION_FIGURE
         */
        TOY_DOLL_ACTION_FIGURE = 0x080C,
        /**
         * Toy controller.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#TOY_CONTROLLER
         */
        TOY_CONTROLLER = 0x0810,
        /**
         * Toy gaming device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#TOY_GAME
         */
        TOY_GAME = 0x0814,
        /**
         * Minor Device Class field - Health
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_UNCATEGORIZED
         */
        HEALTH_UNCATEGORIZED = 0x0900,
        /**
         * Blood pressure device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_BLOOD_PRESSURE
         */
        HEALTH_BLOOD_PRESSURE = 0x0904,
        /**
         * Thermometer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_THERMOMETER
         */
        HEALTH_THERMOMETER = 0x0908,
        /**
         * Body scale.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_WEIGHING
         */
        HEALTH_WEIGHING = 0x090C,
        /**
         * Blood glucose monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_GLUCOSE
         */
        HEALTH_GLUCOSE = 0x0910,
        /**
         * Pulse oximeter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_PULSE_OXIMETER
         */
        HEALTH_PULSE_OXIMETER = 0x0914,
        /**
         * Heart rate monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_PULSE_RATE
         */
        HEALTH_PULSE_RATE = 0x0918,
        /**
         * Health data display.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_DATA_DISPLAY
         */
        HEALTH_DATA_DISPLAY = 0x091C,
        /**
         * Step counter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_STEP_COUNTER
         */
        HEALTH_STEP_COUNTER = 0x0920,
        /**
         * Body composition analyzer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_BODY_COMPOSITION_ANALYZER
         */
        HEALTH_BODY_COMPOSITION_ANALYZER = 0x0924,
        /**
         * Hygrometer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_PEAK_FLOW_MONITOR
         */
        HEALTH_PEAK_FLOW_MONITOR = 0x0928,
        /**
         * Medication monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_MEDICATION_MONITOR
         */
        HEALTH_MEDICATION_MONITOR = 0x092C,
        /**
         * Prosthetic knee.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_KNEE_PROSTHESIS
         */
        HEALTH_KNEE_PROSTHESIS = 0x0930,
        /**
         * Prosthetic ankle.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_ANKLE_PROSTHESIS
         */
        HEALTH_ANKLE_PROSTHESIS = 0x0934,
        /**
         * Generic health management device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_GENERIC_HEALTH_MANAGER
         */
        HEALTH_GENERIC_HEALTH_MANAGER = 0x0938,
        /**
         * Personal mobility device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.MajorMinorClass#HEALTH_PERSONAL_MOBILITY_DEVICE
         */
        HEALTH_PERSONAL_MOBILITY_DEVICE = 0x093C
    }
    /**
     * The enum of a2dp playing state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.a2dp/a2dp.PlayingState
     */
    enum PlayingState {
        /**
         * Not playing.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.PlayingState#STATE_NOT_PLAYING
         */
        STATE_NOT_PLAYING,
        /**
         * Playing.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.a2dp/a2dp.PlayingState#STATE_PLAYING
         */
        STATE_PLAYING
    }
    /**
     * The enum of profile id.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.bluetooth.constant/constant.ProfileId
     */
    enum ProfileId {
        /**
         * A2DP profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileId#PROFILE_A2DP_SOURCE
         */
        PROFILE_A2DP_SOURCE = 1,
        /**
         * HFP profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileId#PROFILE_HANDSFREE_AUDIO_GATEWAY
         */
        PROFILE_HANDS_FREE_AUDIO_GATEWAY = 4,
        /**
         * Human Interface Device (HID) profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileId#PROFILE_HID_HOST
         */
        PROFILE_HID_HOST = 6,
        /**
         * PAN profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.bluetooth.constant/constant.ProfileId#PROFILE_PAN_NETWORK
         */
        PROFILE_PAN_NETWORK = 7
    }
}
export default bluetoothManager;
