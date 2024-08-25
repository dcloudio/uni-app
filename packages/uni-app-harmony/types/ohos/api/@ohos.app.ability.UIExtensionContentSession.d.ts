/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
 * @kit AbilityKit
 */
import type { AbilityResult } from './ability/abilityResult';
import type AbilityStartCallback from './application/AbilityStartCallback';
import type { AsyncCallback } from './@ohos.base';
import type uiExtension from './@ohos.arkui.uiExtension';
/**
 * class of ui extension content session.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @since 10
 */
export default class UIExtensionContentSession {
    /**
     * Loads an UI extension content.
     *
     * @param { string } path - Path of the page to which the content will be loaded
     * @param { LocalStorage } [storage] - The data object shared within the content instance loaded by the page
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    loadContent(path: string, storage?: LocalStorage): void;
    /**
     * Destroys the UI extension.
     *
     * @param { AsyncCallback<void> } callback - The callback of terminateSelf.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    terminateSelf(callback: AsyncCallback<void>): void;
    /**
     * Destroys the UI extension.
     *
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    terminateSelf(): Promise<void>;
    /**
     * Destroys the UI extension while returning the specified result code and data to the caller.
     *
     * @param { AbilityResult } parameter - Indicates the result to return.
     * @param { AsyncCallback<void> } callback - The callback of terminateSelfWithResult.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    terminateSelfWithResult(parameter: AbilityResult, callback: AsyncCallback<void>): void;
    /**
     * Destroys the UI extension while returning the specified result code and data to the caller.
     *
     * @param { AbilityResult } parameter - Indicates the result to return.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    terminateSelfWithResult(parameter: AbilityResult): Promise<void>;
    /**
     * Sets whether this window is in privacy mode.
     *
     * @permission ohos.permission.PRIVACY_WINDOW
     * @param { boolean } isPrivacyMode - Whether the window is in privacy mode. The value true means that
     *                                    the window is in privacy mode, and false means the opposite.
     * @returns { Promise<void> } Promise that returns no value.
     * @throws { BusinessError } 201 - The application does not have permission to call the interface.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    setWindowPrivacyMode(isPrivacyMode: boolean): Promise<void>;
    /**
     * Sets whether this window is in privacy mode.
     *
     * @permission ohos.permission.PRIVACY_WINDOW
     * @param { boolean } isPrivacyMode - Whether the window is in privacy mode. The value true means that
     *                                    the window is in privacy mode, and false means the opposite.
     * @param { AsyncCallback<void> } callback - Callback used to return the result.
     * @throws { BusinessError } 201 - The application does not have permission to call the interface.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    setWindowPrivacyMode(isPrivacyMode: boolean, callback: AsyncCallback<void>): void;
    /**
     * Starts the UIAbility or UIExtensionAbility by type.
     * If the target ability is visible, you can start the target ability; If the target ability is invisible,
     * you need to apply for permission:ohos.permission.START_INVISIBLE_ABILITY to start target invisible ability.
     *
     * @param { string } type - The type of target ability.
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @param { AbilityStartCallback } abilityStartCallback - Indicates the abilityStartCallback.
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 201 - The application does not have permission to call the interface.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    /**
     * Starts the UIAbility or UIExtensionAbility by type.
     *
     * @param { string } type - The type of target ability.
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @param { AbilityStartCallback } abilityStartCallback - Indicates the abilityStartCallback.
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 12
     */
    startAbilityByType(type: string, wantParam: Record<string, Object>, abilityStartCallback: AbilityStartCallback, callback: AsyncCallback<void>): void;
    /**
     * Starts the UIAbility or UIExtensionAbility by type.
     * If the target ability is visible, you can start the target ability; If the target ability is invisible,
     * you need to apply for permission:ohos.permission.START_INVISIBLE_ABILITY to start target invisible ability.
     *
     * @param { string } type - The type of target ability.
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @param { AbilityStartCallback } abilityStartCallback - Indicates the abilityStartCallback.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - The application does not have permission to call the interface.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    /**
     * Starts the UIAbility or UIExtensionAbility by type.
     *
     * @param { string } type - The type of target ability.
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @param { AbilityStartCallback } abilityStartCallback - Indicates the abilityStartCallback.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 12
     */
    startAbilityByType(type: string, wantParam: Record<string, Object>, abilityStartCallback: AbilityStartCallback): Promise<void>;
    /**
     * Get the UIExtension Window proxy.
     *
     * @returns { uiExtension.WindowProxy } Returns the UIExtension Window proxy.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 12
     */
    getUIExtensionWindowProxy(): uiExtension.WindowProxy;
}
