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
import type osAccount from './@ohos.account.osAccount';
/**
 * This module provides the capability to manage the accounts of the enterprise devices.
 *
 * @namespace accountManager
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @since 10
 */
declare namespace accountManager {
    /**
     * Disallows the account or all accounts to add an OS account.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { boolean } disallow - true if the specific account or all accounts are not allowed to add an OS account.
     * @param { number } [accountId] - indicates the account ID. It cannot be the ID of an account that does not exist.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function disallowOsAccountAddition(admin: Want, disallow: boolean, accountId?: number): void;
    /**
     * Queries whether the account or all accounts is disallowed to add an OS account.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         If the admin is not empty, it must have the corresponding permission.
     * @param { number } [accountId] - indicates the account ID. It cannot be the ID of an account that does not exist.
     * @returns { boolean } true if the specific account or all accounts are not allowed to add an OS account.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function isOsAccountAdditionDisallowed(admin: Want, accountId?: number): boolean;
    /**
     * Adds an OS account using the name and account type.
     * This function can be called by a super administrator.
     *
     * @permission ohos.permission.ENTERPRISE_SET_ACCOUNT_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { string } name - the OS account name. It cannot be empty.
     * @param { osAccount.OsAccountType } type - the OS account type. It can only be one of correct types.
     * @returns { Promise<osAccount.OsAccountInfo> } information about the OS account added.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9201003 - Failed to add an OS account.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function addOsAccountAsync(admin: Want, name: string, type: osAccount.OsAccountType): Promise<osAccount.OsAccountInfo>;
}
export default accountManager;
