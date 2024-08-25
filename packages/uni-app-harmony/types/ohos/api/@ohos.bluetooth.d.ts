/*
 * Copyright (C) 2021-2022 Huawei Device Co., Ltd.
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
 * @namespace bluetooth
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bluetoothManager
 */
declare namespace bluetooth {
    /**
     * Obtains the Bluetooth status of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { BluetoothState } Returns the Bluetooth status, which can be {@link BluetoothState#STATE_OFF},
     * {@link BluetoothState#STATE_TURNING_ON}, {@link BluetoothState#STATE_ON}, {@link BluetoothState#STATE_TURNING_OFF},
     * {@link BluetoothState#STATE_BLE_TURNING_ON}, {@link BluetoothState#STATE_BLE_ON},
     * or {@link BluetoothState#STATE_BLE_TURNING_OFF}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getState
     */
    function getState(): BluetoothState;
    /**
     * Get the local device connection state to any profile of any remote device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { ProfileConnectionState } One of {@link ProfileConnectionState#STATE_DISCONNECTED},
     * {@link ProfileConnectionState#STATE_CONNECTING}, {@link ProfileConnectionState#STATE_CONNECTED},
     * {@link ProfileConnectionState#STATE_DISCONNECTING}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getBtConnectionState
     */
    function getBtConnectionState(): ProfileConnectionState;
    /**
     * Starts pairing with a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { string } deviceId - The address of the remote device to pair.
     * @returns { boolean } Returns {@code true} if the pairing process is started; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.pairDevice
     */
    function pairDevice(deviceId: string): boolean;
    /**
     * Obtains the name of a peer Bluetooth device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } deviceId - The address of the remote device.
     * @returns { string } Returns the device name in character string format.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getRemoteDeviceName
     */
    function getRemoteDeviceName(deviceId: string): string;
    /**
     * Obtains the class of a peer Bluetooth device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } deviceId - The address of the remote device.
     * @returns { DeviceClass } The class of the remote device, {@link DeviceClass}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getRemoteDeviceClass
     */
    function getRemoteDeviceClass(deviceId: string): DeviceClass;
    /**
     * Enables Bluetooth on a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @returns { boolean } Returns {@code true} if Bluetooth is being enabled; returns {@code false} if an error occurs.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.enableBluetooth
     */
    function enableBluetooth(): boolean;
    /**
     * Disables Bluetooth on a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @returns { boolean } Returns {@code true} if Bluetooth is being disabled; returns {@code false} if an error occurs.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.disableBluetooth
     */
    function disableBluetooth(): boolean;
    /**
     * Obtains the Bluetooth local name of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { string } Returns the name the device.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getLocalName
     */
    function getLocalName(): string;
    /**
     * Obtains the list of Bluetooth devices that have been paired with the current device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { Array<string> } Returns a list of paired Bluetooth devices's address.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getPairedDevices
     */
    function getPairedDevices(): Array<string>;
    /**
     * Obtains the connection state of profile.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { ProfileId } profileId - The profile id.
     * @returns { ProfileConnectionState } Returns the connection state.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getProfileConnectionState
     */
    function getProfileConnState(profileId: ProfileId): ProfileConnectionState;
    /**
     * Sets the confirmation of pairing with a certain device.
     *
     * @permission ohos.permission.MANAGE_BLUETOOTH
     * @param { string } device - The address of the remote device.
     * @param { boolean } accept - Indicates whether to accept the pairing request, {@code true} indicates accept or {@code false} otherwise.
     * @returns { boolean } Returns {@code true} if the pairing confirmation is set; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.setDevicePairingConfirmation
     */
    function setDevicePairingConfirmation(device: string, accept: boolean): boolean;
    /**
     * Sets the Bluetooth friendly name of a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { string } name - Indicates a valid Bluetooth name.
     * @returns { boolean } Returns {@code true} if the Bluetooth name is set successfully; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.setLocalName
     */
    function setLocalName(name: string): boolean;
    /**
     * Sets the Bluetooth scan mode for a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { ScanMode } mode - Indicates the Bluetooth scan mode to set, {@link ScanMode}.
     * @param { number } duration - Indicates the duration in seconds, in which the host is discoverable.
     * @returns { boolean } Returns {@code true} if the Bluetooth scan mode is set; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.setBluetoothScanMode
     */
    function setBluetoothScanMode(mode: ScanMode, duration: number): boolean;
    /**
     * Obtains the Bluetooth scanning mode of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { ScanMode } Returns the Bluetooth scanning mode, {@link ScanMode}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getBluetoothScanMode
     */
    function getBluetoothScanMode(): ScanMode;
    /**
     * Starts scanning Bluetooth devices.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH and ohos.permission.LOCATION
     * @returns { boolean } Returns {@code true} if the scan is started successfully; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.startBluetoothDiscovery
     */
    function startBluetoothDiscovery(): boolean;
    /**
     * Stops Bluetooth device scanning.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @returns { boolean } Returns {@code true} if scanning is stopped successfully; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.stopBluetoothDiscovery
     */
    function stopBluetoothDiscovery(): boolean;
    /**
     * Subscribe the event reported when a remote Bluetooth device is discovered.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bluetoothDeviceFind' } type - Type of the discovering event to listen for.
     * @param { Callback<Array<string>> } callback - Callback used to listen for the discovering event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.on#event:bluetoothDeviceFind
     */
    function on(type: 'bluetoothDeviceFind', callback: Callback<Array<string>>): void;
    /**
     * Unsubscribe the event reported when a remote Bluetooth device is discovered.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bluetoothDeviceFind' } type - Type of the discovering event to listen for.
     * @param { Callback<Array<string>> } callback - Callback used to listen for the discovering event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.off#event:bluetoothDeviceFind
     */
    function off(type: 'bluetoothDeviceFind', callback?: Callback<Array<string>>): void;
    /**
     * Subscribe the event reported when a remote Bluetooth device is bonded.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bondStateChange' } type - Type of the bond state event to listen for.
     * @param { Callback<BondStateParam> } callback - Callback used to listen for the bond state event, {@link BondStateParam}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.on#event:bondStateChange
     */
    function on(type: 'bondStateChange', callback: Callback<BondStateParam>): void;
    /**
     * Unsubscribe the event reported when a remote Bluetooth device is bonded.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'bondStateChange' } type - Type of the bond state event to listen for.
     * @param { Callback<BondStateParam> } callback - Callback used to listen for the bond state event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.off#event:bondStateChange
     */
    function off(type: 'bondStateChange', callback?: Callback<BondStateParam>): void;
    /**
     * Subscribe the event of a pairing request from a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { 'pinRequired' } type - Type of the pairing request event to listen for.
     * @param { Callback<PinRequiredParam> } callback - Callback used to listen for the pairing request event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.on#event:pinRequired
     */
    function on(type: 'pinRequired', callback: Callback<PinRequiredParam>): void;
    /**
     * Unsubscribe the event of a pairing request from a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param { 'pinRequired' } type - Type of the pairing request event to listen for.
     * @param { Callback<PinRequiredParam> } callback - Callback used to listen for the pairing request event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.off#event:pinRequired
     */
    function off(type: 'pinRequired', callback?: Callback<PinRequiredParam>): void;
    /**
     * Subscribe the event reported when the Bluetooth state changes.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'stateChange' } type - Type of the Bluetooth state changes event to listen for.
     * @param { Callback<BluetoothState> } callback - Callback used to listen for the Bluetooth state event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.on#event:stateChange
     */
    function on(type: 'stateChange', callback: Callback<BluetoothState>): void;
    /**
     * Unsubscribe the event reported when the Bluetooth state changes.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { 'stateChange' } type - Type of the Bluetooth state changes event to listen for.
     * @param { Callback<BluetoothState> } callback - Callback used to listen for the Bluetooth state event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.off#event:stateChange
     */
    function off(type: 'stateChange', callback?: Callback<BluetoothState>): void;
    /**
     * Creates a Bluetooth server listening socket.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } name - Indicates the service name.
     * @param { SppOption } option - Indicates the listen parameters {@link SppOption}.
     * @param { AsyncCallback<number> } callback - Callback used to return a server socket ID.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.sppListen
     */
    function sppListen(name: string, option: SppOption, callback: AsyncCallback<number>): void;
    /**
     * Waits for a remote device to connect.
     *
     * @param { number } serverSocket - Indicates the server socket ID, returned by {@link sppListen}.
     * @param { AsyncCallback<number> } callback - Callback used to return a client socket ID.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.sppAccept
     */
    function sppAccept(serverSocket: number, callback: AsyncCallback<number>): void;
    /**
     * Connects to a remote device over the socket.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param { string } device - The address of the remote device to connect.
     * @param { SppOption } option - Indicates the connect parameters {@link SppOption}.
     * @param { AsyncCallback<number> } callback - Callback used to return a client socket ID.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.sppConnect
     */
    function sppConnect(device: string, option: SppOption, callback: AsyncCallback<number>): void;
    /**
     * Disables an spp server socket and releases related resources.
     *
     * @param { number } socket - Indicates the server socket ID, returned by {@link sppListen}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.sppCloseServerSocket
     */
    function sppCloseServerSocket(socket: number): void;
    /**
     * Disables an spp client socket and releases related resources.
     *
     * @param { number } socket - Indicates the client socket ID, returned by {@link sppAccept} or {@link sppConnect}.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.sppCloseClientSocket
     */
    function sppCloseClientSocket(socket: number): void;
    /**
     * Write data through the socket.
     *
     * @param { number } clientSocket - Indicates the client socket ID, returned by {@link sppAccept} or {@link sppConnect}.
     * @param { ArrayBuffer } data - Indicates the data to write.
     * @returns { boolean } Returns {@code true} if the data is write successfully; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.sppWrite
     */
    function sppWrite(clientSocket: number, data: ArrayBuffer): boolean;
    /**
     * Subscribe the event reported when data is read from the socket.
     *
     * @param { 'sppRead' } type - Type of the spp read event to listen for.
     * @param { number } clientSocket - Client socket ID, which is obtained by sppAccept or sppConnect.
     * @param { Callback<ArrayBuffer> } callback - Callback used to listen for the spp read event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.on#event:sppRead
     */
    function on(type: 'sppRead', clientSocket: number, callback: Callback<ArrayBuffer>): void;
    /**
     * Unsubscribe the event reported when data is read from the socket.
     *
     * @param { 'sppRead' } type - Type of the spp read event to listen for.
     * @param { number } clientSocket - Client socket ID, which is obtained by sppAccept or sppConnect.
     * @param { Callback<ArrayBuffer> } callback - Callback used to listen for the spp read event.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.off#event:sppRead
     */
    function off(type: 'sppRead', clientSocket: number, callback?: Callback<ArrayBuffer>): void;
    /**
     * Obtains the instance of profile.
     *
     * @param { ProfileId } profileId - The profile id..
     * @returns { A2dpSourceProfile | HandsFreeAudioGatewayProfile } Returns instance of profile.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.getProfileInstance
     */
    function getProfile(profileId: ProfileId): A2dpSourceProfile | HandsFreeAudioGatewayProfile;
    /**
     * Base interface of profile.
     *
     * @typedef BaseProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BaseProfile
     */
    interface BaseProfile {
        /**
         * Obtains the connected devices list of profile.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Array<string> } Returns the address of connected devices list.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BaseProfile#getConnectionDevices
         */
        getConnectionDevices(): Array<string>;
        /**
         * Obtains the profile state of device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { string } device - The address of bluetooth device.
         * @returns { ProfileConnectionState } Returns {@link ProfileConnectionState} of device.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BaseProfile#getDeviceState
         */
        getDeviceState(device: string): ProfileConnectionState;
    }
    /**
     * Manager a2dp source profile.
     *
     * @typedef A2dpSourceProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.A2dpSourceProfile
     */
    interface A2dpSourceProfile extends BaseProfile {
        /**
         * Connect to device with a2dp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to connect.
         * @returns { boolean } Returns {@code true} if the connect is in process; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.A2dpSourceProfile#connect
         */
        connect(device: string): boolean;
        /**
         * Disconnect to device with a2dp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to disconnect.
         * @returns { boolean } Returns {@code true} if the disconnect is in process; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.A2dpSourceProfile#disconnect
         */
        disconnect(device: string): boolean;
        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.A2dpSourceProfile.on#event:connectionStateChange
         */
        on(type: 'connectionStateChange', callback: Callback<StateChangeParam>): void;
        /**
         * Unsubscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.A2dpSourceProfile.off#event:connectionStateChange
         */
        off(type: 'connectionStateChange', callback?: Callback<StateChangeParam>): void;
        /**
         * Obtains the playing state of device.
         *
         * @param { string } device - The address of the remote device.
         * @returns { PlayingState } Returns {@link PlayingState} of the remote device.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.A2dpSourceProfile#getPlayingState
         */
        getPlayingState(device: string): PlayingState;
    }
    /**
     * Manager handsfree AG profile.
     *
     * @typedef HandsFreeAudioGatewayProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.HandsFreeAudioGatewayProfile
     */
    interface HandsFreeAudioGatewayProfile extends BaseProfile {
        /**
         * Connect to device with hfp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to connect.
         * @returns { boolean } Returns {@code true} if the connect is in process; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.HandsFreeAudioGatewayProfile#connect
         */
        connect(device: string): boolean;
        /**
         * Disconnect to device with hfp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param { string } device - The address of the remote device to disconnect.
         * @returns { boolean } Returns {@code true} if the disconnect is in process; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.HandsFreeAudioGatewayProfile#disconnect
         */
        disconnect(device: string): boolean;
        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.HandsFreeAudioGatewayProfile.on#event:connectionStateChange
         */
        on(type: 'connectionStateChange', callback: Callback<StateChangeParam>): void;
        /**
         * Unsubscribe the event reported when the profile connection state changes .
         *
         * @param { 'connectionStateChange' } type - Type of the profile connection state changes event to listen for .
         * @param { Callback<StateChangeParam> } callback - Callback used to listen for event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.HandsFreeAudioGatewayProfile.off#event:connectionStateChange
         */
        off(type: 'connectionStateChange', callback?: Callback<StateChangeParam>): void;
    }
    /**
     * Provides methods to operate or manage Bluetooth.
     *
     * @namespace BLE
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BLE
     */
    namespace BLE {
        /**
         * create a JavaScript Gatt server instance.
         *
         * @returns { GattServer } Returns a JavaScript Gatt server instance {@code GattServer}.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BLE.createGattServer
         */
        function createGattServer(): GattServer;
        /**
         * create a JavaScript Gatt client device instance.
         *
         * @param { string } deviceId - The address of the remote device.
         * @returns { GattClientDevice } Returns a JavaScript Gatt client device instance {@code GattClientDevice}.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BLE.createGattClientDevice
         */
        function createGattClientDevice(deviceId: string): GattClientDevice;
        /**
         * Obtains the list of devices in the connected status.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Array<string> } Returns the list of device address.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BLE.getConnectedBLEDevices
         */
        function getConnectedBLEDevices(): Array<string>;
        /**
         * Starts scanning for specified BLE devices with filters.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH and ohos.permission.MANAGE_BLUETOOTH and ohos.permission.LOCATION
         * @param { Array<ScanFilter> } filters - Indicates the list of filters used to filter out specified devices.
         * If you do not want to use filter, set this parameter to {@code null}.
         * @param { ScanOptions } options - Indicates the parameters for scanning and if the user does not assign a value, the default value will be used.
         * {@link ScanOptions#interval} set to 0, {@link ScanOptions#dutyMode} set to {@link SCAN_MODE_LOW_POWER}
         * and {@link ScanOptions#matchMode} set to {@link MATCH_MODE_AGGRESSIVE}.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BLE.startBLEScan
         */
        function startBLEScan(filters: Array<ScanFilter>, options?: ScanOptions): void;
        /**
         * Stops BLE scanning.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BLE.stopBLEScan
         */
        function stopBLEScan(): void;
        /**
         * Subscribe BLE scan result.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
         * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BLE.on#event:BLEDeviceFind
         */
        function on(type: 'BLEDeviceFind', callback: Callback<Array<ScanResult>>): void;
        /**
         * Unsubscribe BLE scan result.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEDeviceFind' } type - Type of the scan result event to listen for.
         * @param { Callback<Array<ScanResult>> } callback - Callback used to listen for the scan result event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.BLE.off#event:BLEDeviceFind
         */
        function off(type: 'BLEDeviceFind', callback?: Callback<Array<ScanResult>>): void;
    }
    /**
     * Manages GATT server. Before calling an Gatt server method, you must use {@link createGattServer} to create an GattServer instance.
     *
     * @typedef GattServer
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer
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
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer#startAdvertising
         */
        startAdvertising(setting: AdvertiseSetting, advData: AdvertiseData, advResponse?: AdvertiseData): void;
        /**
         * Stops BLE advertising.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer#stopAdvertising
         */
        stopAdvertising(): void;
        /**
         * Adds a specified service to be hosted.
         * <p>The added service and its characteristics are provided by the local device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { GattService } service - Indicates the service to add.
         * @returns { boolean } Returns {@code true} if the service is added; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer#addService
         */
        addService(service: GattService): boolean;
        /**
         * Removes a specified service from the list of GATT services provided by this device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { string } serviceUuid - Indicates the UUID of the service to remove.
         * @returns { boolean } Returns {@code true} if the service is removed; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer#removeService
         */
        removeService(serviceUuid: string): boolean;
        /**
         * Closes this {@code GattServer} object and unregisters its callbacks.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer#close
         */
        close(): void;
        /**
         * Sends a notification of a change in a specified local characteristic.
         * <p>This method should be called for every BLE peripheral device that has requested notifications.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { string } deviceId - Indicates the address of the BLE peripheral device to receive the notification.
         * @param { NotifyCharacteristic } notifyCharacteristic - Indicates the local characteristic that has changed.
         * @returns { boolean } Returns {@code true} if the notification is sent successfully; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer#notifyCharacteristicChanged
         */
        notifyCharacteristicChanged(deviceId: string, notifyCharacteristic: NotifyCharacteristic): boolean;
        /**
         * Sends a response to a specified read or write request to a given BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { ServerResponse } serverResponse - Indicates the response parameters {@link ServerResponse}.
         * @returns { boolean } Returns {@code true} if the response is sent successfully; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer#sendResponse
         */
        sendResponse(serverResponse: ServerResponse): boolean;
        /**
         * Subscribe characteristic read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadReq> } callback - Callback used to listen for the characteristic read event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.on#event:characteristicRead
         */
        on(type: 'characteristicRead', callback: Callback<CharacteristicReadReq>): void;
        /**
         * Unsubscribe characteristic read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicRead' } type - Type of the characteristic read event to listen for.
         * @param { Callback<CharacteristicReadReq> } callback - Callback used to listen for the characteristic read event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.off#event:characteristicRead
         */
        off(type: 'characteristicRead', callback?: Callback<CharacteristicReadReq>): void;
        /**
         * Subscribe characteristic write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteReq> } callback - Callback used to listen for the characteristic write event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.on#event:characteristicWrite
         */
        on(type: 'characteristicWrite', callback: Callback<CharacteristicWriteReq>): void;
        /**
         * Unsubscribe characteristic write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'characteristicWrite' } type - Type of the characteristic write event to listen for.
         * @param { Callback<CharacteristicWriteReq> } callback - Callback used to listen for the characteristic write event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.off#event:characteristicWrite
         */
        off(type: 'characteristicWrite', callback?: Callback<CharacteristicWriteReq>): void;
        /**
         * Subscribe descriptor read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadReq> } callback - Callback used to listen for the descriptor read event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.on#event:descriptorRead
         */
        on(type: 'descriptorRead', callback: Callback<DescriptorReadReq>): void;
        /**
         * Unsubscribe descriptor read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorRead' } type - Type of the descriptor read event to listen for.
         * @param { Callback<DescriptorReadReq> } callback - Callback used to listen for the descriptor read event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.off#event:descriptorRead
         */
        off(type: 'descriptorRead', callback?: Callback<DescriptorReadReq>): void;
        /**
         * Subscribe descriptor write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteReq> } callback - Callback used to listen for the descriptor write event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.on#event:descriptorWrite
         */
        on(type: 'descriptorWrite', callback: Callback<DescriptorWriteReq>): void;
        /**
         * Unsubscribe descriptor write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'descriptorWrite' } type - Type of the descriptor write event to listen for.
         * @param { Callback<DescriptorWriteReq> } callback - Callback used to listen for the descriptor write event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.off#event:descriptorWrite
         */
        off(type: 'descriptorWrite', callback?: Callback<DescriptorWriteReq>): void;
        /**
         * Subscribe server connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'connectStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.on#event:connectStateChange
         */
        on(type: 'connectStateChange', callback: Callback<BLEConnectChangedState>): void;
        /**
         * Unsubscribe server connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'connectStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattServer.off#event:connectStateChange
         */
        off(type: 'connectStateChange', callback?: Callback<BLEConnectChangedState>): void;
    }
    /**
     * Manages GATT client. Before calling an Gatt client method, you must use {@link createGattClientDevice} to create an GattClientDevice instance.
     *
     * @typedef GattClientDevice
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice
     */
    interface GattClientDevice {
        /**
         * Connects to a BLE peripheral device.
         * <p>The 'BLEConnectionStateChange' event is subscribed to return the connection state.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { boolean } Returns {@code true} if the connection process starts; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#connect
         */
        connect(): boolean;
        /**
         * Disconnects from or stops an ongoing connection to a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { boolean } Returns {@code true} if the disconnection process starts; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#disconnect
         */
        disconnect(): boolean;
        /**
         * Disables a BLE peripheral device.
         * <p> This method unregisters the device and clears the registered callbacks and handles.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { boolean } Returns {@code true} if the the device is disabled; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#close
         */
        close(): boolean;
        /**
         * Obtains the name of BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { AsyncCallback<string> } callback - Callback used to obtain the device name.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#getDeviceName
         */
        getDeviceName(callback: AsyncCallback<string>): void;
        /**
         * Obtains the name of BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<string> } Returns a string representation of the name if obtained;
         * returns {@code null} if the name fails to be obtained or the name does not exist.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#getDeviceName
         */
        getDeviceName(): Promise<string>;
        /**
         * Starts discovering services.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { AsyncCallback<Array<GattService>> } callback - Callback used to catch the services.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#getServices
         */
        getServices(callback: AsyncCallback<Array<GattService>>): void;
        /**
         * Starts discovering services.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<Array<GattService>> } Returns the list of services {@link GattService} of the BLE peripheral device.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#getServices
         */
        getServices(): Promise<Array<GattService>>;
        /**
         * Reads the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @param { AsyncCallback<BLECharacteristic> } callback - Callback invoked to return the characteristic value read.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#readCharacteristicValue
         */
        readCharacteristicValue(characteristic: BLECharacteristic, callback: AsyncCallback<BLECharacteristic>): void;
        /**
         * Reads the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to read.
         * @returns { Promise<BLECharacteristic> } - Promise used to return the characteristic value read.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#readCharacteristicValue
         */
        readCharacteristicValue(characteristic: BLECharacteristic): Promise<BLECharacteristic>;
        /**
         * Reads the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @param { AsyncCallback<BLEDescriptor> } callback - Callback invoked to return the descriptor read.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#readDescriptorValue
         */
        readDescriptorValue(descriptor: BLEDescriptor, callback: AsyncCallback<BLEDescriptor>): void;
        /**
         * Reads the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to read.
         * @returns { Promise<BLEDescriptor> } - Promise used to return the descriptor read.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#readDescriptorValue
         */
        readDescriptorValue(descriptor: BLEDescriptor): Promise<BLEDescriptor>;
        /**
         * Writes the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - Indicates the characteristic to write.
         * @returns { boolean } Returns {@code true} if the characteristic is written successfully; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#writeCharacteristicValue
         */
        writeCharacteristicValue(characteristic: BLECharacteristic): boolean;
        /**
         * Writes the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLEDescriptor } descriptor - Indicates the descriptor to write.
         * @returns { boolean } Returns {@code true} if the descriptor is written successfully; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#writeDescriptorValue
         */
        writeDescriptorValue(descriptor: BLEDescriptor): boolean;
        /**
         * Get the RSSI value of this BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { AsyncCallback<number> } callback - Callback invoked to return the RSSI, in dBm.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#getRssiValue
         */
        getRssiValue(callback: AsyncCallback<number>): void;
        /**
         * Get the RSSI value of this BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<number> } Returns the RSSI value.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#getRssiValue
         */
        getRssiValue(): Promise<number>;
        /**
         * Set the mtu size of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { number } mtu - The maximum transmission unit.
         * @returns { boolean } Returns {@code true} if the set mtu is successfully; returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#setBLEMtuSize
         */
        setBLEMtuSize(mtu: number): boolean;
        /**
         * Enables or disables notification of a characteristic when value changed.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { BLECharacteristic } characteristic - BLE characteristic to listen for.
         * @param { boolean } enable - Specifies whether to enable notification of the characteristic. The value {@code true} indicates
         * that notification is enabled, and the value {@code false} indicates that notification is disabled.
         * @returns { boolean } Returns {@code true} if notification of the characteristic is enabled or disabled;
         * returns {@code false} otherwise.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice#setNotifyCharacteristicChanged
         */
        setNotifyCharacteristicChanged(characteristic: BLECharacteristic, enable: boolean): boolean;
        /**
         * Subscribe characteristic value changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice.on#event:BLECharacteristicChange
         */
        on(type: 'BLECharacteristicChange', callback: Callback<BLECharacteristic>): void;
        /**
         * Unsubscribe characteristic value changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLECharacteristicChange' } type - Type of the characteristic value changed event to listen for.
         * @param { Callback<BLECharacteristic> } callback - Callback used to listen for the characteristic value changed event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice.off#event:BLECharacteristicChange
         */
        off(type: 'BLECharacteristicChange', callback?: Callback<BLECharacteristic>): void;
        /**
         * Subscribe client connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice.on#event:BLEConnectionStateChange
         */
        on(type: 'BLEConnectionStateChange', callback: Callback<BLEConnectChangedState>): void;
        /**
         * Unsubscribe client connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param { 'BLEConnectionStateChange' } type - Type of the connection state changed event to listen for.
         * @param { Callback<BLEConnectChangedState> } callback - Callback used to listen for the connection state changed event.
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.bluetoothManager/bluetoothManager.GattClientDevice.off#event:BLEConnectionStateChange
         */
        off(type: 'BLEConnectionStateChange', callback?: Callback<BLEConnectChangedState>): void;
    }
    /**
     * Describes the Gatt service.
     *
     * @typedef GattService
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.GattService
     */
    interface GattService {
        /**
         * The UUID of a GattService instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
        /**
         * Indicates whether the GattService instance is primary or secondary.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        isPrimary: boolean;
        /**
         * The {@link BLECharacteristic} list belongs to this GattService instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristics: Array<BLECharacteristic>;
        /**
         * The list of GATT services contained in the service
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        includeServices?: Array<GattService>;
    }
    /**
     * Describes the Gatt characteristic.
     *
     * @typedef BLECharacteristic
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BLECharacteristic
     */
    interface BLECharacteristic {
        /**
         * The UUID of the {@link GattService} instance to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
        /**
         * The UUID of a BLECharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicUuid: string;
        /**
         * The value of a BLECharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicValue: ArrayBuffer;
        /**
         * The list of {@link BLEDescriptor} contained in the characteristic
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        descriptors: Array<BLEDescriptor>;
    }
    /**
     * Describes the Gatt descriptor.
     *
     * @typedef BLEDescriptor
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BLEDescriptor
     */
    interface BLEDescriptor {
        /**
         * The UUID of the {@link GattService} instance to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
        /**
         * The UUID of the {@link BLECharacteristic} instance to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicUuid: string;
        /**
         * The UUID of the BLEDescriptor instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        descriptorUuid: string;
        /**
         * The value of the BLEDescriptor instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        descriptorValue: ArrayBuffer;
    }
    /**
     * Describes the value of the indication or notification sent by the Gatt server.
     *
     * @typedef NotifyCharacteristic
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.NotifyCharacteristic
     */
    interface NotifyCharacteristic {
        /**
         * The UUID of the {@link GattService} instance to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
        /**
         * The UUID of a NotifyCharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicUuid: string;
        /**
         * The value of a NotifyCharacteristic instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicValue: ArrayBuffer;
        /**
         * Specifies whether to request confirmation from the BLE peripheral device (indication) or
         * send a notification. Value {@code true} indicates the former and {@code false} indicates the latter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        confirm: boolean;
    }
    /**
     * Describes the parameters of the Gatt client's characteristic read request.
     *
     * @typedef CharacteristicReadReq
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.CharacteristicReadRequest
     */
    interface CharacteristicReadReq {
        /**
         * Indicates the address of the client that initiates the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * The Id of the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for reading characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        offset: number;
        /**
         * The UUID of a CharacteristicReadReq instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the of the Gatt client's characteristic write request.
     *
     * @typedef CharacteristicWriteReq
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.CharacteristicWriteRequest
     */
    interface CharacteristicWriteReq {
        /**
         * Indicates the address of the client that initiates the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for writing characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        offset: number;
        /**
         * Whether this request should be pending for later operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        isPrep: boolean;
        /**
         * Whether the remote client need a response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        needRsp: boolean;
        /**
         * Indicates the value to be written
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        value: ArrayBuffer;
        /**
         * The UUID of a CharacteristicWriteReq instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the characteristic belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the Gatt client's descriptor read request.
     *
     * @typedef DescriptorReadReq
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.DescriptorReadRequest
     */
    interface DescriptorReadReq {
        /**
         * Indicates the address of the client that initiates the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * The Id of the read request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for reading characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        offset: number;
        /**
         * The UUID of a DescriptorReadReq instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        descriptorUuid: string;
        /**
         * The UUID of the characteristic to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of the Gatt client's characteristic write request.
     *
     * @typedef DescriptorWriteReq
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.DescriptorWriteRequest
     */
    interface DescriptorWriteReq {
        /**
         * Indicates the address of the client that initiates the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        transId: number;
        /**
         * Indicates the byte offset of the start position for writing characteristic value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        offset: number;
        /**
         * Whether this request should be pending for later operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        isPrep: boolean;
        /**
         * Whether the remote client need a response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        needRsp: boolean;
        /**
         * Indicates the value to be written
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        value: ArrayBuffer;
        /**
         * The UUID of a DescriptorWriteReq instance
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        descriptorUuid: string;
        /**
         * The UUID of the characteristic to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        characteristicUuid: string;
        /**
         * The UUID of the service to which the descriptor belongs
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
    }
    /**
     * Describes the parameters of a response send by the server to a specified read or write request.
     *
     * @typedef ServerResponse
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ServerResponse
     */
    interface ServerResponse {
        /**
         * Indicates the address of the client to which to send the response
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * The Id of the write request
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        transId: number;
        /**
         * Indicates the status of the read or write request, set this parameter to '0' in normal cases
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        status: number;
        /**
         * Indicates the byte offset of the start position for reading or writing operation
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        offset: number;
        /**
         * Indicates the value to be sent
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        value: ArrayBuffer;
    }
    /**
     * Describes the Gatt profile connection state.
     *
     * @typedef BLEConnectChangedState
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BLEConnectChangedState
     */
    interface BLEConnectChangedState {
        /**
         * Indicates the peer device address
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * Connection state of the Gatt profile
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        state: ProfileConnectionState;
    }
    /**
     * Describes the contents of the scan results.
     *
     * @typedef ScanResult
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ScanResult
     */
    interface ScanResult {
        /**
         * Address of the scanned device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * RSSI of the remote device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        rssi: number;
        /**
         * The raw data of broadcast packet
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        data: ArrayBuffer;
    }
    /**
     * Describes the settings for BLE advertising.
     *
     * @typedef AdvertiseSetting
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.AdvertiseSetting
     */
    interface AdvertiseSetting {
        /**
         * Minimum slot value for the advertising interval, which is {@code 32} (20 ms)
         * Maximum slot value for the advertising interval, which is {@code 16777215} (10485.759375s)
         * Default slot value for the advertising interval, which is {@code 1600} (1s)
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        interval?: number;
        /**
         * Minimum transmission power level for advertising, which is {@code -127}
         * Maximum transmission power level for advertising, which is {@code 1}
         * Default transmission power level for advertising, which is {@code -7}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        txPower?: number;
        /**
         * Indicates whether the BLE is connectable, default is {@code true}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        connectable?: boolean;
    }
    /**
     * Describes the advertising data.
     *
     * @typedef AdvertiseData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.AdvertiseData
     */
    interface AdvertiseData {
        /**
         * The specified service UUID list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuids: Array<string>;
        /**
         * The specified manufacturer data list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        manufactureData: Array<ManufactureData>;
        /**
         * The specified service data list to this advertisement
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceData: Array<ServiceData>;
    }
    /**
     * Describes the manufacturer data.
     *
     * @typedef ManufactureData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ManufactureData
     */
    interface ManufactureData {
        /**
         * Indicates the manufacturer ID assigned by Bluetooth SIG
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        manufactureId: number;
        /**
         * Indicates the manufacturer data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        manufactureValue: ArrayBuffer;
    }
    /**
     * Describes the service data.
     *
     * @typedef ServiceData
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ServiceData
     */
    interface ServiceData {
        /**
         * Indicates the UUID of the service data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid: string;
        /**
         * Indicates the service data to add
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceValue: ArrayBuffer;
    }
    /**
     * Describes the criteria for filtering scanning results can be set.
     *
     * @typedef ScanFilter
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ScanFilter
     */
    interface ScanFilter {
        /**
         * The address of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        deviceId?: string;
        /**
         * The name of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        name?: string;
        /**
         * The service UUID of a BLE peripheral device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        serviceUuid?: string;
    }
    /**
     * Describes the parameters for scan.
     *
     * @typedef ScanOptions
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ScanOptions
     */
    interface ScanOptions {
        /**
         * Time of delay for reporting the scan result
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        interval?: number;
        /**
         * Bluetooth LE scan mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        dutyMode?: ScanDuty;
        /**
         * Match mode for Bluetooth LE scan filters hardware match
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        matchMode?: MatchMode;
    }
    /**
     * Describes the spp parameters.
     *
     * @typedef SppOption
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.SppOption
     */
    interface SppOption {
        /**
         * Indicates the UUID in the SDP record.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        uuid: string;
        /**
         * Indicates secure channel or not
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        secure: boolean;
        /**
         * Spp link type {@link SppType}
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        type: SppType;
    }
    /**
     * Describes the bond key param.
     *
     * @typedef PinRequiredParam
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.PinRequiredParam
     */
    interface PinRequiredParam {
        /**
         * ID of the device to pair.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * Key for the device pairing.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        pinCode: string;
    }
    /**
     * Describes the class of a bluetooth device.
     *
     * @typedef DeviceClass
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.DeviceClass
     */
    interface DeviceClass {
        /**
         * Major classes of Bluetooth devices.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        majorClass: MajorClass;
        /**
         * Major and minor classes of Bluetooth devices.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        majorMinorClass: MajorMinorClass;
        /**
         * Class of the device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        classOfDevice: number;
    }
    /**
     * Describes the class of a bluetooth device.
     *
     * @typedef BondStateParam
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BondStateParam
     */
    interface BondStateParam {
        /**
         * Address of a Bluetooth device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * Profile connection state of the device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        state: BondState;
    }
    /**
     * The enum of scan duty.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ScanDuty
     */
    enum ScanDuty {
        /**
         * low power mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        SCAN_MODE_LOW_POWER = 0,
        /**
         * balanced power mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        SCAN_MODE_BALANCED = 1,
        /**
         * Scan using highest duty cycle
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        SCAN_MODE_LOW_LATENCY = 2
    }
    /**
     * The enum of BLE match mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.MatchMode
     */
    enum MatchMode {
        /**
         * aggressive mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        MATCH_MODE_AGGRESSIVE = 1,
        /**
         * sticky mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        MATCH_MODE_STICKY = 2
    }
    /**
     * The enum of profile connection state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ProfileConnectionState
     */
    enum ProfileConnectionState {
        /**
         * the current profile is disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_DISCONNECTED = 0,
        /**
         * the current profile is being connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_CONNECTING = 1,
        /**
         * the current profile is connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_CONNECTED = 2,
        /**
         * the current profile is being disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_DISCONNECTING = 3
    }
    /**
     * The enum of bluetooth state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BluetoothState
     */
    enum BluetoothState {
        /**
         * Indicates the local Bluetooth is off
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_OFF = 0,
        /**
         * Indicates the local Bluetooth is turning on
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_TURNING_ON = 1,
        /**
         * Indicates the local Bluetooth is on, and ready for use
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_ON = 2,
        /**
         * Indicates the local Bluetooth is turning off
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_TURNING_OFF = 3,
        /**
         * Indicates the local Bluetooth is turning LE mode on
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_BLE_TURNING_ON = 4,
        /**
         * Indicates the local Bluetooth is in LE only mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_BLE_ON = 5,
        /**
         * Indicates the local Bluetooth is turning off LE only mode
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 7
         * @deprecated since 9
         */
        STATE_BLE_TURNING_OFF = 6
    }
    /**
     * The enum of SPP type.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.SppType
     */
    enum SppType {
        /**
         * RFCOMM
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        SPP_RFCOMM
    }
    /**
     * The enum of BR scan mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ScanMode
     */
    enum ScanMode {
        /**
         * Indicates the scan mode is none
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        SCAN_MODE_NONE = 0,
        /**
         * Indicates the scan mode is connectable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        SCAN_MODE_CONNECTABLE = 1,
        /**
         * Indicates the scan mode is general discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        SCAN_MODE_GENERAL_DISCOVERABLE = 2,
        /**
         * Indicates the scan mode is limited discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        SCAN_MODE_LIMITED_DISCOVERABLE = 3,
        /**
         * Indicates the scan mode is connectable and general discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        SCAN_MODE_CONNECTABLE_GENERAL_DISCOVERABLE = 4,
        /**
         * Indicates the scan mode is connectable and limited discoverable
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        SCAN_MODE_CONNECTABLE_LIMITED_DISCOVERABLE = 5
    }
    /**
     * The enum of bond state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.BondState
     */
    enum BondState {
        /**
         * Indicate the bond state is invalid
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        BOND_STATE_INVALID = 0,
        /**
         * Indicate the bond state is bonding
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        BOND_STATE_BONDING = 1,
        /**
         * Indicate the bond state is bonded
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        BOND_STATE_BONDED = 2
    }
    /**
     * The enum of major class of a bluetooth device.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.MajorClass
     */
    enum MajorClass {
        /**
         * Miscellaneous device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_MISC = 0x0000,
        /**
         * Computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_COMPUTER = 0x0100,
        /**
         * Mobile phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_PHONE = 0x0200,
        /**
         * Network device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_NETWORKING = 0x0300,
        /**
         * Audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_AUDIO_VIDEO = 0x0400,
        /**
         * Peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_PERIPHERAL = 0x0500,
        /**
         * Imaging device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_IMAGING = 0x0600,
        /**
         * Wearable device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_WEARABLE = 0x0700,
        /**
         * Toy.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_TOY = 0x0800,
        /**
         * Health device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_HEALTH = 0x0900,
        /**
         * Unclassified device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        MAJOR_UNCATEGORIZED = 0x1F00
    }
    /**
     * The enum of major minor class of a bluetooth device.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.MajorMinorClass
     */
    enum MajorMinorClass {
        /**
         * The Minor Device Class field
         * Computer Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_UNCATEGORIZED = 0x0100,
        /**
         * Desktop computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_DESKTOP = 0x0104,
        /**
         * Server.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_SERVER = 0x0108,
        /**
         * Laptop.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_LAPTOP = 0x010C,
        /**
         * Hand-held computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_HANDHELD_PC_PDA = 0x0110,
        /**
         * Palmtop computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_PALM_SIZE_PC_PDA = 0x0114,
        /**
         * Wearable computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_WEARABLE = 0x0118,
        /**
         * Tablet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        COMPUTER_TABLET = 0x011C,
        /**
         * Phone Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PHONE_UNCATEGORIZED = 0x0200,
        /**
         * Portable phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PHONE_CELLULAR = 0x0204,
        /**
         * Cordless phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PHONE_CORDLESS = 0x0208,
        /**
         * Smartphone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PHONE_SMART = 0x020C,
        /**
         * Modem or gateway phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PHONE_MODEM_OR_GATEWAY = 0x0210,
        /**
         * ISDN phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PHONE_ISDN = 0x0214,
        /**
         * LAN/Network Access Point Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_FULLY_AVAILABLE = 0x0300,
        /**
         * Device used on network 1 to 17.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_1_TO_17_UTILIZED = 0x0320,
        /**
         * Device used on network 17 to 33.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_17_TO_33_UTILIZED = 0x0340,
        /**
         * Device used on network 33 to 50.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_33_TO_50_UTILIZED = 0x0360,
        /**
         * Device used on network 60 to 67.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_60_TO_67_UTILIZED = 0x0380,
        /**
         * Device used on network 67 to 83.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_67_TO_83_UTILIZED = 0x03A0,
        /**
         * Device used on network 83 to 99.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_83_TO_99_UTILIZED = 0x03C0,
        /**
         * Device without network service.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        NETWORK_NO_SERVICE = 0x03E0,
        /**
         * Unclassified audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_UNCATEGORIZED = 0x0400,
        /**
         * Wearable audio or video headset.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_WEARABLE_HEADSET = 0x0404,
        /**
         * Hands-free audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_HANDSFREE = 0x0408,
        /**
         * Audio or video microphone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_MICROPHONE = 0x0410,
        /**
         * Audio or video loudspeaker.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_LOUDSPEAKER = 0x0414,
        /**
         * Audio or video headphones.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_HEADPHONES = 0x0418,
        /**
         * Portable audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_PORTABLE_AUDIO = 0x041C,
        /**
         * In-vehicle audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_CAR_AUDIO = 0x0420,
        /**
         * Audio or video STB device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_SET_TOP_BOX = 0x0424,
        /**
         * High-fidelity speaker device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_HIFI_AUDIO = 0x0428,
        /**
         * Video cassette recording (VCR) device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_VCR = 0x042C,
        /**
         * Camera.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_VIDEO_CAMERA = 0x0430,
        /**
         * Camcorder.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_CAMCORDER = 0x0434,
        /**
         * Audio or video monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_VIDEO_MONITOR = 0x0438,
        /**
         * Video display or loudspeaker.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_VIDEO_DISPLAY_AND_LOUDSPEAKER = 0x043C,
        /**
         * Video conferencing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_VIDEO_CONFERENCING = 0x0440,
        /**
         * Audio or video gaming toy.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        AUDIO_VIDEO_VIDEO_GAMING_TOY = 0x0448,
        /**
         * Peripheral Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_NON_KEYBOARD_NON_POINTING = 0x0500,
        /**
         * Keyboard device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_KEYBOARD = 0x0540,
        /**
         * Pointing peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_POINTING_DEVICE = 0x0580,
        /**
         * Keyboard pointing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_KEYBOARD_POINTING = 0x05C0,
        /**
         * Unclassified peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_UNCATEGORIZED = 0x0500,
        /**
         * Peripheral joystick.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_JOYSTICK = 0x0504,
        /**
         * Peripheral game pad.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_GAMEPAD = 0x0508,
        /**
         * Peripheral remote control device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_REMOTE_CONTROL = 0x05C0,
        /**
         * Peripheral sensing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_SENSING_DEVICE = 0x0510,
        /**
         * Peripheral digitizer tablet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_DIGITIZER_TABLET = 0x0514,
        /**
         * Peripheral card reader.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_CARD_READER = 0x0518,
        /**
         * Peripheral digital pen.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_DIGITAL_PEN = 0x051C,
        /**
         * Peripheral RFID scanner.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_SCANNER_RFID = 0x0520,
        /**
         * Gesture input device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PERIPHERAL_GESTURAL_INPUT = 0x0522,
        /**
         * Imaging Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        IMAGING_UNCATEGORIZED = 0x0600,
        /**
         * Imaging display device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        IMAGING_DISPLAY = 0x0610,
        /**
         * Imaging camera device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        IMAGING_CAMERA = 0x0620,
        /**
         * Imaging scanner.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        IMAGING_SCANNER = 0x0640,
        /**
         * Imaging printer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        IMAGING_PRINTER = 0x0680,
        /**
         * Wearable Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        WEARABLE_UNCATEGORIZED = 0x0700,
        /**
         * Smart watch.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        WEARABLE_WRIST_WATCH = 0x0704,
        /**
         * Wearable pager.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        WEARABLE_PAGER = 0x0708,
        /**
         * Smart jacket.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        WEARABLE_JACKET = 0x070C,
        /**
         * Wearable helmet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        WEARABLE_HELMET = 0x0710,
        /**
         * Wearable glasses.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        WEARABLE_GLASSES = 0x0714,
        /**
         * Minor Device Class field - Toy Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        TOY_UNCATEGORIZED = 0x0800,
        /**
         * Toy robot.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        TOY_ROBOT = 0x0804,
        /**
         * Toy vehicle.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        TOY_VEHICLE = 0x0808,
        /**
         * Humanoid toy doll.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        TOY_DOLL_ACTION_FIGURE = 0x080C,
        /**
         * Toy controller.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        TOY_CONTROLLER = 0x0810,
        /**
         * Toy gaming device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        TOY_GAME = 0x0814,
        /**
         * Minor Device Class field - Health
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_UNCATEGORIZED = 0x0900,
        /**
         * Blood pressure device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_BLOOD_PRESSURE = 0x0904,
        /**
         * Thermometer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_THERMOMETER = 0x0908,
        /**
         * Body scale.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_WEIGHING = 0x090C,
        /**
         * Blood glucose monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_GLUCOSE = 0x0910,
        /**
         * Pulse oximeter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_PULSE_OXIMETER = 0x0914,
        /**
         * Heart rate monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_PULSE_RATE = 0x0918,
        /**
         * Health data display.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_DATA_DISPLAY = 0x091C,
        /**
         * Step counter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_STEP_COUNTER = 0x0920,
        /**
         * Body composition analyzer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_BODY_COMPOSITION_ANALYZER = 0x0924,
        /**
         * Hygrometer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_PEAK_FLOW_MOITOR = 0x0928,
        /**
         * Medication monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_MEDICATION_MONITOR = 0x092C,
        /**
         * Prosthetic knee.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_KNEE_PROSTHESIS = 0x0930,
        /**
         * Prosthetic ankle.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_ANKLE_PROSTHESIS = 0x0934,
        /**
         * Generic health management device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_GENERIC_HEALTH_MANAGER = 0x0938,
        /**
         * Personal mobility device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        HEALTH_PERSONAL_MOBILITY_DEVICE = 0x093C
    }
    /**
     * Profile state change parameters.
     *
     * @typedef StateChangeParam
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.StateChangeParam
     */
    interface StateChangeParam {
        /**
         * The address of device
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        deviceId: string;
        /**
         * Profile state value
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        state: ProfileConnectionState;
    }
    /**
     * The enum of a2dp playing state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.PlayingState
     */
    enum PlayingState {
        /**
         * Not playing.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        STATE_NOT_PLAYING,
        /**
         * Playing.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        STATE_PLAYING
    }
    /**
     * The enum of profile id.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bluetoothManager/bluetoothManager.ProfileId
     */
    enum ProfileId {
        /**
         * A2DP profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PROFILE_A2DP_SOURCE = 1,
        /**
         * HFP profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 8
         * @deprecated since 9
         */
        PROFILE_HANDS_FREE_AUDIO_GATEWAY = 4
    }
}
export default bluetooth;
