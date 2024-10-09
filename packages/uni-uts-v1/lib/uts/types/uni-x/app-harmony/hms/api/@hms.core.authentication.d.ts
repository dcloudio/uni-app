/*
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file Defines the authentication service of HUAWEI ID.
 * @kit AccountKit
 */
import type { AsyncCallback } from '@ohos.base';
import type common from '@ohos.app.ability.common';
/**
 * Authentication module.
 * @namespace authentication
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
 * @stagemodelonly
 * @since 4.0.0(10)
 */
/**
 * Authentication module.
 * @namespace authentication
 * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace authentication {
    /**
     * The class of an authentication request.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * The class of an authentication request.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class AuthenticationRequest {
    }
    /**
     * The class of an authentication response.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * The class of an authentication response.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class AuthenticationResponse {
    }
    /**
     * The class of an authentication controller.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * The class of an authentication controller.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class AuthenticationProvider {
    }
    /**
     * Enumerates the cryptographic algorithms to be used with the JSON Web Signature (JWS).
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Enumerates the cryptographic algorithms to be used with the JSON Web Signature (JWS).
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum IdTokenSignAlgorithm {
        /**
         * RSASSA-PSS using SHA-256 and MGF1 with SHA-256
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * RSASSA-PSS using SHA-256 and MGF1 with SHA-256
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        PS256 = 1,
        /**
         * RSASSA-PKCS1-v1_5 using SHA-256
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * RSASSA-PKCS1-v1_5 using SHA-256
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        RS256 = 2
    }
    /**
     * Enumerates the authentication error codes returned in callback invoked after executeRequest() is called.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Enumerates the authentication error codes returned in callback invoked after executeRequest() is called.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum AuthenticationErrorCode {
        /**
         * The user has not logged in with HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The user has not logged in with HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        ACCOUNT_NOT_LOGGED_IN = 1001502001,
        /**
         * The application is not authorized.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The application is not authorized.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        APP_NOT_AUTHORIZED = 1001502002,
        /**
         * Invalid parameter.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Invalid parameter.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Invalid input parameter value.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARAMETER_INVALID = 1001502003,
        /**
         * Network error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Network error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        NETWORK_ERROR = 1001502005,
        /**
         * Internal error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Internal error.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        INTERNAL_ERROR = 1001502009,
        /**
         * Failed to check the fingerprint of the app bundle.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Failed to check the fingerprint of the app bundle.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        PACKAGE_FINGERPRINT_CHECK_ERROR = 1001500001,
        /**
         * The user canceled the authorization.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The user canceled the authorization.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        USER_CANCELED = 1001502012,
        /**
         * The app does not have the required scopes or permissions.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * The app does not have the required scopes or permissions.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        SCOPE_OR_PERMISSION_NOT_REQUESTED = 1001502014,
        /**
         * This error code is reported when a request is already being processed.
         * This error code does not need to be handled.
         * Your app needs to implement click control to prevent too many requests caused by continuous clicks.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * This error code is reported when a request is already being processed.
         * This error code does not need to be handled.
         * Your app needs to implement click control to prevent too many requests caused by continuous clicks.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        DUPLICATE_REQUEST_REJECTED = 1001500002,
        /**
         * The scopes or permissions are not supported.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        SCOPE_OR_PERRMISSION_UNSUPPORTED = 1001500003
    }
    /**
     * Enumerates the ID types.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum IdType {
        /**
         * UID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        USER_ID = 1,
        /**
         * OpenID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        OPEN_ID = 2,
        /**
         * UnionID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNION_ID = 3
    }
    /**
     * Defines the possible values for the HUAWEI ID state of a user.
     * @enum { number }
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum State {
        /**
         * The user hasn't established a relationship with login HUAWEI ID.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNLOGGED_IN = 0,
        /**
         * The user is authorized.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        AUTHORIZED = 1,
        /**
         * The given user's authorization has been revoked and they should be signed out.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNAUTHORIZED = 2
    }
    /**
     * Defines the request for get HUAWEI ID state.
     * @typedef StateRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface StateRequest {
        /**
         * Type of the ID.
         * @type { IdType }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        idType: IdType;
        /**
         * ID of the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        idValue: string;
    }
    /**
     * Defines the response for get HUAWEI ID state.
     * @typedef StateResult
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface StateResult {
        /**
         * Type of the state.
         * @type { State }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        state: State;
    }
    /**
     * Defines the request for an application or an atomic service to log in with HUAWEI ID to obtain the OpenID
     * and UnionID.
     * @extends AuthenticationRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the request for an application or an atomic service to log in with HUAWEI ID to obtain the OpenID
     * and UnionID.
     * @extends AuthenticationRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export class LoginWithHuaweiIDRequest extends AuthenticationRequest {
        /**
         * Whether the user needs to be logged in. If the value is <b>true</b> and user is logged out, the login
         * UI will be started. In addition, the LoginWithHuaweiIDRequest must be executed in the ArkUI page context,
         * or an exception will be thrown.
         * If the value is <b>false</b> and the user is logged out, an error will be returned
         * when LoginWithHuaweiIDRequest is executed.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Whether the user needs to be logged in. If the value is <b>true</b> and user is logged out, the login
         * UI will be started. In addition, the LoginWithHuaweiIDRequest must be executed in the ArkUI page context,
         * or an exception will be thrown.
         * If the value is <b>false</b> and the user is logged out, an error will be returned
         * when LoginWithHuaweiIDRequest is executed.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        forceLogin?: boolean;
        /**
         * An opaque value used by the client to maintain the state between the request and callback
         * for preventing cross-site request forgery. It will be returned without being modified in the
         * corresponding credential after a successful login.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * An opaque value used by the client to maintain the state between the request and callback
         * for preventing cross-site request forgery. It will be returned without being modified in the
         * corresponding credential after a successful login.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        state?: string;
        /**
         * Nonce to be passed to the identity provider for preventing anti-replay attacks. It will be
         * included in IDToken.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Nonce to be passed to the identity provider for preventing anti-replay attacks. It will be
         * included in IDToken.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        nonce?: string;
        /**
         * Signing algorithm used for IDToken. The default algorithm is PS256.
         * @type { ?IdTokenSignAlgorithm }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Signing algorithm used for IDToken. The default algorithm is PS256.
         * @type { ?IdTokenSignAlgorithm }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        idTokenSignAlgorithm?: IdTokenSignAlgorithm;
    }
    /**
     * Defines the request for an application or atomic service to ask authorization with the HUAWEI ID to apply for
     * more user information.
     * @extends AuthenticationRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the request for an application or atomic service to ask authorization with the HUAWEI ID to apply for
     * more user information.
     * @extends AuthenticationRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export class AuthorizationWithHuaweiIDRequest extends AuthenticationRequest {
        /**
         * User information requested by the application.
         * @type { ?string[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * User information requested by the application.
         * @type { ?string[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        scopes?: string[];
        /**
         * Permissions requested by the application.
         * @type { ?string[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Permissions requested by the application.
         * @type { ?string[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        permissions?: string[];
        /**
         * Whether the user needs to be logged in. If the value is <b>true</b> and user is logged out, the login
         * UI will be started. In addition, the AuthorizationWithHuaweiIDRequest must be executed in the ArkUI page context,
         * or an exception will be thrown.
         * If the value is <b>false</b> and the user is logged out, an error will be returned when
         * AuthorizationWithHuaweiIDRequest is executed.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Whether the user needs to be logged in. If the value is <b>true</b> and user is logged out, the login
         * UI will be started. In addition, the AuthorizationWithHuaweiIDRequest must be executed in the ArkUI page context,
         * or an exception will be thrown.
         * If the value is <b>false</b> and the user is logged out, an error will be returned when
         * AuthorizationWithHuaweiIDRequest is executed.
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        forceAuthorization?: boolean;
        /**
         * An opaque value used by the client to maintain the state between the request and callback for
         * preventing cross-site request forgery. It will be returned without being modified in the
         * corresponding credential after a successful authentication.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * An opaque value used by the client to maintain the state between the request and callback for
         * preventing cross-site request forgery. It will be returned without being modified in the
         * corresponding credential after a successful authentication.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        state?: string;
        /**
         * Nonce to be passed to the identity provider for preventing anti-replay attacks. It will be
         * included in IDToken.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Nonce to be passed to the identity provider for preventing anti-replay attacks. It will be
         * included in IDToken.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        nonce?: string;
        /**
         * Signing algorithm used for IDToken. The default algorithm is PS256.
         * @type { ?IdTokenSignAlgorithm }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Signing algorithm used for IDToken. The default algorithm is PS256.
         * @type { ?IdTokenSignAlgorithm }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        idTokenSignAlgorithm?: IdTokenSignAlgorithm;
    }
    /**
     * Defines the request for an application or atomic service to cancel the scopes authorized by the HUAWEI ID service.
     * @extends AuthenticationRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the request for an application or atomic service to cancel the scopes authorized by the HUAWEI ID service.
     * @extends AuthenticationRequest
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export class CancelAuthorizationRequest extends AuthenticationRequest {
        /**
         * An opaque value used by the client to maintain the state between the request and callback for
         * preventing cross-site request forgery.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * An opaque value used by the client to maintain the state between the request and callback for
         * preventing cross-site request forgery.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        state?: string;
    }
    /**
     * Defines the credential returned for a successful login with the HUAWEI ID.
     * @typedef LoginWithHuaweiIDCredential
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the credential returned for a successful login with the HUAWEI ID.
     * @typedef LoginWithHuaweiIDCredential
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface LoginWithHuaweiIDCredential {
        /**
         * Token used by the application to interact with the server.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Token used by the application to interact with the server.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly authorizationCode?: string;
        /**
         * JSON Web Token (JWT) that ensures secure transfer of the user information to the application.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * JSON Web Token (JWT) that ensures secure transfer of the user information to the application.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly idToken?: string;
        /**
         * OpenID associated with the HUAWEI ID. It is a unique user ID that varies with the applications used by the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * OpenID associated with the HUAWEI ID. It is a unique user ID that varies with the applications used by the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly openID: string;
        /**
         * UnionID associated with the HUAWEI ID. It is a unique user ID that remains the same
         * across the applications used by the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * UnionID associated with the HUAWEI ID. It is a unique user ID that remains the same
         * across the applications used by the user.
         * @type { string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly unionID: string;
    }
    /**
     * Defines the credential returned for a successful authorization of the HUAWEI ID.
     * @typedef AuthorizationWithHuaweiIDCredential
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the credential returned for a successful authorization of the HUAWEI ID.
     * @typedef AuthorizationWithHuaweiIDCredential
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface AuthorizationWithHuaweiIDCredential {
        /**
         * Token used by the application to interact with the server.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Token used by the application to interact with the server.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly authorizationCode?: string;
        /**
         * JWT that ensures secure transfer of the user information to the app.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * JWT that ensures secure transfer of the user information to the app.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly idToken?: string;
        /**
         * OpenID associated with the HUAWEI ID. It is a unique user ID that varies with the applications used by the user.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * OpenID associated with the HUAWEI ID. It is a unique user ID that varies with the applications used by the user.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly openID?: string;
        /**
         * UnionID associated with the HUAWEI ID. It is a unique user ID that remains the same
         * across the applications used by the user.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * UnionID associated with the HUAWEI ID. It is a unique user ID that remains the same
         * across the applications used by the user.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly unionID?: string;
        /**
         * URI of the user avatar.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        readonly avatarUri?: string;
        /**
         * Nick name of the user.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        readonly nickName?: string;
        /**
         * Email address of the user.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        readonly email?: string;
        /**
         * Information that can be accessed by the application.
         * @type { ?string[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Information that can be accessed by the application.
         * @type { ?string[] }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly authorizedScopes?: string[];
        /**
         * Extra information of the user.
         * @type { ?object }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Extra information of the user.
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly extraInfo?: Record<string, Object>;
    }
    /**
     * Defines the response to the login request returned by the HUAWEI ID service.
     * @extends AuthenticationResponse
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the response to the login request returned by the HUAWEI ID service.
     * @extends AuthenticationResponse
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export class LoginWithHuaweiIDResponse extends AuthenticationResponse {
        /**
         * User credential returned by the HUAWEI ID service.
         * @type { ?LoginWithHuaweiIDCredential }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * User credential returned by the HUAWEI ID service.
         * @type { ?LoginWithHuaweiIDCredential }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly data?: LoginWithHuaweiIDCredential;
        /**
         * An arbitrary string that the application provides to the request that generates the credential.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * An arbitrary string that the application provides to the request that generates the credential.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        readonly state?: string;
    }
    /**
     * Defines the response to the authorization request returned by the HUAWEI ID service.
     * @extends AuthenticationResponse
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the response to the authorization request returned by the HUAWEI ID service.
     * @extends AuthenticationResponse
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export class AuthorizationWithHuaweiIDResponse extends AuthenticationResponse {
        /**
         * User credential returned by the HUAWEI ID service.
         * @type { ?AuthorizationWithHuaweiIDCredential }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * User credential returned by the HUAWEI ID service.
         * @type { ?AuthorizationWithHuaweiIDCredential }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly data?: AuthorizationWithHuaweiIDCredential;
        /**
         * An arbitrary string that the application provides to the request that generates the credential.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * An arbitrary string that the application provides to the request that generates the credential.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly state?: string;
    }
    /**
     * Defines the response to the request for canceling the authorization returned by the HUAWEI ID service.
     * @extends AuthenticationResponse
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Defines the response to the request for canceling the authorization returned by the HUAWEI ID service.
     * @extends AuthenticationResponse
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export class CancelAuthorizationResponse extends AuthenticationResponse {
        /**
         * An arbitrary string that the application provides to the request for canceling the authorization.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * An arbitrary string that the application provides to the request for canceling the authorization.
         * @type { ?string }
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly state?: string;
    }
    /**
     * Provides methods for implementing the authentication service.
     * @extends AuthenticationProvider
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * Provides methods for implementing the authentication service.
     * @extends AuthenticationProvider
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export class HuaweiIDProvider extends AuthenticationProvider {
        /**
         * Creates a login request with default scopes and permissions.
         * Then, <b>executeRequest()</b> will be called.
         * @returns { LoginWithHuaweiIDRequest } Returns the <b>LoginWithHuaweiIDRequest</b> object,
         * which is passed to { AuthenticationController }.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Creates a login request with default scopes and permissions.
         * Then, <b>executeRequest()</b> will be called.
         * @returns { LoginWithHuaweiIDRequest } Returns the <b>LoginWithHuaweiIDRequest</b> object,
         * which is passed to { AuthenticationController }.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        createLoginWithHuaweiIDRequest(): LoginWithHuaweiIDRequest;
        /**
         * Creates an authorization request.
         * You need to fill in parameters in the request. Then, <b>executeRequest()</b> will be called.
         * @returns { AuthorizationWithHuaweiIDRequest } Returns the <b>AuthorizationWithHuaweiIDRequest</b> object,
         * which is passed to { AuthenticationController }.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Creates an authorization request.
         * You need to fill in parameters in the request. Then, <b>executeRequest()</b> will be called.
         * @returns { AuthorizationWithHuaweiIDRequest } Returns the <b>AuthorizationWithHuaweiIDRequest</b> object,
         * which is passed to { AuthenticationController }.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        createAuthorizationWithHuaweiIDRequest(): AuthorizationWithHuaweiIDRequest;
        /**
         * Creates a request for canceling the authorization.
         * Then, <b>executeRequest()</b> will be called.
         * @returns { CancelAuthorizationRequest } Returns the <b>CancelAuthorizationRequest</b> object,
         * which is passed to { AuthenticationController }.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Creates a request for canceling the authorization.
         * Then, <b>executeRequest()</b> will be called.
         * @returns { CancelAuthorizationRequest } Returns the <b>CancelAuthorizationRequest</b> object,
         * which is passed to { AuthenticationController }.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        createCancelAuthorizationRequest(): CancelAuthorizationRequest;
        /**
         * Get HUAWEI ID state for the given user.
         * @param { StateRequest } request - Indicates the getHuaweiIDState request parameters.
         * @returns { Promise<StateResult> } The promise returned by the function.
         * @throws { BusinessError } 12300001 - System service works abnormally.
         * @throws { BusinessError } 1001502003 - Invalid input parameter value.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getHuaweiIDState(request: StateRequest): Promise<StateResult>;
    }
    /**
     * The class of an authentication controller.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @since 4.0.0(10)
     */
    /**
     * The class of an authentication controller.
     * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class AuthenticationController {
        /**
         * Constructs the specified authentication controller.
         * @param { common.UIAbilityContext } context - The context of an ability.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Constructs the specified authentication controller.
         * @param { common.Context } context - The context of an ability.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constructor(context?: common.Context);
        /**
         * Executes the specified authentication request.
         * @param { AuthenticationRequest } request - Indicates the authentication request.
         * @param { AsyncCallback<AuthenticationResponse, { [key: string]: Object }> } callback - Indicates the callback for getting the response.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 12300001 - System service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid parameter.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Executes the specified authentication request.
         * @param { AuthenticationRequest } request - Indicates the authentication request.
         * @param { AsyncCallback<AuthenticationResponse, { [key: string]: Object }> } callback - Indicates the callback for getting the response.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 12300001 - System service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid parameter.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Executes the specified authentication request.
         * @param { AuthenticationRequest } request - Indicates the authentication request.
         * @param { AsyncCallback<AuthenticationResponse, Record<string, Object>> } callback - Indicates the callback for getting the response.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 12300001 - System service works abnormally.
         * @throws { BusinessError } 1001502001 - The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1001502002 - The application is not authorized.
         * @throws { BusinessError } 1001502003 - Invalid input parameter value.
         * @throws { BusinessError } 1001502005 - Network error.
         * @throws { BusinessError } 1001502009 - Internal error.
         * @throws { BusinessError } 1001500001 - Failed to check the fingerprint of the app bundle.
         * @throws { BusinessError } 1001502012 - The user canceled the authorization.
         * @throws { BusinessError } 1001502014 - The app does not have the required scopes or permissions.
         * @throws { BusinessError } 1001500002 - This error code is reported when a request is already being processed.
         * @throws { BusinessError } 1001500003 - The scopes or permissions are not supported.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        executeRequest(request: AuthenticationRequest, callback: AsyncCallback<AuthenticationResponse, Record<string, Object>>): void;
        /**
         * Executes the specified authentication request.
         * @param { AuthenticationRequest } request - Indicates the authentication request.
         * @returns { Promise<AuthenticationResponse> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 12300001 - System service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid parameter.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @since 4.0.0(10)
         */
        /**
         * Executes the specified authentication request.
         * @param { AuthenticationRequest } request - Indicates the authentication request.
         * @returns { Promise<AuthenticationResponse> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 12300001 - System service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid parameter.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Executes the specified authentication request.
         * @param { AuthenticationRequest } request - Indicates the authentication request.
         * @returns { Promise<AuthenticationResponse> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 12300001 - System service works abnormally.
         * @throws { BusinessError } 1001502001 - The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1001502002 - The application is not authorized.
         * @throws { BusinessError } 1001502003 - Invalid input parameter value.
         * @throws { BusinessError } 1001502005 - Network error.
         * @throws { BusinessError } 1001502009 - Internal error.
         * @throws { BusinessError } 1001500001 - Failed to check the fingerprint of the app bundle.
         * @throws { BusinessError } 1001502012 - The user canceled the authorization.
         * @throws { BusinessError } 1001502014 - The app does not have the required scopes or permissions.
         * @throws { BusinessError } 1001500002 - This error code is reported when a request is already being processed.
         * @throws { BusinessError } 1001500003 - The scopes or permissions are not supported.
         * @syscap SystemCapability.AuthenticationServices.HuaweiID.Auth
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        executeRequest(request: AuthenticationRequest): Promise<AuthenticationResponse>;
    }
}
export default authentication;
