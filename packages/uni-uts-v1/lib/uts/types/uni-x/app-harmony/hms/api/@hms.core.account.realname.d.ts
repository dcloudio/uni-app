/*
* Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file Defines the feature of real-name verification for HUAWEI ID.
 * @kit AccountKit
 */

import type common from '@ohos.app.ability.common';
/**
 * RealName module.
 * @namespace realName
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
 * @systemapi
 * @stagemodelonly
 * @since 4.0.0(10)
 */
/**
 * RealName module.
 * @namespace realName
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace realName {
    /**
     * Enumerates the error codes of the realName.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
     * @systemapi
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Enumerates the error codes of the realName.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum RealNameErrorCode {
        /**
         * The network is unavailable.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @systemapi
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The network is unavailable.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NETWORK_ERROR = 1002500001,
        /**
         * The user has not logged in with HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @systemapi
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The user has not logged in with HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        ACCOUNT_NOT_LOGGED_IN = 1002500002,
        /**
         * Failed to check the fingerprint of the application bundle.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @systemapi
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Failed to check the fingerprint of the application bundle.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PACKAGE_FINGERPRINT_CHECK_ERROR = 1002500003,
        /**
         * The application does not have the required permissions.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @systemapi
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The application does not have the required permissions.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PERMISSION_CHECK_ERROR = 1002500004,
        /**
         * The user canceled the verification of the HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @systemapi
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The user canceled the verification of the HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_CANCELED = 1002500005,
        /**
         * Internal error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @systemapi
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Internal error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        INTERNAL_ERROR = 1002500006,
        /**
         * Real-name verification is not supported for the HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @systemapi
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Real-name verification is not supported for the HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        REAL_NAME_UNSUPPORTED = 1002500008,
        /**
         * Your face does not match your facial image as proof of identity.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FACE_NOT_MATCH = 1002500011,
        /**
         * No real-name information is found for the HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        REAL_NAME_NOT_EXIST = 1002500012,
        /**
         * Your name and ID number do not match, or you may have recently changed your household registration
         * or reported the loss of your ID card and had a new card issued.
         * This identity information has not yet been synchronized with the Ministry of Public Security.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        NAME_AND_ID_NUMBER_NOT_MATCH = 1002500013,
        /**
         * Too many real-name verification attempts. Try again 24 hours later.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        TOO_MANY_ATTEMPTS = 1002500014,
        /**
         * The verificationToken parameter is incorrectly set.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        VERIFICATION_TOKEN_INCORRECT = 1002500015,
        /**
         * This device does not support this API.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DEVICE_NOT_SUPPORTED = 1002500016
    }
    /**
     * Defines the request to perform a facial recognition verification for a user who has signed in.
     * @typedef FacialRecognitionVerificationRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface FacialRecognitionVerificationRequest {
        /**
         * Identity verification token, which is obtained from the OpenRealName service.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        verificationToken: string;
        /**
         * An opaque value used by the client to maintain the state between the request and callback for
         * preventing cross-site request forgery. It will be returned without being modified in the
         * corresponding credential after a successful verification.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        state?: string;
    }
    /**
     * Defines the result of facial recognition verification for a user who has signed in.
     * @typedef FacialRecognitionVerificationResult
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface FacialRecognitionVerificationResult {
        /**
         * Facial recognition verify token returned upon verification success.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly facialRecognitionVerificationToken: string;
        /**
         * An opaque value used by the client to maintain the state between the request and callback for
         * preventing cross-site request forgery. It will be returned without being modified in the
         * corresponding credential after a successful verification.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly state?: string;
    }
    /**
     * Verify the facial recognition of a HUAWEI ID user. This function uses a promise to return the result.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { FacialRecognitionVerificationRequest } request - Facial recognition verification request parameters.
     * @returns { Promise<FacialRecognitionVerificationResult> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1002500001 - The network is unavailable.
     * @throws { BusinessError } 1002500002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002500003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1002500004 - The application does not have the required permissions.
     * @throws { BusinessError } 1002500005 - The user canceled the verification of the HUAWEI ID.
     * @throws { BusinessError } 1002500006 - Internal error.
     * @throws { BusinessError } 1002500008 - Real-name verification is not supported for the HUAWEI ID.
     * @throws { BusinessError } 1002500011 - Your face does not match your facial image as proof of identity.
     * @throws { BusinessError } 1002500012 - No real-name information is found for the HUAWEI ID.
     * @throws { BusinessError } 1002500013 - Your name and ID number do not match.
     * @throws { BusinessError } 1002500014 - Too many real-name verification attempts.
     * @throws { BusinessError } 1002500015 - The verifyToken parameter is incorrectly set.
     * @throws { BusinessError } 1002500016 - This device does not support this API.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.RealNameVerify
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function startFacialRecognitionVerification(context: common.Context, request: FacialRecognitionVerificationRequest): Promise<FacialRecognitionVerificationResult>;
}
export default realName;
