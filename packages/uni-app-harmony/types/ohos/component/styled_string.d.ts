/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * StyledString
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class StyledString {
    /**
     * constructor.
     *
     * @param { string | ImageAttachment | CustomSpan } value - indicates the current object value of the StyledString.
     * @param { Array<StyleOptions> } [styles] - indicates the SpanStyle objects.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value: string | ImageAttachment | CustomSpan, styles?: Array<StyleOptions>);
    /**
     * Get the length of the StyledString's characters.
     *
     * @type { number } - the length of the StyledString's characters.
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly length: number;
    /**
    * Get the literal content of the StyledString.
    *
    * @returns { string } - the literal content of the StyledString
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @since 12
    */
    getString(): string;
    /**
     * Get the attribute objects of the subStyledString.
     *
     * @param { number } start - the start position of the subStyledString.
     * @param { number } length - the length of the subStyledString's characters.
     * @param { StyledStringKey } [styledKey] - the specified type.
     * @returns { Array<SpanStyle> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    getStyles(start: number, length: number, styledKey?: StyledStringKey): Array<SpanStyle>;
    /**
     * Judge if two attribute strings are equal.
     *
     * @param { StyledString } other - another StyledString.
     * @returns { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    equals(other: StyledString): boolean;
    /**
     * Get the substring of the StyledString.
     *
     * @param { number } start - the start position of the subStyledString.
     * @param { number } [length] - the length of the subStyledString's characters.
     * @returns { StyledString }
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    subStyledString(start: number, length?: number): StyledString;
}
/**
 * StyleOptions
 *
 * @interface StyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface StyleOptions {
    /**
     * The start position of the StyleOptions.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    start?: number;
    /**
     * The length of the modifiedStyledString's characters.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    length?: number;
    /**
     * The attribute key of the StyleOptions.
     *
     * @type { StyledStringKey }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    styledKey: StyledStringKey;
    /**
     * The attribute value of the StyleOptions.
     *
     * @type { StyledStringValue }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    styledValue: StyledStringValue;
}
/**
 * SpanStyle
 *
 * @interface SpanStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface SpanStyle {
    /**
     * The start position of the SpanStyle.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    start: number;
    /**
     * The length of the modifiedStyledString's characters.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    length: number;
    /**
     * The attribute key of the SpanStyle.
     *
     * @type { StyledStringKey }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    styledKey: StyledStringKey;
    /**
     * The attribute value of the SpanStyle.
     *
     * @type { StyledStringValue }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    styledValue: StyledStringValue;
}
/**
 * Defines TextStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class TextStyle {
    /**
     * constructor.
     *
     * @param { TextStyleInterface } [value] - font property object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value?: TextStyleInterface);
    /**
     * Get the fontColor of the StyledString.
     *
     * @type { ?ResourceColor } - the set fontColor of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly fontColor?: ResourceColor;
    /**
     * Get the fontFamily of the StyledString.
     *
     * @type { ?string } - the fontFamily of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly fontFamily?: string;
    /**
     * Get the fontSize of the StyledString.
     * If not undefined, the unit is vp.
     *
     * @type { ?number } - the fontSize of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly fontSize?: number;
    /**
     * Get the fontWeight of the StyledString.
     *
     * @type { ?number } - the fontWeight of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly fontWeight?: number;
    /**
     * Get the fontStyle of the StyledString.
     *
     * @type { ?FontStyle  } - the fontStyle of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly fontStyle?: FontStyle;
}
/**
 * TextStyleInterface
 *
 * @interface TextStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface TextStyleInterface {
    /**
     * The fontColor value of the font property object.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    fontColor?: ResourceColor;
    /**
     * The fontFamily value of the font property object.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    fontFamily?: ResourceStr;
    /**
     * The fontSize value of the font property object.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    fontSize?: LengthMetrics;
    /**
     * The fontWeight value of the font property object.
     *
     * @type { ?(number | FontWeight | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    fontWeight?: number | FontWeight | string;
    /**
     * The fontStyle value of the font property object.
     *
     * @type { ?FontStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    fontStyle?: FontStyle;
}
/**
 * Defines DecorationStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class DecorationStyle {
    /**
     * constructor.
     *
     * @param { DecorationStyleInterface } value - text decoration value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value: DecorationStyleInterface);
    /**
     * Get the text decoration type of the StyledString.
     *
     * @type { TextDecorationType } - the decoration type of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly type: TextDecorationType;
    /**
     * Get the decorationColor of the StyledString.
     *
     * @type { ?ResourceColor } - the decorationColor of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly color?: ResourceColor;
    /**
     * Get the decorationStyle of the StyledString.
     *
     * @type { ?TextDecorationStyle } - the decorationStyle of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly style?: TextDecorationStyle;
}
/**
 * DecorationStyleInterface
 *
 * @interface DecorationStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface DecorationStyleInterface {
    /**
     * The type value of the decoration property object.
     *
     * @type { TextDecorationType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type: TextDecorationType;
    /**
     * The color value of the decoration property object.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    color?: ResourceColor;
    /**
     * The style value of the decoration property object.
     *
     * @type { ?TextDecorationStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    style?: TextDecorationStyle;
}
/**
 * Defines BaselineOffsetStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class BaselineOffsetStyle {
    /**
     * constructor.
     *
     * @param { LengthMetrics } value - baseline offset value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value: LengthMetrics);
    /**
     * Get the baselineOffset value of the StyledString.
     * The unit is vp.
     *
     * @type { number } - the baselineOffset value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly baselineOffset: number;
}
/**
 * Defines LetterSpacingStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class LetterSpacingStyle {
    /**
     * constructor.
     *
     * @param { LengthMetrics } value - letter space value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value: LengthMetrics);
    /**
     * Get the letterSpacing value of the StyledString.
     * The unit is vp.
     *
     * @type { number } - the letterSpacing value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly letterSpacing: number;
}
/**
 * Defines TextShadowStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class TextShadowStyle {
    /**
     * constructor.
     *
     * @param { ShadowOptions | Array<ShadowOptions> } value - text shadow value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value: ShadowOptions | Array<ShadowOptions>);
    /**
     * Get the textShadow value of the StyledString.
     *
     * @type { Array<ShadowOptions> } - the textShadow value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly textShadow: Array<ShadowOptions>;
}
/**
 * Defines GestureStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class GestureStyle {
    /**
     * constructor.
     *
     * @param { GestureStyleInterface } [value] - gesture event object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value?: GestureStyleInterface);
}
/**
 * Defines the Gesture Events.
 *
 * @interface GestureStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface GestureStyleInterface {
    /**
     * Trigger a click event when a click is clicked.
     *
     * @type { ?Callback<ClickEvent> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onClick?: Callback<ClickEvent>;
    /**
     * Trigger a gesture event when long press event is complete.
     *
     * @type { ?Callback<GestureEvent> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onLongPress?: Callback<GestureEvent>;
}
/**
 * Defines ParagraphStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class ParagraphStyle {
    /**
     * constructor.
     *
     * @param { ParagraphStyleInterface } [value] - paragraph property object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value?: ParagraphStyleInterface);
    /**
     * Get the text alignment of the StyledString.
     *
     * @type { ?TextAlign } - the text alignment of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly textAlign?: TextAlign;
    /**
     * Get the first line indentation of the StyledString.
     * The unit is vp.
     *
     * @type { ?number } - the first line indentation of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly textIndent?: number;
    /**
     * Get the maximum number of lines of the StyledString.
     *
     * @type { ?number } - the maximum number of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly maxLines?: number;
    /**
     * Get the overflow mode of the StyledString.
     *
     * @type { ?TextOverflow } - the overflow mode of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly overflow?: TextOverflow;
    /**
     * Get the wordBreak mode of the StyledString.
     *
     * @type { ?WordBreak } - the wordBreak mode of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly wordBreak?: WordBreak;
    /**
     * Get the leading margin of the StyledString.
     *
     * @type { ?(number | LeadingMarginPlaceholder) } - the leading margin of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly leadingMargin?: number | LeadingMarginPlaceholder;
}
/**
 * ParagraphStyleInterface
 *
 * @interface ParagraphStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ParagraphStyleInterface {
    /**
     * Alignment of text.
     *
     * @type { ?TextAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    textAlign?: TextAlign;
    /**
     * Set the first line indentation.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    textIndent?: LengthMetrics;
    /**
     * The maximum number of lines of content.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    maxLines?: number;
    /**
     * The overflow mode of the content.
     *
     * @type { ?TextOverflow }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    overflow?: TextOverflow;
    /**
     * Set word break type.
     *
     * @type { ?WordBreak }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    wordBreak?: WordBreak;
    /**
     * Leading margin.
     *
     * @type { ?(LengthMetrics | LeadingMarginPlaceholder) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    leadingMargin?: LengthMetrics | LeadingMarginPlaceholder;
}
/**
 * Defines LineHeightStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class LineHeightStyle {
    /**
     * constructor.
     *
     * @param { LengthMetrics } lineHeight - line height value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(lineHeight: LengthMetrics);
    /**
     * Get the lineHeight value of the StyledString.
     * The unit is vp.
     *
     * @type { number } - the lineHeight value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly lineHeight: number;
}
/**
 * Defines the Span Type.
 *
 * @typedef { TextStyle | DecorationStyle | BaselineOffsetStyle | LetterSpacingStyle | TextShadowStyle |
 * GestureStyle | ImageAttachment | ParagraphStyle | LineHeightStyle | CustomSpan } StyledStringValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare type StyledStringValue = TextStyle | DecorationStyle | BaselineOffsetStyle | LetterSpacingStyle | TextShadowStyle | GestureStyle | ImageAttachment | ParagraphStyle | LineHeightStyle | CustomSpan;
/**
 * MutableStyledString
 *
 * @extends StyledString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class MutableStyledString extends StyledString {
    /**
     * Replace the string of the specified range.
     *
     * @param { number } start - the start position of the replacedString.
     * @param { number } length - the length of the replacedString's characters.
     * @param { string } other - must be unicode string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    replaceString(start: number, length: number, other: string): void;
    /**
    * Insert the string at the specified location.
    *
    * @param { number } start - the start position of the insertedString.
    * @param { string } other - must be unicode string.
    * @throws { BusinessError } 401 - Parameter error. Possible causes:
    * <br> 1. Mandatory parameters are left unspecified.
    * <br> 2. Incorrect parameters types.
    * <br> 3. Parameter verification failed.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @since 12
    */
    insertString(start: number, other: string): void;
    /**
    * Remove the string of the specified range.
    *
    * @param { number } start - the start position of the removedString.
    * @param { number } length - the length of the removedString's characters.
    * @throws { BusinessError } 401 - Parameter error. Possible causes:
    * <br> 1. Mandatory parameters are left unspecified.
    * <br> 2. Incorrect parameters types.
    * <br> 3. Parameter verification failed.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @since 12
    */
    removeString(start: number, length: number): void;
    /**
     * Replace the specified range string attribute.
     *
     * @param { SpanStyle } spanStyle - the SpanStyle Object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    replaceStyle(spanStyle: SpanStyle): void;
    /**
     * Add attributes to the specified range string.
     *
     * @param { SpanStyle } spanStyle - the SpanStyle Object.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    setStyle(spanStyle: SpanStyle): void;
    /**
     * Delete the specified type attributes for the specified range string.
     *
     * @param { number } start - the start position of the removedAttributeStyledString.
     * @param { number } length - the length of the removedAttributeStyledString's characters.
     * @param { StyledStringKey } styledKey - the specified attribute type's key.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    removeStyle(start: number, length: number, styledKey: StyledStringKey): void;
    /**
     * Delete all attributes for the specified range styledString.
     *
     * @param { number } start - the start position of the attributeRemovedStyledString's characters.
     * @param { number } length - the length of the attributeRemovedStyledString's characters.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    removeStyles(start: number, length: number): void;
    /**
     * Delete all attributes.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    clearStyles(): void;
    /**
     * Replace the StyledString of the specified range.
     *
     * @param { number } start - the start position of the replacedStyledString.
     * @param { number } length - the length of the replacedStyledString's characters.
     * @param { StyledString } other - new StyledString.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    replaceStyledString(start: number, length: number, other: StyledString): void;
    /**
     * Insert new StyledString at the specified location.
     *
     * @param { number } start - the start position of the insertedStyledString.
     * @param { StyledString } other - new StyledString.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    insertStyledString(start: number, other: StyledString): void;
    /**
     * Append new StyledString at the end.
     *
     * @param { StyledString } other - new StyledString.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    appendStyledString(other: StyledString): void;
}
/**
 * the attribute type of the StyledString
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare enum StyledStringKey {
    /**
     * The key of TextStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    FONT = 0,
    /**
     * The key of DecorationStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    DECORATION = 1,
    /**
     * The key of BaselineOffsetStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    BASELINE_OFFSET = 2,
    /**
     * The key of LetterSpacingStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    LETTER_SPACING = 3,
    /**
     * The key of TextShadowStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    TEXT_SHADOW = 4,
    /**
     * The key of LineHeightStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    LINE_HEIGHT = 5,
    /**
     * The key of GestureStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    GESTURE = 100,
    /**
     * The key of ParagraphStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    PARAGRAPH_STYLE = 200,
    /**
     * The key of ImageAttachment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    IMAGE = 300,
    /**
     * The key of CustomSpan.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    CUSTOM_SPAN = 400
}
/**
 * Defines ImageAttachment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class ImageAttachment {
    /**
     * constructor.
     *
     * @param { ImageAttachmentInterface } value - image attachment object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(value: ImageAttachmentInterface);
    /**
     * Get the image content of the StyledString.
     *
     * @type { PixelMap } - the image content of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly value: PixelMap;
    /**
     * Get the imageSize of the StyledString.
     *
     * @type { ?SizeOptions } - the imageSize of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly size?: SizeOptions;
    /**
     * Get the ImageSpanAlignment of the StyledString.
     *
     * @type { ?ImageSpanAlignment } - the ImageSpanAlignment of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly verticalAlign?: ImageSpanAlignment;
    /**
     * Get the imageFit of the StyledString.
     *
     * @type { ?ImageFit } - the imageFit of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly objectFit?: ImageFit;
    /**
     * Get the imageAttachmentLayoutStyle of the StyledString.
     *
     * @type { ?ImageAttachmentLayoutStyle } - the imageAttachmentLayoutStyle of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    readonly layoutStyle?: ImageAttachmentLayoutStyle;
}
/**
 * Defines the ImageAttachmentInterface.
 *
 * @interface ImageAttachmentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ImageAttachmentInterface {
    /**
     * The content of the ImageAttachment.
     *
     * @type { PixelMap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    value: PixelMap;
    /**
     * Image size.
     *
     * @type { ?SizeOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    size?: SizeOptions;
    /**
     * Image vertical align.
     *
     * @type { ?ImageSpanAlignment }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    verticalAlign?: ImageSpanAlignment;
    /**
     * Image fit.
     *
     * @type { ?ImageFit }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    objectFit?: ImageFit;
    /**
     * The Image Layout Style.
     *
     * @type { ?ImageAttachmentLayoutStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    layoutStyle?: ImageAttachmentLayoutStyle;
}
/**
 * Defines the  ImageAttachment Layout Style.
 *
 * @interface ImageAttachmentLayoutStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ImageAttachmentLayoutStyle {
    /**
     * Outer Margin.
     *
     * @type { ?(LengthMetrics | Margin) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    margin?: LengthMetrics | Margin;
    /**
     * Inner margin.
     *
     * @type { ?(LengthMetrics | Padding) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    padding?: LengthMetrics | Padding;
    /**
     * Border radius.
     *
     * @type { ?(LengthMetrics | BorderRadiuses) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    borderRadius?: LengthMetrics | BorderRadiuses;
}
/**
 * Defines the CustomSpanMetrics interface.
 *
 * @interface CustomSpanMetrics
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface CustomSpanMetrics {
    /**
     * CustomSpan Width.
     * The unit is vp.
     *
     * @type { number }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    width: number;
    /**
     * CustomSpan Height.
     * The unit is vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    height?: number;
}
/**
 * Defines the CustomSpanDrawInfo interface.
 *
 * @interface CustomSpanDrawInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface CustomSpanDrawInfo {
    /**
     * CustomSpan's offset relative to the parent component.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    x: number;
    /**
     * The top position of the line where customSpan is located.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    lineTop: number;
    /**
     * The bottom position of the line where customSpan is located.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    lineBottom: number;
    /**
     * The baseline offset of the line where customSpan is located.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    baseline: number;
}
/**
 * Defines the CustomSpanMeasureInfo interface.
 *
 * @interface CustomSpanMeasureInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface CustomSpanMeasureInfo {
    /**
     * Current component's fontSize value.
     * The unit is fp.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    fontSize: number;
}
/**
 * Defines CustomSpan.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare abstract class CustomSpan {
    /**
     * Measure the size of custom span.
     *
     * @param { CustomSpanMeasureInfo } measureInfo
     * @returns { CustomSpanMetrics } - CustomSpan Size
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    abstract onMeasure(measureInfo: CustomSpanMeasureInfo): CustomSpanMetrics;
    /**
     * Draw the custom span.
     *
     * @param { DrawContext } context
     * @param { CustomSpanDrawInfo } drawInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    abstract onDraw(context: DrawContext, drawInfo: CustomSpanDrawInfo): void;
}
