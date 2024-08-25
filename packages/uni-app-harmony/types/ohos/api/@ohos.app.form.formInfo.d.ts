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
import Want from './@ohos.app.ability.Want';
/**
 * interface of formInfo.
 *
 * @namespace formInfo
 * @syscap SystemCapability.Ability.Form
 * @since 9
 */
/**
 * interface of formInfo.
 *
 * @namespace formInfo
 * @syscap SystemCapability.Ability.Form
 * @atomicservice
 * @since 11
 */
declare namespace formInfo {
    /**
     * Provides information about a form.
     *
     * @typedef FormInfo
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Provides information about a form.
     *
     * @typedef FormInfo
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    interface FormInfo {
        /**
         * Obtains the bundle name of the application to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the bundle name of the application to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        bundleName: string;
        /**
         * Obtains the name of the application module to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the name of the application module to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        moduleName: string;
        /**
         * Obtains the class name of the ability to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the class name of the ability to which this form belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        abilityName: string;
        /**
         * Obtains the name of this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the name of this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * Obtains the display name of this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        displayName: string;
        /**
         * Obtains the displayName resource id of this form.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        displayNameId: number;
        /**
         * Obtains the description of this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the description of this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        description: string;
        /**
         * Obtains the description id of this form.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @since 10
         */
        /**
         * Obtains the description id of this form.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        descriptionId: number;
        /**
         * Obtains the type of this form. Currently, JS forms are supported.
         *
         * @type { FormType }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the type of this form. Currently, JS forms are supported.
         *
         * @type { FormType }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        type: FormType;
        /**
         * Obtains the JS component name of this JS form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the JS component name of this JS form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        jsComponentName: string;
        /**
         * Obtains the color mode of this form.
         *
         * @type { ColorMode }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the color mode of this form.
         *
         * @type { ColorMode }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        colorMode: ColorMode;
        /**
         * Checks whether this form is a default form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Checks whether this form is a default form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        isDefault: boolean;
        /**
         * Obtains the updateEnabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the updateEnabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        updateEnabled: boolean;
        /**
         * Obtains whether notify visible of this form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains whether notify visible of this form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        formVisibleNotify: boolean;
        /**
         * Obtains the scheduledUpdateTime.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the scheduledUpdateTime.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        scheduledUpdateTime: string;
        /**
         * Obtains the form config ability about this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the form config ability about this form.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        formConfigAbility: string;
        /**
         * Obtains the updateDuration.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the updateDuration.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        updateDuration: number;
        /**
         * Obtains the default grid style of this form.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the default grid style of this form.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        defaultDimension: number;
        /**
         * Obtains the grid styles supported by this form.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the grid styles supported by this form.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        supportDimensions: Array<number>;
        /**
         * Obtains the custom data defined in this form.
         *
         * @type { object }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the custom data defined in this form.
         *
         * @type { Record<string, string> }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        customizeData: Record<string, string>;
        /**
         * Obtains whether this form is a dynamic form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @since 10
         */
        /**
         * Obtains whether this form is a dynamic form.
         *
         * @type { boolean }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        isDynamic: boolean;
        /**
         * Indicates whether the form can be set as a transparent background
         *
         * @type { boolean }
         * @default false
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        transparencyEnabled: boolean;
        /**
         * Obtains the shape supported by this form.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        supportedShapes: Array<number>;
    }
    /**
     * Type of form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Type of form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    enum FormType {
        /**
         * JS form.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * JS form.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        JS = 1,
        /**
         * eTS form.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * eTS form.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        eTS = 2
    }
    /**
     * Color mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Color mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    enum ColorMode {
        /**
         * Automatic mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Automatic mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        MODE_AUTO = -1,
        /**
         * Dark mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Dark mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        MODE_DARK = 0,
        /**
         * Light mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Light mode.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        MODE_LIGHT = 1
    }
    /**
     * Provides state information about a form.
     *
     * @typedef FormStateInfo
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Provides state information about a form.
     *
     * @typedef FormStateInfo
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    interface FormStateInfo {
        /**
         * Obtains the form state.
         *
         * @type { FormState }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the form state.
         *
         * @type { FormState }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        formState: FormState;
        /**
         * Obtains the want form .
         *
         * @type { Want }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Obtains the want form .
         *
         * @type { Want }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        want: Want;
    }
    /**
     * Provides state about a form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Provides state about a form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    enum FormState {
        /**
         * Indicates that the form status is unknown due to an internal error.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates that the form status is unknown due to an internal error.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        UNKNOWN = -1,
        /**
         * Indicates that the form is in the default state.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates that the form is in the default state.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        DEFAULT = 0,
        /**
         * Indicates that the form is ready.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates that the form is ready.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        READY = 1
    }
    /**
     * Parameter of form.
     *
     * @enum { string }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Parameter of form.
     *
     * @enum { string }
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    enum FormParam {
        /**
         * Indicates the key specifying the ID of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       IDENTITY_KEY: "119476135"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates the key specifying the ID of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       IDENTITY_KEY: "119476135"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        IDENTITY_KEY = 'ohos.extra.param.key.form_identity',
        /**
         * Indicates the key specifying the grid style of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       DIMENSION_KEY: FormDimension.Dimension_1_2
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates the key specifying the grid style of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       DIMENSION_KEY: FormDimension.Dimension_1_2
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
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
         * @since 9
         */
        /**
         * Indicates the key specifying the name of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       NAME_KEY: "formName"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
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
         * @since 9
         */
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
         * @atomicservice
         * @since 11
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
         * @since 9
         */
        /**
         * Indicates the key specifying the width of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       WIDTH_KEY: 800
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
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
         * @since 9
         */
        /**
         * Indicates the key specifying the height of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       HEIGHT_KEY: 400
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
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
         * @since 9
         */
        /**
         * Indicates the key specifying whether a form is temporary, which is represented as
         * want: {
         *   "parameters": {
         *       TEMPORARY_KEY: true
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        TEMPORARY_KEY = 'ohos.extra.param.key.form_temporary',
        /**
         * Indicates the key specifying the name of the bundle to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       BUNDLE_NAME_KEY: "bundleName"
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates the key specifying the name of the bundle to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       BUNDLE_NAME_KEY: "bundleName"
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        BUNDLE_NAME_KEY = 'ohos.extra.param.key.bundle_name',
        /**
         * Indicates the key specifying the name of the ability to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       ABILITY_NAME_KEY: "abilityName"
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates the key specifying the name of the ability to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       ABILITY_NAME_KEY: "abilityName"
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        ABILITY_NAME_KEY = 'ohos.extra.param.key.ability_name',
        /**
         * Indicates the key specifying the launch reason of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       LAUNCH_REASON_KEY: LaunchReason.FORM_DEFAULT
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 10
         */
        /**
         * Indicates the key specifying the launch reason of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       LAUNCH_REASON_KEY: LaunchReason.FORM_DEFAULT
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        LAUNCH_REASON_KEY = 'ohos.extra.param.key.form_launch_reason',
        /**
         * Indicates the key specifying the custom data of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       PARAM_FORM_CUSTOMIZE_KEY: {
         *          "key": "userData"
         *       }
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 10
         */
        /**
         * Indicates the key specifying the custom data of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       PARAM_FORM_CUSTOMIZE_KEY: {
         *          "key": "userData"
         *       }
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        PARAM_FORM_CUSTOMIZE_KEY = 'ohos.extra.param.key.form_customize',
        /**
         * Indicates the key specifying the form location, which is represented as
         * want: {
         *   "parameters": {
         *       FORM_LOCATION_KEY: FormLocation.DESKTOP
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 12
         */
        FORM_LOCATION_KEY = 'ohos.extra.param.key.form_location',
        /**
         * Indicates the key specifying the form rendering mode, which is represented as
         * want: {
         *   "parameters": {
         *       FORM_RENDERING_MODE_KEY: FormRenderingMode.SINGLE_COLOR
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 11
         */
        /**
         * Indicates the key specifying the form rendering mode, which is represented as
         * want: {
         *   "parameters": {
         *       FORM_RENDERING_MODE_KEY: FormRenderingMode.SINGLE_COLOR
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        FORM_RENDERING_MODE_KEY = 'ohos.extra.param.key.form_rendering_mode',
        /**
         * Indicates the key specifying the inverse of the host background color, which is represented as
         * want: {
         *   "parameters": {
         *       HOST_BG_INVERSE_COLOR_KEY: "#FF000000"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        HOST_BG_INVERSE_COLOR_KEY = 'ohos.extra.param.key.host_bg_inverse_color',
        /**
         * Indicates the key specifying the user granted permission name, which is represented as
         * want: {
         *   "parameters": {
         *       FORM_PERMISSION_NAME_KEY: "permissionName"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        FORM_PERMISSION_NAME_KEY = 'ohos.extra.param.key.permission_name',
        /**
         * Indicates the key specifying whether the user granted, which is represented as
         * want: {
         *   "parameters": {
         *       FORM_PERMISSION_GRANTED_KEY: true
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        FORM_PERMISSION_GRANTED_KEY = 'ohos.extra.param.key.permission_granted'
    }
    /**
     * The optional options used as filters to ask
     * getFormsInfo to return formInfos from only forms that match the options.
     *
     * @typedef FormInfoFilter
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * The optional options used as filters to ask
     * getFormsInfo to return formInfos from only forms that match the options.
     *
     * @typedef FormInfoFilter
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    interface FormInfoFilter {
        /**
         * optional moduleName that used to ask getFormsInfo to return
         * form infos with the same moduleName.
         *
         * @type { ?string }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * optional moduleName that used to ask getFormsInfo to return
         * form infos with the same moduleName.
         *
         * @type { ?string }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        moduleName?: string;
    }
    /**
     * Defines the FormDimension enum.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Defines the FormDimension enum.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    enum FormDimension {
        /**
         * 1 x 2 form
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * 1 x 2 form
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        Dimension_1_2 = 1,
        /**
         * 2 x 2 form
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * 2 x 2 form
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        Dimension_2_2,
        /**
         * 2 x 4 form
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * 2 x 4 form
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        Dimension_2_4,
        /**
         * 4 x 4 form
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * 4 x 4 form
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        Dimension_4_4,
        /**
         * 2 x 1 form
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * 2 x 1 form
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        Dimension_2_1,
        /**
         * 1 x 1 form
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        DIMENSION_1_1,
        /**
         * 6 x 4 form
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        DIMENSION_6_4
    }
    /**
    * Defines the FormShape enum.
    *
    * @enum { number }
    * @syscap SystemCapability.Ability.Form
    * @atomicservice
    * @since 12
    */
    enum FormShape {
        /**
         * The rect shape.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        RECT = 1,
        /**
         * The circle shape.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 12
         */
        CIRCLE
    }
    /**
     * The visibility of a form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * The visibility of a form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    enum VisibilityType {
        /**
         * Indicates the type of the form type is unknown.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to unknown.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 10
         */
        /**
         * Indicates the type of the form type is unknown.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to unknown.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        UNKNOWN = 0,
        /**
         * Indicates the type of the form is visible.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to visible.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates the type of the form is visible.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to visible.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        FORM_VISIBLE = 1,
        /**
         * Indicates the type of the form is invisible.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to invisible.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Indicates the type of the form is invisible.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to invisible.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        FORM_INVISIBLE
    }
    /**
     * Indicates the launch reason of a form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 10
     */
    /**
     * Indicates the launch reason of a form.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    enum LaunchReason {
        /**
         * Indicates the launch reason of a form is default.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 10
         */
        /**
         * Indicates the launch reason of a form is default.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        FORM_DEFAULT = 1,
        /**
         * Indicates the launch reason of a form is share.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 10
         */
        /**
         * Indicates the launch reason of a form is share.
         *
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        FORM_SHARE
    }
}
export default formInfo;
