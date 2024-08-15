/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
 * @kit MDMKit
 */
import type Want from './@ohos.app.ability.Want';
/**
 * This module provides the capability to manage the security of the enterprise devices.
 *
 * @namespace securityManager
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @stagemodelonly
 * @since 11
 */
declare namespace securityManager {
    /**
     * User certificate data.
     *
     * @typedef CertBlob
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export interface CertBlob {
        /**
         * The certificate content
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        inData: Uint8Array;
        /**
         * The certificate alias
         *
         * @type { string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        alias: string;
    }
    /**
     * Gets device security policy of the specific type.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SECURITY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { string } item - item indicates the specified security policy that needs to be obtained, including patch and encryption.
     *                          patch means the device security patch tag, and encryption means the device encryption status.
     * @returns { string } security policy of the specific type.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getSecurityStatus(admin: Want, item: string): string;
    /**
     * Install user certificate.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { CertBlob } certificate - certificate file content and alias. It cannot be empty or more than 40 characters.
     * @returns { Promise<string> } the promise carries the uri of the certificate used to uninstall
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9201001 - Failed to manage the certificate.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function installUserCertificate(admin: Want, certificate: CertBlob): Promise<string>;
    /**
     * Uninstall user certificate.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_CERTIFICATE
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { string } certUri - uri of the certificate. It cannot be empty or more than 64 characters.
     * @returns { Promise<void> } the promise returned by the uninstallUserCertificate.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9201001 - Failed to manage the certificate.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function uninstallUserCertificate(admin: Want, certUri: string): Promise<void>;
    /**
     * Sets the password policy of the device.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SECURITY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { PasswordPolicy } policy - password policy to be set.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function setPasswordPolicy(admin: Want, policy: PasswordPolicy): void;
    /**
     * Gets the password policy of the device.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SECURITY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @returns { PasswordPolicy } the password policy of the device.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getPasswordPolicy(admin: Want): PasswordPolicy;
    /**
     * Sets the application's clipboard policy of the device.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SECURITY
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { number } tokenId - tokenId indicates the token id of the application.
     * @param { ClipboardPolicy } policy - clipboard policy to be set.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function setAppClipboardPolicy(admin: Want, tokenId: number, policy: ClipboardPolicy): void;
    /**
     * Gets the application's clipboard policy of the device.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_SECURITY
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { number } [tokenId] - tokenId indicates the token id of the application.
     * @returns { string } the json string of clipboard policy for each application of the device.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function getAppClipboardPolicy(admin: Want, tokenId?: number): string;
    /**
     * Password policy.
     *
     * @typedef PasswordPolicy
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export interface PasswordPolicy {
        /**
         * The regex of complexity
         *
         * @type { ?string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        complexityRegex?: string;
        /**
         * Period of validity
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        validityPeriod?: number;
        /**
         * Other supplementary description
         *
         * @type { ?string }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        additionalDescription?: string;
    }
    /**
     * Clipboard policy.
     *
     * @enum { number } ClipboardPolicy
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    export enum ClipboardPolicy {
        /**
         * Policy default
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        DEFAULT = 0,
        /**
         * Policy indicates that the clipboard can be used on the same application
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        IN_APP = 1,
        /**
         * Policy indicates that the clipboard can be used on the same device
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        LOCAL_DEVICE = 2,
        /**
         * Policy indicates that the clipboard can be used across device
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @stagemodelonly
         * @since 12
         */
        CROSS_DEVICE = 3
    }
}
export default securityManager;
