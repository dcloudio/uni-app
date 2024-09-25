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
 * @kit DeviceCertificateKit
 */
import type { AsyncCallback } from './@ohos.base';
/**
 * OpenHarmony Universal CertificateManager
 *
 * @namespace certificateManager
 * @syscap SystemCapability.Security.CertificateManager
 * @since 11
 */
declare namespace certificateManager {
    /**
     * Enum for result code
     *
     * @enum { number }
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export enum CMErrorCode {
        /**
         * Indicates that the application has no permission to call the API.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_ERROR_NO_PERMISSION = 201,
        /**
         * Indicates that the input parameters are invalid.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_ERROR_INVALID_PARAMS = 401,
        /**
         * Indicates that internal error.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_ERROR_GENERIC = 17500001,
        /**
         * Indicates that the certificate does not exist.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_ERROR_NO_FOUND = 17500002,
        /**
         * Indicates that the keystore is in an invalid format or the keystore password is incorrect.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_ERROR_INCORRECT_FORMAT = 17500003,
        /**
         * Indicates that the number of certificates or credentials reaches the maximum allowed.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 12
         */
        CM_ERROR_MAX_CERT_COUNT_REACHED = 17500004,
        /**
         * Indicates that the application is not authorized by the user.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 12
         */
        CM_ERROR_NO_AUTHORIZATION = 17500005
    }
    /**
     * Provides the CertInfo type.
     *
     * @typedef CertInfo
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export interface CertInfo {
        /**
         * Indicates the uri of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        uri: string;
        /**
         * Indicates the alias of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        certAlias: string;
        /**
         * Indicates the state of certificate.
         *
         * @type { boolean }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        state: boolean;
        /**
         * Indicates the issuer name of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        issuerName: string;
        /**
         * Indicates the subject name of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        subjectName: string;
        /**
         * Indicates the serial number of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        serial: string;
        /**
         * Indicates the not before time of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        notBefore: string;
        /**
         * Indicates the not after time of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        notAfter: string;
        /**
         * Indicates the fingerprint of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        fingerprintSha256: string;
        /**
         * Indicates the certificate binary data.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        cert: Uint8Array;
    }
    /**
     * Provides the abstract Cert type.
     *
     * @typedef CertAbstract
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export interface CertAbstract {
        /**
         * Indicates the uri of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        uri: string;
        /**
         * Indicates the alias of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        certAlias: string;
        /**
         * Indicates the state of certificate.
         *
         * @type { boolean }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        state: boolean;
        /**
         * Indicates the subject name of certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        subjectName: string;
    }
    /**
     * Provides the Credential type.
     *
     * @typedef Credential
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export interface Credential {
        /**
         * Indicates the type of Credential.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        type: string;
        /**
         * Indicates the alias of Credential.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        alias: string;
        /**
         * Indicates the uri of Credential.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        keyUri: string;
        /**
         * Indicates the number of certificates included in the credential.
         *
         * @type { number }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        certNum: number;
        /**
         * Indicates the number of key included in the credential.
         *
         * @type { number }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        keyNum: number;
        /**
         * Indicates the credential binary data.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        credentialData: Uint8Array;
    }
    /**
     * Provides the abstract Credential type.
     *
     * @typedef CredentialAbstract
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export interface CredentialAbstract {
        /**
         * Indicates the type of Credential.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        type: string;
        /**
         * Indicates the alias of Credential.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        alias: string;
        /**
         * Indicates the uri of Credential.
         *
         * @type { string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        keyUri: string;
    }
    /**
     * Provides the CMResult type.
     *
     * @typedef CMResult
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export interface CMResult {
        /**
         * Indicates the certificate list of CMResult.
         *
         * @type { ?Array<CertAbstract> }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        certList?: Array<CertAbstract>;
        /**
         * Indicates the certificate info of CMResult.
         *
         * @type { ?CertInfo }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        certInfo?: CertInfo;
        /**
         * Indicates the credential list of CMResult.
         *
         * @type { ?Array<CredentialAbstract> }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        credentialList?: Array<CredentialAbstract>;
        /**
         * Indicates the credential of CMResult.
         *
         * @type { ?Credential }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        credential?: Credential;
        /**
         * Indicates the app uid list of CMResult.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        appUidList?: Array<string>;
        /**
         * Indicates the certificate uri of CMResult.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        uri?: string;
        /**
         * Indicates the outData of CMResult.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        outData?: Uint8Array;
    }
    /**
     * Enum for Key Purpose
     *
     * @enum { number }
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export enum CmKeyPurpose {
        /**
         * Indicates that key for signature.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_KEY_PURPOSE_SIGN = 4,
        /**
         * Indicates that key for verify.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_KEY_PURPOSE_VERIFY = 8
    }
    /**
     * Enum for Key Digest
     *
     * @enum { number }
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export enum CmKeyDigest {
        /**
         * Indicates that key digest is none.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_DIGEST_NONE = 0,
        /**
         * Indicates that key digest is md5.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_DIGEST_MD5 = 1,
        /**
         * Indicates that key digest is sha1.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_DIGEST_SHA1 = 2,
        /**
         * Indicates that key digest is sha224.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_DIGEST_SHA224 = 3,
        /**
         * Indicates that key digest is sha256.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_DIGEST_SHA256 = 4,
        /**
         * Indicates that key digest is sha384.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_DIGEST_SHA384 = 5,
        /**
         * Indicates that key digest is sha512.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_DIGEST_SHA512 = 6
    }
    /**
     * Enum for Key Padding
     *
     * @enum { number }
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export enum CmKeyPadding {
        /**
         * Indicates that key padding is none.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_PADDING_NONE = 0,
        /**
         * Indicates that key padding is PSS.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_PADDING_PSS = 1,
        /**
         * Indicates that key padding is PKCS1_V1_5.
         *
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        CM_PADDING_PKCS1_V1_5 = 2
    }
    /**
     * Provides the CMSignatureSpec type.
     *
     * @typedef CMSignatureSpec
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export interface CMSignatureSpec {
        /**
         * Indicates the key purpose of CMSignatureSpec.
         *
         * @type { CmKeyPurpose }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        purpose: CmKeyPurpose;
        /**
         * Indicates the key padding of CMSignatureSpec.
         *
         * @type { ?CmKeyPadding }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        padding?: CmKeyPadding;
        /**
         * Indicates the key digest of CMSignatureSpec.
         *
         * @type { ?CmKeyDigest }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        digest?: CmKeyDigest;
    }
    /**
     * Provides the CMHandle type.
     *
     * @typedef CMHandle
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    export interface CMHandle {
        /**
         * Indicates the handle .
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.CertificateManager
         * @since 11
         */
        handle: Uint8Array;
    }
    /**
     * Install private application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } keystore - Indicates the keystore file with key pair and certificate.
     * @param { string } keystorePwd - Indicates the password of keystore file.
     * @param { string } certAlias - Indicates the certificate name inputted by the user.
     * @param { AsyncCallback<CMResult> } callback - The callback of installPrivateCertificate.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500003 - The keystore is in an invalid format or the keystore password is incorrect.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    /**
     * Install private application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } keystore - Indicates the keystore file with key pair and certificate.
     * @param { string } keystorePwd - Indicates the password of keystore file.
     * @param { string } certAlias - Indicates the certificate name inputted by the user.
     * @param { AsyncCallback<CMResult> } callback - The callback of installPrivateCertificate.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500003 - The keystore is in an invalid format or the keystore password is incorrect.
     * @throws { BusinessError } 17500004 - The number of certificates or credentials reaches the maximum allowed.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function installPrivateCertificate(keystore: Uint8Array, keystorePwd: string, certAlias: string, callback: AsyncCallback<CMResult>): void;
    /**
     * Install private application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } keystore - Indicates the keystore file with key pair and certificate.
     * @param { string } keystorePwd - Indicates the password of keystore file.
     * @param { string } certAlias - Indicates the certificate name inputted by the user.
     * @returns { Promise<CMResult> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500003 - The keystore is in an invalid format or the keystore password is incorrect.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    /**
     * Install private application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } keystore - Indicates the keystore file with key pair and certificate.
     * @param { string } keystorePwd - Indicates the password of keystore file.
     * @param { string } certAlias - Indicates the certificate name inputted by the user.
     * @returns { Promise<CMResult> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500003 - The keystore is in an invalid format or the keystore password is incorrect.
     * @throws { BusinessError } 17500004 - The number of certificates or credentials reaches the maximum allowed.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function installPrivateCertificate(keystore: Uint8Array, keystorePwd: string, certAlias: string): Promise<CMResult>;
    /**
     * Uninstall the specified normal application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } keyUri - Indicates key's name.
     * @param { AsyncCallback<void> } callback - The callback of uninstallPrivateCertificate.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function uninstallPrivateCertificate(keyUri: string, callback: AsyncCallback<void>): void;
    /**
     * Uninstall the specified normal application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } keyUri - Indicates key's name.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function uninstallPrivateCertificate(keyUri: string): Promise<void>;
    /**
     * Get the detail of private application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } keyUri - Indicates key's name.
     * @param { AsyncCallback<CMResult> } callback - The callback of getPrivateCertificate.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function getPrivateCertificate(keyUri: string, callback: AsyncCallback<CMResult>): void;
    /**
     * Get the detail of private application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } keyUri - Indicates key's name.
     * @returns { Promise<CMResult> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function getPrivateCertificate(keyUri: string): Promise<CMResult>;
    /**
     * Init operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } authUri - Indicates the authorization relationship between application and application certificate.
     * @param { CMSignatureSpec } spec - Indicates the properties of the signature and verification.
     * @param { AsyncCallback<CMHandle> } callback - The callback of init.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    /**
     * Init operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } authUri - Indicates the authorization relationship between application and application certificate.
     * @param { CMSignatureSpec } spec - Indicates the properties of the signature and verification.
     * @param { AsyncCallback<CMHandle> } callback - The callback of init.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @throws { BusinessError } 17500005 - The application is not authorized by the user.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function init(authUri: string, spec: CMSignatureSpec, callback: AsyncCallback<CMHandle>): void;
    /**
     * Init operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } authUri - Indicates the authorization relationship between application and application certificate.
     * @param { CMSignatureSpec } spec - Indicates the properties of the signature and verification.
     * @returns { Promise<CMHandle> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    /**
     * Init operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } authUri - Indicates the authorization relationship between application and application certificate.
     * @param { CMSignatureSpec } spec - Indicates the properties of the signature and verification.
     * @returns { Promise<CMHandle> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @throws { BusinessError } 17500005 - The application is not authorized by the user.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function init(authUri: string, spec: CMSignatureSpec): Promise<CMHandle>;
    /**
     * Update operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } handle - Indicates the handle of the init operation.
     * @param { Uint8Array } data - Indicates the input value.
     * @param { AsyncCallback<void> } callback - The callback of update.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function update(handle: Uint8Array, data: Uint8Array, callback: AsyncCallback<void>): void;
    /**
     * Update operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } handle - Indicates the handle of the init operation.
     * @param { Uint8Array } data - Indicates the input value.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function update(handle: Uint8Array, data: Uint8Array): Promise<void>;
    /**
     * Finish operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } handle - Indicates the handle of the init operation.
     * @param { AsyncCallback<CMResult> } callback - The callback of finish.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function finish(handle: Uint8Array, callback: AsyncCallback<CMResult>): void;
    /**
     * Finish operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } handle - Indicates the handle of the init operation.
     * @param { Uint8Array } signature - Indicates the sign data.
     * @param { AsyncCallback<CMResult> } callback - The callback of finish.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function finish(handle: Uint8Array, signature: Uint8Array, callback: AsyncCallback<CMResult>): void;
    /**
     * Finish operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } handle - Indicates the handle of the init operation.
     * @param { Uint8Array } [options] signature - Indicates the sign data.
     * @returns { Promise<CMResult> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function finish(handle: Uint8Array, signature?: Uint8Array): Promise<CMResult>;
    /**
     * Abort operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } handle - Indicates the handle of the init operation.
     * @param { AsyncCallback<void> } callback - The callback of abort.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function abort(handle: Uint8Array, callback: AsyncCallback<void>): void;
    /**
     * Abort operation for signing and verifying etc.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { Uint8Array } handle - Indicates the handle of the init operation.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 11
     */
    function abort(handle: Uint8Array): Promise<void>;
    /**
     * Get the detail of public application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } keyUri - Indicates the key's name.
     * @returns { Promise<CMResult> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @throws { BusinessError } 17500005 - The application is not authorized by the user.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function getPublicCertificate(keyUri: string): Promise<CMResult>;
    /**:
     * Whether the current application is authorized by the specified public application certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } keyUri - Indicates the key's name.
     * @returns { Promise<boolean> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function isAuthorizedApp(keyUri: string): Promise<boolean>;
    /**
     * Get a list of all user trusted CA certificates.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @returns { Promise<CMResult> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 17500001 - Internal error.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function getAllUserTrustedCertificates(): Promise<CMResult>;
    /**
     * Get the detail of user trusted CA certificate.
     *
     * @permission ohos.permission.ACCESS_CERT_MANAGER
     * @param { string } certUri - Indicates the certificate's name.
     * @returns { Promise<CMResult> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 17500001 - Internal error.
     * @throws { BusinessError } 17500002 - The certificate does not exist.
     * @syscap SystemCapability.Security.CertificateManager
     * @since 12
     */
    function getUserTrustedCertificate(certUri: string): Promise<CMResult>;
}
export default certificateManager;
