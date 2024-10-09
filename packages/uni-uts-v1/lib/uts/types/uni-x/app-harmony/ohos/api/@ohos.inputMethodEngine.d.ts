/*
 * Copyright (c) 2021-2024 Huawei Device Co., Ltd.
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
 * @kit IMEKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type { KeyEvent as InputKeyEvent } from './@ohos.multimodalInput.keyEvent';
import InputMethodSubtype from './@ohos.InputMethodSubtype';
import BaseContext from './application/BaseContext';
import window from './@ohos.window';
/**
 * Input method engine
 *
 * @namespace inputMethodEngine
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @since 8
 */
declare namespace inputMethodEngine {
    /**
     * When "enter" key is pressed, there is no action
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const ENTER_KEY_TYPE_UNSPECIFIED: number;
    /**
     * When "enter" key is pressed, it means GO
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const ENTER_KEY_TYPE_GO: number;
    /**
     * When "enter" key is pressed, it means SEARCH
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const ENTER_KEY_TYPE_SEARCH: number;
    /**
     * When "enter" key is pressed, it means SEND
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const ENTER_KEY_TYPE_SEND: number;
    /**
     * When "enter" key is pressed, it means NEXT
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const ENTER_KEY_TYPE_NEXT: number;
    /**
     * When "enter" key is pressed, it means DONE
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const ENTER_KEY_TYPE_DONE: number;
    /**
     * When "enter" key is pressed, it means PREVIOUS
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const ENTER_KEY_TYPE_PREVIOUS: number;
    /**
     * Editor with no special function
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_NULL: number;
    /**
     * Editor of type TEXT
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_TEXT: number;
    /**
     * Editor of type NUMBER
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_NUMBER: number;
    /**
     * Editor of type PHONE NUMBER
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_PHONE: number;
    /**
     * Editor of type DATETIME
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_DATETIME: number;
    /**
     * Editor of type EMAIL
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_EMAIL: number;
    /**
     * Editor of type URI
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_URI: number;
    /**
     * Editor of type PASSWORD
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const PATTERN_PASSWORD: number;
    /**
     * Editor of type SCREEN LOCK PASSWORD
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    const PATTERN_PASSWORD_SCREEN_LOCK: number;
    /**
     * Editor of type NUMBER PASSWORD
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    const PATTERN_PASSWORD_NUMBER: number;
    /**
     * Editor in SELECTING state
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const FLAG_SELECTING: number;
    /**
     * Editor in SINGLE_LINE state
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const FLAG_SINGLE_LINE: number;
    /**
     * The Editor displays in PART mode
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const DISPLAY_MODE_PART: number;
    /**
     * The Editor displays in FULL mode
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const DISPLAY_MODE_FULL: number;
    /**
     * Allows ASCII to be inputted
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const OPTION_ASCII: number;
    /**
     * Do not specify Editor's input type
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const OPTION_NONE: number;
    /**
     * Allows CHARACTERS to be inputted
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const OPTION_AUTO_CAP_CHARACTERS: number;
    /**
     * Allows SENTENCES to be inputted
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const OPTION_AUTO_CAP_SENTENCES: number;
    /**
     * Allows WORDS to be inputted
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const OPTION_AUTO_WORDS: number;
    /**
     * Allows MULTI_LINE to be inputted
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const OPTION_MULTI_LINE: number;
    /**
     * Half-screen mode
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    const OPTION_NO_FULLSCREEN: number;
    /**
     * The move direction of cursor: UP
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    const CURSOR_UP: number;
    /**
     * The move direction of cursor: DOWN
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    const CURSOR_DOWN: number;
    /**
     * The move direction of cursor: LEFT
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    const CURSOR_LEFT: number;
    /**
     * The move direction of cursor: RIGHT
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    const CURSOR_RIGHT: number;
    /**
     * The window styles for input method ability.
     *
     * @constant
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    const WINDOW_TYPE_INPUT_METHOD_FLOAT: number;
    /**
     * Get InputMethodAbility object to subscribe events about IME.
     *
     * @returns { InputMethodAbility } the object of the InputMethodAbility.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function getInputMethodAbility(): InputMethodAbility;
    /**
     * @returns { InputMethodEngine }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     * @deprecated since 9
     * @useinstead inputMethodEngine#getInputMethodAbility
     */
    function getInputMethodEngine(): InputMethodEngine;
    /**
     * Get KeyboardDelegate object to subscribe key event or events about editor.
     *
     * @returns { KeyboardDelegate } the object of KeyboardDelegate.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function getKeyboardDelegate(): KeyboardDelegate;
    /**
     * @returns { KeyboardDelegate }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     * @deprecated since 9
     * @useinstead inputMethodEngine#getKeyboardDelegate
     */
    function createKeyboardDelegate(): KeyboardDelegate;
    /**
     * Indicates the possible data types of the command.
     * @typedef { number | string | boolean }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 12
     */
    type CommandDataType = number | string | boolean;
    /**
     * @interface KeyboardController
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    interface KeyboardController {
        /**
         * Hide soft keyboard
         *
         * @param { AsyncCallback<void> } callback - indicates the callback function of hide.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        hide(callback: AsyncCallback<void>): void;
        /**
         * Hide soft keyboard
         *
         * @returns { Promise<void> } the promise returned by the function
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        hide(): Promise<void>;
        /**
         * @param { AsyncCallback<void> } callback - indicates the callback function of hideKeyboard.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.KeyboardController#hide
         */
        hideKeyboard(callback: AsyncCallback<void>): void;
        /**
         * @returns { Promise<void> } the promise returned by the function
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.KeyboardController#hide
         */
        hideKeyboard(): Promise<void>;
        /**
         * Exit the current input type. This function can only be called by default input method configured by system.
         *
         * @param { AsyncCallback<void> } callback - the callback of exitCurrentInputType.
         * @throws { BusinessError } 12800008 - input method manager service error.
         * @throws { BusinessError } 12800010 - not default input method configured by system.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        exitCurrentInputType(callback: AsyncCallback<void>): void;
        /**
         * Exit the current input type. This function can only be called by default input method configured by system.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 12800008 - input method manager service error.
         * @throws { BusinessError } 12800010 - not default input method configured by system.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        exitCurrentInputType(): Promise<void>;
    }
    /**
     * @interface InputMethodEngine
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    interface InputMethodEngine {
        /**
         * Subscribe 'inputStart'
         *
         * @param { 'inputStart' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback of on('inputStart').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        on(type: 'inputStart', callback: (kbController: KeyboardController, textInputClient: TextInputClient) => void): void;
        /**
         * Unsubscribe 'inputStart'
         *
         * @param { 'inputStart' } type - indicates the type of subscribe event.
         * @param { function } callback - optional, indicates the callback of off('inputStart').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        off(type: 'inputStart', callback?: (kbController: KeyboardController, textInputClient: TextInputClient) => void): void;
        /**
         * Subscribe 'keyboardShow'|'keyboardHide'
         *
         * @param { 'keyboardShow' | 'keyboardHide' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback of on('keyboardShow'|'keyboardHide').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        on(type: 'keyboardShow' | 'keyboardHide', callback: () => void): void;
        /**
         * Unsubscribe 'keyboardShow'|'keyboardHide'
         *
         * @param { 'keyboardShow' | 'keyboardHide' } type - indicates the type of subscribe event.
         * @param { function } [callback] - optional, indicates the callback of off('keyboardShow'|'keyboardHide').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        off(type: 'keyboardShow' | 'keyboardHide', callback?: () => void): void;
    }
    /**
     * <p>Control events about IME.</p>
     * <p>Events provided for IME to subscribe with callback function. When those events occur, the corresponding callback
     * will be invoked.</p>
     *
     * @interface InputMethodAbility
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    interface InputMethodAbility {
        /**
         * Subscribe 'inputStart' event.
         *
         * @param { 'inputStart' } type - the type of subscribe event.
         * @param { function } callback - the callback of on('inputStart').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        on(type: 'inputStart', callback: (kbController: KeyboardController, inputClient: InputClient) => void): void;
        /**
         * Unsubscribe 'inputStart' event.
         *
         * @param { 'inputStart' } type - the type of unsubscribe event.
         * @param { function } [callback] - optional, the callback of off('inputStart').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        off(type: 'inputStart', callback?: (kbController: KeyboardController, inputClient: InputClient) => void): void;
        /**
         * Subscribe 'inputStop'.
         *
         * @param { 'inputStop' } type - the type of subscribe event.
         * @param { function } callback - the callback of on('inputStop').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        on(type: 'inputStop', callback: () => void): void;
        /**
         * Unsubscribe 'inputStop'.
         *
         * @param { 'inputStop' } type - the type of unsubscribe event.
         * @param { function } callback - the callback of off('inputStop').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        off(type: 'inputStop', callback: () => void): void;
        /**
         * Subscribe 'setCallingWindow'.
         *
         * @param { 'setCallingWindow' } type - the type of subscribe event.
         * @param { function } callback - the callback of on('setCallingWindow').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        on(type: 'setCallingWindow', callback: (wid: number) => void): void;
        /**
         * Unsubscribe 'setCallingWindow'.
         *
         * @param { 'setCallingWindow' } type - the type of unsubscribe event.
         * @param { function } callback - the callback of off('setCallingWindow').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        off(type: 'setCallingWindow', callback: (wid: number) => void): void;
        /**
         * Subscribe 'keyboardShow'|'keyboardHide'.
         *
         * @param { 'keyboardShow' | 'keyboardHide' } type - the type of subscribe event.
         * @param { function } callback - the callback of on('keyboardShow'|'keyboardHide').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        on(type: 'keyboardShow' | 'keyboardHide', callback: () => void): void;
        /**
         * Unsubscribe 'keyboardShow'|'keyboardHide'.
         *
         * @param { 'keyboardShow' | 'keyboardHide' } type - the type of unsubscribe event.
         * @param { function } [callback] - the callback of off('keyboardShow'|'keyboardHide').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        off(type: 'keyboardShow' | 'keyboardHide', callback?: () => void): void;
        /**
         * Subscribe 'setSubtype'.
         *
         * @param { 'setSubtype' } type - the type of subscribe event.
         * @param { function } callback - the callback of on('setSubtype').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        on(type: 'setSubtype', callback: (inputMethodSubtype: InputMethodSubtype) => void): void;
        /**
         * Unsubscribe 'setSubtype'.
         *
         * @param { 'setSubtype' } type - the type of subscribe event.
         * @param { function } [callback] - the callback of off('setSubtype').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        off(type: 'setSubtype', callback?: (inputMethodSubtype: InputMethodSubtype) => void): void;
        /**
         * Subscribe 'securityModeChange' event.
         *
         * @param { 'securityModeChange' } type - the type of subscribe event.
         * @param { Callback<SecurityMode> } callback - the callback of on('securityModeChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        on(type: 'securityModeChange', callback: Callback<SecurityMode>): void;
        /**
         * Unsubscribe 'securityModeChange' event.
         *
         * @param { 'securityModeChange' } type - the type of unsubscribe event.
         * @param { Callback<SecurityMode> } [callback] - optional, the callback of off('securityModeChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        off(type: 'securityModeChange', callback?: Callback<SecurityMode>): void;
        /**
         * Subscribe 'privateCommand'.This function can only be called by default input method configured by system.
         *
         * @param { 'privateCommand' } type - indicates the type of subscribe event.
         * @param { Callback<Record<string, CommandDataType>> } callback - indicates the callback of on('privateCommand').
         * @throws { BusinessError } 12800010 - not default input method configured by system.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        on(type: 'privateCommand', callback: Callback<Record<string, CommandDataType>>): void;
        /**
         * Unsubscribe 'privateCommand'.This function can only be called by default input method configured by system.
         *
         * @param { 'privateCommand' } type - indicates the type of subscribe event.
         * @param { Callback<Record<string, CommandDataType>> } [callback] - optional,
         * indicates the callback of off('privateCommand').
         * @throws { BusinessError } 12800010 - not default input method configured by system.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        off(type: 'privateCommand', callback?: Callback<Record<string, CommandDataType>>): void;
        /**
         * Get input method's security mode.
         *
         * @returns { SecurityMode } return security mode.
         * @throws { BusinessError } 12800004 - not an input method extension.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        getSecurityMode(): SecurityMode;
        /**
         * Creates a panel.
         * <p>The system only allows one soft keyboard and one status bar to be created.</p>
         *
         * @param { BaseContext } ctx - indicates the context on which the window depends.
         * @param { PanelInfo } info - the info of panel to be created.
         * @param { AsyncCallback<Panel> } callback - the callback of createPanel.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types;
         * @throws { BusinessError } 12800004 - not an input method extension.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        createPanel(ctx: BaseContext, info: PanelInfo, callback: AsyncCallback<Panel>): void;
        /**
         * Creates a panel.
         * <p>The system only allows one soft keyboard and one status bar to be created.</p>
         *
         * @param { BaseContext } ctx - indicates the context on which the window depends.
         * @param { PanelInfo } info - the info of panel to be created.
         * @returns { Promise<Panel> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types;
         * @throws { BusinessError } 12800004 - not an input method extension.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        createPanel(ctx: BaseContext, info: PanelInfo): Promise<Panel>;
        /**
         * Destroys a panel.
         *
         * @param { Panel } panel - to be destroyed.
         * @param { AsyncCallback<void> } callback - the callback of destroyPanel.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        destroyPanel(panel: Panel, callback: AsyncCallback<void>): void;
        /**
         * Destroys a panel.
         *
         * @param { Panel } panel - to be destroyed.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        destroyPanel(panel: Panel): Promise<void>;
    }
    /**
     * @interface TextInputClient
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     * @deprecated since 9
     * @useinstead inputMethodEngine#InputClient
     */
    interface TextInputClient {
        /**
         * @param { number } action - action indicates the function of "enter" key.
         * @param { AsyncCallback<boolean> } callback - the callback of sendKeyFunction.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#sendKeyFunction
         */
        sendKeyFunction(action: number, callback: AsyncCallback<boolean>): void;
        /**
         * @param { number } action - action indicates the function of "enter" key.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#sendKeyFunction
         */
        sendKeyFunction(action: number): Promise<boolean>;
        /**
         * @param { number } length - length of text which will be deleted forward.
         * @param { AsyncCallback<boolean> } callback - the callback of deleteForward.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#deleteForward
         */
        deleteForward(length: number, callback: AsyncCallback<boolean>): void;
        /**
         * @param { number } length - length of text which will be deleted forward.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#deleteForward
         */
        deleteForward(length: number): Promise<boolean>;
        /**
         * @param { number } length - length of text which will be deleted backward.
         * @param { AsyncCallback<boolean> } callback - the callback of deleteBackward.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#deleteBackward
         */
        deleteBackward(length: number, callback: AsyncCallback<boolean>): void;
        /**
         * @param { number } length - length of text which will be deleted backward.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#deleteBackward
         */
        deleteBackward(length: number): Promise<boolean>;
        /**
         * @param { string } text - text which will be inserted.
         * @param { AsyncCallback<boolean> } callback - the callback of insertText.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#insertText
         */
        insertText(text: string, callback: AsyncCallback<boolean>): void;
        /**
         * @param { string } text - text which will be inserted.
         * @returns { Promise<boolean> } the promise returned by the function
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#insertText
         */
        insertText(text: string): Promise<boolean>;
        /**
         * @param { number } length - the length of text which will be got.
         * @param { AsyncCallback<string> } callback - the callback of getForward.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#getForward
         */
        getForward(length: number, callback: AsyncCallback<string>): void;
        /**
         * @param { number } length - the length of text which will be got.
         * @returns { Promise<string> } the promise returned by the function
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#getForward
         */
        getForward(length: number): Promise<string>;
        /**
         * @param { number } length - the length of text which will be got.
         * @param { AsyncCallback<string> } callback - the callback of getBackward.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#getBackward
         */
        getBackward(length: number, callback: AsyncCallback<string>): void;
        /**
         * @param { number } length - the length of text which will be got.
         * @returns { Promise<string> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#getBackward
         */
        getBackward(length: number): Promise<string>;
        /**
         * @param { AsyncCallback<EditorAttribute> } callback - the callback of getEditorAttribute.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#getEditorAttribute
         */
        getEditorAttribute(callback: AsyncCallback<EditorAttribute>): void;
        /**
         * @returns { Promise<EditorAttribute> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         * @deprecated since 9
         * @useinstead inputMethodEngine.InputClient#getEditorAttribute
         */
        getEditorAttribute(): Promise<EditorAttribute>;
    }
    /**
     * Control events about Editor.
     *
     * @interface InputClient
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    interface InputClient {
        /**
         * Send the function of the key.
         *
         * @param { number } action - action indicates the function of "enter" key.
         * @param { AsyncCallback<boolean> } callback - the callback of sendKeyFunction.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        sendKeyFunction(action: number, callback: AsyncCallback<boolean>): void;
        /**
         * Send the function of the key.
         *
         * @param { number } action - action indicates the function of "enter" key.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        sendKeyFunction(action: number): Promise<boolean>;
        /**
         * Delete text forward.
         *
         * @param { number } length - length of text which will be deleted forward. It can't be less than 0.
         * @param { AsyncCallback<boolean> } callback - the callback of deleteForward.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        deleteForward(length: number, callback: AsyncCallback<boolean>): void;
        /**
         * Delete text forward.
         *
         * @param { number } length - length of text which will be deleted forward. It can't be less than 0.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        deleteForward(length: number): Promise<boolean>;
        /**
         * Delete text forward.
         *
         * @param { number } length - length of text which will be deleted forward. It can't be less than 0.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800002 - input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        deleteForwardSync(length: number): void;
        /**
         * Delete text backward.
         *
         * @param { number } length - length of text which will be deleted backward. It can't be less than 0.
         * @param { AsyncCallback<boolean> } callback - the callback of deleteBackward.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        deleteBackward(length: number, callback: AsyncCallback<boolean>): void;
        /**
         * Delete text backward.
         *
         * @param { number } length - length of text which will be deleted backward. It can't be less than 0.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        deleteBackward(length: number): Promise<boolean>;
        /**
         * Delete text backward.
         *
         * @param { number } length - length of text which will be deleted backward. It can't be less than 0.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800002 - input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        deleteBackwardSync(length: number): void;
        /**
         * Insert text into Editor.
         *
         * @param { string } text - text which will be inserted.
         * @param { AsyncCallback<boolean> } callback - the callback of insertText.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        insertText(text: string, callback: AsyncCallback<boolean>): void;
        /**
         * Insert text into Editor.
         *
         * @param { string } text - text which will be inserted.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        insertText(text: string): Promise<boolean>;
        /**
         * Insert text into Editor.
         *
         * @param { string } text - text which will be inserted.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800002 - input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        insertTextSync(text: string): void;
        /**
         * Get the text before cursor.
         *
         * @param { number } length - the length of text which will be got. It can't be less than 0.
         * @param { AsyncCallback<string> } callback - the callback of getForward.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getForward(length: number, callback: AsyncCallback<string>): void;
        /**
         * Get the text before cursor.
         *
         * @param { number } length - the length of text which will be got. It can't be less than 0.
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getForward(length: number): Promise<string>;
        /**
         * Get the text before cursor.
         *
         * @param { number } length - the length of text which will be got. It can't be less than 0.
         * @returns { string } the text string before cursor.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        getForwardSync(length: number): string;
        /**
         * Get the text after cursor.
         *
         * @param { number } length - the length of text which will be got.It can't be less than 0.
         * @param { AsyncCallback<string> } callback - the callback of getBackward.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getBackward(length: number, callback: AsyncCallback<string>): void;
        /**
         * Get the text after cursor.
         *
         * @param { number } length - the length of text which will be got.It can't be less than 0.
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getBackward(length: number): Promise<string>;
        /**
         * Get the text after cursor.
         *
         * @param { number } length - the length of text which will be got. It can't be less than 0.
         * @returns { string } the text string after cursor.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        getBackwardSync(length: number): string;
        /**
         * Get attribute about editor.
         *
         * @param { AsyncCallback<EditorAttribute> } callback - the callback of getEditorAttribute.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getEditorAttribute(callback: AsyncCallback<EditorAttribute>): void;
        /**
         * Get attribute about editor.
         *
         * @returns { Promise<EditorAttribute> } the promise returned by the function.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getEditorAttribute(): Promise<EditorAttribute>;
        /**
         * Get attribute about editor.
         *
         * @returns { EditorAttribute } the attribute of editor.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        getEditorAttributeSync(): EditorAttribute;
        /**
         * Move cursor from input method.
         *
         * @param { number } direction - Indicates the distance of cursor to be moved. It can't be less than 0.
         * @param { AsyncCallback<void> } callback - the callback of moveCursor.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        moveCursor(direction: number, callback: AsyncCallback<void>): void;
        /**
         * Move cursor from input method.
         *
         * @param { number } direction - Indicates the distance of cursor to be moved. It can't be less than 0.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        moveCursor(direction: number): Promise<void>;
        /**
         * Move cursor from input method.
         *
         * @param { number } direction - Indicates the distance of cursor to be moved. It can't be less than 0.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *    1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        moveCursorSync(direction: number): void;
        /**
         * Select text in editor by range.
         *
         * @param { Range } range - indicates the range of selected text in editor.
         * @param { AsyncCallback<void> } callback - the callback of selectByRange.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        selectByRange(range: Range, callback: AsyncCallback<void>): void;
        /**
         * Select text in editor by range.
         *
         * @param { Range } range - indicates the range of selected text in editor.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *    1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        selectByRange(range: Range): Promise<void>;
        /**
         * Select text in editor by range.
         *
         * @param { Range } range - indicates the range of selected text in editor.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        selectByRangeSync(range: Range): void;
        /**
         * Select text in editor by cursor movement.
         *
         * @param { Movement } movement - indicates the movement of cursor when selecting.
         * @param { AsyncCallback<void> } callback - the callback of selectByMovement.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        selectByMovement(movement: Movement, callback: AsyncCallback<void>): void;
        /**
         * Select text in editor by cursor movement.
         *
         * @param { Movement } movement - indicates the movement of cursor when selecting.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        selectByMovement(movement: Movement): Promise<void>;
        /**
         * Select text in editor by cursor movement.
         *
         * @param { Movement } movement - indicates the movement of cursor when selecting.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        selectByMovementSync(movement: Movement): void;
        /**
         * Get the index number of text at cursor.
         *
         * @param { AsyncCallback<number> } callback - the callback of getTextIndexAtCursor, number represents the index
         *        number of text at cursor.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        getTextIndexAtCursor(callback: AsyncCallback<number>): void;
        /**
         * Get the index number of text at cursor.
         *
         * @returns { Promise<number> } the promise returned by the function, number represents the index number of text
         *          at cursor.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        getTextIndexAtCursor(): Promise<number>;
        /**
         * Get the index number of text at cursor.
         *
         * @returns { number } the index number of text at cursor.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        getTextIndexAtCursorSync(): number;
        /**
         * Send extend action code.
         *
         * @param { ExtendAction } action - action code which will be send.
         * @param { AsyncCallback<void> } callback - the callback of sendExtendAction.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        sendExtendAction(action: ExtendAction, callback: AsyncCallback<void>): void;
        /**
         * Send extend action code.
         *
         * @param { ExtendAction } action - action code which will be send.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        sendExtendAction(action: ExtendAction): Promise<void>;
        /**
         * Send private command.This function can only be called by default input method configured by system.
         *
         * @param { Record<string, CommandDataType> } commandData - command data which will be send.Max size 32KB.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800010 - not default input method configured by system.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        sendPrivateCommand(commandData: Record<string, CommandDataType>): Promise<void>;
        /**
         * Get info of the calling window.
         *
         * @returns { Promise<WindowInfo> } the promise returned by the function.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800012 - input method panel doesn't exist.
         * @throws { BusinessError } 12800013 - window manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        getCallingWindowInfo(): Promise<WindowInfo>;
        /**
         * Insert the provided text as preview text.
         *
         * @param { string } text - the text to be previewed.
         * @param { Range } range - the range of the text to be replaced by the preview text.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *    1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800011 - text preview is not supported.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        setPreviewText(text: string, range: Range): Promise<void>;
        /**
         * Insert the provided text as preview text.
         *
         * @param { string } text - the text to be previewed.
         * @param { Range } range - the range of the text to be replaced by the preview text.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800011 - text preview is not supported.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        setPreviewTextSync(text: string, range: Range): void;
        /**
         * Finish the text preview.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800011 - text preview is not supported.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        finishTextPreview(): Promise<void>;
        /**
         * Finish the text preview.
         *
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800011 - text preview is not supported.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        finishTextPreviewSync(): void;
    }
    /**
     * @interface KeyboardDelegate
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    interface KeyboardDelegate {
        /**
         * Subscribe key up or down event
         *
         * @param { 'keyDown' | 'keyUp' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback function of on('keyDown'|'keyUp').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        on(type: 'keyDown' | 'keyUp', callback: (event: KeyEvent) => boolean): void;
        /**
         * Unsubscribe key up or down event
         *
         * @param { 'keyDown' | 'keyUp' } type - indicates the type of unsubscribe event.
         * @param { function } [callback] - optional, indicates the callback function of off('keyDown'|'keyUp').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        off(type: 'keyDown' | 'keyUp', callback?: (event: KeyEvent) => boolean): void;
        /**
         * Subscribe key event.
         *
         * @param { 'keyEvent' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback function of on('keyEvent').
         *     If the key is processed by event subscriber, callback should be return true, else return false.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        on(type: 'keyEvent', callback: (event: InputKeyEvent) => boolean): void;
        /**
         * Unsubscribe key event.
         *
         * @param { 'keyEvent' } type - indicates the type of unsubscribe event.
         * @param { function } [callback] - optional, indicates the callback function of off('keyEvent').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        off(type: 'keyEvent', callback?: (event: InputKeyEvent) => boolean): void;
        /**
         * Subscribe cursor context change
         *
         * @param { 'cursorContextChange' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback function of on('cursorContextChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        on(type: 'cursorContextChange', callback: (x: number, y: number, height: number) => void): void;
        /**
         * Unsubscribe cursor context change
         *
         * @param { 'cursorContextChange' } type - indicates the type of unsubscribe event.
         * @param { function } [callback] - optional, indicates the callback function of off('cursorContextChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        off(type: 'cursorContextChange', callback?: (x: number, y: number, height: number) => void): void;
        /**
         * Subscribe selection change
         *
         * @param { 'selectionChange' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback function
         * of on('selectionChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        on(type: 'selectionChange', callback: (oldBegin: number, oldEnd: number, newBegin: number, newEnd: number) => void): void;
        /**
         * Unsubscribe selection change
         *
         * @param { 'selectionChange' } type - indicates the type of unsubscribe event.
         * @param { function } [callback] - optional,
         * indicates the callback function of off('selectionChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        off(type: 'selectionChange', callback?: (oldBegin: number, oldEnd: number, newBegin: number, newEnd: number) => void): void;
        /**
         * Subscribe text change
         *
         * @param { 'textChange' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback function of on('textChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        on(type: 'textChange', callback: (text: string) => void): void;
        /**
         * Unsubscribe text change
         *
         * @param { 'textChange' } type - indicates the type of unsubscribe event.
         * @param { function } [callback] - optional, indicates the callback function of off('textChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        off(type: 'textChange', callback?: (text: string) => void): void;
        /**
         * Subscribe input text attribute change
         *
         * @param { 'editorAttributeChanged' } type - indicates the type of subscribe event.
         * @param { function } callback - indicates the callback function of on('editorAttributeChanged').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        on(type: 'editorAttributeChanged', callback: (attr: EditorAttribute) => void): void;
        /**
         * Unsubscribe input text attribute change
         *
         * @param { 'editorAttributeChanged' } type - indicates the type of subscribe event.
         * @param { function } [callback] - indicates the callback function of off('editorAttributeChanged').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        off(type: 'editorAttributeChanged', callback?: (attr: EditorAttribute) => void): void;
    }
    /**
     * A panel is a container used to hold soft keyboard, candidate list, or status bar.
     *
     * @interface Panel
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    interface Panel {
        /**
         * Sets ui content.
         * <p>When this method is executed successfully, the content of panel will be replaced.</p>
         *
         * @param { string } path - the path of ui content.
         * @param { AsyncCallback<void> } callback - the callback of setUiContent.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        setUiContent(path: string, callback: AsyncCallback<void>): void;
        /**
         * Sets ui content.
         * <p>When this method is executed successfully, the content of panel will be replaced.</p>
         *
         * @param { string } path - the path of ui content.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        setUiContent(path: string): Promise<void>;
        /**
         * Sets ui content.
         * <p>When this method is executed successfully, the content of panel will be replaced.</p>
         *
         * @param { string } path - the path of ui content.
         * @param { LocalStorage } storage - the data object shared within the content instance loaded by the panel.
         * @param { AsyncCallback<void> } callback - the callback of setUiContent.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        setUiContent(path: string, storage: LocalStorage, callback: AsyncCallback<void>): void;
        /**
         * Sets ui content.
         * <p>When this method is executed successfully, the content of panel will be replaced.</p>
         *
         * @param { string } path - the path of ui content.
         * @param { LocalStorage } storage - the data object shared within the content instance loaded by the panel.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        setUiContent(path: string, storage: LocalStorage): Promise<void>;
        /**
         * Resizes a panel.
         *
         * @param { number } width - the new width of the panel.
         * @param { number } height - the new height of the panel.
         * @param { AsyncCallback<void> } callback - the callback of resize.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        resize(width: number, height: number, callback: AsyncCallback<void>): void;
        /**
         * Resizes a panel.
         *
         * @param { number } width - the new width of the panel.
         * @param { number } height - the new height of the panel.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        resize(width: number, height: number): Promise<void>;
        /**
         * Moves a panel.
         * <p>It's unusable for SOFT_KEYBOARD panel with FLG_FIXED.</p>
         *
         * @param { number } x - the x-coordinate of the new position.
         * @param { number } y - the y-coordinate of the new position.
         * @param { AsyncCallback<void> } callback - the callback of moveTo.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        moveTo(x: number, y: number, callback: AsyncCallback<void>): void;
        /**
         * Moves a panel.
         * <p>It's unusable for SOFT_KEYBOARD panel with FLG_FIXED.</p>
         *
         * @param { number } x - the x-coordinate of the new position.
         * @param { number } y - the y-coordinate of the new position.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        moveTo(x: number, y: number): Promise<void>;
        /**
         * Shows panel.
         *
         * @param { AsyncCallback<void> } callback - the callback of show.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        show(callback: AsyncCallback<void>): void;
        /**
         * Shows panel.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        show(): Promise<void>;
        /**
         * Hides panel.
         *
         * @param { AsyncCallback<void> } callback - the callback of hide.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        hide(callback: AsyncCallback<void>): void;
        /**
         * Hides panel.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        hide(): Promise<void>;
        /**
         * Registers panel show event.
         * <p>The "show" events are triggered when the panel is shown.</p>
         *
         * @param { 'show' } type - events type.
         * @param { function } callback - the callback will be called when events are triggered.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        on(type: 'show', callback: () => void): void;
        /**
         * Unregisters panel show event.
         *
         * @param { 'show' } type - events type.
         * @param { function } [callback] - the callback to Unregister.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        off(type: 'show', callback?: () => void): void;
        /**
         * Registers panel hide event.
         * <p>The "hide" events are triggered when the panel is hidden.</p>
         *
         * @param { 'hide' } type - events type.
         * @param { function } callback - the callback will be called when events are triggered.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        on(type: 'hide', callback: () => void): void;
        /**
         * Unregisters panel hide event.
         *
         * @param { 'hide' } type - events type.
         * @param { function } [callback] - the callback to Unregister.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        off(type: 'hide', callback?: () => void): void;
        /**
         * Changes panel flag.
         * <p>Before flag is changed, Developers should hide the panel.After that, developers can change the content, size, point of the panel
         *    and show it again at appropriate opportunity.</p>
         *
         * @param { PanelFlag } flag - the callback of changeFlag.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        changeFlag(flag: PanelFlag): void;
        /**
         * Sets ime panel private mode or not.
         *
         * @permission ohos.permission.PRIVACY_WINDOW
         * @param { boolean } isPrivacyMode - if the value is true, the privacy mode will be set,
         * otherwise the non-privacy mode will be set.
         * @throws { BusinessError } 201 - permissions check fails.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        setPrivacyMode(isPrivacyMode: boolean): void;
        /**
         * Adjust the rect of soft keyboard panel for landscape and portrait orientations.
         * <p>It's only used for SOFT_KEYBOARD panel with FLG_FIXED and FLG_FLOATING.</p>
         *
         * @param { PanelFlag } flag - panel flag.
         * @param { PanelRect } rect - panel rect.
         * @throws { BusinessError } 401 - parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
         * @throws { BusinessError } 12800013 - window manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        adjustPanelRect(flag: PanelFlag, rect: PanelRect): void;
        /**
         * Subscribe 'sizeChange' event.
         * <p>It's only used for SOFT_KEYBOARD panel with FLG_FIXED and FLG_FLOATING.</p>
         *
         * @param { 'sizeChange' } type - the type of subscribe event.
         * @param { Callback<window.Size> } callback - the callback of on('sizeChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        on(type: 'sizeChange', callback: Callback<window.Size>): void;
        /**
         * Unsubscribe 'sizeChange' event.
         * <p>It's only used for SOFT_KEYBOARD panel with FLG_FIXED and FLG_FLOATING.</p>
         *
         * @param { 'sizeChange' } type - the type of unsubscribe event.
         * @param { Callback<window.Size> } [callback] - optional, the callback of off('sizeChange').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        off(type: 'sizeChange', callback?: Callback<window.Size>): void;
    }
    /**
     * @interface EditorAttribute
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    interface EditorAttribute {
        /**
         * Editor's pattern
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        readonly inputPattern: number;
        /**
         * Editor's key type
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        readonly enterKeyType: number;
        /**
         * Indicates whether the editor supports the text preview.
         *
         * @type { boolean }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        isTextPreviewSupported: boolean;
    }
    /**
     * @interface KeyEvent
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 8
     */
    interface KeyEvent {
        /**
         * Key code
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        readonly keyCode: number;
        /**
         * Key action
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 8
         */
        readonly keyAction: number;
    }
    /**
     * Enumerates the flags of panel
     *
     * @enum { number }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    export enum PanelFlag {
        /**
         * Fixed style.
         * <p>It's provided for the panel with type of SOFT_KEYBOARD.
         * When the flag is set, the soft keyboard is fixed at the bottom of the screen.</p>
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        FLG_FIXED = 0,
        /**
         * Floating style.
         * <p>It's provided for the panel with type of SOFT_KEYBOARD.
         * When the flag is set, the soft keyboard is floating.</p>
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        FLG_FLOATING
    }
    /**
     * <p>Panel types provided for input method applications.</p>
     * <p>Input method application developers should select the appropriate panel type according to the user scenario.</p>
     *
     * @enum { number }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    export enum PanelType {
        /**
         * Panel for displaying a virtual software keyboard.
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        SOFT_KEYBOARD = 0,
        /**
         * Panel for displaying status bar.
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        STATUS_BAR
    }
    /**
     * Panel information.
     *
     * @typedef PanelInfo
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    export interface PanelInfo {
        /**
         * Panel type.
         *
         * @type { PanelType }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        type: PanelType;
        /**
         * <p>Flag of Panel.</p>
         * <p>Currently only using for SOFT_KEYBOARD panel.</p>
         *
         * @type { ?PanelFlag }
         * @default FLG_FIXED
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        flag?: PanelFlag;
    }
    /**
     * Enumerates the moving direction of cursor
     *
     * @enum { number }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    export enum Direction {
        /**
         * Cursor moves up
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        CURSOR_UP = 1,
        /**
         * Cursor moves down
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        CURSOR_DOWN,
        /**
         * Cursor moves left
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        CURSOR_LEFT,
        /**
         * Cursor moves right
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        CURSOR_RIGHT
    }
    /**
     * Enumerates the security mode.
     *
     * @enum { number }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    export enum SecurityMode {
        /**
         * Basic security mode
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        BASIC = 0,
        /**
         * Full security mode
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 11
         */
        FULL
    }
    /**
     * Range of selected text.
     *
     * @interface Range
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    export interface Range {
        /**
         * Indicates the index of the first character of the selected text.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        start: number;
        /**
         * Indicates the index of the last character of the selected text.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        end: number;
    }
    /**
     * Movement of cursor.
     *
     * @interface Movement
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    export interface Movement {
        /**
         * Indicates the direction of cursor movement
         *
         * @type { Direction }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        direction: Direction;
    }
    /**
     * Enumerates the extend action.
     *
     * @enum { number }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 10
     */
    export enum ExtendAction {
        /**
         * Select all text.
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        SELECT_ALL = 0,
        /**
         * Cut selecting text.
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        CUT = 3,
        /**
         * Copy selecting text.
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        COPY = 4,
        /**
         * Paste from paste board.
         *
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 10
         */
        PASTE = 5
    }
    /**
     * Window info.
     *
     * @interface WindowInfo
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 12
     */
    export interface WindowInfo {
        /**
         * Rectangle.
         *
         * @type { window.Rect }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        rect: window.Rect;
        /**
         * Window status.
         *
         * @type { window.WindowStatusType }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        status: window.WindowStatusType;
    }
    /**
     * Panel Rect.
     *
     * @interface PanelRect
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 12
     */
    export interface PanelRect {
        /**
         * Panel rect in landscape orientation.
         *
         * @type { window.Rect }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        landscapeRect: window.Rect;
        /**
         * Panel rect in portrait orientation.
         *
         * @type { window.Rect }
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 12
         */
        portraitRect: window.Rect;
    }
}
export default inputMethodEngine;
