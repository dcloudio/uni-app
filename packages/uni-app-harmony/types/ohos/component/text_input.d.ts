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
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum InputType {
    /**
     * Basic input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Basic input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Basic input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Normal,
    /**
     * Pure digital input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Pure digital input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Pure digital input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Number,
    /**
     * Phone number entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Phone number entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Phone number entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    PhoneNumber,
    /**
     * E-mail address input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * E-mail address input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * E-mail address input mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Email,
    /**
     * Password entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Password entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Password entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Password,
    /**
     * Number Password entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    NUMBER_PASSWORD = 8,
    /**
     * UserName entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    USER_NAME = 10,
    /**
     * NewPassword entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    NEW_PASSWORD = 11,
    /**
     * Number decimal entry mode.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    NUMBER_DECIMAL = 12
}
/**
 * Declare the type of soft keyboard.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the type of soft keyboard.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the type of soft keyboard.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum EnterKeyType {
    /**
     * Go.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Go.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Go.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Go,
    /**
     * Search.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Search.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Search.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Search,
    /**
     * Send.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Send.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Send.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Send,
    /**
     * Next.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Next.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Next.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Next,
    /**
     * Done.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Done.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Done.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Done,
    /**
     * Showed as 'previous' pattern.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    PREVIOUS = 7,
    /**
     * Showed as 'new line' pattern.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    NEW_LINE = 8
}
/**
 * Provides the method of keeping TextInput editable state when submitted.
 *
 * @interface SubmitEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface SubmitEvent {
    /**
     * Keeps TextInput editable state when submitted
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    keepEditableState(): void;
    /**
     * Sets the current value of TextInput.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    text: string;
}
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
declare class TextInputController extends TextContentControllerBase {
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
 * Defines the options of TextInput.
 *
 * @interface TextInputOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of TextInput.
 *
 * @interface TextInputOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the options of TextInput.
 *
 * @interface TextInputOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface TextInputOptions {
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
     * @type { ?TextInputController }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @type { ?TextInputController }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the position of the insertion cursor is set.
     *
     * @type { ?TextInputController }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    controller?: TextInputController;
}
/**
 * Text input style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Text input style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Text input style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum TextInputStyle {
    /**
     * Text input default style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Text input default style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Text input default style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Default,
    /**
     * Text input inline style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Text input inline style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Text input inline style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Inline
}
/**
 * Provides a single-line text input component interface.
 *
 * @interface TextInputInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides a single-line text input component interface.
 *
 * @interface TextInputInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides a single-line text input component interface.
 *
 * @interface TextInputInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface TextInputInterface {
    /**
     * Called when writing a single line of text.
     *
     * @param { TextInputOptions } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when writing a single line of text.
     *
     * @param { TextInputOptions } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when writing a single line of text.
     *
     * @param { TextInputOptions } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (value?: TextInputOptions): TextInputAttribute;
}
/**
 * CaretStyle object.
 *
 * @interface CaretStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * CaretStyle object.
 *
 * @interface CaretStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface CaretStyle {
    /**
     * Define the cursor width of CaretStyle.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the cursor width of CaretStyle.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    width?: Length;
}
/**
 * PasswordIcon object.
 *
 * @interface PasswordIcon
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * PasswordIcon object.
 *
 * @interface PasswordIcon
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface PasswordIcon {
    /**
     * Define the on icon source of PasswordIcon.
     *
     * @type { ?(string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define the on icon source of PasswordIcon.
     *
     * @type { ?(string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onIconSrc?: string | Resource;
    /**
     * Define the off icon source of PasswordIcon.
     *
     * @type { ?(string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define the off icon source of PasswordIcon.
     *
     * @type { ?(string | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    offIconSrc?: string | Resource;
}
/**
 * Defines the TextInput attribute functions.
 *
 * @extends CommonMethod<TextInputAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the TextInput attribute functions.
 *
 * @extends CommonMethod<TextInputAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the TextInput attribute functions.
 *
 * @extends CommonMethod<TextInputAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class TextInputAttribute extends CommonMethod<TextInputAttribute> {
    /**
     * Called when the input type is set.
     *
     * @param { InputType } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the input type is set.
     *
     * @param { InputType } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the input type is set.
     *
     * @param { InputType } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    type(value: InputType): TextInputAttribute;
    /**
     * Called when the color of the placeholder is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the color of the placeholder is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the color of the placeholder is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    placeholderColor(value: ResourceColor): TextInputAttribute;
    /**
     * Called when the font property of the placeholder is set.
     *
     * @param { Font } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font property of the placeholder is set.
     *
     * @param { Font } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font property of the placeholder is set.
     *
     * @param { Font } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    placeholderFont(value?: Font): TextInputAttribute;
    /**
     * Called when the type of soft keyboard input button is set.
     *
     * @param { EnterKeyType } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the type of soft keyboard input button is set.
     *
     * @param { EnterKeyType } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the type of soft keyboard input button is set.
     *
     * @param { EnterKeyType } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enterKeyType(value: EnterKeyType): TextInputAttribute;
    /**
     * Called when the color of the insertion cursor is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the color of the insertion cursor is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the color of the insertion cursor is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    caretColor(value: ResourceColor): TextInputAttribute;
    /**
     * Called when judging whether the text editing change finished.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     * @useinstead onEditChange
     */
    onEditChanged(callback: (isEditing: boolean) => void): TextInputAttribute;
    /**
     * Called when judging whether the text editing change finished.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when judging whether the text editing change finished.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when judging whether the text editing change finished.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onEditChange(callback: (isEditing: boolean) => void): TextInputAttribute;
    /**
     * Called when submitted.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when submitted.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when submitted.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onSubmit(callback: (enterKey: EnterKeyType, event: SubmitEvent) => void): TextInputAttribute;
    /**
     * Called when the input of the input box changes.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the input of the input box changes.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the input of the input box changes.
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onChange(callback: (value: string) => void): TextInputAttribute;
    /**
     * Called when the text selection changes.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the text selection changes.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onTextSelectionChange(callback: (selectionStart: number, selectionEnd: number) => void): TextInputAttribute;
    /**
     * Called when the content scrolls.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the content scrolls.
     *
     * @param { function } callback - callback of the listened event.
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onContentScroll(callback: (totalOffsetX: number, totalOffsetY: number) => void): TextInputAttribute;
    /**
     * Called when the input of maximum text length is set.
     *
     * @param { number } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the input of maximum text length is set.
     *
     * @param { number } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the input of maximum text length is set.
     *
     * @param { number } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxLength(value: number): TextInputAttribute;
    /**
     * Called when the font color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font color is set.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontColor(value: ResourceColor): TextInputAttribute;
    /**
     * Called when the font size is set.
     *
     * @param { Length } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font size is set.
     *
     * @param { Length } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font size is set.
     *
     * @param { Length } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontSize(value: Length): TextInputAttribute;
    /**
     * Called when the font style of a font is set.
     *
     * @param { FontStyle } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font style of a font is set.
     *
     * @param { FontStyle } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font style of a font is set.
     *
     * @param { FontStyle } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontStyle(value: FontStyle): TextInputAttribute;
    /**
     * Called when the font weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font weight is set.
     *
     * @param { number | FontWeight | string } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontWeight(value: number | FontWeight | string): TextInputAttribute;
    /**
     * Called when the font list of text is set.
     *
     * @param { ResourceStr } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the font list of text is set.
     *
     * @param { ResourceStr } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the font list of text is set.
     *
     * @param { ResourceStr } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontFamily(value: ResourceStr): TextInputAttribute;
    /**
     * Called when the inputFilter of text is set.
     *
     * @param { ResourceStr } value
     * @param { function } error
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the inputFilter of text is set.
     *
     * @param { ResourceStr } value
     * @param { function } error
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the inputFilter of text is set.
     *
     * @param { ResourceStr } value
     * @param { function } error
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    inputFilter(value: ResourceStr, error?: (value: string) => void): TextInputAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCopy(callback: (value: string) => void): TextInputAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCut(callback: (value: string) => void): TextInputAttribute;
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when using the Clipboard menu
     *
     * @param { function } callback
     * @returns { TextInputAttribute }
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
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onPaste(callback: (value: string, event: PasteEvent) => void): TextInputAttribute;
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the copy option is set.
     *
     * @param { CopyOptions } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    copyOption(value: CopyOptions): TextInputAttribute;
    /**
     * Called when the password show/hide icon is set.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the password show/hide icon is set.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the password show/hide icon is set.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showPasswordIcon(value: boolean): TextInputAttribute;
    /**
     * Called when the text align is set.
     *
     * @param { TextAlign } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the text align is set.
     *
     * @param { TextAlign } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the text align is set.
     *
     * @param { TextAlign } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    textAlign(value: TextAlign): TextInputAttribute;
    /**
     * Text input style
     *
     * @param { TextInputStyle | TextContentStyle } value - Text input style
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Text input style
     *
     * @param { TextInputStyle | TextContentStyle } value - Text input style
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Text input style
     *
     * @param { TextInputStyle | TextContentStyle } value - Text input style
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    style(value: TextInputStyle | TextContentStyle): TextInputAttribute;
    /**
     * Define the caret style of the text input
     *
     * @param { CaretStyle } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the caret style of the text input
     *
     * @param { CaretStyle } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    caretStyle(value: CaretStyle): TextInputAttribute;
    /**
     * Define the text selected background color of the text input.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the text selected background color of the text input.
     *
     * @param { ResourceColor } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    selectedBackgroundColor(value: ResourceColor): TextInputAttribute;
    /**
     * Define the caret position of the text input.
     *
     * @param { number } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the caret position of the text input.
     *
     * @param { number } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    caretPosition(value: number): TextInputAttribute;
    /**
     * Sets whether request keyboard or not when on focus.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets whether request keyboard or not when on focus.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableKeyboardOnFocus(value: boolean): TextInputAttribute;
    /**
     * Define the password icon of the text input.
     *
     * @param { PasswordIcon } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define the password icon of the text input.
     *
     * @param { PasswordIcon } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    passwordIcon(value: PasswordIcon): TextInputAttribute;
    /**
     * Define the show error of the text input.
     *
     * @param { string | undefined } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define the show error of the text input.
     *
     * @param { string | undefined } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showError(value?: string | undefined): TextInputAttribute;
    /**
     * Define the show unit of the text input.
     *
     * @param { CustomBuilder } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define the show unit of the text input.
     *
     * @param { CustomBuilder } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showUnit(value: CustomBuilder): TextInputAttribute;
    /**
     * Define the show underline of the text input.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define the show underline of the text input.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showUnderline(value: boolean): TextInputAttribute;
    /**
     * Controls whether the selection menu pops up.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Controls whether the selection menu pops up.
     *
     * @param { boolean } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    selectionMenuHidden(value: boolean): TextInputAttribute;
    /**
     * Define bar state of the text input.
     *
     * @param { BarState } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define bar state of the text input.
     *
     * @param { BarState } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    barState(value: BarState): TextInputAttribute;
    /**
     * Define max lines of the text input.
     *
     * @param { number } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define max lines of the text input.
     *
     * @param { number } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxLines(value: number): TextInputAttribute;
    /**
     * Define custom keyboard of the text input.
     *
     * @param { CustomBuilder } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Define custom keyboard of the text input.
     *
     * @param { CustomBuilder } value
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    customKeyboard(value: CustomBuilder): TextInputAttribute;
    /**
     * Show the counter when the number of characters entered exceeds the threshold through InputCounterOptions.
     *
     * @param { boolean } value - Set showcounter of the text input.
     * @param { InputCounterOptions } options - Set the percentage of counter.
     * @returns { TextInputAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showCounter(value: boolean, options?: InputCounterOptions): TextInputAttribute;
    /**
     * Set the cancel button style
     *
     * @param { object } value - indicates the style of the cancel button.
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    cancelButton(value: {
        style?: CancelButtonStyle;
        icon?: IconOptions;
    }): TextInputAttribute;
    /**
     * Sets selection when on focus.
     *
     * @param { boolean } value - Sets selection or not.
     * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    selectAll(value: boolean): TextInputAttribute;
    /**
     * Sets whether enable auto fill or not.
     *
     * @param { boolean } value - Indicates the flag whether autofill is enabled.
     * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    enableAutoFill(value: boolean): TextInputAttribute;
    /**
     * Define the password rules of the text input.
     *
     * @param { string } value - Indicates the password rules.
     * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    passwordRules(value: string): TextInputAttribute;
}
/**
 * Defines TextInput Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TextInput Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextInput Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const TextInput: TextInputInterface;
/**
 * Defines TextInput Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TextInput Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextInput Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const TextInputInstance: TextInputAttribute;
