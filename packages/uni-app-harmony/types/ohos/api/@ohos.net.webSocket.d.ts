/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import type { AsyncCallback, ErrorCallback, Callback } from './@ohos.base';
import type connection from './@ohos.net.connection';
/**
 * Provides WebSocket APIs.
 * @namespace webSocket
 * @syscap SystemCapability.Communication.NetStack
 * @since 6
 */
/**
 * Provides WebSocket APIs.
 * @namespace webSocket
 * @syscap SystemCapability.Communication.NetStack
 * @crossplatform
 * @since 10
 */
/**
 * Provides WebSocket APIs.
 * @namespace webSocket
 * @syscap SystemCapability.Communication.NetStack
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace webSocket {
    /**
     * @typedef { connection.HttpProxy }
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 12
     */
    type HttpProxy = connection.HttpProxy;
    /**
     * Creates a web socket connection.
     * @returns { WebSocket } the WebSocket of the createWebSocket.
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Creates a web socket connection.
     * @returns { WebSocket } the WebSocket of the createWebSocket.
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Creates a web socket connection.
     * @returns { WebSocket } the WebSocket of the createWebSocket.
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createWebSocket(): WebSocket;
    /**
     * Defines the optional parameters carried in the request for establishing a WebSocket connection.
     * @interface WebSocketRequestOptions
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Defines the optional parameters carried in the request for establishing a WebSocket connection.
     * @interface WebSocketRequestOptions
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the optional parameters carried in the request for establishing a WebSocket connection.
     * @interface WebSocketRequestOptions
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface WebSocketRequestOptions {
        /**
         * HTTP request header.
         * @type {?Object}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * HTTP request header.
         * @type {?Object}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * HTTP request header.
         * @type {?Object}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        header?: Object;
        /**
         * File path for client cert.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * File path for client cert.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        caPath?: string;
        /**
         * Client cert.
         * @type {?ClientCert}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Client cert.
         * @type {?ClientCert}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        clientCert?: ClientCert;
        /**
         * HTTP proxy configuration. Use 'system' if this filed is not set.
         * @type {?ProxyConfiguration}
         * @syscap SystemCapability.Communication.NetStack
         * @since 12
         */
        proxy?: ProxyConfiguration;
        /**
         * Self defined protocol.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 12
         */
        protocol?: string;
    }
    /**
     * HTTP proxy configuration.
     * system: means that use system proxy configuration.
     * no-proxy: means do not use proxy.
     * object of @type {connection.HttpProxy} means providing custom proxy settings
     * @typedef { 'system' | 'no-proxy' | HttpProxy }
     * @syscap SystemCapability.Communication.NetStack
     * @since 12
     */
    export type ProxyConfiguration = 'system' | 'no-proxy' | HttpProxy;
    /**
     * The clientCert field of the client certificate, which includes three attributes:
     * client certificate (certPath) and only support PEM format, certificate private key (keyPath),
     * and passphrase (keyPassword).
     * @interface ClientCert
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    /**
     * The clientCert field of the client certificate, which includes three attributes:
     * client certificate (certPath) and only support PEM format, certificate private key (keyPath),
     * and passphrase (keyPassword).
     * @interface ClientCert
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 12
     */
    export interface ClientCert {
        /**
         * The path to the client certificate file.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * The path to the client certificate file.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        certPath: string;
        /**
         * The path of the client certificate private key file.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * The path of the client certificate private key file.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        keyPath: string;
        /**
         * Client certificate password.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Client certificate password.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        keyPassword?: string;
    }
    /**
     * Defines the optional parameters carried in the request for closing a WebSocket connection.
     * @interface WebSocketCloseOptions
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Defines the optional parameters carried in the request for closing a WebSocket connection.
     * @interface WebSocketCloseOptions
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the optional parameters carried in the request for closing a WebSocket connection.
     * @interface WebSocketCloseOptions
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface WebSocketCloseOptions {
        /**
         * Error code.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Error code.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Error code.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        code?: number;
        /**
         * Error cause.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Error cause.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Error cause.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        reason?: string;
    }
    /**
     * The result for closing a WebSocket connection.
     * @interface CloseResult
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * The result for closing a WebSocket connection.
     * @interface CloseResult
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface CloseResult {
        /**
         * Error code.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Error code.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        code: number;
        /**
         * Error cause.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Error cause.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        reason: string;
    }
    /**
     * HTTP response headers.
     * @typedef { object }
     * @syscap SystemCapability.Communication.NetStack
     * @since 12
     */
    export type ResponseHeaders = {
        [k: string]: string | string[] | undefined;
    };
    /**
     * <p>Defines a WebSocket object. Before invoking WebSocket APIs,
     * you need to call webSocket.createWebSocket to create a WebSocket object.</p>
     * @interface WebSocket
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * <p>Defines a WebSocket object. Before invoking WebSocket APIs,
     * you need to call webSocket.createWebSocket to create a WebSocket object.</p>
     * @interface WebSocket
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * <p>Defines a WebSocket object. Before invoking WebSocket APIs,
     * you need to call webSocket.createWebSocket to create a WebSocket object.</p>
     * @interface WebSocket
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface WebSocket {
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for establishing a WebSocket connection.
         * @param { AsyncCallback<boolean> } callback - the callback of connect.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { AsyncCallback<boolean> } callback - the callback of connect.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { AsyncCallback<boolean> } callback - the callback of connect.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        connect(url: string, callback: AsyncCallback<boolean>): void;
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { WebSocketRequestOptions } options - Optional parameters {@link WebSocketRequestOptions}.
         * @param { AsyncCallback<boolean> } callback - the callback of connect.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { WebSocketRequestOptions } options - Optional parameters {@link WebSocketRequestOptions}.
         * @param { AsyncCallback<boolean> } callback - the callback of connect.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { WebSocketRequestOptions } options - Optional parameters {@link WebSocketRequestOptions}.
         * @param { AsyncCallback<boolean> } callback - the callback of connect.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        connect(url: string, options: WebSocketRequestOptions, callback: AsyncCallback<boolean>): void;
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { WebSocketRequestOptions } options - Optional parameters {@link WebSocketRequestOptions}.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { WebSocketRequestOptions } options - Optional parameters {@link WebSocketRequestOptions}.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Initiates a WebSocket request to establish a WebSocket connection to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url URL for establishing a WebSocket connection.
         * @param { WebSocketRequestOptions } options - Optional parameters {@link WebSocketRequestOptions}.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        connect(url: string, options?: WebSocketRequestOptions): Promise<boolean>;
        /**
         * Sends data through a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { string | ArrayBuffer } data - Data to send. It can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { AsyncCallback<boolean> } callback - the callback of send.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Sends data through a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { string | ArrayBuffer } data - Data to send. It can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { AsyncCallback<boolean> } callback - the callback of send.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Sends data through a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { string | ArrayBuffer } data - Data to send. It can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { AsyncCallback<boolean> } callback - the callback of send.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        send(data: string | ArrayBuffer, callback: AsyncCallback<boolean>): void;
        /**
         * Sends data through a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { string | ArrayBuffer } data - Data to send. It can be a string(API 6) or an ArrayBuffer(API 8).
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Sends data through a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { string | ArrayBuffer } data - Data to send. It can be a string(API 6) or an ArrayBuffer(API 8).
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Sends data through a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { string | ArrayBuffer } data - Data to send. It can be a string(API 6) or an ArrayBuffer(API 8).
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        send(data: string | ArrayBuffer): Promise<boolean>;
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback - the callback of close.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback - the callback of close.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { AsyncCallback<boolean> } callback - the callback of close.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        close(callback: AsyncCallback<boolean>): void;
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { WebSocketCloseOptions } options - Optional parameters {@link WebSocketCloseOptions}.
         * @param { AsyncCallback<boolean> } callback - the callback of close.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { WebSocketCloseOptions } options - Optional parameters {@link WebSocketCloseOptions}.
         * @param { AsyncCallback<boolean> } callback - the callback of close.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { WebSocketCloseOptions } options - Optional parameters {@link WebSocketCloseOptions}.
         * @param { AsyncCallback<boolean> } callback - the callback of close.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        close(options: WebSocketCloseOptions, callback: AsyncCallback<boolean>): void;
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { WebSocketCloseOptions } options - Optional parameters {@link WebSocketCloseOptions}.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { WebSocketCloseOptions } options - Optional parameters {@link WebSocketCloseOptions}.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Closes a WebSocket connection.
         * @permission ohos.permission.INTERNET
         * @param { WebSocketCloseOptions } options - Optional parameters {@link WebSocketCloseOptions}.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        close(options?: WebSocketCloseOptions): Promise<boolean>;
        /**
         * Enables listening for the open events of a WebSocket connection.
         * @param { 'open' } type - event indicating that a WebSocket connection has been opened.
         * @param { AsyncCallback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Enables listening for the open events of a WebSocket connection.
         * @param { 'open' } type - event indicating that a WebSocket connection has been opened.
         * @param { AsyncCallback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Enables listening for the open events of a WebSocket connection.
         * @param { 'open' } type - event indicating that a WebSocket connection has been opened.
         * @param { AsyncCallback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'open', callback: AsyncCallback<Object>): void;
        /**
         * Cancels listening for the open events of a WebSocket connection.
         * @param { 'open' } type - event indicating that a WebSocket connection has been opened.
         * @param { AsyncCallback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Cancels listening for the open events of a WebSocket connection.
         * @param { 'open' } type - event indicating that a WebSocket connection has been opened.
         * @param { AsyncCallback<Object> } callback the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Cancels listening for the open events of a WebSocket connection.
         * @param { 'open' } type - event indicating that a WebSocket connection has been opened.
         * @param { AsyncCallback<Object> } callback the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        off(type: 'open', callback?: AsyncCallback<Object>): void;
        /**
         * Enables listening for the message events of a WebSocket connection.
         * data in AsyncCallback can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { 'message' } type - event indicating that a message has been received from the server.
         * @param { AsyncCallback<string | ArrayBuffer> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Enables listening for the message events of a WebSocket connection.
         * data in AsyncCallback can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { 'message' } type - event indicating that a message has been received from the server.
         * @param { AsyncCallback<string | ArrayBuffer> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Enables listening for the message events of a WebSocket connection.
         * data in AsyncCallback can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { 'message' } type - event indicating that a message has been received from the server.
         * @param { AsyncCallback<string | ArrayBuffer> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'message', callback: AsyncCallback<string | ArrayBuffer>): void;
        /**
         * Cancels listening for the message events of a WebSocket connection.
         * data in AsyncCallback can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { 'message' } type - event indicating that a message has been received from the server.
         * @param { AsyncCallback<string | ArrayBuffer> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Cancels listening for the message events of a WebSocket connection.
         * data in AsyncCallback can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { 'message' } type - event indicating that a message has been received from the server.
         * @param { AsyncCallback<string | ArrayBuffer> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Cancels listening for the message events of a WebSocket connection.
         * data in AsyncCallback can be a string(API 6) or an ArrayBuffer(API 8).
         * @param { 'message' } type - event indicating that a message has been received from the server.
         * @param { AsyncCallback<string | ArrayBuffer> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        off(type: 'message', callback?: AsyncCallback<string | ArrayBuffer>): void;
        /**
         * Enables listening for the close events of a WebSocket connection.
         * @param { 'close' } type - event indicating that a WebSocket connection has been closed.
         * @param { AsyncCallback<CloseResult> } callback - the callback used to return the result.
         * <br>close indicates the close error code and reason indicates the error code description.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Enables listening for the close events of a WebSocket connection.
         * @param { 'close' } type - event indicating that a WebSocket connection has been closed.
         * @param { AsyncCallback<CloseResult> } callback - the callback used to return the result.
         * <br>close indicates the close error code and reason indicates the error code description.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Enables listening for the close events of a WebSocket connection.
         * @param { 'close' } type - event indicating that a WebSocket connection has been closed.
         * @param { AsyncCallback<CloseResult> } callback - the callback used to return the result.
         * <br>close indicates the close error code and reason indicates the error code description.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'close', callback: AsyncCallback<CloseResult>): void;
        /**
         * Cancels listening for the close events of a WebSocket connection.
         * @param { 'close' } type - event indicating that a WebSocket connection has been closed.
         * @param { AsyncCallback<CloseResult> } callback - the callback used to return the result.
         * <br>close indicates the close error code and reason indicates the error code description.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Cancels listening for the close events of a WebSocket connection.
         * @param { 'close' } type - event indicating that a WebSocket connection has been closed.
         * @param { AsyncCallback<CloseResult> } callback - the callback used to return the result.
         * <br>close indicates the close error code and reason indicates the error code description.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Cancels listening for the close events of a WebSocket connection.
         * @param { 'close' } type - event indicating that a WebSocket connection has been closed.
         * @param { AsyncCallback<CloseResult> } callback - the callback used to return the result.
         * <br>close indicates the close error code and reason indicates the error code description.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        off(type: 'close', callback?: AsyncCallback<CloseResult>): void;
        /**
         * Enables listening for the error events of a WebSocket connection.
         * @param { 'error' } type - event indicating the WebSocket connection has encountered an error.
         * @param { ErrorCallback } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Enables listening for the error events of a WebSocket connection.
         * @param { 'error' } type - event indicating the WebSocket connection has encountered an error.
         * @param { ErrorCallback } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Enables listening for the error events of a WebSocket connection.
         * @param { 'error' } type - event indicating the WebSocket connection has encountered an error.
         * @param { ErrorCallback } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Cancels listening for the error events of a WebSocket connection.
         * @param { 'error' } type - event indicating the WebSocket connection has encountered an error.
         * @param { ErrorCallback } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Cancels listening for the error events of a WebSocket connection.
         * @param { 'error' } type - event indicating the WebSocket connection has encountered an error.
         * @param { ErrorCallback } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Cancels listening for the error events of a WebSocket connection.
         * @param { 'error' } type - event indicating the WebSocket connection has encountered an error.
         * @param { ErrorCallback } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Enables listening for receiving data ends events of a WebSocket connection.
         * @param { 'dataEnd' } type - event indicating the WebSocket connection has received data ends.
         * @param { Callback<void> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Enables listening for receiving data ends events of a WebSocket connection.
         * @param { 'dataEnd' } type - event indicating the WebSocket connection has received data ends.
         * @param { Callback<void> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        on(type: 'dataEnd', callback: Callback<void>): void;
        /**
         * Cancels listening for receiving data ends events of a WebSocket connection.
         * @param { 'dataEnd' } type - event indicating the WebSocket connection has received data ends.
         * @param { Callback<void> } [ callback ] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Cancels listening for receiving data ends events of a WebSocket connection.
         * @param { 'dataEnd' } type - event indicating the WebSocket connection has received data ends.
         * @param { Callback<void> } [ callback ] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        off(type: 'dataEnd', callback?: Callback<void>): void;
        /**
         * Registers an observer for HTTP Response Header events.
         * @param { 'headerReceive'} type - Indicates Event name.
         * @param { Callback<ResponseHeaders> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 12
         */
        on(type: 'headerReceive', callback: Callback<ResponseHeaders>): void;
        /**
         * Unregisters the observer for HTTP Response Header events.
         * @param { 'headerReceive' } type - Indicates Event name.
         * @param { Callback<ResponseHeaders> } [callback] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 12
         */
        off(type: 'headerReceive', callback?: Callback<ResponseHeaders>): void;
    }
}
export default webSocket;
