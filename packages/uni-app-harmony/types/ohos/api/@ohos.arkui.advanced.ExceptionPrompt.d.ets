/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * Control margin status of  ExceptionPrompt.
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Control margin status of  ExceptionPrompt.
* @enum { number }
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export declare enum MarginType {
    /**
     * Default margin of MarginType，Margin 1: references ohos_id_card_margin_start, margin 2: references ohos_id_card_margin_end.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Default margin of MarginType，Margin 1: references ohos_id_card_margin_start, margin 2: references ohos_id_card_margin_end.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    DEFAULT_MARGIN = 0,
    /**
     * Margins can be adapted of MarginType，Margin 1: references ohos_id_max_padding_start, margin 2: references ohos_id_max_padding_end.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Margins can be adapted of MarginType，Margin 1: references ohos_id_max_padding_start, margin 2: references ohos_id_max_padding_end.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    FIT_MARGIN = 1
}
/**
 * Configuration parameter of ExceptionPrompt.
 * @interface PromptOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Configuration parameter of ExceptionPrompt.
* @interface PromptOptions
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface PromptOptions {
    /**
     * Icon of PromptOptions.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Icon of PromptOptions.
    * @type { ?ResourceStr }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    icon?: ResourceStr;
    /**
     * Tip text of PromptOptions.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Tip text of PromptOptions.
    * @type { ?ResourceStr }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    tip?: ResourceStr;
    /**
     * Margin Type  of ExceptionPrompt.
     * @type { MarginType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Margin Type  of ExceptionPrompt.
    * @type { MarginType }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    marginType: MarginType;
    /**
     * Right icon button text of PromptOptions.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Right icon button text of PromptOptions.
    * @type { ?ResourceStr }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    actionText?: ResourceStr;
    /**
     * Distance from the top of PromptOptions.
     * @type { Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Distance from the top of PromptOptions.
    * @type { Dimension }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    marginTop: Dimension;
    /**
     * Control concealment of PromptOptions.
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Control concealment of PromptOptions.
    * @type { boolean }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    isShown?: boolean;
}
/**
 * Declare struct ExceptionPrompt higher-order component.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Declare struct ExceptionPrompt higher-order component.
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
@Component
export declare struct ExceptionPrompt {
    /**
     * Configuration information of ExceptionPrompt.
     * @type { PromptOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Configuration information of ExceptionPrompt.
    * @type { PromptOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    @Prop
    options: PromptOptions;
    /**
     * Callback when clicking the text on the left.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Callback when clicking the text on the left.
    * @type { ?function }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    onTipClick?: () => void;
    /**
     * Callback when click the icon button.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Callback when click the icon button.
    * @type { ?function }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    onActionTextClick?: () => void;
    /**
     * The build function is a member function that must return an ArkTS component type (Element) to represent the component to be rendered as a user interface.
     * @type { function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * The build function is a member function that must return an ArkTS component type (Element) to represent the component to be rendered as a user interface.
    * @type { function }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    build(): void;
}
