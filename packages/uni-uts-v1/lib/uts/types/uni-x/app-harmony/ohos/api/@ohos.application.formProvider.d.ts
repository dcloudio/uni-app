/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 */
import { AsyncCallback } from './@ohos.base';
import formBindingData from './@ohos.application.formBindingData';
/**
 * interface of formProvider.
 *
 * @namespace formProvider
 * @syscap SystemCapability.Ability.Form
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.app.form.formProvider/formProvider
 */
declare namespace formProvider {
    /**
     * Set next update time for a specified form.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @param { AsyncCallback<void> } callback - Callback function.
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formProvider/formProvider#setFormNextRefreshTime
     */
    function setFormNextRefreshTime(formId: string, minute: number, callback: AsyncCallback<void>): void;
    /**
     * Set next update time for a specified form.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formProvider/formProvider#setFormNextRefreshTime
     */
    function setFormNextRefreshTime(formId: string, minute: number): Promise<void>;
    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     *
     * @param { string } formId - Indicates the form ID
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data
     * @param { AsyncCallback<void> } callback - Callback function.
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formProvider/formProvider#updateForm
     */
    function updateForm(formId: string, formBindingData: formBindingData.FormBindingData, callback: AsyncCallback<void>): void;
    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     *
     * @param { string } formId - Indicates the form ID
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formProvider/formProvider#updateForm
     */
    function updateForm(formId: string, formBindingData: formBindingData.FormBindingData): Promise<void>;
}
export default formProvider;
