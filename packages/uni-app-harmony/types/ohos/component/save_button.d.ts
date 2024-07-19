/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * Enumerates the icon styles.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Enumerates the icon styles.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare enum SaveIconStyle {
    /**
     * Icon filled with the specified color.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Icon filled with the specified color.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    FULL_FILLED = 0,
    /**
     * Icon rendered as lines.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Icon rendered as lines.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    LINES = 1
}
/**
 * Enumerates the text that can be displayed on the save button.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Enumerates the text that can be displayed on the save button.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare enum SaveDescription {
    /**
     * Download
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Download
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    DOWNLOAD = 0,
    /**
     * Download File
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Download File
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    DOWNLOAD_FILE = 1,
    /**
     * Save
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Save
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    SAVE = 2,
    /**
     * Save Image
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Save Image
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    SAVE_IMAGE = 3,
    /**
     * Save File
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Save File
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    SAVE_FILE = 4,
    /**
     * Download and Share
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Download and Share
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    DOWNLOAD_AND_SHARE = 5,
    /**
     * Receive
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Receive
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    RECEIVE = 6,
    /**
     * Continue to Receive
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Continue to Receive
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    CONTINUE_TO_RECEIVE = 7,
    /**
     * Save to gallery
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    SAVE_TO_GALLERY = 8
}
/**
 * Declares the interface for setting the save button options.
 *
 * @interface SaveButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declares the interface for setting the save button options.
 *
 * @interface SaveButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare interface SaveButtonOptions {
    /**
     * Style of the icon to be drawn.
     *
     * @type { ?SaveIconStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Style of the icon to be drawn.
     *
     * @type { ?SaveIconStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    icon?: SaveIconStyle;
    /**
     * Text to be displayed on the button.
     *
     * @type { ?SaveDescription }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Text to be displayed on the button.
     *
     * @type { ?SaveDescription }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    text?: SaveDescription;
    /**
     * Type of the button.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Type of the button.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    buttonType?: ButtonType;
}
/**
 * Enumerates the click event results of the save button.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Enumerates the click event results of the save button.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare enum SaveButtonOnClickResult {
    /**
     * Success.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Success.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    SUCCESS = 0,
    /**
     * Failure because the application is not temporarily authorized for saving files.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Failure because the application is not temporarily authorized for saving files.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    TEMPORARY_AUTHORIZATION_FAILED = 1
}
/**
 * Defines the interface for setting a save button.
 *
 * @interface SaveButtonInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the interface for setting a save button.
 *
 * @interface SaveButtonInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
interface SaveButtonInterface {
    /**
     * Creates a save button.
     *
     * @returns { SaveButtonAttribute } Returns the attribute of the save button.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Creates a save button.
     *
     * @returns { SaveButtonAttribute } Returns the attribute of the save button.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    (): SaveButtonAttribute;
    /**
     * Creates a save button with the specified composition.
     * If an attribute is not set, the corresponding element will not be drawn.
     *
     * @param { SaveButtonOptions } options - Indicates the options of the save button.
     * @returns { SaveButtonAttribute } Returns the attribute of the save button.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Creates a save button with the specified composition.
     * If an attribute is not set, the corresponding element will not be drawn.
     *
     * @param { SaveButtonOptions } options - Indicates the options of the save button.
     * @returns { SaveButtonAttribute } Returns the attribute of the save button.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    (options: SaveButtonOptions): SaveButtonAttribute;
}
/**
 * Defines the attributes of the save button.
 *
 * @extends SecurityComponentMethod<SaveButtonAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the attributes of the save button.
 *
 * @extends SecurityComponentMethod<SaveButtonAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare class SaveButtonAttribute extends SecurityComponentMethod<SaveButtonAttribute> {
    /**
     * Called when the save button is clicked.
     *
     * @param { function } event
     * @returns { SaveButtonAttribute } Returns the attribute of the save button.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Called when the save button is clicked.
     *
     * @param { function } event
     * @returns { SaveButtonAttribute } Returns the attribute of the save button.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    onClick(event: (event: ClickEvent, result: SaveButtonOnClickResult) => void): SaveButtonAttribute;
}
/**
 * Defines a button that interacts with the security component service to
 * request the permission for saving files in the media library.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines a button that interacts with the security component service to
 * request the permission for saving files in the media library.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare const SaveButton: SaveButtonInterface;
/**
 * Defines a save button instance for secure access.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines a save button instance for secure access.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare const SaveButtonInstance: SaveButtonAttribute;
