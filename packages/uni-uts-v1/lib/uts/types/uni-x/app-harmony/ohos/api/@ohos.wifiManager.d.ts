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
import { AsyncCallback, Callback } from './@ohos.base';
/**
 * Provides methods to operate or manage Wi-Fi.
 * @namespace wifiManager
 * @since 9
 */
/**
 * Provides methods to operate or manage Wi-Fi.
 * @namespace wifiManager
 * @atomicservice
 * @since 11
 */
/**
 * Provides methods to operate or manage Wi-Fi.
 * @namespace wifiManager
 * @syscap SystemCapability.Communication.WiFi.STA
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace wifiManager {
    /**
     * Query the Wi-Fi status
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if the Wi-Fi is active, returns {@code false} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
   * Query the Wi-Fi status
   * @permission ohos.permission.GET_WIFI_INFO
   * @returns { boolean } Returns {@code true} if the Wi-Fi is active, returns {@code false} otherwise.
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 801 - Capability not supported.
   * @throws {BusinessError} 2501000 - Operation failed.
   * @syscap SystemCapability.Communication.WiFi.STA
   * @atomicservice
   * @since 11
   */
    /**
     * Query the Wi-Fi status
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if the Wi-Fi is active, returns {@code false} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function isWifiActive(): boolean;
    /**
     * Scan Wi-Fi hotspot, This API works in asynchronous mode.
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     * @deprecated since 10
     * @useinstead wifiManager.startScan
     */
    function scan(): void;
    /**
     * Obtain the scanned sta list.
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or
     * (ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION))
     * @returns { Promise<Array<WifiScanInfo>> } Returns information about scanned Wi-Fi hotspot if any.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     * @deprecated since 10
     * @useinstead wifiManager.getScanInfoList
     */
    function getScanResults(): Promise<Array<WifiScanInfo>>;
    /**
     * Obtain the scanned sta list.
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or
     * (ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION))
     * @param { AsyncCallback<Array<WifiScanInfo>> } callback - Returns information about scanned Wi-Fi hotspot if any.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     * @deprecated since 10
     * @useinstead wifiManager.getScanInfoList
     */
    function getScanResults(callback: AsyncCallback<Array<WifiScanInfo>>): void;
    /**
     * Obtain the scanned sta list.
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or
     * (ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION))
     * @returns { Array<WifiScanInfo> } Returns information about scanned Wi-Fi hotspot if any.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     * @deprecated since 10
     * @useinstead wifiManager.getScanInfoList
     */
    function getScanResultsSync(): Array<WifiScanInfo>;
    /**
     * Obtain the scanned station list. If does't have the permission of ohos.permission.GET_WIFI_PEERS_MAC, return random bssid.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Array<WifiScanInfo> } Returns information about scanned Wi-Fi hotspot if any.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    /**
     * Obtain the scanned station list. If does't have the permission of ohos.permission.GET_WIFI_PEERS_MAC, return random bssid.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Array<WifiScanInfo> } Returns information about scanned Wi-Fi hotspot if any.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function getScanInfoList(): Array<WifiScanInfo>;
    /**
    * Add a specified candidate hotspot configuration and returns the networkId.
    * This method adds one configuration at a time. After this configuration is added,
    *     your device will determine whether to connect to the hotspot.
    * @permission ohos.permission.SET_WIFI_INFO
    * @param { WifiDeviceConfig } config - candidate config.
    * @returns { Promise<number> } Returns {@code networkId} if the configuration is added; returns {@code -1} otherwise.
    * @throws {BusinessError} 201 - Permission denied.
    * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
    *     2. Incorrect parameter types. 3.Parameter verification failed.
    * @throws {BusinessError} 801 - Capability not supported.
    * @throws {BusinessError} 2501000 - Operation failed.
    * @syscap SystemCapability.Communication.WiFi.STA
    * @since 9
    */
    /**
     * Add a specified candidate hotspot configuration and returns the networkId.
     * This method adds one configuration at a time. After this configuration is added,
     *     your device will determine whether to connect to the hotspot.
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { WifiDeviceConfig } config - candidate config.
     * @returns { Promise<number> } Returns {@code networkId} if the configuration is added; returns {@code -1} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function addCandidateConfig(config: WifiDeviceConfig): Promise<number>;
    /**
    * Add a specified candidate hotspot configuration and returns the networkId.
    * This method adds one configuration at a time. After this configuration is added,
    *     your device will determine whether to connect to the hotspot.
    * @permission ohos.permission.SET_WIFI_INFO
    * @param { WifiDeviceConfig } config - candidate config.
    * @param { AsyncCallback<number> } callback - Indicates call back of addCandidateConfig.
    * @throws {BusinessError} 201 - Permission denied.
    * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
    *     2. Incorrect parameter types. 3.Parameter verification failed.
    * @throws {BusinessError} 801 - Capability not supported.
    * @throws {BusinessError} 2501000 - Operation failed.
    * @syscap SystemCapability.Communication.WiFi.STA
    * @since 9
    */
    /**
    * Add a specified candidate hotspot configuration and returns the networkId.
    * This method adds one configuration at a time. After this configuration is added,
    *     your device will determine whether to connect to the hotspot.
    * @permission ohos.permission.SET_WIFI_INFO
    * @param { WifiDeviceConfig } config - candidate config.
    * @param { AsyncCallback<number> } callback - Indicates call back of addCandidateConfig.
    * @throws {BusinessError} 201 - Permission denied.
    * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
    *     2. Incorrect parameter types. 3.Parameter verification failed.
    * @throws {BusinessError} 801 - Capability not supported.
    * @throws {BusinessError} 2501000 - Operation failed.
    * @syscap SystemCapability.Communication.WiFi.STA
    * @atomicservice
    * @since 12
    */
    function addCandidateConfig(config: WifiDeviceConfig, callback: AsyncCallback<number>): void;
    /**
     * Remove a specified candidate hotspot configuration, only the configuration which is added by ourself is allowed
     * to be removed.
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { number } networkId - Network ID which will be removed.
     * @returns { Promise<void> } Return results.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Remove a specified candidate hotspot configuration, only the configuration which is added by ourself is allowed
     * to be removed.
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { number } networkId - Network ID which will be removed.
     * @returns { Promise<void> } Return results.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function removeCandidateConfig(networkId: number): Promise<void>;
    /**
     * Remove a specified candidate hotspot configuration, only the configuration which is added by ourself is allowed
     * to be removed.
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { number } networkId - Network ID which will be removed.
     * @param { AsyncCallback<void> } callback - Indicates call back of removeCandidateConfig.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Remove a specified candidate hotspot configuration, only the configuration which is added by ourself is allowed
     * to be removed.
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { number } networkId - Network ID which will be removed.
     * @param { AsyncCallback<void> } callback - Indicates call back of removeCandidateConfig.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function removeCandidateConfig(networkId: number, callback: AsyncCallback<void>): void;
    /**
     * Obtain the list of all existed candidate Wi-Fi configurations which added by ourself.
     * You can obtain only the Wi-Fi configurations you created on your own application.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Array<WifiDeviceConfig> } Returns the list of all existed Wi-Fi configurations you created on your application.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Obtain the list of all existed candidate Wi-Fi configurations which added by ourself.
     * You can obtain only the Wi-Fi configurations you created on your own application.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Array<WifiDeviceConfig> } Returns the list of all existed Wi-Fi configurations you created on your application.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    /**
     * Obtain the list of all existed candidate Wi-Fi configurations which added by ourself.
     * You can obtain only the Wi-Fi configurations you created on your own application.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Array<WifiDeviceConfig> } Returns the list of all existed Wi-Fi configurations you created on your application.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function getCandidateConfigs(): Array<WifiDeviceConfig>;
    /**
     * Connect to a specified candidate hotspot by networkId, only the configuration which is added by ourself
     * is allowed to be connected. This method connect to a configuration at a time.
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { number } networkId - Network ID which will be connected. The value of networkId cannot be less than 0.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Connect to a specified candidate hotspot by networkId, only the configuration which is added by ourself
     * is allowed to be connected. This method connect to a configuration at a time.
     * @permission ohos.permission.SET_WIFI_INFO
     * @param { number } networkId - Network ID which will be connected. The value of networkId cannot be less than 0.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function connectToCandidateConfig(networkId: number): void;
    /**
     * Calculate the Wi-Fi signal level based on the Wi-Fi RSSI and frequency band.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { number } rssi - Indicates the Wi-Fi RSSI.
     * @param { number } band - Indicates the Wi-Fi frequency band.
     * @returns { number } Returns Wi-Fi signal level ranging from 0 to 4.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    function getSignalLevel(rssi: number, band: number): number;
    /**
     * Obtain connection information about the Wi-Fi connection.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiLinkedInfo> } Returns Wi-Fi linked information.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Obtain connection information about the Wi-Fi connection.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiLinkedInfo> } Returns Wi-Fi linked information.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function getLinkedInfo(): Promise<WifiLinkedInfo>;
    /**
     * Obtain connection information about the Wi-Fi connection.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiLinkedInfo> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Obtain connection information about the Wi-Fi connection.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiLinkedInfo> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @since 12
     */
    function getLinkedInfo(callback: AsyncCallback<WifiLinkedInfo>): void;
    /**
     * Check whether the Wi-Fi connection has been set up.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if a Wi-Fi connection has been set up, returns {@code false} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Check whether the Wi-Fi connection has been set up.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if a Wi-Fi connection has been set up, returns {@code false} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function isConnected(): boolean;
    /**
     * Check whether the device supports a specified feature.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { number } featureId Indicates the ID of the feature.
     * @returns { boolean } Returns {@code true} if this device supports the specified feature, returns {@code false} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2401000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 9
     */
    function isFeatureSupported(featureId: number): boolean;
    /**
     * Obtain the IP information of the Wi-Fi connection.
     * The IP information includes the host IP address, gateway address, and DNS information.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { IpInfo } Returns the IP information of the Wi-Fi connection.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    function getIpInfo(): IpInfo;
    /**
     * Obtain the IPv6 information of the Wi-Fi connection.
     * The IPv6 information includes the host IP address, gateway address, and DNS information.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Ipv6Info } Returns the IPv6 information of the Wi-Fi connection.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    function getIpv6Info(): Ipv6Info;
    /**
     * Obtain the country code of the device.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { string } Returns the country code of this device.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2401000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 9
     */
    function getCountryCode(): string;
    /**
     * Check whether the current device supports the specified band.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { WifiBandType } bandType - Indicates the band type.
     * @returns { boolean }Returns {@code true} if the specified band is supported, returns {@code false} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    function isBandTypeSupported(bandType: WifiBandType): boolean;
    /**
     * Whether the hotspot is metered hotspot or not.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { boolean } Returns {@code true} if the hotspot is metered hotspot, returns {@code false} otherwise.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 11
     */
    function isMeteredHotspot(): boolean;
    /**
     * Obtain information about the P2P connection.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiP2pLinkedInfo> } Returns p2p linked information.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function getP2pLinkedInfo(): Promise<WifiP2pLinkedInfo>;
    /**
     * Obtain information about the P2P connection.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiP2pLinkedInfo> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function getP2pLinkedInfo(callback: AsyncCallback<WifiP2pLinkedInfo>): void;
    /**
     * Obtain information about the current p2p group.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Promise<WifiP2pGroupInfo> } Returns p2p group information.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Obtain information about the current p2p group.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiP2pGroupInfo> } Returns p2p group information.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function getCurrentGroup(): Promise<WifiP2pGroupInfo>;
    /**
     * Obtain information about the current p2p group.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<WifiP2pGroupInfo> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Obtain information about the current p2p group.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiP2pGroupInfo> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function getCurrentGroup(callback: AsyncCallback<WifiP2pGroupInfo>): void;
    /**
     * Obtain the information about the found devices.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Promise<WifiP2pDevice[]> } Returns p2p device information.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Obtain the information about the found devices.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiP2pDevice[]> } Returns p2p device information.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function getP2pPeerDevices(): Promise<WifiP2pDevice[]>;
    /**
     * Obtain the information about the found devices.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<WifiP2pDevice[]> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Obtain the information about the found devices.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiP2pDevice[]> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function getP2pPeerDevices(callback: AsyncCallback<WifiP2pDevice[]>): void;
    /**
     * Obtain the information about own device information.
     * DeviceAddress in the returned WifiP2pDevice will be set "00:00:00:00:00:00",
     * if ohos.permission.GET_WIFI_LOCAL_MAC is not granted.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.GET_WIFI_CONFIG
     * @returns { Promise<WifiP2pDevice> } Returns the information about own device info.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Obtain the information about own device information.
     * DeviceAddress in the returned WifiP2pDevice will be set "00:00:00:00:00:00",
     * if ohos.permission.GET_WIFI_LOCAL_MAC is not granted.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<WifiP2pDevice> } Returns the information about own device info.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 11
     */
    function getP2pLocalDevice(): Promise<WifiP2pDevice>;
    /**
     * Obtain the information about own device information.
     * DeviceAddress in the returned WifiP2pDevice will be set "00:00:00:00:00:00",
     * if ohos.permission.GET_WIFI_LOCAL_MAC is not granted.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.GET_WIFI_CONFIG
     * @param { AsyncCallback<WifiP2pDevice> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Obtain the information about own device information.
     * DeviceAddress in the returned WifiP2pDevice will be set "00:00:00:00:00:00",
     * if ohos.permission.GET_WIFI_LOCAL_MAC is not granted.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<WifiP2pDevice> } callback - Indicates callback of function.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 11
     */
    function getP2pLocalDevice(callback: AsyncCallback<WifiP2pDevice>): void;
    /**
     * Create a P2P group.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { WifiP2PConfig } config - Indicates the configuration for a group.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1.Incorrect parameter types.
     *     2.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function createGroup(config: WifiP2PConfig): void;
    /**
     * Remove a P2P group.
     * @permission ohos.permission.GET_WIFI_INFO
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function removeGroup(): void;
    /**
     * Initiate a P2P connection to a device with the specified configuration.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { WifiP2PConfig } config - Indicates the configuration for connecting to a specific group.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Initiate a P2P connection to a device with the specified configuration.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { WifiP2PConfig } config - Indicates the configuration for connecting to a specific group.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1.Incorrect parameter types.
     *     2.Parameter verification failed.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function p2pConnect(config: WifiP2PConfig): void;
    /**
     * Stop an ongoing p2p connection that is being established.
     * @permission ohos.permission.GET_WIFI_INFO
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function p2pCancelConnect(): void;
    /**
     * Start discover Wi-Fi P2P devices.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Start discover Wi-Fi P2P devices.
     * @permission ohos.permission.GET_WIFI_INFO
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function startDiscoverDevices(): void;
    /**
     * Stop discover Wi-Fi P2P devices.
     * @permission ohos.permission.GET_WIFI_INFO
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function stopDiscoverDevices(): void;
    /**
     * Subscribe Wi-Fi status change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: inactive, 1: active, 2: activating, 3: de-activating
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Subscribe Wi-Fi status change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: inactive, 1: active, 2: activating, 3: de-activating
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function on(type: 'wifiStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Unsubscribe Wi-Fi status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off(type: 'wifiStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi connection change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiConnectionChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: disconnected, 1: connected
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Subscribe Wi-Fi connection change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiConnectionChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: disconnected, 1: connected
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function on(type: 'wifiConnectionChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi connection change events.
     * All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiConnectionChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Unsubscribe Wi-Fi connection change events.
     * All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiConnectionChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off(type: 'wifiConnectionChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi scan status change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiScanStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: scan fail, 1: scan success
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Subscribe Wi-Fi scan status change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiScanStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: scan fail, 1: scan success
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function on(type: 'wifiScanStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi scan status change events.
     * All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiScanStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Unsubscribe Wi-Fi scan status change events.
     * All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiScanStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    function off(type: 'wifiScanStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi rssi change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiRssiChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    function on(type: 'wifiRssiChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi rssi change events.
     * All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'wifiRssiChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    function off(type: 'wifiRssiChange', callback?: Callback<number>): void;
    /**
     * Subscribe Wi-Fi hotspot state change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'hotspotStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 0: inactive, 1: active, 2: activating, 3: de-activating
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @since 9
     */
    function on(type: 'hotspotStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe Wi-Fi hotspot state change events.
     * All callback functions will be deregistered If there is no specific callback parameter.</p>
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'hotspotStateChange'} type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @since 9
     */
    function off(type: 'hotspotStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe P2P status change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on, 1: idle, 2: starting, 3:started, 4: closing, 5: closed
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function on(type: 'p2pStateChange', callback: Callback<number>): void;
    /**
     * Unsubscribe P2P status change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pStateChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function off(type: 'p2pStateChange', callback?: Callback<number>): void;
    /**
     * Subscribe P2P connection change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pConnectionChange' } type - event name.
     * @param { Callback<WifiP2pLinkedInfo> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function on(type: 'p2pConnectionChange', callback: Callback<WifiP2pLinkedInfo>): void;
    /**
     * Unsubscribe P2P connection change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pConnectionChange' } type - event name.
     * @param { Callback<WifiP2pLinkedInfo> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function off(type: 'p2pConnectionChange', callback?: Callback<WifiP2pLinkedInfo>): void;
    /**
     * Subscribe P2P local device change events.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'p2pDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Subscribe P2P local device change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function on(type: 'p2pDeviceChange', callback: Callback<WifiP2pDevice>): void;
    /**
     * Unsubscribe P2P local device change events.
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'p2pDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Unsubscribe P2P local device change events.
     * @param { 'p2pDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function off(type: 'p2pDeviceChange', callback?: Callback<WifiP2pDevice>): void;
    /**
     * Subscribe P2P peer device change events.
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'p2pPeerDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice[]> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Subscribe P2P peer device change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pPeerDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice[]> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function on(type: 'p2pPeerDeviceChange', callback: Callback<WifiP2pDevice[]>): void;
    /**
     * Unsubscribe P2P peer device change events.
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'p2pPeerDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice[]> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    /**
     * Unsubscribe P2P peer device change events.
     * @param { 'p2pPeerDeviceChange' } type - event name.
     * @param { Callback<WifiP2pDevice[]> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 10
     */
    function off(type: 'p2pPeerDeviceChange', callback?: Callback<WifiP2pDevice[]>): void;
    /**
     * Subscribe P2P persistent group change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pPersistentGroupChange' } type - event name.
     * @param { Callback<void> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function on(type: 'p2pPersistentGroupChange', callback: Callback<void>): void;
    /**
     * Unsubscribe P2P persistent group change events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pPersistentGroupChange' } type - event name.
     * @param { Callback<void> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function off(type: 'p2pPersistentGroupChange', callback?: Callback<void>): void;
    /**
     * Subscribe P2P discovery events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pDiscoveryChange' } type - event name.
     * @param { Callback<number> } callback - the callback of on
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function on(type: 'p2pDiscoveryChange', callback: Callback<number>): void;
    /**
     * Unsubscribe P2P discovery events.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { 'p2pDiscoveryChange' } type - event name.
     * @param { Callback<number> } callback - the callback of off
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified.
     *     2. Incorrect parameter types.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    function off(type: 'p2pDiscoveryChange', callback?: Callback<number>): void;
    /**
     * Wi-Fi device address( mac / bssid ) type.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 10
     */
    /**
     * Wi-Fi device address( mac / bssid ) type.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.Core
     * atomicservice
     * @since 12
     */
    enum DeviceAddressType {
        /**
         * random device address
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 10
         */
        /**
         * random device address
         * @syscap SystemCapability.Communication.WiFi.Core
         * atomicservice
         * @since 12
         */
        RANDOM_DEVICE_ADDRESS,
        /**
         * real device address
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 10
         */
        /**
         * real device address
         * @syscap SystemCapability.Communication.WiFi.Core
         * atomicservice
         * @since 12
         */
        REAL_DEVICE_ADDRESS
    }
    /**
     * Wi-Fi EAP method.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    enum EapMethod {
        /**
         * EAP NONE
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_NONE,
        /**
         * EAP PEAP
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_PEAP,
        /**
         * EAP TLS
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_TLS,
        /**
         * EAP TTLS
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_TTLS,
        /**
         * EAP PWD
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_PWD,
        /**
         * EAP SIM
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_SIM,
        /**
         * EAP AKA
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_AKA,
        /**
         * EAP AKA PRIME
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_AKA_PRIME,
        /**
         * EAP UNAUTH TLS
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        EAP_UNAUTH_TLS
    }
    /**
     * Wi-Fi phase 2 method.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    enum Phase2Method {
        /**
         * Phase2 NONE
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_NONE,
        /**
         * Phase2 PAP
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_PAP,
        /**
         * Phase2 MSCHAP
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_MSCHAP,
        /**
         * Phase2 MSCHAPV2
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_MSCHAPV2,
        /**
         * Phase2 GTC
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_GTC,
        /**
         * Phase2 SIM
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_SIM,
        /**
         * Phase2 AKA
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_AKA,
        /**
         * Phase2 AKA+
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        PHASE2_AKA_PRIME
    }
    /**
     * Wi-Fi EAP config.
     * @typedef WifiEapConfig
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    interface WifiEapConfig {
        /**
         * EAP authentication method
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        eapMethod: EapMethod;
        /**
         * Phase 2 authentication method
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        phase2Method: Phase2Method;
        /**
         * The identity
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        identity: string;
        /**
         * Anonymous identity
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        anonymousIdentity: string;
        /**
         * Password
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        password: string;
        /**
         * CA certificate alias
         * @type { string }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        caCertAlias: string;
        /**
         * CA certificate path
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        caPath: string;
        /**
         * Client certificate alias
         * @type { string }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        clientCertAlias: string;
        /**
         * content of user's certificate
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        certEntry: Uint8Array;
        /**
         * Password of user's certificate
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        certPassword: string;
        /**
         * Alternate subject match
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        altSubjectMatch: string;
        /**
         * Domain suffix match
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        domainSuffixMatch: string;
        /**
         * Realm for Passpoint credential
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        realm: string;
        /**
         * Public Land Mobile Network of the provider of Passpoint credential
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        plmn: string;
        /**
         * Sub ID of the SIM card
         * @type { number }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        eapSubId: number;
    }
    /**
     * Wi-Fi device configuration information.
     * @typedef WifiDeviceConfig
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Wi-Fi device configuration information.
     * @typedef WifiDeviceConfig
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    interface WifiDeviceConfig {
        /**
         * Wi-Fi SSID: the maximum length is 32.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Wi-Fi SSID: the maximum length is 32.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        ssid: string;
        /**
         * Wi-Fi bssid(MAC): the length is 6.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Wi-Fi bssid(MAC): the length is 6.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        bssid?: string;
        /**
         * Wi-Fi bssid type.
         * @type { ?DeviceAddressType }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        /**
         * Wi-Fi bssid type.
         * @type { ?DeviceAddressType }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        bssidType?: DeviceAddressType;
        /**
         * Wi-Fi key: maximum length is 64.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Wi-Fi key: maximum length is 64.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        preSharedKey: string;
        /**
         * Hide SSID or not, false(default): not hide
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        isHiddenSsid?: boolean;
        /**
         * Security type: reference definition of WifiSecurityType
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Security type: reference definition of WifiSecurityType
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        securityType: WifiSecurityType;
        /**
         * EAP config info.
         * @type { ?WifiEapConfig }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        eapConfig?: WifiEapConfig;
        /**
         * WAPI config info.
         * @type { ?WifiWapiConfig }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        wapiConfig?: WifiWapiConfig;
    }
    /**
     * Wi-Fi WAPI config.
     * @typedef WifiWapiConfig
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 12
     */
    interface WifiWapiConfig {
        /**
         * WAPI pre-shared key type.
         * @type { WapiPskType }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        wapiPskType: WapiPskType;
        /**
         * WAPI AS certification.
         * @type { string }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        wapiAsCert: string;
        /**
         * WAPI user certification.
         * @type { string }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        wapiUserCert: string;
    }
    /**
     * Wi-Fi information elements.
     * @typedef WifiInfoElem
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    interface WifiInfoElem {
        /**
         * Element id
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        eid: number;
        /**
         * Element content
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        content: Uint8Array;
    }
    /**
     * Describes the wifi channel width.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    enum WifiChannelWidth {
        /**
         * 20MHz.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        WIDTH_20MHZ = 0,
        /**
         * 40MHz.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        WIDTH_40MHZ = 1,
        /**
         * 80MHz.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        WIDTH_80MHZ = 2,
        /**
         * 160MHz.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        WIDTH_160MHZ = 3,
        /**
         * 80MHz plus.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        WIDTH_80MHZ_PLUS = 4,
        /**
         * Invalid.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        WIDTH_INVALID
    }
    /**
     * Describes the scanned Wi-Fi information.
     * @typedef WifiScanInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Describes the scanned Wi-Fi information.
     * @typedef WifiScanInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    interface WifiScanInfo {
        /**
         * Wi-Fi SSID: the maximum length is 32
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Wi-Fi SSID: the maximum length is 32
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        ssid: string;
        /**
         * Wi-Fi bssid(MAC): the length is 6
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Wi-Fi bssid(MAC): the length is 6
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        bssid: string;
        /**
         * Wi-Fi bssid type
         * @type { DeviceAddressType }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        /**
         * Wi-Fi bssid type
         * @type { DeviceAddressType }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        bssidType: DeviceAddressType;
        /**
         * Hotspot capability
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        capabilities: string;
        /**
         * Security type: reference definition of WifiSecurityType
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Security type: reference definition of WifiSecurityType
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        securityType: WifiSecurityType;
        /**
         * Received signal strength indicator (RSSI)
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Received signal strength indicator (RSSI)
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        rssi: number;
        /**
         * Frequency band, 1: 2.4G, 2: 5G
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        band: number;
        /**
         * Frequency
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * Frequency
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        frequency: number;
        /**
         * Channel width
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        channelWidth: number;
        /**
         * Center frequency 0.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        centerFrequency0: number;
        /**
         * Center frequency 1.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        centerFrequency1: number;
        /**
         * Information elements.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        infoElems: Array<WifiInfoElem>;
        /**
         * Time stamp
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        timestamp: number;
        /**
         * Supported wifi category
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        supportedWifiCategory: WifiCategory;
        /**
         * Whether the Wi-Fi hotspot is HiLink network.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        isHiLinkNetwork: boolean;
    }
    /**
     * Describes the wifi security type.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 9
     */
    /**
     * Describes the wifi security type.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.Core
     * @atomicservice
     * @since 12
     */
    enum WifiSecurityType {
        /**
         * Invalid security type
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_INVALID = 0,
        /**
         * Open
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        /**
         * Open
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @atomicservice
         * @since 12
         */
        WIFI_SEC_TYPE_OPEN = 1,
        /**
         * Wired Equivalent Privacy (WEP)
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_WEP = 2,
        /**
         * Pre-shared key (PSK)
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_PSK = 3,
        /**
         * Simultaneous Authentication of Equals (SAE)
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_SAE = 4,
        /**
         * EAP authentication.
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_EAP = 5,
        /**
         * SUITE_B_192 192 bit level.
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_EAP_SUITE_B = 6,
        /**
         * Opportunistic Wireless Encryption.
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_OWE = 7,
        /**
         * WAPI certificate to be specified.
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_WAPI_CERT = 8,
        /**
         * WAPI pre-shared key to be specified.
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 9
         */
        WIFI_SEC_TYPE_WAPI_PSK = 9
    }
    /**
     * Describes the WAPI pre-shared key Type.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.Core
     * @since 12
     */
    enum WapiPskType {
        /**
         * ASCII character type of WAPI pre-shared key.
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 12
         */
        WAPI_PSK_ASCII = 0,
        /**
         * HEX character type of WAPI pre-shared key.
         *
         * @syscap SystemCapability.Communication.WiFi.Core
         * @since 12
         */
        WAPI_PSK_HEX = 1
    }
    /**
     * Wi-Fi band type.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    enum WifiBandType {
        /**
         * Default.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_BAND_NONE,
        /**
         * Band 2.4G.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_BAND_2G,
        /**
         * Band 5G.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_BAND_5G,
        /**
         * Band 6G.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_BAND_6G,
        /**
         * Band 60G.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_BAND_60G
    }
    /**
     * Wi-Fi standard.
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    enum WifiStandard {
        /**
         * Undefined
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_UNDEFINED,
        /**
         * Wifi 802.11a
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_11A,
        /**
         * Wifi 802.11b
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_11B,
        /**
         * Wifi 802.11g
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_11G,
        /**
         * Wifi 802.11n
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_11N,
        /**
         * Wifi 802.11ac
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_11AC,
        /**
         * Wifi 802.11ax
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_11AX,
        /**
         * Wifi 802.11ad
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        WIFI_STANDARD_11AD
    }
    /**
     * Wi-Fi connection information.
     * @typedef WifiLinkedInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    /**
     * Wi-Fi connection information.
     * @typedef WifiLinkedInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @atomicservice
     * @since 12
     */
    interface WifiLinkedInfo {
        /**
         * The SSID of the Wi-Fi hotspot
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * The SSID of the Wi-Fi hotspot
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        ssid: string;
        /**
         * The BSSID of the Wi-Fi hotspot
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * The BSSID of the Wi-Fi hotspot
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        bssid: string;
        /**
         * The RSSI(dBm) of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * The RSSI(dBm) of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        rssi: number;
        /**
         * The frequency band of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        band: number;
        /**
         * The speed of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        linkSpeed: number;
        /**
         * The rx speed of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        rxLinkSpeed: number;
        /**
         * Max tx speed of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        maxSupportedTxLinkSpeed: number;
        /**
         * Max rx speed of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        maxSupportedRxLinkSpeed: number;
        /**
         * The frequency of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        /**
         * The frequency of a Wi-Fi access point.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @atomicservice
         * @since 12
         */
        frequency: number;
        /**
         * Whether the SSID of the access point (AP) of this Wi-Fi connection is hidden.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        isHidden: boolean;
        /**
         * Whether this Wi-Fi connection restricts the data volume.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        isRestricted: boolean;
        /**
         * Type of macAddress: 0 - real mac, 1 - random mac.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        macType: number;
        /**
         * The Wi-Fi MAC address of a device.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        macAddress: string;
        /**
         * The IP address of this Wi-Fi connection.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        ipAddress: number;
        /**
         * The state of this Wi-Fi connection.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        connState: ConnState;
        /**
         * Channel width of the connected hotspot.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        channelWidth: WifiChannelWidth;
        /**
         * Wifi standard of current connection.
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        wifiStandard: WifiStandard;
        /**
         * Supported wifi category
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        supportedWifiCategory: WifiCategory;
        /**
         * Whether the Wi-Fi hotspot is HiLink network.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        isHiLinkNetwork: boolean;
    }
    /**
     * Wi-Fi IP information.
     * @typedef IpInfo
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    interface IpInfo {
        /**
         * The IP address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        ipAddress: number;
        /**
         * The gateway of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        gateway: number;
        /**
         * The network mask of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        netmask: number;
        /**
         * The primary DNS server IP address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        primaryDns: number;
        /**
         * The secondary DNS server IP address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        secondDns: number;
        /**
         * The DHCP server IP address of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        serverIp: number;
        /**
         * The IP address lease duration of the Wi-Fi connection
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        leaseDuration: number;
    }
    /**
     * Wi-Fi IPv6 information.
     * @typedef Ipv6Info
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 10
     */
    interface Ipv6Info {
        /**
         * The link IPv6 address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        linkIpv6Address: string;
        /**
         * The global IPv6 address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        globalIpv6Address: string;
        /**
         * The rand Global IPv6 address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        randomGlobalIpv6Address: string;
        /**
         * The unique IPv6 address of the Wi-Fi connection
         * @type { ?string }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        uniqueIpv6Address?: string;
        /**
         * The rand unique IPv6 address of the Wi-Fi connection
         * @type { ?string }
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 12
         */
        randomUniqueIpv6Address?: string;
        /**
         * The gateway of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        gateway: string;
        /**
         * The network mask of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        netmask: string;
        /**
         * The primary DNS server IPV6 address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        primaryDNS: string;
        /**
         * The secondary DNS server IPV6 address of the Wi-Fi connection
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 10
         */
        secondDNS: string;
    }
    /**
     * The state of Wi-Fi connection enumeration.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.STA
     * @since 9
     */
    export enum ConnState {
        /**
         * The device is searching for an available AP.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        SCANNING,
        /**
         * The Wi-Fi connection is being set up.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        CONNECTING,
        /**
         * The Wi-Fi connection is being authenticated.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        AUTHENTICATING,
        /**
         * The IP address of the Wi-Fi connection is being obtained.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        OBTAINING_IPADDR,
        /**
         * The Wi-Fi connection has been set up.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        CONNECTED,
        /**
         * The Wi-Fi connection is being torn down.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        DISCONNECTING,
        /**
         * The Wi-Fi connection has been torn down.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        DISCONNECTED,
        /**
         * Failed to set up the Wi-Fi connection.
         *
         * @syscap SystemCapability.Communication.WiFi.STA
         * @since 9
         */
        UNKNOWN
    }
    /**
     * P2P device information.
     *
     * @typedef WifiP2pDevice
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    interface WifiP2pDevice {
        /**
         * Device name
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        deviceName: string;
        /**
         * Device mac address
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        deviceAddress: string;
        /**
         * Device mac address type
         * @type { ?DeviceAddressType }
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 10
         */
        deviceAddressType?: DeviceAddressType;
        /**
         * Primary device type
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        primaryDeviceType: string;
        /**
         * Device status
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        deviceStatus: P2pDeviceStatus;
        /**
         * Device group capabilities
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        groupCapabilities: number;
    }
    /**
     * P2P config.
     *
     * @typedef WifiP2PConfig
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    interface WifiP2PConfig {
        /**
         * Device mac address
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        deviceAddress: string;
        /**
         * Device mac address type
         * @type { ?DeviceAddressType }
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 10
         */
        deviceAddressType?: DeviceAddressType;
        /**
         * Group network ID. When creating a group, -1 indicates creates a temporary group,
         * -2: indicates creates a persistent group
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        netId: number;
        /**
         * The passphrase of this {@code WifiP2pConfig} instance
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        passphrase: string;
        /**
         * Group name
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        groupName: string;
        /**
         * Group owner band
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        goBand: GroupOwnerBand;
    }
    /**
     * P2P group information.
     *
     * @typedef WifiP2pGroupInfo
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    interface WifiP2pGroupInfo {
        /**
         * Indicates whether it is group owner
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        isP2pGo: boolean;
        /**
         * Group owner information
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        ownerInfo: WifiP2pDevice;
        /**
         * The group passphrase
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        passphrase: string;
        /**
         * Interface name
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        interface: string;
        /**
         * Group name
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        groupName: string;
        /**
         * Network ID
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        networkId: number;
        /**
         * Frequency
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        frequency: number;
        /**
         * Client list
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        clientDevices: WifiP2pDevice[];
        /**
         * Group owner IP address
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        goIpAddress: string;
    }
    /**
     * P2P connection status.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    enum P2pConnectState {
        /**
         * p2p is disconnected
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        DISCONNECTED = 0,
        /**
         * p2p is connected
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        CONNECTED = 1
    }
    /**
     * P2P linked information.
     *
     * @typedef WifiP2pLinkedInfo
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    interface WifiP2pLinkedInfo {
        /**
         * Connection status
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        connectState: P2pConnectState;
        /**
         * Indicates whether it is group owner
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        isGroupOwner: boolean;
        /**
         * Group owner address
         *
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        groupOwnerAddr: string;
    }
    /**
     * P2P device status.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    enum P2pDeviceStatus {
        /**
         * Indicate p2p device is connected.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        CONNECTED = 0,
        /**
         * Indicate p2p device is invited.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        INVITED = 1,
        /**
         * Indicate p2p device is failed.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        FAILED = 2,
        /**
         * Indicate p2p device is available.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        AVAILABLE = 3,
        /**
         * Indicate p2p device is unavailable.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        UNAVAILABLE = 4
    }
    /**
     * P2P group owner band.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @since 9
     */
    enum GroupOwnerBand {
        /**
         * default band.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        GO_BAND_AUTO = 0,
        /**
         * 2.4G band.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        GO_BAND_2GHZ = 1,
        /**
         * 5G band.
         * @syscap SystemCapability.Communication.WiFi.P2P
         * @since 9
         */
        GO_BAND_5GHZ = 2
    }
}
export default wifiManager;
