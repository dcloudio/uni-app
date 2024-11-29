/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit UserAuthenticationKit
 */
import type { AsyncCallback } from './@ohos.base';
/**
 * User authentication
 *
 * @namespace userAuth
 * @syscap SystemCapability.UserIAM.UserAuth.Core
 * @since 6
 */
/**
 * User authentication
 *
 * @namespace userAuth
 * @syscap SystemCapability.UserIAM.UserAuth.Core
 * @atomicservice
 * @since 12
 */
declare namespace userAuth {
    /**
     * The maximum allowable reuse duration is 300000 milliseconds.
     *
     * @constant
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    const MAX_ALLOWABLE_REUSE_DURATION: 300000;
    /**
     * Enum for authentication result.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.userIAM.userAuth.ResultCode
     */
    export enum AuthenticationResult {
        /**
         * Indicates that the device does not support authentication.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        NO_SUPPORT = -1,
        /**
         * Indicates that authentication is success.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        SUCCESS = 0,
        /**
         * Indicates the authenticator fails to identify user.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        COMPARE_FAILURE = 1,
        /**
         * Indicates that authentication has been canceled.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        CANCELED = 2,
        /**
         * Indicates that authentication has timed out.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        TIMEOUT = 3,
        /**
         * Indicates a failure to open the camera.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        CAMERA_FAIL = 4,
        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        BUSY = 5,
        /**
         * Indicates incorrect parameters.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        INVALID_PARAMETERS = 6,
        /**
         * Indicates that the authenticator is locked.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        LOCKED = 7,
        /**
         * Indicates that the user has not enrolled the authenticator.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        NOT_ENROLLED = 8,
        /**
         * Indicates other errors.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        GENERAL_ERROR = 100
    }
    /**
     * Auth types
     *
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 6
     * @deprecated since 8
     */
    type AuthType = 'ALL' | 'FACE_ONLY';
    /**
     * Secure levels
     *
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 6
     * @deprecated since 8
     */
    type SecureLevel = 'S1' | 'S2' | 'S3' | 'S4';
    /**
     * Used to initiate authentication.
     *
     * @interface Authenticator
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 6
     * @deprecated since 8
     */
    interface Authenticator {
        /**
         * Execute authentication.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param { AuthType } type - Indicates the authentication type.
         * @param { SecureLevel } level - Indicates the security level.
         * @param { AsyncCallback<number> } callback - Async callback of execute.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        execute(type: AuthType, level: SecureLevel, callback: AsyncCallback<number>): void;
        /**
         * Execute authentication.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param { AuthType } type - Indicates the authentication type.
         * @param { SecureLevel } level - Indicates the security level.
         * @returns { Promise<number> }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        execute(type: AuthType, level: SecureLevel): Promise<number>;
    }
    /**
     * Get Authenticator instance.
     *
     * @returns { Authenticator } Returns an Authenticator.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 6
     * @deprecated since 8
     */
    function getAuthenticator(): Authenticator;
    /**
     * User authentication.
     *
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.AuthInstance
     */
    class UserAuth {
        /**
         * Constructor to get the UserAuth class instance.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.getAuthInstance
         */
        constructor();
        /**
         * Get version information.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @returns { number } Returns version information.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.getVersion
         */
        getVersion(): number;
        /**
         * Check whether the authentication capability is available.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param { UserAuthType } authType - Credential type for authentication.
         * @param { AuthTrustLevel } authTrustLevel - Trust level of authentication result.
         * @returns { number } Returns a check result, which is specified by getAvailableStatus, the value of number is related to the ResultCode enum, **201** is
         * check permission failed.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.getAvailableStatus
         */
        getAvailableStatus(authType: UserAuthType, authTrustLevel: AuthTrustLevel): number;
        /**
         * Executes authentication.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param { Uint8Array } challenge - Pass in challenge value.
         * @param { UserAuthType } authType - Type of authentication.
         * @param { AuthTrustLevel } authTrustLevel - Trust level of authentication result.
         * @param { IUserAuthCallback } callback - Return result and acquireInfo through callback, the value of result code is related to the ResultCode enum,
         * **201** is check permission failed.
         * @returns { Uint8Array } Returns ContextId for cancel.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthInstance.start
         */
        auth(challenge: Uint8Array, authType: UserAuthType, authTrustLevel: AuthTrustLevel, callback: IUserAuthCallback): Uint8Array;
        /**
         * Cancel authentication with ContextID.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param { Uint8Array } contextID - Cancel authentication and pass in ContextID.
         * @returns { number } Returns a number value indicating whether Cancel authentication was successful, the value of number is related to the ResultCode
         * enum, **201** is check permission failed.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthInstance.cancel
         */
        cancelAuth(contextID: Uint8Array): number;
    }
    /**
     * Asynchronous callback of authentication operation.
     *
     * @interface IUserAuthCallback
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.AuthEvent
     */
    interface IUserAuthCallback {
        /**
         * The authentication result code is returned through the callback.
         * If the authentication is passed, the authentication token is returned in extraInfo,
         * If the authentication fails, the remaining authentication times are returned in extraInfo,
         * If the authentication executor is locked, the freezing time is returned in extraInfo.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthEvent.callback
         */
        onResult: (result: number, extraInfo: AuthResult) => void;
        /**
         * During an authentication, the TipsCode is returned through the callback.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthEvent.callback
         */
        onAcquireInfo?: (module: number, acquire: number, extraInfo: any) => void;
    }
    /**
     * Authentication result: authentication token, remaining authentication times, freezing time.
     *
     * @typedef AuthResult
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.AuthResultInfo
     */
    interface AuthResult {
        /**
         * The authentication result if the authentication is passed.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        token?: Uint8Array;
        /**
         * The remaining authentication times if the authentication fails.
         *
         * @type { ?number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        remainTimes?: number;
        /**
         * The freezing time if the authentication executor is locked.
         *
         * @type { ?number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        freezingTime?: number;
    }
    /**
     * Enum for operation result.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.UserAuthResultCode
     */
    enum ResultCode {
        /**
         * Indicates that the result is success or ability is supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        SUCCESS = 0,
        /**
         * Indicates that authentication failed.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        FAIL = 1,
        /**
         * Indicates other errors.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        GENERAL_ERROR = 2,
        /**
         * Indicates that this operation has been canceled.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        CANCELED = 3,
        /**
         * Indicates that this operation has timed out.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        TIMEOUT = 4,
        /**
         * Indicates that this authentication type is not supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        TYPE_NOT_SUPPORT = 5,
        /**
         * Indicates that the authentication trust level is not supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        TRUST_LEVEL_NOT_SUPPORT = 6,
        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        BUSY = 7,
        /**
         * Indicates incorrect parameters.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        INVALID_PARAMETERS = 8,
        /**
         * Indicates that the authenticator is locked.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        LOCKED = 9,
        /**
         * Indicates that the user has not enrolled the authenticator.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        NOT_ENROLLED = 10
    }
    /**
     * The enumeration of prompt codes in the process of face authentication.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 11
     */
    enum FaceTips {
        /**
         * Indicates that the obtained facial image is too bright due to high illumination.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_BRIGHT = 1,
        /**
         * Indicates that the obtained facial image is too dark due to low illumination.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_DARK = 2,
        /**
         * Indicates that the face is too close to the device.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_CLOSE = 3,
        /**
         * Indicates that the face is too far away from the device.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_FAR = 4,
        /**
         * Indicates that the device is too high, and that only the upper part of the face is captured.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_HIGH = 5,
        /**
         * Indicates that the device is too low, and that only the lower part of the face is captured.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_LOW = 6,
        /**
         * Indicates that the device is deviated to the right, and that only the right part of the face is captured.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_RIGHT = 7,
        /**
         * Indicates that the device is deviated to the left, and that only the left part of the face is captured.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_LEFT = 8,
        /**
         * Indicates that the face moves too fast during facial information collection.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_TOO_MUCH_MOTION = 9,
        /**
         * Indicates that the face is not facing the device.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_POOR_GAZE = 10,
        /**
         * Indicates that no face is detected.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FACE_AUTH_TIP_NOT_DETECTED = 11
    }
    /**
     * The enumeration of prompt codes in the process of fingerprint authentication.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 11
     */
    enum FingerprintTips {
        /**
         * Indicates that the image acquired is good.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FINGERPRINT_AUTH_TIP_GOOD = 0,
        /**
         * Indicates that the fingerprint image is too noisy due to suspected or detected dirt on sensor.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FINGERPRINT_AUTH_TIP_DIRTY = 1,
        /**
         * Indicates that the fingerprint image is too noisy to process due to a detected condition.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FINGERPRINT_AUTH_TIP_INSUFFICIENT = 2,
        /**
         * Indicates that only a partial fingerprint image is detected.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FINGERPRINT_AUTH_TIP_PARTIAL = 3,
        /**
         * Indicates that the fingerprint image is incomplete due to quick motion.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FINGERPRINT_AUTH_TIP_TOO_FAST = 4,
        /**
         * Indicates that the fingerprint image is unreadable due to lack of motion.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 11
         */
        FINGERPRINT_AUTH_TIP_TOO_SLOW = 5
    }
    /**
     * Credential type for authentication.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     */
    /**
     * Credential type for authentication.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    enum UserAuthType {
        /**
         * Authentication type pin.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Authentication type pin.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        PIN = 1,
        /**
         * Authentication type face.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        /**
         * Authentication type face.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        FACE = 2,
        /**
         * Authentication type fingerprint.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        /**
         * Authentication type fingerprint.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        FINGERPRINT = 4
    }
    /**
     * Trust level of authentication results.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     */
    /**
     * Trust level of authentication results.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    enum AuthTrustLevel {
        /**
         * Authentication result trusted level 1.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        /**
         * Authentication result trusted level 1.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        ATL1 = 10000,
        /**
         * Authentication result trusted level 2.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        /**
         * Authentication result trusted level 2.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        ATL2 = 20000,
        /**
         * Authentication result trusted level 3.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        /**
         * Authentication result trusted level 3.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        ATL3 = 30000,
        /**
         * Authentication result trusted level 4.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        /**
         * Authentication result trusted level 4.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        ATL4 = 40000
    }
    /**
     * Authentication events.
     *
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     * @deprecated since 11
     */
    type AuthEventKey = 'result' | 'tip';
    /**
     * Return information of Authentication events.
     *
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     * @deprecated since 11
     * @useinstead ohos.userIAM.userAuth.UserAuthResult
     */
    type EventInfo = AuthResultInfo | TipInfo;
    /**
     * Asynchronous callback of authentication event.
     *
     * @interface AuthEvent
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     * @deprecated since 11
     * @useinstead ohos.userIAM.userAuth.IAuthCallback
     */
    interface AuthEvent {
        /**
         * The authentication event callback.
         *
         * @param { EventInfo } result - Event info.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.userIAM.userAuth.IAuthCallback.onResult
         */
        callback(result: EventInfo): void;
    }
    /**
     * Authentication result information.
     *
     * @typedef AuthResultInfo
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     * @deprecated since 11
     */
    interface AuthResultInfo {
        /**
         * The authentication result.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 11
         */
        result: number;
        /**
         * The authentication token if the authentication is passed.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 11
         */
        token?: Uint8Array;
        /**
         * The remaining authentication attempts if the authentication fails.
         *
         * @type { ?number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 11
         */
        remainAttempts?: number;
        /**
         * The lockout duration if the authentication executor is locked.
         *
         * @type { ?number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 11
         */
        lockoutDuration?: number;
    }
    /**
     * Authentication tip info.
     *
     * @typedef TipInfo
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     * @deprecated since 11
     */
    interface TipInfo {
        /**
         * The authentication module of sending tip information.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 11
         */
        module: number;
        /**
         * Tip information, used to prompt the business to perform some operations.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 11
         */
        tip: number;
    }
    /**
     * Authentication instance, used to initiate a complete authentication.
     *
     * @interface AuthInstance
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.userIAM.userAuth.UserAuthInstance
     */
    interface AuthInstance {
        /**
         * Turn on authentication event listening.
         *
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 10
         */
        on: (name: AuthEventKey, callback: AuthEvent) => void;
        /**
         * Turn off authentication event listening.
         *
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 10
         */
        off: (name: AuthEventKey) => void;
        /**
         * Start this authentication, an instance can only perform authentication once.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500001 - Authentication failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @throws { BusinessError } 12500003 - The operation is canceled.
         * @throws { BusinessError } 12500004 - The operation is time-out.
         * @throws { BusinessError } 12500005 - The authentication type is not supported.
         * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
         * @throws { BusinessError } 12500007 - The authentication task is busy.
         * @throws { BusinessError } 12500009 - The authenticator is locked.
         * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 10
         */
        start: () => void;
        /**
         * Cancel this authentication.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         * @deprecated since 10
         */
        cancel: () => void;
    }
    /**
     * Check whether the authentication capability is available.
     *
     * @permission ohos.permission.ACCESS_BIOMETRIC
     * @param { UserAuthType } authType - Credential type for authentication.
     * @param { AuthTrustLevel } authTrustLevel - Trust level of authentication result.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
     * <br>1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
     * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    /**
     * Check whether the authentication capability is available.
     *
     * @permission ohos.permission.ACCESS_BIOMETRIC
     * @param { UserAuthType } authType - Credential type for authentication.
     * @param { AuthTrustLevel } authTrustLevel - Trust level of authentication result.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
     * <br>1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
     * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
     * @throws { BusinessError } 12500013 - Operation failed because of PIN expired.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    function getAvailableStatus(authType: UserAuthType, authTrustLevel: AuthTrustLevel): void;
    /**
     * Enrolled state.
     *
     * @typedef EnrolledState
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    interface EnrolledState {
        /**
         * The credential digest.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        credentialDigest: number;
        /**
         * The credential count.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        credentialCount: number;
    }
    /**
     * Get the state of enrolled credentials which varies as credentials change.
     *
     * @permission ohos.permission.ACCESS_BIOMETRIC
     * @param { UserAuthType } authType - Credential type for authentication.
     * @returns { EnrolledState } Returns the enrolled state.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
     * <br>1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    function getEnrolledState(authType: UserAuthType): EnrolledState;
    /**
     * Get Authentication instance.
     *
     * @param { Uint8Array } challenge - Pass in challenge value.
     * @param { UserAuthType } authType - Credential type for authentication.
     * @param { AuthTrustLevel } authTrustLevel - Trust level of authentication result.
     * @returns { AuthInstance } Returns an authentication instance.
     * @throws { BusinessError } 401 - Incorrect parameters.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ohos.userIAM.userAuth.getUserAuthInstance
     */
    function getAuthInstance(challenge: Uint8Array, authType: UserAuthType, authTrustLevel: AuthTrustLevel): AuthInstance;
    /**
     * The mode for reusing unlock authentication result.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    enum ReuseMode {
        /**
         * Authentication type relevant.The unlock authentication result can be reused only when the result is within
         * valid duration as well as it comes from one of specified UserAuthTypes of the AuthParam.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        AUTH_TYPE_RELEVANT = 1,
        /**
         * Authentication type irrelevant.The unlock authentication result can be reused as long as the result is within
         * valid duration.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        AUTH_TYPE_IRRELEVANT = 2
    }
    /**
     * Reuse unlock authentication result.
     *
     * @typedef ReuseUnlockResult
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    interface ReuseUnlockResult {
        /**
         * The mode for reusing unlock authentication result.
         *
         * @type { ReuseMode }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        reuseMode: ReuseMode;
        /**
         * The allowable reuse duration.The value of the duration should be between 0 and MAX_ALLOWABLE_REUSE_DURATION.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        reuseDuration: number;
    }
    /**
     * Auth parameter.
     *
     * @typedef AuthParam
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 10
     */
    /**
     * Auth parameter.
     *
     * @typedef AuthParam
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    interface AuthParam {
        /**
         * Pass in challenge value.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Pass in challenge value.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        challenge: Uint8Array;
        /**
         * Credential type for authentication.
         *
         * @type { UserAuthType[] }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Credential type for authentication.
         *
         * @type { UserAuthType[] }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        authType: UserAuthType[];
        /**
         * Trust level of authentication result.
         *
         * @type { AuthTrustLevel }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Trust level of authentication result.
         *
         * @type { AuthTrustLevel }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        authTrustLevel: AuthTrustLevel;
        /**
         * Reuse unlock authentication result.
         *
         * @type { ?ReuseUnlockResult }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        reuseUnlockResult?: ReuseUnlockResult;
    }
    /**
     * Auth widget parameter.
     *
     * @typedef WidgetParam
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 10
     */
    /**
     * Auth widget parameter.
     *
     * @typedef WidgetParam
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    interface WidgetParam {
        /**
         * Title of widget.
         *
         * @type { string }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Title of widget.
         *
         * @type { string }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        title: string;
        /**
         * The description text of navigation button.
         *
         * @type { ?string }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * The description text of navigation button.
         *
         * @type { ?string }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        navigationButtonText?: string;
    }
    /**
     * Authentication result: authentication token, credential type for authentication succeed.
     *
     * @typedef UserAuthResult
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 10
     */
    /**
     * Authentication result: authentication token, credential type for authentication succeed.
     *
     * @typedef UserAuthResult
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    interface UserAuthResult {
        /**
         * The authentication result.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * The authentication result.
         *
         * @type { number }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        result: number;
        /**
         * The authentication result if the authentication is passed.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * The authentication result if the authentication is passed.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        token?: Uint8Array;
        /**
         * Credential type for authentication succeed.
         *
         * @type { ?UserAuthType }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Credential type for authentication succeed.
         *
         * @type { ?UserAuthType }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        authType?: UserAuthType;
        /**
         * The enrolled state for authentication succeed. EnrolledState would be returned when the authentication has
         * passed.
         *
         * @type { ?EnrolledState }
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        enrolledState?: EnrolledState;
    }
    /**
     * Asynchronous callback of authentication operation.
     *
     * @interface IAuthCallback
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 10
     */
    /**
     * Asynchronous callback of authentication operation.
     *
     * @interface IAuthCallback
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    interface IAuthCallback {
        /**
         * The authentication result code is returned through the callback.
         * If the authentication is passed, the authentication token is returned in extraInfo.
         *
         * @param { UserAuthResult } result - Authentication result information.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * The authentication result code is returned through the callback.
         * If the authentication is passed, the authentication token is returned in extraInfo.
         *
         * @param { UserAuthResult } result - Authentication result information.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        onResult(result: UserAuthResult): void;
    }
    /**
     * User authentication instance, used to initiate a complete authentication.
     *
     * @interface UserAuthInstance
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 10
     */
    /**
     * User authentication instance, used to initiate a complete authentication.
     *
     * @interface UserAuthInstance
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    interface UserAuthInstance {
        /**
         * Turn on widget authentication result event listening.
         *
         * @param { 'result' } type - Indicates the type of event.
         * @param { IAuthCallback } callback - Indicates the listener.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * <br>3. Parameter verification failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Turn on widget authentication result event listening.
         *
         * @param { 'result' } type - Indicates the type of event.
         * @param { IAuthCallback } callback - Indicates the listener.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * <br>3. Parameter verification failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        on(type: 'result', callback: IAuthCallback): void;
        /**
         * Turn off widget authentication result event listening.
         *
         * @param { 'result' } type - Indicates the type of event.
         * @param { IAuthCallback } callback - Indicates the listener.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * <br>3. Parameter verification failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Turn off widget authentication result event listening.
         *
         * @param { 'result' } type - Indicates the type of event.
         * @param { IAuthCallback } callback - Indicates the listener.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types.
         * <br>3. Parameter verification failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        off(type: 'result', callback?: IAuthCallback): void;
        /**
         * Start this authentication, an instance can only perform authentication once.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Incorrect parameter types.
         * @throws { BusinessError } 12500001 - Authentication failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @throws { BusinessError } 12500003 - Authentication canceled.
         * @throws { BusinessError } 12500004 - Authentication timeout.
         * @throws { BusinessError } 12500005 - The authentication type is not supported.
         * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
         * @throws { BusinessError } 12500007 - Authentication service is busy.
         * @throws { BusinessError } 12500009 - Authentication is locked out.
         * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
         * @throws { BusinessError } 12500011 - Switched to the custom authentication process.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Start this authentication, an instance can only perform authentication once.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Incorrect parameter types.
         * @throws { BusinessError } 12500001 - Authentication failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @throws { BusinessError } 12500003 - Authentication canceled.
         * @throws { BusinessError } 12500004 - Authentication timeout.
         * @throws { BusinessError } 12500005 - The authentication type is not supported.
         * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
         * @throws { BusinessError } 12500007 - Authentication service is busy.
         * @throws { BusinessError } 12500009 - Authentication is locked out.
         * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
         * @throws { BusinessError } 12500011 - Switched to the custom authentication process.
         * @throws { BusinessError } 12500013 - Operation failed because of PIN expired.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        start(): void;
        /**
         * Cancel this authentication.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Incorrect parameter types.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Cancel this authentication.
         *
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
         * <br>1. Incorrect parameter types.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        cancel(): void;
    }
    /**
     * Get user authentication instance with widget.
     *
     * @param { AuthParam } authParam - Auth parameter.
     * @param { WidgetParam } widgetParam - Widget parameter.
     * @returns { UserAuthInstance } Returns an authentication instance with widget.
     * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
     * <br>1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * <br>3. Parameter verification failed.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 10
     */
    /**
     * Get user authentication instance with widget.
     *
     * @param { AuthParam } authParam - Auth parameter.
     * @param { WidgetParam } widgetParam - Widget parameter.
     * @returns { UserAuthInstance } Returns an authentication instance with widget.
     * @throws { BusinessError } 401 - Incorrect parameters. Possible causes:
     * <br>1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * <br>3. Parameter verification failed.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    function getUserAuthInstance(authParam: AuthParam, widgetParam: WidgetParam): UserAuthInstance;
    /**
     * Enum for operation result.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    /**
     * Enum for operation result.
     *
     * @enum { number }
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @atomicservice
     * @since 12
     */
    enum UserAuthResultCode {
        /**
         * Indicates that the result is success or ability is supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that the result is success or ability is supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        SUCCESS = 12500000,
        /**
         * Indicates that the authentication result is failed.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that the authentication result is failed.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        FAIL = 12500001,
        /**
         * Indicates other errors.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates other errors.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        GENERAL_ERROR = 12500002,
        /**
         * Indicates that this operation is canceled.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that this operation is canceled.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        CANCELED = 12500003,
        /**
         * Indicates that this operation is time-out.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that this operation is time-out.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        TIMEOUT = 12500004,
        /**
         * Indicates that this authentication type is not supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that this authentication type is not supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        TYPE_NOT_SUPPORT = 12500005,
        /**
         * Indicates that the authentication trust level is not supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that the authentication trust level is not supported.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        TRUST_LEVEL_NOT_SUPPORT = 12500006,
        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        BUSY = 12500007,
        /**
         * Indicates that the authenticator is locked.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that the authenticator is locked.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        LOCKED = 12500009,
        /**
         * Indicates that the user has not enrolled the authenticator.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        /**
         * Indicates that the user has not enrolled the authenticator.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        NOT_ENROLLED = 12500010,
        /**
         * Indicates that this operation is canceled from widget's navigation button.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 10
         */
        /**
         * Indicates that this operation is canceled from widget's navigation button.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        CANCELED_FROM_WIDGET = 12500011,
        /**
         * Indicates that current operation failed because of PIN expired.
         *
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @atomicservice
         * @since 12
         */
        PIN_EXPIRED = 12500013
    }
}
export default userAuth;
