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
export declare enum ChipSize {
    /**
     * Normal type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    NORMAL = "NORMAL",
    /**
     * Small type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
export interface IconCommonOptions {
    /**
     * Image resource.
     *
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    size?: SizeOptions;
    /**
     * Image filled color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fillColor?: ResourceColor;
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
export interface SuffixIconOptions extends IconCommonOptions {
    /**
     * Called when the suffix icon is clicked.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
export interface LabelMarginOptions {
    /**
     * Left label margin length.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
export interface LabelOptions {
    /**
     * Text content.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    fontSize?: Dimension;
    /**
     * Text font color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontColor?: ResourceColor;
    /**
     * Text font family.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
export interface ChipOptions {
    /**
     * Chip prefix icon.
     *
     * @type { ?PrefixIconOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    label: LabelOptions;
    /**
     * Chip suffix icon.
     *
     * @type { ?SuffixIconOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    allowClose?: boolean;
    /**
     * Enable chip.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    enabled?: boolean;
    /**
     * Chip background color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    backgroundColor?: ResourceColor;
    /**
     * Chip radius.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    size?: ChipSize | SizeOptions;
    /**
     * On close action.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onClose?: () => void;
}
/**
 * Build function of Chip.
 *
 * @param { ChipOptions } options - chip option.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
@Builder
export declare function Chip(options: ChipOptions): void;
