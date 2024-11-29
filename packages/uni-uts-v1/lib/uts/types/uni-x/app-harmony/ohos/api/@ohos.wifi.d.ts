/*
 * Copyright (C) 2021-2023 Huawei Device Co., Ltd.
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
import { AsyncCallback, Callback } from './@ohos.base';
/**
 * Provides methods to operate or manage Wi-Fi.
 * @namespace wifi
 * @since 6
 */
declare namespace wifi {
    /**
     * Queries the Wi-Fi status
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if the Wi-Fi is active, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isWifiActive
     */
    function isWifiActive(): boolean;
    /**
     * Scans Wi-Fi hotspot.
     *
     * <p>This API works in asynchronous mode.</p>
     *
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.LOCATION
     * @returns { boolean } Returns {@code true} if the accessibility is succeed; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.scan
     */
    function scan(): boolean;
    /**
     * Obtains the hotspot information that scanned.
     *
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or ohos.permission.LOCATION)
     * @returns { Promise<Array<WifiScanInfo>> } Returns information about scanned Wi-Fi hotspot if any.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getScanInfoList
     */
    function getScanInfos(): Promise<Array<WifiScanInfo>>;
    /**
     * Obtains the hotspot information that scanned.
     *
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or ohos.permission.LOCATION)
     * @param { AsyncCallback<Array<WifiScanInfo>> } get information about scanned Wi-Fi hotspot if any.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getScanInfoList
     */
    function getScanInfos(callback: AsyncCallback<Array<WifiScanInfo>>): void;
    /**
     * Adds a specified untrusted hotspot configuration.
     *
     * <p>This method adds one configuration at a time. After this configuration is added,
     *     your device will determine whether to connect to the hotspot.
     *
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { WifiDeviceConfig } config - Indicates the device configuration for connection to the Wi-Fi network.
     * @returns { Promise<boolean> }  Returns {@code true} if the untrusted hotspot configuration is added, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.addCandidateConfig
     */
    function addUntrustedConfig(config: WifiDeviceConfig): Promise<boolean>;
    /**
     * Adds a specified untrusted hotspot configuration.
     *
     * <p>This method adds one configuration at a time. After this configuration is added,
     *     your device will determine whether to connect to the hotspot.
     *
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { WifiDeviceConfig } config - Indicates the device configuration for connection to the Wi-Fi network.
     * @param { AsyncCallback<boolean> }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.addCandidateConfig
     */
    function addUntrustedConfig(config: WifiDeviceConfig, callback: AsyncCallback<boolean>): void;
    /**
     * Removes a specified untrusted hotspot configuration.
     *
     * <p>This method removes one configuration at a time.
     *
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { WifiDeviceConfig } config - Indicates the device configuration for connection to the Wi-Fi network.
     * @returns { Promise<boolean> } Returns {@code true} if the untrusted hotspot configuration is removed, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.removeCandidateConfig
     */
    function removeUntrustedConfig(config: WifiDeviceConfig): Promise<boolean>;
    /**
     * Removes a specified untrusted hotspot configuration.
     *
     * <p>This method removes one configuration at a time.
     *
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { WifiDeviceConfig } config - Indicates the device configuration for connection to the Wi-Fi network.
     * @param { AsyncCallback<boolean> }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.removeCandidateConfig
     */
    function removeUntrustedConfig(config: WifiDeviceConfig, callback: AsyncCallback<boolean>): void;
    /**
     * Calculates the Wi-Fi signal level based on the Wi-Fi RSSI and frequency band.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { number } rssi Indicates the Wi-Fi RSSI.
     * @param { number } band Indicates the Wi-Fi frequency band.
     * @returns { number } Returns Wi-Fi signal level ranging from 0 to 4.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getSignalLevel
     */
    function getSignalLevel(rssi: number, band: number): number;
    /**
     * Obtains information about a Wi-Fi connection.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiLinkedInfo> } Returns Wi-Fi linked information.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getLinkedInfo
     */
    function getLinkedInfo(): Promise<WifiLinkedInfo>;
    /**
     * Obtains information about a Wi-Fi connection.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiLinkedInfo> } get Wi-Fi linked information.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getLinkedInfo
     */
    function getLinkedInfo(callback: AsyncCallback<WifiLinkedInfo>): void;
    /**
     * Checks whether a Wi-Fi connection has been set up.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if a Wi-Fi connection has been set up, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isConnected
     */
    function isConnected(): boolean;
    /**
     * Checks whether this device supports a specified feature.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { number } featureId Indicates the ID of the feature.
     * @returns { boolean } Returns {@code true} if this device supports the specified feature, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isFeatureSupported
     */
    function isFeatureSupported(featureId: number): boolean;
    /**
     * Obtains the IP information of a Wi-Fi connection.
     *
     * <p>The IP information includes the host IP address, gateway address, and DNS information.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { IpInfo } Returns the IP information of the Wi-Fi connection.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getIpInfo
     */
    function getIpInfo(): IpInfo;
    /**
     * Obtains the country code of this device.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { string } Returns the country code of this device.
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getCountryCode
     */
    function getCountryCode(): string;
    /**
     * Obtains information about a P2P connection.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiP2pLinkedInfo> } Returns the P2P connection information.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getP2pLinkedInfo
     */
    function getP2pLinkedInfo(): Promise<WifiP2pLinkedInfo>;
    /**
     * Obtains information about a P2P connection.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiP2pLinkedInfo> } get the P2P connection information.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getP2pLinkedInfo
     */
    function getP2pLinkedInfo(callback: AsyncCallback<WifiP2pLinkedInfo>): void;
    /**
     * Obtains information about the current group.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @returns { Promise<WifiP2pGroupInfo> } Returns the current group information.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getCurrentGroup
     */
    function getCurrentGroup(): Promise<WifiP2pGroupInfo>;
    /**
     * Obtains information about the current group.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @param { AsyncCallback<WifiP2pGroupInfo> } get the current group information.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getCurrentGroup
     */
    function getCurrentGroup(callback: AsyncCallback<WifiP2pGroupInfo>): void;
    /**
     * Obtains the information about the found devices.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @returns { Promise<WifiP2pDevice[]> } Returns the found devices list.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getP2pPeerDevices
     */
    function getP2pPeerDevices(): Promise<WifiP2pDevice[]>;
    /**
     * Obtains the information about the found devices.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @param { AsyncCallback<WifiP2pDevice[]> } Returns the found devices list.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getP2pPeerDevices
     */
    function getP2pPeerDevices(callback: AsyncCallback<WifiP2pDevice[]>): void;
    /**
     * Creates a P2P group.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { WifiP2PConfig } config Indicates the configuration for creating a group.
     * @returns { boolean } Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.createP2pGroup
     */
    function createGroup(config: WifiP2PConfig): boolean;
    /**
     * Removes a P2P group.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.removeP2pGroup
     */
    function removeGroup(): boolean;
    /**
     * Initiates a P2P connection to a device with the specified configuration.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @param { WifiP2PConfig } config Indicates the configuration for connecting to a specific group.
     * @returns { boolean } Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.p2pConnect
     */
    function p2pConnect(config: WifiP2PConfig): boolean;
    /**
     * Canceling a P2P connection.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.p2pCancelConnect
     */
    function p2pCancelConnect(): boolean;
    /**
     * Discover Wi-Fi P2P devices.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @returns { boolean } Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.startDiscoverP2pDevices
     */
    function startDiscoverDevices(): boolean;
    /**
     * Stops discovering Wi-Fi P2P devices.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.stopDiscoverP2pDevices
     */
    function stopDiscoverDevices(): boolean;
    /**
     * Subscribe Wi-Fi status change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: inactive, 1: active, 2: activating, 3: de-activating
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiStateChange
     */
    function on(type: 'wifiStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: inactive, 1: active, 2: activating, 3: de-activating
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiStateChange
     */
    function off(type: 'wifiStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi connection change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiConnectionChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: disconnected, 1: connected
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiConnectionChange
     */
    function on(type: 'wifiConnectionChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi connection change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiConnectionChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: disconnected, 1: connected
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiConnectionChange
     */
    function off(type: 'wifiConnectionChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi scan status change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiScanStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: scan fail, 1: scan success
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiScanStateChange
     */
    function on(type: 'wifiScanStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi scan status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiScanStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: scan fail, 1: scan success
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiScanStateChange
     */
    function off(type: 'wifiScanStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi rssi change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiRssiChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiRssiChange
     */
    function on(type: 'wifiRssiChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi rssi change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiRssiChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiRssiChange
     */
    function off(type: 'wifiRssiChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi hotspot state change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'hotspotStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: inactive, 1: active, 2: activating, 3: de-activating
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:hotspotStateChange
     */
    function on(type: 'hotspotStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi hotspot state change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'hotspotStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: inactive, 1: active, 2: activating, 3: de-activating
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:hotspotStateChange
     */
    function off(type: 'hotspotStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe P2P status change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 1: idle, 2: starting, 3:started, 4: closing, 5: closed
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pStateChange
     */
    function on(type: 'p2pStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe P2P status change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 1: idle, 2: starting, 3:started, 4: closing, 5: closed
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pStateChange
     */
    function off(type: 'p2pStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe P2P connection change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pConnectionChange' } type - event name.
     * @param { Callback<WifiP2pLinkedInfo> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pConnectionChange
     */
    function on(type: 'p2pConnectionChange', callback: Callback<WifiP2pLinkedInfo>): void;
    /**
     * Unsubscribe P2P connection change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pConnectionChange' } type - event name.
     * @param { Callback<WifiP2pLinkedInfo> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pConnectionChange
     */
    function off(type: 'p2pConnectionChange', callback?: Callback<WifiP2pLinkedInfo>): void;
    /**
     * Subscribe P2P local device change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @param { 'p2pDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pDeviceChange
     */
    function on(type: 'p2pDeviceChange', callback: Callback<WifiP2pDevice>): void;
    /**
     * Unsubscribe P2P local device change events.
     *
     * @permission ohos.permission.LOCATION
     * @param { 'p2pDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pDeviceChange
     */
    function off(type: 'p2pDeviceChange', callback?: Callback<WifiP2pDevice>): void;
    /**
     * Subscribe P2P peer device change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @param { 'p2pPeerDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice[]> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pPeerDeviceChange
     */
    function on(type: 'p2pPeerDeviceChange', callback: Callback<WifiP2pDevice[]>): void;
    /**
     * Unsubscribe P2P peer device change events.
     *
     * @permission ohos.permission.LOCATION
     * @param { 'p2pPeerDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice[]> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pPeerDeviceChange
     */
    function off(type: 'p2pPeerDeviceChange', callback?: Callback<WifiP2pDevice[]>): void;
    /**
     * Subscribe P2P persistent group change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pPersistentGroupChange' } type - event name.
     * @param { Callback<void> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pPersistentGroupChange
     */
    function on(type: 'p2pPersistentGroupChange', callback: Callback<void>): void;
    /**
     * Unsubscribe P2P persistent group change events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pPersistentGroupChange' } type - event name.
     * @param { Callback<void> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pPersistentGroupChange
     */
    function off(type: 'p2pPersistentGroupChange', callback?: Callback<void>): void;
    /**
     * Subscribe P2P discovery events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pDiscoveryChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pDiscoveryChange
     */
    function on(type: 'p2pDiscoveryChange', callback: Callback<number>): void;
    /**
     * Unsubscribe P2P discovery events.
     *
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pDiscoveryChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pDiscoveryChange
     */
    function off(type: 'p2pDiscoveryChange', callback?: Callback<number>): void;
    /**
     * Wi-Fi device configuration information.
     *
     * @interface WifiDeviceConfig
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiDeviceConfig
     */
    interface WifiDeviceConfig {
        /** Wi-Fi SSID: the maximum length is 32
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         */
        ssid: string;
        /** Wi-Fi bssid(MAC): the length is 6
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         */
        bssid: string;
        /** Wi-Fi key: maximum length is 64
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        preSharedKey: string;
        /** Hide SSID or not, false(default): not hide
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         */
        isHiddenSsid: boolean;
        /** Security type: reference definition of WifiSecurityType
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        securityType: WifiSecurityType;
    }
    /**
     * Describes the scanned Wi-Fi information.
     *
     * @interface WifiScanInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiScanInfo
     */
    interface WifiScanInfo {
        /** Wi-Fi SSID: the maximum length is 32
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        ssid: string;
        /** Wi-Fi bssid(MAC): the length is 6
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        bssid: string;
        /** Hotspot capability
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        capabilities: string;
        /** Security type: reference definition of WifiSecurityType
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         */
        securityType: WifiSecurityType;
        /** Received signal strength indicator (RSSI)
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         */
        rssi: number;
        /** Frequency band, 1: 2.4G, 2: 5G
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        band: number;
        /** Frequency
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         */
        frequency: number;
        /** Channel width
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        channelWidth: number;
        /**
         * Time stamp
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         */
        timestamp: number;
    }
    /**
     * Describes the wifi security type.
     *
     * @enum { number } WifiSecurityType
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiSecurityType
     */
    enum WifiSecurityType {
        /** Invalid security type
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 6
         * @deprecated since 9
         */
        WIFI_SEC_TYPE_INVALID = 0,
        /** Open
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 6
         * @deprecated since 9
         */
        WIFI_SEC_TYPE_OPEN = 1,
        /**
         * Wired Equivalent Privacy (WEP)
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 6
         * @deprecated since 9
         * */
        WIFI_SEC_TYPE_WEP = 2,
        /**
         * Pre-shared key (PSK)
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 6
         * @deprecated since 9
         *  */
        WIFI_SEC_TYPE_PSK = 3,
        /**
         * Simultaneous Authentication of Equals (SAE)
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 6
         * @deprecated since 9
         * */
        WIFI_SEC_TYPE_SAE = 4
    }
    /**
     * Wi-Fi connection information.
     *
     * @interface WifiLinkedInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiLinkedInfo
     */
    interface WifiLinkedInfo {
        /**
         * The SSID of the Wi-Fi hotspot
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        ssid: string;
        /**
         *  The BSSID of the Wi-Fi hotspot
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        bssid: string;
        /**
         * The RSSI(dBm) of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        rssi: number;
        /**
         * The frequency band of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        band: number;
        /**
         * The speed of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        linkSpeed: number;
        /**
         * The frequency of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        frequency: number;
        /**
         * Whether the SSID of the access point (AP) of this Wi-Fi connection is hidden.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        isHidden: boolean;
        /**
         * Whether this Wi-Fi connection restricts the data volume.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
        */
        isRestricted: boolean;
        /**
         *
         * The Wi-Fi MAC address of a device.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        macAddress: string;
        /**
         * The IP address of this Wi-Fi connection.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        ipAddress: number;
        /**
         * The state of this Wi-Fi connection.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        connState: ConnState;
    }
    /**
     * Wi-Fi IP information.
     *
     * @interface IpInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.IpInfo
     */
    interface IpInfo {
        /**
         * The IP address of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.AP.Core
         * @since 7
         * @deprecated since 9
         *  */
        ipAddress: number;
        /**
         * The gateway of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.AP.Core
         * @since 7
         * @deprecated since 9
         *  */
        gateway: number;
        /**
         * The network mask of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.AP.Core
         * @since 7
         * @deprecated since 9
         *  */
        netmask: number;
        /**
         *
         * The primary DNS server IP address of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.AP.Core
         * @since 7
         * @deprecated since 9
         *  */
        primaryDns: number;
        /** T
         * he secondary DNS server IP address of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.AP.Core
         * @since 7
         * @deprecated since 9
         *  */
        secondDns: number;
        /**
         * The DHCP server IP address of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.AP.Core
         * @since 7
         * @deprecated since 9
         *  */
        serverIp: number;
        /**
         * The IP address lease duration of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.AP.Core
         * @since 7
         * @deprecated since 9
         * */
        leaseDuration: number;
    }
    /**
     * The state of Wi-Fi connection enumeration.
     *
     * @enum { number } ConnState
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.ConnState
     */
    export enum ConnState {
        /**
         * The device is searching for an available AP.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        SCANNING,
        /**
         * The Wi-Fi connection is being set up.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        CONNECTING,
        /**
         * The Wi-Fi connection is being authenticated.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        AUTHENTICATING,
        /**
         * The IP address of the Wi-Fi connection is being obtained.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        OBTAINING_IPADDR,
        /**
         * The Wi-Fi connection has been set up.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        CONNECTED,
        /**
         * The Wi-Fi connection is being torn down.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         *  */
        DISCONNECTING,
        /**
         * The Wi-Fi connection has been torn down.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        DISCONNECTED,
        /**
         * Failed to set up the Wi-Fi connection.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 6
         * @deprecated since 9
         * */
        UNKNOWN
    }
    /**
     * P2P device information.
     *
     * @interface WifiP2pDevice
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2pDevice
     */
    interface WifiP2pDevice {
        /**
         * Device name
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        deviceName: string;
        /**
         * Device mac address
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         * */
        deviceAddress: string;
        /**
         *  Primary device type
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         * */
        primaryDeviceType: string;
        /**
         * Device status
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         * */
        deviceStatus: P2pDeviceStatus;
        /**
         * Device group capabilities
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        groupCapabilitys: number;
    }
    /**
     * P2P config.
     * @interface WifiP2PConfig
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2PConfig
     */
    interface WifiP2PConfig {
        /**
         * Device mac address s
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
        */
        deviceAddress: string;
        /**
         * Group network ID. When creating a group, -1 indicates creates a temporary group,
         * -2: indicates creates a persistent group
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        netId: number;
        /**
         * The passphrase of this {@code WifiP2pConfig} instance
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        passphrase: string;
        /**
         * Group name
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        groupName: string;
        /**
         * Group owner band
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        goBand: GroupOwnerBand;
    }
    /**
     * P2P group information.
     * @interface WifiP2pGroupInfo
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2pGroupInfo
     */
    interface WifiP2pGroupInfo {
        /**
         * Indicates whether it is group owner
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        isP2pGo: boolean;
        /**
         * Group owner information
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        ownerInfo: WifiP2pDevice;
        /**
         * The group passphrase
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        passphrase: string;
        /**
         * Interface name
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        interface: string;
        /**
         * Group name
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        groupName: string;
        /** Network ID
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
        */
        networkId: number;
        /** Frequency
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        frequency: number;
        /**
         * Client list
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         * */
        clientDevices: WifiP2pDevice[];
        /**
         * Group owner IP address
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         * */
        goIpAddress: string;
    }
    /**
     * P2P connection status.
     *
     * @enum { number } P2pConnectState
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.P2pConnectState
     */
    enum P2pConnectState {
        /**
         * p2p is disconnected.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        DISCONNECTED = 0,
        /**
         * p2p is connected.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        CONNECTED = 1
    }
    /**
     * P2P linked information.
     * @typedef WifiP2pLinkedInfo
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2pLinkedInfo
     */
    interface WifiP2pLinkedInfo {
        /**
         * Connection status
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         * */
        connectState: P2pConnectState;
        /**
         * Indicates whether it is group owner
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         * */
        isGroupOwner: boolean;
        /**
         * Group owner address
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         *  */
        groupOwnerAddr: string;
    }
    /**
     * P2P device status.
     *
     * @enum { number } P2pDeviceStatus
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.P2pDeviceStatus
     */
    enum P2pDeviceStatus {
        /**
         * Indicate p2p device is connected.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        CONNECTED = 0,
        /**
         * Indicate p2p device is invited.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        INVITED = 1,
        /**
         * Indicate p2p device is failed.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        FAILED = 2,
        /**
         * Indicate p2p device is available.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        AVAILABLE = 3,
        /**
         * Indicate p2p device is unavailable.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        UNAVAILABLE = 4
    }
    /**
     * P2P group owner band.
     *
     * @enum { number } GroupOwnerBand
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.GroupOwnerBand
     */
    enum GroupOwnerBand {
        /**
         * default band.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        GO_BAND_AUTO = 0,
        /**
         * 2.4G band.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        GO_BAND_2GHZ = 1,
        /**
         * 5G band.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 8
         * @deprecated since 9
         */
        GO_BAND_5GHZ = 2
    }
}
export default wifi;
