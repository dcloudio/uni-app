/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module provides the capabilities to safety detection.
 * @kit DeviceSecurityKit
 */
/**
 * Provides safety detection.
 *
 * @namespace safetyDetect
 * @syscap SystemCapability.Security.SafetyDetect
 * @since 5.0.0(12)
 */
declare namespace safetyDetect {
    /**
     * UrlCheckRequest contains the URL check request parameters.
     *
     * @typedef UrlCheckRequest
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    interface UrlCheckRequest {
        /**
         * Indicates the URL list to check.
         * The maximum length of array is 10, and the maximum length of the URL is 4096.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        urls: Array<string>;
    }
    /**
     * UrlCheckResponse contains the URL check result.
     *
     * @typedef UrlCheckResponse
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    interface UrlCheckResponse {
        /**
         * Indicates the result of URL check.
         *
         * @type { Array<UrlCheckResult> }
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        results: Array<UrlCheckResult>;
    }
    /**
     * UrlCheckResult contains the URL threat.
     *
     * @typedef UrlCheckResult
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    interface UrlCheckResult {
        /**
         * Indicates the checked URL.
         *
         * @type { string }
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        url: string;
        /**
         * Indicates the thread type of URL.
         *
         * @type { UrlThreatType }
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        threat: UrlThreatType;
    }
    /**
     * Enum for URL threat type
     *
     * @enum { number }
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    enum UrlThreatType {
        /**
         * Indicates the URL has no threat.
         *
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        NORMAL = 0,
        /**
         * Indicates the URL is malicious, such as Rogue software or Trojan horse websites.
         *
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        MALWARE = 1,
        /**
         * Indicates the URL is Phishing.
         *
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        PHISHING = 2,
        /**
         * Indicates the URL is suspected of other violations.
         *
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        OTHERS = 3
    }
    /**
     * Provides URL threat check.
     *
     * @param { UrlCheckRequest } req - indicates the request for system integrity check.
     * @returns { Promise<UrlCheckResponse> } The result of URL threat check.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameters.
     * Possible causes:
     *   1. Mandatory parameters are left unspecified.
     *   2. Incorrect parameter types.
     *   3. Parameter verification failed.
     * @throws { BusinessError } 1010800001 - Internal error.
     * @throws { BusinessError } 1010800002 - The network is unreachable.
     * @throws { BusinessError } 1010800003 - Access cloud server fail.
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    function checkUrlThreat(req: UrlCheckRequest): Promise<UrlCheckResponse>;
    /**
     * SysIntegrityRequest contains the system integrity check request parameters.
     *
     * @typedef SysIntegrityRequest
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    interface SysIntegrityRequest {
        /**
         * Indicates the nonce for anti-replay. The length ranges from 16 to 66 bytes.
         *
         * @type { string }
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        nonce: string;
    }
    /**
     * SysIntegrityResponse contains the system integrity check result.
     *
     * @typedef SysIntegrityResponse
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    interface SysIntegrityResponse {
        /**
         * Indicates the result of system integrity check. The format is JSON WEB Signature.
         * The check results are used in the following ways:
         * a. Parse the JWS to obtain the header, payload, and signature.
         * b. Obtain the signature algorithm and certificate chain from the header.
         * c. Obtain the signature from signature and verify the signature.
         * d. Obtain the integrity verification result from the payload.
         *
         * @type { string }
         * @syscap SystemCapability.Security.SafetyDetect
         * @since 5.0.0(12)
         */
        result: string;
    }
    /**
     * Provides system integrity check.
     *
     * @param { SysIntegrityRequest } req - Indicates a system integrity check request.
     * @returns { Promise<SysIntegrityResponse> } The result of system integrity check.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameters.
     * Possible causes:
     *   1. Mandatory parameters are left unspecified.
     *   2. Incorrect parameter types.
     *   3. Parameter verification failed.
     * @throws { BusinessError } 1010800001 - Internal error.
     * @throws { BusinessError } 1010800002 - The network is unreachable.
     * @throws { BusinessError } 1010800003 - Access cloud server fail.
     * @syscap SystemCapability.Security.SafetyDetect
     * @since 5.0.0(12)
     */
    function checkSysIntegrity(req: SysIntegrityRequest): Promise<SysIntegrityResponse>;
}
export default safetyDetect;
