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
import Want from './@ohos.app.ability.Want';
/**
 * interface of formInfo.
 *
 * @namespace formInfo
 * @syscap SystemCapability.Ability.Form
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.app.form.formInfo/formInfo
 */
declare namespace formInfo {
    /**
     * Provides information about a form.
     *
     * @typedef FormInfo
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formInfo/formInfo#FormInfo
     */
    interface FormInfo {
        /**
         * Obtains the bundle name of the application to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#bundleName
         */
        bundleName: string;
        /**
         * Obtains the name of the application module to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#moduleName
         */
        moduleName: string;
        /**
         * Obtains the class name of the ability to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#abilityName
         */
        abilityName: string;
        /**
         * Obtains the name of this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#name
         */
        name: string;
        /**
         * Obtains the name of this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#description
         */
        description: string;
        /**
         * Obtains the type of this form. Currently, JS forms are supported.
         *
         * @type { FormType }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#type
         */
        type: FormType;
        /**
         * Obtains the JS component name of this JS form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#jsComponentName
         */
        jsComponentName: string;
        /**
         * Obtains the color mode of this form.
         *
         * @type { ColorMode }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#colorMode
         */
        colorMode: ColorMode;
        /**
         * Checks whether this form is a default form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#isDefault
         */
        isDefault: boolean;
        /**
         * Obtains the updateEnabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#updateEnabled
         */
        updateEnabled: boolean;
        /**
         * Obtains whether notify visible of this form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#formVisibleNotify
         */
        formVisibleNotify: boolean;
        /**
         * Obtains the bundle relatedBundleName of the application to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         */
        relatedBundleName: string;
        /**
         * Obtains the scheduledUpdateTime.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#scheduledUpdateTime
         */
        scheduledUpdateTime: string;
        /**
         * Obtains the form config ability about this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#formConfigAbility
         */
        formConfigAbility: string;
        /**
         * Obtains the updateDuration.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#updateDuration
         */
        updateDuration: number;
        /**
         * Obtains the default grid style of this form.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#defaultDimension
         */
        defaultDimension: number;
        /**
         * Obtains the grid styles supported by this form.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#supportDimensions
         */
        supportDimensions: Array<number>;
        /**
         * Obtains the custom data defined in this form.
         *
         * @type { object }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormInfo#customizeData
         */
        customizeData: {
            [key: string]: [
                value: string
            ];
        };
    }
    /**
     * Type of form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formInfo/formInfo#FormType
     */
    enum FormType {
        /**
         * JS form.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormType#JS
         */
        JS = 1
    }
    /**
     * Color mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formInfo/formInfo#ColorMode
     */
    enum ColorMode {
        /**
         * Automatic mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.ColorMode#MODE_AUTO
         */
        MODE_AUTO = -1,
        /**
         * Dark mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.ColorMode#MODE_DARK
         */
        MODE_DARK = 0,
        /**
         * Light mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.ColorMode#MODE_LIGHT
         */
        MODE_LIGHT = 1
    }
    /**
     * Provides state information about a form.
     *
     * @typedef FormStateInfo
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formInfo/formInfo#FormStateInfo
     */
    interface FormStateInfo {
        /**
         * Obtains the form state.
         *
         * @type { FormState }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormStateInfo#formState
         */
        formState: FormState;
        /**
         * Obtains the want form .
         *
         * @type { Want }
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormStateInfo#want
         */
        want: Want;
    }
    /**
     * Provides state about a form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formInfo/formInfo#FormState
     */
    enum FormState {
        /**
         * Indicates that the form status is unknown due to an internal error.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormState#UNKNOWN
         */
        UNKNOWN = -1,
        /**
         * Indicates that the form is in the default state.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormState#DEFAULT
         */
        DEFAULT = 0,
        /**
         * Indicates that the form is ready.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormState#READY
         */
        READY = 1
    }
    /**
     * Parameter of form.
     *
     * @enum { string }
     * @syscap SystemCapability.Ability.Form
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.form.formInfo/formInfo#FormParam
     */
    enum FormParam {
        /**
         * Indicates the key specifying the grid style of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       DIMENSION_KEY: FormDimension.Dimension_1_2
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormParam#DIMENSION_KEY
         */
        DIMENSION_KEY = 'ohos.extra.param.key.form_dimension',
        /**
         * Indicates the key specifying the name of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       NAME_KEY: "formName"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormParam#NAME_KEY
         */
        NAME_KEY = 'ohos.extra.param.key.form_name',
        /**
         * Indicates the key specifying the name of the module to which the form to be obtained belongs, which is
         * represented as
         * want: {
         *   "parameters": {
         *       MODULE_NAME_KEY: "formEntry"
         *    }
         * }
         * This constant is mandatory.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormParam#MODULE_NAME_KEY
         */
        MODULE_NAME_KEY = 'ohos.extra.param.key.module_name',
        /**
         * Indicates the key specifying the width of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       WIDTH_KEY: 800
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormParam#WIDTH_KEY
         */
        WIDTH_KEY = 'ohos.extra.param.key.form_width',
        /**
         * Indicates the key specifying the height of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       HEIGHT_KEY: 400
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormParam#HEIGHT_KEY
         */
        HEIGHT_KEY = 'ohos.extra.param.key.form_height',
        /**
         * Indicates the key specifying whether a form is temporary, which is represented as
         * want: {
         *   "parameters": {
         *       TEMPORARY_KEY: true
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.form.formInfo/formInfo.FormParam#TEMPORARY_KEY
         */
        TEMPORARY_KEY = 'ohos.extra.param.key.form_temporary'
    }
}
export default formInfo;
