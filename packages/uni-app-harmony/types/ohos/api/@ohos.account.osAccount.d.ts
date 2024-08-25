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
import type distributedAccount from './@ohos.account.distributedAccount';
import type { AsyncCallback } from './@ohos.base';
/**
 * This module provides the capability to manage os accounts.
 *
 * @namespace osAccount
 * @syscap SystemCapability.Account.OsAccount
 * @since 7
 */
declare namespace osAccount {
    /**
     * Obtains the AccountManager instance.
     *
     * @returns { AccountManager } Returns the instance of the AccountManager.
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    function getAccountManager(): AccountManager;
    /**
     * Provides abilities for you to manage and perform operations on your OS accounts.
     *
     * @interface AccountManager
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    interface AccountManager {
        /**
         * Checks whether the function of supporting multiple OS accounts is enabled.
         *
         * @param { AsyncCallback<boolean> } callback - Returns {@code true} if this function is enabled; returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkMultiOsAccountEnabled
         */
        isMultiOsAccountEnable(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the function of supporting multiple OS accounts is enabled.
         *
         * @returns { Promise<boolean> } Returns {@code true} if this function is enabled; returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkMultiOsAccountEnabled
         */
        isMultiOsAccountEnable(): Promise<boolean>;
        /**
         * Checks whether the function of supporting multiple OS accounts is enabled.
         *
         * @param { AsyncCallback<boolean> } callback - Returns {@code true} if this function is enabled; returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        checkMultiOsAccountEnabled(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the function of supporting multiple OS accounts is enabled.
         *
         * @returns { Promise<boolean> } Returns {@code true} if this function is enabled; returns {@code false} otherwise.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        checkMultiOsAccountEnabled(): Promise<boolean>;
        /**
         * Checks whether an OS account is activated based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the OS account is activated.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountActivated
         */
        isOsAccountActived(localId: number, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether an OS account is activated based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<boolean> } Returns {@code true} if the OS account is activated; returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountActivated
         */
        isOsAccountActived(localId: number): Promise<boolean>;
        /**
         * Checks whether an OS account is activated based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the OS account is activated.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        checkOsAccountActivated(localId: number, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether an OS account is activated based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<boolean> } - Returns {@code true} if the OS account is activated; returns {@code false} otherwise.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        checkOsAccountActivated(localId: number): Promise<boolean>;
        /**
         * Checks whether a constraint has been enabled for an OS account based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to check. The value can be:
         * <br> {@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         * <br> {@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         * <br> {@code constraint.calls.outgoing} - Indicates the constraint on making calls.
         * <br> {@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         * <br> from unknown sources.
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the constraint is enabled for the specified OS account.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountConstraintEnabled
         */
        isOsAccountConstraintEnable(localId: number, constraint: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether a constraint has been enabled for an OS account based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to check. The value can be:
         * <br> {@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         * <br> {@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         * <br> {@code constraint.calls.outgoing} - Indicates the constraint on making calls.
         * <br> {@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         * <br> from unknown sources.
         * @returns { Promise<boolean> } Returns {@code true} if the constraint has been enabled for the OS account;
         *         returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountConstraintEnabled
         */
        isOsAccountConstraintEnable(localId: number, constraint: string): Promise<boolean>;
        /**
         * Checks whether the given constraint is enabled for the specified OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to check. For example: the value can be:
         * <br> {@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         * <br> {@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         * <br> {@code constraint.calls.outgoing} - Indicates the constraint on making calls.
         * <br> {@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         * <br> from unknown sources.
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the constraint is enabled for the specified OS account.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId or constraint.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        checkOsAccountConstraintEnabled(localId: number, constraint: string, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the given constraint is enabled for the specified OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to check. For example: the value can be:
         * <br> {@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         * <br> {@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         * <br> {@code constraint.calls.outgoing} - Indicates the constraint on making calls.
         * <br> {@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         * <br> from unknown sources.
         * @returns { Promise<boolean> } Returns whether the given constraint is enabled for the specified OS account.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId or constraint.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        checkOsAccountConstraintEnabled(localId: number, constraint: string): Promise<boolean>;
        /**
         * Checks whether the given constraint is enabled for the current OS account.
         *
         * @param { string } constraint - Indicates the constraint to check. For example: the value can be:
         * <br> {@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         * <br> {@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         * <br> {@code constraint.calls.outgoing} - Indicates the constraint on making calls.
         * <br> {@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         * <br> from unknown sources.
         * @returns { Promise<boolean> } Returns whether the given constraint is enabled for the current OS account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 11
         */
        isOsAccountConstraintEnabled(constraint: string): Promise<boolean>;
        /**
         * Checks whether this OS account is a test OS account.
         *
         * @param { AsyncCallback<boolean> } callback - Returns {@code true} if this OS account is a test OS account; returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountTestable
         */
        isTestOsAccount(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether this OS account is a test OS account.
         *
         * @returns { Promise<boolean> } Returns {@code true} if this OS account is a test OS account; returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountTestable
         */
        isTestOsAccount(): Promise<boolean>;
        /**
         * Checks whether current OS account is testable.
         *
         * @param { AsyncCallback<boolean> } callback - Returns {@code true} if this account is testable; returns {@code false} otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        checkOsAccountTestable(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether current OS account is testable.
         *
         * @returns { Promise<boolean> } Returns {@code true} if this account is testable; returns {@code false} otherwise.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        checkOsAccountTestable(): Promise<boolean>;
        /**
         * Checks whether an OS account has been verified based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { AsyncCallback<boolean> } callback - Returns {@code true} if the OS account has been verified successfully;
         *          returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountVerified
         */
        isOsAccountVerified(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether an OS account has been verified based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<boolean> } callback - Returns {@code true} if the OS account has been verified successfully;
         *          returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountVerified
         */
        isOsAccountVerified(localId: number, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether an OS account has been verified based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<boolean> } Returns {@code true} if the OS account has been verified successfully;
         *          returns {@code false} otherwise.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountVerified
         */
        isOsAccountVerified(localId?: number): Promise<boolean>;
        /**
         * Checks whether the current OS account is verified.
         *
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the current OS account is verified.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         * @useinstead osAccount.AccountManager#isOsAccountUnlocked
         */
        checkOsAccountVerified(callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the current OS account is verified.
         *
         * @returns { Promise<boolean> } Returns whether the current OS account is verified.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         * @useinstead osAccount.AccountManager#isOsAccountUnlocked
         */
        checkOsAccountVerified(): Promise<boolean>;
        /**
         * Checks whether the specified OS account is verified.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the specified OS account is verified.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        checkOsAccountVerified(localId: number, callback: AsyncCallback<boolean>): void;
        /**
         * Checks whether the specified OS account is verified.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<boolean> } Returns whether the specified OS account is verified.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        checkOsAccountVerified(localId: number): Promise<boolean>;
        /**
         * Checks whether the current OS account is unlocked.
         *
         * @returns { Promise<boolean> } Returns whether the current OS account is unlocked.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 11
         */
        isOsAccountUnlocked(): Promise<boolean>;
        /**
         * Gets the name of the OS account to which the caller belongs.
         *
         * @returns { Promise<string> } The promise returned by the function.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 12
         */
        getOsAccountName(): Promise<string>;
        /**
         * Obtains the number of all OS accounts created on a device.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { AsyncCallback<number> } callback - Returns the number of created OS accounts.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountCount
         */
        getCreatedOsAccountsCount(callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of all OS accounts created on a device.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns { Promise<number> } Returns the number of created OS accounts.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountCount
         */
        getCreatedOsAccountsCount(): Promise<number>;
        /**
         * Obtains the number of all OS accounts created on a device.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { AsyncCallback<number> } callback - Returns the number of created OS accounts.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * This API can be called only by system applications.
         * @since 9
         */
        getOsAccountCount(callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of all OS accounts created on a device.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns { Promise<number> } Returns the number of created OS accounts.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * This API can be called only by system applications.
         * @since 9
         */
        getOsAccountCount(): Promise<number>;
        /**
         * Obtains the local ID of an OS account from the current process UID.
         *
         * @param { AsyncCallback<number> } callback - Returns the local ID of the OS account.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalId
         */
        getOsAccountLocalIdFromProcess(callback: AsyncCallback<number>): void;
        /**
         * Obtains the local ID of an OS account from the current process UID.
         *
         * @returns { Promise<number> } Returns the local ID of the OS account.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalId
         */
        getOsAccountLocalIdFromProcess(): Promise<number>;
        /**
         * Gets the local ID of the current OS account.
         *
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the local ID of the current OS account.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountLocalId(callback: AsyncCallback<number>): void;
        /**
         * Get the local ID of the current OS account.
         *
         * @returns { Promise<number> } Returns the local ID of the current account.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountLocalId(): Promise<number>;
        /**
         * Gets the local ID of an OS account from the process UID
         *
         * @param { number } uid - Indicates the process UID.
         * @param { AsyncCallback<number> } callback - Returns the local ID of the OS account.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForUid
         */
        getOsAccountLocalIdFromUid(uid: number, callback: AsyncCallback<number>): void;
        /**
         * Gets the local ID of an OS account from the process UID
         *
         * @param { number } uid - Indicates the process UID.
         * @returns { Promise<number> } Returns the local ID of the OS account.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForUid
         */
        getOsAccountLocalIdFromUid(uid: number): Promise<number>;
        /**
         * Gets the local ID of the OS account associated with the specified UID.
         *
         * @param { number } uid - Indicates the process UID.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the local ID of the OS account associated with the specified UID.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid uid.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountLocalIdForUid(uid: number, callback: AsyncCallback<number>): void;
        /**
         * Get the local ID of the OS account associated with the specified UID.
         *
         * @param { number } uid - Indicates the process UID.
         * @returns { Promise<number> } - Returns the local ID of the OS account associated with the specified UID.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid uid.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountLocalIdForUid(uid: number): Promise<number>;
        /**
         * Gets the local ID of the OS account associated with the specified UID synchronously.
         *
         * @param { number } uid - Indicates the process UID.
         * @returns { number } Returns the local ID of the OS account associated with the specified UID.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300002 - Invalid uid.
         * @syscap SystemCapability.Account.OsAccount
         * @since 10
         */
        getOsAccountLocalIdForUidSync(uid: number): number;
        /**
         * Queries the local ID of an OS account which is bound to the specified domain account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { DomainAccountInfo } domainInfo - Indicates the domain account info.
         * @param { AsyncCallback<number> } callback - Returns the local ID of the OS account.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForDomain
         */
        getOsAccountLocalIdFromDomain(domainInfo: DomainAccountInfo, callback: AsyncCallback<number>): void;
        /**
         * Queries the local ID of an OS account which is bound to the specified domain account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { DomainAccountInfo } domainInfo - Indicates the domain account info.
         * @returns { Promise<number> } Returns the local ID of the OS account.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForDomain
         */
        getOsAccountLocalIdFromDomain(domainInfo: DomainAccountInfo): Promise<number>;
        /**
         * Gets the local ID of the OS account associated with the specified domain account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { DomainAccountInfo } domainInfo - Indicates the domain account info.
         * @param { AsyncCallback<number> } callback - Indicates the callback for
         *   getting the local ID of the OS account associated with the specified domain account.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid domainInfo.
         * @syscap SystemCapability.Account.OsAccount
         * This API can be called only by system applications.
         * @since 9
         */
        getOsAccountLocalIdForDomain(domainInfo: DomainAccountInfo, callback: AsyncCallback<number>): void;
        /**
         * Gets the local ID of the OS account associated with the specified domain account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { DomainAccountInfo } domainInfo - Indicates the domain account info.
         * @returns { Promise<number> } Returns the local ID of the OS account associated with the specified domain account.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid domainInfo.
         * @syscap SystemCapability.Account.OsAccount
         * This API can be called only by system applications.
         * @since 9
         */
        getOsAccountLocalIdForDomain(domainInfo: DomainAccountInfo): Promise<number>;
        /**
         * Obtains all constraints of an OS account based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<Array<string>> } callback - Returns a list of constraints.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountConstraints
         */
        getOsAccountAllConstraints(localId: number, callback: AsyncCallback<Array<string>>): void;
        /**
         * Obtains all constraints of an OS account based on its local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<Array<string>> } Returns a list of constraints.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountConstraints
         */
        getOsAccountAllConstraints(localId: number): Promise<Array<string>>;
        /**
         * Obtains all constraints of an account based on its ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<Array<string>> } callback - Returns a list of constraints.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        getOsAccountConstraints(localId: number, callback: AsyncCallback<Array<string>>): void;
        /**
         * Obtains all constraints of an account based on its ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<Array<string>> } Returns a list of constraints.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        getOsAccountConstraints(localId: number): Promise<Array<string>>;
        /**
         * Queries the id list of all activated OS accounts.
         *
         * @param { AsyncCallback<Array<number>> } callback - Returns a id list of OS accounts.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getActivatedOsAccountLocalIds
         */
        queryActivatedOsAccountIds(callback: AsyncCallback<Array<number>>): void;
        /**
         * Queries the id list of all activated OS accounts.
         *
         * @returns { Promise<Array<number>> } Returns a id list of OS accounts.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getActivatedOsAccountLocalIds
         */
        queryActivatedOsAccountIds(): Promise<Array<number>>;
        /**
         * Gets the local IDs of all activated OS accounts.
         *
         * @param { AsyncCallback<Array<number>> } callback - Indicates the callback for getting the local IDs of all activated OS accounts.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getActivatedOsAccountLocalIds(callback: AsyncCallback<Array<number>>): void;
        /**
         * Gets the local IDs of all activated OS accounts.
         *
         * @returns { Promise<Array<number>> } Returns all activated accounts.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getActivatedOsAccountLocalIds(): Promise<Array<number>>;
        /**
         * Queries information about the current OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { AsyncCallback<OsAccountInfo> } callback - Returns information about the current OS account; returns {@code null} if the query fails.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getCurrentOsAccount
         */
        queryCurrentOsAccount(callback: AsyncCallback<OsAccountInfo>): void;
        /**
         * Queries information about the current OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns { Promise<OsAccountInfo> } Returns information about the current OS account; returns {@code null} if the query fails.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getCurrentOsAccount
         */
        queryCurrentOsAccount(): Promise<OsAccountInfo>;
        /**
         * Gets information about the current OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { AsyncCallback<OsAccountInfo> } callback - Returns information about the current OS account; returns {@code null} if the query fails.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        /**
         * Gets information about the current OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.GET_LOCAL_ACCOUNTS
         * @param { AsyncCallback<OsAccountInfo> } callback - Returns information about the current OS account; returns {@code null} if the query fails.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 10
         * @deprecated since 11
         */
        getCurrentOsAccount(callback: AsyncCallback<OsAccountInfo>): void;
        /**
         * Gets information about the current OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns { Promise<OsAccountInfo> } Returns information about the current OS account; returns {@code null} if the query fails.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         * @deprecated since 11
         */
        /**
         * Gets information about the current OS account.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.GET_LOCAL_ACCOUNTS
         * @returns { Promise<OsAccountInfo> } Returns information about the current OS account; returns {@code null} if the query fails.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 10
         * @deprecated since 11
         */
        getCurrentOsAccount(): Promise<OsAccountInfo>;
        /**
         * Obtains the type of this OS account from the current process.
         *
         * @param { AsyncCallback<OsAccountType> } callback - Returns the OS account type. The value can be {@link OsAccountType#ADMIN},
         *         {@link OsAccountType#NORMAL}, and {@link OsAccountType#GUEST}.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountType
         */
        getOsAccountTypeFromProcess(callback: AsyncCallback<OsAccountType>): void;
        /**
         * Obtains the type of this OS account from the current process.
         *
         * @returns { Promise<OsAccountType> } Returns the OS account type. The value can be {@link OsAccountType#ADMIN},
         *         {@link OsAccountType#NORMAL}, and {@link OsAccountType#GUEST}.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountType
         */
        getOsAccountTypeFromProcess(): Promise<OsAccountType>;
        /**
         * Obtains the type of this OS account from the current process.
         *
         * @param { AsyncCallback<OsAccountType> } callback - Returns the OS account type. The value can be {@link OsAccountType#ADMIN},
         *         {@link OsAccountType#NORMAL}, and {@link OsAccountType#GUEST}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountType(callback: AsyncCallback<OsAccountType>): void;
        /**
         * Obtains the type of this OS account from the current process.
         *
         * @returns { Promise<OsAccountType> } Returns the OS account type. The value can be {@link OsAccountType#ADMIN},
         *         {@link OsAccountType#NORMAL}, and {@link OsAccountType#GUEST}.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountType(): Promise<OsAccountType>;
        /**
         * Obtains the distributed virtual device ID (DVID).
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to obtain the DVIDs.
         * The same application running on different devices obtains the same DVID, whereas different applications
         * obtain different DVIDs.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC or ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { AsyncCallback<string> } callback - Returns the DVID if obtained; returns an empty string if no OHOS account has logged in.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#queryDistributedVirtualDeviceId
         */
        getDistributedVirtualDeviceId(callback: AsyncCallback<string>): void;
        /**
         * Obtains the distributed virtual device ID (DVID).
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to obtain the DVIDs.
         * The same application running on different devices obtains the same DVID, whereas different applications
         * obtain different DVIDs.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC or ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns { Promise<string> } Returns the DVID if obtained; returns an empty string if no OHOS account has logged in.
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#queryDistributedVirtualDeviceId
         */
        getDistributedVirtualDeviceId(): Promise<string>;
        /**
         * Queries the distributed virtual device ID (DVID).
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to obtain the DVIDs.
         * The same application running on different devices obtains the same DVID, whereas different applications
         * obtain different DVIDs.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC or ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { AsyncCallback<string> } callback - Returns the DVID if obtained; returns an empty string if no OHOS account has logged in.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        queryDistributedVirtualDeviceId(callback: AsyncCallback<string>): void;
        /**
         * Queries the distributed virtual device ID (DVID).
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to obtain the DVIDs.
         * The same application running on different devices obtains the same DVID, whereas different applications
         * obtain different DVIDs.
         * <p>
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC or ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns { Promise<string> } Returns the DVID if obtained; returns an empty string if no OHOS account has logged in.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        queryDistributedVirtualDeviceId(): Promise<string>;
        /**
         * Obtain localId according to serial number
         *
         * @param { number } serialNumber - Indicates serial number.
         * @param { AsyncCallback<number> } callback - Returns localId.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForSerialNumber
         */
        getOsAccountLocalIdBySerialNumber(serialNumber: number, callback: AsyncCallback<number>): void;
        /**
         * Obtain localId according to serial number
         *
         * @param { number } serialNumber - Indicates serial number.
         * @returns { Promise<number> } Returns localId.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForSerialNumber
         */
        getOsAccountLocalIdBySerialNumber(serialNumber: number): Promise<number>;
        /**
         * Gets the local ID of the OS account associated with the serial number.
         *
         * @param { number } serialNumber - Indicates serial number.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the local ID of the OS account associated with the serial number.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid serialNumber.
         * @throws { BusinessError } 12300003 - The account indicated by serialNumber dose not exist.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountLocalIdForSerialNumber(serialNumber: number, callback: AsyncCallback<number>): void;
        /**
         * Gets the local ID of the OS account associated with the serial number.
         *
         * @param { number } serialNumber - Indicates serial number.
         * @returns { Promise<number> } Returns the local ID of the OS account associated with the serial number.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid serialNumber.
         * @throws { BusinessError } 12300003 - The account indicated by serialNumber dose not exist.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getOsAccountLocalIdForSerialNumber(serialNumber: number): Promise<number>;
        /**
         * Obtain serial number according to localId.
         *
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<number> } callback - Returns serial number.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getSerialNumberForOsAccountLocalId
         */
        getSerialNumberByOsAccountLocalId(localId: number, callback: AsyncCallback<number>): void;
        /**
         * Obtain serial number according to localId.
         *
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<number> } Returns serial number.
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getSerialNumberForOsAccountLocalId
         */
        getSerialNumberByOsAccountLocalId(localId: number): Promise<number>;
        /**
         * Gets the serial number for the specified os account local id.
         *
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the serial number for the specified os account local id.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getSerialNumberForOsAccountLocalId(localId: number, callback: AsyncCallback<number>): void;
        /**
         * Gets the serial number for the specified os account local id.
         *
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<number> } Returns the serial number according to local ID.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameter types.
         * @throws { BusinessError } 12300001 - The system service works abnormally.
         * @throws { BusinessError } 12300002 - Invalid localId.
         * @throws { BusinessError } 12300003 - Account not found.
         * @syscap SystemCapability.Account.OsAccount
         * @since 9
         */
        getSerialNumberForOsAccountLocalId(localId: number): Promise<number>;
    }
    /**
     * Provides information about OS accounts, including the local ID, local name, and type of an OS account.
     *
     * @interface OsAccountInfo
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    interface OsAccountInfo {
        /**
         * The local ID of an OS account.
         *
         * @type { number }
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        localId: number;
        /**
         * The local name of an OS account.
         *
         * @type { string }
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        localName: string;
        /**
         * Include: ADMIN, Normal, GUEST.
         *
         * @type { OsAccountType }
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        type: OsAccountType;
        /**
         * Account constraints information.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        constraints: Array<string>;
        /**
         * The account is verified or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 11
         * @useinstead osAccount.OsAccountInfo#isUnlocked
         */
        isVerified: boolean;
        /**
         * The OS account is unlocked or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.Account.OsAccount
         * @since 11
         */
        isUnlocked: boolean;
        /**
         * OS account photo.
         *
         * @type { string }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        photo: string;
        /**
         * Os account create time.
         *
         * @type { number }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        createTime: number;
        /**
         * The last time to log in.
         *
         * @type { number }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        lastLoginTime: number;
        /**
         * Os account serial number.
         *
         * @type { number }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        serialNumber: number;
        /**
         * Os account is activated or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         * @deprecated since 11
         * @useinstead osAccount.OsAccountInfo#isActivated
         */
        isActived: boolean;
        /**
         * The OS account is activated or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.Account.OsAccount
         * @since 11
         */
        isActivated: boolean;
        /**
         * Os account create completed or not.
         *
         * @type { boolean }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        isCreateCompleted: boolean;
        /**
         * Distributed account info.
         *
         * @type { distributedAccount.DistributedInfo }
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        distributedInfo: distributedAccount.DistributedInfo;
        /**
         * Domain account info.
         *
         * @type { DomainAccountInfo }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        domainInfo: DomainAccountInfo;
    }
    /**
     * Provides information about domain accounts.
     *
     * @interface DomainAccountInfo
     * @syscap SystemCapability.Account.OsAccount
     * @since 8
     */
    interface DomainAccountInfo {
        /**
         * The domain name
         *
         * @type { string }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        domain: string;
        /**
         * The account name in the domain
         *
         * @type { string }
         * @syscap SystemCapability.Account.OsAccount
         * @since 8
         */
        accountName: string;
    }
    /**
     * Enumerates OS account types.
     *
     * @enum { number } OsAccountType
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    enum OsAccountType {
        /**
         * Indicates the administrator account, which has the permission to manage other OS accounts.
         *
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        ADMIN = 0,
        /**
         * Indicates a normal account, which has access to common functions of OS accounts.
         *
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        NORMAL,
        /**
         * Indicates a guest account, which is used to temporarily access the device and may be deleted at any time.
         *
         * @syscap SystemCapability.Account.OsAccount
         * @since 7
         */
        GUEST
    }
}
export default osAccount;
