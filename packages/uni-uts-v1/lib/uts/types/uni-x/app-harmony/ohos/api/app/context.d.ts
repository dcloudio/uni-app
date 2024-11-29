/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit AbilityKit
 */
import { AsyncCallback } from '../@ohos.base';
import { ApplicationInfo } from '../bundle/applicationInfo';
import { ProcessInfo } from './processInfo';
import { ElementName } from '../bundle/elementName';
import BaseContext from '../application/BaseContext';
import { HapModuleInfo } from '../bundle/hapModuleInfo';
import { AppVersionInfo } from './appVersionInfo';
import { AbilityInfo } from '../bundle/abilityInfo';
import bundle from '../@ohos.bundle';
/**
 * The context of an ability or an application.  It allows access to
 * application-specific resources, request and verification permissions.
 * Can only be obtained through the ability.
 *
 * @interface Context
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @FAModelOnly
 * @since 6
 */
export interface Context extends BaseContext {
    /**
     * Get the local root dir of an app. If it is the first call, the dir
     * will be created.
     * If in the context of the ability, return the root dir of
     * the ability; if in the context of the application, return the
     * root dir of the application.
     *
     * @returns { Promise<string> } the root dir
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getOrCreateLocalDir(): Promise<string>;
    /**
     * Get the local root dir of an app. If it is the first call, the dir
     * will be created.
     * If in the context of the ability, return the root dir of
     * the ability; if in the context of the application, return the
     * root dir of the application.
     *
     * @param { AsyncCallback<string> } callback - Returns the local root directory of the application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getOrCreateLocalDir(callback: AsyncCallback<string>): void;
    /**
     * Verify whether the specified permission is allowed for a particular
     * pid and uid running in the system.
     * Pid and uid are optional. If you do not pass in pid and uid,
     * it will check your own permission.
     *
     * @param { string } permission - The name of the specified permission.
     * @param { PermissionOptions } [options] - Permission Options.
     * @returns { Promise<number> } asynchronous callback with {@code 0} if the PID
     *                              and UID have the permission; callback with {@code -1} otherwise.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    verifyPermission(permission: string, options?: PermissionOptions): Promise<number>;
    /**
     * Verify whether the specified permission is allowed for a particular
     * pid and uid running in the system.
     * Pid and uid are optional. If you do not pass in pid and uid,
     * it will check your own permission.
     *
     * @param { string } permission - The name of the specified permission
     * @param { PermissionOptions } options - Permission Options
     * @param { AsyncCallback<number> } callback - Return permission verification result, 0 has permission,
     *                                           -1 has no permission.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    verifyPermission(permission: string, options: PermissionOptions, callback: AsyncCallback<number>): void;
    /**
     * Verify whether the specified permission is allowed for a particular
     * pid and uid running in the system.
     * Pid and uid are optional. If you do not pass in pid and uid,
     * it will check your own permission.
     *
     * @param { string } permission - The name of the specified permission
     * @param { AsyncCallback<number> } callback - Return permission verification result, 0 has permission,
     *                                           -1 has no permission.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    verifyPermission(permission: string, callback: AsyncCallback<number>): void;
    /**
     * Requests certain permissions from the system.
     *
     * @param { Array<string> } permissions - Indicates the list of permissions to be requested.parameter cannot be null.
     * @param { number } requestCode - Indicates the request code to be passed to the PermissionRequestResult
     * @param { AsyncCallback<PermissionRequestResult> } resultCallback - Return authorization result information.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    requestPermissionsFromUser(permissions: Array<string>, requestCode: number, resultCallback: AsyncCallback<PermissionRequestResult>): void;
    /**
     * Requests certain permissions from the system.
     *
     * @param { Array<string> } permissions - Indicates the list of permissions to be requested.Parameter cannot be null.
     * @param { number } requestCode - Indicates the request code to be passed to the PermissionRequestResult
     * @returns { Promise<PermissionRequestResult> } Indicates the request code to be passed to PermissionRequestResult.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    requestPermissionsFromUser(permissions: Array<string>, requestCode: number): Promise<PermissionRequestResult>;
    /**
     * Obtains information about the current application.
     *
     * @param { AsyncCallback<ApplicationInfo> } callback - Returns information about the current application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getApplicationInfo(callback: AsyncCallback<ApplicationInfo>): void;
    /**
     * Obtains information about the current application.
     *
     * @returns { Promise<ApplicationInfo> } Information about the current application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getApplicationInfo(): Promise<ApplicationInfo>;
    /**
     * Obtains the bundle name of the current ability.
     *
     * @param { AsyncCallback<string> } callback - Returns the Bundle name of the current capability.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getBundleName(callback: AsyncCallback<string>): void;
    /**
     * Obtains the bundle name of the current ability.
     *
     * @returns { Promise<string> } The Bundle name of the current capability.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getBundleName(): Promise<string>;
    /**
     * Obtains the current display orientation of this ability.
     *
     * @param { AsyncCallback<bundle.DisplayOrientation> } callback - Indicates the realistic direction of the screen.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getDisplayOrientation(callback: AsyncCallback<bundle.DisplayOrientation>): void;
    /**
     * Obtains the current display orientation of this ability.
     *
     * @returns { Promise<bundle.DisplayOrientation> } Indicates the screen display direction.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getDisplayOrientation(): Promise<bundle.DisplayOrientation>;
    /**
     * Obtains the absolute path to the application-specific cache directory
     *
     * @param { AsyncCallback<string> } callback - Returns the absolute path of the application's cache directory.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 6
     * @deprecated since 7
     */
    getExternalCacheDir(callback: AsyncCallback<string>): void;
    /**
     * Obtains the absolute path to the application-specific cache directory
     *
     * @returns { Promise<string> } Return the cache directory of the application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 6
     * @deprecated since 7
     */
    getExternalCacheDir(): Promise<string>;
    /**
     * Sets the display orientation of the current ability.
     *
     * @param { bundle.DisplayOrientation } orientation - Indicates the new orientation for the current ability.
     * @param { AsyncCallback<void> } callback - Indicates the realistic direction of the screen.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    setDisplayOrientation(orientation: bundle.DisplayOrientation, callback: AsyncCallback<void>): void;
    /**
     * Sets the display orientation of the current ability.
     *
     * @param { bundle.DisplayOrientation } orientation - Indicates the new orientation for the current ability.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    setDisplayOrientation(orientation: bundle.DisplayOrientation): Promise<void>;
    /**
     * Sets whether to show this ability on top of the lock screen whenever the lock screen is displayed, keeping the
     * ability in the ACTIVE state.
     * The interface can only take effect in API8 and below versions.
     *
     * @param { boolean } show - Specifies whether to show this ability on top of the lock screen. The value true means
     *                           to show it on the lock screen, and the value false means not.
     * @param { AsyncCallback<void> } callback - Returns the callback result.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window/window.WindowStage#setShowOnLockScreen
     */
    setShowOnLockScreen(show: boolean, callback: AsyncCallback<void>): void;
    /**
     * Sets whether to show this ability on top of the lock screen whenever the lock screen is displayed, keeping the
     * ability in the ACTIVE state.
     * The interface can only take effect in API8 and below versions.
     *
     * @param { boolean } show - Specifies whether to show this ability on top of the lock screen. The value true means to
     *                           show it on the lock screen, and the value false means not.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window/window.WindowStage#setShowOnLockScreen
     */
    setShowOnLockScreen(show: boolean): Promise<void>;
    /**
     * Sets whether to wake up the screen when this ability is restored.
     *
     * @param { boolean } wakeUp - Specifies whether to wake up the screen. The value true means to wake it up,
     *                             and the value false means not.
     * @param { AsyncCallback<void> } callback - Returns the callback result.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     * @deprecated since 12
     * @useinstead ohos.window.Window#setWakeUpScreen
     */
    setWakeUpScreen(wakeUp: boolean, callback: AsyncCallback<void>): void;
    /**
     * Sets whether to wake up the screen when this ability is restored.
     *
     * @param { boolean } wakeUp - Specifies whether to wake up the screen. The value true means to wake it up, and the
     *                             value false means not.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     * @deprecated since 12
     * @useinstead ohos.window.Window#setWakeUpScreen
     */
    setWakeUpScreen(wakeUp: boolean): Promise<void>;
    /**
     * Obtains information about the current process, including the process ID and name.
     *
     * @param { AsyncCallback<ProcessInfo> } callback - Return current process information.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getProcessInfo(callback: AsyncCallback<ProcessInfo>): void;
    /**
     * Obtains information about the current process, including the process ID and name.
     *
     * @returns { Promise<ProcessInfo> } Information about the current process.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getProcessInfo(): Promise<ProcessInfo>;
    /**
     * Obtains the ohos.bundle.ElementName object of the current ability.This method is available only to Page abilities.
     *
     * @param { AsyncCallback<ElementName> } callback - Returns the ohos.bundle.ElementName of the current capability.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getElementName(callback: AsyncCallback<ElementName>): void;
    /**
     * Obtains the ohos.bundle.ElementName object of the current ability.This method is available only to Page abilities.
     *
     * @returns { Promise<ElementName> } The ohos.bundle.ElementName object of the current capability.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getElementName(): Promise<ElementName>;
    /**
     * Obtains the name of the current process.
     *
     * @param { AsyncCallback<string> } callback - Return current process name.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getProcessName(callback: AsyncCallback<string>): void;
    /**
     * Obtains the name of the current process.
     *
     * @returns { Promise<string> } Returns the name of the current process.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getProcessName(): Promise<string>;
    /**
     * Obtains the bundle name of the ability that called the current ability.
     *
     * @param { AsyncCallback<string> } callback - Returns the Bundle name of the ability caller.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getCallingBundle(callback: AsyncCallback<string>): void;
    /**
     * Obtains the bundle name of the ability that called the current ability.
     *
     * @returns { Promise<string> } Returns the Bundle name of the ability caller.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getCallingBundle(): Promise<string>;
    /**
     * Obtains the file directory of this application on the internal storage.
     *
     * @param { AsyncCallback<string> } callback - Return the file directory of this application on internal storage.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 6
     */
    getFilesDir(callback: AsyncCallback<string>): void;
    /**
     * Obtains the file directory of this application on the internal storage.
     *
     * @returns { Promise<string> } Return the file directory of this application on internal storage.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 6
     */
    getFilesDir(): Promise<string>;
    /**
     * Obtains the cache directory of this application on the internal storage.
     *
     * @param { AsyncCallback<string> } callback - Returns the internal storage directory of the application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 6
     */
    getCacheDir(callback: AsyncCallback<string>): void;
    /**
     * Obtains the cache directory of this application on the internal storage.
     *
     * @returns { Promise<string> } Returns the internal storage directory of the application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 6
     */
    getCacheDir(): Promise<string>;
    /**
     * Obtains the distributed file path for storing ability or application data files.
     * If the distributed file path does not exist, the system will create a path and return the created path.
     *
     * @returns { Promise<string> } Returns the distributed file path of the Ability or application. If it is the first
     *                              call, a directory will be created.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getOrCreateDistributedDir(): Promise<string>;
    /**
     * Obtains the distributed file path for storing ability or application data files.
     * If the distributed file path does not exist, the system will create a path and return the created path.
     *
     * @param { AsyncCallback<string> } callback - Returns the distributed file path of Ability or application.
     *                                  If the path does not exist,the system will create a path and return the created path.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getOrCreateDistributedDir(callback: AsyncCallback<string>): void;
    /**
     * Obtains the application type.
     *
     * @param { AsyncCallback<string> } callback - Returns the type of the current application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getAppType(callback: AsyncCallback<string>): void;
    /**
     * Obtains the application type.
     *
     * @returns { Promise<string> } Returns the type of this app.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getAppType(): Promise<string>;
    /**
     * Obtains the ModuleInfo object for this application.
     *
     * @param { AsyncCallback<HapModuleInfo> } callback - Returns the ModuleInfo object of the application.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getHapModuleInfo(callback: AsyncCallback<HapModuleInfo>): void;
    /**
     * Obtains the ModuleInfo object for this application.
     *
     * @returns { Promise<HapModuleInfo> } Return to the ModuleInfo of the application and enjoy it.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getHapModuleInfo(): Promise<HapModuleInfo>;
    /**
     * Obtains the application version information.
     *
     * @param { AsyncCallback<AppVersionInfo> } callback - Return application version information.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getAppVersionInfo(callback: AsyncCallback<AppVersionInfo>): void;
    /**
     * Obtains the application version information.
     *
     * @returns { Promise<AppVersionInfo> } Return application version information.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getAppVersionInfo(): Promise<AppVersionInfo>;
    /**
     * Obtains the context of this application.
     *
     * @returns { Context } Return application context information.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getApplicationContext(): Context;
    /**
     * Checks the detailed information of this ability.
     *
     * @param { AsyncCallback<AbilityInfo> } callback - Return the detailed information of the current belonging Ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getAbilityInfo(callback: AsyncCallback<AbilityInfo>): void;
    /**
     * Checks the detailed information of this ability.
     *
     * @returns { Promise<AbilityInfo> } Return the detailed information of the current belonging Ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    getAbilityInfo(): Promise<AbilityInfo>;
    /**
     * Checks whether the configuration of this ability is changing.
     *
     * @param { AsyncCallback<boolean> } callback - True if the configuration of the capability is being changed, otherwise false.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    isUpdatingConfigurations(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the configuration of this ability is changing.
     *
     * @returns { Promise<boolean> } true if the configuration of this ability is changing and false otherwise.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    isUpdatingConfigurations(): Promise<boolean>;
    /**
     * Inform the system of the time required for drawing this Page ability.
     *
     * @param { AsyncCallback<void> } callback - Represents the specified callback method.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    printDrawnCompleted(callback: AsyncCallback<void>): void;
    /**
     * Inform the system of the time required for drawing this Page ability.
     *
     * @returns { Promise<void> } The promise form returns the result.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    printDrawnCompleted(): Promise<void>;
}
/**
 * @typedef PermissionRequestResult
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @FAModelOnly
 * @since 7
 */
interface PermissionRequestResult {
    /**
     * @type { number }
     * @default The request code passed in by the user
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    requestCode: number;
    /**
     * @type { Array<string> }
     * @default The permissions passed in by the user
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    permissions: Array<string>;
    /**
     * @type { Array<number> }
     * @default The results for the corresponding request permissions
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    authResults: Array<number>;
}
/**
 * @typedef PermissionOptions
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @FAModelOnly
 * @since 7
 */
interface PermissionOptions {
    /**
     * @type { ?number }
     * @default The process id
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    pid?: number;
    /**
     * @type { ?number }
     * @default The user id
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 7
     */
    uid?: number;
}
