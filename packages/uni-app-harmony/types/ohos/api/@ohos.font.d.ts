/*
 * Copyright (c) 2022-2024 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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
 * @namespace font
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * @namespace font
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * @namespace font
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace font {
    /**
     * @typedef FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * @typedef FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * @typedef FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface FontOptions {
        /**
         * The font name to register.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         */
        /**
         * The font name to register.
         *
         * @type { string | Resource }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The font name to register.
         *
         * @type { string | Resource }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * The font name to register.
         *
         * @type { string | Resource }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        familyName: string | Resource;
        /**
         * The path of the font file.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         */
        /**
         * The path of the font file.
         *
         * @type { string | Resource }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The path of the font file.
         *
         * @type { string | Resource }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * The path of the font file.
         *
         * @type { string | Resource }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        familySrc: string | Resource;
    }
    /**
     * @typedef FontInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * @typedef FontInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * @typedef FontInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface FontInfo {
        /**
         * The path of the font file.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The path of the font file.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * The path of the font file.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        path: string;
        /**
         * The name of postscript.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The name of postscript.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * The name of postscript.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        postScriptName: string;
        /**
         * The font name.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The font name.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * The font name.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        fullName: string;
        /**
         * A set of fonts with a common design.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * A set of fonts with a common design.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * A set of fonts with a common design.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        family: string;
        /**
         * A subset of the font family.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * A subset of the font family.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * A subset of the font family.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        subfamily: string;
        /**
         * The weight of the font.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The weight of the font.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * The weight of the font.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        weight: number;
        /**
         * The width of the font style.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The width of the font style.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * The width of the font style.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        width: number;
        /**
         * Whether it is italic.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * Whether it is italic.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * Whether it is italic.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        italic: boolean;
        /**
         * Whether it is compact.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * Whether it is compact.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * Whether it is compact.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        monoSpace: boolean;
        /**
         * Whether symbol fonts are supported.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * Whether symbol fonts are supported.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        /**
         * Whether symbol fonts are supported.
         *
         * @type { boolean }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        symbolic: boolean;
    }
    /**
     * @typedef UIFontConfig
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * @typedef UIFontConfig
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface UIFontConfig {
        /**
         * The paths of system font files.
         * @type { Array<string> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * The paths of system font files.
         * @type { Array<string> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        fontDir: Array<string>;
        /**
         * The generic font info.
         * @type { Array<UIFontGenericInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * The generic font info.
         * @type { Array<UIFontGenericInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        generic: Array<UIFontGenericInfo>;
        /**
         * The fallback font info.
         * @type { Array<UIFontFallbackGroupInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * The fallback font info.
         * @type { Array<UIFontFallbackGroupInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        fallbackGroups: Array<UIFontFallbackGroupInfo>;
    }
    /**
     * @typedef UIFontGenericInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * @typedef UIFontGenericInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface UIFontGenericInfo {
        /**
         * Name of the font set.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Name of the font set.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        family: string;
        /**
         * Alias info of the font set.
         * @type { Array<UIFontAliasInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Alias info of the font set.
         * @type { Array<UIFontAliasInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        alias: Array<UIFontAliasInfo>;
        /**
         * Adjust info of the font set.
         * @type { Array<UIFontAdjustInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Adjust info of the font set.
         * @type { Array<UIFontAdjustInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        adjust: Array<UIFontAdjustInfo>;
    }
    /**
     * @typedef UIFontAliasInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * @typedef UIFontAliasInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface UIFontAliasInfo {
        /**
         * Font set name.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Font set name.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        name: string;
        /**
         * Weight the font set contains only fonts with, if weight = 0,
         * this font set can contain fonts with any weight.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Weight the font set contains only fonts with, if weight = 0,
         * this font set can contain fonts with any weight.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        weight: number;
    }
    /**
     * @typedef UIFontAdjustInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * @typedef UIFontAdjustInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface UIFontAdjustInfo {
        /**
         * Original weight of the font
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Original weight of the font
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        weight: number;
        /**
         * Font weight displayed in the app
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Font weight displayed in the app
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        to: number;
    }
    /**
     * @typedef UIFontFallbackGroupInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * @typedef UIFontFallbackGroupInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface UIFontFallbackGroupInfo {
        /**
         * Indicates which font set uses following list for fallback font
         * if the font set name is "", it means that the following list can be fallback font for all font sets.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Indicates which font set uses following list for fallback font
         * if the font set name is "", it means that the following list can be fallback font for all font sets.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        fontSetName: string;
        /**
         * Fallback font list related.
         * @type { Array<UIFontFallbackInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Fallback font list related.
         * @type { Array<UIFontFallbackInfo> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        fallback: Array<UIFontFallbackInfo>;
    }
    /**
     * @typedef UIFontFallbackInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * @typedef UIFontFallbackInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface UIFontFallbackInfo {
        /**
         * Language that font set support.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Language that font set support.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        language: string;
        /**
         * Font name related.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Font name related.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        family: string;
    }
    /**
     * Register a customized font in the FontManager.
     *
     * @param { FontOptions } options - FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Register a customized font in the FontManager.
     *
     * @param { FontOptions } options - FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Register a customized font in the FontManager.
     *
     * @param { FontOptions } options - FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function registerFont(options: FontOptions): void;
    /**
     * Gets a list of fonts supported by system.
     *
     * @returns { Array<string> } A list of font names
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Gets a list of fonts supported by system.
     *
     * @returns { Array<string> } A list of font names
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Gets a list of fonts supported by system.
     *
     * @returns { Array<string> } A list of font names
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function getSystemFontList(): Array<string>;
    /**
     * Get font details according to the font name.
     *
     * @param { string } fontName - font name
     * @returns { FontInfo } Returns the font info
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get font details according to the font name.
     *
     * @param { string } fontName - font name
     * @returns { FontInfo } Returns the font info
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Get font details according to the font name.
     *
     * @param { string } fontName - font name
     * @returns { FontInfo } Returns the font info
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function getFontByName(fontName: string): FontInfo;
    /**
     * Get font details according to the font name.
     *
     * @returns { UIFontConfig } Returns the ui font config
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Get font details according to the font name.
     *
     * @returns { UIFontConfig } Returns the ui font config
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    function getUIFontConfig(): UIFontConfig;
}
export default font;
