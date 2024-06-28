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
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
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
declare class TextAreaController extends TextContentControllerBase {
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
     * Text selection is achieved by specifying the start and end positions of the text.
     *
     * @param { number } selectionStart - The start position of the selected text.
     * @param { number } selectionEnd - The end position of the selected text.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Text selection is achieved by specifying the start and end positions of the text.
     *
     * @param { number } selectionStart - The start position of the selected text.
     * @param { number } selectionEnd - The end position of the selected text.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Text selection is achieved by specifying the start and end positions of the text.
     *
     * @param { number } selectionStart - The start position of the selected text.
     * @param { number } selectionEnd - The end position of the selected text.
     * @param { SelectionOptions } [options] - Indicates the options of the text selection.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    setTextSelection(selectionStart: number, selectionEnd: number, options?: SelectionOptions): void;
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
 * Defines the options of TextArea.
 *
 * @interface TextAreaOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of TextArea.
 *
 * @interface TextAreaOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the options of TextArea.
 *
 * @interface TextAreaOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface TextAreaOptions {
    /**
     * The place holder text string.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The place holder text string.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The place holder text string.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    placeholder?: ResourceStr;
    /**
     * Sets the current value of TextArea.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the current value of TextArea.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the current value of TextArea.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    text?: ResourceStr;
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @type { ?TextAreaController }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @type { ?TextAreaController }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @type { ?TextAreaController }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    controller?: TextAreaController;
}
/**
 * Provides an interface for the multi-line text input component.
 *
 * @interface TextAreaInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for the multi-line text input component.
 *
 * @interface TextAreaInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the multi-line text input component.
 *
 * @interface TextAreaInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface TextAreaInterface {
    /**
     * Called when writing multiple lines of text.
     *
     * @param { TextAreaOptions } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when writing multiple lines of text.
     *
     * @param { TextAreaOptions } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when writing multiple lines of text.
     *
     * @param { TextAreaOptions } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (value?: TextAreaOptions): TextAreaAttribute;
}
/**
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare enum TextAreaType {
    /**
     * Basic input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Basic input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    NORMAL = 0,
    /**
     * Pure digital input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Pure digital input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    NUMBER = 2,
    /**
     * Phone number entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Phone number entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    PHONE_NUMBER = 3,
    /**
     * E-mail address input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * E-mail address input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    EMAIL = 5,
    /**
     * Number decimal entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    NUMBER_DECIMAL = 12
}
/**
 * Declare the content type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
declare enum ContentType {
    /**
     * User name content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    USER_NAME = 0,
    /**
     * Password content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    PASSWORD = 1,
    /**
     * New password content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    NEW_PASSWORD = 2,
    /**
     * Full street address content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    FULL_STREET_ADDRESS = 3,
    /**
     * House number content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    HOUSE_NUMBER = 4,
    /**
     * District address content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    DISTRICT_ADDRESS = 5,
    /**
     * City address content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    CITY_ADDRESS = 6,
    /**
     * Province address content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    PROVINCE_ADDRESS = 7,
    /**
     * Country address content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    COUNTRY_ADDRESS = 8,
    /**
     * Person full name content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    PERSON_FULL_NAME = 9,
    /**
     * Person last name content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    PERSON_LAST_NAME = 10,
    /**
     * Person first name content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    PERSON_FIRST_NAME = 11,
    /**
     * Phone number content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    PHONE_NUMBER = 12,
    /**
     * Phone country code content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    PHONE_COUNTRY_CODE = 13,
    /**
     * Full phone number content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    FULL_PHONE_NUMBER = 14,
    /**
     * Email address content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    EMAIL_ADDRESS = 15,
    /**
     * Bank card number content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    BANK_CARD_NUMBER = 16,
    /**
     * ID card number content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    ID_CARD_NUMBER = 17,
    /**
     * Nickname content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    NICKNAME = 23,
    /**
     * Detail info without street content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    DETAIL_INFO_WITHOUT_STREET = 24,
    /**
     * Format address content type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    FORMAT_ADDRESS = 25
}
/**
 * Defines the attribute functions of TextArea.
 *
 * @extends CommonMethod<TextAreaAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the attribute functions of TextArea.
 *
 * @extends CommonMethod<TextAreaAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the attribute functions of TextArea.
 *
 * @extends CommonMethod<TextAreaAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class TextAreaAttribute extends CommonMethod<TextAreaAttribute> {
    /**
     * Called when the color of the placeholder is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the color of the placeholder is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the color of the placeholder is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    placeholderColor(value: ResourceColor): TextAreaAttribute;
    /**
     * Called when the font property of the placeholder is set.
     *
     * @param { Font } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font property of the placeholder is set.
     *
     * @param { Font } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font property of the placeholder is set.
     *
     * @param { Font } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    placeholderFont(value: Font): TextAreaAttribute;
    /**
     * Called when the type of soft keyboard input button is set.
     *
     * @param { EnterKeyType } value: the type of soft keyboard
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the type of soft keyboard input button is set.
     *
     * @param { EnterKeyType } value: the type of soft keyboard
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enterKeyType(value: EnterKeyType): TextAreaAttribute;
    /**
     * Called when the alignment of the contents of a multiline text box is set.
     *
     * @param { TextAlign } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the alignment of the contents of a multiline text box is set.
     *
     * @param { TextAlign } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the alignment of the contents of a multiline text box is set.
     *
     * @param { TextAlign } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    textAlign(value: TextAlign): TextAreaAttribute;
    /**
     * Called when the insertion cursor color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the insertion cursor color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the insertion cursor color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    caretColor(value: ResourceColor): TextAreaAttribute;
    /**
     * Called when the font color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontColor(value: ResourceColor): TextAreaAttribute;
    /**
     * Called when the font size is set.
     *
     * @param { Length } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font size is set.
     *
     * @param { Length } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font size is set.
     *
     * @param { Length } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontSize(value: Length): TextAreaAttribute;
    /**
     * Called when the font style of a font is set.
     *
     * @param { FontStyle } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font style of a font is set.
     *
     * @param { FontStyle } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font style of a font is set.
     *
     * @param { FontStyle } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontStyle(value: FontStyle): TextAreaAttribute;
    /**
     * Called when the font weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontWeight(value: number | FontWeight | string): TextAreaAttribute;
    /**
     * Called when the font list of text is set.
     *
     * @param { ResourceStr } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font list of text is set.
     *
     * @param { ResourceStr } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font list of text is set.
     *
     * @param { ResourceStr } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontFamily(value: ResourceStr): TextAreaAttribute;
    /**
     * Called when the overflow mode of the font is set.
     *
     * @param { TextOverflow } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    textOverflow(value: TextOverflow): TextAreaAttribute;
    /**
     * Specify the indentation of the first line in a text-block.
     *
     * @param { Dimension } value - The length of text indent.
     * @returns { TextAreaAttribute } The attribute of the text.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    textIndent(value: Dimension): TextAreaAttribute;
    /**
     * Called when the inputFilter of text is set.
     *
     * @param { ResourceStr } value
     * @param { function } error
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the inputFilter of text is set.
     *
     * @param { ResourceStr } value
     * @param { function } error
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the inputFilter of text is set.
     *
     * @param { ResourceStr } value
     * @param { function } error
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    inputFilter(value: ResourceStr, error?: (value: string) => void): TextAreaAttribute;
    /**
     * Define the caret style of the text input
     *
     * @param { CaretStyle } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    caretStyle(value: CaretStyle): TextAreaAttribute;
    /**
     * Define the text selected background color of the text input.
     *
     * @param { ResourceColor } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    selectedBackgroundColor(value: ResourceColor): TextAreaAttribute;
    /**
     * Called when submitted.
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when submitted.
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onSubmit(callback: (enterKey: EnterKeyType) => void): TextAreaAttribute;
    /**
     * Called when the input changes.
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the input changes.
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the input changes.
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onChange(callback: (value: string) => void): TextAreaAttribute;
    /**
     * Called when the text selection changes.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the text selection changes.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onTextSelectionChange(callback: (selectionStart: number, selectionEnd: number) => void): TextAreaAttribute;
    /**
     * Called when the content scrolls.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the content scrolls.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onContentScroll(callback: (totalOffsetX: number, totalOffsetY: number) => void): TextAreaAttribute;
    /**
     * Called when judging whether the text editing change finished.
     *
     * @param { function } callback - Triggered when the text area status changes.
     * If the value of isEditing is true, text area is in progress.
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when judging whether the text editing change finished.
     *
     * @param { function } callback - Triggered when the text area status changes.
     * If the value of isEditing is true, text area is in progress.
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onEditChange(callback: (isEditing: boolean) => void): TextAreaAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCopy(callback: (value: string) => void): TextAreaAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCut(callback: (value: string) => void): TextAreaAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
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
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onPaste(callback: (value: string, event: PasteEvent) => void): TextAreaAttribute;
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    copyOption(value: CopyOptions): TextAreaAttribute;
    /**
     * Sets whether request keyboard or not when on focus.
     *
     * @param { boolean } value
     * @returns { TextAreaAttribute } Returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets whether request keyboard or not when on focus.
     *
     * @param { boolean } value
     * @returns { TextAreaAttribute } Returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableKeyboardOnFocus(value: boolean): TextAreaAttribute;
    /**
     * Define the max length content of the text area.
     *
     * @param { number } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define the max length content of the text area.
     *
     * @param { number } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxLength(value: number): TextAreaAttribute;
    /**
     * Define show counter of the text area.
     *
     * @param { boolean } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define show counter of the text area.
     *
     * @param { boolean } value - Set showcounter of the text area.
     * @param { InputCounterOptions } options - Set the percentage of counter.
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showCounter(value: boolean, options?: InputCounterOptions): TextAreaAttribute;
    /**
     * Define style of the text area.
     *
     * @param { TextContentStyle } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define style of the text area.
     *
     * @param { TextContentStyle } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    style(value: TextContentStyle): TextAreaAttribute;
    /**
     * Define bar state of the text area.
     *
     * @param { BarState } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define bar state of the text area.
     *
     * @param { BarState } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    barState(value: BarState): TextAreaAttribute;
    /**
     * Controls whether the selection menu pops up.
     *
     * @param { boolean } value
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Controls whether the selection menu pops up.
     *
     * @param { boolean } value
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    selectionMenuHidden(value: boolean): TextAreaAttribute;
    /**
     * Called when the minimum font size of the font is set.
     *
     * @param { number | string | Resource } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    minFontSize(value: number | string | Resource): TextAreaAttribute;
    /**
     * Called when the maximum font size of the font is set.
     *
     * @param { number | string | Resource } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    maxFontSize(value: number | string | Resource): TextAreaAttribute;
    /**
     * Called when the height adaptive policy is set.
     *
     * @param { TextHeightAdaptivePolicy } value - The height adaptive policy.
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    heightAdaptivePolicy(value: TextHeightAdaptivePolicy): TextAreaAttribute;
    /**
     * Define max lines of the text area.
     *
     * @param { number } value
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define max lines of the text area.
     *
     * @param { number } value
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxLines(value: number): TextAreaAttribute;
    /**
     * Set the word break type.
     *
     * @param { WordBreak } value - The word break type.
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    wordBreak(value: WordBreak): TextAreaAttribute;
    /**
     * Set the text line break strategy type.
     *
     * @param { LineBreakStrategy } strategy - The text line break strategy type.
     * @returns { TextAreaAttribute } The attribute of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    lineBreakStrategy(strategy: LineBreakStrategy): TextAreaAttribute;
    /**
     * Define custom keyboard of the text area.
     *
     * @param { CustomBuilder } value
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define custom keyboard of the text area.
     *
     * @param { CustomBuilder } value
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Define custom keyboard of the text area.
     *
     * @param { CustomBuilder } value - Set up a custom keyboard of TextArea
     * @param { KeyboardOptions } [options] - Indicates the custom keyboard options of TextArea
     * @returns { TextAreaAttribute } returns the instance of the TextAreaAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    customKeyboard(value: CustomBuilder, options?: KeyboardOptions): TextAreaAttribute;
    /**
     * Called when the text decoration of the text is set.
     *
     * @param { TextDecorationOptions } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    decoration(value: TextDecorationOptions): TextAreaAttribute;
    /**
     * Called when the distance between text fonts is set.
     *
     * @param { number | string | Resource } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    letterSpacing(value: number | string | Resource): TextAreaAttribute;
    /**
     * Set font line spacing.
     *
     * @param { LengthMetrics } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    lineSpacing(value: LengthMetrics): TextAreaAttribute;
    /**
     * Called when the line height of the font is set.
     *
     * @param { number | string | Resource } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    lineHeight(value: number | string | Resource): TextAreaAttribute;
    /**
     * Called when the input type is set.
     *
     * @param { TextAreaType } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the input type is set.
     *
     * @param { TextAreaType } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type(value: TextAreaType): TextAreaAttribute;
    /**
     * Sets whether enable auto fill or not.
     *
     * @param { boolean } value - Indicates the flag whether autofill is enabled.
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    enableAutoFill(value: boolean): TextAreaAttribute;
    /**
     * Called when the auto fill type is set.
     *
     * @param { ContentType } contentType - Indicates autofill type.
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    contentType(contentType: ContentType): TextAreaAttribute;
    /**
     * Set font feature.
     *
     * @param { string } value - The fontFeature.
     * normal | <feature-tag-value>,
     * where <feature-tag-value> = <string> [ <integer> | on | off ], like: "ss01" 0
     * the values of <feature-tag-value> reference to doc of TextArea component
     * number of <feature-tag-value> can be single or multiple, and separated by comma ','.
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    fontFeature(value: string): TextAreaAttribute;
}
/**
 * Defines TextArea Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TextArea Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextArea Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const TextArea: TextAreaInterface;
/**
 * Defines TextArea Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TextArea Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextArea Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const TextAreaInstance: TextAreaAttribute;
