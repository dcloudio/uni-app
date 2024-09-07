/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type Want from './@ohos.app.ability.Want';
import type rpc from './@ohos.rpc';
/**
 * This module provides the capability to manage application accounts.
 *
 * @namespace appAccount
 * @syscap SystemCapability.Account.AppAccount
 * @since 7
 */
declare namespace appAccount {
    /**
     * Obtains the AppAccountManager instance.
     *
     * @returns { AppAccountManager } Returns the instance of the AppAccountManager.
     * @syscap SystemCapability.Account.AppAccount
     * @since 7
     */
    function createAppAccountManager(): AppAccountManager;
    /**
     * Provides methods for managing application accounts.
     *
     * @interface AppAccountManager
     * @syscap SystemCapability.Account.AppAccount
     * @since 7
     */
    interface AppAccountManager {
        /**
         * Adds the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to add.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#createAccount
         */
        addAccount(name: string, callback: AsyncCallback<void>): void;
        /**
         * Adds the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to add.
         * @param { string } extraInfo - Indicates the extra information of the application account to add.
         *        The extra information cannot be sensitive information of the application account.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#createAccount
         */
        addAccount(name: string, extraInfo: string, callback: AsyncCallback<void>): void;
        /**
         * Adds the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to add.
         * @param { string } [extraInfo] - Indicates the extra information of the application account to add.
         *        The extra information cannot be sensitive information of the application account.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#createAccount
         */
        addAccount(name: string, extraInfo?: string): Promise<void>;
        /**
         * Creates the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to add.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name.
         * @throws { BusinessError } 12300004 - Account already exists.
         * @throws { BusinessError } 12300007 - The number of accounts reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        createAccount(name: string, callback: AsyncCallback<void>): void;
        /**
         * Creates the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to add.
         * @param { CreateAccountOptions } options - Indicates the extra information of the application account to add.
         *        The extra information cannot be sensitive information of the application account.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or options.
         * @throws { BusinessError } 12300004 - Account already exists.
         * @throws { BusinessError } 12300007 - The number of accounts reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        createAccount(name: string, options: CreateAccountOptions, callback: AsyncCallback<void>): void;
        /**
         * Creates the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to add.
         * @param { CreateAccountOptions } [options] - Indicates the extra information of the application account to add.
         *        The extra information cannot be sensitive information of the application account.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or options.
         * @throws { BusinessError } 12300004 - Account already exists.
         * @throws { BusinessError } 12300007 - The number of accounts reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        createAccount(name: string, options?: CreateAccountOptions): Promise<void>;
        /**
         * Adds an application account of a specified owner implicitly.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { object } options - Indicates the authenticator-specific options for the request.
         * @param { AuthenticatorCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#createAccountImplicitly
         */
        addAccountImplicitly(owner: string, authType: string, options: {
            [key: string]: any;
        }, callback: AuthenticatorCallback): void;
        /**
         * Creates an application account of a specified owner implicitly.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner.
         * @throws { BusinessError } 12300007 - The number of accounts reaches the upper limit.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        createAccountImplicitly(owner: string, callback: AuthCallback): void;
        /**
         * Creates an application account of a specified owner implicitly.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { CreateAccountImplicitlyOptions } options - Indicates the authenticator-specific options for the request.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner or options.
         * @throws { BusinessError } 12300007 - The number of accounts reaches the upper limit.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        createAccountImplicitly(owner: string, options: CreateAccountImplicitlyOptions, callback: AuthCallback): void;
        /**
         * Deletes an application account from the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to delete.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#removeAccount
         */
        deleteAccount(name: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes an application account from the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to delete.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#removeAccount
         */
        deleteAccount(name: string): Promise<void>;
        /**
         * Removes an application account from the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to delete.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        removeAccount(name: string, callback: AsyncCallback<void>): void;
        /**
         * Removes an application account from the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the name of the application account to delete.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        removeAccount(name: string): Promise<void>;
        /**
         * Disables a third-party application with the specified bundle name from
         * accessing the given application account.
         *
         * @param { string } name - Indicates the name of the application account to disable access from
         *        the third-party application.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAppAccess
         */
        disableAppAccess(name: string, bundleName: string, callback: AsyncCallback<void>): void;
        /**
         * Disables a third-party application with the specified bundle name from
         * accessing the given application account.
         *
         * @param { string } name - Indicates the name of the application account to disable access from
         *        the third-party application.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAppAccess
         */
        disableAppAccess(name: string, bundleName: string): Promise<void>;
        /**
         * Enables a third-party application with the specified bundle name to access the given application
         * account for data query and listening.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAppAccess
         */
        enableAppAccess(name: string, bundleName: string, callback: AsyncCallback<void>): void;
        /**
         * Enables a third-party application with the specified bundle name to access the given application
         * account for data query and listening.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAppAccess
         */
        enableAppAccess(name: string, bundleName: string): Promise<void>;
        /**
         * Sets a third-party application with the specified bundle name to access the given application
         * account for data query and listening.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { boolean } isAccessible - Indicates the accessibility flag, true for accessible, false for inaccessible.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400001 - Application not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAppAccess(name: string, bundleName: string, isAccessible: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets a third-party application with the specified bundle name to access the given application
         * account for data query and listening.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { boolean } isAccessible - Indicates the accessibility flag, true for accessible, false for inaccessible.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400001 - Application not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAppAccess(name: string, bundleName: string, isAccessible: boolean): Promise<void>;
        /**
         * Checks whether a third-party application with the specified bundle name is allowed to access
         * the given application account for data query and listening.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { AsyncCallback<boolean> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAppAccess(name: string, bundleName: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a third-party application with the specified bundle name is allowed to access
         * the given application account for data query and listening.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAppAccess(name: string, bundleName: string): Promise<boolean>;
        /**
         * Checks whether a specified application account allows application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to check
         * whether application data can be synchronized.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @param { AsyncCallback<boolean> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#checkDataSyncEnabled
         */
        checkAppAccountSyncEnable(name: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a specified application account allows application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to check
         * whether application data can be synchronized.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @returns { Promise<boolean> } Returns {@code true} if application data synchronization is allowed; returns {@code false} otherwise.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#checkDataSyncEnabled
         */
        checkAppAccountSyncEnable(name: string): Promise<boolean>;
        /**
         * Checks whether application data synchronization is enabled for the specified account.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to check
         * whether application data can be synchronized.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @param { AsyncCallback<boolean> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkDataSyncEnabled(name: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether application data synchronization is enabled for the specified account.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to check
         * whether application data can be synchronized.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @returns { Promise<boolean> } Returns {@code true} if application data synchronization is allowed; returns {@code false} otherwise.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkDataSyncEnabled(name: string): Promise<boolean>;
        /**
         * Sets the credential for this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to set.
         * @param { string } credential - Indicates the credential to set.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCredential
         */
        setAccountCredential(name: string, credentialType: string, credential: string, callback: AsyncCallback<void>): void;
        /**
         * Sets the credential for this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to set.
         * @param { string } credential - Indicates the credential to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCredential
         */
        setAccountCredential(name: string, credentialType: string, credential: string): Promise<void>;
        /**
         * Sets the credential for this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to set.
         * @param { string } credential - Indicates the credential to set.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, credentialType or credential.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setCredential(name: string, credentialType: string, credential: string, callback: AsyncCallback<void>): void;
        /**
         * Sets the credential for this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to set.
         * @param { string } credential - Indicates the credential to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, credentialType or credential.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setCredential(name: string, credentialType: string, credential: string): Promise<void>;
        /**
         * Sets extra information for this application account.
         * <p>
         * You can call this method when you forget the extra information of your application account or
         * need to modify the extra information.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } extraInfo - Indicates the extra information to set.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCustomData
         */
        setAccountExtraInfo(name: string, extraInfo: string, callback: AsyncCallback<void>): void;
        /**
         * Sets extra information for this application account.
         * <p>
         * You can call this method when you forget the extra information of your application account or
         * need to modify the extra information.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } extraInfo - Indicates the extra information to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCustomData
         */
        setAccountExtraInfo(name: string, extraInfo: string): Promise<void>;
        /**
         * Sets whether a specified application account allows application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to set whether to
         * allow cross-device data synchronization. If synchronization is allowed, application data can be synchronized
         * among these devices in the event of any changes related to the application account.
         * If synchronization is not allowed, the application data is stored only on the local device.
         * <p>
         * <b>Application account-related changes</b>: adding or deleting an application account, setting extra
         * information (such as updating a token), and setting data associated with this application account
         * <p>
         * <b>Application data that can be synchronized</b>: application account name, token,
         * and data associated with this application account
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @param { boolean } isEnable - Specifies whether to allow application data synchronization.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setDataSyncEnabled
         */
        setAppAccountSyncEnable(name: string, isEnable: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets whether a specified application account allows application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to set whether to
         * allow cross-device data synchronization. If synchronization is allowed, application data can be synchronized
         * among these devices in the event of any changes related to the application account.
         * If synchronization is not allowed, the application data is stored only on the local device.
         * <p>
         * <b>Application account-related changes</b>: adding or deleting an application account, setting extra
         * information (such as updating a token), and setting data associated with this application account
         * <p>
         * <b>Application data that can be synchronized</b>: application account name, token,
         * and data associated with this application account
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @param { boolean } isEnable - Specifies whether to allow application data synchronization.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setDataSyncEnabled
         */
        setAppAccountSyncEnable(name: string, isEnable: boolean): Promise<void>;
        /**
         * Sets whether a specified application account enables application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to set whether to
         * enable cross-device data synchronization. If synchronization is enabled, application data can be synchronized
         * among these devices in the event of any changes related to the application account.
         * If synchronization is not enabled, the application data is stored only on the local device.
         * <p>
         * <b>Application account-related changes</b>: adding or deleting an application account, setting extra
         * information (such as updating a token), and setting data associated with this application account
         * <p>
         * <b>Application data that can be synchronized</b>: application account name, token,
         * and data associated with this application account
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @param { boolean } isEnabled - Specifies whether to enable application data synchronization.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setDataSyncEnabled(name: string, isEnabled: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets whether a specified application account enables application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to set whether to
         * enable cross-device data synchronization. If synchronization is enabled, application data can be synchronized
         * among these devices in the event of any changes related to the application account.
         * If synchronization is not enabled, the application data is stored only on the local device.
         * <p>
         * <b>Application account-related changes</b>: adding or deleting an application account, setting extra
         * information (such as updating a token), and setting data associated with this application account
         * <p>
         * <b>Application data that can be synchronized</b>: application account name, token,
         * and data associated with this application account
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } name - Indicates the name of the application account.
         * @param { boolean } isEnabled - Specifies whether to enable application data synchronization.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setDataSyncEnabled(name: string, isEnabled: boolean): Promise<void>;
        /**
         * Sets data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to set. The key can be customized.
         * @param { string } value - Indicates the value of the data to set.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCustomData
         */
        setAssociatedData(name: string, key: string, value: string, callback: AsyncCallback<void>): void;
        /**
         * Sets data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to set. The key can be customized.
         * @param { string } value - Indicates the value of the data to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCustomData
         */
        setAssociatedData(name: string, key: string, value: string): Promise<void>;
        /**
         * Sets data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to set. The key can be customized.
         * @param { string } value - Indicates the value of the data to set.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, key or value.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400003 - The number of custom data reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setCustomData(name: string, key: string, value: string, callback: AsyncCallback<void>): void;
        /**
         * Sets data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to set. The key can be customized.
         * @param { string } value - Indicates the value of the data to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, key or value.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400003 - The number of custom data reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setCustomData(name: string, key: string, value: string): Promise<void>;
        /**
         * Obtains information about all accessible accounts.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications.
         *
         * @permission ohos.permission.GET_ALL_APP_ACCOUNTS
         * @param { AsyncCallback<Array<AppAccountInfo>> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAllAccounts
         */
        getAllAccessibleAccounts(callback: AsyncCallback<Array<AppAccountInfo>>): void;
        /**
         * Obtains information about all accessible accounts.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications.
         *
         * @permission ohos.permission.GET_ALL_APP_ACCOUNTS
         * @returns { Promise<Array<AppAccountInfo>> } Returns a list of application accounts.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAllAccounts
         */
        getAllAccessibleAccounts(): Promise<Array<AppAccountInfo>>;
        /**
         * Obtains information about all accessible accounts.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications or
         * <br> have gained the ohos.permission.GET_ALL_APP_ACCOUNTS permission.
         *
         * @param { AsyncCallback<Array<AppAccountInfo>> } callback - Asynchronous callback interface. Returns a list of application accounts.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAllAccounts(callback: AsyncCallback<Array<AppAccountInfo>>): void;
        /**
         * Obtains information about all accessible accounts.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications or
         * <br> have gained the ohos.permission.GET_ALL_APP_ACCOUNTS permission.
         *
         * @returns { Promise<Array<AppAccountInfo>> } Returns a list of application accounts.
         * @throws { BusinessError } 12300001 - System service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAllAccounts(): Promise<Array<AppAccountInfo>>;
        /**
         * Obtains information about all accounts of a specified account owner.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications.
         *
         * @permission ohos.permission.GET_ALL_APP_ACCOUNTS
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { AsyncCallback<Array<AppAccountInfo>> } callback - Asynchronous callback interface. Returns a list of application accounts.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAccountsByOwner
         */
        getAllAccounts(owner: string, callback: AsyncCallback<Array<AppAccountInfo>>): void;
        /**
         * Obtains information about all accounts of a specified account owner.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications.
         *
         * @permission ohos.permission.GET_ALL_APP_ACCOUNTS
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @returns { Promise<Array<AppAccountInfo>> } Returns a list of application accounts.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAccountsByOwner
         */
        getAllAccounts(owner: string): Promise<Array<AppAccountInfo>>;
        /**
         * Gets information about all accounts of a specified account owner.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications or
         * <br> have gained the ohos.permission.GET_ALL_APP_ACCOUNTS permission.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { AsyncCallback<Array<AppAccountInfo>> } callback - Asynchronous callback interface. Returns a list of application accounts.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner.
         * @throws { BusinessError } 12400001 - Application not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAccountsByOwner(owner: string, callback: AsyncCallback<Array<AppAccountInfo>>): void;
        /**
         * Gets information about all accounts of a specified account owner.
         * This method applies to the following accounts:
         * <br> Accounts of this application.
         * <br> Accounts of third-party applications. To obtain such information,
         * <br> your application must have gained authorization from the third-party applications or
         * <br> have gained the ohos.permission.GET_ALL_APP_ACCOUNTS permission.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @returns { Promise<Array<AppAccountInfo>> } Returns a list of application accounts.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner.
         * @throws { BusinessError } 12400001 - Application not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAccountsByOwner(owner: string): Promise<Array<AppAccountInfo>>;
        /**
         * Obtains the credential of this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to obtain.
         * @param { AsyncCallback<string> } callback - Asynchronous callback interface. Returns the credential of the application account.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCredential
         */
        getAccountCredential(name: string, credentialType: string, callback: AsyncCallback<string>): void;
        /**
         * Obtains the credential of this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to obtain.
         * @returns { Promise<string> } Returns the credential of the application account.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCredential
         */
        getAccountCredential(name: string, credentialType: string): Promise<string>;
        /**
         * Obtains the credential of this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to obtain.
         * @param { AsyncCallback<string> } callback - Asynchronous callback interface. Returns the credential of the application account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or credentialType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300102 - Credential not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getCredential(name: string, credentialType: string, callback: AsyncCallback<string>): void;
        /**
         * Obtains the credential of this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } credentialType - Indicates the type of the credential to obtain.
         * @returns { Promise<string> } Returns the credential of the application account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or credentialType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300102 - Credential not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getCredential(name: string, credentialType: string): Promise<string>;
        /**
         * Obtains extra information of this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { AsyncCallback<string> } callback - Asynchronous callback interface.
         *   Returns the extra information of the account; returns {@code null} in other scenarios,
         *   for example, if the account does not exist.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCustomData
         */
        getAccountExtraInfo(name: string, callback: AsyncCallback<string>): void;
        /**
         * Obtains extra information of this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @returns { Promise<string> } Returns the extra information of the account; returns {@code null} in other scenarios,
         *         for example, if the account does not exist.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCustomData
         */
        getAccountExtraInfo(name: string): Promise<string>;
        /**
         * Obtains data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to obtain.
         * @param { AsyncCallback<string> } callback - Asynchronous callback interface. Returns the associated data of the application account.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCustomData
         */
        getAssociatedData(name: string, key: string, callback: AsyncCallback<string>): void;
        /**
         * Obtains data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to obtain.
         * @returns { Promise<string> } Returns the associated data of the application account.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCustomData
         */
        getAssociatedData(name: string, key: string): Promise<string>;
        /**
         * Obtains data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to obtain.
         * @param { AsyncCallback<string> } callback - Asynchronous callback interface. Returns the associated data of the application account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or key.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400002 - Custom data not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getCustomData(name: string, key: string, callback: AsyncCallback<string>): void;
        /**
         * Obtains data associated with this application account.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to obtain.
         * @returns { Promise<string> } Returns the associated data of the application account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or key.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400002 - Custom data not found
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getCustomData(name: string, key: string): Promise<string>;
        /**
         * Obtains data associated with the specified account synchronously.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { string } key - Indicates the key of the data to obtain.
         * @returns { string } Returns the associated data of the application account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or key.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400002 - Custom data not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getCustomDataSync(name: string, key: string): string;
        /**
         * Subscribes to the change events of accounts of the specified owners.
         * <p>
         * When the account owner updates the account, the subscriber will receive a notification
         * about the account change event.
         *
         * @param { 'change' } type - Event type.
         * @param { Array<string> } owners - Indicates the account owners, which are specified
         *        by {@link AppAccount#AppAccount(String name, String owner)}.
         * @param { Callback<Array<AppAccountInfo>> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#on
         */
        on(type: 'change', owners: Array<string>, callback: Callback<Array<AppAccountInfo>>): void;
        /**
         * Subscribes to the change events of accounts of the specified owners.
         * <p>
         * When the account owner updates the account, the subscriber will receive a notification
         * about the account change event.
         *
         * @param { 'accountChange' } type - Event type.
         * @param { Array<string> } owners - Indicates the account owners, which are specified
         *        by {@link AppAccount#AppAccount(String name, String owner)}.
         * @param { Callback<Array<AppAccountInfo>> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid type or owners.
         * @throws { BusinessError } 12400001 - Application not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        on(type: 'accountChange', owners: Array<string>, callback: Callback<Array<AppAccountInfo>>): void;
        /**
         * Unsubscribes from account events.
         *
         * @param { 'change' } type - Event type.
         * @param { Callback<Array<AppAccountInfo>> } [callback] - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#off
         */
        off(type: 'change', callback?: Callback<Array<AppAccountInfo>>): void;
        /**
         * Unsubscribes from account events.
         *
         * @param { 'accountChange' } type - Event type.
         * @param { Callback<Array<AppAccountInfo>> } [callback] - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid type.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        off(type: 'accountChange', callback?: Callback<Array<AppAccountInfo>>): void;
        /**
         * Authenticates an application account to get an oauth token.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { object } options - Indicates the authenticator-specific options for the request.
         * @param { AuthenticatorCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#auth
         */
        authenticate(name: string, owner: string, authType: string, options: {
            [key: string]: any;
        }, callback: AuthenticatorCallback): void;
        /**
         * Authenticates an application account to get an auth token.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner or authType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        auth(name: string, owner: string, authType: string, callback: AuthCallback): void;
        /**
         * Authenticates an application account to get an auth token.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { Record<string, Object> } options - Indicates the authenticator-specific options for the request.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner, authType or options.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        auth(name: string, owner: string, authType: string, options: Record<string, Object>, callback: AuthCallback): void;
        /**
         * Gets an oauth token with the specified authentication type from a particular application account.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { AsyncCallback<string> } callback - Asynchronous callback interface. Returns an oauth token.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthToken
         */
        getOAuthToken(name: string, owner: string, authType: string, callback: AsyncCallback<string>): void;
        /**
         * Gets an oauth token with the specified authentication type from a particular application account.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @returns { Promise<string> } Returns an oauth token.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthToken
         */
        getOAuthToken(name: string, owner: string, authType: string): Promise<string>;
        /**
         * Gets an auth token with the specified authentication type from a particular application account.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { AsyncCallback<string> } callback - Asynchronous callback interface. Returns an auth token.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner or authType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAuthToken(name: string, owner: string, authType: string, callback: AsyncCallback<string>): void;
        /**
         * Gets an auth token with the specified authentication type from a particular application account.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @returns { Promise<string> } Returns an auth token.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner or authType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAuthToken(name: string, owner: string, authType: string): Promise<string>;
        /**
         * Sets an oauth token with the specified authentication type for a particular account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the oauth token.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAuthToken
         */
        setOAuthToken(name: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        /**
         * Sets an oauth token with the specified authentication type for a particular account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the oauth token.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAuthToken
         */
        setOAuthToken(name: string, authType: string, token: string): Promise<void>;
        /**
         * Sets an auth token with the specified authentication type for a particular account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the auth token.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, authType or token.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400004 - The number of tokens reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAuthToken(name: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        /**
         * Sets an auth token with the specified authentication type for a particular account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the auth token.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, authType or token.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12400004 - The number of tokens reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAuthToken(name: string, authType: string, token: string): Promise<void>;
        /**
         * Deletes an oauth token for the specified application account.
         * <p>
         * Only tokens visible to the caller application can be deleted.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the oauth token.
         * @param { AsyncCallback<void> } callback Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#deleteAuthToken
         */
        deleteOAuthToken(name: string, owner: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes an oauth token for the specified application account.
         * <p>
         * Only tokens visible to the caller application can be deleted.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the oauth token.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#deleteAuthToken
         */
        deleteOAuthToken(name: string, owner: string, authType: string, token: string): Promise<void>;
        /**
         * Deletes an auth token for the specified application account.
         * <p>
         * Only tokens visible to the caller application can be deleted.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the auth token.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner, authType or token.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        deleteAuthToken(name: string, owner: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes an auth token for the specified application account.
         * <p>
         * Only tokens visible to the caller application can be deleted.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } token - Indicates the auth token.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner, authType or token.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        deleteAuthToken(name: string, owner: string, authType: string, token: string): Promise<void>;
        /**
         * Sets the oauth token visibility of the specified authentication type to a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { boolean } isVisible - Indicates the bool value of visibility.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAuthTokenVisibility
         */
        setOAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets the oauth token visibility of the specified authentication type to a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { boolean } isVisible - Indicates the bool value of visibility.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAuthTokenVisibility
         */
        setOAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean): Promise<void>;
        /**
         * Sets the auth token visibility of the specified authentication type to a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { boolean } isVisible - Indicates the bool value of visibility.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, authType or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @throws { BusinessError } 12400001 - Application not found.
         * @throws { BusinessError } 12400005 - The size of authorization list reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets the auth token visibility of the specified authentication type to a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { boolean } isVisible - Indicates the bool value of visibility.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, authType or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @throws { BusinessError } 12400001 - Application not found.
         * @throws { BusinessError } 12400005 - The size of authorization list reaches the upper limit.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean): Promise<void>;
        /**
         * Checks the oauth token visibility of the specified authentication type for a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { AsyncCallback<boolean> } callback - Asynchronous callback interface. Returns the bool value of visibility.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#checkAuthTokenVisibility
         */
        checkOAuthTokenVisibility(name: string, authType: string, bundleName: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks the oauth token visibility of the specified authentication type for a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @returns { Promise<boolean> } Returns the bool value of visibility.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#checkAuthTokenVisibility
         */
        checkOAuthTokenVisibility(name: string, authType: string, bundleName: string): Promise<boolean>;
        /**
         * Checks the auth token visibility of the specified authentication type for a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @param { AsyncCallback<boolean> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, authType or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAuthTokenVisibility(name: string, authType: string, bundleName: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks the auth token visibility of the specified authentication type for a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } bundleName - Indicates the bundle name of the third-party application.
         * @returns { Promise<boolean> } Returns the bool value of visibility.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, authType or bundleName.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAuthTokenVisibility(name: string, authType: string, bundleName: string): Promise<boolean>;
        /**
         * Gets all oauth tokens visible to the caller application.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { AsyncCallback<Array<OAuthTokenInfo>> } callback - Asynchronous callback interface.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAllAuthTokens
         */
        getAllOAuthTokens(name: string, owner: string, callback: AsyncCallback<Array<OAuthTokenInfo>>): void;
        /**
         * Gets all oauth tokens visible to the caller application.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @returns { Promise<Array<OAuthTokenInfo>> } Returns a list of oauth tokens visible to the caller application.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAllAuthTokens
         */
        getAllOAuthTokens(name: string, owner: string): Promise<Array<OAuthTokenInfo>>;
        /**
         * Gets all auth tokens visible to the caller application.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { AsyncCallback<Array<AuthTokenInfo>> } callback - Asynchronous callback interface.
         *   Returns a list of auth tokens visible to the caller application.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or owner.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAllAuthTokens(name: string, owner: string, callback: AsyncCallback<Array<AuthTokenInfo>>): void;
        /**
         * Gets all auth tokens visible to the caller application.
         *
         * @param { string } name - Indicates the account name of your application or third-party applications.
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @returns { Promise<Array<AuthTokenInfo>> } Returns a list of auth tokens visible to the caller application.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or owner.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAllAuthTokens(name: string, owner: string): Promise<Array<AuthTokenInfo>>;
        /**
         * Gets the open authorization list with a specified authentication type for a particular application account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { AsyncCallback<Array<string>> } callback - Asynchronous callback interface.
         *   Returns the open authorization list of the specified authentication type.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthList
         */
        getOAuthList(name: string, authType: string, callback: AsyncCallback<Array<string>>): void;
        /**
         * Gets the open authorization list with a specified authentication type for a particular application account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @returns { Promise<Array<string>> } Returns the open authorization list of the specified authentication type.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthList
         */
        getOAuthList(name: string, authType: string): Promise<Array<string>>;
        /**
         * Gets the open authorization list with a specified authentication type for a particular application account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @param { AsyncCallback<Array<string>> } callback - Asynchronous callback interface.
         *   Returns the open authorization list of the specified authentication type.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or authType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAuthList(name: string, authType: string, callback: AsyncCallback<Array<string>>): void;
        /**
         * Gets the open authorization list with a specified authentication type for a particular application account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         *
         * @param { string } name - Indicates the account name of your application.
         * @param { string } authType - Indicates the authentication type.
         * @returns { Promise<Array<string>> } Returns the open authorization list of the specified authentication type.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or authType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300107 - AuthType not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAuthList(name: string, authType: string): Promise<Array<string>>;
        /**
         * Gets the authenticator callback with the specified session id.
         * <p>
         * Only the owner of the authenticator has the permission to call this method.
         *
         * @param { string } sessionId - Indicates the id of a authentication session.
         * @param { AsyncCallback<AuthenticatorCallback> } callback - Asynchronous callback interface.
         *   Returns the authenticator callback related to the session id.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthCallback
         */
        getAuthenticatorCallback(sessionId: string, callback: AsyncCallback<AuthenticatorCallback>): void;
        /**
         * Gets the authenticator callback with the specified session id.
         * <p>
         * Only the owner of the authenticator has the permission to call this method.
         *
         * @param { string } sessionId - Indicates the id of a authentication session.
         * @returns { Promise<AuthenticatorCallback> } Returns the authenticator callback related to the session id.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthCallback
         */
        getAuthenticatorCallback(sessionId: string): Promise<AuthenticatorCallback>;
        /**
         * Obtains the authenticator callback with the specified session id.
         * <p>
         * Only the owner of the authenticator has the permission to call this method.
         *
         * @param { string } sessionId - Indicates the id of a authentication session.
         * @param { AsyncCallback<AuthCallback> } callback - Asynchronous callback interface.
         *   Returns the authenticator callback related to the session id.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid sessionId.
         * @throws { BusinessError } 12300108 - Session not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAuthCallback(sessionId: string, callback: AsyncCallback<AuthCallback>): void;
        /**
         * Obtains the authenticator callback with the specified session id.
         * <p>
         * Only the owner of the authenticator has the permission to call this method.
         *
         * @param { string } sessionId - Indicates the id of a authentication session.
         * @returns { Promise<AuthCallback> } Returns the authenticator callback related to the session id.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid sessionId.
         * @throws { BusinessError } 12300108 - Session not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getAuthCallback(sessionId: string): Promise<AuthCallback>;
        /**
         * Gets the authenticator information of an application account.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { AsyncCallback<AuthenticatorInfo> } callback - Asynchronous callback interface.
         *   Returns the authenticator information of the application account.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#queryAuthenticatorInfo
         */
        getAuthenticatorInfo(owner: string, callback: AsyncCallback<AuthenticatorInfo>): void;
        /**
         * Gets the authenticator information of an application account.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @returns { Promise<AuthenticatorInfo> } Returns the authenticator information of the application account.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#queryAuthenticatorInfo
         */
        getAuthenticatorInfo(owner: string): Promise<AuthenticatorInfo>;
        /**
         * Queries the authenticator information of an application account.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @param { AsyncCallback<AuthenticatorInfo> } callback - Asynchronous callback interface.
         *   Returns the authenticator information of the application account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        queryAuthenticatorInfo(owner: string, callback: AsyncCallback<AuthenticatorInfo>): void;
        /**
         * Queries the authenticator information of an application account.
         *
         * @param { string } owner - Indicates the account owner of your application or third-party applications.
         * @returns { Promise<AuthenticatorInfo> } Returns the authenticator information of the application account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        queryAuthenticatorInfo(owner: string): Promise<AuthenticatorInfo>;
        /**
         * Checks whether a particular account has all specified labels.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } owner - Indicates the account owner.
         * @param { Array<string> } labels - Indicates an array of labels to check.
         * @param { AsyncCallback<boolean> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner or labels.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAccountLabels(name: string, owner: string, labels: Array<string>, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a particular account has all specified labels.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } owner - Indicates the account owner.
         * @param { Array<string> } labels - Indicates an array of labels to check.
         * @returns { Promise<boolean> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner or labels.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAccountLabels(name: string, owner: string, labels: Array<string>): Promise<boolean>;
        /**
         * Deletes the credential of the specified application account.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } credentialType - Indicates the type of the credential to delete.
         * @param { AsyncCallback<void> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or credentialType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300102 - Credential not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        deleteCredential(name: string, credentialType: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes the credential of the specified application account.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } credentialType - Indicates the type of the credential to delete.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or credentialType.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300102 - Credential not found.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        deleteCredential(name: string, credentialType: string): Promise<void>;
        /**
         * Selects a list of accounts that satisfied with the specified options.
         *
         * @param { SelectAccountsOptions } options - Indicates the options for selecting account.
         * @param { AsyncCallback<Array<AppAccountInfo>> } callback - Asynchronous callback interface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid options.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        selectAccountsByOptions(options: SelectAccountsOptions, callback: AsyncCallback<Array<AppAccountInfo>>): void;
        /**
         * Selects a list of accounts that satisfied with the specified options.
         *
         * @param { SelectAccountsOptions } options - Indicates the options for selecting account.
         * @returns { Promise<Array<AppAccountInfo>> } Returns a list of accounts.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid options.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        selectAccountsByOptions(options: SelectAccountsOptions): Promise<Array<AppAccountInfo>>;
        /**
         * Verifies the credential to ensure the user is the owner of the specified account.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } owner - Indicates the account owner.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name or owner.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        verifyCredential(name: string, owner: string, callback: AuthCallback): void;
        /**
         * Verifies the credential to ensure the user is the owner of the specified account.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } owner - Indicates the account owner.
         * @param { VerifyCredentialOptions } options - Indicates the options for verifying credential.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid name, owner or options.
         * @throws { BusinessError } 12300003 - Account not found.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        verifyCredential(name: string, owner: string, options: VerifyCredentialOptions, callback: AuthCallback): void;
        /**
         * Sets properties for the specified account authenticator.
         * <p>
         * If the authenticator supports setting its properties,
         * the caller will normally be redirected to an Ability specified by Want for property setting.
         *
         * @param { string } owner - Indicates the owner of authenticator.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAuthenticatorProperties(owner: string, callback: AuthCallback): void;
        /**
         * Sets properties for the specified account authenticator.
         * <p>
         * If the authenticator supports setting its properties,
         * the caller will normally be redirected to an Ability specified by Want for property setting.
         *
         * @param { string } owner - Indicates the owner of authenticator.
         * @param { SetPropertiesOptions } options - Indicates the options for setting properties.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - System service exception.
         * @throws { BusinessError } 12300002 - Invalid owner or options.
         * @throws { BusinessError } 12300010 - Account service busy.
         * @throws { BusinessError } 12300113 - Authenticator service not found.
         * @throws { BusinessError } 12300114 - Authenticator service exception.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setAuthenticatorProperties(owner: string, options: SetPropertiesOptions, callback: AuthCallback): void;
    }
    /**
     * Provides basic information of an application account, including the account owner and name.
     *
     * @interface AppAccountInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 7
     */
    interface AppAccountInfo {
        /**
         * The owner an application account.
         *
         * @type { string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         */
        owner: string;
        /**
         * The name an application account.
         *
         * @type { string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 7
         */
        name: string;
    }
    /**
     * Provides basic information of an oauth token, including the authentication type and token value.
     *
     * @interface OAuthTokenInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     * @deprecated since 9
     * @useinstead appAccount.AuthTokenInfo
     */
    interface OAuthTokenInfo {
        /**
         * The authentication type.
         *
         * @type { string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         */
        authType: string;
        /**
         * The token value.
         *
         * @type { string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         */
        token: string;
    }
    /**
     * Provides basic information of an auth token, including the authentication type and token value.
     *
     * @interface AuthTokenInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface AuthTokenInfo {
        /**
         * The authentication type.
         *
         * @type { string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        authType: string;
        /**
         * The token value.
         *
         * @type { string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        token: string;
        /**
         * The account to which the token belongs.
         *
         * @type { ?AppAccountInfo }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        account?: AppAccountInfo;
    }
    /**
     * Provides basic information of an authenticator, including the authenticator owner, icon id and label id.
     *
     * @interface AuthenticatorInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     */
    interface AuthenticatorInfo {
        /**
         * The owner of an authenticator.
         *
         * @type { string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        owner: string;
        /**
         * The icon id of an authenticator.
         *
         * @type { number }
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        iconId: number;
        /**
         * The label id of an authenticator.
         *
         * @type { number }
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        labelId: number;
    }
    /**
     * Provides the definition of the authentication result.
     *
     * @interface AuthResult
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface AuthResult {
        /**
         * The account information.
         *
         * @type { ?AppAccountInfo }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        account?: AppAccountInfo;
        /**
         * The token information.
         *
         * @type { ?AuthTokenInfo }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        tokenInfo?: AuthTokenInfo;
    }
    /**
     * Provides the available options for creating an account.
     *
     * @interface CreateAccountOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface CreateAccountOptions {
        /**
         * The custom data for creating an account,
         * which can be further modified by function setCustomData.
         *
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        customData?: Record<string, string>;
    }
    /**
     * Provides the available options for creating an account implicitly.
     *
     * @interface CreateAccountImplicitlyOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface CreateAccountImplicitlyOptions {
        /**
         * The required labels for creating an account.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        requiredLabels?: Array<string>;
        /**
         * The authentication type.
         *
         * @type { ?string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        authType?: string;
        /**
         * The authenticator-specific parameters.
         * The list of reserved parameter name:
         * 1. Constants.KEY_CALLER_BUNDLE_NAME;
         * The above parameters are set by the appAccount management service and can be used for identify the caller.
         *
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        parameters?: Record<string, Object>;
    }
    /**
     * Provides the available options for selecting accounts.
     *
     * @interface SelectAccountsOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface SelectAccountsOptions {
        /**
         * The list of accounts allowed to be selected.
         *
         * @type { ?Array<AppAccountInfo> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        allowedAccounts?: Array<AppAccountInfo>;
        /**
         * The list of account owners, whose accounts allowed to be selected.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        allowedOwners?: Array<string>;
        /**
         * The labels required for the selected accounts.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        requiredLabels?: Array<string>;
    }
    /**
     * Provides the available options for verifying credential.
     *
     * @interface VerifyCredentialOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface VerifyCredentialOptions {
        /**
         * The credential type to be verified.
         *
         * @type { ?string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        credentialType?: string;
        /**
         * The credential to be verified.
         *
         * @type { ?string }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        credential?: string;
        /**
         * The authenticator-specific parameters.
         * The list of reserved parameter name:
         * 1. Constants.KEY_CALLER_BUNDLE_NAME;
         * The above parameters are set by the appAccount management service and can be used for identify the caller.
         *
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        parameters?: Record<string, Object>;
    }
    /**
     * Provides the available options for setting properties.
     *
     * @interface SetPropertiesOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface SetPropertiesOptions {
        /**
         * The properties to be set.
         *
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        properties?: Record<string, Object>;
        /**
         * The authenticator-specific parameters.
         * The list of reserved parameter name:
         * 1. Constants.KEY_CALLER_BUNDLE_NAME;
         * The above parameters are set by the appAccount management service and can be used for identify the caller.
         *
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        parameters?: Record<string, Object>;
    }
    /**
     * Provides constants definition.
     *
     * @enum { string } Constants
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     */
    enum Constants {
        /**
         * Indicates the action for adding account implicitly.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Constants#ACTION_CREATE_ACCOUNT_IMPLICITLY
         */
        ACTION_ADD_ACCOUNT_IMPLICITLY = 'addAccountImplicitly',
        /**
         * Indicates the action for authenticating.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Constants#ACTION_AUTH
         */
        ACTION_AUTHENTICATE = 'authenticate',
        /**
         * Indicates the action for creating account implicitly.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        ACTION_CREATE_ACCOUNT_IMPLICITLY = 'createAccountImplicitly',
        /**
         * Indicates the action for authenticating.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        ACTION_AUTH = 'auth',
        /**
         * Indicates the action for verifying credential.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        ACTION_VERIFY_CREDENTIAL = 'verifyCredential',
        /**
         * Indicates the action for set authenticator properties.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        ACTION_SET_AUTHENTICATOR_PROPERTIES = 'setAuthenticatorProperties',
        /**
         * Indicates the key of name.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_NAME = 'name',
        /**
         * Indicates the key of owner.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_OWNER = 'owner',
        /**
         * Indicates the key of token.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_TOKEN = 'token',
        /**
         * Indicates the key of action.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_ACTION = 'action',
        /**
         * Indicates the key of authentication type.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_AUTH_TYPE = 'authType',
        /**
         * Indicates the key of session id.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_SESSION_ID = 'sessionId',
        /**
         * Indicates the key of caller pid.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_CALLER_PID = 'callerPid',
        /**
         * Indicates the key of caller uid.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_CALLER_UID = 'callerUid',
        /**
         * Indicates the key of caller bundle name.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         */
        KEY_CALLER_BUNDLE_NAME = 'callerBundleName',
        /**
         * Indicates the key of required labels.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        KEY_REQUIRED_LABELS = 'requiredLabels',
        /**
         * Indicates the key of boolean result.
         *
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        KEY_BOOLEAN_RESULT = 'booleanResult'
    }
    /**
     * Provides result code definition.
     *
     * @enum { number } ResultCode
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     * @deprecated since 9
     */
    enum ResultCode {
        /**
        * Indicates the success result.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        SUCCESS = 0,
        /**
        * Indicates the result of account not exist.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_ACCOUNT_NOT_EXIST = 10001,
        /**
        * Indicates the result of account service exception.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_APP_ACCOUNT_SERVICE_EXCEPTION = 10002,
        /**
        * Indicates the result of password is invalid.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_INVALID_PASSWORD = 10003,
        /**
        * Indicates the result of request is invalid.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_INVALID_REQUEST = 10004,
        /**
        * Indicates the result of response is invalid.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_INVALID_RESPONSE = 10005,
        /**
        * Indicates the result of network exception.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_NETWORK_EXCEPTION = 10006,
        /**
        * Indicates the result of network exception.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_AUTHENTICATOR_NOT_EXIST = 10007,
        /**
        * Indicates the result of auth has been canceled.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_CANCELED = 10008,
        /**
        * Indicates the result of auth list is too large.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_LIST_TOO_LARGE = 10009,
        /**
        * Indicates the result of auth service is busy.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_SERVICE_BUSY = 10010,
        /**
        * Indicates the result of auth service exception.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_SERVICE_EXCEPTION = 10011,
        /**
        * Indicates the result of auth session is not exist.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_SESSION_NOT_EXIST = 10012,
        /**
        * Indicates the result of auth timeout.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_TIMEOUT = 10013,
        /**
        * Indicates the result of token is not exist.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_TOKEN_NOT_EXIST = 10014,
        /**
        * Indicates the result of token is too many.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_TOKEN_TOO_MANY = 10015,
        /**
        * Indicates the result of not supported action.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_UNSUPPORT_ACTION = 10016,
        /**
        * Indicates the result of not supported auth type.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_OAUTH_UNSUPPORT_AUTH_TYPE = 10017,
        /**
        * Indicates the result of permission denied.
        *
        * @syscap SystemCapability.Account.AppAccount
        * @since 8
        * @deprecated since 9
        */
        ERROR_PERMISSION_DENIED = 10018
    }
    /**
     * Provides methods for authenticator callback.
     *
     * @interface AuthenticatorCallback
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     * @deprecated since 9
     * @useinstead AppAccount.AuthCallback
     */
    interface AuthenticatorCallback {
        /**
         * Notifies the client of the authentication result.
         *
         * @type { function }
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         */
        onResult: (code: number, result: {
            [key: string]: any;
        }) => void;
        /**
         * Notifies the client that the authentication request need to be redirected.
         *
         * @type { function }
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         */
        onRequestRedirected: (request: Want) => void;
    }
    /**
     * Provides methods for authentication callback.
     *
     * @interface AuthCallback
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface AuthCallback {
        /**
         * Notifies the client of the authentication result.
         *
         * @type { function }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        onResult: (code: number, result?: AuthResult) => void;
        /**
         * Notifies the client that the authentication request need to be redirected.
         *
         * @type { function }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        onRequestRedirected: (request: Want) => void;
        /**
         * Notifies the client that the request is continued.
         *
         * @type { ?function }
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        onRequestContinued?: () => void;
    }
    /**
     * Provides methods for authenticator.
     *
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     * @name Authenticator
     */
    class Authenticator {
        /**
         * Adds an application account of a specified owner implicitly.
         *
         * @param { string } authType - Indicates the authentication type.
         * @param { string } callerBundleName - Indicates the caller bundle name.
         * @param { object } options - Indicates the authenticator-specific options for the request.
         * @param { AuthenticatorCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Authenticator#createAccountImplicitly
         */
        addAccountImplicitly(authType: string, callerBundleName: string, options: {
            [key: string]: any;
        }, callback: AuthenticatorCallback): void;
        /**
         * Creates an application account of a specified owner implicitly.
         *
         * @param { CreateAccountImplicitlyOptions } options - Indicates the authenticator-specific options for the request.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        createAccountImplicitly(options: CreateAccountImplicitlyOptions, callback: AuthCallback): void;
        /**
         * Authenticates an application account to get an oauth token.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } authType - Indicates the authentication type.
         * @param { string } callerBundleName - Indicates the caller bundle name.
         * @param { object } options - Indicates the authenticator-specific options for the request.
         * @param { AuthenticatorCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Authenticator#auth
         */
        authenticate(name: string, authType: string, callerBundleName: string, options: {
            [key: string]: any;
        }, callback: AuthenticatorCallback): void;
        /**
         * Authenticates an application account to get an oauth token.
         *
         * @param { string } name - Indicates the account name.
         * @param { string } authType - Indicates the authentication type.
         * @param { Record<string, Object> } options - Indicates the authenticator-specific options for the request.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        auth(name: string, authType: string, options: Record<string, Object>, callback: AuthCallback): void;
        /**
         * Verifies the credential to ensure the user is the owner of the specified application account.
         * <p>
         * The credential can be provided in the options, otherwise an Ability will normally be returned,
         * which can be started by the caller to further verify credential.
         *
         * @param { string } name - Indicates the name of the application account.
         * @param { VerifyCredentialOptions } options - Indicates the options for verifying credential.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        verifyCredential(name: string, options: VerifyCredentialOptions, callback: AuthCallback): void;
        /**
         * Sets properties for the authenticator.
         *
         * @param { SetPropertiesOptions } options - Indicates the options for setting properties.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        setProperties(options: SetPropertiesOptions, callback: AuthCallback): void;
        /**
         * Checks whether a particular account has all specified labels.
         *
         * @param { string } name - Indicates the account name.
         * @param { Array<string> } labels - Indicates an array of labels to check.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAccountLabels(name: string, labels: Array<string>, callback: AuthCallback): void;
        /**
         * Checks whether the specified account can be removed.
         *
         * @param { string } name - Indicates the account name.
         * @param { AuthCallback } callback - Indicates the authenticator callback.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        checkAccountRemovable(name: string, callback: AuthCallback): void;
        /**
         * Gets the remote object of the authenticator for remote procedure call.
         *
         * @returns { rpc.RemoteObject } Returns a remote object.
         * @syscap SystemCapability.Account.AppAccount
         * @since 9
         */
        getRemoteObject(): rpc.RemoteObject;
    }
}
export default appAccount;
