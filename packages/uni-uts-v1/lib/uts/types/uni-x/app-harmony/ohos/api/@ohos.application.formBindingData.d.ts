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
 */
/**
 * interface of formBindingData.
 *
 * @namespace formBindingData
 * @syscap SystemCapability.Ability.Form
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.app.form.formBindingData/formBindingData
 */
declare namespace formBindingData {
    /**
     * Create an FormBindingData instance.
     *
     * @param { Object | string } [obj] - Indicates the FormBindingData instance data.
     * @returns { FormBindingData } Returns the {@link FormBindingData} instance.
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formBindingData/formBindingData#createFormBindingData
     */
    function createFormBindingData(obj?: Object | string): FormBindingData;
    /**
     * Defines the createFormBindingData result interface.
     *
     * @typedef FormBindingData
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formBindingData/formBindingData#FormBindingData
     */
    interface FormBindingData {
        /**
         * The data to be displayed on the js card. Can be a string in Object or json format that
         * contains several key-value pairs.
         *
         * @type { Object }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formBindingData/formBindingData#FormBindingData
         */
        data: Object;
    }
}
export default formBindingData;
