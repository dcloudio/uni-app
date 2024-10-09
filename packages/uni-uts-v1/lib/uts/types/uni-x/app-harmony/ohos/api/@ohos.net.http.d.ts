/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
import type connection from './@ohos.net.connection';
/**
 * Provides http related APIs.
 * @namespace http
 * @syscap SystemCapability.Communication.NetStack
 * @since 6
 */
/**
 * Provides http related APIs.
 * @namespace http
 * @syscap SystemCapability.Communication.NetStack
 * @crossplatform
 * @since 10
 */
/**
 * Provides http related APIs.
 * @namespace http
 * @syscap SystemCapability.Communication.NetStack
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace http {
    /**
     * @syscap SystemCapability.Communication.NetStack
     * @since 10
     */
    /**
     * @syscap SystemCapability.Communication.NetStack
     * @atomicservice
     * @since 11
     */
    /**
     * @typedef { connection.HttpProxy }
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type HttpProxy = connection.HttpProxy;
    /**
     * Creates an HTTP request task.
     * @returns { HttpRequest } the HttpRequest of the createHttp.
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Creates an HTTP request task.
     * @returns { HttpRequest } the HttpRequest of the createHttp.
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an HTTP request task.
     * @returns { HttpRequest } the HttpRequest of the createHttp.
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createHttp(): HttpRequest;
    /**
     * Specifies the type and value range of the optional parameters in the HTTP request.
     * @interface HttpRequestOptions
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Specifies the type and value range of the optional parameters in the HTTP request.
     * @interface HttpRequestOptions
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Specifies the type and value range of the optional parameters in the HTTP request.
     * @interface HttpRequestOptions
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface HttpRequestOptions {
        /**
         * Request method,default is GET.
         * @type {?RequestMethod}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Request method,default is GET.
         * @type {?RequestMethod}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Request method,default is GET.
         * @type {?RequestMethod}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        method?: RequestMethod;
        /**
         * Additional data of the request.
         * extraData can be a string or an Object (API 6) or an ArrayBuffer(API 8).
         * @type {?string | Object | ArrayBuffer}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Additional data of the request.
         * extraData can be a string or an Object (API 6) or an ArrayBuffer(API 8).
         * @type {?string | Object | ArrayBuffer}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Additional data of the request.
         * extraData can be a string or an Object (API 6) or an ArrayBuffer(API 8).
         * @type { ?(string | Object | ArrayBuffer) }
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        extraData?: string | Object | ArrayBuffer;
        /**
         * Data type to be returned. If this parameter is set, the system preferentially returns the specified type.
         * @type {?HttpDataType}
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * Data type to be returned. If this parameter is set, the system preferentially returns the specified type.
         * @type {?HttpDataType}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Data type to be returned. If this parameter is set, the system preferentially returns the specified type.
         * @type {?HttpDataType}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        expectDataType?: HttpDataType;
        /**
         * default is true
         * @type {?boolean}
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * default is true
         * @type {?boolean}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * default is true
         * @type {?boolean}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        usingCache?: boolean;
        /**
         * [1, 1000], default is 1.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * [1, 1000], default is 1.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * [1, 1000], default is 1.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        priority?: number;
        /**
         * HTTP request header. default is 'content-type': 'application/json'
         * @type {?Object}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * HTTP request header. default is 'content-type': 'application/json'
         * @type {?Object}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * HTTP request header. default is 'content-type': 'application/json'
         * @type {?Object}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        header?: Object;
        /**
         * Read timeout period. The default value is 60,000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Read timeout period. The default value is 60,000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Read timeout period. The default value is 60,000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        readTimeout?: number;
        /**
         * Connection timeout interval. The default value is 60,000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Connection timeout interval. The default value is 60,000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Connection timeout interval. The default value is 60,000, in ms.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        connectTimeout?: number;
        /**
         * default is automatically specified by the system.
         * @type {?HttpProtocol}
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * default is automatically specified by the system.
         * @type {?HttpProtocol}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * default is automatically specified by the system.
         * @type {?HttpProtocol}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        usingProtocol?: HttpProtocol;
        /**
         * If this parameter is set as type of boolean, the system will use default proxy or not use proxy.
         * If this parameter is set as type of HttpProxy, the system will use the specified HttpProxy.
         * @type {?boolean | HttpProxy}
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        /**
         * If this parameter is set as type of boolean, the system will use default proxy or not use proxy.
         * If this parameter is set as type of HttpProxy, the system will use the specified HttpProxy.
         * @type { ?(boolean | HttpProxy) }
         * @syscap SystemCapability.Communication.NetStack
         * @atomicservice
         * @since 11
         */
        /**
         * If this parameter is set as type of boolean, the system will use default proxy or not use proxy.
         * If this parameter is set as type of HttpProxy, the system will use the specified HttpProxy.
         * @type { ?(boolean | HttpProxy) }
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        usingProxy?: boolean | HttpProxy;
        /**
         * If this parameter is set, the system will use ca path specified by user, or else use preset ca by the system.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        /**
         * If this parameter is set, the system will use ca path specified by user, or else use preset ca by the system.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @atomicservice
         * @since 11
         */
        /**
         * If this parameter is set, the system will use ca path specified by user, or else use preset ca by the system.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        caPath?: string;
        /**
         * Used to set to uploading or downloading the start bytes. The default value is 0.
         * HTTP standard (RFC 7233 section 3.1) allows servers to ignore range requests.
         * For HTTP PUT uploads this option should not be used, since it may conflict with other options.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Used to set to uploading or downloading the start bytes. The default value is 0.
         * HTTP standard (RFC 7233 section 3.1) allows servers to ignore range requests.
         * For HTTP PUT uploads this option should not be used, since it may conflict with other options.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        resumeFrom?: number;
        /**
         * Used to set to uploading or downloading the end bytes. Translate to the end if not set.
         * HTTP standard (RFC 7233 section 3.1) allows servers to ignore range requests.
         * For HTTP PUT uploads this option should not be used, since it may conflict with other options.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Used to set to uploading or downloading the end bytes. Translate to the end if not set.
         * HTTP standard (RFC 7233 section 3.1) allows servers to ignore range requests.
         * For HTTP PUT uploads this option should not be used, since it may conflict with other options.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        resumeTo?: number;
        /**
         * Support the application to pass in client certificates, allowing the server to verify the client's identity.
         * @type {?ClientCert}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Support the application to pass in client certificates, allowing the server to verify the client's identity.
         * @type {?ClientCert}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        clientCert?: ClientCert;
        /**
         * If this parameter is set, incoming DNS resolution server URL for the DoH server to use for name resolving.
         * The parameter must be URL-encoded in the following format: "https://host:port/path".
         * It MUST specify an HTTPS URL.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * If this parameter is set, incoming DNS resolution server URL for the DoH server to use for name resolving.
         * The parameter must be URL-encoded in the following format: "https://host:port/path".
         * It MUST specify an HTTPS URL.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        dnsOverHttps?: string;
        /**
         * If this parameter is set, use the specified DNS server for DNS resolution.
         * Multiple DNS resolution servers can be set up, with a maximum of 3 servers.
         * Only take the first three if there are more than three.
         * @type {?Array<string>}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * If this parameter is set, use the specified DNS server for DNS resolution.
         * Multiple DNS resolution servers can be set up, with a maximum of 3 servers.
         * Only take the first three if there are more than three.
         * @type {?Array<string>}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        dnsServers?: Array<string>;
        /**
         * The maximum limit of the response body. The default value is 5 * 1024 * 1024, in Byte.
         * The maximum value is 100 * 1024 *1024, in Byte.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * The maximum limit of the response body. The default value is 5 * 1024 * 1024, in Byte.
         * The maximum value is 100 * 1024 *1024, in Byte.
         * @type {?number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        maxLimit?: number;
        /**
         * The data fields which is supported by the HTTP protocol to post
         * forms and by the SMTP and IMAP protocols to provide
         * the email data to send/upload.
         * @type {?Array<MultiFormData>}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * The data fields which is supported by the HTTP protocol to post
         * forms and by the SMTP and IMAP protocols to provide
         * the email data to send/upload.
         * @type {?Array<MultiFormData>}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        multiFormDataList?: Array<MultiFormData>;
        /**
         * Certificate pinning option. If server certificate's digest does not match
         * {@link CertificatePinning.publicKeyHash}, request will fail.
         * @type {?(CertificatePinning | CertificatePinning[])}
         * @syscap SystemCapability.Communication.NetStack
         * @since 12
         */
        certificatePinning?: CertificatePinning | CertificatePinning[];
    }
    /**
     * Represents the properties of a form object.
     * @interface MultiFormData
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    /**
     * Represents the properties of a form object.
     * @interface MultiFormData
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 12
     */
    export interface MultiFormData {
        /**
         * MIME name for the data field.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * MIME name for the data field.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        name: string;
        /**
         * Content type of the data field.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Content type of the data field.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        contentType: string;
        /**
         * Remote file name for the data field.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Remote file name for the data field.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        remoteFileName?: string;
        /**
         * This parameter sets a mime part's body content from memory data.
         * @type {?(string | Object | ArrayBuffer)}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * This parameter sets a mime part's body content from memory data.
         * @type {?(string | Object | ArrayBuffer)}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        data?: string | Object | ArrayBuffer;
        /**
         * This parameter sets a mime part's body content from the file's contents.
         * This is an alternative to curl_mime_data for setting data to a mime part.
         * If data is empty, filePath must be set.
         * If data has a value, filePath does not take effect.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * This parameter sets a mime part's body content from the file's contents.
         * This is an alternative to curl_mime_data for setting data to a mime part.
         * If data is empty, filePath must be set.
         * If data has a value, filePath does not take effect.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        filePath?: string;
    }
    /**
     * Enum for certificate types
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    /**
     * Enum for certificate types
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 12
     */
    export enum CertType {
        /**
         * PEM format certificate
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * PEM format certificate
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        PEM = 'PEM',
        /**
         * DER format certificate
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * DER format certificate
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        DER = 'DER',
        /**
         * P12 format certificate
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * P12 format certificate
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        P12 = 'P12'
    }
    /**
     * The clientCert field of the client certificate, which includes 4 attributes:
     * client certificate (cert), client certificate type (certType), certificate private key (key), and passphrase (keyPassword).
     * @interface ClientCert
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    /**
     * The clientCert field of the client certificate, which includes 4 attributes:
     * client certificate (cert), client certificate type (certType), certificate private key (key), and passphrase (keyPassword).
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
         * The type of the client certificate.
         * @type {?CertType}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * The type of the client certificate.
         * @type {?CertType}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        certType?: CertType;
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
         * Password required to use the client certificate private key.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Password required to use the client certificate private key.
         * @type {?string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        keyPassword?: string;
    }
    /**
     * Certificate pinning option.
     * @interface CertificatePinning
     * @syscap SystemCapability.Communication.NetStack
     * @since 12
     */
    interface CertificatePinning {
        /**
         * Public key hash.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 12
         */
        publicKeyHash: string;
        /**
         * Certificate public key hash algorithm.
         * @type {'SHA-256'}
         * @syscap SystemCapability.Communication.NetStack
         * @since 12
         */
        hashAlgorithm: 'SHA-256';
    }
    /**
     * <p>Defines an HTTP request task. Before invoking APIs provided by HttpRequest,
     * you must call createHttp() to create an HttpRequestTask object.</p>
     * @interface HttpRequest
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * <p>Defines an HTTP request task. Before invoking APIs provided by HttpRequest,
     * you must call createHttp() to create an HttpRequestTask object.</p>
     * @interface HttpRequest
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * <p>Defines an HTTP request task. Before invoking APIs provided by HttpRequest,
     * you must call createHttp() to create an HttpRequestTask object.</p>
     * @interface HttpRequest
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface HttpRequest {
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { AsyncCallback<HttpResponse> } callback - the callback of request.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { AsyncCallback<HttpResponse> } callback - the callback of request.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { AsyncCallback<HttpResponse> } callback - the callback of request.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        request(url: string, callback: AsyncCallback<HttpResponse>): void;
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } options - Optional parameters {@link HttpRequestOptions}.
         * @param { AsyncCallback<HttpResponse> } callback - the callback of request..
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } options - Optional parameters {@link HttpRequestOptions}.
         * @param { AsyncCallback<HttpResponse> } callback - the callback of request.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } options - Optional parameters {@link HttpRequestOptions}.
         * @param { AsyncCallback<HttpResponse> } callback - the callback of request.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        request(url: string, options: HttpRequestOptions, callback: AsyncCallback<HttpResponse>): void;
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } [options] - Optional parameters {@link HttpRequestOptions}.
         * @returns { Promise<HttpResponse> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } [options] - Optional parameters {@link HttpRequestOptions}.
         * @returns { Promise<HttpResponse> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Initiates an HTTP request to a given URL.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } [options] - Optional parameters {@link HttpRequestOptions}.
         * @returns { Promise<HttpResponse> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        request(url: string, options?: HttpRequestOptions): Promise<HttpResponse>;
        /**
         * Initiates an HTTP request to a given URL, applicable to scenarios where http response supports streaming.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { AsyncCallback<number> } callback - Returns the callback of requestInStream {@link ResponseCode},
         * should use on_headersReceive and on_dataReceive to get http response.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        requestInStream(url: string, callback: AsyncCallback<number>): void;
        /**
         * Initiates an HTTP request to a given URL, applicable to scenarios where http response supports streaming.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } options - Optional parameters {@link HttpRequestOptions}.
         * @param { AsyncCallback<number> } callback - the callback of requestInStream.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        requestInStream(url: string, options: HttpRequestOptions, callback: AsyncCallback<number>): void;
        /**
         * Initiates an HTTP request to a given URL, applicable to scenarios where http response supports streaming.
         * @permission ohos.permission.INTERNET
         * @param { string } url - URL for initiating an HTTP request.
         * @param { HttpRequestOptions } [options] - Optional parameters {@link HttpRequestOptions}.
         * @returns { Promise<number> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 2300001 - Unsupported protocol.
         * @throws { BusinessError } 2300003 - Invalid URL format or missing URL.
         * @throws { BusinessError } 2300005 - Failed to resolve the proxy name.
         * @throws { BusinessError } 2300006 - Failed to resolve the host name.
         * @throws { BusinessError } 2300007 - Failed to connect to the server.
         * @throws { BusinessError } 2300008 - Invalid server response.
         * @throws { BusinessError } 2300009 - Access to the remote resource denied.
         * @throws { BusinessError } 2300016 - Error in the HTTP2 framing layer.
         * @throws { BusinessError } 2300018 - Transferred a partial file.
         * @throws { BusinessError } 2300023 - Failed to write the received data to the disk or application.
         * @throws { BusinessError } 2300025 - Upload failed.
         * @throws { BusinessError } 2300026 - Failed to open or read local data from the file or application.
         * @throws { BusinessError } 2300027 - Out of memory.
         * @throws { BusinessError } 2300028 - Operation timeout.
         * @throws { BusinessError } 2300047 - The number of redirections reaches the maximum allowed.
         * @throws { BusinessError } 2300052 - The server returned nothing (no header or data).
         * @throws { BusinessError } 2300055 - Failed to send data to the peer.
         * @throws { BusinessError } 2300056 - Failed to receive data from the peer.
         * @throws { BusinessError } 2300058 - Local SSL certificate error.
         * @throws { BusinessError } 2300059 - The specified SSL cipher cannot be used.
         * @throws { BusinessError } 2300060 - Invalid SSL peer certificate or SSH remote key.
         * @throws { BusinessError } 2300061 - Invalid HTTP encoding format.
         * @throws { BusinessError } 2300063 - Maximum file size exceeded.
         * @throws { BusinessError } 2300070 - Remote disk full.
         * @throws { BusinessError } 2300073 - Remote file already exists.
         * @throws { BusinessError } 2300077 - The SSL CA certificate does not exist or is inaccessible.
         * @throws { BusinessError } 2300078 - Remote file not found.
         * @throws { BusinessError } 2300094 - Authentication error.
         * @throws { BusinessError } 2300999 - Unknown error.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        requestInStream(url: string, options?: HttpRequestOptions): Promise<number>;
        /**
         * Destroys an HTTP request.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Destroys an HTTP request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Destroys an HTTP request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        destroy(): void;
        /**
         * Registers an observer for HTTP Response Header events.
         * @param { "headerReceive" } type - Indicates Event name.
         * @param { AsyncCallback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         * @deprecated since 8
         * @useinstead on_headersReceive
         */
        on(type: "headerReceive", callback: AsyncCallback<Object>): void;
        /**
         * Unregisters the observer for HTTP Response Header events.
         * @param { "headerReceive" } type - Indicates Event name.
         * @param { AsyncCallback<Object> } [callback] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         * @deprecated since 8
         * @useinstead off_headersReceive
         */
        off(type: "headerReceive", callback?: AsyncCallback<Object>): void;
        /**
         * Registers an observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 8
         */
        /**
         * Registers an observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Registers an observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        on(type: "headersReceive", callback: Callback<Object>): void;
        /**
         * Unregisters the observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 8
         */
        /**
         * Unregisters the observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Unregisters the observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } [callback] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        off(type: "headersReceive", callback?: Callback<Object>): void;
        /**
         * Registers a one-time observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 8
         */
        /**
         * Registers a one-time observer for HTTP Response Header events.
         * @param { "headersReceive" } type - Indicates Event name.
         * @param { Callback<Object> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        once(type: "headersReceive", callback: Callback<Object>): void;
        /**
         * Registers an observer for receiving HTTP Response data events continuously.
         * @param { "dataReceive" } type - Indicates Event name.
         * @param { Callback<ArrayBuffer> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        on(type: "dataReceive", callback: Callback<ArrayBuffer>): void;
        /**
         * Unregisters an observer for receiving HTTP Response data events continuously.
         * @param { "dataReceive" } type - Indicates Event name.
         * @param { Callback<ArrayBuffer> } [callback] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        off(type: "dataReceive", callback?: Callback<ArrayBuffer>): void;
        /**
         * Registers an observer for receiving HTTP Response data ends events.
         * @param { "dataEnd" } type - Indicates Event name.
         * @param { Callback<void> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        on(type: "dataEnd", callback: Callback<void>): void;
        /**
         * Unregisters an observer for receiving HTTP Response data ends events.
         * @param { "dataEnd" } type - Indicates Event name.
         * @param { Callback<void> } [callback] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        off(type: "dataEnd", callback?: Callback<void>): void;
        /**
         * Registers an observer for progress of receiving HTTP Response data events.
         * @param { 'dataReceiveProgress' } type - Indicates Event name.
         * @param { Callback<{ receiveSize: number, totalSize: number }> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        /**
         * Registers an observer for progress of receiving HTTP Response data events.
         * @param { 'dataReceiveProgress' } type - Indicates Event name.
         * @param { Callback<DataReceiveProgressInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Registers an observer for progress of receiving HTTP Response data events.
         * @param { 'dataReceiveProgress' } type - Indicates Event name.
         * @param { Callback<DataReceiveProgressInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        on(type: 'dataReceiveProgress', callback: Callback<DataReceiveProgressInfo>): void;
        /**
         * Unregisters an observer for progress of receiving HTTP Response data events.
         * @param { 'dataReceiveProgress' } type - Indicates Event name.
         * @param { Callback<{ receiveSize: number, totalSize: number }> } [callback] - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 10
         */
        /**
         * Unregisters an observer for progress of receiving HTTP Response data events.
         * @param { 'dataReceiveProgress' } type - Indicates Event name.
         * @param { Callback<DataReceiveProgressInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Unregisters an observer for progress of receiving HTTP Response data events.
         * @param { 'dataReceiveProgress' } type - Indicates Event name.
         * @param { Callback<DataReceiveProgressInfo> } callback - the callback used to return the result.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        off(type: 'dataReceiveProgress', callback?: Callback<DataReceiveProgressInfo>): void;
        /**
         * Registers an observer for progress of sendSize HTTP Response data events.
         * @param { 'dataSendProgress' } type - Indicates Event name.
         * @param { Callback<DataSendProgressInfo> } callback - the callback of on.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Registers an observer for progress of sendSize HTTP Response data events.
         * @param { 'dataSendProgress' } type - Indicates Event name.
         * @param { Callback<DataSendProgressInfo> } callback - the callback of on.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        on(type: 'dataSendProgress', callback: Callback<DataSendProgressInfo>): void;
        /**
         * Unregisters an observer for progress of sendSize HTTP Response data events.
         * @param { 'dataSendProgress' } type - Indicates Event name.
         * @param { Callback<DataSendProgressInfo> } [callback] - the callback of off.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Unregisters an observer for progress of sendSize HTTP Response data events.
         * @param { 'dataSendProgress' } type - Indicates Event name.
         * @param { Callback<DataSendProgressInfo> } [callback] - the callback of off.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        off(type: 'dataSendProgress', callback?: Callback<DataSendProgressInfo>): void;
    }
    /**
     * Defines an HTTP request method.
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Defines an HTTP request method.
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Defines an HTTP request method.
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum RequestMethod {
        /**
         * OPTIONS method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * OPTIONS method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * OPTIONS method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        OPTIONS = "OPTIONS",
        /**
         * GET method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * GET method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * GET method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        GET = "GET",
        /**
         * HEAD method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * HEAD method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * HEAD method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        HEAD = "HEAD",
        /**
         * POST method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * POST method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * POST method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        POST = "POST",
        /**
         * PUT method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * PUT method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * PUT method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        PUT = "PUT",
        /**
         * DELETE method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * DELETE method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * DELETE method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        DELETE = "DELETE",
        /**
         * TRACE method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * TRACE method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * TRACE method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        TRACE = "TRACE",
        /**
         * CONNECT method.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * CONNECT method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * CONNECT method.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        CONNECT = "CONNECT"
    }
    /**
     * Enumerates the response codes for an HTTP request.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Enumerates the response codes for an HTTP request.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Enumerates the response codes for an HTTP request.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum ResponseCode {
        /**
         * The request was successful. Typically used for GET and POST requests.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The request was successful. Typically used for GET and POST requests.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The request was successful. Typically used for GET and POST requests.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        OK = 200,
        /**
         * Successfully requested and created a new resource.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Successfully requested and created a new resource.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Successfully requested and created a new resource.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        CREATED,
        /**
         * The request has been accepted but has not been processed completely.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The request has been accepted but has not been processed completely.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The request has been accepted but has not been processed completely.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ACCEPTED,
        /**
         * Unauthorized information. The request was successful.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Unauthorized information. The request was successful.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Unauthorized information. The request was successful.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        NOT_AUTHORITATIVE,
        /**
         * No content. The server successfully processed, but did not return content.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * No content. The server successfully processed, but did not return content.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * No content. The server successfully processed, but did not return content.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        NO_CONTENT,
        /**
         * Reset the content.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Reset the content.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Reset the content.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        RESET,
        /**
         * Partial content. The server successfully processed some GET requests.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Partial content. The server successfully processed some GET requests.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Partial content. The server successfully processed some GET requests.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        PARTIAL,
        /**
         * Multiple options.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Multiple options.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Multiple options.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        MULT_CHOICE = 300,
        /**
         * <p>Permanently move. The requested resource has been permanently moved to a new URI,
         * and the returned information will include the new URI. The browser will automatically redirect to the new URI.</p>
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * <p>Permanently move. The requested resource has been permanently moved to a new URI,
         * and the returned information will include the new URI. The browser will automatically redirect to the new URI.</p>
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * <p>Permanently move. The requested resource has been permanently moved to a new URI,
         * and the returned information will include the new URI. The browser will automatically redirect to the new URI.</p>
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        MOVED_PERM,
        /**
         * Temporary movement.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Temporary movement.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Temporary movement.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        MOVED_TEMP,
        /**
         * View other addresses.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * View other addresses.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * View other addresses.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        SEE_OTHER,
        /**
         * Not modified.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Not modified.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Not modified.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        NOT_MODIFIED,
        /**
         * Using proxies.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Using proxies.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Using proxies.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        USE_PROXY,
        /**
         * The server cannot understand the syntax error error requested by the client.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server cannot understand the syntax error error requested by the client.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server cannot understand the syntax error error requested by the client.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        BAD_REQUEST = 400,
        /**
         * Request for user authentication.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Request for user authentication.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Request for user authentication.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        UNAUTHORIZED,
        /**
         * Reserved for future use.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Reserved for future use.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Reserved for future use.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        PAYMENT_REQUIRED,
        /**
         * The server understands the request from the requesting client, but refuses to execute it.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server understands the request from the requesting client, but refuses to execute it.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server understands the request from the requesting client, but refuses to execute it.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        FORBIDDEN,
        /**
         * The server was unable to find resources (web pages) based on the client's request.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server was unable to find resources (web pages) based on the client's request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server was unable to find resources (web pages) based on the client's request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        NOT_FOUND,
        /**
         * The method in the client request is prohibited.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The method in the client request is prohibited.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The method in the client request is prohibited.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        BAD_METHOD,
        /**
         * The server is unable to complete the request based on the content characteristics requested by the client.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server is unable to complete the request based on the content characteristics requested by the client.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server is unable to complete the request based on the content characteristics requested by the client.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        NOT_ACCEPTABLE,
        /**
         * Request authentication of the proxy's identity.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Request authentication of the proxy's identity.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Request authentication of the proxy's identity.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        PROXY_AUTH,
        /**
         * The request took too long and timed out.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The request took too long and timed out.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The request took too long and timed out.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        CLIENT_TIMEOUT,
        /**
         * <p>The server may have returned this code when completing the client's PUT request,
         * as there was a conflict when the server was processing the request.</p>
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * <p>The server may have returned this code when completing the client's PUT request,
         * as there was a conflict when the server was processing the request.</p>
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * <p>The server may have returned this code when completing the client's PUT request,
         * as there was a conflict when the server was processing the request.</p>
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        CONFLICT,
        /**
         * The resource requested by the client no longer exists.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The resource requested by the client no longer exists.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The resource requested by the client no longer exists.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        GONE,
        /**
         * The server is unable to process request information sent by the client without Content Length.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server is unable to process request information sent by the client without Content Length.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server is unable to process request information sent by the client without Content Length.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        LENGTH_REQUIRED,
        /**
         * The prerequisite for requesting information from the client is incorrect.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The prerequisite for requesting information from the client is incorrect.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The prerequisite for requesting information from the client is incorrect.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        PRECON_FAILED,
        /**
         * The request was rejected because the requested entity was too large for the server to process.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The request was rejected because the requested entity was too large for the server to process.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The request was rejected because the requested entity was too large for the server to process.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ENTITY_TOO_LARGE,
        /**
         * The requested URI is too long (usually a URL) and the server cannot process it.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The requested URI is too long (usually a URL) and the server cannot process it.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The requested URI is too long (usually a URL) and the server cannot process it.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        REQ_TOO_LONG,
        /**
         * The server is unable to process the requested format.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server is unable to process the requested format.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server is unable to process the requested format.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        UNSUPPORTED_TYPE,
        /**
         * The server cannot process the requested data range.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        RANGE_NOT_SATISFIABLE,
        /**
         * Internal server error, unable to complete the request.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Internal server error, unable to complete the request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Internal server error, unable to complete the request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        INTERNAL_ERROR = 500,
        /**
         * The server does not support the requested functionality and cannot complete the request.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server does not support the requested functionality and cannot complete the request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server does not support the requested functionality and cannot complete the request.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        NOT_IMPLEMENTED,
        /**
         * The server acting as a gateway or proxy received an invalid request from the remote server.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server acting as a gateway or proxy received an invalid request from the remote server.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server acting as a gateway or proxy received an invalid request from the remote server.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        BAD_GATEWAY,
        /**
         * Due to overload or system maintenance, the server is temporarily unable to process client requests.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Due to overload or system maintenance, the server is temporarily unable to process client requests.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Due to overload or system maintenance, the server is temporarily unable to process client requests.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        UNAVAILABLE,
        /**
         * The server acting as a gateway or proxy did not obtain requests from the remote server in a timely manner.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The server acting as a gateway or proxy did not obtain requests from the remote server in a timely manner.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The server acting as a gateway or proxy did not obtain requests from the remote server in a timely manner.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        GATEWAY_TIMEOUT,
        /**
         * The version of the HTTP protocol requested by the server.
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * The version of the HTTP protocol requested by the server.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The version of the HTTP protocol requested by the server.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        VERSION
    }
    /**
     * Supported protocols.
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @since 9
     */
    /**
     * Supported protocols.
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Supported protocols.
     * @enum {string}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum HttpProtocol {
        /**
         * Protocol http1.1
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * Protocol http1.1
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Protocol http1.1
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        HTTP1_1,
        /**
         * Protocol http2
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * Protocol http2
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Protocol http2
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        HTTP2,
        /**
         * Protocol http3 for https only.
         * Cause error if using http only or not supporting http3 on this device.
         * Fallback to http2 or http1.1 if needed.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Protocol http3 for https only.
         * Cause error if using http only or not supporting http3 on this device.
         * Fallback to http2 or http1.1 if needed.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        HTTP3
    }
    /**
     * Indicates the type of the returned data.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetStack
     * @since 9
     */
    /**
     * Indicates the type of the returned data.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the type of the returned data.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum HttpDataType {
        /**
         * The returned type is string.
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * The returned type is string.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The returned type is string.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        STRING,
        /**
         * The returned type is Object.
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * The returned type is Object.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The returned type is Object.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        OBJECT = 1,
        /**
         * The returned type is ArrayBuffer.
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * The returned type is ArrayBuffer.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * The returned type is ArrayBuffer.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ARRAY_BUFFER = 2
    }
    /**
     * Defines the response to an HTTP request.
     * @interface HttpResponse
     * @syscap SystemCapability.Communication.NetStack
     * @since 6
     */
    /**
     * Defines the response to an HTTP request.
     * @interface HttpResponse
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the response to an HTTP request.
     * @interface HttpResponse
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface HttpResponse {
        /**
         * result can be a string (API 6) or an ArrayBuffer(API 8). Object is deprecated from API 8.
         * If {@link HttpRequestOptions#expectDataType} is set, the system preferentially returns this parameter.
         * @type {string | Object | ArrayBuffer}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * result can be a string (API 6) or an ArrayBuffer(API 8). Object is deprecated from API 8.
         * If {@link HttpRequestOptions#expectDataType} is set, the system preferentially returns this parameter.
         * @type {string | Object | ArrayBuffer}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * result can be a string (API 6) or an ArrayBuffer(API 8). Object is deprecated from API 8.
         * If {@link HttpRequestOptions#expectDataType} is set, the system preferentially returns this parameter.
         * @type {string | Object | ArrayBuffer}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        result: string | Object | ArrayBuffer;
        /**
         * If the resultType is string, you can get result directly.
         * If the resultType is Object, you can get result such as this: result['key'].
         * If the resultType is ArrayBuffer, you can use ArrayBuffer to create the binary objects.
         * @type {HttpDataType}
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * If the resultType is string, you can get result directly.
         * If the resultType is Object, you can get result such as this: result['key'].
         * If the resultType is ArrayBuffer, you can use ArrayBuffer to create the binary objects.
         * @type {HttpDataType}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * If the resultType is string, you can get result directly.
         * If the resultType is Object, you can get result such as this: result['key'].
         * If the resultType is ArrayBuffer, you can use ArrayBuffer to create the binary objects.
         * @type {HttpDataType}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        resultType: HttpDataType;
        /**
         * Server status code.
         * @type {ResponseCode | number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * Server status code.
         * @type {ResponseCode | number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Server status code.
         * @type {ResponseCode | number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        responseCode: ResponseCode | number;
        /**
         * All headers in the response from the server.
         * @type {Object}
         * @syscap SystemCapability.Communication.NetStack
         * @since 6
         */
        /**
         * All headers in the response from the server.
         * @type {Object}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * All headers in the response from the server.
         * @type {Object}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        header: Object;
        /**
         * Cookies returned by the server.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @since 8
         */
        /**
         * Cookies returned by the server.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Cookies returned by the server.
         * @type {string}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        cookies: string;
        /**
         * The time taken of various stages of HTTP request.
         * @type {PerformanceTiming}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * The time taken of various stages of HTTP request.
         * @type {PerformanceTiming}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        performanceTiming: PerformanceTiming;
    }
    /**
     * Counting the time taken of various stages of HTTP request.
     * @interface PerformanceTiming
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    /**
     * Counting the time taken of various stages of HTTP request.
     * @interface PerformanceTiming
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 12
     */
    export interface PerformanceTiming {
        /**
         * Time taken from startup to DNS resolution completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from startup to DNS resolution completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        dnsTiming: number;
        /**
         * Time taken from startup to TCP connection completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from startup to TCP connection completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        tcpTiming: number;
        /**
         * Time taken from startup to TLS connection completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from startup to TLS connection completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        tlsTiming: number;
        /**
         * Time taken from startup to start sending the first byte, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from startup to start sending the first byte, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        firstSendTiming: number;
        /**
         * Time taken from startup to receiving the first byte, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from startup to receiving the first byte, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        firstReceiveTiming: number;
        /**
         * Time taken from startup to the completion of the request, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from startup to the completion of the request, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        totalFinishTiming: number;
        /**
         * Time taken from startup to completion of all redirection steps, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from startup to completion of all redirection steps, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        redirectTiming: number;
        /**
         * Time taken from HTTP request to header completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from HTTP request to header completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        responseHeaderTiming: number;
        /**
         * Time taken from HTTP Request to body completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from HTTP Request to body completion, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        responseBodyTiming: number;
        /**
         * Time taken from HTTP Request to callback to the application, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Time taken from HTTP Request to callback to the application, in milliseconds.
         * @type {number}
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        totalTiming: number;
    }
    /**
     * This interface is used to obtain the progress information of file upload or download.
     * @interface DataReceiveProgressInfo
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    /**
     * This interface is used to obtain the progress information of file upload or download.
     * @interface DataReceiveProgressInfo
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 12
     */
    export interface DataReceiveProgressInfo {
        /**
         * Number of data bytes received.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Number of data bytes received.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        receiveSize: number;
        /**
         * Total number of bytes to receive.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Total number of bytes to receive.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        totalSize: number;
    }
    /**
     * This interface is used to monitor the progress of sending data.
     * @interface DataSendProgressInfo
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    /**
     * This interface is used to monitor the progress of sending data.
     * @interface DataSendProgressInfo
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 12
     */
    export interface DataSendProgressInfo {
        /**
         * Used to specify the data size to be sent.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Used to specify the data size to be sent.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        sendSize: number;
        /**
         * Total number of bytes to receive.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        /**
         * Total number of bytes to receive.
         * @type { number }
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 12
         */
        totalSize: number;
    }
    /**
     * Creates a default {@code HttpResponseCache} object to store the responses of HTTP access requests.
     * @param { number } cacheSize - the size of cache(max value is 10MB), default is 10*1024*1024(10MB).
     * @returns { HttpResponseCache } the HttpResponseCache of the createHttpResponseCache.
     * @syscap SystemCapability.Communication.NetStack
     * @since 9
     */
    /**
     * Creates a default {@code HttpResponseCache} object to store the responses of HTTP access requests.
     * @param { number } cacheSize - the size of cache(max value is 10MB), default is 10*1024*1024(10MB).
     * @returns { HttpResponseCache } the HttpResponseCache of the createHttpResponseCache.
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Creates a default {@code HttpResponseCache} object to store the responses of HTTP access requests.
     * @param { number } cacheSize - the size of cache(max value is 10MB), default is 10*1024*1024(10MB).
     * @returns { HttpResponseCache } the HttpResponseCache of the createHttpResponseCache.
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createHttpResponseCache(cacheSize?: number): HttpResponseCache;
    /**
     * Defines an object that stores the response to an HTTP request.
     * @interface HttpResponseCache
     * @syscap SystemCapability.Communication.NetStack
     * @since 9
     */
    /**
     * Defines an object that stores the response to an HTTP request.
     * @interface HttpResponseCache
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @since 10
     */
    /**
     * Defines an object that stores the response to an HTTP request.
     * @interface HttpResponseCache
     * @syscap SystemCapability.Communication.NetStack
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface HttpResponseCache {
        /**
         * Writes data in the cache to the file system so that all the cached data can be accessed in the next HTTP request.
         * @param { AsyncCallback<void> } callback - the callback of flush.
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * Writes data in the cache to the file system so that all the cached data can be accessed in the next HTTP request.
         * @param { AsyncCallback<void> } callback - the callback of flush.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Writes data in the cache to the file system so that all the cached data can be accessed in the next HTTP request.
         * @param { AsyncCallback<void> } callback - the callback of flush.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        flush(callback: AsyncCallback<void>): void;
        /**
         * Writes data in the cache to the file system so that all the cached data can be accessed in the next HTTP request.
         * @returns { Promise<void> } The promise returned by the flush.
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * Writes data in the cache to the file system so that all the cached data can be accessed in the next HTTP request.
         * @returns { Promise<void> } The promise returned by the flush.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Writes data in the cache to the file system so that all the cached data can be accessed in the next HTTP request.
         * @returns { Promise<void> } The promise returned by the flush.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        flush(): Promise<void>;
        /**
         * Disables a cache and deletes the data in it.
         * @param { AsyncCallback<void> } callback - the callback of delete.
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * Disables a cache and deletes the data in it.
         * @param { AsyncCallback<void> } callback - the callback of delete.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Disables a cache and deletes the data in it.
         * @param { AsyncCallback<void> } callback - the callback of delete.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        delete(callback: AsyncCallback<void>): void;
        /**
         * Disables a cache and deletes the data in it.
         * @returns { Promise<void> } The promise returned by the delete.
         * @syscap SystemCapability.Communication.NetStack
         * @since 9
         */
        /**
         * Disables a cache and deletes the data in it.
         * @returns { Promise<void> } The promise returned by the delete.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @since 10
         */
        /**
         * Disables a cache and deletes the data in it.
         * @returns { Promise<void> } The promise returned by the delete.
         * @syscap SystemCapability.Communication.NetStack
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        delete(): Promise<void>;
    }
}
export default http;
