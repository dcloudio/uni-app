/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
}
