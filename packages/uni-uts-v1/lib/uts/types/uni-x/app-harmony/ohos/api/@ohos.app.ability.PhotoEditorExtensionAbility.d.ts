/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
import ExtensionAbility from './@ohos.app.ability.ExtensionAbility';
import PhotoEditorExtensionContext from './application/PhotoEditorExtensionContext';
import type UIExtensionContentSession from './@ohos.app.ability.UIExtensionContentSession';
import type Want from './@ohos.app.ability.Want';
/**
 * Class of the photo editor ExtensionAbility, which provides APIs for you to edit photos.
 *
 * @extends ExtensionAbility
 * @syscap SystemCapability.Ability.AppExtension.PhotoEditorExtension
 * @StageModelOnly
 * @since 12
 */
export default class PhotoEditorExtensionAbility extends ExtensionAbility {
    /**
     * Indicates configuration information about an Photo editor extension ability context.
     *
     * @type { PhotoEditorExtensionContext }
     * @syscap SystemCapability.Ability.AppExtension.PhotoEditorExtension
     * @StageModelOnly
     * @since 12
     */
    context: PhotoEditorExtensionContext;
    /**
     * Called back when an UI extension is started for initialization.
     *
     * @syscap SystemCapability.Ability.AppExtension.PhotoEditorExtension
     * @StageModelOnly
     * @since 12
     */
    onCreate(): void;
    /**
     * Called back when the state of an UI extension changes to foreground.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 12
     */
    onForeground(): void;
    /**
     * Called back when the state of an UI extension changes to background.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 12
     */
    onBackground(): void;
    /**
     * Called back before an UI extension is destroyed.
     *
     * @returns { void | Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AppExtension.PhotoEditorExtension
     * @StageModelOnly
     * @since 12
     */
    onDestroy(): void | Promise<void>;
    /**
     * Called back when an UI extension session is created and original image is ready.
     *
     * @param { string } uri - Indicates the uri info of the original image.
     * @param { Want } want - Indicates the want info of the UI extension.
     * @param { UIExtensionContentSession } session - Indicates the session of the UI extension page.
     * @syscap SystemCapability.Ability.AppExtension.PhotoEditorExtension
     * @StageModelOnly
     * @since 12
     */
    onStartContentEditing(uri: string, want: Want, session: UIExtensionContentSession): void;
}
