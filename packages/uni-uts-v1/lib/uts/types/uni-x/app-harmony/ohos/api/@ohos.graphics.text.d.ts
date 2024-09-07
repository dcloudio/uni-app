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
 * @kit ArkGraphics2D
 */
import type drawing from './@ohos.graphics.drawing';
import type common2D from './@ohos.graphics.common2D';
/**
 * Provides functions such as 2D graphics text paragraphs, text styles.
 *
 * @namespace text
 * @syscap SystemCapability.Graphics.Drawing
 * @since 12
 */
declare namespace text {
    /**
     * Refers to how to align the horizontal position of text when displaying text.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum TextAlign {
        /**
         * Use the left side of the text as a reference line for alignment.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        LEFT = 0,
        /**
         * Use the right side of the text as a reference line for alignment.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        RIGHT = 1,
        /**
         * Use the midpoint line the text as a reference line for alignment.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        CENTER = 2,
        /**
         * Align the text at the start and end of the line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        JUSTIFY = 3,
        /**
         * Align text from start, based on the direction of text, such as left-to-right or right-to-left.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        START = 4,
        /**
         * Align text from end, based on the direction of text, such as left-to-right or right-to-left, opposite to START.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        END = 5
    }
    /**
     * Enumerate text runs direction.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum TextDirection {
        /**
         * The text is oriented from right to left.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        RTL,
        /**
         * The text is oriented from left to right.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        LTR
    }
    /**
     * Enumerate text segmentation strategy.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum BreakStrategy {
        /**
         * The segmentation strategy is greedy.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        GREEDY,
        /**
         * The segmentation strategy is high quality.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        HIGH_QUALITY,
        /**
         * The segmentation strategy is balanced.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        BALANCED
    }
    /**
     * Enumerate word break strategy.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum WordBreak {
        /**
         * Normal word break strategy.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        NORMAL,
        /**
         * Breaks word by character.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        BREAK_ALL,
        /**
         * Breaks word by phrase.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        BREAK_WORD
    }
    /**
     * Decoration for text.
     * @typedef Decoration
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface Decoration {
        /**
         * Decorates text by line.
         * @type { ?TextDecorationType }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        textDecoration?: TextDecorationType;
        /**
         * Text color.
         * @type { ?common2D.Color }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        color?: common2D.Color;
        /**
         * Text decoration style.
         * @type { ?TextDecorationStyle }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        decorationStyle?: TextDecorationStyle;
        /**
         * The thickness scale of decoration line.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        decorationThicknessScale?: number;
    }
    /**
     * Enumerates decoration line for text.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum TextDecorationType {
        /**
         * There are no text decoration.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        NONE,
        /**
         * There is a decoration line below the text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        UNDERLINE,
        /**
         * There is a decoration line above the text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        OVERLINE,
        /**
         * There is a decoration line through the middle of the text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        LINE_THROUGH
    }
    /**
     * Enumerates decoration line style.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum TextDecorationStyle {
        /**
         * Decoration line is solid line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        SOLID,
        /**
         * Decoration line is double line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DOUBLE,
        /**
         * Decoration line is dotted line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DOTTED,
        /**
         * Decoration line is dashed line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DASHED,
        /**
         * Decoration line is wavy line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        WAVY
    }
    /**
     * Enumeration of font weight of text.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum FontWeight {
        /**
         * Thin
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W100,
        /**
         * Extra-light
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W200,
        /**
         * Light
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W300,
        /**
         * Normal/Regular
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W400,
        /**
         * Medium
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W500,
        /**
         * Semi-bold
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W600,
        /**
         * Bold
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W700,
        /**
         * Extra-bold
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W800,
        /**
         * Black
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        W900
    }
    /**
     * Enumeration of font style of text.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum FontStyle {
        /**
         * Upright font type.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        NORMAL,
        /**
         * Slant font.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ITALIC,
        /**
         * Oblique font.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        OBLIQUE
    }
    /**
     * Enumeration of font width of text.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum FontWidth {
        /**
         * Ultra condensed font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ULTRA_CONDENSED = 1,
        /**
         * Extra condensed font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        EXTRA_CONDENSED = 2,
        /**
         * Condensed font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        CONDENSED = 3,
        /**
         * Semi condensed font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        SEMI_CONDENSED = 4,
        /**
         * Normal font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        NORMAL = 5,
        /**
         * Semi expanded font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        SEMI_EXPANDED = 6,
        /**
         * Expanded font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        EXPANDED = 7,
        /**
         * Extra expanded font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        EXTRA_EXPANDED = 8,
        /**
         * Ultra expanded font width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ULTRA_EXPANDED = 9
    }
    /**
     * Enumerates of height mode of text.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum TextHeightBehavior {
        /**
         * Both ascend of first row and last row style.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ALL = 0x0,
        /**
         * Forbidding ascend of first row style.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DISABLE_FIRST_ASCENT = 0x1,
        /**
         * Forbidding ascend of last row style.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DISABLE_LAST_ASCENT = 0x2,
        /**
         * Neither ascend of first row nor last row style.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DISABLE_ALL = 0x1 | 0x2
    }
    /**
     * Enumeration the type of text baseline.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum TextBaseline {
        /**
         * The alphabetic baseline, typically used for Latin-based scripts where the baseline aligns
         * with the base of lowercase letters.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ALPHABETIC,
        /**
         * The ideographic baseline, commonly used for ideographic scripts such as Chinese, Japanese, and Korean,
         * where the baseline aligns with the center of characters.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        IDEOGRAPHIC
    }
    /**
     * Enumerates of ellipsis mode.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum EllipsisMode {
        /**
         * The ellipsis is shown in the start of text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        START,
        /**
         * The ellipsis is shown in the middle of text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        MIDDLE,
        /**
         * The ellipsis is shown in the end of text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        END
    }
    /**
     * Describes shadow of text.
     * @typedef TextShadow
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface TextShadow {
        /**
         * The color of text shadow.
         * @type { ?common2D.Color } The color of text shadow
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        color?: common2D.Color;
        /**
         * The value sets offset of text shadow that based on the original text.
         * @type { ?common2D.Point } The point of shadow
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        point?: common2D.Point;
        /**
         * The value sets special effect radius of blurring text, it default is 0.
         * @type { ?number } The value about radius of blur, it type is "double"
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        blurRadius?: number;
    }
    /**
     * Describes rect style of text.
     * @typedef RectStyle
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface RectStyle {
        /**
         * The color of rect style.
         * @type { common2D.Color } The color of rect style
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        color: common2D.Color;
        /**
         * Radius in left top of rect style.
         * @type { number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        leftTopRadius: number;
        /**
         * Radius in right top of rect style.
         * @type { number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        rightTopRadius: number;
        /**
         * Radius in right bottom of rect style.
         * @type { number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        rightBottomRadius: number;
        /**
         * Radius in left bottom of rect style.
         * @type { number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        leftBottomRadius: number;
    }
    /**
     * Describes font feature of text.
     * @typedef FontFeature
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface FontFeature {
        /**
         * The name of font feature.
         * @type { string } feature name
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        name: string;
        /**
         * The value of font feature.
         * @type { number } feature value
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        value: number;
    }
    /**
     * Describes font variation of text.
     * @typedef FontVariation
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface FontVariation {
        /**
         * The axis of font variation.
         * @type { string } variation axis
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        axis: string;
        /**
         * The value of font variation.
         * @type { number } variation value
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        value: number;
    }
    /**
     * Describes text style.
     * @typedef TextStyle
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface TextStyle {
        /**
         * Decoration of text.
         * @type { ?Decoration } decoration for text
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        decoration?: Decoration;
        /**
         * Color of text.
         * @type { ?common2D.Color } it is uint32_t type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        color?: common2D.Color;
        /**
         * Font weight of text.
         * @type { ?FontWeight } it is uint32_t type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontWeight?: FontWeight;
        /**
         * Font style of text.
         * @type { ?FontStyle } it is uint32_t type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontStyle?: FontStyle;
        /**
         * Base line of text.
         * @type { ?TextBaseline } it is uint32_t type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        baseline?: TextBaseline;
        /**
         * Font Families of text.
         * @type { ?Array<string> } fontfamily gather
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontFamilies?: Array<string>;
        /**
         * Font size of text.
         * @type { ?number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontSize?: number;
        /**
         * Letter spacing of text.
         * @type { ?number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        letterSpacing?: number;
        /**
         * Word spacing of text.
         * @type { ?number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        wordSpacing?: number;
        /**
         * Height scale of text.
         * @type { ?number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        heightScale?: number;
        /**
         * Half leading of text.
         * @type { ?boolean } it is boolean type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        halfLeading?: boolean;
        /**
         * Control the height calculation method of font blob, true means calculate the height of the blob by
         * the font size, false means by the line height and leading.
         * @type { ?boolean } it is boolean type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        heightOnly?: boolean;
        /**
         * Text ellipsis.
         * @type { ?string } it is u16string type data.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ellipsis?: string;
        /**
         * Text ellipsis mode.
         * @type { ?EllipsisMode } Ellipsis mode.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ellipsisMode?: EllipsisMode;
        /**
         * Text locale.
         * @type { ?string } it is string type data.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        locale?: string;
        /**
         * The offset distance that the underline of text.
         * @type { ?number } it is double type data.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        baselineShift?: number;
        /**
         * Text Style available font features.
         * @type { ?Array<FontFeature> } A collection of font features.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontFeatures?: Array<FontFeature>;
        /**
         * Text shadows of text.
         * @type { ?Array<TextShadow> } textShadow gather.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        textShadows?: Array<TextShadow>;
        /**
         * Rect style of text.
         * @type { ?RectStyle } rect style for text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        backgroundRect?: RectStyle;
        /**
         * Text Style available font variations.
         * @type { ?Array<FontVariation> } A collection of font variations.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontVariations?: Array<FontVariation>;
    }
    /**
     * Provides the basis for graphics.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class FontCollection {
        /**
         * Get global FontCollection instance of the application.
         * @returns { FontCollection } The FontCollection object.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        static getGlobalInstance(): FontCollection;
        /**
         * Load font.
         * @param { string } name - the font name.
         * @param { string | Resource } path - the path of the font file.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        loadFontSync(name: string, path: string | Resource): void;
        /**
         * Clear font caches.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        clearCaches(): void;
    }
    /**
     * Describes strut style.
     * @typedef StrutStyle
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface StrutStyle {
        /**
         * The families of the font to use when calculating the strut.
         * @type { ?Array<string> } fontfamily gather
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontFamilies?: Array<string>;
        /**
         * The font style to use when calculating the strut.
         * @type { ?FontStyle } it is uint32_t type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontStyle?: FontStyle;
        /**
         * The font width to use when calculating the strut.
         * @type { ?FontWidth } it is uint32_t type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontWidth?: FontWidth;
        /**
         * The font weight to use when calculating the strut.
         * @type { ?FontWeight } it is uint32_t type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontWeight?: FontWeight;
        /**
         * The size of the ascent plus descent in logical pixels.
         * @type { ?number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontSize?: number;
        /**
         * The minimum height of the strut, as a multiple of fontSize.
         * @type { ?number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        height?: number;
        /**
         * The additional leading to apply to the strut as a multiple of Size.
         * @type { ?number } it is double type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        leading?: number;
        /**
         * Whether the strut height should be forced.
         * @type { ?boolean } it is boolean type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        forceHeight?: boolean;
        /**
         * Whether the strut style should be enable.
         * @type { ?boolean } it is boolean type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        enabled?: boolean;
        /**
         * Whether the height is override.
         * @type { ?boolean } it is boolean type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        heightOverride?: boolean;
        /**
         * Whether the half leading is enable.
         * @type { ?boolean } it is boolean type data
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        halfLeading?: boolean;
    }
    /**
     * Determines the configuration used by ParagraphBuilder to position lines within a Paragraph of text.
     * @typedef ParagraphStyle
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface ParagraphStyle {
        /**
         * Text style of paragraph.
         * @type { ?TextStyle }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        textStyle?: TextStyle;
        /**
         * Text runs direction.
         * @type { ?TextDirection }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        textDirection?: TextDirection;
        /**
         * Refers to how to align the horizontal position of text when displaying text.
         * @type { ?TextAlign }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        align?: TextAlign;
        /**
         * Word break strategy.
         * @type { ?WordBreak }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        wordBreak?: WordBreak;
        /**
         * Maximum number of lines.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        maxLines?: number;
        /**
         * text segmentation strategy.
         * @type { ?BreakStrategy }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        breakStrategy?: BreakStrategy;
        /**
         * Strut style of paragraph.
         * @type { ?StrutStyle }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        strutStyle?: StrutStyle;
        /**
         * Text height behavior of paragraph.
         * @type { ?TextHeightBehavior }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        textHeightBehavior?: TextHeightBehavior;
    }
    /**
     * Where to vertically align the placeholder relative to the surrounding text.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum PlaceholderAlignment {
        /**
         * Match the baseline of the placeholder with the baseline.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        OFFSET_AT_BASELINE,
        /**
         * Align the bottom edge of the placeholder with the baseline such that the placeholder
         * sits on top of the baseline.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ABOVE_BASELINE,
        /**
         * Align the top edge of the placeholder with the baseline specified in such that the placeholder
         * hangs below the baseline.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        BELOW_BASELINE,
        /**
         * Align the top edge of the placeholder with the top edge of the font. When the placeholder is very tall,
         * the extra space will hang from the top and extend through the bottom of the line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        TOP_OF_ROW_BOX,
        /**
         * Align the bottom edge of the placeholder with the bottom edge of the text. When the placeholder is very tall,
         * the extra space will rise from the bottom and extend through the top of the line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        BOTTOM_OF_ROW_BOX,
        /**
         * Align the middle of the placeholder with the middle of the text.When the placeholder is very tall,
         * the extra space will grow equally from the top and bottom of the line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        CENTER_OF_ROW_BOX
    }
    /**
     * Provide a description of placeholder scope in creating typography.
     * @typedef PlaceholderSpan
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface PlaceholderSpan {
        /**
         * The width of the placeholder.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        width: number;
        /**
         * The height of the placeholder.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        height: number;
        /**
         * Alignment mode of placeholder.
         * @type { PlaceholderAlignment }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        align: PlaceholderAlignment;
        /**
         * Baseline of placeholder.
         * @type { TextBaseline }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        baseline: TextBaseline;
        /**
         * Baseline offset of placeholder.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        baselineOffset: number;
    }
    /**
     * Provides the definition of the range.
     * @typedef Range
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface Range {
        /**
         * Left index.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        start: number;
        /**
         * Right index.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        end: number;
    }
    /**
     * A paragraph retains the size and position of each glyph in the text and can be efficiently resized and painted.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class Paragraph {
        /**
         * Calculates the positioning of all the glyphs.
         * @param { number } width - Control how wide the text is allowed to be.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        layoutSync(width: number): void;
        /**
         * Paint the laid out text onto the supplied canvas at (x, y).
         * @param { drawing.Canvas } canvas - Object
         * @param { number } x - Represents the X-axis position on the canvas.
         * @param { number } y - Represents the Y-axis position on the canvas.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        paint(canvas: drawing.Canvas, x: number, y: number): void;
        /**
         * Draw the laid out text onto the supplied canvas along the path and offset.
         * @param { drawing.Canvas } canvas - Canvas used to carry the drawn content and drawing status.
         * @param { drawing.Path } path - Path used to determine the position of the text.
         * @param { number } hOffset - Horizontal offset along the path.
         * @param { number } vOffset - Vertical offset along the path.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        paintOnPath(canvas: drawing.Canvas, path: drawing.Path, hOffset: number, vOffset: number): void;
        /**
         * Get max width of horizontal space this paragraph occupied.
         * @returns { number } Max width of horizontal space.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getMaxWidth(): number;
        /**
         * Get height of horizontal space this paragraph occupies.
         * @returns { number } Height of horizontal space this paragraph occupies.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getHeight(): number;
        /**
         * Get the longest line of horizontal space this paragraph occupies.
         * @returns { number } The longest line of horizontal space this paragraph occupies.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getLongestLine(): number;
        /**
         * Get the min intrinsic width of horizontal space this paragraph occupies.
         * @returns { number } The min intrinsic width of horizontal space this paragraph occupies.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getMinIntrinsicWidth(): number;
        /**
         * Get the max intrinsic width.
         * @returns { number } Intrinsic Width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getMaxIntrinsicWidth(): number;
        /**
         * Get the alphabetic baseline.
         * @returns { number } Alphabetic Baseline.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getAlphabeticBaseline(): number;
        /**
         * Get the ideographic baseline.
         * @returns { number } Ideographic Baseline.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getIdeographicBaseline(): number;
        /**
         * Get the rects for range.
         * @param { Range } range - The range to set.
         * @param { RectWidthStyle } widthStyle - Width style to set.
         * @param { RectHeightStyle } heightStyle - Height style to set.
         * @returns { Array<TextBox> } The rects for range.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getRectsForRange(range: Range, widthStyle: RectWidthStyle, heightStyle: RectHeightStyle): Array<TextBox>;
        /**
         * Get the rects for placeholders.
         * @returns { Array<TextBox> } The rects for placeholders.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getRectsForPlaceholders(): Array<TextBox>;
        /**
         * Get the glyph position at coordinate.
         * @param { number } x - the positionX of typography to set.
         * @param { number } y - the positionY of typography to set.
         * @returns { PositionWithAffinity } TextBlob object.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getGlyphPositionAtCoordinate(x: number, y: number): PositionWithAffinity;
        /**
         * Find the start and end position of the word containing the glyphs of the given offset.
         * @param { number } offset - offset value
         * @returns { Range } The range value returned to the caller.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getWordBoundary(offset: number): Range;
        /**
         * Get line count.
         * @returns { number } The line count value returned to the caller.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getLineCount(): number;
        /**
         * Get the line height of the specified line.
         * @param { number } line - line number
         * @returns { number } The line height value returned to the caller.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getLineHeight(line: number): number;
        /**
         * Get the line width of the specified line.
         * @param { number } line - line number
         * @returns { number } The line width value returned to the caller.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getLineWidth(line: number): number;
        /**
         * Return whether it exceed the maximum lines of typography.
         * @returns { boolean } The true indicates exceeding, the false indicates not exceeding.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        didExceedMaxLines(): boolean;
        /**
         * Get the text lines of paragraph.
         * @returns { Array<TextLine> } the tuple of TextLine.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getTextLines(): Array<TextLine>;
        /**
         * Returns the visible text on the line (excluding a possible ellipsis).
         * @param { number } lineNumber - a line number
         * @param { boolean } includeSpaces - indicates if the whitespaces should be included
         * @returns { Range } The range of text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getActualTextRange(lineNumber: number, includeSpaces: boolean): Range;
        /**
         * Returns the array of line metrics for a line of text.
         * @returns { Array<LineMetrics> } Array of line metrics.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getLineMetrics(): Array<LineMetrics>;
        /**
         * Returns line metrics info for the line.
         * @param { number } lineNumber - a line number
         * @returns { LineMetrics | undefined } line metrics.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getLineMetrics(lineNumber: number): LineMetrics | undefined;
    }
    /**
     * Box that contain text.
     * @typedef TextBox
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface TextBox {
        /**
         * Rect of text box.
         * @type { common2D.Rect }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        rect: common2D.Rect;
        /**
         * Text direction.
         * @type { TextDirection }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        direction: TextDirection;
    }
    /**
     * Position and affinity.
     * @typedef PositionWithAffinity
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface PositionWithAffinity {
        /**
         * Position of text.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        position: number;
        /**
         * Affinity of text.
         * @type { Affinity }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        affinity: Affinity;
    }
    /**
     * Enumerates rect width style.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum RectWidthStyle {
        /**
         * Tight width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        TIGHT,
        /**
         * Max width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        MAX
    }
    /**
     * Enumerates rect height style.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum RectHeightStyle {
        /**
         * Provide tight bounding boxes that fit heights per run.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        TIGHT,
        /**
         * The height of the boxes will be the maximum height of all runs in the line. All rects in the same
         * line will be the same height.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        MAX,
        /**
         * The top and bottom of each rect will cover half of the space above and half of the space below the line.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        INCLUDE_LINE_SPACE_MIDDLE,
        /**
         * The line spacing will be added to the top of the rect.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        INCLUDE_LINE_SPACE_TOP,
        /**
         * The line spacing will be added to the bottom of the rect.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        INCLUDE_LINE_SPACE_BOTTOM,
        /**
         * The height of the boxes will be calculated by text strut.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        STRUT
    }
    /**
     * Enumerates text affinity.When a selection range involves line breaks or other special characters, the
     * affinity determines which side of the characters the start and end of the selection range should be
     * closer to.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum Affinity {
        /**
         * The position has affinity for the upstream side of the text position.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        UPSTREAM,
        /**
         * The position has affinity for the downstream side of the text position.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DOWNSTREAM
    }
    /**
     * Builds a Paragraph containing text with the given styling information.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class ParagraphBuilder {
        /**
         * Constructor ParagraphBuilder.
         * @param { ParagraphStyle } paragraphStyle - Paragraph style {@link ParagraphStyle}
         * @param { FontCollection } fontCollection - Font collection {@link FontCollection}
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        constructor(paragraphStyle: ParagraphStyle, fontCollection: FontCollection);
        /**
         * Push a style to the stack.
         * @param { TextStyle } textStyle - Text style {@link TextStyle}
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        pushStyle(textStyle: TextStyle): void;
        /**
         * Remove a style from the stack.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        popStyle(): void;
        /**
         * Adds text to the builder.
         * @param { string } text - Text string
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        addText(text: string): void;
        /**
         * Add placeholder.
         * @param { PlaceholderSpan } placeholderSpan - Placeholder Span {@link PlaceholderSpan}
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        addPlaceholder(placeholderSpan: PlaceholderSpan): void;
        /**
         * Create paragraph object.
         * @returns { Paragraph } The paragraph value returned to the caller.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        build(): Paragraph;
        /**
         * Add symbolId.
         * @param { number } symbolId - Symbol Id
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        addSymbol(symbolId: number): void;
    }
    /**
     * The structure of text line that provides the basis of paragraph for graphics.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class TextLine {
        /**
         * Get the count of glyphs.
         * @returns { number } The counts of glyphs.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getGlyphCount(): number;
        /**
         * Get the range of text line.
         * @returns { Range } The range of text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getTextRange(): Range;
        /**
         * Get the glyph runs of text line.
         * @returns { Array<Run> } The tuple of glyph runs of text.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getGlyphRuns(): Array<Run>;
        /**
         * Paint the range of text line.
         * @param { drawing.Canvas } canvas - Canvas.
         * @param { number } x - Represents the X-axis position on the canvas.
         * @param { number } y - Represents the Y-axis position on the canvas.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        paint(canvas: drawing.Canvas, x: number, y: number): void;
    }
    /**
     * Independent rendering of text layout.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class Run {
        /**
         * Gets the number of glyph.
         * @returns { number } The number of glyph.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getGlyphCount(): number;
        /**
         * Gets the glyph identifier for each character.
         * @returns { Array<number> } Glyph identifier.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getGlyphs(): Array<number>;
        /**
         * Gets the font position offset.
         * @returns { Array<common2D.Point> } The position of the font in the layout.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getPositions(): Array<common2D.Point>;
        /**
       * Gets the font position offset array.
       * @returns { Array<common2D.Point> } The position offset of the font in the layout.
       * @syscap SystemCapability.Graphics.Drawing
       * @since 12
       */
        getOffsets(): Array<common2D.Point>;
        /**
         * Gets the font object instance.
         * @returns { drawing.Font } The font object instance.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getFont(): drawing.Font;
        /**
         * Paint the laid out text onto the supplied canvas at (x, y).
         * @param { drawing.Canvas } canvas - Object.
         * @param { number } x - Represents the X-axis position on the canvas.
         * @param { number } y - Represents the Y-axis position on the canvas.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        paint(canvas: drawing.Canvas, x: number, y: number): void;
    }
    /**
     * Describes the layout information and metrics for a continuous piece of text (a run) in a line of text.
     * @typedef RunMetrics
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface RunMetrics {
        /**
         * The metrics of an Font.
         * @type { TextStyle }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        textStyle: TextStyle;
        /**
         * Describes text style.
         * @type { drawing.FontMetrics }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        fontMetrics: drawing.FontMetrics;
    }
    /**
     * Describes the metric information for a line of text in a text layout.
     * @typedef LineMetrics
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface LineMetrics {
        /**
         * The indexes in the text buffer the line begins.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        startIndex: number;
        /**
         * The indexes in the text buffer the line ends.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        endIndex: number;
        /**
         * The height of the text rise, the distance from the baseline to the top of the character.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ascent: number;
        /**
         * The height of the text drop, the distance from the baseline to the bottom of the character.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        descent: number;
        /**
         * The height of the current line is `round(ascent + descent)`.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        height: number;
        /**
         * Width of the line.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        width: number;
        /**
         * The left edge of the line. The right edge can be obtained with `left + width`.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        left: number;
        /**
         * The y position of the baseline for this line from the top of the paragraph.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        baseline: number;
        /**
         * Zero indexed line number.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        lineNumber: number;
        /**
         * Height from the top.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        topHeight: number;
        /**
         * Mapping between text index ranges and the FontMetrics associated with
         * them. The first run will be keyed under start_index. The metrics here.
         * are before layout and are the base values we calculate from.
         * @type { Map<number, RunMetrics> }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        runMetrics: Map<number, RunMetrics>;
    }
}
export default text;
