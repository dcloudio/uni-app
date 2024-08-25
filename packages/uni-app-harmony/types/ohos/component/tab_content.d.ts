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
 * @kit ArkUI
 */
/**
 * Enum for the mode of the tab bar when selected.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enum for the mode of the tab bar when selected.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum SelectedMode {
    /**
     * The value of indicator
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The value of indicator
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    INDICATOR,
    /**
     * The value of board
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The value of board
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    BOARD
}
/**
 * Enum for the layout mode of the content in the tab bar.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enum for the layout mode of the content in the tab bar.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum LayoutMode {
    /**
     * The the content is laid vertically or horizontally, according to its width.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The the content is laid vertically or horizontally, according to its width.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    AUTO = 0,
    /**
     * The the content is laid vertically
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The the content is laid vertically
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    VERTICAL = 1,
    /**
     * The the content is laid horizontally
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The the content is laid horizontally
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    HORIZONTAL = 2
}
/**
 * Provide an interface for the style of an indicator including color, height, width, border radius
 * and margin top
 *
 * @interface IndicatorStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provide an interface for the style of an indicator including color, height, width, border radius
 * and margin top
 *
 * @interface IndicatorStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface IndicatorStyle {
    /**
     * Define the color of the indicator
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the color of the indicator
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    color?: ResourceColor;
    /**
     * Define the height of the indicator
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the height of the indicator
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    height?: Length;
    /**
     * Define the width of the indicator.
     * If it is 0, the width will be equal to the width of the content
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the width of the indicator.
     * If it is 0, the width will be equal to the width of the content
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    width?: Length;
    /**
     * Define the border radius of the indicator
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the border radius of the indicator
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    borderRadius?: Length;
    /**
     * Define the margin top of the indicator
     *
     * @type { ?Length }
     * @default 8
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the margin top of the indicator
     *
     * @type { ?Length }
     * @default 8
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    marginTop?: Length;
}
/**
 * Provide an interface for the style of an indicator including border radius
 *
 * @interface BoardStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provide an interface for the style of an indicator including border radius
 *
 * @interface BoardStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface BoardStyle {
    /**
     * Define the border radius of the board
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the border radius of the board
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    borderRadius?: Length;
}
/**
 * LabelStyle object.
 *
 * @interface LabelStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * LabelStyle object.
 *
 * @interface LabelStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface LabelStyle {
    /**
     * overflow mode.
     *
     * @type { ?TextOverflow }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * overflow mode.
     *
     * @type { ?TextOverflow }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    overflow?: TextOverflow;
    /**
     * Label max lines.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Label max lines.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxLines?: number;
    /**
     * Min font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Min font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    minFontSize?: number | ResourceStr;
    /**
     * Max font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Max font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxFontSize?: number | ResourceStr;
    /**
     * Adapt text height option.
     *
     * @type { ?TextHeightAdaptivePolicy }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Adapt text height option.
     *
     * @type { ?TextHeightAdaptivePolicy }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    heightAdaptivePolicy?: TextHeightAdaptivePolicy;
    /**
     * Font style.
     *
     * @type { ?Font }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Font style.
     *
     * @type { ?Font }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    font?: Font;
    /**
     * The text color of the selected tab bar.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    selectedColor?: ResourceColor;
    /**
     * The text color of the unselected tab bar.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    unselectedColor?: ResourceColor;
}
/**
 * TabBarIconStyle object.
 *
 * @interface TabBarIconStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface TabBarIconStyle {
    /**
     * The icon color of the selected tab bar.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    selectedColor?: ResourceColor;
    /**
     * The icon color of the unselected tab bar.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    unselectedColor?: ResourceColor;
}
/**
 * TabBarSymbol object.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class TabBarSymbol {
    /**
     * The properties of the symbol icon in the tab bar need to be unselected.
     *
     * @type { SymbolGlyphModifier }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    normal: SymbolGlyphModifier;
    /**
     * The properties of the symbol icon in the tab bar need to be selected.
     *
     * @type { ?SymbolGlyphModifier }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    selected?: SymbolGlyphModifier;
}
/**
 * Define SubTabBarStyle, the style is text and underline.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Define SubTabBarStyle, the style is text and underline.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Define SubTabBarStyle, the style is text and underline.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class SubTabBarStyle {
    /**
     * constructor.
     *
     * @param { ResourceStr } content - indicates the content of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * constructor.
     *
     * @param { ResourceStr } content - indicates the content of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * constructor.
     *
     * @param { ResourceStr } content - indicates the content of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    constructor(content: ResourceStr);
    /**
     * constructor.
     *
     * @param { ResourceStr | ComponentContent } content - indicates the content of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(content: ResourceStr | ComponentContent);
    /**
     * constructor
     *
     * @param { ResourceStr } content - indicates the content of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * constructor
     *
     * @param { ResourceStr } content - indicates the content of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    static of(content: ResourceStr): SubTabBarStyle;
    /**
     * Create a content object of the sub tab bar
     *
     * @param { ResourceStr | ComponentContent } content - indicates the content of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static of(content: ResourceStr | ComponentContent): SubTabBarStyle;
    /**
     * Set the style of the indicator when selected
     *
     * @param { IndicatorStyle } value - indicates the indicator style of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the style of the indicator when selected
     *
     * @param { IndicatorStyle } value - indicates the indicator style of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    indicator(value: IndicatorStyle): SubTabBarStyle;
    /**
     * Set the mode of the indicator when selected
     *
     * @param { SelectedMode } value - indicates the selected mode of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the mode of the indicator when selected
     *
     * @param { SelectedMode } value - indicates the selected mode of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    selectedMode(value: SelectedMode): SubTabBarStyle;
    /**
     * Set the style of the board when selected
     *
     * @param { BoardStyle } value - indicates the board style of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the style of the board when selected
     *
     * @param { BoardStyle } value - indicates the board style of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    board(value: BoardStyle): SubTabBarStyle;
    /**
     * Set the label style of the indicator
     *
     * @param { LabelStyle } value - indicates the label style of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the label style of the indicator
     *
     * @param { LabelStyle } value - indicates the label style of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    labelStyle(value: LabelStyle): SubTabBarStyle;
    /**
     * Set the padding of the sub tab bar
     *
     * @param { Padding | Dimension } value - indicates the padding of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the padding of the sub tab bar
     *
     * @param { Padding | Dimension } value - indicates the padding of the sub tab bar
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    padding(value: Padding | Dimension): SubTabBarStyle;
    /**
     * Set an id to the sub tab bar to identify it
     *
     * @param { string } value - id of the sub tab bar to identify it
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Set an id to the sub tab bar to identify it
     *
     * @param { string } value - id of the sub tab bar to identify it
     * @returns { SubTabBarStyle } the style of the sub tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    id(value: string): SubTabBarStyle;
}
/**
 * Define BottomTabBarStyle, the style is icon and text.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Define BottomTabBarStyle, the style is icon and text.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Define BottomTabBarStyle, the style is icon and text.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class BottomTabBarStyle {
    /**
     * constructor.
     *
     * @param { ResourceStr } icon - indicates the icon of the bottom tab bar
     * @param { ResourceStr } text - indicates the text of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * constructor.
     *
     * @param { ResourceStr } icon - indicates the icon of the bottom tab bar
     * @param { ResourceStr } text - indicates the text of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * constructor.
     *
     * @param { ResourceStr } icon - indicates the icon of the bottom tab bar
     * @param { ResourceStr } text - indicates the text of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * constructor.
     *
     * @param { ResourceStr | TabBarSymbol } icon - indicates the icon of the bottom tab bar
     * @param { ResourceStr } text - indicates the text of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(icon: ResourceStr | TabBarSymbol, text: ResourceStr);
    /**
     * of.
     *
     * @param { ResourceStr } icon - indicates the icon of the bottom tab bar
     * @param { ResourceStr } text - indicates the text of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * of.
     *
     * @param { ResourceStr } icon - indicates the icon of the bottom tab bar
     * @param { ResourceStr } text - indicates the text of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * of.
     *
     * @param { ResourceStr | TabBarSymbol } icon - indicates the icon of the bottom tab bar
     * @param { ResourceStr } text - indicates the text of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    static of(icon: ResourceStr | TabBarSymbol, text: ResourceStr): BottomTabBarStyle;
    /**
     * Set the label style of the indicator
     *
     * @param { LabelStyle } value - indicates the label style of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the label style of the indicator
     *
     * @param { LabelStyle } value - indicates the label style of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    labelStyle(value: LabelStyle): BottomTabBarStyle;
    /**
     * Set the padding of the bottom tab bar
     *
     * @param { Padding | Dimension } value - indicates the padding of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the padding of the bottom tab bar
     *
     * @param { Padding | Dimension } value - indicates the padding of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    padding(value: Padding | Dimension): BottomTabBarStyle;
    /**
     * Set the layout mode of the bottom tab bar
     *
     * @param { LayoutMode } value - indicates the layout mode of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the layout mode of the bottom tab bar
     *
     * @param { LayoutMode } value - indicates the layout mode of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    layoutMode(value: LayoutMode): BottomTabBarStyle;
    /**
     * Set the vertical alignment style of the bottom tab bar
     *
     * @param { VerticalAlign } value - indicates the vertical alignment of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the vertical alignment style of the bottom tab bar
     *
     * @param { VerticalAlign } value - indicates the vertical alignment of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    verticalAlign(value: VerticalAlign): BottomTabBarStyle;
    /**
     * Set the symmetric extensible of the bottom tab bar
     *
     * @param { boolean } value - indicates whether the bottom tab bar is extensible
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the symmetric extensible of the bottom tab bar
     *
     * @param { boolean } value - indicates whether the bottom tab bar is extensible
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    symmetricExtensible(value: boolean): BottomTabBarStyle;
    /**
     * Set an id to the bottom tab bar to identify it
     *
     * @param { string } value - id of the bottom tab bar to identify it
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Set an id to the bottom tab bar to identify it
     *
     * @param { string } value - id of the bottom tab bar to identify it
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    id(value: string): BottomTabBarStyle;
    /**
     * Set the icon style of the bottom tab bar
     *
     * @param { TabBarIconStyle } style - indicates the icon style of the bottom tab bar
     * @returns { BottomTabBarStyle } the style of the bottom tab bar
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    iconStyle(style: TabBarIconStyle): BottomTabBarStyle;
}
/**
 * Provides an interface for switching the content view on a tab page.
 *
 * @interface TabContentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for switching the content view on a tab page.
 *
 * @interface TabContentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for switching the content view on a tab page.
 *
 * @interface TabContentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface TabContentInterface {
    /**
     * Called when the content view of the switch tab is set.
     *
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the content view of the switch tab is set.
     *
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the content view of the switch tab is set.
     *
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (): TabContentAttribute;
}
/**
 * Defines the attribute functions of TabContent.
 *
 * @extends CommonMethod<TabContentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the attribute functions of TabContent.
 *
 * @extends CommonMethod<TabContentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the attribute functions of TabContent.
 *
 * @extends CommonMethod<TabContentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class TabContentAttribute extends CommonMethod<TabContentAttribute> {
    /**
     * Called when tabbar is entered.
     *
     * @param { string | Resource | { icon?: string | Resource; text?: string | Resource } } value
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when tabbar is entered.
     *
     * @param { string | Resource | CustomBuilder | { icon?: string | Resource; text?: string | Resource } } value
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when tabbar is entered.
     *
     * @param { string | Resource | CustomBuilder | { icon?: string | Resource; text?: string | Resource } } value
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when tabbar is entered.
     *
     * @param { string | Resource | CustomBuilder | { icon?: string | Resource; text?: string | Resource } } value
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    tabBar(value: string | Resource | CustomBuilder | {
        icon?: string | Resource;
        text?: string | Resource;
    }): TabContentAttribute;
    /**
     * Called when tabbar is entered.
     *
     * @param { SubTabBarStyle | BottomTabBarStyle } value
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when tabbar is entered.
     *
     * @param { SubTabBarStyle | BottomTabBarStyle } value
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when tabbar is entered.
     *
     * @param { SubTabBarStyle | BottomTabBarStyle } value
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    tabBar(value: SubTabBarStyle | BottomTabBarStyle): TabContentAttribute;
    /**
     * Called when the tab content will show.
     * @param { VoidCallback  } event
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onWillShow(event: VoidCallback): TabContentAttribute;
    /**
     * Called when the tab content will hide.
     * @param { VoidCallback  } event
     * @returns { TabContentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onWillHide(event: VoidCallback): TabContentAttribute;
}
/**
 * Defines TabContent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TabContent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TabContent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const TabContent: TabContentInterface;
/**
 * Defines TabContent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TabContent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TabContent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const TabContentInstance: TabContentAttribute;
