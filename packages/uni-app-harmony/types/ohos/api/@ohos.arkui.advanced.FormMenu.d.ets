/*
* Copyright (C) 2024 Huawei Device Co., Ltd.
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
 * @file Defines the form menu
 * @kit ArkUI
 */
import formBindingData from './@ohos.app.form.formBindingData';
import Want from './@ohos.app.ability.Want';
import { AsyncCallback } from './@ohos.base';
/**
 * Defines the form menu item style.
 *
 * @interface FormMenuItemStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 12
 */
export interface FormMenuItemStyle {
    /**
     * Defines options of the form menu.
     *
     * @type { ?MenuItemOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    options?: MenuItemOptions;
}
/**
 * Defines the add form options.
 *
 * @interface AddFormOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 12
 */
export interface AddFormOptions {
    /**
     * Indicates the form data.
     *
     * @type { ?formBindingData.FormBindingData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    formBindingData?: formBindingData.FormBindingData;
    /**
     * The callback is used to return the form id.
     *
     * @type { ?AsyncCallback<string> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    callback?: AsyncCallback<string>;
    /**
     * The style of the menu item.
     *
     * @type { ?FormMenuItemStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    style?: FormMenuItemStyle;
}
/**
 * Build function of AddFormMenuItem.
 *
 * @param { Want } want - The want of the form to publish.
 * @param { string } componentId - The id of the component used to get form snapshot.
 * @param { AddFormOptions } [options] - Add form options.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 12
 */
@Builder
export declare function AddFormMenuItem(want: Want, componentId: string, options?: AddFormOptions): void;
