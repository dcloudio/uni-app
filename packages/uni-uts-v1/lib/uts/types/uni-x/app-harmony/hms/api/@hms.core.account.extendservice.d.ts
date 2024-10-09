/*
* Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file Defines the extended services of HUAWEI ID.
 * @kit AccountKit
 */
import type { AsyncCallback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * Definition of extendService module.
 * @namespace extendService
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
 * @stagemodelonly
 * @since 4.0.0(10)
 */
/**
 * Definition of extendService module.
 * @namespace extendService
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace extendService {
    /**
     * Enumerates the error codes of the extendService.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Enumerates the error codes of the extendService.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum ExtendErrorCode {
        /**
         * Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        INVALID_PARAMETER = 401,
        /**
         * The network is unavailable.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The network is unavailable.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        NETWORK_ERROR = 1001600001,
        /**
         * The user has not logged in with HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The user has not logged in with HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ACCOUNT_NOT_LOGGED_IN = 1001600002,
        /**
         * Failed to check the fingerprint of the application bundle.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Failed to check the fingerprint of the application bundle.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        PACKAGE_FINGERPRINT_CHECK_ERROR = 1001600003,
        /**
         * The application does not have the required permissions.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The application does not have the required permissions.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        PERMISSION_CHECK_ERROR = 1001600004,
        /**
         * The user canceled the current operation.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The user canceled the current operation.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        USER_CANCELED = 1001600005,
        /**
         * The requested verification factors are unavailable on the device.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The requested verification factors are unavailable on the device.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        VERIFICATION_FACTOR_UNAVAILABLE = 1001600006,
        /**
         * Internal error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Internal error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        INTERNAL_ERROR = 1001600007
    }
    /**
     * Enumerates the ID types.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Enumerates the ID types.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum IdType {
        /**
         * UID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * UID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        USER_ID = 1,
        /**
         * OpenID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * OpenID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        OPEN_ID = 2,
        /**
         * UnionID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * UnionID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        UNION_ID = 3
    }
    /**
     * Enumerates the risk levels.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Enumerates the risk levels.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum RiskLevel {
        /**
         * Low risk level.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Low risk level.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        LOW = 1,
        /**
         * High risk level.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * High risk level.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        HIGH = 2
    }
    /**
     * Defines the request used for verifying a user who has logged in.
     * @typedef VerifyRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the request used for verifying a user who has logged in.
     * @typedef VerifyRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface VerifyRequest {
        /**
         * Type of the ID.
         * @type { IdType }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Type of the ID.
         * @type { IdType }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        idType: IdType;
        /**
         * ID of the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * ID of the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        idValue: string;
        /**
         * Scenario that triggers the identity verification.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Scenario that triggers the identity verification.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        sceneId: string;
        /**
         * Risk level of the scenario.
         * @type { RiskLevel }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Risk level of the scenario.
         * @type { RiskLevel }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        riskLevel: RiskLevel;
        /**
         * Nonce to be passed to the identity provider for preventing anti-replay attacks. It will be
         * included in verifyToken.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Nonce to be passed to the identity provider for preventing anti-replay attacks. It will be
         * included in verifyToken.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        nonce: string;
    }
    /**
     * Defines the result returned by verifyAccount().
     * @typedef VerifyResult
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the result returned by verifyAccount().
     * @typedef VerifyResult
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface VerifyResult {
        /**
         * A JSON Web Token (JWT) returned by the verification.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * A JSON Web Token (JWT) returned by the verification.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly verifyToken: string;
    }
    /**
     * Verifies the identity of a HUAWEI ID. This function uses an asynchronous callback to return the result.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { VerifyRequest } request - Indicates the verification request parameters.
     * @param { AsyncCallback<VerifyResult> } callback - Indicates the callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1001600001 - The network is unavailable.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600005 - The user canceled the current operation.
     * @throws { BusinessError } 1001600006 - The requested verification factors are unavailable on the device.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Verifies the identity of a HUAWEI ID. This function uses an asynchronous callback to return the result.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { VerifyRequest } request - Indicates the verification request parameters.
     * @param { AsyncCallback<VerifyResult> } callback - Indicates the callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1001600001 - The network is unavailable.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600005 - The user canceled the current operation.
     * @throws { BusinessError } 1001600006 - The requested verification factors are unavailable on the device.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function verifyAccount(context: common.Context, request: VerifyRequest, callback: AsyncCallback<VerifyResult>): void;
    /**
     * Verifies the identity of a HUAWEI ID. This function uses a promise to return the result.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { VerifyRequest } request - Indicates the verification request parameters.
     * @returns { Promise<VerifyResult> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1001600001 - The network is unavailable.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600005 - The user canceled the current operation.
     * @throws { BusinessError } 1001600006 - The requested verification factors are unavailable on the device.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Verifies the identity of a HUAWEI ID. This function uses a promise to return the result.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { VerifyRequest } request - Indicates the verification request parameters.
     * @returns { Promise<VerifyResult> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1001600001 - The network is unavailable.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600005 - The user canceled the current operation.
     * @throws { BusinessError } 1001600006 - The requested verification factors are unavailable on the device.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function verifyAccount(context: common.Context, request: VerifyRequest): Promise<VerifyResult>;
    /**
     * Opens the account center page. This function uses an asynchronous callback to return the result.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @param { AsyncCallback<void> } callback - Indicates the callback used to return the result.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Opens the account center page. This function uses an asynchronous callback to return the result.
     * Note: This function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @param { AsyncCallback<void> } callback - Indicates the callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1001600001 - The network is unavailable.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function startAccountCenter(context: common.Context, callback: AsyncCallback<void>): void;
    /**
     * Opens the account center page. This function uses a promise to return the result.
     * Note: The function must be called in the ArkUI page context.
     * @param { common.UIAbilityContext } context - The context of an ability.
     * @returns { Promise<void> } Promise used to return the result.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Opens the account center page. This function uses a promise to return the result.
     * Note: The function must be called in the ArkUI page context.
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<void> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1001600001 - The network is unavailable.
     * @throws { BusinessError } 1001600002 - The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1001600003 - Failed to check the fingerprint of the application bundle.
     * @throws { BusinessError } 1001600004 - The application does not have the required permissions.
     * @throws { BusinessError } 1001600007 - Internal error.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.ExtendService
     * @stagemodelonly
     * @since 4.1.0(11)
     */
    function startAccountCenter(context: common.Context): Promise<void>;
}
export default extendService;
