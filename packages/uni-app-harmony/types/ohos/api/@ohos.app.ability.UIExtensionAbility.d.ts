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
import AbilityConstant from './@ohos.app.ability.AbilityConstant';
import ExtensionAbility from './@ohos.app.ability.ExtensionAbility';
import type UIExtensionContentSession from './@ohos.app.ability.UIExtensionContentSession';
import type UIExtensionContext from './application/UIExtensionContext';
import type Want from './@ohos.app.ability.Want';
/**
 * The class of UI extension ability.
 *
 * @extends ExtensionAbility
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @since 10
 */
export default class UIExtensionAbility extends ExtensionAbility {
    /**
     * Indicates configuration information about an UI extension ability context.
     *
     * @type { UIExtensionContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    context: UIExtensionContext;
    /**
     * Called back when an UI extension is started for initialization.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 10
     */
    /**
    * Called back when an UI extension is started for initialization.
    *
    * @param { AbilityConstant.LaunchParam } launchParam - Indicates the LaunchParam information about UIExtensionAbility.
    * @syscap SystemCapability.Ability.AbilityRuntime.Core
    * @StageModelOnly
    * @since 12
    */
    onCreate(launchParam: AbilityConstant.LaunchParam): void;
    /**
     * Called back when an UI extension session is created.
     *
     * @param { Want } want - Indicates the want info of the UI extension.
     * @param { UIExtensionContentSession } session - Indicates the session of the UI extension page.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 10
     */
    onSessionCreate(want: Want, session: UIExtensionContentSession): void;
    /**
     * Called back when an UI extension session is destroyed.
     *
     * @param { UIExtensionContentSession } session - Indicates the session of the UI extension page.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 10
     */
    onSessionDestroy(session: UIExtensionContentSession): void;
    /**
     * Called back when the state of an UI extension changes to foreground.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    onForeground(): void;
    /**
     * Called back when the state of an UI extension changes to background.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    onBackground(): void;
    /**
     * Called back before an UI extension is destroyed.
     *
     * @returns { void | Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 10
     */
    onDestroy(): void | Promise<void>;
}
