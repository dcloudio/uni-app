/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * @file
 * @kit ArkUI
 */

/// <reference path="../component/units.d.ts" />
import { ResourceStr } from 'GlobalResource';
/**
 * Enum for ChipSize
 *
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Enum for ChipSize
 *
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export declare enum ChipSize {
    /**
     * Normal type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Normal type.
    *
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    NORMAL = "NORMAL",
    /**
     * Small type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Small type.
    *
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    SMALL = "SMALL"
}
/**
 * Defines the icon common option.
 *
 * @interface IconCommonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines the icon common option.
*
* @interface IconCommonOptions
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface IconCommonOptions {
    /**
     * Image resource.
     *
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Image resource.
    *
    * @type { ResourceStr }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    src: ResourceStr;
    /**
     * Image size option.
     *
     * @type { ?SizeOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Image size option.
    *
    * @type { ?SizeOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    size?: SizeOptions;
    /**
     * Image filled color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Image filled color.
    *
    * @type { ?ResourceColor }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fillColor?: ResourceColor;
    /**
     * Image filled color when chip is activated.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    activatedFillColor?: ResourceColor;
}
/**
 * Defines the suffix icon option.
 *
 * @interface SuffixIconOptions
 * @extends IconCommonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines the suffix icon option.
*
* @interface SuffixIconOptions
* @extends IconCommonOptions
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface SuffixIconOptions extends IconCommonOptions {
    /**
     * Called when the suffix icon is clicked.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Called when the suffix icon is clicked.
    *
    * @type { ?function }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    action?: () => void;
}
/**
 * Defines the prefix icon option.
 *
 * @interface PrefixIconOptions
 * @extends IconCommonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines the prefix icon option.
*
* @interface PrefixIconOptions
* @extends IconCommonOptions
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface PrefixIconOptions extends IconCommonOptions {
}
/**
 * Defines label margin.
 *
 * @interface LabelMarginOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines label margin.
*
* @interface LabelMarginOptions
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface LabelMarginOptions {
    /**
     * Left label margin length.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Left label margin length.
    *
    * @type { ?Dimension }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    left?: Dimension;
    /**
     * Right label margin length.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Right label margin length.
    *
    * @type { ?Dimension }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    right?: Dimension;
}
/**
 * Defines label option.
 *
 * @interface LabelOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines label option.
*
* @interface LabelOptions
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface LabelOptions {
    /**
     * Text content.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Text content.
    *
    * @type { string }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    text: string;
    /**
     * Text font size.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Text font size.
    *
    * @type { ?Dimension }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontSize?: Dimension;
    /**
     * Text font color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Text font color.
    *
    * @type { ?ResourceColor }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontColor?: ResourceColor;
    /**
     * Text font color when chip is activated.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    activatedFontColor?: ResourceColor;
    /**
     * Text font family.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Text font family.
    *
    * @type { ?string }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontFamily?: string;
    /**
     * Label margin.
     *
     * @type { ?LabelMarginOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Label margin.
    *
    * @type { ?LabelMarginOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    labelMargin?: LabelMarginOptions;
}
/**
 * Defines chip options.
 *
 * @interface ChipOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines chip options.
*
* @interface ChipOptions
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface ChipOptions {
    /**
     * Chip prefix icon.
     *
     * @type { ?PrefixIconOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Chip prefix icon.
    *
    * @type { ?PrefixIconOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    prefixIcon?: PrefixIconOptions;
    /**
     * Chip label.
     *
     * @type { LabelOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Chip label.
    *
    * @type { LabelOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    label: LabelOptions;
    /**
     * Chip suffix icon.
     *
     * @type { ?SuffixIconOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Chip suffix icon.
    *
    * @type { ?SuffixIconOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    suffixIcon?: SuffixIconOptions;
    /**
     * Show close icon.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Show close icon.
    *
    * @type { ?boolean }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    allowClose?: boolean;
    /**
     * Enable chip.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Enable chip.
    *
    * @type { ?boolean }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    enabled?: boolean;
    /**
     * Set whether chip is active or not.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    activated?: boolean;
    /**
     * Chip background color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Chip background color.
    *
    * @type { ?ResourceColor }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    backgroundColor?: ResourceColor;
    /**
     * Chip background color when chip is activated.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    activatedBackgroundColor?: ResourceColor;
    /**
     * Chip radius.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Chip radius.
    *
    * @type { ?Dimension }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    borderRadius?: Dimension;
    /**
     * Chip size.
     *
     * @type { ?ChipSize | SizeOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Chip size.
    *
    * @type { ?ChipSize | SizeOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    size?: ChipSize | SizeOptions;
    /**
     * On close action.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * On close action.
    *
    * @type { ?function }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    onClose?: () => void;
    /**
     * On clicked action.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onClicked?: Callback<void>;
}
/**
 * Build function of Chip.
 *
 * @param { ChipOptions } options - chip option.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Build function of Chip.
*
* @param { ChipOptions } options - chip option.
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
@Builder
export declare function Chip(options: ChipOptions): void;
