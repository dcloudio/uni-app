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
 * @kit IMEKit
 */
import { AsyncCallback } from './@ohos.base';
import Want from './@ohos.app.ability.Want';
import ExtensionContext from './application/ExtensionContext';
/**
 * The extension context class of input method.
 *
 * @extends ExtensionContext
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @StageModelOnly
 * @since 9
 */
export default class InputMethodExtensionContext extends ExtensionContext {
    /**
     * Destroy the input method extension.
     *
     * @param { AsyncCallback<void> } callback - the callback of destroy.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @StageModelOnly
     * @since 9
     */
    destroy(callback: AsyncCallback<void>): void;
    /**
     * Destroy the input method extension.
     *
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @StageModelOnly
     * @since 9
     */
    destroy(): Promise<void>;
    /**
     * Inputmethod extension uses this method to start a specific ability.
     *
     * @param { Want } want - Indicates the ability to start.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - parameter error. Possible causes:
     *         1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000005 - The specified process does not have the permission.
     * @throws { BusinessError } 16000006 - Cross-user operations are not allowed.
     * @throws { BusinessError } 16000008 - The crowdtesting application expires.
     * @throws { BusinessError } 16000009 - An ability cannot be started or stopped in Wukong mode.
     * @throws { BusinessError } 16000010 - The call with the continuation flag is forbidden.
     * @throws { BusinessError } 16000011 - The context does not exist.
     * @throws { BusinessError } 16000012 - The application is controlled.
     * @throws { BusinessError } 16000013 - The application is controlled by EDM.
     * @throws { BusinessError } 16000019 - Can not match any component.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000053 - The ability is not on the top of the UI.
     * @throws { BusinessError } 16000055 - Installation-free timed out.
     * @throws { BusinessError } 16000061 - Can not start component belongs to other bundle.
     * @throws { BusinessError } 16000069 - The extension cannot start the third party application.
     * @throws { BusinessError } 16000070 - The extension cannot start the service.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @StageModelOnly
     * @since 12
     */
    startAbility(want: Want): Promise<void>;
}
