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
 * @kit NetworkKit
 */

/**
 * Provides networkSecurity related APIs.
 * @namespace networkSecurity
 * @syscap SystemCapability.Communication.NetStack
 * @since 11
 */
declare namespace networkSecurity {
    /**
     * Defines the certificate type.
     * @enum {number}
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    export enum CertType {
        /**
         * PEM type certificate.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        CERT_TYPE_PEM = 0,
        /**
         * DER type certificate.
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        CERT_TYPE_DER = 1
    }
    /**
     * Define the certificate content.
     * @interface CertBlob
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    export interface CertBlob {
        /**
         * Certificate type.
         * @type { CertType }
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        type: CertType;
        /**
         * Certificate data.
         * @type {string | ArrayBuffer}
         * @syscap SystemCapability.Communication.NetStack
         * @since 11
         */
        data: string | ArrayBuffer;
    }
    /**
     * Certificate verification to the server.
     * @param { CertBlob } cert - Certificates to be verified.
     * @param { CertBlob } [caCert] - Incoming custom CA cert.
     * @returns { Promise<number> } The promise returned by the function.
     * Number equals 0 if verify of certification from server succeed, else verify failed.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2305001 - Unspecified error.
     * @throws { BusinessError } 2305002 - Unable to get issuer certificate.
     * @throws { BusinessError } 2305003 - Unable to get certificate revocation list (CRL).
     * @throws { BusinessError } 2305004 - Unable to decrypt certificate signature.
     * @throws { BusinessError } 2305005 - Unable to decrypt CRL signature.
     * @throws { BusinessError } 2305006 - Unable to decode issuer public key.
     * @throws { BusinessError } 2305007 - Certificate signature failure.
     * @throws { BusinessError } 2305008 - CRL signature failure.
     * @throws { BusinessError } 2305009 - Certificate is not yet valid.
     * @throws { BusinessError } 2305010 - Certificate has expired.
     * @throws { BusinessError } 2305011 - CRL is not yet valid.
     * @throws { BusinessError } 2305012 - CRL has expired.
     * @throws { BusinessError } 2305023 - Certificate has been revoked.
     * @throws { BusinessError } 2305024 - Invalid certificate authority (CA).
     * @throws { BusinessError } 2305027 - Certificate is untrusted.
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    export function certVerification(cert: CertBlob, caCert?: CertBlob): Promise<number>;
    /**
     * Certificate verification to the server.
     * @param { CertBlob } cert - Certificates to be verified.
     * @param { CertBlob } [caCert] - Incoming custom CA cert.
     * @returns { number } Returns 0 if verify of certification from server succeed, else verify failed.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 2305001 - Unspecified error.
     * @throws { BusinessError } 2305002 - Unable to get issuer certificate.
     * @throws { BusinessError } 2305003 - Unable to get certificate revocation list (CRL).
     * @throws { BusinessError } 2305004 - Unable to decrypt certificate signature.
     * @throws { BusinessError } 2305005 - Unable to decrypt CRL signature.
     * @throws { BusinessError } 2305006 - Unable to decode issuer public key.
     * @throws { BusinessError } 2305007 - Certificate signature failure.
     * @throws { BusinessError } 2305008 - CRL signature failure.
     * @throws { BusinessError } 2305009 - Certificate is not yet valid.
     * @throws { BusinessError } 2305010 - Certificate has expired.
     * @throws { BusinessError } 2305011 - CRL is not yet valid.
     * @throws { BusinessError } 2305012 - CRL has expired.
     * @throws { BusinessError } 2305023 - Certificate has been revoked.
     * @throws { BusinessError } 2305024 - Invalid certificate authority (CA).
     * @throws { BusinessError } 2305027 - Certificate is untrusted.
     * @syscap SystemCapability.Communication.NetStack
     * @since 11
     */
    export function certVerificationSync(cert: CertBlob, caCert?: CertBlob): number;
}
export default networkSecurity;
