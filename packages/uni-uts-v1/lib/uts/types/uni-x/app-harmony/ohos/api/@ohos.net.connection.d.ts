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
 * @kit NetworkKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type http from './@ohos.net.http';
import type socket from './@ohos.net.socket';
/**
 * Provides interfaces to manage and use data networks.
 * @namespace connection
 * @syscap SystemCapability.Communication.NetManager.Core
 * @since 8
 */
/**
 * Provides interfaces to manage and use data networks.
 * @namespace connection
 * @syscap SystemCapability.Communication.NetManager.Core
 * @crossplatform
 * @since 10
 */
/**
 * Provides interfaces to manage and use data networks.
 * @namespace connection
 * @syscap SystemCapability.Communication.NetManager.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace connection {
    /**
     * Get an HTTP request task.
     * @syscap SystemCapability.Communication.NetStack
     * @since 8
     */
    /**
     * Get an HTTP request task.
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Get an HTTP request task.
     * @typedef { http.HttpRequest }
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    type HttpRequest = http.HttpRequest;
    /**
     * Get a TCPSocket object.
     * @syscap SystemCapability.Communication.NetStack
     * @since 8
     */
    /**
     * Get a TCPSocket object.
     * @typedef { socket.TCPSocket }
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    type TCPSocket = socket.TCPSocket;
    /**
     * Get a UDPSocket object.
     * @syscap SystemCapability.Communication.NetStack
     * @since 8
     */
    /**
     * Get a UDPSocket object.
     * @typedef { socket.UDPSocket }
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    type UDPSocket = socket.UDPSocket;
    /**
     * Create a network connection with optional netSpecifier and timeout.
     * @param { NetSpecifier } [netSpecifier] - Indicates the network specifier. See {@link NetSpecifier}.
     * @param { number } [timeout] - The time in milliseconds to attempt looking for a suitable network before
     * {@link NetConnection#netUnavailable} is called.
     * @returns { NetConnection } the NetConnection of the NetSpecifier.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Create a network connection with optional netSpecifier and timeout.
     * @param { NetSpecifier } [netSpecifier] - Indicates the network specifier. See {@link NetSpecifier}.
     * @param { number } [timeout] - The time in milliseconds to attempt looking for a suitable network before
     * {@link NetConnection#netUnavailable} is called.
     * @returns { NetConnection } the NetConnection of the NetSpecifier.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Create a network connection with optional netSpecifier and timeout.
     * @param { NetSpecifier } [netSpecifier] - Indicates the network specifier. See {@link NetSpecifier}.
     * @param { number } [timeout] - The time in milliseconds to attempt looking for a suitable network before
     * {@link NetConnection#netUnavailable} is called.
     * @returns { NetConnection } the NetConnection of the NetSpecifier.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createNetConnection(netSpecifier?: NetSpecifier, timeout?: number): NetConnection;
    /**
     * Obtains the data network that is activated by default.
     * To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<NetHandle> } callback - the callback of getDefaultNet.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Obtains the data network that is activated by default.
     * To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<NetHandle> } callback - the callback of getDefaultNet.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    function getDefaultNet(callback: AsyncCallback<NetHandle>): void;
    /**
     * Obtains the data network that is activated by default.
     * To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Promise<NetHandle> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Obtains the data network that is activated by default.
     * To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Promise<NetHandle> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    function getDefaultNet(): Promise<NetHandle>;
    /**
     * Obtains the data network that is activated by default.
     * To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { NetHandle } if the default network is not activated.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    /**
     * Obtains the data network that is activated by default.
     * To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { NetHandle } if the default network is not activated.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    function getDefaultNetSync(): NetHandle;
    /**
     * Obtains the list of data networks that are activated.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<Array<NetHandle>> } callback - the callback of getAllNets.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function getAllNets(callback: AsyncCallback<Array<NetHandle>>): void;
    /**
     * Obtains the list of data networks that are activated.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Promise<Array<NetHandle>> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function getAllNets(): Promise<Array<NetHandle>>;
    /**
     * Obtains the list of data networks that are activated.
     * To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Array<NetHandle> } Returns data networks that are activated.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    function getAllNetsSync(): Array<NetHandle>;
    /**
     * Queries the connection properties of a network.
     * This method requires the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the network to be queried.
     * @param { AsyncCallback<ConnectionProperties> } callback - the callback of getConnectionProperties.{@link ConnectionProperties}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function getConnectionProperties(netHandle: NetHandle, callback: AsyncCallback<ConnectionProperties>): void;
    /**
     * Queries the connection properties of a network.
     * This method requires the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the network to be queried.
     * @returns { Promise<ConnectionProperties> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function getConnectionProperties(netHandle: NetHandle): Promise<ConnectionProperties>;
    /**
     * Queries the connection properties of a network.
     * This method requires the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the network to be queried.
     * @returns { ConnectionProperties } Returns the connection properties of a network.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    function getConnectionPropertiesSync(netHandle: NetHandle): ConnectionProperties;
    /**
     * Obtains {@link NetCapabilities} of a {@link NetHandle} object.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the handle. See {@link NetHandle}.
     * @param { AsyncCallback<NetCapabilities> } callback - the callback of getNetCapabilities.{@link NetCapabilities}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Obtains {@link NetCapabilities} of a {@link NetHandle} object.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the handle. See {@link NetHandle}.
     * @param { AsyncCallback<NetCapabilities> } callback - the callback of getNetCapabilities.{@link NetCapabilities}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    function getNetCapabilities(netHandle: NetHandle, callback: AsyncCallback<NetCapabilities>): void;
    /**
     * Obtains {@link NetCapabilities} of a {@link NetHandle} object.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the handle. See {@link NetHandle}.
     * @returns { Promise<NetCapabilities> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Obtains {@link NetCapabilities} of a {@link NetHandle} object.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the handle. See {@link NetHandle}.
     * @returns { Promise<NetCapabilities> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    function getNetCapabilities(netHandle: NetHandle): Promise<NetCapabilities>;
    /**
     * Obtains {@link NetCapabilities} of a {@link NetHandle} object.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the handle. See {@link NetHandle}.
     * @returns { NetCapabilities } Returns the connection capabilities of a network.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    /**
     * Obtains {@link NetCapabilities} of a {@link NetHandle} object.
     * To invoke this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { NetHandle } netHandle - Indicates the handle. See {@link NetHandle}.
     * @returns { NetCapabilities } Returns the connection capabilities of a network.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    function getNetCapabilitiesSync(netHandle: NetHandle): NetCapabilities;
    /**
     * Checks whether data traffic usage on the current network is metered.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<boolean> } callback - Returns {@code true} if data traffic usage on the current network is metered;
     * returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    function isDefaultNetMetered(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether data traffic usage on the current network is metered.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Promise<boolean> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    function isDefaultNetMetered(): Promise<boolean>;
    /**
     * Checks whether data traffic usage on the current network is metered.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { boolean } Returns true if the current network is metered, else returns false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    function isDefaultNetMeteredSync(): boolean;
    /**
     * Checks whether the default data network is activated.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<boolean> } callback - Returns {@code true} if the default data network is activated;
     * returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Checks whether the default data network is activated.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @param { AsyncCallback<boolean> } callback - Returns {@code true} if the default data network is activated;
     * returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    function hasDefaultNet(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the default data network is activated.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Checks whether the default data network is activated.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    function hasDefaultNet(): Promise<boolean>;
    /**
     * Checks whether the default data network is activated.
     * @permission ohos.permission.GET_NETWORK_INFO
     * @returns { boolean } Returns true if the default data network is activated, else returns false.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    function hasDefaultNetSync(): boolean;
    /**
     * Reports the network state is connected.
     * @permission ohos.permission.GET_NETWORK_INFO and ohos.permission.INTERNET
     * @param { NetHandle } netHandle - Indicates the network whose state is to be reported.
     * @param { AsyncCallback<void> } callback - the callback of reportNetConnected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function reportNetConnected(netHandle: NetHandle, callback: AsyncCallback<void>): void;
    /**
     * Reports the network state is connected.
     * @permission ohos.permission.GET_NETWORK_INFO and ohos.permission.INTERNET
     * @param { NetHandle } netHandle - Indicates the network whose state is to be reported.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function reportNetConnected(netHandle: NetHandle): Promise<void>;
    /**
     * Reports the network state is disconnected.
     * @permission ohos.permission.GET_NETWORK_INFO and ohos.permission.INTERNET
     * @param { NetHandle } netHandle - Indicates the network whose state is to be reported.
     * @param { AsyncCallback<void> } callback - the callback of reportNetDisconnected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function reportNetDisconnected(netHandle: NetHandle, callback: AsyncCallback<void>): void;
    /**
     * Reports the network state is disconnected.
     * @permission ohos.permission.GET_NETWORK_INFO and ohos.permission.INTERNET
     * @param { NetHandle } netHandle - Indicates the network whose state is to be reported.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function reportNetDisconnected(netHandle: NetHandle): Promise<void>;
    /**
     * Resolves the host name to obtain all IP addresses based on the default data network.
     * @permission ohos.permission.INTERNET
     * @param { string } host - Indicates the host name or the domain.
     * @param { AsyncCallback<Array<NetAddress>> } callback - Returns the NetAddress list.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function getAddressesByName(host: string, callback: AsyncCallback<Array<NetAddress>>): void;
    /**
     * Resolves the host name to obtain all IP addresses based on the default data network.
     * @permission ohos.permission.INTERNET
     * @param { string } host - Indicates the host name or the domain.
     * @returns { Promise<Array<NetAddress>> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    function getAddressesByName(host: string): Promise<Array<NetAddress>>;
    /**
     * Obtains the {@link NetHandle} bound to a process using {@link setAppNet}.
     * @param { AsyncCallback<NetHandle> } callback - Returns the {@link NetHandle} bound to the process;
     * returns {@code null} if no {@link NetHandle} is bound to the process.For details, see {@link NetHandle}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    function getAppNet(callback: AsyncCallback<NetHandle>): void;
    /**
     * Obtains the {@link NetHandle} bound to a process using {@link setAppNet}.
     * @returns { Promise<NetHandle> } the promise returned by the function.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    function getAppNet(): Promise<NetHandle>;
    /**
     * Obtains the {@link NetHandle} bound to a process using {@link setAppNet}.
     * @returns { NetHandle } Returns the {@link NetHandle} bound to a process using {@link setAppNet}.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    function getAppNetSync(): NetHandle;
    /**
     * Binds a process to {@code NetHandle}.
     * <p>All the sockets created from the process will be bound to the {@code NetHandle},
     * and the resolution of all host names will be managed by the {@code NetHandle}.</p>
     * @permission ohos.permission.INTERNET
     * @param { NetHandle } netHandle - Indicates the handle. For details, see {@link NetHandle}.
     * @param { AsyncCallback<void> } callback - the callback of setAppNet.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    function setAppNet(netHandle: NetHandle, callback: AsyncCallback<void>): void;
    /**
     * Binds a process to {@code NetHandle}.
     * <p>All the sockets created from the process will be bound to the {@code NetHandle},
     * and the resolution of all host names will be managed by the {@code NetHandle}.</p>
     * @permission ohos.permission.INTERNET
     * @param { NetHandle } netHandle - Indicates the handle. For details, see {@link NetHandle}.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 9
     */
    function setAppNet(netHandle: NetHandle): Promise<void>;
    /**
     * Obtains the default {@link HttpProxy} proxy settings.
     *
     * If an application level proxy is set, the application level proxy parameters are returned.
     * If a global proxy is set, the global proxy parameters are returned.
     * If the process is bound to a {@link NetHandle} using {@link setAppNet}, the {@link NetHandle} proxy settings are returned.
     * In other cases, the proxy settings of default network are returned.
     *
     * @param { AsyncCallback<HttpProxy> } callback - Returns the default {@link HttpProxy} settings.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    function getDefaultHttpProxy(callback: AsyncCallback<HttpProxy>): void;
    /**
     * Obtains the default {@link HttpProxy} proxy settings.
     *
     * If an application level proxy is set, the application level proxy parameters are returned.
     * If a global proxy is set, the global proxy parameters are returned.
     * If the process is bound to a {@link NetHandle} using {@link setAppNet}, the {@link NetHandle} proxy settings are returned.
     * In other cases, the proxy settings of default network are returned.
     *
     * @returns { Promise<HttpProxy> } the promise returned by the function.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    function getDefaultHttpProxy(): Promise<HttpProxy>;
    /**
     * Set application level http proxy {@link HttpProxy}.
     * @param { HttpProxy } httpProxy - Indicates the application level proxy settings. For details, see {@link HttpProxy}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid http proxy.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    function setAppHttpProxy(httpProxy: HttpProxy): void;
    /**
     * Add a custom {@link host} and corresponding {@link ip} mapping for current application.
     * @permission ohos.permission.INTERNET
     * @param { string } host - Indicates the host name or the domain.
     * @param { Array<string> } ip - List of IP addresses mapped to the host name.
     * @param { AsyncCallback<void> } callback - Returns the callback of addCustomDnsRule.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    function addCustomDnsRule(host: string, ip: Array<string>, callback: AsyncCallback<void>): void;
    /**
     * Add a custom {@link host} and corresponding {@link ip} mapping for current application.
     * @permission ohos.permission.INTERNET
     * @param { string } host - Indicates the host name or the domain.
     * @param { Array<string> } ip - List of IP addresses mapped to the host name.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    function addCustomDnsRule(host: string, ip: Array<string>): Promise<void>;
    /**
     * Remove the custom DNS rule of the {@link host} for current application.
     * @permission ohos.permission.INTERNET
     * @param { string } host - Indicates the host name or the domain.
     * @param { AsyncCallback<void> } callback - Returns the callback of removeCustomDnsRule.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    function removeCustomDnsRule(host: string, callback: AsyncCallback<void>): void;
    /**
     * Remove the custom DNS rule of the {@link host} for current application.
     * @permission ohos.permission.INTERNET
     * @param { string } host - Indicates the host name or the domain.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    function removeCustomDnsRule(host: string): Promise<void>;
    /**
     * Clear all custom DNS rules for current application.
     * @permission ohos.permission.INTERNET
     * @param { AsyncCallback<void> } callback - Returns the callback of clearCustomDnsRules.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    function clearCustomDnsRules(callback: AsyncCallback<void>): void;
    /**
     * Clear all custom DNS rules for current application.
     * @permission ohos.permission.INTERNET
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 2100001 - Invalid parameter value.
     * @throws { BusinessError } 2100002 - Failed to connect to the service.
     * @throws { BusinessError } 2100003 - System internal error.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    function clearCustomDnsRules(): Promise<void>;
    /**
     * Represents the network connection handle.
     * @interface NetConnection
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Represents the network connection handle.
     * @interface NetConnection
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Represents the network connection handle.
     * @interface NetConnection
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface NetConnection {
        /**
         * Registers a listener for netAvailable events.
         * @param { 'netAvailable' } type - Indicates Event name.
         * @param { Callback<NetHandle> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Registers a listener for netAvailable events.
         * @param { 'netAvailable' } type - Indicates Event name.
         * @param { Callback<NetHandle> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Registers a listener for netAvailable events.
         * @param { 'netAvailable' } type - Indicates Event name.
         * @param { Callback<NetHandle> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'netAvailable', callback: Callback<NetHandle>): void;
        /**
         * Registers a listener for netBlockStatusChange events.
         * @param { 'netBlockStatusChange' } type - Indicates Event name.
         * @param { Callback<{ netHandle: NetHandle, blocked: boolean }> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Registers a listener for netBlockStatusChange events.
         * @param { 'netBlockStatusChange' } type - Indicates Event name.
         * @param { Callback<NetBlockStatusInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 11
         */
        on(type: 'netBlockStatusChange', callback: Callback<NetBlockStatusInfo>): void;
        /**
         * Registers a listener for **netCapabilitiesChange** events.
         * @param { 'netCapabilitiesChange' } type - Indicates Event name.
         * @param { Callback<NetCapabilityInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Registers a listener for **netCapabilitiesChange** events.
         * @param { 'netCapabilitiesChange' } type - Indicates Event name.
         * @param { Callback<NetCapabilityInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Registers a listener for **netCapabilitiesChange** events.
         * @param { 'netCapabilitiesChange' } type - Indicates Event name.
         * @param { Callback<NetCapabilityInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'netCapabilitiesChange', callback: Callback<NetCapabilityInfo>): void;
        /**
         * Registers a listener for netConnectionPropertiesChange events.
         * @param { 'netConnectionPropertiesChange' } type - Indicates Event name.
         * @param { Callback<{ netHandle: NetHandle, connectionProperties: ConnectionProperties }> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Registers a listener for netConnectionPropertiesChange events.
         * @param { 'netConnectionPropertiesChange' } type - Indicates Event name.
         * @param { Callback<NetConnectionPropertyInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 11
         */
        on(type: 'netConnectionPropertiesChange', callback: Callback<NetConnectionPropertyInfo>): void;
        /**
         * Registers a listener for **netLost** events.
         * @param { 'netLost' } type - Indicates Event name.
         * @param { Callback<NetHandle> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Registers a listener for **netLost** events.
         * @param { 'netLost' } type - Indicates Event name.
         * @param { Callback<NetHandle> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Registers a listener for **netLost** events.
         * @param { 'netLost' } type - Indicates Event name.
         * @param { Callback<NetHandle> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'netLost', callback: Callback<NetHandle>): void;
        /**
         * Registers a listener for netUnavailable events.
         * @param { 'netUnavailable' } type - Indicates Event name.
         * @param { Callback<void> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Registers a listener for netUnavailable events.
         * @param { 'netUnavailable' } type - Indicates Event name.
         * @param { Callback<void> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Registers a listener for netUnavailable events.
         * @param { 'netUnavailable' } type - Indicates Event name.
         * @param { Callback<void> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'netUnavailable', callback: Callback<void>): void;
        /**
         * Receives status change notifications of a specified network.
         * @permission ohos.permission.GET_NETWORK_INFO
         * @param { AsyncCallback<void> } callback - the callback of register.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @throws { BusinessError } 2101008 - The callback already exists.
         * @throws { BusinessError } 2101022 - The number of requests exceeded the maximum allowed.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Receives status change notifications of a specified network.
         * @permission ohos.permission.GET_NETWORK_INFO
         * @param { AsyncCallback<void> } callback - the callback of register.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @throws { BusinessError } 2101008 - The callback already exists.
         * @throws { BusinessError } 2101022 - The number of requests exceeded the maximum allowed.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Receives status change notifications of a specified network.
         * @permission ohos.permission.GET_NETWORK_INFO
         * @param { AsyncCallback<void> } callback - the callback of register.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @throws { BusinessError } 2101008 - The callback already exists.
         * @throws { BusinessError } 2101022 - The number of requests exceeded the maximum allowed.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        register(callback: AsyncCallback<void>): void;
        /**
         * Cancels listening for network status changes.
         * @param { AsyncCallback<void> } callback - the callback of unregister.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @throws { BusinessError } 2101007 - The callback does not exists.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Cancels listening for network status changes.
         * @param { AsyncCallback<void> } callback - the callback of unregister.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @throws { BusinessError } 2101007 - The callback does not exists.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Cancels listening for network status changes.
         * @param { AsyncCallback<void> } callback - the callback of unregister.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @throws { BusinessError } 2101007 - The callback does not exists.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Cancels listening for network status changes.
         * @param { AsyncCallback<void> } callback - the callback of unregister.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @throws { BusinessError } 2101007 - The callback does not exists.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        unregister(callback: AsyncCallback<void>): void;
    }
    /**
     * Provides an instance that bear data network capabilities.
     * @interface NetSpecifier
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Provides an instance that bear data network capabilities.
     * @interface NetSpecifier
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    export interface NetSpecifier {
        /**
         * The transmission capacity and support of the network's global proxy storage data network.
         * @type {NetCapabilities}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * The transmission capacity and support of the network's global proxy storage data network.
         * @type {NetCapabilities}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        netCapabilities: NetCapabilities;
        /**
         * Network identifier, the identifier for Wi Fi networks is "wifi", and the identifier for cellular networks is "simId1" (corresponding to SIM card 1).
         * @type {?string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Network identifier, the identifier for Wi Fi networks is "wifi", and the identifier for cellular networks is "simId1" (corresponding to SIM card 1).
         * @type {?string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        bearerPrivateIdentifier?: string;
    }
    /**
     * Receive information about changes in network capabilities.
     * @interface NetCapabilityInfo
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Receive information about changes in network capabilities.
     * @interface NetCapabilityInfo
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface NetCapabilityInfo {
        /**
         * Defines the handle of the data network.
         * @type { NetHandle }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Defines the handle of the data network.
         * @type { NetHandle }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        netHandle: NetHandle;
        /**
         * Defines the network capability set.
         * @type { NetCapabilities }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Defines the network capability set.
         * @type { NetCapabilities }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        netCap: NetCapabilities;
    }
    /**
     * Defines the handle of the data network.
     * @interface NetHandle
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Defines the handle of the data network.
     * @interface NetHandle
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the handle of the data network.
     * @interface NetHandle
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface NetHandle {
        /**
         * Network ID, a value of 0 means that there is no default network, and the other values must be greater than or equal to 100.
         * @type {number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Network ID, a value of 0 means that there is no default network, and the other values must be greater than or equal to 100.
         * @type {number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Network ID, a value of 0 means that there is no default network, and the other values must be greater than or equal to 100.
         * @type {number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        netId: number;
        /**
         * <p>Binds a TCPSocket or UDPSocket to the current network. All data flows from
         * the socket will use this network, without being subject to {@link setAppNet}.</p>
         * Before using this method, ensure that the socket is disconnected.
         * @param { TCPSocket | UDPSocket } socketParam - Indicates the TCPSocket or UDPSocket object.
         * @param { AsyncCallback<void> } callback - the callback of bindSocket.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100001 - Invalid parameter value.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 9
         */
        bindSocket(socketParam: TCPSocket | UDPSocket, callback: AsyncCallback<void>): void;
        /**
         * <p>Binds a TCPSocket or UDPSocket to the current network. All data flows from
         * the socket will use this network, without being subject to {@link setAppNet}.</p>
         * Before using this method, ensure that the socket is disconnected.
         * @param { TCPSocket | UDPSocket } socketParam - Indicates the TCPSocket or UDPSocket object.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100001 - Invalid parameter value.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 9
         */
        bindSocket(socketParam: TCPSocket | UDPSocket): Promise<void>;
        /**
         * Resolves a host name to obtain all IP addresses based on the specified NetHandle.
         * @permission ohos.permission.INTERNET
         * @param { string } host - Indicates the host name or the domain.
         * @param { AsyncCallback<Array<NetAddress>> } callback - the callback of getAddressesByName.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100001 - Invalid parameter value.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        getAddressesByName(host: string, callback: AsyncCallback<Array<NetAddress>>): void;
        /**
         * Resolves a host name to obtain all IP addresses based on the specified NetHandle.
         * @permission ohos.permission.INTERNET
         * @param { string } host - Indicates the host name or the domain.
         * @returns { Promise<Array<NetAddress>> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100001 - Invalid parameter value.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        getAddressesByName(host: string): Promise<Array<NetAddress>>;
        /**
         * Resolves a host name to obtain the first IP address based on the specified NetHandle.
         * @permission ohos.permission.INTERNET
         * @param { string } host - Indicates the host name or the domain.
         * @param { AsyncCallback<NetAddress> } callback - the callback of getAddressByName.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100001 - Invalid parameter value.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        getAddressByName(host: string, callback: AsyncCallback<NetAddress>): void;
        /**
         * Resolves a host name to obtain the first IP address based on the specified NetHandle.
         * @permission ohos.permission.INTERNET
         * @param { string } host - Indicates the host name or the domain.
         * @returns { Promise<NetAddress> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 2100001 - Invalid parameter value.
         * @throws { BusinessError } 2100002 - Failed to connect to the service.
         * @throws { BusinessError } 2100003 - System internal error.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        getAddressByName(host: string): Promise<NetAddress>;
    }
    /**
     * Defines the network capability set.
     * @interface NetCapabilities
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Defines the network capability set.
     * @interface NetCapabilities
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the network capability set.
     * @interface NetCapabilities
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface NetCapabilities {
        /**
         * Uplink (device-to-network) bandwidth.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        linkUpBandwidthKbps?: number;
        /**
         * Downstream (network-to-device) bandwidth.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        linkDownBandwidthKbps?: number;
        /**
         * Network-specific capabilities.
         * @type {?Array<NetCap>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Network-specific capabilities.
         * @type {?Array<NetCap>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        networkCap?: Array<NetCap>;
        /**
         * Network type.
         * @type {Array<NetBearType>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Network type.
         * @type {Array<NetBearType>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Network type.
         * @type {Array<NetBearType>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        bearerTypes: Array<NetBearType>;
    }
    /**
     * Get information about network connections.
     * @interface NetConnectionPropertyInfo
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    export interface NetConnectionPropertyInfo {
        /**
         * Defines the handle of the data network.
         * @type { NetHandle }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 11
         */
        netHandle: NetHandle;
        /**
         * Defines the network connection properties.
         * @type { ConnectionProperties }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 11
         */
        connectionProperties: ConnectionProperties;
    }
    /**
     * Get network status information.
     * @interface NetBlockStatusInfo
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 11
     */
    export interface NetBlockStatusInfo {
        /**
         * Defines the handle of the data network.
         * @type { NetHandle }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 11
         */
        netHandle: NetHandle;
        /**
         * Check whether the current state is blocked.
         * @type { boolean }
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 11
         */
        blocked: boolean;
    }
    /**
     * Defines the network capability.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Defines the network capability.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    export enum NetCap {
        /**
         * Indicates that the network can access the carrier's MMSC to send and receive multimedia messages.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network can access the carrier's MMSC to send and receive multimedia messages.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        NET_CAPABILITY_MMS = 0,
        /**
         * Indicates that the network traffic is not metered.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network traffic is not metered.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        NET_CAPABILITY_NOT_METERED = 11,
        /**
         * Indicates that the network can access the Internet.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network can access the Internet.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        NET_CAPABILITY_INTERNET = 12,
        /**
         * Indicates that the network does not use a VPN.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network does not use a VPN.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        NET_CAPABILITY_NOT_VPN = 15,
        /**
         * Indicates that the network is available.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network is available.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        NET_CAPABILITY_VALIDATED = 16,
        /**
         * Indicates that the network is portal.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 12
         */
        NET_CAPABILITY_PORTAL = 17
    }
    /**
     * Enumerates network types.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Enumerates network types.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Enumerates network types.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum NetBearType {
        /**
         * Indicates that the network is based on a cellular network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network is based on a cellular network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that the network is based on a cellular network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        BEARER_CELLULAR = 0,
        /**
         * Indicates that the network is based on a Wi-Fi network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network is based on a Wi-Fi network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that the network is based on a Wi-Fi network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        BEARER_WIFI = 1,
        /**
         * Indicates that the network is an Ethernet network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Indicates that the network is an Ethernet network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        BEARER_ETHERNET = 3,
        /**
         * Indicates that the network is based on a VPN network.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 12
         */
        BEARER_VPN = 4
    }
    /**
     * Defines the network connection properties.
     * @interface ConnectionProperties
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    export interface ConnectionProperties {
        /**
         * Network card name.
         * @type {string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        interfaceName: string;
        /**
         * Domain. The default value is "".
         * @type {string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        domains: string;
        /**
         * Link information.
         * @type {Array<LinkAddress>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        linkAddresses: Array<LinkAddress>;
        /**
         * Network address, refer to [NetAddress].
         * @type {Array<NetAddress>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        dnses: Array<NetAddress>;
        /**
         * Routing information.
         * @type {Array<RouteInfo>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        routes: Array<RouteInfo>;
        /**
         * Maximum transmission unit.
         * @type {number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        mtu: number;
    }
    /**
     * Defines network route information.
     * @interface RouteInfo
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    export interface RouteInfo {
        /**
         * Network card name.
         * @type {string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        interface: string;
        /**
         * Destination Address
         * @type {LinkAddress}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        destination: LinkAddress;
        /**
         * Gateway address.
         * @type {NetAddress}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        gateway: NetAddress;
        /**
         * Whether a gateway is present.
         * @type {boolean}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        hasGateway: boolean;
        /**
         * Whether the route is the default route.
         * @type {boolean}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        isDefaultRoute: boolean;
    }
    /**
     * Defines network link information.
     * @interface LinkAddress
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    export interface LinkAddress {
        /**
         * Link address.
         * @type {NetAddress}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        address: NetAddress;
        /**
         * The length of the link address prefix.
         * @type {number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        prefixLength: number;
    }
    /**
     * Defines a network address.
     * @interface NetAddress
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 8
     */
    /**
     * Defines a network address.
     * @interface NetAddress
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 12
     */
    export interface NetAddress {
        /**
         * Network address.
         * @type {string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Network address.
         * @type {string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 12
         */
        address: string;
        /**
         * Address family identifier. The value is 1 for IPv4 and 2 for IPv6. The default value is 1.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Address family identifier. The value is 1 for IPv4 and 2 for IPv6. The default value is 1.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 12
         */
        family?: number;
        /**
         * Port number. The value ranges from 0 to 65535.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 8
         */
        /**
         * Port number. The value ranges from 0 to 65535.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 12
         */
        port?: number;
    }
    /**
     * Network Global Proxy Configuration Information.
     * @interface HttpProxy
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 10
     */
    /**
     * Network Global Proxy Configuration Information.
     * @interface HttpProxy
     * @syscap SystemCapability.Communication.NetManager.Core
     * @atomicservice
     * @since 11
     */
    export interface HttpProxy {
        /**
         * Proxy server host name.
         * @type {string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 10
         */
        /**
         * Proxy server host name.
         * @type {string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        host: string;
        /**
         * Host port.
         * @type {number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 10
         */
        /**
         * Host port.
         * @type {number}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        port: number;
        /**
         * Http proxy username.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 12
         */
        username?: string;
        /**
         * Http proxy password.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 12
         */
        password?: string;
        /**
         * Do not use a blocking list for proxy servers.
         * @type {Array<string>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 10
         */
        /**
         * Do not use a blocking list for proxy servers.
         * @type {Array<string>}
         * @syscap SystemCapability.Communication.NetManager.Core
         * @atomicservice
         * @since 11
         */
        exclusionList: Array<string>;
    }
}
export default connection;
