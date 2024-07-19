/*
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module provides the capabilities to use IFAA online authentication.
 * @kit OnlineAuthenticationKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * Support the IFAA protocol, provide platform infrastructure to support secret free payment, support super
 * application ecosystem capabilities, and improve system security and user experience.
 *
 * @namespace ifaa
 * @syscap SystemCapability.Security.Ifaa
 * @since 4.1.0(11)
 */
/**
 * Support the IFAA protocol, provide platform infrastructure to support secret free payment, support super
 * application ecosystem capabilities, and improve system security and user experience.
 *
 * @namespace ifaa
 * @syscap SystemCapability.Security.Ifaa
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace ifaa {
    /**
      * Get ifaa version.
      *
      * @returns { Uint8Array } the anonymized deviceId.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get ifaa version.
      *
      * @returns { Uint8Array } the anonymized deviceId.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getVersionSync(): number;
    /**
      * Get anonymized deviceId.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Uint8Array } the anonymized deviceId.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get anonymized deviceId.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Uint8Array } the anonymized deviceId.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getAnonymousIdSync(userToken: Uint8Array): Uint8Array;
    /**
      * Get anonymized deviceId.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Promise<Uint8Array> } the promise used to return the anonymized deviceId.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get anonymized deviceId.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Promise<Uint8Array> } the promise used to return the anonymized deviceId.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getAnonymousId(userToken: Uint8Array): Promise<Uint8Array>;
    /**
      * Get anonymized deviceId.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the anonymized deviceId.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get anonymized deviceId.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the anonymized deviceId.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getAnonymousId(userToken: Uint8Array, callback: AsyncCallback<Uint8Array>): void;
    /**
      * Get the enabling status of the IFAA.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Promise<boolean> } the promise used to return the enabling status of the IFAA.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get the enabling status of the IFAA.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Promise<boolean> } the promise used to return the enabling status of the IFAA.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function queryStatusSync(userToken: Uint8Array): boolean;
    /**
      * Get the enabling status of the IFAA.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Promise<boolean> } the promise used to return the enabling status of the IFAA.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get the enabling status of the IFAA.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @returns { Promise<boolean> } the promise used to return the enabling status of the IFAA.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function queryStatus(userToken: Uint8Array): Promise<boolean>;
    /**
      * Get the enabling status of the IFAA.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @param { AsyncCallback<boolean> } callback - the callback used to return the enabling status of the IFAA.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get the enabling status of the IFAA.
      *
      * @param { Uint8Array } userToken - user token allocated by the ifaa alliance.
      * @param { AsyncCallback<boolean> } callback - the callback used to return the enabling status of the IFAA.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function queryStatus(userToken: Uint8Array, callback: AsyncCallback<boolean>): void;
    /**
      * Enable the IFAA feature.
      *
      * @param { Uint8Array } enableData - Data required for enabling the IFAA feature.
      * @returns { Promise<Uint8Array> } the promise used to return the result of enabling the IFAA feature.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Enable the IFAA feature.
      *
      * @param { Uint8Array } enableData - Data required for enabling the IFAA feature.
      * @returns { Promise<Uint8Array> } the promise used to return the result of enabling the IFAA feature.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function register(registerData: Uint8Array): Promise<Uint8Array>;
    /**
      * Enable the IFAA feature.
      *
      * @param { Uint8Array } enableData - Data required for enabling the IFAA feature.
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the result of enabling the IFAA feature.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Enable the IFAA feature.
      *
      * @param { Uint8Array } enableData - Data required for enabling the IFAA feature.
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the result of enabling the IFAA feature.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function register(registerData: Uint8Array, callback: AsyncCallback<Uint8Array>): void;
    /**
      * Get parameters of the authentication request.
      *
      * @returns { Uint8Array } the parameters.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get parameters of the authentication request.
      *
      * @returns { Uint8Array } the parameters.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function preAuthSync(): Uint8Array;
    /**
      * Get parameters of the authentication request.
      *
      * @returns { Promise<Uint8Array> } the promise used to return the parameters.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get parameters of the authentication request.
      *
      * @returns { Promise<Uint8Array> } the promise used to return the parameters.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function preAuth(): Promise<Uint8Array>;
    /**
      * Get parameters of the authentication request.
      *
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the parameters.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get parameters of the authentication request.
      *
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the parameters.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function preAuth(callback: AsyncCallback<Uint8Array>): void;
    /**
      * Auth the IFAA feature.
      *
      * @param { Uint8Array } authToken - Result of the biometric authentication.
      * @param { Uint8Array } authData - Data required for authentication.
      * @returns { Promise<Uint8Array> } the promise used to return the result of authentication.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Auth the IFAA feature.
      *
      * @param { Uint8Array } authToken - Result of the biometric authentication.
      * @param { Uint8Array } authData - Data required for authentication.
      * @returns { Promise<Uint8Array> } the promise used to return the result of authentication.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function authSync(authToken: Uint8Array, authData: Uint8Array): Uint8Array;
    /**
      * Auth the IFAA feature.
      *
      * @param { Uint8Array } authToken - Result of the biometric authentication.
      * @param { Uint8Array } authData - Data required for authentication.
      * @returns { Promise<Uint8Array> } the promise used to return the result of authentication.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Auth the IFAA feature.
      *
      * @param { Uint8Array } authToken - Result of the biometric authentication.
      * @param { Uint8Array } authData - Data required for authentication.
      * @returns { Promise<Uint8Array> } the promise used to return the result of authentication.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function auth(authToken: Uint8Array, authData: Uint8Array): Promise<Uint8Array>;
    /**
      * Auth the IFAA feature.
      *
      * @param { Uint8Array } authToken - Result of the biometric authentication.
      * @param { Uint8Array } authData - Data required for authentication.
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the result of authentication.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Auth the IFAA feature.
      *
      * @param { Uint8Array } authToken - Result of the biometric authentication.
      * @param { Uint8Array } authData - Data required for authentication.
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the result of authentication.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function auth(authToken: Uint8Array, authData: Uint8Array, callback: AsyncCallback<Uint8Array>): void;
    /**
      * Deregister the IFAA feature.
      *
      * @param { Uint8Array } deregisterData- Data required for deregister the IFAA feature.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Deregister the IFAA feature.
      *
      * @param { Uint8Array } deregisterData- Data required for deregister the IFAA feature.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function deregisterSync(deregisterData: Uint8Array): void;
    /**
      * Deregister the IFAA feature.
      *
      * @param { Uint8Array } deregisterData- Data required for deregister the IFAA feature.
      * @returns { Promise<void> } the promise returned by the function.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Deregister the IFAA feature.
      *
      * @param { Uint8Array } deregisterData- Data required for deregister the IFAA feature.
      * @returns { Promise<void> } the promise returned by the function.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function deregister(deregisterData: Uint8Array): Promise<void>;
    /**
      * Deregister the IFAA feature.
      *
      * @param { Uint8Array } deregisterData- Data required for deregister the IFAA feature.
      * @param { AsyncCallback<void> } callback - the callback returned by the function.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Deregister the IFAA feature.
      *
      * @param { Uint8Array } deregisterData- Data required for deregister the IFAA feature.
      * @param { AsyncCallback<void> } callback - the callback returned by the function.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function deregister(deregisterData: Uint8Array, callback: AsyncCallback<void>): void;
    /**
      * Get protocol version.
      *
      * @returns { Uint8Array } the protocol version.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get protocol version.
      *
      * @returns { Uint8Array } the protocol version.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getProtocolVersionSync(): Uint8Array;
    /**
      * Get protocol version.
      *
      * @returns { Promise<Uint8Array> } the promise used to return the protocol version.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get protocol version.
      *
      * @returns { Promise<Uint8Array> } the promise used to return the protocol version.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getProtocolVersion(): Promise<Uint8Array>;
    /**
      * Get protocol version.
      *
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the protocol version.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get protocol version.
      *
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the protocol version.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getProtocolVersion(callback: AsyncCallback<Uint8Array>): void;
    /**
      * Get supported certificate types.
      *
      * @returns { Uint8Array } the supported certificate types.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get supported certificate types.
      *
      * @returns { Uint8Array } the supported certificate types.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getSupportedCertTypesSync(): Uint8Array;
    /**
      * Get supported certificate types.
      *
      * @returns { Promise<Uint8Array> } the promise used to return the supported certificate types.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get supported certificate types.
      *
      * @returns { Promise<Uint8Array> } the promise used to return the supported certificate types.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getSupportedCertTypes(): Promise<Uint8Array>;
    /**
      * Get supported certificate types.
      *
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the supported certificate types.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @since 4.1.0(11)
      */
    /**
      * Get supported certificate types.
      *
      * @param { AsyncCallback<Uint8Array> } callback - the callback used to return the supported certificate types.
      * @throws { BusinessError } 401 - Parameter error.
      * @throws { BusinessError } 1006100001 - System Interruption.
      * @throws { BusinessError } 1006100002 - The service is abnormal.
      * @syscap SystemCapability.Security.Ifaa
      * @atomicservice
      * @since 5.0.0(12)
      */
    function getSupportedCertTypes(callback: AsyncCallback<Uint8Array>): void;
}
export default ifaa;
