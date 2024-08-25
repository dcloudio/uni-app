/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
import cryptoFramework from './@ohos.security.cryptoFramework';
/**
 * Provides a series of capabilities related to certificates,
 * which supports parsing, verification, and output of certificates, extensions, and CRLs.
 *
 * @namespace cert
 * @syscap SystemCapability.Security.Cert
 * @since 9
 */
/**
 * Provides a series of capabilities related to certificates,
 * which supports parsing, verification, and output of certificates, extensions, and CRLs.
 *
 * @namespace cert
 * @syscap SystemCapability.Security.Cert
 * @crossplatform
 * @since 11
 */
/**
 * Provides a series of capabilities related to certificates,
 * which supports parsing, verification, and output of certificates, extensions, and CRLs.
 *
 * @namespace cert
 * @syscap SystemCapability.Security.Cert
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace cert {
    /**
     * Enum for result code
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Enum for result code
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Enum for result code
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum CertResult {
        /**
         * Indicates that input parameters is invalid.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates that input parameters is invalid.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates that input parameters is invalid.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        INVALID_PARAMS = 401,
        /**
         * Indicates that function or algorithm is not supported.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates that function or algorithm is not supported.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates that function or algorithm is not supported.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        NOT_SUPPORT = 801,
        /**
         * Indicates the memory error.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates the memory error.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates the memory error.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_OUT_OF_MEMORY = 19020001,
        /**
         * Indicates that runtime error.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates that runtime error.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates that runtime error.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_RUNTIME_ERROR = 19020002,
        /**
         * Indicates the crypto operation error.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates the crypto operation error.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates the crypto operation error.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_CRYPTO_OPERATION = 19030001,
        /**
         * Indicates that the certificate signature verification failed.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates that the certificate signature verification failed.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates that the certificate signature verification failed.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_CERT_SIGNATURE_FAILURE = 19030002,
        /**
         * Indicates that the certificate has not taken effect.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates that the certificate has not taken effect.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates that the certificate has not taken effect.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_CERT_NOT_YET_VALID = 19030003,
        /**
         * Indicates that the certificate has expired.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates that the certificate has expired.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates that the certificate has expired.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_CERT_HAS_EXPIRED = 19030004,
        /**
         * Indicates a failure to obtain the certificate issuer.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates a failure to obtain the certificate issuer.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates a failure to obtain the certificate issuer.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_UNABLE_TO_GET_ISSUER_CERT_LOCALLY = 19030005,
        /**
         * The key cannot be used for signing a certificate.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The key cannot be used for signing a certificate.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The key cannot be used for signing a certificate.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_KEYUSAGE_NO_CERTSIGN = 19030006,
        /**
         * The key cannot be used for digital signature.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The key cannot be used for digital signature.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The key cannot be used for digital signature.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ERR_KEYUSAGE_NO_DIGITAL_SIGNATURE = 19030007
    }
    /**
     * Provides the data blob type.
     *
     * @typedef DataBlob
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides the data blob type.
     *
     * @typedef DataBlob
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the data blob type.
     *
     * @typedef DataBlob
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface DataBlob {
        /**
         * Indicates the content of data blob.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates the content of data blob.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates the content of data blob.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        data: Uint8Array;
    }
    /**
     * Provides the data array type.
     *
     * @typedef DataArray
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides the data array type.
     *
     * @typedef DataArray
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the data array type.
     *
     * @typedef DataArray
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface DataArray {
        /**
         * Indicates the content of data array.
         *
         * @type { Array<Uint8Array> }
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Indicates the content of data array.
         *
         * @type { Array<Uint8Array> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates the content of data array.
         *
         * @type { Array<Uint8Array> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        data: Array<Uint8Array>;
    }
    /**
     * Enum for supported cert encoding format.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Enum for supported cert encoding format.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Enum for supported cert encoding format.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum EncodingFormat {
        /**
         * The value of cert DER format.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The value of cert DER format.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The value of cert DER format.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        FORMAT_DER = 0,
        /**
         * The value of cert PEM format.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The value of cert PEM format.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The value of cert PEM format.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        FORMAT_PEM = 1,
        /**
         * The value of cert chain PKCS7 format.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The value of cert chain PKCS7 format.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        FORMAT_PKCS7 = 2
    }
    /**
     * Enum for the certificate item type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @since 10
     */
    /**
     * Enum for the certificate item type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Enum for the certificate item type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum CertItemType {
        /**
         * Indicates to get certificate TBS(to be signed) value.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get certificate TBS(to be signed) value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get certificate TBS(to be signed) value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CERT_ITEM_TYPE_TBS = 0,
        /**
         * Indicates to get certificate public key.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get certificate public key.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get certificate public key.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CERT_ITEM_TYPE_PUBLIC_KEY = 1,
        /**
         * Indicates to get certificate issuer unique id value.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get certificate issuer unique id value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get certificate issuer unique id value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CERT_ITEM_TYPE_ISSUER_UNIQUE_ID = 2,
        /**
         * Indicates to get certificate subject unique id value.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get certificate subject unique id value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get certificate subject unique id value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CERT_ITEM_TYPE_SUBJECT_UNIQUE_ID = 3,
        /**
         * Indicates to get certificate extensions value.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get certificate extensions value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get certificate extensions value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CERT_ITEM_TYPE_EXTENSIONS = 4
    }
    /**
     * Enumerates for the certificate extension object identifier (OID) types.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @since 10
     */
    /**
     * Enumerates for the certificate extension object identifier (OID) types.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Enumerates for the certificate extension object identifier (OID) types.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum ExtensionOidType {
        /**
         * Indicates to obtain all types of OIDs, including critical and uncritical types.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to obtain all types of OIDs, including critical and uncritical types.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to obtain all types of OIDs, including critical and uncritical types.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        EXTENSION_OID_TYPE_ALL = 0,
        /**
         * Indicates to obtain OIDs of the critical type.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to obtain OIDs of the critical type.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to obtain OIDs of the critical type.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        EXTENSION_OID_TYPE_CRITICAL = 1,
        /**
         * Indicates to obtain OIDs of the uncritical type.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to obtain OIDs of the uncritical type.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to obtain OIDs of the uncritical type.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        EXTENSION_OID_TYPE_UNCRITICAL = 2
    }
    /**
     * Enum for the certificate extension entry type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @since 10
     */
    /**
     * Enum for the certificate extension entry type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Enum for the certificate extension entry type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum ExtensionEntryType {
        /**
         * Indicates to get extension entry.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get extension entry.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get extension entry.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        EXTENSION_ENTRY_TYPE_ENTRY = 0,
        /**
         * Indicates to get extension entry critical.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get extension entry critical.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get extension entry critical.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        EXTENSION_ENTRY_TYPE_ENTRY_CRITICAL = 1,
        /**
         * Indicates to get extension entry value.
         *
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Indicates to get extension entry value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates to get extension entry value.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        EXTENSION_ENTRY_TYPE_ENTRY_VALUE = 2
    }
    /**
     * Provides the cert encoding blob type.
     *
     * @typedef EncodingBlob
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides the cert encoding blob type.
     *
     * @typedef EncodingBlob
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the cert encoding blob type.
     *
     * @typedef EncodingBlob
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface EncodingBlob {
        /**
         * The data input.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The data input.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The data input.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        data: Uint8Array;
        /**
         * The data encoding format.
         *
         * @type { EncodingFormat }
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The data encoding format.
         *
         * @type { EncodingFormat }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The data encoding format.
         *
         * @type { EncodingFormat }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodingFormat: EncodingFormat;
    }
    /**
     * Provides the cert chain data type.
     *
     * @typedef CertChainData
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides the cert chain data type.
     *
     * @typedef CertChainData
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the cert chain data type.
     *
     * @typedef CertChainData
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertChainData {
        /**
         * The data input.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The data input.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The data input.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        data: Uint8Array;
        /**
         * The number of certs.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The number of certs.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The number of certs.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        count: number;
        /**
         * The data encoding format.
         *
         * @type { EncodingFormat }
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The data encoding format.
         *
         * @type { EncodingFormat }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The data encoding format.
         *
         * @type { EncodingFormat }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        encodingFormat: EncodingFormat;
    }
    /**
     * Enum for Encoding type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum EncodingType {
        /**
         * Indicates to utf8 type.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ENCODING_UTF8 = 0
    }
    /**
     * Provides the x509 cert type.
     *
     * @typedef X509Cert
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides the x509 cert type.
     *
     * @typedef X509Cert
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the x509 cert type.
     *
     * @typedef X509Cert
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X509Cert {
        /**
         * Verify the X509 cert.
         *
         * @param { cryptoFramework.PubKey } key - public key to verify cert.
         * @param { AsyncCallback<void> } callback - the callback of verify.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Verify the X509 cert.
         *
         * @param { cryptoFramework.PubKey } key - public key to verify cert.
         * @param { AsyncCallback<void> } callback - the callback of verify.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Verify the X509 cert.
         *
         * @param { cryptoFramework.PubKey } key - public key to verify cert.
         * @param { AsyncCallback<void> } callback - the callback of verify.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        verify(key: cryptoFramework.PubKey, callback: AsyncCallback<void>): void;
        /**
         * Verify the X509 cert.
         *
         * @param { cryptoFramework.PubKey } key - public key to verify cert.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Verify the X509 cert.
         *
         * @param { cryptoFramework.PubKey } key - public key to verify cert.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Verify the X509 cert.
         *
         * @param { cryptoFramework.PubKey } key - public key to verify cert.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        verify(key: cryptoFramework.PubKey): Promise<void>;
        /**
         * Get X509 cert encoded data.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert encoded data.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert encoded data.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(callback: AsyncCallback<EncodingBlob>): void;
        /**
         * Get X509 cert encoded data.
         *
         * @returns { Promise<EncodingBlob> } the promise of X509 cert encoded data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert encoded data.
         *
         * @returns { Promise<EncodingBlob> } the promise of X509 cert encoded data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert encoded data.
         *
         * @returns { Promise<EncodingBlob> } the promise of X509 cert encoded data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(): Promise<EncodingBlob>;
        /**
         * Get X509 cert public key.
         *
         * @returns { cryptoFramework.PubKey } X509 cert pubKey.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert public key.
         *
         * @returns { cryptoFramework.PubKey } X509 cert pubKey.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert public key.
         *
         * @returns { cryptoFramework.PubKey } X509 cert pubKey.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getPublicKey(): cryptoFramework.PubKey;
        /**
         * Check the X509 cert validity with date.
         *
         * @param { string } date - indicates the cert date.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Check the X509 cert validity with date.
         *
         * @param { string } date - indicates the cert date.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Check the X509 cert validity with date.
         *
         * @param { string } date - indicates the cert date.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        checkValidityWithDate(date: string): void;
        /**
         * Get X509 cert version.
         *
         * @returns { number } X509 cert version.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert version.
         *
         * @returns { number } X509 cert version.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert version.
         *
         * @returns { number } X509 cert version.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getVersion(): number;
        /**
         * Get X509 cert serial number.
         *
         * @returns { number } X509 cert serial number.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 10
         * @useinstead ohos.security.cert.X509Cert.getCertSerialNumber
         */
        getSerialNumber(): number;
        /**
         * Get X509 cert serial number.
         *
         * @returns { bigint } X509 cert serial number.
         * @throws { BusinessError } 19020002 - runtime error.
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Get X509 cert serial number.
         *
         * @returns { bigint } X509 cert serial number.
         * @throws { BusinessError } 19020002 - runtime error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert serial number.
         *
         * @returns { bigint } X509 cert serial number.
         * @throws { BusinessError } 19020002 - runtime error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getCertSerialNumber(): bigint;
        /**
         * Get X509 cert issuer name.
         *
         * @returns { DataBlob } X509 cert issuer name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert issuer name.
         *
         * @returns { DataBlob } X509 cert issuer name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert issuer name.
         *
         * @returns { DataBlob } X509 cert issuer name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getIssuerName(): DataBlob;
        /**
         * Get X509 cert subject name.
         *
         * @returns { DataBlob } X509 cert subject name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert subject name.
         *
         * @returns { DataBlob } X509 cert subject name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert subject name.
         *
         * @param { EncodingType } [encodingType] indicates the encoding type, if the encoding type parameter is not set,
         *                                    the default ASCII encoding is used.
         * @returns { DataBlob } X509 cert subject name.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Incorrect parameter types;
         * <br>2. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSubjectName(encodingType?: EncodingType): DataBlob;
        /**
         * Get X509 cert not before time.
         *
         * @returns { string } X509 cert not before time.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert not before time.
         *
         * @returns { string } X509 cert not before time.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert not before time.
         *
         * @returns { string } X509 cert not before time.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getNotBeforeTime(): string;
        /**
         * Get X509 cert not after time.
         *
         * @returns { string } X509 cert not after time.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert not after time.
         *
         * @returns { string } X509 cert not after time.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert not after time.
         *
         * @returns { string } X509 cert not after time.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getNotAfterTime(): string;
        /**
         * Get X509 cert signature.
         *
         * @returns { DataBlob } X509 cert signature.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert signature.
         *
         * @returns { DataBlob } X509 cert signature.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert signature.
         *
         * @returns { DataBlob } X509 cert signature.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignature(): DataBlob;
        /**
         * Get X509 cert signature's algorithm name.
         *
         * @returns { string } X509 cert signature's algorithm name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert signature's algorithm name.
         *
         * @returns { string } X509 cert signature's algorithm name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert signature's algorithm name.
         *
         * @returns { string } X509 cert signature's algorithm name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignatureAlgName(): string;
        /**
         * Get X509 cert signature's algorithm oid.
         *
         * @returns { string } X509 cert signature's algorithm oid.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert signature's algorithm oid.
         *
         * @returns { string } X509 cert signature's algorithm oid.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert signature's algorithm oid.
         *
         * @returns { string } X509 cert signature's algorithm oid.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignatureAlgOid(): string;
        /**
         * Get X509 cert signature's algorithm name.
         *
         * @returns { DataBlob } X509 cert signature's algorithm name.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert signature's algorithm name.
         *
         * @returns { DataBlob } X509 cert signature's algorithm name.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert signature's algorithm name.
         *
         * @returns { DataBlob } X509 cert signature's algorithm name.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignatureAlgParams(): DataBlob;
        /**
         * Get X509 cert key usage.
         *
         * @returns { DataBlob } X509 cert key usage.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert key usage.
         *
         * @returns { DataBlob } X509 cert key usage.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert key usage.
         *
         * @returns { DataBlob } X509 cert key usage.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getKeyUsage(): DataBlob;
        /**
         * Get X509 cert extended key usage.
         *
         * @returns { DataArray } X509 cert extended key usage.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert extended key usage.
         *
         * @returns { DataArray } X509 cert extended key usage.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert extended key usage.
         *
         * @returns { DataArray } X509 cert extended key usage.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getExtKeyUsage(): DataArray;
        /**
         * Get X509 cert basic constraints path len.
         *
         * @returns { number } X509 cert basic constraints path len.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert basic constraints path len.
         *
         * @returns { number } X509 cert basic constraints path len.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert basic constraints path len.
         *
         * @returns { number } X509 cert basic constraints path len.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getBasicConstraints(): number;
        /**
         * Get X509 cert subject alternative name.
         *
         * @returns { DataArray } X509 cert subject alternative name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert subject alternative name.
         *
         * @returns { DataArray } X509 cert subject alternative name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert subject alternative name.
         *
         * @returns { DataArray } X509 cert subject alternative name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSubjectAltNames(): DataArray;
        /**
         * Get X509 cert issuer alternative name.
         *
         * @returns { DataArray } X509 cert issuer alternative name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Get X509 cert issuer alternative name.
         *
         * @returns { DataArray } X509 cert issuer alternative name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get X509 cert issuer alternative name.
         *
         * @returns { DataArray } X509 cert issuer alternative name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getIssuerAltNames(): DataArray;
        /**
         * Get certificate item value.
         *
         * @param { CertItemType } itemType
         * @returns { DataBlob } cert item value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Get certificate item value.
         *
         * @param { CertItemType } itemType
         * @returns { DataBlob } cert item value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get certificate item value.
         *
         * @param { CertItemType } itemType
         * @returns { DataBlob } cert item value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getItem(itemType: CertItemType): DataBlob;
        /**
         * Check the X509 cert if match the parameters.
         *
         * @param { X509CertMatchParameters } param - indicate the match parameters.
         * @returns { boolean } true - match X509Cert, false - not match.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Check the X509 cert if match the parameters.
         *
         * @param { X509CertMatchParameters } param - indicate the match parameters.
         * @returns { boolean } true - match X509Cert, false - not match.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        match(param: X509CertMatchParameters): boolean;
        /**
         * Obtain CRL distribution points.
         *
         * @returns { DataArray } X509 cert CRL distribution points.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getCRLDistributionPoint(): DataArray;
        /**
         * Get X500 distinguished name of the issuer.
         *
         * @returns { X500DistinguishedName } X500 distinguished name object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getIssuerX500DistinguishedName(): X500DistinguishedName;
        /**
         * Get X500 distinguished name of the subject.
         *
         * @returns { X500DistinguishedName } X500 distinguished name object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSubjectX500DistinguishedName(): X500DistinguishedName;
        /**
         * Get the string type data of the object.
         *
         * @returns { string } the string type data of the object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        toString(): string;
        /**
         * Get the hash value of DER format data.
         *
         * @returns { Uint8Array } the hash value of DER format data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        hashCode(): Uint8Array;
        /**
         * Get the extension der encoding data for the corresponding entity.
         *
         * @returns { CertExtension } the certExtension object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getExtensionsObject(): CertExtension;
    }
    /**
     * Provides to create X509 certificate object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @param { AsyncCallback<X509Cert> } callback - the callback of createX509Cert.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides to create X509 certificate object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @param { AsyncCallback<X509Cert> } callback - the callback of createX509Cert.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create X509 certificate object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @param { AsyncCallback<X509Cert> } callback - the callback of createX509Cert.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX509Cert(inStream: EncodingBlob, callback: AsyncCallback<X509Cert>): void;
    /**
     * Provides to create X509 certificate object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @returns { Promise<X509Cert> } the promise of X509 cert instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides to create X509 certificate object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @returns { Promise<X509Cert> } the promise of X509 cert instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create X509 certificate object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @returns { Promise<X509Cert> } the promise of X509 cert instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX509Cert(inStream: EncodingBlob): Promise<X509Cert>;
    /**
     * The CertExtension interface is used to parse and verify certificate extension.
     *
     * @typedef CertExtension
     * @syscap SystemCapability.Security.Cert
     * @since 10
     */
    /**
     * The CertExtension interface is used to parse and verify certificate extension.
     *
     * @typedef CertExtension
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * The CertExtension interface is used to parse and verify certificate extension.
     *
     * @typedef CertExtension
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertExtension {
        /**
         * Get certificate extension encoded data.
         *
         * @returns { EncodingBlob } cert extension encoded data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Get certificate extension encoded data.
         *
         * @returns { EncodingBlob } cert extension encoded data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get certificate extension encoded data.
         *
         * @returns { EncodingBlob } cert extension encoded data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(): EncodingBlob;
        /**
         * Get certificate extension oid list.
         *
         * @param { ExtensionOidType } valueType
         * @returns { DataArray } cert extension OID list value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Get certificate extension oid list.
         *
         * @param { ExtensionOidType } valueType
         * @returns { DataArray } cert extension OID list value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get certificate extension oid list.
         *
         * @param { ExtensionOidType } valueType
         * @returns { DataArray } cert extension OID list value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getOidList(valueType: ExtensionOidType): DataArray;
        /**
         * Get certificate extension entry.
         *
         * @param { ExtensionEntryType } valueType
         * @param { DataBlob } oid
         * @returns { DataBlob } cert extension entry value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Get certificate extension entry.
         *
         * @param { ExtensionEntryType } valueType
         * @param { DataBlob } oid
         * @returns { DataBlob } cert extension entry value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get certificate extension entry.
         *
         * @param { ExtensionEntryType } valueType
         * @param { DataBlob } oid
         * @returns { DataBlob } cert extension entry value.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEntry(valueType: ExtensionEntryType, oid: DataBlob): DataBlob;
        /**
         * Check whether the certificate is a CA(The keyusage contains signature usage and the value of cA in BasicConstraints is true).
         * If not a CA, return -1, otherwise return the path length constraint in BasicConstraints.
         * If the certificate is a CA and the path length constraint does not appear, then return -2 to indicate that there is no limit to path length.
         *
         * @returns { number } path length constraint.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 10
         */
        /**
         * Check whether the certificate is a CA(The keyusage contains signature usage and the value of cA in BasicConstraints is true).
         * If not a CA, return -1, otherwise return the path length constraint in BasicConstraints.
         * If the certificate is a CA and the path length constraint does not appear, then return -2 to indicate that there is no limit to path length.
         *
         * @returns { number } path length constraint.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Check whether the certificate is a CA(The keyusage contains signature usage and the value of cA in BasicConstraints is true).
         * If not a CA, return -1, otherwise return the path length constraint in BasicConstraints.
         * If the certificate is a CA and the path length constraint does not appear, then return -2 to indicate that there is no limit to path length.
         *
         * @returns { number } path length constraint.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        checkCA(): number;
        /**
         * Check if exists Unsupported critical extension.
         *
         * @returns { boolean } true - exists unsupported critical extension, false - else.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Check if exists Unsupported critical extension.
         *
         * @returns { boolean } true - exists unsupported critical extension, false - else.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        hasUnsupportedCriticalExtension(): boolean;
    }
    /**
     * Provides to create certificate extension object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert extensions data.
     * @param { AsyncCallback<CertExtension> } callback - the callback of of certificate extension instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @since 10
     */
    /**
     * Provides to create certificate extension object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert extensions data.
     * @param { AsyncCallback<CertExtension> } callback - the callback of of certificate extension instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create certificate extension object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert extensions data.
     * @param { AsyncCallback<CertExtension> } callback - the callback of of certificate extension instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createCertExtension(inStream: EncodingBlob, callback: AsyncCallback<CertExtension>): void;
    /**
     * Provides to create certificate extension object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert extensions data.
     * @returns { Promise<CertExtension> } the promise of certificate extension instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @since 10
     */
    /**
     * Provides to create certificate extension object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert extensions data.
     * @returns { Promise<CertExtension> } the promise of certificate extension instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create certificate extension object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert extensions data.
     * @returns { Promise<CertExtension> } the promise of certificate extension instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createCertExtension(inStream: EncodingBlob): Promise<CertExtension>;
    /**
     * Interface of X509CrlEntry.
     *
     * @typedef X509CrlEntry
     * @syscap SystemCapability.Security.Cert
     * @since 9
     * @deprecated since 11
     * @useinstead ohos.security.cert.X509CRLEntry
     */
    interface X509CrlEntry {
        /**
         * Returns the ASN of this CRL entry 1 der coding form, i.e. internal sequence.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRLEntry#getEncoded
         */
        getEncoded(callback: AsyncCallback<EncodingBlob>): void;
        /**
         * Returns the ASN of this CRL entry 1 der coding form, i.e. internal sequence.
         *
         * @returns { Promise<EncodingBlob> } the promise of crl entry blob data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRLEntry#getEncoded
         */
        getEncoded(): Promise<EncodingBlob>;
        /**
         * Get the serial number from this x509crl entry.
         *
         * @returns { number } serial number of crl entry.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRLEntry#getSerialNumber
         */
        getSerialNumber(): number;
        /**
         * Get the issuer of the x509 certificate described by this entry.
         *
         * @returns { DataBlob } DataBlob of issuer.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRLEntry#getCertIssuer
         */
        getCertIssuer(): DataBlob;
        /**
         * Get the revocation date from x509crl entry.
         *
         * @returns { string } string of revocation date.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRLEntry#getRevocationDate
         */
        getRevocationDate(): string;
    }
    /**
     * Interface of X509CRLEntry.
     *
     * @typedef X509CRLEntry
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Interface of X509CRLEntry.
     *
     * @typedef X509CRLEntry
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X509CRLEntry {
        /**
         * Returns the ASN of this CRL entry 1 der coding form, i.e. internal sequence.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Returns the ASN of this CRL entry 1 der coding form, i.e. internal sequence.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(callback: AsyncCallback<EncodingBlob>): void;
        /**
         * Returns the ASN of this CRL entry 1 der coding form, i.e. internal sequence.
         *
         * @returns { Promise<EncodingBlob> } the promise of CRL entry blob data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Returns the ASN of this CRL entry 1 der coding form, i.e. internal sequence.
         *
         * @returns { Promise<EncodingBlob> } the promise of CRL entry blob data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(): Promise<EncodingBlob>;
        /**
         * Get the serial number from this x509CRL entry.
         *
         * @returns { bigint } serial number of CRL entry.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the serial number from this x509CRL entry.
         *
         * @returns { bigint } serial number of CRL entry.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSerialNumber(): bigint;
        /**
         * Get the issuer of the x509 certificate described by this entry.
         *
         * @returns { DataBlob } DataBlob of issuer.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the issuer of the x509 certificate described by this entry.
         *
         * @returns { DataBlob } DataBlob of issuer.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getCertIssuer(): DataBlob;
        /**
         * Get the revocation date from x509CRL entry.
         *
         * @returns { string } string of revocation date.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the revocation date from x509CRL entry.
         *
         * @returns { string } string of revocation date.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getRevocationDate(): string;
        /**
         * Get Extensions of CRL Entry.
         *
         * @returns { DataBlob } DataBlob of extensions
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get Extensions of CRL Entry.
         *
         * @returns { DataBlob } DataBlob of extensions
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getExtensions(): DataBlob;
        /**
         * Check if CRL Entry has extension .
         *
         * @returns { boolean } true - CRL Entry has extension,  false - else.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Check if CRL Entry has extension .
         *
         * @returns { boolean } true - CRL Entry has extension,  false - else.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        hasExtensions(): boolean;
        /**
         *  Get X500 distinguished name of the issuer.
         *
         * @returns { X500DistinguishedName } X500 distinguished name object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getCertIssuerX500DistinguishedName(): X500DistinguishedName;
        /**
         *  Get the string type data of the object.
         *
         * @returns { string } the string type data of the object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        toString(): string;
        /**
         *  Get the hash value of DER format data.
         *
         * @returns { Uint8Array } the hash value of DER format data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        hashCode(): Uint8Array;
        /**
         *  Get the extension der encoding data for the corresponding entity.
         *
         * @returns { CertExtension } the certExtension object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getExtensionsObject(): CertExtension;
    }
    /**
     * Interface of X509Crl.
     *
     * @typedef X509Crl
     * @syscap SystemCapability.Security.Cert
     * @since 9
     * @deprecated since 11
     * @useinstead ohos.security.cert.X509CRL
     */
    interface X509Crl {
        /**
         * Check if the given certificate is on this CRL.
         *
         * @param { X509Cert } cert - input cert data.
         * @returns { boolean } result of Check cert is revoked or not.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#isRevoked
         */
        isRevoked(cert: X509Cert): boolean;
        /**
         * Returns the type of this CRL.
         *
         * @returns { string } string of crl type.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getType
         */
        getType(): string;
        /**
         * Get the der coding format.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getEncoded
         */
        getEncoded(callback: AsyncCallback<EncodingBlob>): void;
        /**
         * Get the der coding format.
         *
         * @returns { Promise<EncodingBlob> } the promise of crl blob data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getEncoded
         */
        getEncoded(): Promise<EncodingBlob>;
        /**
         * Use the public key to verify the signature of CRL.
         *
         * @param { cryptoFramework.PubKey } key - input public Key.
         * @param { AsyncCallback<void> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#verify
         */
        verify(key: cryptoFramework.PubKey, callback: AsyncCallback<void>): void;
        /**
         * Use the public key to verify the signature of CRL.
         *
         * @param { cryptoFramework.PubKey } key - input public Key.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#verify
         */
        verify(key: cryptoFramework.PubKey): Promise<void>;
        /**
         * Get version number from CRL.
         *
         * @returns { number } version of crl.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getVersion
         */
        getVersion(): number;
        /**
         * Get the issuer name from CRL. Issuer means the entity that signs and publishes the CRL.
         *
         * @returns { DataBlob } issuer name of crl.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getIssuerName
         */
        getIssuerName(): DataBlob;
        /**
         * Get lastUpdate value from CRL.
         *
         * @returns { string } last update of crl.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getLastUpdate
         */
        getLastUpdate(): string;
        /**
         * Get nextUpdate value from CRL.
         *
         * @returns { string } next update of crl.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getNextUpdate
         */
        getNextUpdate(): string;
        /**
         * This method can be used to find CRL entries in specified CRLs.
         *
         * @param { number } serialNumber - serial number of crl.
         * @returns { X509CrlEntry } next update of crl.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getRevokedCert
         */
        getRevokedCert(serialNumber: number): X509CrlEntry;
        /**
         * This method can be used to find CRL entries in specified cert.
         *
         * @param { X509Cert } cert - cert of x509.
         * @returns { X509CrlEntry } X509CrlEntry instance.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getRevokedCertWithCert
         */
        getRevokedCertWithCert(cert: X509Cert): X509CrlEntry;
        /**
         * Get all entries in this CRL.
         *
         * @param { AsyncCallback<Array<X509CrlEntry>> } callback - the callback of getRevokedCerts.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getRevokedCerts
         */
        getRevokedCerts(callback: AsyncCallback<Array<X509CrlEntry>>): void;
        /**
         * Get all entries in this CRL.
         *
         * @returns { Promise<Array<X509CrlEntry>> } the promise of X509CrlEntry instance.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getRevokedCerts
         */
        getRevokedCerts(): Promise<Array<X509CrlEntry>>;
        /**
         * Get the CRL information encoded by Der from this CRL.
         *
         * @returns { DataBlob } DataBlob of tbs info.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getTBSInfo
         */
        getTbsInfo(): DataBlob;
        /**
         * Get signature value from CRL.
         *
         * @returns { DataBlob } DataBlob of signature.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getSignature
         */
        getSignature(): DataBlob;
        /**
         * Get the signature algorithm name of the CRL signature algorithm.
         *
         * @returns { string } string of signature algorithm name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getSignatureAlgName
         */
        getSignatureAlgName(): string;
        /**
         * Get the signature algorithm oid string from CRL.
         *
         * @returns { string } string of signature algorithm oid.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getSignatureAlgOid
         */
        getSignatureAlgOid(): string;
        /**
         * Get the der encoded signature algorithm parameters from the CRL signature algorithm.
         *
         * @returns { DataBlob } DataBlob of signature algorithm params.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         * @deprecated since 11
         * @useinstead ohos.security.cert.X509CRL#getSignatureAlgParams
         */
        getSignatureAlgParams(): DataBlob;
    }
    /**
     * Provides to create X509 CRL object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicates the input CRL data.
     * @param { AsyncCallback<X509Crl> } callback - the callback of createX509Crl to return x509 CRL instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @since 9
     * @deprecated since 11
     * @useinstead ohos.security.cert#createX509CRL
     */
    function createX509Crl(inStream: EncodingBlob, callback: AsyncCallback<X509Crl>): void;
    /**
     * Provides to create X509 CRL object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicates the input CRL data.
     * @returns { Promise<X509Crl> } the promise of x509 CRL instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @since 9
     * @deprecated since 11
     * @useinstead ohos.security.cert#createX509CRL
     */
    function createX509Crl(inStream: EncodingBlob): Promise<X509Crl>;
    /**
     * Interface of X509CRL.
     *
     * @typedef X509CRL
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Interface of X509CRL.
     *
     * @typedef X509CRL
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X509CRL {
        /**
         * Check if the given certificate is on this CRL.
         *
         * @param { X509Cert } cert - input cert data.
         * @returns { boolean } result of Check cert is revoked or not.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Check if the given certificate is on this CRL.
         *
         * @param { X509Cert } cert - input cert data.
         * @returns { boolean } result of Check cert is revoked or not.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        isRevoked(cert: X509Cert): boolean;
        /**
         * Returns the type of this CRL.
         *
         * @returns { string } string of CRL type.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Returns the type of this CRL.
         *
         * @returns { string } string of CRL type.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getType(): string;
        /**
         * Get the der coding format.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the der coding format.
         *
         * @param { AsyncCallback<EncodingBlob> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(callback: AsyncCallback<EncodingBlob>): void;
        /**
         * Get the der coding format.
         *
         * @returns { Promise<EncodingBlob> } the promise of CRL blob data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the der coding format.
         *
         * @returns { Promise<EncodingBlob> } the promise of CRL blob data.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(): Promise<EncodingBlob>;
        /**
         * Use the public key to verify the signature of CRL.
         *
         * @param { cryptoFramework.PubKey } key - input public Key.
         * @param { AsyncCallback<void> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Use the public key to verify the signature of CRL.
         *
         * @param { cryptoFramework.PubKey } key - input public Key.
         * @param { AsyncCallback<void> } callback - the callback of getEncoded.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        verify(key: cryptoFramework.PubKey, callback: AsyncCallback<void>): void;
        /**
         * Use the public key to verify the signature of CRL.
         *
         * @param { cryptoFramework.PubKey } key - input public Key.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Use the public key to verify the signature of CRL.
         *
         * @param { cryptoFramework.PubKey } key - input public Key.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        verify(key: cryptoFramework.PubKey): Promise<void>;
        /**
         * Get version number from CRL.
         *
         * @returns { number } version of CRL.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get version number from CRL.
         *
         * @returns { number } version of CRL.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getVersion(): number;
        /**
         * Get the issuer name from CRL. Issuer means the entity that signs and publishes the CRL.
         *
         * @returns { DataBlob } issuer name of CRL.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the issuer name from CRL. Issuer means the entity that signs and publishes the CRL.
         *
         * @returns { DataBlob } issuer name of CRL.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getIssuerName(): DataBlob;
        /**
         * Get lastUpdate value from CRL.
         *
         * @returns { string } last update of CRL.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get lastUpdate value from CRL.
         *
         * @returns { string } last update of CRL.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getLastUpdate(): string;
        /**
         * Get nextUpdate value from CRL.
         *
         * @returns { string } next update of CRL.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get nextUpdate value from CRL.
         *
         * @returns { string } next update of CRL.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getNextUpdate(): string;
        /**
         * This method can be used to find CRL entries in specified CRLs.
         *
         * @param { bigint } serialNumber - serial number of CRL.
         * @returns { X509CRLEntry } next update of CRL.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * This method can be used to find CRL entries in specified CRLs.
         *
         * @param { bigint } serialNumber - serial number of CRL.
         * @returns { X509CRLEntry } next update of CRL.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getRevokedCert(serialNumber: bigint): X509CRLEntry;
        /**
         * This method can be used to find CRL entries in specified cert.
         *
         * @param { X509Cert } cert - cert of x509.
         * @returns { X509CRLEntry } X509CRLEntry instance.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * This method can be used to find CRL entries in specified cert.
         *
         * @param { X509Cert } cert - cert of x509.
         * @returns { X509CRLEntry } X509CRLEntry instance.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getRevokedCertWithCert(cert: X509Cert): X509CRLEntry;
        /**
         * Get all entries in this CRL.
         *
         * @param { AsyncCallback<Array<X509CRLEntry>> } callback - the callback of getRevokedCerts.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get all entries in this CRL.
         *
         * @param { AsyncCallback<Array<X509CRLEntry>> } callback - the callback of getRevokedCerts.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getRevokedCerts(callback: AsyncCallback<Array<X509CRLEntry>>): void;
        /**
         * Get all entries in this CRL.
         *
         * @returns { Promise<Array<X509CRLEntry>> } the promise of X509CRLEntry instance.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get all entries in this CRL.
         *
         * @returns { Promise<Array<X509CRLEntry>> } the promise of X509CRLEntry instance.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types;
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getRevokedCerts(): Promise<Array<X509CRLEntry>>;
        /**
         * Get the CRL information encoded by Der from this CRL.
         *
         * @returns { DataBlob } DataBlob of tbs info.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the CRL information encoded by Der from this CRL.
         *
         * @returns { DataBlob } DataBlob of tbs info.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getTBSInfo(): DataBlob;
        /**
         * Get signature value from CRL.
         *
         * @returns { DataBlob } DataBlob of signature.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get signature value from CRL.
         *
         * @returns { DataBlob } DataBlob of signature.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignature(): DataBlob;
        /**
         * Get the signature algorithm name of the CRL signature algorithm.
         *
         * @returns { string } string of signature algorithm name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the signature algorithm name of the CRL signature algorithm.
         *
         * @returns { string } string of signature algorithm name.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignatureAlgName(): string;
        /**
         * Get the signature algorithm oid string from CRL.
         *
         * @returns { string } string of signature algorithm oid.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the signature algorithm oid string from CRL.
         *
         * @returns { string } string of signature algorithm oid.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignatureAlgOid(): string;
        /**
         * Get the der encoded signature algorithm parameters from the CRL signature algorithm.
         *
         * @returns { DataBlob } DataBlob of signature algorithm params.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the der encoded signature algorithm parameters from the CRL signature algorithm.
         *
         * @returns { DataBlob } DataBlob of signature algorithm params.
         * @throws { BusinessError } 801 - this operation is not supported.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getSignatureAlgParams(): DataBlob;
        /**
         * Get Extensions of CRL Entry.
         *
         * @returns { DataBlob } DataBlob of extensions
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get Extensions of CRL Entry.
         *
         * @returns { DataBlob } DataBlob of extensions
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getExtensions(): DataBlob;
        /**
         * Check if the X509 CRL match the parameters.
         *
         * @param { X509CRLMatchParameters } param - indicate the X509CRLMatchParameters object.
         * @returns { boolean } true - match X509CRL, false - not match.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Check if the X509 CRL match the parameters.
         *
         * @param { X509CRLMatchParameters } param - indicate the X509CRLMatchParameters object.
         * @returns { boolean } true - match X509CRL, false - not match.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        match(param: X509CRLMatchParameters): boolean;
        /**
         * Get X500 distinguished name of the issuer.
         *
         * @returns { X500DistinguishedName } X500 distinguished name object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getIssuerX500DistinguishedName(): X500DistinguishedName;
        /**
         * Get the string type data of the object.
         *
         * @returns { string } the string type data of the object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        toString(): string;
        /**
         * Get the hash value of DER format data.
         *
         * @returns { Uint8Array } the hash value of DER format data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        hashCode(): Uint8Array;
        /**
         * Get the extension der encoding data for the corresponding entity.
         *
         * @returns { CertExtension } the certExtension object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getExtensionsObject(): CertExtension;
    }
    /**
     * Provides to create X509 CRL object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicates the input CRL data.
     * @param { AsyncCallback<X509CRL> } callback - the callback of createX509CRL to return x509 CRL instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create X509 CRL object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicates the input CRL data.
     * @param { AsyncCallback<X509CRL> } callback - the callback of createX509CRL to return x509 CRL instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX509CRL(inStream: EncodingBlob, callback: AsyncCallback<X509CRL>): void;
    /**
     * Provides to create X509 CRL object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicates the input CRL data.
     * @returns { Promise<X509CRL> } the promise of x509 CRL instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create X509 CRL object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicates the input CRL data.
     * @returns { Promise<X509CRL> } the promise of x509 CRL instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX509CRL(inStream: EncodingBlob): Promise<X509CRL>;
    /**
     * Certification chain validator.
     *
     * @typedef CertChainValidator
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Certification chain validator.
     *
     * @typedef CertChainValidator
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Certification chain validator.
     *
     * @typedef CertChainValidator
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertChainValidator {
        /**
         * Validate the cert chain.
         *
         * @param { CertChainData } certChain - indicate the cert chain validator data.
         * @param { AsyncCallback<void> } callback - the callback of validate.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Validate the cert chain.
         *
         * @param { CertChainData } certChain - indicate the cert chain validator data.
         * @param { AsyncCallback<void> } callback - the callback of validate.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Validate the cert chain.
         *
         * @param { CertChainData } certChain - indicate the cert chain validator data.
         * @param { AsyncCallback<void> } callback - the callback of validate.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        validate(certChain: CertChainData, callback: AsyncCallback<void>): void;
        /**
         * Validate the cert chain.
         *
         * @param { CertChainData } certChain - indicate the cert chain validator data.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * Validate the cert chain.
         *
         * @param { CertChainData } certChain - indicate the cert chain validator data.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Validate the cert chain.
         *
         * @param { CertChainData } certChain - indicate the cert chain validator data.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        validate(certChain: CertChainData): Promise<void>;
        /**
         * The cert chain related algorithm.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @since 9
         */
        /**
         * The cert chain related algorithm.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The cert chain related algorithm.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly algorithm: string;
    }
    /**
     * Provides to create certificate chain object. The returned object provides the verification capability.
     *
     * @param { string } algorithm - indicates the cert chain validator type.
     * @returns { CertChainValidator } the cert chain validator instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19020002 - runtime error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @since 9
     */
    /**
     * Provides to create certificate chain object. The returned object provides the verification capability.
     *
     * @param { string } algorithm - indicates the cert chain validator type.
     * @returns { CertChainValidator } the cert chain validator instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19020002 - runtime error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create certificate chain object. The returned object provides the verification capability.
     *
     * @param { string } algorithm - indicates the cert chain validator type.
     * @returns { CertChainValidator } the cert chain validator instance.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19020002 - runtime error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createCertChainValidator(algorithm: string): CertChainValidator;
    /**
     * Enum for general name use type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum GeneralNameType {
        /**
         * Indicates the name used for other.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_OTHER_NAME = 0,
        /**
         * Indicates the name used for RFC822.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_RFC822_NAME = 1,
        /**
         * Indicates the name used for DNS.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_DNS_NAME = 2,
        /**
         * Indicates the name used for X.400 address.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_X400_ADDRESS = 3,
        /**
         * Indicates the name used for X.500 directory.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_DIRECTORY_NAME = 4,
        /**
         * Indicates the name used for EDI.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_EDI_PARTY_NAME = 5,
        /**
         * Indicates the name used for URI.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_UNIFORM_RESOURCE_ID = 6,
        /**
         * Indicates the name used for IP address.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_IP_ADDRESS = 7,
        /**
         * Indicates the name used for registered ID.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        GENERAL_NAME_TYPE_REGISTERED_ID = 8
    }
    /**
     * GeneralName object
     *
     * @typedef GeneralName
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface GeneralName {
        /**
         * The general name type.
         *
         * @type { GeneralNameType }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        type: GeneralNameType;
        /**
         * The general name in DER format
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        name?: Uint8Array;
    }
    /**
     * X509 Cert match parameters
     *
     * @typedef X509CertMatchParameters
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * X509 Cert match parameters
     *
     * @typedef X509CertMatchParameters
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X509CertMatchParameters {
        /**
         * To match SubjectAlternativeNames of cert extensions:
         * [Rule]
         * null : Do not match.
         * NOT null : match after [matchAllSubjectAltNames]
         *
         * @type { ?Array<GeneralName> } SubjectAlternativeNames is in DER encoding format
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        subjectAlternativeNames?: Array<GeneralName>;
        /**
         * Indicate if match all subject alternate name:
         * [Rule]
         * true : match if [subjectAlternativeNames] is equal with all of [SubjectAlternativeNames of cert extensions]
         * false : match if [subjectAlternativeNames] is only equal with one of [SubjectAlternativeNames of cert extensions]
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        matchAllSubjectAltNames?: boolean;
        /**
         * To match AuthorityKeyIdentifier of cert extensions in DER encoding:
         * [Rule]
         * null : Do not match.
         * NOT null : match if it is equal with [AuthorityKeyIdentifier of cert extensions] in DER encoding
         *
         * @type { ?Uint8Array } the key identifier
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        authorityKeyIdentifier?: Uint8Array;
        /**
         * To match BaseConstraints.pathLenConstraint of cert extensions:
         * [Rule]
         * >=0 : The certificate must contain BaseConstraints extension, and the cA field in the extension takes.
         * -2 : The cA field in the BaseConstraints extension of the certificate must be set to false or the certificate does not contain BaseConstraints extension.
         * other : Do not match.
         *
         * @type { ?number }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        minPathLenConstraint?: number;
        /**
         * To match X509Cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if x509Cert.getEncoding is equal.
         *
         * @type { ?X509Cert }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * To match X509Cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if x509Cert.getEncoding is equal.
         *
         * @type { ?X509Cert }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        x509Cert?: X509Cert;
        /**
         * To match the validDate of cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if [notBefore of cert] <= [validDate] <= [notAfter of cert].
         *
         * @type { ?string } format is YYMMDDHHMMSSZ or YYYYMMDDHHMMSSZ.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * To match the validDate of cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if [notBefore of cert] <= [validDate] <= [notAfter of cert].
         *
         * @type { ?string } format is YYMMDDHHMMSSZ or YYYYMMDDHHMMSSZ.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        validDate?: string;
        /**
         * To match the issuer of cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if it is equal with [issuer of cert] in DER encoding.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * To match the issuer of cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if it is equal with [issuer of cert] in DER encoding.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        issuer?: Uint8Array;
        /**
         * To match the ExtendedKeyUsage of cert extensions:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if [ExtendedKeyUsage of cert extensions] is null, or
         *    [ExtendedKeyUsage of cert extensions] include [extendedKeyUsage].
         *
         * @type { ?Array<string> } array of oIDs.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        extendedKeyUsage?: Array<string>;
        /**
         * The X509Certificate must have subject and subject alternative names that meet the specified name constraints:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if [NameConstraints of cert extensions] is null, or
         *    [NameConstraints of cert extensions] include [nameConstraints].
         *
         * @type { ?Uint8Array } ASN.1 DER encoded form of nameConstraints
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        nameConstraints?: Uint8Array;
        /**
         * The X509Certificate must have subject and subject alternative names that meet the specified name constraints:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if [Certificate Policies of cert extensions] is null, or
         *    [Certificate Policies of cert extensions] include [certPolicy].
         *
         * @type { ?Array<string> } array of oIDs.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        certPolicy?: Array<string>;
        /**
         * The specified date must fall within the private key validity period for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if [Private Key Valid Period of cert extensions] is null, or
         *    [privateKeyValid] fall in [Private Key Valid Period of cert extensions].
         *
         * @type { ?string } format is YYMMDDHHMMSSZ or YYYYMMDDHHMMSSZ
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        privateKeyValid?: string;
        /**
         * To match the KeyUsage of cert extensions:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if [KeyUsage of cert extensions] is null, or
         *    [KeyUsage of cert extensions] include [keyUsage].
         *
         * @type { ?Array<boolean> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * To match the KeyUsage of cert extensions:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if [KeyUsage of cert extensions] is null, or
         *    [KeyUsage of cert extensions] include [keyUsage].
         *
         * @type { ?Array<boolean> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        keyUsage?: Array<boolean>;
        /**
         * The specified serial number must match the serialnumber for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [serialNumber of cert].
         *
         * @type { ?bigint }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The specified serial number must match the serialnumber for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [serialNumber of cert].
         *
         * @type { ?bigint }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        serialNumber?: bigint;
        /**
         * The specified value must match the subject for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [subject of cert].
         *
         * @type { ?Uint8Array } subject in DER encoding format
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The specified value must match the subject for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [subject of cert].
         *
         * @type { ?Uint8Array } subject in DER encoding format
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        subject?: Uint8Array;
        /**
         * The specified value must match the Subject Key Identifier extension for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [Subject Key Identifier of cert extensions].
         *
         * @type { ?Uint8Array } subjectKeyIdentifier in DER encoding format ??
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        subjectKeyIdentifier?: Uint8Array;
        /**
         * The specified value must match the publicKey for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [publicKey of cert].
         *
         * @type { ?DataBlob } publicKey
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The specified value must match the publicKey for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [publicKey of cert].
         *
         * @type { ?DataBlob } publicKey
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        publicKey?: DataBlob;
        /**
         * The specified value must match the publicKey for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [publicKey of cert].
         *
         * @type { ?string } the object identifier (OID) of the signature algorithm to check.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The specified value must match the publicKey for the X509Certificate:
         * [Rule]
         * null : Do not match.
         * NOT null : match ok if it is equal with [publicKey of cert].
         *
         * @type { ?string } the object identifier (OID) of the signature algorithm to check.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        publicKeyAlgID?: string;
    }
    /**
     * X509 CRL match parameters
     *
     * @typedef X509CRLMatchParameters
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * X509 CRL match parameters
     *
     * @typedef X509CRLMatchParameters
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X509CRLMatchParameters {
        /**
         * To match the issuer of cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if it is equal with [issuer of cert] in DER encoding.
         *
         * @type { ?Array<Uint8Array> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * To match the issuer of cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if it is equal with [issuer of cert] in DER encoding.
         *
         * @type { ?Array<Uint8Array> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        issuer?: Array<Uint8Array>;
        /**
         * To match X509Cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if x509Cert.getEncoding is equal.
         *
         * @type { ?X509Cert }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * To match X509Cert:
         * [Rule]
         * null : Do not match.
         * NOT null : match if x509Cert.getEncoding is equal.
         *
         * @type { ?X509Cert }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        x509Cert?: X509Cert;
        /**
         * To match updateDateTime of CRL:
         * [Rule]
         * null : Do not verify.
         * NOT null : verify if [thisUpdate in CRL] <= updateDateTime <= [nextUpdate in CRL]
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        updateDateTime?: string;
        /**
         * To match the maximum of CRL number extension:
         * [Rule]
         * null : Do not verify.
         * NOT null : verify if [CRL number extension] <= maxCRL.
         *
         * @type { ?bigint }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        maxCRL?: bigint;
        /**
         * To match the minimum of CRL number extension:
         * [Rule]
         * null : Do not verify.
         * NOT null : verify if [CRL number extension] >= minCRL.
         *
         * @type { ?bigint }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        minCRL?: bigint;
    }
    /**
     * The certificate and CRL collection object.
     *
     * @typedef CertCRLCollection
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * The certificate and CRL collection object.
     *
     * @typedef CertCRLCollection
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertCRLCollection {
        /**
         * return all Array<X509Cert> which match X509CertMatchParameters
         *
         * @param { X509CertMatchParameters } param - indicate the X509CertMatchParameters object.
         * @returns { Promise<Array<X509Cert>> }
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * return all Array<X509Cert> which match X509CertMatchParameters
         *
         * @param { X509CertMatchParameters } param - indicate the X509CertMatchParameters object.
         * @returns { Promise<Array<X509Cert>> }
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        selectCerts(param: X509CertMatchParameters): Promise<Array<X509Cert>>;
        /**
         * return the X509 Cert which match X509CertMatchParameters
         *
         * @param { X509CertMatchParameters } param - indicate the X509CertMatchParameters object.
         * @param { AsyncCallback<Array<X509Cert>> } callback - the callback of select cert.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * return the X509 Cert which match X509CertMatchParameters
         *
         * @param { X509CertMatchParameters } param - indicate the X509CertMatchParameters object.
         * @param { AsyncCallback<Array<X509Cert>> } callback - the callback of select cert.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        selectCerts(param: X509CertMatchParameters, callback: AsyncCallback<Array<X509Cert>>): void;
        /**
         * return all X509 CRL which match X509CRLMatchParameters
         *
         * @param { X509CRLMatchParameters } param - indicate the X509CRLMatchParameters object.
         * @returns { Promise<Array<X509CRL>> }
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * return all X509 CRL which match X509CRLMatchParameters
         *
         * @param { X509CRLMatchParameters } param - indicate the X509CRLMatchParameters object.
         * @returns { Promise<Array<X509CRL>> }
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        selectCRLs(param: X509CRLMatchParameters): Promise<Array<X509CRL>>;
        /**
         * return all X509 CRL which match X509CRLMatchParameters
         *
         * @param { X509CRLMatchParameters } param - indicate the X509CRLMatchParameters object.
         * @param { AsyncCallback<Array<X509CRL>> } callback - the callback of select CRL.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * return all X509 CRL which match X509CRLMatchParameters
         *
         * @param { X509CRLMatchParameters } param - indicate the X509CRLMatchParameters object.
         * @param { AsyncCallback<Array<X509CRL>> } callback - the callback of select CRL.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        selectCRLs(param: X509CRLMatchParameters, callback: AsyncCallback<Array<X509CRL>>): void;
    }
    /**
     * create object CertCRLCollection
     *
     * @param { Array<X509Cert> } certs - array of X509Cert.
     * @param { Array<X509CRL> } [options] crls - array of X509CRL.
     * @returns { CertCRLCollection }
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * create object CertCRLCollection
     *
     * @param { Array<X509Cert> } certs - array of X509Cert.
     * @param { Array<X509CRL> } [crls] - array of X509CRL.
     * @returns { CertCRLCollection }
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createCertCRLCollection(certs: Array<X509Cert>, crls?: Array<X509CRL>): CertCRLCollection;
    /**
     * X509 Certification chain object.
     *
     * @typedef X509CertChain
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * X509 Certification chain object.
     *
     * @typedef X509CertChain
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X509CertChain {
        /**
         * Get the X509 certificate list.
         *
         * @returns { Array<X509Cert> } the X509 certificate list.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Get the X509 certificate list.
         *
         * @returns { Array<X509Cert> } the X509 certificate list.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getCertList(): Array<X509Cert>;
        /**
         * Validate the cert chain with validate parameters.
         *
         * @param { CertChainValidationParameters } param - indicate the cert chain Validate parameters.
         * @returns { Promise<CertChainValidationResult> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Validate the cert chain with validate parameters.
         *
         * @param { CertChainValidationParameters } param - indicate the cert chain Validate parameters.
         * @returns { Promise<CertChainValidationResult> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        validate(param: CertChainValidationParameters): Promise<CertChainValidationResult>;
        /**
         * Validate the cert chain with validate parameters.
         *
         * @param { CertChainValidationParameters } param - indicate the cert chain validate parameters.
         * @param { AsyncCallback<CertChainValidationResult> } callback - indicate the cert chain validate result.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * Validate the cert chain with validate parameters.
         *
         * @param { CertChainValidationParameters } param - indicate the cert chain validate parameters.
         * @param { AsyncCallback<CertChainValidationResult> } callback - indicate the cert chain validate result.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @throws { BusinessError } 19030002 - the certificate signature verification failed.
         * @throws { BusinessError } 19030003 - the certificate has not taken effect.
         * @throws { BusinessError } 19030004 - the certificate has expired.
         * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
         * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
         * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        validate(param: CertChainValidationParameters, callback: AsyncCallback<CertChainValidationResult>): void;
        /**
         * Get the string type data of the object.
         *
         * @returns { string } the string type data of the object.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        toString(): string;
        /**
         * Get the hash value of DER format data.
         *
         * @returns { Uint8Array } the hash value of DER format data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        hashCode(): Uint8Array;
    }
    /**
     * Provides to create X509 certificate chain object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @returns { Promise<X509CertChain> }
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create X509 certificate chain object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @returns { Promise<X509CertChain> }
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX509CertChain(inStream: EncodingBlob): Promise<X509CertChain>;
    /**
     * Provides to create X509 certificate chain object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @param { AsyncCallback<X509CertChain> } callback
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides to create X509 certificate chain object.
     * The returned object provides the data parsing or verification capability.
     *
     * @param { EncodingBlob } inStream - indicate the input cert data.
     * @param { AsyncCallback<X509CertChain> } callback
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX509CertChain(inStream: EncodingBlob, callback: AsyncCallback<X509CertChain>): void;
    /**
     * Create certificate chain object with certificate array.
     *
     * @param { Array<X509Cert> } certs - indicate the certificate array.
     * @returns { X509CertChain } the certificate chain object.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Create certificate chain object with certificate array.
     *
     * @param { Array<X509Cert> } certs - indicate the certificate array.
     * @returns { X509CertChain } the certificate chain object.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX509CertChain(certs: Array<X509Cert>): X509CertChain;
    /**
     * Create and validate a certificate chain with the build parameters.
     *
     * @param { CertChainBuildParameters } param - indicate the certificate chain build parameters.
     * @returns { Promise<CertChainBuildResult> } the promise returned by the function.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19020002 - runtime error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @throws { BusinessError } 19030002 - the certificate signature verification failed.
     * @throws { BusinessError } 19030003 - the certificate has not taken effect.
     * @throws { BusinessError } 19030004 - the certificate has expired.
     * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
     * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
     * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function buildX509CertChain(param: CertChainBuildParameters): Promise<CertChainBuildResult>;
    /**
     * Get trust anchor array from specified P12.
     *
     * @param { Uint8Array } keystore - the file path of the P12.
     * @param { string } pwd - the password of the P12.
     * @returns { Promise<Array<X509TrustAnchor>> } the promise returned by the function.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19020002 - runtime error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @throws { BusinessError } 19030002 - the certificate signature verification failed.
     * @throws { BusinessError } 19030003 - the certificate has not taken effect.
     * @throws { BusinessError } 19030004 - the certificate has expired.
     * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
     * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
     * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createTrustAnchorsWithKeyStore(keystore: Uint8Array, pwd: string): Promise<Array<X509TrustAnchor>>;
    /**
     * Create X500DistinguishedName object with the name in string format.
     *
     * @param { string } nameStr - the string format of the Name type defined by X509.
     * @returns { Promise<X500DistinguishedName> } the promise returned by the function.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19020002 - runtime error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @throws { BusinessError } 19030002 - the certificate signature verification failed.
     * @throws { BusinessError } 19030003 - the certificate has not taken effect.
     * @throws { BusinessError } 19030004 - the certificate has expired.
     * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
     * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
     * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX500DistinguishedName(nameStr: string): Promise<X500DistinguishedName>;
    /**
     * Create X500DistinguishedName object with the name in DER format.
     *
     * @param { Uint8Array } nameDer - the DER format of the Name type defined by X509.
     * @returns { Promise<X500DistinguishedName> } the promise returned by the function.
     * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 19020001 - memory error.
     * @throws { BusinessError } 19020002 - runtime error.
     * @throws { BusinessError } 19030001 - crypto operation error.
     * @throws { BusinessError } 19030002 - the certificate signature verification failed.
     * @throws { BusinessError } 19030003 - the certificate has not taken effect.
     * @throws { BusinessError } 19030004 - the certificate has expired.
     * @throws { BusinessError } 19030005 - failed to obtain the certificate issuer.
     * @throws { BusinessError } 19030006 - the key cannot be used for signing a certificate.
     * @throws { BusinessError } 19030007 - the key cannot be used for digital signature.
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createX500DistinguishedName(nameDer: Uint8Array): Promise<X500DistinguishedName>;
    /**
     * Provides the x500 distinguished name type.
     *
     * @typedef X500DistinguishedName
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X500DistinguishedName {
        /**
         * Get distinguished name string.
         *
         * @returns { string } distinguished name string.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getName(): string;
        /**
         * Get distinguished name string by type.
         *
         * @param { string } type - the specified type name.
         * @returns { Array<string> } distinguished name string.
         * @throws { BusinessError } 401 - invalid parameters. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getName(type: string): Array<string>;
        /**
         * Get distinguished name in der coding format.
         *
         * @returns { EncodingBlob } distinguished name encoded data.
         * @throws { BusinessError } 19020001 - memory error.
         * @throws { BusinessError } 19020002 - runtime error.
         * @throws { BusinessError } 19030001 - crypto operation error.
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getEncoded(): EncodingBlob;
    }
    /**
     * Provides the x509 trust anchor type.
     *
     * @typedef X509TrustAnchor
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the x509 trust anchor type.
     *
     * @typedef X509TrustAnchor
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface X509TrustAnchor {
        /**
         * The trust CA cert.
         *
         * @type { ?X509Cert }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The trust CA cert.
         *
         * @type { ?X509Cert }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CACert?: X509Cert;
        /**
         * The trust CA public key in DER format.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The trust CA public key in DER format.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CAPubKey?: Uint8Array;
        /**
         * The trust CA subject in DER format.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The trust CA subject in DER format.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        CASubject?: Uint8Array;
        /**
         * The name constraints in DER format.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        nameConstraints?: Uint8Array;
    }
    /**
     * Enum for revocation check option.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum RevocationCheckOptions {
        /**
         * Indicates priority to use OCSP for verification.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REVOCATION_CHECK_OPTION_PREFER_OCSP = 0,
        /**
         * Indicates support for verifying revocation status by accessing the network to obtain CRL or OCSP responses.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REVOCATION_CHECK_OPTION_ACCESS_NETWORK,
        /**
         * Indicates when the 'REVOCATION_CHECK_OPTION_ACCESS_NETWORK' option is turned on, it is effective.
         * If the preferred verification method is unable to verify the certificate status due to network reasons,
         * an alternative solution will be used for verification.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REVOCATION_CHECK_OPTION_FALLBACK_NO_PREFER,
        /**
         * Indicates when the 'REVOCATION_CHECK_OPTION_ACCESS_NETWORK' option is turned on, it is effective.
         * If both the CRL and OCSP responses obtained online cannot verify the certificate status due to network reasons,
         * the locally set CRL and OCSP responses will be used for verification.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        REVOCATION_CHECK_OPTION_FALLBACK_LOCAL
    }
    /**
     * Enum for validation policy type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum ValidationPolicyType {
        /**
         * Indicates not need to verify the sslHostname field in the certificate.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        VALIDATION_POLICY_TYPE_X509 = 0,
        /**
         * Indicates need to verify the sslHostname field in the certificate.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        VALIDATION_POLICY_TYPE_SSL
    }
    /**
     * Enum for validation keyusage type.
     *
     * @enum { number }
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enum KeyUsageType {
        /**
         * Indicates the certificate public key can be used for digital signature operations.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_DIGITAL_SIGNATURE = 0,
        /**
         * Indicates certificate public key can be used for non repudiation operations, preventing the signer from denying their signature.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_NON_REPUDIATION,
        /**
         * Indicates certificate public key can be used for key encryption operations, for encrypting symmetric keys, etc.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_KEY_ENCIPHERMENT,
        /**
         * Indicates certificate public key can be used for data encryption operations, to encrypt data.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_DATA_ENCIPHERMENT,
        /**
         * Indicates certificate public key can be used for key negotiation operations, to negotiate shared keys.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_KEY_AGREEMENT,
        /**
         * Indicates certificate public key can be used for certificate signing operations.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_KEY_CERT_SIGN,
        /**
         * Indicates certificate public key can be used for signing operations on certificate revocation lists (CRLs).
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_CRL_SIGN,
        /**
         * Indicates the key can only be used for encryption operations and cannot be used for decryption operations.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_ENCIPHER_ONLY,
        /**
         * Indicates the key can only be used for decryption operations and cannot be used for encryption operations.
         *
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        KEYUSAGE_DECIPHER_ONLY
    }
    /**
     * Provides the certificate chain validate revocation parameters.
     *
     * @typedef RevocationCheckParameter
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface RevocationCheckParameter {
        /**
         * The additional field for sending OCSP requests.
         *
         * @type { ?Array<Uint8Array> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ocspRequestExtension?: Array<Uint8Array>;
        /**
         * The server URL address for sending requests to OCSP.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ocspResponderURI?: string;
        /**
         * The signing certificate for verifying OCSP response signatures.
         *
         * @type { ?X509Cert }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ocspResponderCert?: X509Cert;
        /**
         * The OCSP response message returned by an OCSP server.
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ocspResponses?: Uint8Array;
        /**
         * The URL address for downloading the CRL list.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        crlDownloadURI?: string;
        /**
         * The certificate revocation status verification option.
         *
         * @type { ?Array<RevocationCheckOptions> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        options?: Array<RevocationCheckOptions>;
        /**
         * The digest used to generate the ocsp cert id.
         *
         * @type { ?string }
         * @default SHA256
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ocspDigest?: string;
    }
    /**
     * Provides the certificate chain validate parameters type.
     *
     * @typedef CertChainValidationParameters
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the certificate chain validate parameters type.
     *
     * @typedef CertChainValidationParameters
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertChainValidationParameters {
        /**
         * The datetime to verify the certificate chain validity period.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The datetime to verify the certificate chain validity period.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        date?: string;
        /**
         * The trust ca certificates to verify the certificate chain.
         *
         * @type { Array<X509TrustAnchor> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The trust ca certificates to verify the certificate chain.
         *
         * @type { Array<X509TrustAnchor> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        trustAnchors: Array<X509TrustAnchor>;
        /**
         * The cert and CRL list to build cert chain and verify the certificate chain revocation state.
         *
         * @type { ?Array<CertCRLCollection> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The cert and CRL list to build cert chain and verify the certificate chain revocation state.
         *
         * @type { ?Array<CertCRLCollection> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        certCRLs?: Array<CertCRLCollection>;
        /**
         * The revocation parameters to verify the certificate chain revocation status.
         *
         * @type { ?RevocationCheckParameter }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        revocationCheckParam?: RevocationCheckParameter;
        /**
         * The policy to verify the certificate chain validity.
         *
         * @type { ?ValidationPolicyType }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        policy?: ValidationPolicyType;
        /**
         * The sslHostname to verify the certificate chain validity.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        sslHostname?: string;
        /**
         * The keyUsage to verify the certificate chain validity.
         *
         * @type { ?Array<KeyUsageType> }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        keyUsage?: Array<KeyUsageType>;
    }
    /**
     * Certification chain validate result.
     *
     * @typedef CertChainValidationResult
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @since 11
     */
    /**
     * Certification chain validate result.
     *
     * @typedef CertChainValidationResult
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertChainValidationResult {
        /**
         * The cert chain trust anchor.
         *
         * @type { X509TrustAnchor }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The cert chain trust anchor.
         *
         * @type { X509TrustAnchor }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly trustAnchor: X509TrustAnchor;
        /**
         * The target certificate.
         *
         * @type { X509Cert }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @since 11
         */
        /**
         * The target certificate.
         *
         * @type { X509Cert }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly entityCert: X509Cert;
    }
    /**
     * Provides the certificate chain build parameters type.
     *
     * @typedef CertChainBuildParameters
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertChainBuildParameters {
        /**
         * The certificate match parameters to selects certificate from the certificate collection.
         *
         * @type { X509CertMatchParameters }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        certMatchParameters: X509CertMatchParameters;
        /**
         * The maximum length of the certificate chain to be built.
         *
         * @type { ?number }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        maxLength?: number;
        /**
         * The CertChain validation parameters.
         *
         * @type { CertChainValidationParameters }
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        validationParameters: CertChainValidationParameters;
    }
    /**
     * Certification chain build result.
     *
     * @typedef CertChainBuildResult
     * @syscap SystemCapability.Security.Cert
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface CertChainBuildResult {
        /**
         * The certificate chain of build result.
         *
         * @type { X509CertChain }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly certChain: X509CertChain;
        /**
         * The certificate chain validation result.
         *
         * @type { CertChainValidationResult }
         * @readonly
         * @syscap SystemCapability.Security.Cert
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly validationResult: CertChainValidationResult;
    }
}
export default cert;
