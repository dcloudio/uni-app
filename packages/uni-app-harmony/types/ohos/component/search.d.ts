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
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class SearchController extends TextContentControllerBase {
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    constructor();
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @param { number } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @param { number } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @param { number } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    caretPosition(value: number): void;
    /**
     * Exit edit state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Exit edit state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    stopEditing(): void;
}
/**
 * Enum for the style of cancel button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enum for the style of cancel button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum CancelButtonStyle {
    /**
     * The value of button style constant
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The value of button style constant
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    CONSTANT,
    /**
     * The value of button style invisible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The value of button style invisible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    INVISIBLE,
    /**
     * The value of button style input
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The value of button style input
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    INPUT
}
/**
 * Declare the type of search input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare enum SearchType {
    /**
     * Basic input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    NORMAL = 0,
    /**
     * Pure digital input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    NUMBER = 2,
    /**
     * Phone number entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    PHONE_NUMBER = 3,
    /**
     * E-mail address input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    EMAIL = 5
}
/**
 * The construct function of search
 *
 * @interface SearchInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The construct function of search
 *
 * @interface SearchInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The construct function of search
 *
 * @interface SearchInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface SearchInterface {
    /**
     * The options of SearchInterface
     *
     * @param { object } options
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The options of SearchInterface
     *
     * @param { object } options
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The options of SearchInterface
     *
     * @param { object } options
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (options?: {
        /**
         * Text input in the search text box
         *
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * Text input in the search text box
         *
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        value?: string;
        /**
         * Text displayed when there is no input
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * Text displayed when there is no input
         *
         * @type { ?ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * Text displayed when there is no input
         *
         * @type { ?ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        placeholder?: ResourceStr;
        /**
         * Path to the search icon
         *
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * Path to the search icon
         *
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        icon?: string;
        /**
         * Controller of the <Search> component
         *
         * @type { ?SearchController }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * Controller of the <Search> component
         *
         * @type { ?SearchController }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 11
         */
        controller?: SearchController;
    }): SearchAttribute;
}
/**
 * Defines the icon options
 *
 * @interface IconOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the icon options
 *
 * @interface IconOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface IconOptions {
    /**
     * Set the icon size
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the icon size
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    size?: Length;
    /**
     * Set the icon color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the icon color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    color?: ResourceColor;
    /**
     * Set the icon resource
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the icon resource
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    src?: ResourceStr;
}
/**
 * Defines the cursor style
 *
 * @interface CaretStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the cursor style
 *
 * @interface CaretStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface CaretStyle {
    /**
     * Set the cursor width
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the cursor width
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    width?: Length;
    /**
     * Set the cursor color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the cursor color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    color?: ResourceColor;
}
/**
 * Defines the SearchButton options
 *
 * @interface SearchButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the SearchButton options
 *
 * @interface SearchButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface SearchButtonOptions {
    /**
     * Set the SearchButton fontSize
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the SearchButton fontSize
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontSize?: Length;
    /**
     * Set the SearchButton fontColor
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the SearchButton fontColor
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontColor?: ResourceColor;
}
/**
 * The attribute function of search
 *
 * @extends CommonMethod<SearchAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The attribute function of search
 *
 * @extends CommonMethod<SearchAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The attribute function of search
 *
 * @extends CommonMethod<SearchAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class SearchAttribute extends CommonMethod<SearchAttribute> {
    /**
     * Set the search button text
     *
     * @param { string } value - indicates the text of the search button.
     * @param { SearchButtonOption } option
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the search button text, fontSize and fontColor
     *
     * @param { string } value - indicates the text of the search button.
     * @param { SearchButtonOptions } option - indicates the fontSize and fontColor of the search button.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the search button text, fontSize and fontColor
     *
     * @param { string } value - indicates the text of the search button.
     * @param { SearchButtonOptions } option - indicates the fontSize and fontColor of the search button.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    searchButton(value: string, option?: SearchButtonOptions): SearchAttribute;
    /**
     * Set the text Color
     *
     * @param { ResourceColor } value - indicates the color of the text.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the text Color
     *
     * @param { ResourceColor } value - indicates the color of the text.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontColor(value: ResourceColor): SearchAttribute;
    /**
     * Set the search icon style
     *
     * @param { IconOptions } value - indicates the style of the search icon.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the search icon style
     *
     * @param { IconOptions } value - indicates the style of the search icon.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    searchIcon(value: IconOptions): SearchAttribute;
    /**
     * Set the cancel button style
     *
     * @param { object } value - indicates the style of the cancel button.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the cancel button style
     *
     * @param { object } value - indicates the style of the cancel button.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    cancelButton(value: {
        style?: CancelButtonStyle;
        icon?: IconOptions;
    }): SearchAttribute;
    /**
     * Set the cursor style
     *
     * @param { CaretStyle } value - indicates the style of the cursor.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the cursor style
     *
     * @param { CaretStyle } value - indicates the style of the cursor.
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    caretStyle(value: CaretStyle): SearchAttribute;
    /**
     * Set the place hold text color
     *
     * @param { ResourceColor } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the place hold text color
     *
     * @param { ResourceColor } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the place hold text color
     *
     * @param { ResourceColor } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    placeholderColor(value: ResourceColor): SearchAttribute;
    /**
     * Set the font used for place holder text
     *
     * @param { Font } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the font used for place holder text
     *
     * @param { Font } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the font used for place holder text
     *
     * @param { Font } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    placeholderFont(value?: Font): SearchAttribute;
    /**
     * Set the font used for input text
     *
     * @param { Font } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the font used for input text
     *
     * @param { Font } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the font used for input text
     *
     * @param { Font } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    textFont(value?: Font): SearchAttribute;
    /**
     * Call the function when clicked the search button
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Call the function when clicked the search button
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Call the function when clicked the search button
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onSubmit(callback: (value: string) => void): SearchAttribute;
    /**
     * Call the function when editing the input text
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Call the function when editing the input text
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Call the function when editing the input text
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onChange(callback: (value: string) => void): SearchAttribute;
    /**
     * Called when the text selection changes.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the text selection changes.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onTextSelectionChange(callback: (selectionStart: number, selectionEnd: number) => void): SearchAttribute;
    /**
     * Called when the content scrolls.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the content scrolls.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onContentScroll(callback: (totalOffsetX: number, totalOffsetY: number) => void): SearchAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCopy(callback: (value: string) => void): SearchAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCut(callback: (value: string) => void): SearchAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     *          Executed when a paste operation is performed.
     *          { string } value - The text content to be pasted.
     *          { PasteEvent } event - The user-defined paste event.
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onPaste(callback: (value: string, event: PasteEvent) => void): SearchAttribute;
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    copyOption(value: CopyOptions): SearchAttribute;
    /**
     * Called when the input of maximum text length is set.
     *
     * @param { number } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * crossplatform
     * @since 11
     */
    maxLength(value: number): SearchAttribute;
    /**
     * Called when the text align is set.
     *
     * @param { TextAlign } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the text align is set.
     *
     * @param { TextAlign } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the text align is set.
     *
     * @param { TextAlign } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    textAlign(value: TextAlign): SearchAttribute;
    /**
     * Sets whether request keyboard or not when on focus.
     *
     * @param { boolean } value
     * @returns { SearchAttribute } Returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets whether request keyboard or not when on focus.
     *
     * @param { boolean } value
     * @returns { SearchAttribute } Returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableKeyboardOnFocus(value: boolean): SearchAttribute;
    /**
     * Controls whether the selection menu pops up.
     *
     * @param { boolean } value
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Controls whether the selection menu pops up.
     *
     * @param { boolean } value
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    selectionMenuHidden(value: boolean): SearchAttribute;
    /**
     * Define custom keyboard.
     *
     * @param { CustomBuilder } value
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define custom keyboard.
     *
     * @param { CustomBuilder } value
     * @returns { SearchAttribute } returns the instance of the SearchAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    customKeyboard(value: CustomBuilder): SearchAttribute;
    /**
     * Called when the search type is set.
     *
     * @param { SearchType } value
     * @returns { SearchAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    type(value: SearchType): SearchAttribute;
}
/**
 * Defines Search Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Search Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Search Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const Search: SearchInterface;
/**
 * Defines Search Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Search Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Search Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const SearchInstance: SearchAttribute;
