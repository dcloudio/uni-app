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
/**
 * Provides methods to operate or manage bluetooth socket connection.
 *
 * @namespace socket
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @since 10
 */
declare namespace socket {
    /**
     * Creates a Bluetooth server listening socket.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } name - Indicates the service name.
     * @param { SppOptions } options - Indicates the listen parameters.
     * @param { AsyncCallback<number> } callback - Callback used to return a server socket ID.
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
     */
    function sppListen(name: string, options: SppOptions, callback: AsyncCallback<number>): void;
    /**
     * Waits for a remote device to connect.
     *
     * @param { number } serverSocket - Indicates the server socket ID, returned by {@link sppListen}.
     * @param { AsyncCallback<number> } callback - Callback used to return a client socket ID.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth disabled.
     * @throws { BusinessError } 2900004 - Profile not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function sppAccept(serverSocket: number, callback: AsyncCallback<number>): void;
    /**
     * Connects to a remote device over the socket.
     *
     * @permission ohos.permission.ACCESS_BLUETOOTH
     * @param { string } deviceId - Indicates device ID. For example, "11:22:33:AA:BB:FF".
     * @param { SppOptions } options - Indicates the connect parameters {@link SppOptions}.
     * @param { AsyncCallback<number> } callback - Callback used to return a client socket ID.
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
     */
    function sppConnect(deviceId: string, options: SppOptions, callback: AsyncCallback<number>): void;
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
     * @since 10
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
     * @since 10
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
     * @since 10
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
     * @since 10
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
     * @since 10
     */
    function off(type: 'sppRead', clientSocket: number, callback?: Callback<ArrayBuffer>): void;
    /**
     * Describes the spp parameters.
     *
     * @typedef SppOptions
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface SppOptions {
        /**
         * Indicates the UUID in the SDP record.
         *
         * @type { string }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        uuid: string;
        /**
         * Indicates secure channel or not
         *
         * @type { boolean }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        secure: boolean;
        /**
         * Spp link type
         *
         * @type { SppType }
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        type: SppType;
    }
    /**
     * The enum of SPP type.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    enum SppType {
        /**
         * RFCOMM
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        SPP_RFCOMM
    }
}
export default socket;
