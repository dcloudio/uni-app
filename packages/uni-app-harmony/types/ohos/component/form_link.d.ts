/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */
/**
 * Defines the FormLink options.
 *
 * @interface FormLinkOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 * @form
*/
/**
 * Defines the FormLink options.
 *
 * @interface FormLinkOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @atomicservice
 * @since 11
*/
declare interface FormLinkOptions {
    /**
     * Action types: "router" and "message".
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     * @form
     */
    /**
     * Action types: "router" and "message".
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 11
     */
    action: string;
    /**
     * Module name of destination UIAbility.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     * @form
     */
    /**
     * Module name of destination UIAbility.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 11
     */
    moduleName?: string;
    /**
     * Bundle name of destination UIAbility.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     * @form
     */
    /**
     * Bundle name of destination UIAbility.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 11
     */
    bundleName?: string;
    /**
     * Name of destination UIAbility.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     * @form
     */
    /**
     * Name of destination UIAbility.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 11
     */
    abilityName?: string;
    /**
     * uri of destination UIAbility.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 11
     */
    uri?: string;
    /**
     * The additional parameters, use JSON format key value pairs for content.
     *
     * @type { ?Object }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     * @form
     */
    /**
     * The additional parameters, use JSON format key value pairs for content.
     *
     * @type { ?Object }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 11
     */
    params?: Object;
}
/**
 * Defines the FormLink interface.
 *
 * @interface FormLinkInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 * @form
 */
/**
 * Defines the FormLink interface.
 *
 * @interface FormLinkInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @atomicservice
 * @since 11
 */
interface FormLinkInterface {
    /**
     * Init FormLink component with options.
     *
     * @param { FormLinkOptions } options
     * @returns { FormLinkAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     * @form
     */
    /**
     * Init FormLink component with options.
     *
     * @param { FormLinkOptions } options
     * @returns { FormLinkAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @atomicservice
     * @since 11
     */
    (options: FormLinkOptions): FormLinkAttribute;
}
/**
 * Defines the FormLink attribute.
 *
 * @extends CommonMethod<FormLinkAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 * @form
 */
/**
 * Defines the FormLink attribute.
 *
 * @extends CommonMethod<FormLinkAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @atomicservice
 * @since 11
 */
declare class FormLinkAttribute extends CommonMethod<FormLinkAttribute> {
}
/**
 * Defines FormLink component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 * @form
 */
/**
 * Defines FormLink component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @atomicservice
 * @since 11
 */
declare const FormLink: FormLinkInterface;
/**
 * Defines FormLink component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 * @form
 */
/**
 * Defines FormLink component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @atomicservice
 * @since 11
 */
declare const FormLinkInstance: FormLinkAttribute;
