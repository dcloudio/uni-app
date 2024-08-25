/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file Defines the DRM capability.
 * @kit DrmKit
 */
/**
 * This module provides the DRM capability to multimedia player.
 * @namespace drm
 * @syscap SystemCapability.Multimedia.Drm.Core
 * @since 11
 */
/**
 * This module provides the DRM capability to multimedia player.
 * @namespace drm
 * @syscap SystemCapability.Multimedia.Drm.Core
 * @atomicservice
 * @since 12
 */
declare namespace drm {
    /**
     * Enumerates drm error code.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    enum DrmErrorCode {
        /**
         * All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        ERROR_UNKNOWN = 24700101,
        /**
         * Meet max MediaKeySystem num limit.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        MAX_SYSTEM_NUM_REACHED = 24700103,
        /**
         * Meet max MediaKeySession num limit.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        MAX_SESSION_NUM_REACHED = 24700104,
        /**
         * Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        SERVICE_FATAL_ERROR = 24700201
    }
    /**
     * Enumerates which config name we can get.
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    enum PreDefinedConfigName {
        /**
         * Config name vendor
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CONFIG_DEVICE_VENDOR = 'vendor',
        /**
         * Config name version
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CONFIG_DEVICE_VERSION = 'version',
        /**
         * Config name description
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CONFIG_DEVICE_DESCRIPTION = 'description',
        /**
         * Config name algorithms
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CONFIG_DEVICE_ALGORITHMS = 'algorithms',
        /**
         * Config name deviceUniqueId
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CONFIG_DEVICE_UNIQUE_ID = 'deviceUniqueId',
        /**
         * Config name maxSessionNum
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CONFIG_SESSION_MAX = 'maxSessionNum',
        /**
         * Config name currentSessionNum
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CONFIG_SESSION_CURRENT = 'currentSessionNum'
    }
    /**
     * Enumerates media key type.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    enum MediaKeyType {
        /**
         * Offline media key type.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        MEDIA_KEY_TYPE_OFFLINE = 0,
        /**
         * Online media key type.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        MEDIA_KEY_TYPE_ONLINE
    }
    /**
     * Enumerates offline media key status.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    enum OfflineMediaKeyStatus {
        /**
         * Offline media key status unknown.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        OFFLINE_MEDIA_KEY_STATUS_UNKNOWN = 0,
        /**
         * Offline media key status usable.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        OFFLINE_MEDIA_KEY_STATUS_USABLE = 1,
        /**
         * Offline media key status inactive.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        OFFLINE_MEDIA_KEY_STATUS_INACTIVE = 2
    }
    /**
     * Enumerates certificate status.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    enum CertificateStatus {
        /**
         * Device already provisioned.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CERT_STATUS_PROVISIONED = 0,
        /**
         * Device not provisioned.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CERT_STATUS_NOT_PROVISIONED,
        /**
         * Cert already expired.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CERT_STATUS_EXPIRED,
        /**
         * Certs are invalid.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CERT_STATUS_INVALID,
        /**
         * Get certs status failed.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        CERT_STATUS_UNAVAILABLE
    }
    /**
     * Enumerates media key request types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Enumerates media key request types.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    enum MediaKeyRequestType {
        /**
         * Media key request type unknown.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request type unknown.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        MEDIA_KEY_REQUEST_TYPE_UNKNOWN = 0,
        /**
         * Media key request type initial.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request type initial.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        MEDIA_KEY_REQUEST_TYPE_INITIAL = 1,
        /**
         * Media key request type renewal.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request type renewal.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        MEDIA_KEY_REQUEST_TYPE_RENEWAL = 2,
        /**
         * Media key request type release.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request type release.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        MEDIA_KEY_REQUEST_TYPE_RELEASE = 3,
        /**
         * Media key request type none.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request type none.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        MEDIA_KEY_REQUEST_TYPE_NONE = 4,
        /**
         * Media key request type update.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request type update.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        MEDIA_KEY_REQUEST_TYPE_UPDATE = 5
    }
    /**
     * Enumerates content protection level.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Enumerates content protection level.
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    enum ContentProtectionLevel {
        /**
         * Device decrypt and decode type unknown.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Device decrypt and decode type unknown.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        CONTENT_PROTECTION_LEVEL_UNKNOWN = 0,
        /**
         * Device using software level.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Device using software level.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        CONTENT_PROTECTION_LEVEL_SW_CRYPTO,
        /**
         * Device using hardware level.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Device using hardware level.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        CONTENT_PROTECTION_LEVEL_HW_CRYPTO,
        /**
         * Device using enhanced hardware level.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Device using enhanced hardware level.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        CONTENT_PROTECTION_LEVEL_ENHANCED_HW,
        /**
         * Max mode.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Max mode.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        CONTENT_PROTECTION_LEVEL_MAX
    }
    /**
     * Provides the drm provision request definitions.
     * @interface ProvisionRequest
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    interface ProvisionRequest {
        /**
         * Provision request data sent to provision server.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        data: Uint8Array;
        /**
         * Provision server URL.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        defaultURL: string;
    }
    /**
     * Provides the drm media key request info optional data.
     * @interface OptionsData
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Provides the drm media key request info optional data.
     * @interface OptionsData
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    interface OptionsData {
        /**
         * App defined optional data name.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * App defined optional data name.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        name: string;
        /**
         * App defined optional data value.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * App defined optional data value.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        value: string;
    }
    /**
     * Provides the drm media key request definitions.
     * @interface MediaKeyRequest
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Provides the drm media key request definitions.
     * @interface MediaKeyRequest
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    interface MediaKeyRequest {
        /**
         * Media key request type.
         * @type { MediaKeyRequestType }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request type.
         * @type { MediaKeyRequestType }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        mediaKeyRequestType: MediaKeyRequestType;
        /**
         * Media key request data sent to media key server.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key request data sent to media key server.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        data: Uint8Array;
        /**
         * Media key server URL.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key server URL.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        defaultURL: string;
    }
    /**
     * Used to indicates the event info attached to specific event type.
     * @interface EventInfo
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Used to indicates the event info attached to specific event type.
     * @interface EventInfo
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    interface EventInfo {
        /**
         * Event info.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Event info.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        info: Uint8Array;
        /**
         * Event extra info.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Event extra info.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        extraInfo: string;
    }
    /**
     * Used to indicates the statistic info.
     * @interface StatisticKeyValue
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    interface StatisticKeyValue {
        /**
         * Statistic info name.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        name: string;
        /**
         * Statistic info value.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        value: string;
    }
    /**
     * Used to indicates the media key status.
     * @interface MediaKeyStatus
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Used to indicates the media key status.
     * @interface MediaKeyStatus
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    interface MediaKeyStatus {
        /**
         * Media key Id in string.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key Id in string.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        name: string;
        /**
         * Media key status description.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Media key status description.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        value: string;
    }
    /**
     * Used to indicates the media key status with a key and its value.
     * @interface KeysInfo
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Used to indicates the media key status with a key and its value.
     * @interface KeysInfo
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    interface KeysInfo {
        /**
         * Keys Id in media key.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Keys Id in media key.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        keyId: Uint8Array;
        /**
         * Keys status description.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Keys status description.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        value: string;
    }
    /**
     * Used to indicates the media key system info of media source.
     * @interface MediaKeySystemInfo
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Used to indicates the media key system info of media source.
     * @interface MediaKeySystemInfo
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    interface MediaKeySystemInfo {
        /**
         * Drm system ID.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Drm system ID.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        uuid: string;
        /**
         * PSSH(protection scheme specific header) contain drm info.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * PSSH(protection scheme specific header) contain drm info.
         * @type { Uint8Array }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        pssh: Uint8Array;
    }
    /**
       * Name and UUID of DRM plugin.
       * @interface MediaKeySystemDescription
       * @syscap SystemCapability.Multimedia.Drm.Core
       * @since 12
       */
    interface MediaKeySystemDescription {
        /**
         * Name of DRM plugin.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 12
         */
        name: string;
        /**
         * UUID supported by DRM plugin.
         * @type { string }
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 12
         */
        uuid: string;
    }
    /**
     * Get a MediaKeySystem's UUID.
     * @param { string } name - The Digital Right Management solution name.
     * @returns { string } The MediaKeySystem uuid.
     * @throws { BusinessError } 401 - The parameter check failed.Possibly because:
     * <br>1.Mandatory parameters are left unspecified. 2.Parameter verification failed.
     * @throws { BusinessError } 24700101 - All unknown errors.
     * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 12
     */
    function getMediaKeySystemUuid(name: string): string;
    /**
     * Get all media key systems supported.
     * @returns { MediaKeySystemDescription[] } The MediaKeySystem name and uuid info list.
     * @throws { BusinessError } 24700101 - All unknown errors.
     * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 12
     */
    function getMediaKeySystems(): MediaKeySystemDescription[];
    /**
     * Creates a MediaKeySystem instance.
     * @param { string } name - Used to point a Digital Right Management solution.
     * @returns { MediaKeySystem } The MediaKeySystem instance.
     * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
     * 1.Mandatory parameters are left unspecified. 2.Parameter verification failed.
     * @throws { BusinessError } 24700101 - All unknown errors.
     * @throws { BusinessError } 24700103 - Meet max MediaKeySystem num limit.
     * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    function createMediaKeySystem(name: string): MediaKeySystem;
    /**
     * Judge whether a system that specifies name, mimetype and content protection level is supported.
     * @param { string } name - Used to point a Digital Right Management solution.
     * @param { string } mimeType - Used to specifies the media type.
     * @param { ContentProtectionLevel } level - Used to specifies the ContentProtectionLevel.
     * @returns { boolean } Whether these conditions will be met.
     * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
     * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 24700101 - All unknown errors.
     * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    function isMediaKeySystemSupported(name: string, mimeType: string, level: ContentProtectionLevel): boolean;
    /**
     * Judge whether a system that specifies name, mimetype is supported.
     * @param { string } name - Used to point a Digital Right Management solution.
     * @param { string } mimeType - Used to specifies the media type.
     * @returns { boolean } Whether these conditions will be met.
     * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
     * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * 3.Parameter verification failed.
     * @throws { BusinessError } 24700101 - All unknown errors.
     * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    function isMediaKeySystemSupported(name: string, mimeType: string): boolean;
    /**
     * Judge whether a system that specifies name is supported.
     * @param { string } name - Used to point a Digital Right Management solution.
     * @returns { boolean } Whether these conditions will be met.
     * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
     * 1.Mandatory parameters are left unspecified. 2.Parameter verification failed,
     * the param name's length is zero or too big(exceeds 4096 Bytes).
     * @throws { BusinessError } 24700101 - All unknown errors.
     * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    function isMediaKeySystemSupported(name: string): boolean;
    /**
     * Manages and record MediaKeySessions. Before calling an MediaKeySystem method, we must use getMediaKeySystem
     * to get a MediaKeySystem instance, then we can call functions.
     * @interface MediaKeySystem
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     *
     */
    interface MediaKeySystem {
        /**
         * Get the specified configuration.
         * @param { string } configName - Used to specify the config name.
         * @returns { string } The config value string.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Parameter verification failed,
         * the param's length is zero or too big(exceeds 4096 Bytes).
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        getConfigurationString(configName: string): string;
        /**
         * Set the specified configuration.
         * @param { string } configName - Used to specify the config name.
         * @param { string } value - The value to be set.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        setConfigurationString(configName: string, value: string): void;
        /**
         * Get the specified configuration.
         * @param { string } configName - Used to specify the config name.
         * @returns { Uint8Array } The config value.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        getConfigurationByteArray(configName: string): Uint8Array;
        /**
         * Set the specified configuration.
         * @param { string } configName - Used to specify the config name.
         * @param { Uint8Array } value - The value to be set.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        setConfigurationByteArray(configName: string, value: Uint8Array): void;
        /**
         * Get performance statistics information.That includes currentSessionNum, version, decryptNumber,
         * and errorDecryptNumber.
         * @returns { StatisticKeyValue[] } A list that includes performance index and corresponding statistics.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        getStatistics(): StatisticKeyValue[];
        /**
         * Get max content protection level the device supports.
         * @returns { ContentProtectionLevel } The max content protection level of the MediaKeySystem instance.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        getMaxContentProtectionLevel(): ContentProtectionLevel;
        /**
         * Generate a media key system provision request.
         * @returns { Promise<ProvisionRequest> } Promise with ProvisionRequest used to return the result.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        generateKeySystemRequest(): Promise<ProvisionRequest>;
        /**
         * Process the response corresponding the key system request obtained by the application.
         * @param { Uint8Array } response - Response corresponding to the request.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        processKeySystemResponse(response: Uint8Array): Promise<void>;
        /**
         * Get certificate status of the MediaKeySystem.
         * @returns { CertificateStatus } Certificate Status of the MediaKeySystem instance.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        getCertificateStatus(): CertificateStatus;
        /**
         * Register keySystemRequired events.
         * @param { 'keySystemRequired' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the key system required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        on(type: 'keySystemRequired', callback: (eventInfo: EventInfo) => void): void;
        /**
         * Unregister keySystemRequired events.
         * @param { 'keySystemRequired' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the key system required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        off(type: 'keySystemRequired', callback?: (eventInfo: EventInfo) => void): void;
        /**
         * Create a MediaKeySession instance with level.
         * @param { ContentProtectionLevel } level - Used to specify the content protection level.
         * @returns { MediaKeySession } A MediaKeySession instance.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.The param level exceeds reasonable range,
         * please use value in ContentProtectionLevel.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700104 - Meet max MediaKeySession num limit.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        createMediaKeySession(level: ContentProtectionLevel): MediaKeySession;
        /**
         * Create a MediaKeySession instance.
         * @returns { MediaKeySession } A MediaKeySession instance.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700104 - Meet max MediaKeySession num limit.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        createMediaKeySession(): MediaKeySession;
        /**
         * Get the list of offline MediaKeyIds.
         * @returns { Uint8Array[] } The list of offline MediaKeyIds.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        getOfflineMediaKeyIds(): Uint8Array[];
        /**
         * Get offline media key status corresponding to the mediaKeyId.
         * @param { Uint8Array } mediaKeyId - The media key identifier.
         * @returns { OfflineMediaKeyStatus } Offline media key Status.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        getOfflineMediaKeyStatus(mediaKeyId: Uint8Array): OfflineMediaKeyStatus;
        /**
         * Remove media key corresponding to the mediaKeyId.
         * @param { Uint8Array } mediaKeyId - The mediaKeyId specifies which media key should be clear.
         * @throws { BusinessError } 401 - The parameter check failed.Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        clearOfflineMediaKeys(mediaKeyId: Uint8Array): void;
        /**
         * Release the resource before the MediaKeySystem gonna be unused.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        destroy(): void;
    }
    /**
     * Provide functions and keep a decrypt module. Before calling an MediaKeySession method, we must
     * use MediaKeySystem's createMediaKeySession to get a MediaKeySession instance.
     * @interface MediaKeySession
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @since 11
     */
    /**
     * Provide functions and keep a decrypt module. Before calling an MediaKeySession method, we must
     * use MediaKeySystem's createMediaKeySession to get a MediaKeySession instance.
     * @interface MediaKeySession
     * @syscap SystemCapability.Multimedia.Drm.Core
     * @atomicservice
     * @since 12
     */
    interface MediaKeySession {
        /**
         * Generate the media key request.
         * @param { string } mimeType - Media type.
         * @param { Uint8Array } initData - PSSH info.
         * @param { number } mediaKeyType - Offline or online.
         * @param { OptionsData[] } options - Optional data the application set to drm framework.
         * @returns { Promise<MediaKeyRequest> } Promise with MediaKeyRequest used to return the result.
         * @throws { BusinessError } 401 -The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Generate the media key request.
         * @param { string } mimeType - Media type.
         * @param { Uint8Array } initData - PSSH info.
         * @param { number } mediaKeyType - Offline or online.
         * @param { OptionsData[] } options - Optional data the application set to drm framework.
         * @returns { Promise<MediaKeyRequest> } Promise with MediaKeyRequest used to return the result.
         * @throws { BusinessError } 401 -The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        generateMediaKeyRequest(mimeType: string, initData: Uint8Array, mediaKeyType: number, options?: OptionsData[]): Promise<MediaKeyRequest>;
        /**
         * Process the response corresponding to the media key request obtained by the application.
         * @param { Uint8Array } response - The response.
         * @returns { Promise<Uint8Array> } Promise with media key identifier in Uint8ARRY used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Process the response corresponding to the media key request obtained by the application.
         * @param { Uint8Array } response - The response.
         * @returns { Promise<Uint8Array> } Promise with media key identifier in Uint8ARRY used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        processMediaKeyResponse(response: Uint8Array): Promise<Uint8Array>;
        /**
         * Check the media key status
         * @returns { MediaKeyStatus[] } A list of media key status description pairs.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Check the media key status
         * @returns { MediaKeyStatus[] } A list of media key status description pairs.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        checkMediaKeyStatus(): MediaKeyStatus[];
        /**
         * Remove media key.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Remove media key.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        clearMediaKeys(): void;
        /**
         * Generate offline media key request.
         * @param { Uint8Array } mediaKeyId - The mediaKeyId specifies which media content's media key request
         * should be generated.
         * @returns { Promise<Uint8Array> } Promise with media key request in Uint8Array used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Generate offline media key request.
         * @param { Uint8Array } mediaKeyId - The mediaKeyId specifies which media content's media key request
         * should be generated.
         * @returns { Promise<Uint8Array> } Promise with media key request in Uint8Array used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        generateOfflineReleaseRequest(mediaKeyId: Uint8Array): Promise<Uint8Array>;
        /**
         * Process offline media key response.
         * @param { Uint8Array } mediaKeyId - The mediaKeyId specifies which media content's media key it is.
         * @param { Uint8Array } response - The offline media key.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Process offline media key response.
         * @param { Uint8Array } mediaKeyId - The mediaKeyId specifies which media content's media key it is.
         * @param { Uint8Array } response - The offline media key.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        processOfflineReleaseResponse(mediaKeyId: Uint8Array, response: Uint8Array): Promise<void>;
        /**
         * Restore offline media key.
         * @param { Uint8Array } mediaKeyId - The mediaKeyId specifies which media key should be restore.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Restore offline media key.
         * @param { Uint8Array } mediaKeyId - The mediaKeyId specifies which media key should be restore.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        restoreOfflineMediaKeys(mediaKeyId: Uint8Array): Promise<void>;
        /**
         * Get content protection level.
         * @returns { ContentProtectionLevel } MediaKeySession content protection level.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Get content protection level.
         * @returns { ContentProtectionLevel } MediaKeySession content protection level.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        getContentProtectionLevel(): ContentProtectionLevel;
        /**
         * Whether the encrypted content require a secure decoder or not.
         * @param { string } mimeType - The media type.
         * @returns { boolean } Whether secure decoder is required.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Whether the encrypted content require a secure decoder or not.
         * @param { string } mimeType - The media type.
         * @returns { boolean } Whether secure decoder is required.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        requireSecureDecoderModule(mimeType: string): boolean;
        /**
         * Register keyRequired event.
         * @param { 'keyRequired' } type - Type of the drm event to listen for.
         * @param { function } callback used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Register keyRequired event.
         * @param { 'keyRequired' } type - Type of the drm event to listen for.
         * @param { function } callback used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'keyRequired', callback: (eventInfo: EventInfo) => void): void;
        /**
         * Unregister keyRequired event.
         * @param { 'keyRequired' } type - Type of the drm event to listen for.
         * @param { function } callback used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Unregister keyRequired event.
         * @param { 'keyRequired' } type - Type of the drm event to listen for.
         * @param { function } callback used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'keyRequired', callback?: (eventInfo: EventInfo) => void): void;
        /**
         * Register keyExpired event.
         * @param { 'keyExpired' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Register keyExpired event.
         * @param { 'keyExpired' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'keyExpired', callback: (eventInfo: EventInfo) => void): void;
        /**
         * Unregister keyExpired event.
         * @param { 'keyExpired' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Unregister keyExpired event.
         * @param { 'keyExpired' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the key required event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'keyExpired', callback?: (eventInfo: EventInfo) => void): void;
        /**
         * Register vendorDefined event.
         * @param { 'vendorDefined' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the vendor defined event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Register vendorDefined event.
         * @param { 'vendorDefined' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the vendor defined event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'vendorDefined', callback: (eventInfo: EventInfo) => void): void;
        /**
         * Unregister vendorDefined event.
         * @param { 'vendorDefined' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the vendor defined event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Unregister vendorDefined event.
         * @param { 'vendorDefined' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for the vendor defined event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'vendorDefined', callback?: (eventInfo: EventInfo) => void): void;
        /**
         * Register expirationUpdate event.
         * @param { 'expirationUpdate' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for expiration update event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Register expirationUpdate event.
         * @param { 'expirationUpdate' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for expiration update event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'expirationUpdate', callback: (eventInfo: EventInfo) => void): void;
        /**
         * Unregister expirationUpdate event.
         * @param { 'expirationUpdate' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for expiration update event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Unregister expirationUpdate event.
         * @param { 'expirationUpdate' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for expiration update event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'expirationUpdate', callback?: (eventInfo: EventInfo) => void): void;
        /**
         * Register keysChange event.
         * @param { 'keysChange' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for keys change event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Register keysChange event.
         * @param { 'keysChange' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for keys change event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'keysChange', callback: (keyInfo: KeysInfo[], newKeyAvailable: boolean) => void): void;
        /**
         * Unregister keysChange event.
         * @param { 'keysChange' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for keys change event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Unregister keysChange event.
         * @param { 'keysChange' } type - Type of the drm event to listen for.
         * @param { function } callback - Used to listen for keys change event.
         * @throws { BusinessError } 401 - The parameter check failed. Possibly because:
         * 1.Mandatory parameters are left unspecified or too many parameters. 2.Incorrect parameter types.
         * 3.Parameter verification failed.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'keysChange', callback?: (keyInfo: KeysInfo[], newKeyAvailable: boolean) => void): void;
        /**
         * Release the resource before the session gonna be unused.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @since 11
         */
        /**
         * Release the resource before the session gonna be unused.
         * @throws { BusinessError } 24700101 - All unknown errors.
         * @throws { BusinessError } 24700201 - Fatal service error, for example, service died.
         * @syscap SystemCapability.Multimedia.Drm.Core
         * @atomicservice
         * @since 12
         */
        destroy(): void;
    }
}
export default drm;
