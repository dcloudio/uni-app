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
 * @kit FormKit
 */
import { AsyncCallback } from './@ohos.base';
import formBindingData from './@ohos.app.form.formBindingData';
import formInfo from './@ohos.app.form.formInfo';
/**
 * Interface of formProvider.
 *
 * @namespace formProvider
 * @syscap SystemCapability.Ability.Form
 * @since 9
 */
/**
 * Interface of formProvider.
 *
 * @namespace formProvider
 * @syscap SystemCapability.Ability.Form
 * @atomicservice
 * @since 11
 */
declare namespace formProvider {
    /**
     * Set next update time for a specified form.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @param { AsyncCallback<void> } callback - The callback of setFormNextRefreshTime.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500060 - A service connection error happened, please try again later.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501002 - The number of forms exceeds upper bound.
     * @throws { BusinessError } 16501003 - The form can not be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Set next update time for a specified form.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @param { AsyncCallback<void> } callback - The callback of setFormNextRefreshTime.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - IPC connection error.
     * @throws { BusinessError } 16500060 - Service connection error.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501002 - The number of forms exceeds the maximum allowed.
     * @throws { BusinessError } 16501003 - The form cannot be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function setFormNextRefreshTime(formId: string, minute: number, callback: AsyncCallback<void>): void;
    /**
     * Set next update time for a specified form.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500060 - A service connection error happened, please try again later.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501002 - The number of forms exceeds upper bound.
     * @throws { BusinessError } 16501003 - The form can not be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Set next update time for a specified form.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - IPC connection error.
     * @throws { BusinessError } 16500060 - Service connection error.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501002 - The number of forms exceeds the maximum allowed.
     * @throws { BusinessError } 16501003 - The form cannot be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function setFormNextRefreshTime(formId: string, minute: number): Promise<void>;
    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @param { AsyncCallback<void> } callback - The callback of updateForm.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500060 - A service connection error happened, please try again later.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501003 - The form can not be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @param { AsyncCallback<void> } callback - The callback of updateForm.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - IPC connection error.
     * @throws { BusinessError } 16500060 - Service connection error.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501003 - The form cannot be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function updateForm(formId: string, formBindingData: formBindingData.FormBindingData, callback: AsyncCallback<void>): void;
    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500060 - A service connection error happened, please try again later.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501003 - The form can not be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     *
     * @param { string } formId - Indicates the form ID.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - IPC connection error.
     * @throws { BusinessError } 16500060 - Service connection error.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @throws { BusinessError } 16501001 - The ID of the form to be operated does not exist.
     * @throws { BusinessError } 16501003 - The form cannot be operated by the current application.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function updateForm(formId: string, formBindingData: formBindingData.FormBindingData): Promise<void>;
    /**
     * Get info of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     *
     * @param { formInfo.FormInfoFilter } filter - Indicates the requirements the forms that the formInfos belong to have to meet.
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the formInfo.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Get info of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     *
     * @param { formInfo.FormInfoFilter } filter - Indicates the requirements the forms that the formInfos belong to have to meet.
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the formInfo.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - IPC connection error.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function getFormsInfo(filter: formInfo.FormInfoFilter, callback: AsyncCallback<Array<formInfo.FormInfo>>): void;
    /**
     * Get infos of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     *
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the formInfo.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Get infos of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     *
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the formInfo.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - IPC connection error.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function getFormsInfo(callback: AsyncCallback<Array<formInfo.FormInfo>>): void;
    /**
     * Get infos of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     *
     * @param { formInfo.FormInfoFilter } [filter] - Indicates the requirements the forms that the formInfos belong to have to meet.
     * @returns { Promise<Array<formInfo.FormInfo>> } Returns the formInfo.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - An IPC connection error happened.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Get infos of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     *
     * @param { formInfo.FormInfoFilter } [filter] - Indicates the requirements the forms that the formInfos belong to have to meet.
     * @returns { Promise<Array<formInfo.FormInfo>> } Returns the formInfo.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 16500050 - IPC connection error.
     * @throws { BusinessError } 16500100 - Failed to obtain the configuration information.
     * @throws { BusinessError } 16501000 - An internal functional error occurred.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function getFormsInfo(filter?: formInfo.FormInfoFilter): Promise<Array<formInfo.FormInfo>>;
}
export default formProvider;
