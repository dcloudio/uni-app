/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * @kit ArkWeb
 */

/// <reference path="../component/units.d.ts" />
import { AsyncCallback } from './@ohos.base';
import { Callback } from './@ohos.base';
import { Resource } from 'GlobalResource';
import cert from './@ohos.security.cert';
import image from './@ohos.multimedia.image';
import type print from './@ohos.print';
/**
 * This module provides the capability to manage web modules.
 *
 * @namespace webview
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * This module provides the capability to manage web modules.
 *
 * @namespace webview
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * This module provides the capability to manage web modules.
 *
 * @namespace webview
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace webview {
    /**
     * Defines the Web's request/response header.
     *
     * @interface WebHeader
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Defines the Web's request/response header.
     *
     * @interface WebHeader
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the Web's request/response header.
     *
     * @interface WebHeader
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface WebHeader {
        /**
         * Gets the key of the request/response header.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the key of the request/response header.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the key of the request/response header.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        headerKey: string;
        /**
         * Gets the value of the request/response header.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the value of the request/response header.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Gets the value of the request/response header.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        headerValue: string;
    }
    /**
     * Enum type supplied to {@link getHitTest} for indicating the cursor node HitTest.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Enum type supplied to {@link getHitTest} for indicating the cursor node HitTest.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    enum WebHitTestType {
        /**
         * The edit text.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * The edit text.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        EditText,
        /**
         * The email address.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * The email address.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        Email,
        /**
         * The HTML::a tag with src=http.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * The HTML::a tag with src=http.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        HttpAnchor,
        /**
         * The HTML::a tag with src=http + HTML::img.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * The HTML::a tag with src=http + HTML::img.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        HttpAnchorImg,
        /**
         * The HTML::img tag.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * The HTML::img tag.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        Img,
        /**
         * The map address.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * The map address.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        Map,
        /**
         * The phone number.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * The phone number.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        Phone,
        /**
         * Other unknown HitTest.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Other unknown HitTest.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        Unknown
    }
    /**
     * Defines the mode for using HttpDns.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @since 10
     */
    /**
     * Defines the mode for using HttpDns.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    enum SecureDnsMode {
        /**
         * Do not use HttpDns, can be used to revoke previously used HttpDns configuration.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Do not use HttpDns, can be used to revoke previously used HttpDns configuration.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        OFF = 0,
        /**
         * By default, the user-settings of HttpDns is used for dns resolution, and if it fails,
         * the system dns is used for resolution.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * By default, the user-settings of HttpDns is used for dns resolution, and if it fails,
         * the system dns is used for resolution.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        AUTO = 1,
        /**
         * Use the user-settings of HttpDns for dns resolution. If it fails, it will not
         * fall back to the system dns, which will directly cause the page to fail to load.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Use the user-settings of HttpDns for dns resolution. If it fails, it will not
         * fall back to the system dns, which will directly cause the page to fail to load.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SECURE_ONLY = 2
    }
    /**
     * Defines the security level for the page.
     *
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    enum SecurityLevel {
        /**
         * Unable to determine whether it is safe or not, the non-http/https protocol used.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NONE = 0,
        /**
         * Indicates the HTTPS protocol used by the page and the authentication is successful.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SECURE = 1,
        /**
         * The page is insecure. For example, the HTTP protocol is used or the HTTPS protocol
         * is used but use an legacy TLS version.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        WARNING = 2,
        /**
         * Attempted HTTPS and failed, the authentication is failed.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        DANGEROUS = 3
    }
    /**
     * Defines the hit test value, related to {@link getHitTestValue} method.
     *
     * @interface HitTestValue
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Defines the hit test value, related to {@link getHitTestValue} method.
     *
     * @interface HitTestValue
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    interface HitTestValue {
        /**
         * Get the hit test type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get the hit test type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        type: WebHitTestType;
        /**
         * Get the hit test extra data.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get the hit test extra data.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        extra: string;
    }
    /**
     * Defines the configuration of web custom scheme, related to {@link customizeSchemes} method.
     *
     * @interface WebCustomScheme
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Defines the configuration of web custom scheme, related to {@link customizeSchemes} method.
     *
     * @interface WebCustomScheme
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    interface WebCustomScheme {
        /**
         * Name of the custom scheme.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Name of the custom scheme.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        schemeName: string;
        /**
         * Whether Cross-Origin Resource Sharing is supported.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Whether Cross-Origin Resource Sharing is supported.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        isSupportCORS: boolean;
        /**
         * Whether fetch request is supported.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Whether fetch request is supported.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        isSupportFetch: boolean;
    }
    /**
     * Provides basic information of web storage.
     *
     * @interface WebStorageOrigin
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides basic information of web storage.
     *
     * @interface WebStorageOrigin
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    interface WebStorageOrigin {
        /**
         * Url source.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Url source.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        origin: string;
        /**
         * Specify the amount of storage for the source.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Specify the amount of storage for the source.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        usage: number;
        /**
         * the callback of getOriginUsage.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * the callback of getOriginUsage.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        quota: number;
    }
    /**
     * Subscribe to a callback of a specified type of web event once.
     *
     * @param {string} type Types of web event.
     * @param {Callback<void>} callback Indicate callback used to receive the web event.
     *
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Subscribe to a callback of a specified type of web event once.
     *
     * @param {string} type Types of web event.
     * @param {Callback<void>} callback Indicate callback used to receive the web event.
     *
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    function once(type: string, callback: Callback<void>): void;
    /**
     * Provides methods for managing web storage.3
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides methods for managing web storage.3
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    class WebStorage {
        /**
         * Delete all the storage data.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Delete all the storage data.
         *
         * @param { boolean } incognito - {@code true} delete all the storage data in incognito mode;
         *                                {@code false} otherwise.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static deleteAllData(incognito?: boolean): void;
        /**
         * Delete the storage data with the origin.
         *
         * @param { string } origin - The origin which to be deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Delete the storage data with the origin.
         *
         * @param { string } origin - The origin which to be deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static deleteOrigin(origin: string): void;
        /**
         * Get current all the web storage origins.
         * @returns { Promise<Array<WebStorageOrigin>> } - returns all the WebStorageOrigin.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100012 - Invalid web storage origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get current all the web storage origins.
         * @returns { Promise<Array<WebStorageOrigin>> } - returns all the WebStorageOrigin.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100012 - Invalid web storage origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getOrigins(): Promise<Array<WebStorageOrigin>>;
        /**
         * Get current all the web storage origins.
         * @param { AsyncCallback<Array<WebStorageOrigin>> } callback - callback used to return all the WebStorageOrigin.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100012 - Invalid web storage origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get current all the web storage origins.
         * @param { AsyncCallback<Array<WebStorageOrigin>> } callback - callback used to return all the WebStorageOrigin.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100012 - Invalid web storage origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getOrigins(callback: AsyncCallback<Array<WebStorageOrigin>>): void;
        /**
         * Get the web storage quota with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @returns { Promise<number> } - the promise returned by the function
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get the web storage quota with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @returns { Promise<number> } - the promise returned by the function
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getOriginQuota(origin: string): Promise<number>;
        /**
         * Get the web storage quota with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @param { AsyncCallback<number> } callback - the callback of getOriginQuota.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get the web storage quota with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @param { AsyncCallback<number> } callback - the callback of getOriginQuota.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getOriginQuota(origin: string, callback: AsyncCallback<number>): void;
        /**
         * Get the web amount of storage with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @returns { Promise<number> } - the promise returned by the function
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get the web amount of storage with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @returns { Promise<number> } - the promise returned by the function
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getOriginUsage(origin: string): Promise<number>;
        /**
         * Get the web amount of storage with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @param { AsyncCallback<number> } callback - the callback of getOriginUsage.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get the web amount of storage with the origin.
         * @param { string } origin -  The origin which to be inquired.
         * @param { AsyncCallback<number> } callback - the callback of getOriginUsage.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getOriginUsage(origin: string, callback: AsyncCallback<number>): void;
    }
    /**
     * Provides methods for managing web database.
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides methods for managing web database.
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    class WebDataBase {
        /**
        * Get whether instances holds any http authentication credentials.
        * @returns { boolean } true if instances saved any http authentication credentials otherwise false.
        * @syscap SystemCapability.Web.Webview.Core
        * @since 9
        */
        /**
         * Get whether instances holds any http authentication credentials.
         * @returns { boolean } true if instances saved any http authentication credentials otherwise false.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static existHttpAuthCredentials(): boolean;
        /**
         * Delete all http authentication credentials.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Delete all http authentication credentials.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static deleteHttpAuthCredentials(): void;
        /**
         * Get http authentication credentials.
         * @param { string } host - The host to which the credentials apply.
         * @param { string } realm - The realm to which the credentials apply.
         * @returns { Array<string> } Return an array containing username and password.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get http authentication credentials.
         * @param { string } host - The host to which the credentials apply.
         * @param { string } realm - The realm to which the credentials apply.
         * @returns { Array<string> } Return an array containing username and password.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static getHttpAuthCredentials(host: string, realm: string): Array<string>;
        /**
         * Save http authentication credentials.
         * @param { string } host - The host to which the credentials apply.
         * @param { string } realm - The realm to which the credentials apply.
         * @param { string } username - The username.
         * @param { string } password - The password.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Save http authentication credentials.
         * @param { string } host - The host to which the credentials apply.
         * @param { string } realm - The realm to which the credentials apply.
         * @param { string } username - The username.
         * @param { string } password - The password.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static saveHttpAuthCredentials(host: string, realm: string, username: string, password: string): void;
    }
    /**
     * Provides a method for managing web geographic location permissions.
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides a method for managing web geographic location permissions.
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    class GeolocationPermissions {
        /**
         * Allow geolocation permissions for specifies source.
         * @param { string } origin - Url source.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Allow geolocation permissions for specifies source.
         * @param { string } origin - Url source.
         * @param { boolean } incognito - {@code true} Allow geolocation permissions for specifies source
         *                                in incognito mode; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static allowGeolocation(origin: string, incognito?: boolean): void;
        /**
         * Delete geolocation permissions for specifies source.
         * @param { string } origin - Url source.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Delete geolocation permissions for specifies source.
         * @param { string } origin - Url source.
         * @param { boolean } incognito - {@code true} delete geolocation permissions for specifies source
         *                                in incognito mode; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static deleteGeolocation(origin: string, incognito?: boolean): void;
        /**
         * Delete all geolocation permissions.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Delete all geolocation permissions.
         *
         * @param { boolean } incognito - {@code true} delete all geolocation in incognito mode;
         *                                {@code false} otherwise.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static deleteAllGeolocation(incognito?: boolean): void;
        /**
         * Gets the geolocation permission status of the specified source.
         * @param { string } origin - Url source.
         * @returns { Promise<boolean> } A Promise instance that obtains the permission
         *                               status of the specified source and obtains successfully,
         *                               true for authorization, false for access denial. Failed
         *                               to get, indicating that the permission status of the
         *                               specified source does not exist.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the geolocation permission status of the specified source.
         * @param { string } origin - Url source.
         * @param { boolean } incognito - {@code true} gets the geolocation permission status of the
         *                                specified source in incognito mode; {@code false} otherwise.
         * @returns { Promise<boolean> } A Promise instance that obtains the permission
         *                               status of the specified source and obtains successfully,
         *                               true for authorization, false for access denial. Failed
         *                               to get, indicating that the permission status of the
         *                               specified source does not exist.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getAccessibleGeolocation(origin: string, incognito?: boolean): Promise<boolean>;
        /**
         * Gets the geolocation permission status of the specified source.
         * @param { string } origin - Url source.
         * @param { AsyncCallback<boolean> } callback - Returns the geolocation permission status for
         *                                              the specified source. Successful acquisition,
         *                                              true means authorized, false means access is
         *                                              denied. Failed to get, indicating that the
         *                                              permission status of the specified source does
         *                                              not exist.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the geolocation permission status of the specified source.
         * @param { string } origin - Url source.
         * @param { AsyncCallback<boolean> } callback - Returns the geolocation permission status for
         *                                              the specified source. Successful acquisition,
         *                                              true means authorized, false means access is
         *                                              denied. Failed to get, indicating that the
         *                                              permission status of the specified source does
         *                                              not exist.
         * @param { boolean } incognito - {@code true} gets the geolocation permission status of the
         *                                specified source in incognito mode; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100011 - Invalid origin.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getAccessibleGeolocation(origin: string, callback: AsyncCallback<boolean>, incognito?: boolean): void;
        /**
         * Get all stored geolocation permission url source.
         *
         * @returns { Promise<Array<string>> } A Promise instance that gets all source information about
         *                                     the stored geolocation permission state.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get all stored geolocation permission url source.
         * @param { boolean } incognito - {@code true} get all stored geolocation permission url source
         *                                in incognito mode; {@code false} otherwise.
         * @returns { Promise<Array<string>> } A Promise instance that gets all source information about
         *                                     the stored geolocation permission state.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getStoredGeolocation(incognito?: boolean): Promise<Array<string>>;
        /**
         * Get all stored geolocation permission url source.
         * @param { AsyncCallback<Array<string>> } callback - Returns all source information for
         *                                                    stored geolocation permission states.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get all stored geolocation permission url source.
         * @param { AsyncCallback<Array<string>> } callback - Returns all source information for
         *                                                    stored geolocation permission states.
         * @param { boolean } incognito - {@code true} gets all stored geolocation permission url
         *                                source in incognito mode; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static getStoredGeolocation(callback: AsyncCallback<Array<string>>, incognito?: boolean): void;
    }
    /**
     * Provides methods for managing the web cookies.
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides methods for managing the web cookies.
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    class WebCookieManager {
        /**
         * Gets all cookies for the given URL.
         *
         * @param { string } url - The URL for which the cookies are requested.
         * @returns { string } - The cookie value for the given URL.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.web.webview.WebCookieManager#fetchCookieSync
         */
        static getCookie(url: string): string;
        /**
         * Gets all cookies for the given URL.
         *
         * @param { string } url - The URL for which the cookies are requested.
         * @param { boolean } incognito - {@code true} gets all cookies for the given URL
         *                                in incognito mode; {@code false} otherwise.
         * @returns { string } - The cookie value for the given URL.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static fetchCookieSync(url: string, incognito?: boolean): string;
        /**
         * Gets all cookies for the given URL Asynchronously.
         *
         * @param { string } url - The URL for which the cookies are requested.
         * @returns { Promise<string> } - A promise resolved after the cookies of given URL have been gotten.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static fetchCookie(url: string): Promise<string>;
        /**
         * Gets all cookies for the given URL Asynchronously.
         *
         * @param { string } url - The URL for which the cookies are requested.
         * @param { AsyncCallback<string> } callback - Called after the cookies of given URL have been gotten.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static fetchCookie(url: string, callback: AsyncCallback<string>): void;
        /**
         * Set a single cookie (key-value pair) for the given URL.
         *
         * @param { string } url - The URL for which the cookie is to be set.
         * @param { string } value - The cookie as a string, using the format of the 'Set-Cookie' HTTP response header.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 17100005 - Invalid cookie value.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.web.webview.WebCookieManager#configCookieSync
         */
        static setCookie(url: string, value: string): void;
        /**
         * Set a single cookie (key-value pair) for the given URL.
         *
         * @param { string } url - The URL for which the cookie is to be set.
         * @param { string } value - The cookie as a string, using the format of the 'Set-Cookie' HTTP response header.
         * @param { boolean } incognito - {@code true} set a single cookie (key-value pair) for the given URL
         *                                in incognito mode; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 17100005 - Invalid cookie value.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static configCookieSync(url: string, value: string, incognito?: boolean): void;
        /**
         * Set a single cookie (key-value pair) for the given URL Asynchronously.
         *
         * @param { string } url - The URL for which the cookie is to be set.
         * @param { string } value - The cookie as a string, using the format of the 'Set-Cookie' HTTP response header.
         * @returns { Promise<void> } - A promise resolved after the cookies of given URL have been set.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 17100005 - Invalid cookie value.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static configCookie(url: string, value: string): Promise<void>;
        /**
         * Set a single cookie (key-value pair) for the given URL Asynchronously.
         *
         * @param { string } url - The URL for which the cookie is to be set.
         * @param { string } value - The cookie as a string, using the format of the 'Set-Cookie' HTTP response header.
         * @param { AsyncCallback<void> } callback - Called after the cookies have been set.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 17100005 - Invalid cookie value.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static configCookie(url: string, value: string, callback: AsyncCallback<void>): void;
        /**
         * Save the cookies Asynchronously.
         * @returns { Promise<void> } - A promise resolved after the cookies have been saved.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Save the cookies Asynchronously.
         * @returns { Promise<void> } - A promise resolved after the cookies have been saved.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static saveCookieAsync(): Promise<void>;
        /**
         * Save the cookies Asynchronously.
         * @param { AsyncCallback<void> } callback - Called after the cookies have been saved.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Save the cookies Asynchronously.
         * @param { AsyncCallback<void> } callback - Called after the cookies have been saved.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static saveCookieAsync(callback: AsyncCallback<void>): void;
        /**
         * Get whether the instance can send and accept cookies.
         *
         * @returns { boolean } True if the instance can send and accept cookies else false.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get whether the instance can send and accept cookies.
         *
         * @returns { boolean } True if the instance can send and accept cookies else false.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static isCookieAllowed(): boolean;
        /**
         * Set whether the instance should send and accept cookies.
         * By default this is set to be true.
         *
         * @param { boolean } accept - Whether the instance should send and accept cookies.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Set whether the instance should send and accept cookies.
         * By default this is set to be true.
         *
         * @param { boolean } accept - Whether the instance should send and accept cookies.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static putAcceptCookieEnabled(accept: boolean): void;
        /**
         * Get whether the instance can send and accept thirdparty cookies.
         *
         * @returns { boolean } True if the instance can send and accept thirdparty cookies else false.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get whether the instance can send and accept thirdparty cookies.
         *
         * @returns { boolean } True if the instance can send and accept thirdparty cookies else false.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static isThirdPartyCookieAllowed(): boolean;
        /**
         * Set whether the instance should send and accept thirdparty cookies.
         * By default this is set to be false.
         *
         * @param { boolean } accept - Whether the instance should send and accept thirdparty cookies.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Set whether the instance should send and accept thirdparty cookies.
         * By default this is set to be false.
         *
         * @param { boolean } accept - Whether the instance should send and accept thirdparty cookies.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static putAcceptThirdPartyCookieEnabled(accept: boolean): void;
        /**
         * Check whether exists any cookies.
         *
         * @returns { boolean } True if exists more than one cookie else false;
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Check whether exists any cookies.
         *
         * @param { boolean } incognito - {@code true} check whether exists any cookies.
         *                                in incognito mode; {@code false} otherwise.
         * @returns { boolean } True if exists more than one cookie else false;
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static existCookie(incognito?: boolean): boolean;
        /**
         * Remove all cookies.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.web.webview.WebCookieManager#clearAllCookiesSync
         */
        static deleteEntireCookie(): void;
        /**
         * Remove all cookies.
         *
         * @param { boolean } incognito - {@code true} remove all cookies in incognito mode;
         *                                {@code false} otherwise.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static clearAllCookiesSync(incognito?: boolean): void;
        /**
         * Remove all cookies Asynchronously.
         * @returns { Promise<void> } - A promise resolved after the cookies have been deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static clearAllCookies(): Promise<void>;
        /**
         * Remove all cookies Asynchronously.
         * @param { AsyncCallback<void> } callback - Called after the cookies have been deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static clearAllCookies(callback: AsyncCallback<void>): void;
        /**
         * Delete the session cookies.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.web.webview.WebCookieManager#clearSessionCookieSync
         */
        static deleteSessionCookie(): void;
        /**
         * Delete the session cookies.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static clearSessionCookieSync(): void;
        /**
         * Delete the session cookies Asynchronously.
         * @returns { Promise<void> } - A promise resolved after the cookies have been deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static clearSessionCookie(): Promise<void>;
        /**
         * Delete the session cookies Asynchronously.
         * @param { AsyncCallback<void> } callback - Called after the cookies have been deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static clearSessionCookie(callback: AsyncCallback<void>): void;
    }
    /**
     * Enum type supplied to {@link onMessageEventExt} for indicating the type of web message.
     *
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @since 10
     */
    /**
     * Enum type supplied to {@link onMessageEventExt} for indicating the type of web message.
     *
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    enum WebMessageType {
        /**
         * Unsupported data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Unsupported data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NOT_SUPPORT,
        /**
         * The string data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The string data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        STRING,
        /**
         * The number data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The number data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NUMBER,
        /**
         * The boolean data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The boolean data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        BOOLEAN,
        /**
         * The arraybuffer data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The arraybuffer data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        ARRAY_BUFFER,
        /**
         * The array data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The array data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        ARRAY,
        /**
         * The error data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The error data type.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        ERROR
    }
    /**
     * The message received or sent from web message port.
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @since 10
     */
    /**
     * The message received or sent from web message port.
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    class WebMessageExt {
        /**
         * Get the type of the web message.
         * @returns { WebMessageType } - Returns data of WebMessageType type
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the type of the web message.
         * @returns { WebMessageType } - Returns data of WebMessageType type
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getType(): WebMessageType;
        /**
         * Get the string value of the web message.
         * @returns { string } - Returns data of string type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the string value of the web message.
         * @returns { string } - Returns data of string type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getString(): string;
        /**
         * Get the number value of the web message.
         * @returns { number } - Returns data of number type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the number value of the web message.
         * @returns { number } - Returns data of number type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getNumber(): number;
        /**
         * Get the boolean value of the web message.
         * @returns { boolean } - Returns data of Boolean type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the boolean value of the web message.
         * @returns { boolean } - Returns data of Boolean type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getBoolean(): boolean;
        /**
         * Get the array buffer value of the web message.
         * @returns { ArrayBuffer } - Returns data of ArrayBuffer type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the array buffer value of the web message.
         * @returns { ArrayBuffer } - Returns data of ArrayBuffer type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getArrayBuffer(): ArrayBuffer;
        /**
         * Get the array value of the web message.
         * @returns { Array<string | number | boolean> } - Returns data of Array type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the array value of the web message.
         * @returns { Array<string | number | boolean> } - Returns data of Array type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getArray(): Array<string | number | boolean>;
        /**
         * Get the error value of the web message.
         * @returns { Error } - Returns data of Error type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the error value of the web message.
         * @returns { Error } - Returns data of Error type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getError(): Error;
        /**
         * Set the type of the web message.
         * @param { WebMessageType } type - set WebMessageType type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set the type of the web message.
         * @param { WebMessageType } type - set WebMessageType type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setType(type: WebMessageType): void;
        /**
         * Set the string value of the web message.
         * @param { string } message - set string type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set the string value of the web message.
         * @param { string } message - set string type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setString(message: string): void;
        /**
         * Set the number value of the web message.
         * @param { number } message - set number type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set the number value of the web message.
         * @param { number } message - set number type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setNumber(message: number): void;
        /**
         * Set the boolean value of the web message.
         * @param { boolean } message - set boolean type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set the boolean value of the web message.
         * @param { boolean } message - set boolean type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setBoolean(message: boolean): void;
        /**
         * Set the array buffer value of the web message.
         * @param { ArrayBuffer } message - set ArrayBuffer type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set the array buffer value of the web message.
         * @param { ArrayBuffer } message - set ArrayBuffer type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setArrayBuffer(message: ArrayBuffer): void;
        /**
         * Set the array value of the web message.
         * @param { Array<string | number | boolean> } message - set Array type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set the array value of the web message.
         * @param { Array<string | number | boolean> } message - set Array type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setArray(message: Array<string | number | boolean>): void;
        /**
         * Set the error value of the web message.
         * @param { Error } message - set Error type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set the error value of the web message.
         * @param { Error } message - set Error type data
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100014 - The type does not match with the value of the web message.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setError(message: Error): void;
    }
    /**
     * WebMessage type supplied to {@link onMessageEventExt} for indicating the type of web message.
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * WebMessage type supplied to {@link onMessageEventExt} for indicating the type of web message.
     *
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    type WebMessage = ArrayBuffer | string;
    /**
     * Define html web message port.
     * @interface WebMessagePort
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Define html web message port.
     * @interface WebMessagePort
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface WebMessagePort {
        /**
         * The flag indicates whether more formats are supported than string and array buffers.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The flag indicates whether more formats are supported than string and array buffers.
         *
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        isExtentionType?: boolean;
        /**
         * Close port.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Close port.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        close(): void;
        /**
         * Post a message to other port.
         * @param { WebMessage } message - Message to send.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100010 - Can not post message using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Post a message to other port.
         * @param { WebMessage } message - Message to send.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100010 - Can not post message using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        postMessageEvent(message: WebMessage): void;
        /**
         * Receive message from other port.
         * @param { function } callback - Callback function for receiving messages.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100006 - Can not register message event using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Receive message from other port.
         * @param { function } callback - Callback function for receiving messages.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100006 - Can not register message event using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        onMessageEvent(callback: (result: WebMessage) => void): void;
        /**
         * Post a message to other port.
         * @param { WebMessageExt } message - Message to send.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100010 - Can not post message using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Post a message to other port.
         * @param { WebMessageExt } message - Message to send.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100010 - Can not post message using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        postMessageEventExt(message: WebMessageExt): void;
        /**
         * Receive message from other port.
         * @param { function } callback - Callback function for receiving messages.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100006 - Can not register message event using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Receive message from other port.
         * @param { function } callback - Callback function for receiving messages.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100006 - Can not register message event using this port.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        onMessageEventExt(callback: (result: WebMessageExt) => void): void;
    }
    /**
     * Provides information for history item in BackForwardList.
     * @interface HistoryItem
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides information for history item in BackForwardList.
     * @interface HistoryItem
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface HistoryItem {
        /**
         * Pixelmap of icon.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Pixelmap of icon.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        icon: image.PixelMap;
        /**
         * Url of this history item.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Url of this history item.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        historyUrl: string;
        /**
         * Original request url of this history item.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Original request url of this history item.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        historyRawUrl: string;
        /**
         * Title of this history item.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Title of this history item.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        title: string;
    }
    /**
     * Provides back and forward history list information method. related to {@link HistoryItem}.
     * @interface BackForwardList
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides back and forward history list information method. related to {@link HistoryItem}.
     * @interface BackForwardList
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface BackForwardList {
        /**
         * Current index in BackForwardList.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Current index in BackForwardList.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        currentIndex: number;
        /**
         * Size of in BackForwardList.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Size of in BackForwardList.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        size: number;
        /**
         * Get history entry at given index.
         *
         * @param { number } index Index of back forward list entry.
         * @returns { HistoryItem } HistoryItem at given index in back forward list.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get history entry at given index.
         *
         * @param { number } index Index of back forward list entry.
         * @returns { HistoryItem } HistoryItem at given index in back forward list.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getItemAtIndex(index: number): HistoryItem;
    }
    /**
     * Enum type supplied to {@link runJavaScriptExt} for indicating the result of JavaScript code execution.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @since 10
     */
    /**
     * Enum type supplied to {@link runJavaScriptExt} for indicating the result of JavaScript code execution.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    enum JsMessageType {
        /**
         * Unsupported data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Unsupported data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NOT_SUPPORT,
        /**
         * The string data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The string data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        STRING,
        /**
         * The number data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The number data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NUMBER,
        /**
         * The boolean data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The boolean data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        BOOLEAN,
        /**
         * The arraybuffer data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The arraybuffer data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        ARRAY_BUFFER,
        /**
         * The array data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * The array data type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        ARRAY
    }
    /**
     * The message for indicating the of result of JavaScript code execution.
     * @syscap SystemCapability.Web.Webview.Core
     * @since 10
     */
    /**
     * The message for indicating the of result of JavaScript code execution.
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    class JsMessageExt {
        /**
         * Get the type of the JavaScript code execution result.
         * @returns { JsMessageType } - Returns data of JsMessageType type
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the type of the JavaScript code execution result.
         * @returns { JsMessageType } - Returns data of JsMessageType type
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getType(): JsMessageType;
        /**
         * Get the string value of the JavaScript code execution result.
         * @returns { string } - Returns data of string type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the string value of the JavaScript code execution result.
         * @returns { string } - Returns data of string type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getString(): string;
        /**
         * Get the number value of the JavaScript code execution result.
         * @returns { number } - Returns data of number type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the number value of the JavaScript code execution result.
         * @returns { number } - Returns data of number type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getNumber(): number;
        /**
         * Get the boolean value of the JavaScript code execution result.
         * @returns { boolean } - Returns data of Boolean type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the boolean value of the JavaScript code execution result.
         * @returns { boolean } - Returns data of Boolean type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getBoolean(): boolean;
        /**
         * Get the array buffer value of the JavaScript code execution result.
         * @returns { ArrayBuffer } - Returns data of ArrayBuffer
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the array buffer value of the JavaScript code execution result.
         * @returns { ArrayBuffer } - Returns data of ArrayBuffer
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getArrayBuffer(): ArrayBuffer;
        /**
         * Get the array value of the the JavaScript code execution result.
         * @returns { Array<string | number | boolean> } - Returns data of Array type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get the array value of the the JavaScript code execution result.
         * @returns { Array<string | number | boolean> } - Returns data of Array type
         * @throws { BusinessError } 17100014 - The type does not match with the value of the result.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getArray(): Array<string | number | boolean>;
    }
    /**
     * Provides methods for controlling the web controller.
     * @syscap SystemCapability.Web.Webview.Core
     * @since 9
     */
    /**
     * Provides methods for controlling the web controller.
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Provides methods for controlling the web controller.
     * @syscap SystemCapability.Web.Webview.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    class WebviewController {
        /**
         * A constructor used to create a WebviewController object.
         *
         * @param { string } [webTag] - specified the name of the web component, Empty by default.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        constructor(webTag?: string);
        /**
         * Initialize the web engine before loading the Web components.
         * This is a global static API that must be called on the UI thread, and it will have no effect if any
         * Web components are loaded.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Initialize the web engine before loading the Web components.
         * This is a global static API that must be called on the UI thread, and it will have no effect if any
         * Web components are loaded.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static initializeWebEngine(): void;
        /**
         * Set web engine to use HttpDns server to resolve dns.
         * @param { SecureDnsMode } secureDnsMode - using HttpDns.
         * @param { string } secureDnsConfig - The configuration of the HttpDns server.
         *                   Must be https protocol and only allow one server to be configured.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set web engine to use HttpDns server to resolve dns.
         * @param { SecureDnsMode } secureDnsMode - using HttpDns.
         * @param { string } secureDnsConfig - The configuration of the HttpDns server.
         *                   Must be https protocol and only allow one server to be configured.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static setHttpDns(secureDnsMode: SecureDnsMode, secureDnsConfig: string): void;
        /**
         * Enables debugging of web contents.
         * @param { boolean } webDebuggingAccess {@code true} enables debugging of web contents; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Enables debugging of web contents.
         * @param { boolean } webDebuggingAccess {@code true} enables debugging of web contents; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static setWebDebuggingAccess(webDebuggingAccess: boolean): void;
        /**
         * Enable the ability to check website security risks.
         * Illegal and fraudulent websites are mandatory enabled and can't be disabled by this function.
         * @param { boolean } enable - {@code true} enable check the website security risks; {@code false} otherwise.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        enableSafeBrowsing(enable: boolean): void;
        /**
         * Get whether checking website security risks is enabled.
         * @returns { boolean } True if enable the ability to check website security risks else false.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        isSafeBrowsingEnabled(): boolean;
        /**
         * Checks whether the web page can go forward.
         * @returns { boolean } True if the web page can go forward else false.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Checks whether the web page can go forward.
         * @returns { boolean } True if the web page can go forward else false.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        accessForward(): boolean;
        /**
         * Checks whether the web page can go back.
         * @returns { boolean } True if the web page can go back else false.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Checks whether the web page can go back.
         * @returns { boolean } True if the web page can go back else false.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        accessBackward(): boolean;
        /**
         * Checks whether the web page can go back or forward the given number of steps.
         *
         * @param { number } step - The number of steps.
         * @returns { boolean } True if the web page can go back else false.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Checks whether the web page can go back or forward the given number of steps.
         *
         * @param { number } step - The number of steps.
         * @returns { boolean } True if the web page can go back else false.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        accessStep(step: number): boolean;
        /**
         * Goes forward in the history of the web page.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Goes forward in the history of the web page.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        forward(): void;
        /**
         * Goes back in the history of the web page.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Goes back in the history of the web page.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        backward(): void;
        /**
         * Clears the history in the Web.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Clears the history in the Web.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        clearHistory(): void;
        /**
         * Let the Web active.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Let the Web active.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        onActive(): void;
        /**
         * Let the Web inactive.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Let the Web inactive.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        onInactive(): void;
        /**
         * Refreshes the current URL.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Refreshes the current URL.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        refresh(): void;
        /**
         * Loads the data or URL.
         *
         * @param { string } data - A string encoded according to "Base64" or "URL".
         * @param { string } mimeType - Media type. For example: "text/html".
         * @param { string } encoding - Encoding type. For example: "UTF-8".
         * @param { string } [baseUrl] - A specified URL path ("http"/"https"/"data" protocol),
         *                             which is assigned to window.origin by the Web component.
         * @param { string } [historyUrl] - History URL. When it is not empty, it can be managed by
         *                                history records to realize the back and forth function.
         *                                This property is invalid when baseUrl is empty.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Loads the data or URL.
         *
         * @param { string } data - A string encoded according to "Base64" or "URL".
         * @param { string } mimeType - Media type. For example: "text/html".
         * @param { string } encoding - Encoding type. For example: "UTF-8".
         * @param { string } [baseUrl] - A specified URL path ("http"/"https"/"data" protocol),
         *                             which is assigned to window.origin by the Web component.
         * @param { string } [historyUrl] - History URL. When it is not empty, it can be managed by
         *                                history records to realize the back and forth function.
         *                                This property is invalid when baseUrl is empty.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        loadData(data: string, mimeType: string, encoding: string, baseUrl?: string, historyUrl?: string): void;
        /**
         * Loads the data or URL.
         *
         * @param { string | Resource } url - The URL to load.
         * @param { Array<WebHeader> } [headers] - Additional HTTP request header for URL.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 17100003 - Invalid resource path or file type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Loads the data or URL.
         *
         * @param { string | Resource } url - The URL to load.
         * @param { Array<WebHeader> } [headers] - Additional HTTP request header for URL.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 17100003 - Invalid resource path or file type.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Loads the data or URL.
         *
         * @param { string | Resource } url - The URL to load.
         * @param { Array<WebHeader> } [headers] - Additional HTTP request header for URL.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 17100003 - Invalid resource path or file type.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        loadUrl(url: string | Resource, headers?: Array<WebHeader>): void;
        /**
         * Gets the type of HitTest.
         * @returns { WebHitTestType } The type of HitTest.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the type of HitTest.
         * @returns { WebHitTestType } The type of HitTest.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getHitTest(): WebHitTestType;
        /**
         * Stores the current page as a web archive.
         *
         * @param { string } baseName - Where the generated offline webpage is stored, This value cannot be null.
         * @param { boolean } autoName - Decide whether to automatically generate the file name. If false, it is
         *                               stored by the file name of baseName. If true, the file name is
         *                               automatically generated based on the current URL and stored in the file
         *                               directory of baseName.
         * @returns { Promise<string> } a promise resolved after the web archive has been stored. The parameter
         *                              will either be the filename under which the file was stored, or empty
         *                              if storing the file failed.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100003 - Invalid resource path or file type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Stores the current page as a web archive.
         *
         * @param { string } baseName - Where the generated offline webpage is stored, This value cannot be null.
         * @param { boolean } autoName - Decide whether to automatically generate the file name. If false, it is
         *                               stored by the file name of baseName. If true, the file name is
         *                               automatically generated based on the current URL and stored in the file
         *                               directory of baseName.
         * @returns { Promise<string> } a promise resolved after the web archive has been stored. The parameter
         *                              will either be the filename under which the file was stored, or empty
         *                              if storing the file failed.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100003 - Invalid resource path or file type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        storeWebArchive(baseName: string, autoName: boolean): Promise<string>;
        /**
         * Stores the current page as a web archive.
         *
         * @param { string } baseName - Where the generated offline webpage is stored, This value cannot be null.
         * @param { boolean } autoName - Decide whether to automatically generate the file name. If false, it is
         *                               stored by the file name of baseName. If true, the file name is
         *                               automatically generated based on the current URL and stored in the file
         *                               directory of baseName.
         * @param { AsyncCallback<string> } callback - called after the web archive has been stored. The parameter
         *                                             will either be the filename under which the file was stored,
         *                                             or empty if storing the file failed.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100003 - Invalid resource path or file type.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Stores the current page as a web archive.
         *
         * @param { string } baseName - Where the generated offline webpage is stored, This value cannot be null.
         * @param { boolean } autoName - Decide whether to automatically generate the file name. If false, it is
         *                               stored by the file name of baseName. If true, the file name is
         *                               automatically generated based on the current URL and stored in the file
         *                               directory of baseName.
         * @param { AsyncCallback<string> } callback - called after the web archive has been stored. The parameter
         *                                             will either be the filename under which the file was stored,
         *                                             or empty if storing the file failed.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100003 - Invalid resource path or file type.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        storeWebArchive(baseName: string, autoName: boolean, callback: AsyncCallback<string>): void;
        /**
         * Let the Web zoom by.
         *
         * @param { number } factor - The zoom factor.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100004 - Function not enable.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Let the Web zoom by.
         *
         * @param { number } factor - The zoom factor.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100004 - Function not enable.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        zoom(factor: number): void;
        /**
         * Let the Web zoom in.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100004 - Function not enable.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Let the Web zoom in.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100004 - Function not enable.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        zoomIn(): void;
        /**
         * Let the Web zoom out.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100004 - Function not enable.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Let the Web zoom out.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100004 - Function not enable.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        zoomOut(): void;
        /**
         * Gets the hit test value of HitTest.
         * @returns { HitTestValue } Return the element information of the clicked area.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the hit test value of HitTest.
         * @returns { HitTestValue } Return the element information of the clicked area.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getHitTestValue(): HitTestValue;
        /**
         * Gets the id for the current Web.
         * @returns { number } Returns the index value of the current Web component.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the id for the current Web.
         * @returns { number } Returns the index value of the current Web component.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getWebId(): number;
        /**
         * Gets the default user agent.
         * @returns { string } Return user agent information.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the default user agent.
         * @returns { string } Return user agent information.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getUserAgent(): string;
        /**
         * Gets the title of current Web page.
         * @returns { string } Return to File Selector Title.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the title of current Web page.
         * @returns { string } Return to File Selector Title.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getTitle(): string;
        /**
         * Gets the content height of current Web page.
         * @returns { number } Returns the page height of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the content height of current Web page.
         * @returns { number } Returns the page height of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getPageHeight(): number;
        /**
         * Goes forward or back backOrForward in the history of the web page.
         *
         * @param { number } step - Steps to go forward or backward.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Goes forward or back backOrForward in the history of the web page.
         *
         * @param { number } step - Steps to go forward or backward.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        backOrForward(step: number): void;
        /**
         * Gets the request focus.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the request focus.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        requestFocus(): void;
        /**
         * Create web message ports
         * @returns { Array<WebMessagePort> } An array represent 2 WebMessagePort, then can use
         *                                    those ports to communication with html pages.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Create web message ports
         * @param { boolean } isExtentionType - Set whether the web message port supports extention type.
         * @returns { Array<WebMessagePort> } An array represent 2 WebMessagePort, then can use
         *                                    those ports to communication with html pages.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Create web message ports
         * @param { boolean } isExtentionType - Set whether the web message port supports extention type.
         * @returns { Array<WebMessagePort> } An array represent 2 WebMessagePort, then can use
         *                                    those ports to communication with html pages.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        createWebMessagePorts(isExtentionType?: boolean): Array<WebMessagePort>;
        /**
         * Post web message port to html
         *
         * @param { string } name - Data name information to send.
         * @param { Array<WebMessagePort> } ports - Port number array information to send.
         * @param { string } uri - URI to receive this information.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Post web message port to html
         *
         * @param { string } name - Data name information to send.
         * @param { Array<WebMessagePort> } ports - Port number array information to send.
         * @param { string } uri - URI to receive this information.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        postMessage(name: string, ports: Array<WebMessagePort>, uri: string): void;
        /**
         * Stops the current load.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Stops the current load.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        stop(): void;
        /**
         * Registers the JavaScript object and method list.
         *
         * @param { object } object - Application side JavaScript objects participating in registration.
         * @param { string } name - The name of the registered object, which is consistent with the
         *                          object name called in the window.
         * @param { Array<string> } methodList - Thr method of the application side JavaScript object participating
         *                                       in the registration.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Registers the JavaScript object and method list.
         *
         * @param { object } object - Application side JavaScript objects participating in registration.
         * @param { string } name - The name of the registered object, which is consistent with the
         *                          object name called in the window.
         * @param { Array<string> } methodList - Thr method of the application side JavaScript object participating
         *                                       in the registration.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        registerJavaScriptProxy(object: object, name: string, methodList: Array<string>): void;
        /**
         * Deletes a registered JavaScript object with given name.
         *
         * @param { string } name - The name of a registered JavaScript object to be deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100008 - Cannot delete JavaScriptProxy.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Deletes a registered JavaScript object with given name.
         *
         * @param { string } name - The name of a registered JavaScript object to be deleted.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100008 - Cannot delete JavaScriptProxy.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        deleteJavaScriptRegister(name: string): void;
        /**
         * Search all instances of 'searchString' on the page and highlights them,
         * result will be notify through callback onSearchResultReceive.
         *
         * @param { string } searchString - String to be search.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                         The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Search all instances of 'searchString' on the page and highlights them,
         * result will be notify through callback onSearchResultReceive.
         *
         * @param { string } searchString - String to be search.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                         The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        searchAllAsync(searchString: string): void;
        /**
         * Clears the highlighting surrounding text matches created by searchAllAsync.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Clears the highlighting surrounding text matches created by searchAllAsync.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        clearMatches(): void;
        /**
         * Highlights and scrolls to the next match search.
         *
         * @param { boolean } forward - Step of search is back or forward.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Highlights and scrolls to the next match search.
         *
         * @param { boolean } forward - Step of search is back or forward.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        searchNext(forward: boolean): void;
        /**
         * Clears the ssl cache in the Web.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Clears the ssl cache in the Web.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        clearSslCache(): void;
        /**
         * Clears the client authentication certificate cache in the Web.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Clears the client authentication certificate cache in the Web.
         *
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        clearClientAuthenticationCache(): void;
        /**
         * Loads a piece of code and execute JS code in the context of the currently displayed page.
         *
         * @param { string } script - JavaScript Script.
         * @returns { Promise<string> } A promise is solved after the JavaScript script is executed.
         *                              This parameter will be the result of JavaScript script execution.
         *                              If the JavaScript script fails to execute or has no return value,
         *                              null will be returned.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Loads a piece of code and execute JS code in the context of the currently displayed page.
         *
         * @param { string } script - JavaScript Script.
         * @returns { Promise<string> } A promise is solved after the JavaScript script is executed.
         *                              This parameter will be the result of JavaScript script execution.
         *                              If the JavaScript script fails to execute or has no return value,
         *                              null will be returned.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        runJavaScript(script: string): Promise<string>;
        /**
         * Loads a piece of code and execute JS code in the context of the currently displayed page.
         *
         * @param { string } script - JavaScript Script.
         * @param { AsyncCallback<string> } callback - Callbacks execute JavaScript script results.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Loads a piece of code and execute JS code in the context of the currently displayed page.
         *
         * @param { string } script - JavaScript Script.
         * @param { AsyncCallback<string> } callback - Callbacks execute JavaScript script results.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        runJavaScript(script: string, callback: AsyncCallback<string>): void;
        /**
         * Execute JavaScript code in the context of the currently displayed page, and return the result.
         *
         * @param { string } script - JavaScript Script.
         * @returns { Promise<JsMessageExt> } A promise is solved after the JavaScript script is executed.
         *                              This parameter will be the result of JavaScript script execution.
         *                              If the JavaScript script fails to execute or has no return value,
         *                              a none type value will be returned.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Execute JavaScript code in the context of the currently displayed page, and return the result.
         *
         * @param { string } script - JavaScript Script.
         * @returns { Promise<JsMessageExt> } A promise is solved after the JavaScript script is executed.
         *                              This parameter will be the result of JavaScript script execution.
         *                              If the JavaScript script fails to execute or has no return value,
         *                              a none type value will be returned.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        runJavaScriptExt(script: string): Promise<JsMessageExt>;
        /**
         * Execute JavaScript code in the context of the currently displayed page, and return the result.
         *
         * @param { string } script - JavaScript Script.
         * @param { AsyncCallback<JsMessageExt> } callback - Callbacks execute JavaScript script results.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Execute JavaScript code in the context of the currently displayed page, and return the result.
         *
         * @param { string } script - JavaScript Script.
         * @param { AsyncCallback<JsMessageExt> } callback - Callbacks execute JavaScript script results.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        runJavaScriptExt(script: string, callback: AsyncCallback<JsMessageExt>): void;
        /**
         * Gets the url of current Web page.
         * @returns { string } Return the url of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the url of current Web page.
         * @returns { string } Return the url of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getUrl(): string;
        /**
         * Scroll the contents of this Webview up by half the view size.
         *
         * @param { boolean } top - Whether to jump to the top of the page, if set to false,
         *                          the page content will scroll up half the size of the viewframe,
         *                          and when set to true, it will jump to the top of the page.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Scroll the contents of this Webview up by half the view size.
         *
         * @param { boolean } top - Whether to jump to the top of the page, if set to false,
         *                          the page content will scroll up half the size of the viewframe,
         *                          and when set to true, it will jump to the top of the page.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        pageUp(top: boolean): void;
        /**
         * Scroll the contents of this Webview down by half the view size.
         *
         * @param { boolean } bottom - Whether to jump to the top of the page, if set to false,
         *                             the page content will scroll up half the size of the viewframe,
         *                             and when set to true, it will jump to the top of the page.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Scroll the contents of this Webview down by half the view size.
         *
         * @param { boolean } bottom - Whether to jump to the top of the page, if set to false,
         *                             the page content will scroll up half the size of the viewframe,
         *                             and when set to true, it will jump to the top of the page.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        pageDown(bottom: boolean): void;
        /**
         * Gets the original url of current Web page.
         * @returns { string } Return the original url of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the original url of current Web page.
         * @returns { string } Return the original url of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getOriginalUrl(): string;
        /**
         * Gets the favicon of current Web page.
         * @returns { image.PixelMap } Return the favicon bitmap of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Gets the favicon of current Web page.
         * @returns { image.PixelMap } Return the favicon bitmap of the current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getFavicon(): image.PixelMap;
        /**
         * Put network state for web. Which is used to set window.navigator.onLine property in
         * JavaScript.
         * @param { boolean } enable - Whether enable window.navigator.onLine.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Put network state for web. Which is used to set window.navigator.onLine property in
         * JavaScript.
         * @param { boolean } enable - Whether enable window.navigator.onLine.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setNetworkAvailable(enable: boolean): void;
        /**
         * Query if current document has image.
         *
         * @returns { Promise<boolean> } A promise resolved after query image has finished.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Query if current document has image.
         *
         * @returns { Promise<boolean> } A promise resolved after query image has finished.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        hasImage(): Promise<boolean>;
        /**
         * Query if current document has image.
         *
         * @param { AsyncCallback<boolean> } callback - Called after query image has finished.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Query if current document has image.
         *
         * @param { AsyncCallback<boolean> } callback - Called after query image has finished.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        hasImage(callback: AsyncCallback<boolean>): void;
        /**
         * Get back forward stack list from current webview.
         * @returns { BackForwardList } Back forward list for current webview.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Get back forward stack list from current webview.
         * @returns { BackForwardList } Back forward list for current webview.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getBackForwardEntries(): BackForwardList;
        /**
         * Remove resource cache in application. So this method will remove all cache for all web components in the
         * same application.
         *
         * @param { boolean } clearRom - Remove cache in both rom and ram if true. Otherwise only clear cache
         *                               in ram.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Remove resource cache in application. So this method will remove all cache for all web components in the
         * same application.
         *
         * @param { boolean } clearRom - Remove cache in both rom and ram if true. Otherwise only clear cache
         *                               in ram.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        removeCache(clearRom: boolean): void;
        /**
         * Scroll to the position.
         *
         * @param { number } x - the x of the position.
         * @param { number } y - the y of the position.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Scroll to the position.
         *
         * @param { number } x - the x of the position.
         * @param { number } y - the y of the position.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        scrollTo(x: number, y: number): void;
        /**
         * Scroll by the delta position.
         *
         * @param { number } deltaX - the delta x of the position.
         * @param { number } deltaY - the delta y of the position.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Scroll by the delta position.
         *
         * @param { number } deltaX - the delta x of the position.
         * @param { number } deltaY - the delta y of the position.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        scrollBy(deltaX: number, deltaY: number): void;
        /**
         * Slide by the speed.
         *
         * @param { number } vx - the x speed of the speed.
         * @param { number } vy - the y speed of the speed.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Slide by the speed.
         *
         * @param { number } vx - the x speed of the speed.
         * @param { number } vy - the y speed of the speed.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        slideScroll(vx: number, vy: number): void;
        /**
         * Serialize the access stack of the web, that is, the history of access.
         * @returns { Uint8Array } Web access stack after serialization.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Serialize the access stack of the web, that is, the history of access.
         * @returns { Uint8Array } Web access stack after serialization.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        serializeWebState(): Uint8Array;
        /**
         * Restoring the web access stack, that is, the history of access.
         * @param { Uint8Array } state - Web access stack after serialization.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Restoring the web access stack, that is, the history of access.
         * @param { Uint8Array } state - Web access stack after serialization.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        restoreWebState(state: Uint8Array): void;
        /**
         * Set whether the Web custom scheme supports cross domain and fetch requests.
         * @param { Array<WebCustomScheme> } schemes - Configuration of web custom scheme.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 9
         */
        /**
         * Set whether the Web custom scheme supports cross domain and fetch requests.
         * @param { Array<WebCustomScheme> } schemes - Configuration of web custom scheme.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static customizeSchemes(schemes: Array<WebCustomScheme>): void;
        /**
         * Get certificate for the current website.
         * @returns { Promise<Array<cert.X509Cert>> } the promise of the current website's certificate.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get certificate for the current website.
         * @returns { Promise<Array<cert.X509Cert>> } the promise of the current website's certificate.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getCertificate(): Promise<Array<cert.X509Cert>>;
        /**
         * Get certificate for the current website.
         * @param {AsyncCallback<Array<cert.X509Cert>>} callback - the callback of getCertificate.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get certificate for the current website.
         * @param {AsyncCallback<Array<cert.X509Cert>>} callback - the callback of getCertificate.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getCertificate(callback: AsyncCallback<Array<cert.X509Cert>>): void;
        /**
         * Set audio muted.
         * @param { boolean } mute - Set the audio muted or not.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set audio muted.
         * @param { boolean } mute - Set the audio muted or not.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setAudioMuted(mute: boolean): void;
        /**
         * Prefetch the resources required by the page, but will not execute js or render the page.
         * @param { string } url - Which url to preresolve/preconnect.
         * @param { Array<WebHeader> } [additionalHeaders] - Additional HTTP request header of the URL.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Prefetch the resources required by the page, but will not execute js or render the page.
         * @param { string } url - Which url to preresolve/preconnect.
         * @param { Array<WebHeader> } [additionalHeaders] - Additional HTTP request header of the URL.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        prefetchPage(url: string, additionalHeaders?: Array<WebHeader>): void;
        /**
         * Preresolve or Preconnect the url. This API can be called before loading the url to make loading faster.
         * @param { string } url - Which url to preresolve/preconnect.
         * @param { boolean } preconnectable - Indicates whether to preconnect.
         * @param { number } numSockets - If preconnectable is true, this parameter indicates the number of sockets to be preconnected.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 171000013 - The number of preconnect sockets is invalid.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Preresolve or Preconnect the url. This API can be called before loading the url to make loading faster.
         * @param { string } url - Which url to preresolve/preconnect.
         * @param { boolean } preconnectable - Indicates whether to preconnect.
         * @param { number } numSockets - If preconnectable is true, this parameter indicates the number of sockets to be preconnected.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @throws { BusinessError } 171000013 - The number of preconnect sockets is invalid.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static prepareForPageLoad(url: string, preconnectable: boolean, numSockets: number): void;
        /**
         * Set custom user agent.
         * @param { string } userAgent - User custom agent information.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Set custom user agent.
         * @param { string } userAgent - User custom agent information.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        setCustomUserAgent(userAgent: string): void;
        /**
         * Get custom user agent.
         * @returns { string } Get custom User agent information.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 10
         */
        /**
         * Get custom user agent.
         * @returns { string } Get custom User agent information.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getCustomUserAgent(): string;
        /**
         * Set web engine socket connection timeout.
         * @param { number } timeout - Socket connection timeout.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static setConnectionTimeout(timeout: number): void;
        /**
         * Set delegate for download.
         * Used to notify the progress of the download triggered from web.
         * @param { WebDownloadDelegate } delegate - Delegate used for download triggered from web.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        setDownloadDelegate(delegate: WebDownloadDelegate): void;
        /**
         * Start a download.
         * @param { string } url - The download url.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        startDownload(url: string): void;
        /**
         * Loads the URL use "POST" method with post data.
         *
         * @param { string } url - Request the URL use "POST" method.
         * @param { ArrayBuffer } postData - This data will passed to "POST" request.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @throws { BusinessError } 17100002 - Invalid url.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        postUrl(url: string, postData: ArrayBuffer): void;
        /**
         * Create the Web Print Document Adapter.
         * @param { string } jobName - The name of the currently printed document.
         * @returns { print.PrintDocumentAdapter } Return the Print Document Adapter.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @since 11
         */
        createWebPrintDocumentAdapter(jobName: string): print.PrintDocumentAdapter;
        /**
         * Get the security level of the current page.
         *
         * @returns { SecurityLevel } the security level of current page.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getSecurityLevel(): SecurityLevel;
        /**
         * Whether the incognito mode is set.
         *
         * @returns { boolean } {@code true} has been set the incognito mode; {@code false} otherwise.
         * @throws { BusinessError } 17100001 - Init error.
         *                           The WebviewController must be associated with a Web component.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        isIncognitoMode(): boolean;
    }
    /**
     * Defines the state for download.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    enum WebDownloadState {
        /**
         * The web download is in progress.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        IN_PROGRESS = 0,
        /**
         * The web download has been completed.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        COMPLETED,
        /**
         * The web download was canceled.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        CANCELED,
        /**
         * The web download was interrupted.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        INTERRUPTED,
        /**
         * The web download is pending.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        PENDING,
        /**
         * The web download has been paused.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        PAUSED,
        /**
         * Unknown state.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        UNKNOWN
    }
    /**
     * Defines the error code for download.
     * @enum {number}
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    enum WebDownloadErrorCode {
        /**
         * Unknown error.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        ERROR_UNKNOWN = 0,
        /**
         * Generic file operation failure.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_FAILED = 1,
        /**
         * The file cannot be accessed due to certain restrictions.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_ACCESS_DENIED = 2,
        /**
         * There is not enough disk space.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_NO_SPACE = 3,
        /**
         * The file name is too long.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_NAME_TOO_LONG = 5,
        /**
         * The file is too large.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_TOO_LARGE = 6,
        /**
         * Some temporary problems occurred, such as not enough memory, files in use, and too many files open at the same time.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_TRANSIENT_ERROR = 10,
        /**
         * The file is blocked from accessing because of some local policy.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_BLOCKED = 11,
        /**
         * When trying to resume the download, Found that the file is not long enough, maybe the file no longer exists.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_TOO_SHORT = 13,
        /**
         * Hash mismatch.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_HASH_MISMATCH = 14,
        /**
         * The file already exists.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        FILE_SAME_AS_SOURCE = 15,
        /**
         * Generic network error.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NETWORK_FAILED = 20,
        /**
         * The network operation timed out.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NETWORK_TIMEOUT = 21,
        /**
         * The network was disconnected.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NETWORK_DISCONNECTED = 22,
        /**
         * Server down.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NETWORK_SERVER_DOWN = 23,
        /**
         * Invalid network requests，may redirect to unsupported scheme or an invalid URL.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        NETWORK_INVALID_REQUEST = 24,
        /**
         * The server returned a generic error.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_FAILED = 30,
        /**
         * The server does not support range requests.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_NO_RANGE = 31,
        /**
         * The server does not have the requested data.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_BAD_CONTENT = 33,
        /**
         * The server does not allow the file to be downloaded.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_UNAUTHORIZED = 34,
        /**
         * Server certificate error.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_CERT_PROBLEM = 35,
        /**
         * Server access forbidden.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_FORBIDDEN = 36,
        /**
         * Server unreachable.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_UNREACHABLE = 37,
        /**
         * The received data does not match content-length.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_CONTENT_LENGTH_MISMATCH = 38,
        /**
         * An unexpected cross-origin redirect happened.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        SERVER_CROSS_ORIGIN_REDIRECT = 39,
        /**
         * User cancel.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        USER_CANCELED = 40,
        /**
         * User shut down the application.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        USER_SHUTDOWN = 41,
        /**
         * Application crash.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        CRASH = 50
    }
    /**
     * Represents a download task, You can use this object to operate the corresponding download task.
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    class WebDownloadItem {
        /**
        * Get guid.
        * @returns { string } - Returns the download's guid.
        * @syscap SystemCapability.Web.Webview.Core
        * @atomicservice
        * @since 11
        */
        getGuid(): string;
        /**
         * Get current speed, in bytes per second.
         * @returns { number } - Returns the current download speed.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getCurrentSpeed(): number;
        /**
         * Get percent complete.
         * @returns { number } - Returns -1 if progress is unknown. 100 if the download is already complete.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getPercentComplete(): number;
        /**
         * Get total bytes.
         * @returns { number } - Returns the total bytes received, -1 if the total size is unknown.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getTotalBytes(): number;
        /**
         * Get state of the web download.
         * @returns { WebDownloadState } - Returns the current download state.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getState(): WebDownloadState;
        /**
         * Get last error code of the web download.
         * @returns { WebDownloadErrorCode } - Returns the last error code.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getLastErrorCode(): WebDownloadErrorCode;
        /**
         * Get http method of the web download request.
         * @returns { string } - Returns the http request method.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getMethod(): string;
        /**
         * Get mime type of the web download.
         * @returns { string } - Returns the mimetype.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getMimeType(): string;
        /**
         * Get url of the web download request.
         * @returns { string } - Returns the url.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getUrl(): string;
        /**
         * Get suggested file name of the web download request.
         * @returns { string } - Returns the suggested file name.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getSuggestedFileName(): string;
        /**
         * Start the web download.
         * Used in onBeforeDownload, If you want to start the current download, call this function.
         * @param { string } downloadPath - The content will be downloaded to this file.
           * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        start(downloadPath: string): void;
        /**
         * Cancel the web download.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        cancel(): void;
        /**
         * Pause the web download.
         * @throws { BusinessError } 17100019 - The download has not been started yet.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        pause(): void;
        /**
         * Resume the web download.
         * Use WebDownloadManager.resumeDownload to resume deserialized downloads.
         * WebDownloadItem.resume is only used to resume the currently paused download.
         * @throws { BusinessError } 17100016 - The download is not paused.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        resume(): void;
        /**
         * Get received bytes.
         * @returns { number } - Returns the received bytes.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getReceivedBytes(): number;
        /**
         * Get full path of the web download.
         * @returns { string } - Returns the full path of the download.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        getFullPath(): string;
        /**
         * Serialize web download to typed array.
         * @returns { Uint8Array } - Returns the serialized data.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        serialize(): Uint8Array;
        /**
         * Deserialize web download from typed array.
         * @param { Uint8Array } serializedData - The serialized data.
         * @returns { WebDownloadItem } - Deserialize the serialized data into a WebDownloadItem.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static deserialize(serializedData: Uint8Array): WebDownloadItem;
    }
    /**
     * The download state is notified through this delegate.
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    class WebDownloadDelegate {
        /**
         * Callback will be triggered before web download start.
         * @param { Callback<WebDownloadItem> } callback - The callback of download will be start.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        onBeforeDownload(callback: Callback<WebDownloadItem>): void;
        /**
         * Callback will be triggered when web download is processing.
         * @param { Callback<WebDownloadItem> } callback - The callback of download did update.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        onDownloadUpdated(callback: Callback<WebDownloadItem>): void;
        /**
         * Callback will be triggered when web download is completed.
         * @param { Callback<WebDownloadItem> } callback - The callback of download did finish.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        onDownloadFinish(callback: Callback<WebDownloadItem>): void;
        /**
         * Callback will be triggered when web download is interrupted or canceled.
         * @param { Callback<WebDownloadItem> } callback - The callback of download did fail.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        onDownloadFailed(callback: Callback<WebDownloadItem>): void;
    }
    /**
     * You can trigger download manually through this interface, or resume failed or canceled downloads.
     * @syscap SystemCapability.Web.Webview.Core
     * @atomicservice
     * @since 11
     */
    class WebDownloadManager {
        /**
         * Set a delegate used to receive the progress of the download triggered from WebDownloadManager.
         * @param { WebDownloadDelegate } delegate - Delegate used for download triggered from WebDownloadManager.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static setDownloadDelegate(delegate: WebDownloadDelegate): void;
        /**
         * Resume the canceled or failed download.
         * @param { WebDownloadItem } webDownloadItem - Download that need to be resume.
         * @throws { BusinessError } 17100018 - No WebDownloadDelegate has been set yet.
         * @syscap SystemCapability.Web.Webview.Core
         * @atomicservice
         * @since 11
         */
        static resumeDownload(webDownloadItem: WebDownloadItem): void;
    }
}
export default webview;
