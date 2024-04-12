/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

/// <reference path="../component/units.d.ts" />
import { Resource } from 'GlobalResource';
/**
 * Defines the options of MeasureText.
 *
 * @interface MeasureOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the options of MeasureText.
 *
 * @interface MeasureOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface MeasureOptions {
    /**
     * Text to display.
     *
     * @type { string | Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Text to display.
     *
     * @type { string | Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    textContent: string | Resource;
    /**
     * Text display area of width.
     *
     * @type { ?(number | string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    constraintWidth?: number | string | Resource;
    /**
     * Font Size.
     *
     * @type { ?(number | string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    fontSize?: number | string | Resource;
    /**
     * Font style.
     *
     * @type { ?(number | FontStyle) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    fontStyle?: number | FontStyle;
    /**
     * Font weight.
     *
     * @type { ?(number | string | FontWeight) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    fontWeight?: number | string | FontWeight;
    /**
     * Font list of text.
     *
     * @type { ?(string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    fontFamily?: string | Resource;
    /**
     * Distance between text fonts.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    letterSpacing?: number | string;
    /**
     * Alignment of text.
     *
     * @type { ?(number | TextAlign) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    textAlign?: number | TextAlign;
    /**
     * Overflow mode of the font.
     *
     * @type { ?(number | TextOverflow) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    overflow?: number | TextOverflow;
    /**
     * Maximum number of lines of text.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    maxLines?: number;
    /**
     * Vertical center mode of the font.
     *
     * @type { ?(number | string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    lineHeight?: number | string | Resource;
    /**
     * Baseline offset.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    baselineOffset?: number | string;
    /**
     * Type of letter in the text font
     *
     * @type { ?(number | TextCase) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    textCase?: number | TextCase;
    /**
     * Specify the indentation of the first line in a text-block.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    textIndent?: number | string;
    /**
     * Set the word break type.
     *
     * @type { ?WordBreak }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    wordBreak?: WordBreak;
}
/**
 * Defines the Measure interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
export default class MeasureText {
    /**
     * Displays the textWidth.
     *
     * @param { MeasureOptions } options - Options.
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Displays the textWidth.
     *
     * @param { MeasureOptions } options - Options.
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    static measureText(options: MeasureOptions): number;
    /**
     * Displays the text width and height.
     *
     * @param { MeasureOptions } options - Options of measure area occupied by text.
     * @returns { SizeOptions } width and height for text to display \
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Displays the text width and height.
     *
     * @param { MeasureOptions } options - Options of measure area occupied by text.
     * @returns { SizeOptions } width and height for text to display \
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    static measureTextSize(options: MeasureOptions): SizeOptions;
}
