/*
 * Copyright (c) 2020-2023 Huawei Device Co., Ltd.
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
 * @kit CryptoArchitectureKit
 */
/**
 * Defines the cipher response.
 *
 * @typedef CipherResponse
 * @syscap SystemCapability.Security.Cipher
 * @since 3
 * @deprecated since 11
 */
export interface CipherResponse {
    /**
     * response text
     *
     * @type { string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    text: string;
}
/**
 * Defines the rsa cipher options.
 *
 * @typedef CipherRsaOptions
 * @syscap SystemCapability.Security.Cipher
 * @since 3
 * @deprecated since 11
 */
export interface CipherRsaOptions {
    /**
     * Action type.
     * The options are as follows:
     *   encrypt: Encrypts data.
     *   decrypt: Decrypts data.
     *
     * @type { string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    action: string;
    /**
     * Text content to be encrypted or decrypted.
     * The text to be encrypted must be a common text and cannot exceed the length calculated based on the formula (keySize/8 - 66).
     * keySize indicates the key length.
     * For example, if the key length is 1024 bytes, the text cannot exceed 62 bytes (1024/8 - 66 = 62).
     * The text content to be decrypted must be a binary value encoded using Base64.
     * The default format is used for Base64 encoding.
     *
     * @type { string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    text: string;
    /**
     * Keys encrypted using RSA.
     * During encryption, this parameter is a public key.
     * During decryption, it is a private key.
     *
     * @type { string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    key: string;
    /**
     * RSA algorithm padding.
     * The default value is RSA/None/OAEPWithSHA256AndMGF1Padding.
     *
     * @type { ?string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    transformation?: string;
    /**
     * Called when data is encrypted or decrypted successfully.
     *
     * @type { function }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    success: (data: CipherResponse) => void;
    /**
     * Called when data fails to be encrypted or decrypted.
     *
     * @type { function }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    fail: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { function }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    complete: () => void;
}
/**
 * Defines the aes cipher options.
 *
 * @typedef CipherAesOptions
 * @syscap SystemCapability.Security.Cipher
 * @since 3
 * @deprecated since 11
 */
export interface CipherAesOptions {
    /**
     * Action type.
     * The options are as follows:
     *   encrypt: Encrypts data.
     *   decrypt: Decrypts data.
     *
     * @type { string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    action: string;
    /**
     * Text content to be encrypted or decrypted.
     * The text to be encrypted must be a common text.
     * The text content to be decrypted must be a binary value encoded using Base64.
     * The default format is used for Base64 encoding.
     *
     * @type { string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    text: string;
    /**
     * Key used for encryption or decryption, which is a character string encrypted using Base64.
     *
     * @type { string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    key: string;
    /**
     * Encryption mode and padding of the AES algorithm.
     * The default value is AES/CBC/PKCS5Padding.
     *
     * @type { ?string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    transformation?: string;
    /**
     * Initial vector for AES-based encryption and decryption.
     * The value is a character string encoded using Base64.
     * The default value is the key value.
     *
     * @type { ?string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    iv?: string;
    /**
     * Offset of the initial vector for AES-based encryption and decryption.
     * The default value is 0.
     *
     * @type { ?string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    ivOffset?: string;
    /**
     * Length of the initial vector for AES-based encryption and decryption.
     * The default value is 16.
     *
     * @type { ?string }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    ivLen?: string;
    /**
     * Called when data is encrypted or decrypted successfully.
     *
     * @type { function }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    success: (data: CipherResponse) => void;
    /**
     * Called when data fails to be encrypted or decrypted.
     *
     * @type { function }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    fail: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { function }
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 11
     */
    complete: () => void;
}
/**
 * Defines the cipher functions.
 *
 * @syscap SystemCapability.Security.Cipher
 * @since 3
 * @deprecated since 9
 * @useinstead ohos.security.cryptoFramework.Cipher
 */
export default class Cipher {
    /**
     * Encrypts or decrypts data using RSA.
     *
     * @param { CipherRsaOptions } options - RSA options
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 9
     * @useinstead ohos.security.cryptoFramework.Cipher
     */
    static rsa(options: CipherRsaOptions): void;
    /**
     * Encrypts or decrypts data using AES.
     *
     * @param { CipherAesOptions } options - AES options
     * @syscap SystemCapability.Security.Cipher
     * @since 3
     * @deprecated since 9
     * @useinstead ohos.security.cryptoFramework.Cipher
     */
    static aes(options: CipherAesOptions): void;
}
