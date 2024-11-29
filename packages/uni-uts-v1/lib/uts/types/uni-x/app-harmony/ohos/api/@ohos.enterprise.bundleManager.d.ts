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
 * This module provides the capability to manage the bundles of the enterprise devices.
 *
 * @namespace bundleManager
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @since 10
 */
declare namespace bundleManager {
    /**
     * Provides parameters required for installing an application.
     *
     * @typedef InstallParam
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    interface InstallParam {
        /**
         * Indicates the user id
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @StageModelOnly
         * @since 12
         */
        userId?: number;
        /**
         * Indicates the install flag, which 0 for first install, 1 for cover install
         *
         * @type { ?number }
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @StageModelOnly
         * @since 12
         */
        installFlag?: number;
    }
    /**
     * Add appid list of bundles that can be installed in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<string> } appIds - ids of the bundle that can be installed. The size of the array after
     *                                   setting cannot be greater than 200.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function addAllowedInstallBundlesSync(admin: Want, appIds: Array<string>, accountId?: number): void;
    /**
     * Remove appid list of bundles that can be installed in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<string> } appIds - ids of the bundle that can be installed. The size of the array after
     *                                   setting cannot be greater than 200.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function removeAllowedInstallBundlesSync(admin: Want, appIds: Array<string>, accountId?: number): void;
    /**
     * Get appid list of bundles that can be installed in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @returns { Array<string> } ids of the bundle that can be installed.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function getAllowedInstallBundlesSync(admin: Want, accountId?: number): Array<string>;
    /**
     * Add appid list of bundles that can not be installed in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<string> } appIds - ids of the bundle that can not be installed. The size of the array after
     *                                   setting cannot be greater than 200.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function addDisallowedInstallBundlesSync(admin: Want, appIds: Array<string>, accountId?: number): void;
    /**
     * Remove appid list of bundles that can not be installed in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<string> } appIds - ids of the bundle that can not be installed. The size of the array after
     *                                   setting cannot be greater than 200.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function removeDisallowedInstallBundlesSync(admin: Want, appIds: Array<string>, accountId?: number): void;
    /**
     * Get appid list of bundles that can not be installed in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @returns { Array<string> } ids of the bundle that can not be installed.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function getDisallowedInstallBundlesSync(admin: Want, accountId?: number): Array<string>;
    /**
     * Add appid list of bundles that can not be uninstalled in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<string> } appIds - ids of the bundle that can not be uninstalled. The size of the array after
     *                                   setting cannot be greater than 200.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function addDisallowedUninstallBundlesSync(admin: Want, appIds: Array<string>, accountId?: number): void;
    /**
     * Remove appid list of bundles that can not be uninstalled in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<string> } appIds - ids of the bundle that can not be uninstalled. The size of the array after
     *                                   setting cannot be greater than 200.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function removeDisallowedUninstallBundlesSync(admin: Want, appIds: Array<string>, accountId?: number): void;
    /**
     * Get appid list of bundles that can not be uninstalled in the device.
     * Only apps with the ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY permission can call this method.
     *
     * @permission ohos.permission.ENTERPRISE_SET_BUNDLE_INSTALL_POLICY
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { number } [accountId] - accountId indicates the account ID or do not pass account ID.
     * @returns { Array<string> } ids of the bundle that can not be uninstalled.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function getDisallowedUninstallBundlesSync(admin: Want, accountId?: number): Array<string>;
    /**
     * Uninstall an application.
     *
     * @permission ohos.permission.ENTERPRISE_INSTALL_BUNDLE
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { string } bundleName - indicates the bundle name of the application to be uninstalled.
     * @param { number } [userId] - userId indicates the user ID or do not pass user ID.
     * @param { boolean } [isKeepData] - isKeepData indicates whether keep the data.
     * @returns { Promise<void> } the promise of uninstalling application result.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function uninstall(admin: Want, bundleName: string, userId?: number, isKeepData?: boolean): Promise<void>;
    /**
     * Install an application.
     *
     * @permission ohos.permission.ENTERPRISE_INSTALL_BUNDLE
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { Array<string> } hapFilePaths - indicates the path of the application to be installed.
     * @param { InstallParam } [installParam] - installParam indicates the installation parameters.
     *                                        It may contain two fields: userId and installFlag.
     *                                        The flag can only be one of correct flags.
     * @returns { Promise<void> } the promise of installing application result.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9201002 - Failed to install the application.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @StageModelOnly
     * @since 12
     */
    function install(admin: Want, hapFilePaths: Array<string>, installParam?: InstallParam): Promise<void>;
}
export default bundleManager;
