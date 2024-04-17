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
    setTextSelection(selectionStart: number, selectionEnd: number): void;
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
declare enum TextAreaType {
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
     * Called when submitted.
     *
     * @param { function } callback
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
     * @returns { TextAreaAttribute } returns the instance of the TextInputAttribute.
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
    customKeyboard(value: CustomBuilder): TextAreaAttribute;
    /**
     * Called when the input type is set.
     *
     * @param { TextAreaType } value
     * @returns { TextAreaAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    type(value: TextAreaType): TextAreaAttribute;
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
