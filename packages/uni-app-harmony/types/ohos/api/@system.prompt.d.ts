/*
 * Copyright (c) 2020 Huawei Device Co., Ltd.
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
 * Defines the options of ShowToast.
 *
 * @interface ShowToastOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.prompt
 */
export interface ShowToastOptions {
    /**
     * Text to display.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    message: string;
    /**
     * Duration of toast dialog box. The default value is 1500.
     * The recommended value ranges from 1500 ms to 10000ms.
     * NOTE: A value less than 1500 is automatically changed to 1500. The maximum value is 10000 ms.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    duration?: number;
    /**
     * The distance between toast dialog box and the bottom of screen.
     *
     * @type { ?(string | number) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 5
     * @deprecated since 8
     */
    bottom?: string | number;
}
/**
 * Defines the prompt info of button.
 *
 * @interface Button
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the prompt info of button.
 *
 * @interface Button
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface Button {
    /**
     * Defines the button info.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Defines the button info.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    text: string;
    /**
     * Defines the color of button.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Defines the color of button.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    color: string;
}
/**
 * Defines the response of ShowDialog.
 *
 * @interface ShowDialogSuccessResponse
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the response of ShowDialog.
 *
 * @interface ShowDialogSuccessResponse
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface ShowDialogSuccessResponse {
    /**
     * Defines the index of data.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Defines the index of data.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    index: number;
}
/**
 * Defines the option of show dialog.
 *
 * @interface ShowDialogOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the option of show dialog.
 *
 * @interface ShowDialogOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface ShowDialogOptions {
    /**
     * Title of the text to display.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Title of the text to display.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    title?: string;
    /**
     * Text body.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Text body.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    message?: string;
    /**
     * Array of buttons in the dialog box.
     * The array structure is {text:'button', color: '#666666'}.
     * One to three buttons are supported. The first button is of the positiveButton type, the second is of the negativeButton type, and the third is of the neutralButton type.
     *
     * @type { ?[Button, Button?, Button?] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Array of buttons in the dialog box.
     * The array structure is {text:'button', color: '#666666'}.
     * One to three buttons are supported. The first button is of the positiveButton type, the second is of the negativeButton type, and the third is of the neutralButton type.
     *
     * @type { ?[Button, Button?, Button?] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    buttons?: [
        Button,
        Button?,
        Button?
    ];
    /**
     * Called when the dialog box is displayed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Called when the dialog box is displayed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    success?: (data: ShowDialogSuccessResponse) => void;
    /**
     * Called when the operation is cancelled.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Called when the operation is cancelled.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    cancel?: (data: string, code: string) => void;
    /**
     * Called when the dialog box is closed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Called when the dialog box is closed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    complete?: (data: string) => void;
}
/**
 * Defines the option of ShowActionMenu.
 *
 * @interface ShowActionMenuOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 6
 */
/**
 * Defines the option of ShowActionMenu.
 *
 * @interface ShowActionMenuOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface ShowActionMenuOptions {
    /**
     * Title of the text to display.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     */
    /**
     * Title of the text to display.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    title?: string;
    /**
     * Array of buttons in the dialog box.
     * The array structure is {text:'button', color: '#666666'}.
     * One to six buttons are supported.
     *
     * @type { [Button, Button?, Button?, Button?, Button?, Button?] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     */
    /**
     * Array of buttons in the dialog box.
     * The array structure is {text:'button', color: '#666666'}.
     * One to six buttons are supported.
     *
     * @type { [Button, Button?, Button?, Button?, Button?, Button?] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    buttons: [
        Button,
        Button?,
        Button?,
        Button?,
        Button?,
        Button?
    ];
    /**
     * Called when the dialog box is displayed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     */
    /**
     * Called when the dialog box is displayed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    success?: (tapIndex: number, errMsg: string) => void;
    /**
     * Called when the operation is cancelled.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     */
    /**
     * Called when the operation is cancelled.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    fail?: (errMsg: string) => void;
    /**
     * Called when the dialog box is closed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     */
    /**
     * Called when the dialog box is closed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    complete?: () => void;
}
/**
 * Defines the prompt interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the prompt interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export default class Prompt {
    /**
     * Displays the notification text.
     *
     * @param { ShowToastOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Displays the notification text.
     *
     * @param { ShowToastOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    static showToast(options: ShowToastOptions): void;
    /**
     * Displays the dialog box.
     *
     * @param { ShowDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Displays the dialog box.
     *
     * @param { ShowDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    static showDialog(options: ShowDialogOptions): void;
    /**
     * Displays the menu.
     *
     * @param { ShowActionMenuOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     */
    /**
     * Displays the menu.
     *
     * @param { ShowActionMenuOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    static showActionMenu(options: ShowActionMenuOptions): void;
}
