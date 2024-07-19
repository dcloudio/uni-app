/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
import type BaseContext from './application/BaseContext';
/**
 * Picture In Picture Window Manager
 *
 * @namespace PiPWindow
 * @syscap SystemCapability.Window.SessionManager
 * @since 11
 */
declare namespace PiPWindow {
    /**
     * If picture-in-picture enabled in current OS.
     *
     * @returns { boolean } true if PictureInPicture enabled, otherwise false
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    function isPiPEnabled(): boolean;
    /**
     * Create picture-in-picture controller
     *
     * @param { PiPConfiguration } config - Params for picture-in-picture controller creation. The config must be valid,
     * the context and componentController in config should not be null. If templateType is specified, make sure
     * it's type of PiPTemplateType. If controlGroups is specified, make sure it correspond to the templateType.
     * @returns { Promise<PiPController> } - The promise returned by the function
     * @throws { BusinessError } 401 - Params error. Possible causes: 1. Mandatory parameters are left unspecified.
     *                                                                2. Incorrect parameter types.
     *                                                                3. Parameter verification failed
     * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    function create(config: PiPConfiguration): Promise<PiPController>;
    /**
     * PiPConfiguration
     *
     * @interface PiPConfiguration
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    interface PiPConfiguration {
        /**
         * Indicates window context.
         *
         * @type { BaseContext }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        context: BaseContext;
        /**
         * Indicates the origin XComponentController.
         *
         * @type { XComponentController }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        componentController: XComponentController;
        /**
         * Indicates navigation ID.
         *
         * @type { ?string }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        navigationId?: string;
        /**
         * Picture-in-picture template type.
         *
         * @type { ?PiPTemplateType }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        templateType?: PiPTemplateType;
        /**
         * Describes the width of content to be displayed in PiP window. For adjusting PiP window aspect ratio.
         *
         * @type { ?number }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        contentWidth?: number;
        /**
         * Describes the height of content to be displayed in PiP window. For adjusting PiP window aspect ratio.
         *
         * @type { ?number }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        contentHeight?: number;
        /**
         * Describes the custom controls to be displayed in PiP window control panel. If the parameter is empty, only mandatory controls are displayed.
         *
         * @type { ?Array<PiPControlGroup> }
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        controlGroups?: Array<PiPControlGroup>;
    }
    /**
     * Describe the type of picture-in-picture.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    enum PiPTemplateType {
        /**
         * Indicates the content to show in picture-in-picture window is video play
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        VIDEO_PLAY,
        /**
         * Indicates the content to show in picture-in-picture window is video call
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        VIDEO_CALL,
        /**
         * Indicates the content to show in picture-in-picture window is video meeting
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        VIDEO_MEETING,
        /**
         * Indicates the content to show in picture-in-picture window is video live
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        VIDEO_LIVE
    }
    /**
     * Enum for PiP window callback event type.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    enum PiPState {
        /**
         * PiP window is about to start.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        ABOUT_TO_START = 1,
        /**
         * PiP window started.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        STARTED = 2,
        /**
         * PiP window is about to stop.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        ABOUT_TO_STOP = 3,
        /**
         * PiP window stopped.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        STOPPED = 4,
        /**
         * Restore the original page from PiP window
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        ABOUT_TO_RESTORE = 5,
        /**
         * Error message during start/stop.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        ERROR = 6
    }
    /**
     * Describe PiP window custom controls.
     *
     * @typedef { VideoPlayControlGroup | VideoCallControlGroup | VideoMeetingControlGroup }
     * @syscap SystemCapability.Window.SessionManager
     * @since 12
     */
    type PiPControlGroup = VideoPlayControlGroup | VideoCallControlGroup | VideoMeetingControlGroup;
    /**
     * Enum for video play PiP window custom controls.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @since 12
     */
    enum VideoPlayControlGroup {
        /**
         * Previous/Next for video.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        VIDEO_PREVIOUS_NEXT = 101,
        /**
         * Forward/Backward for video.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        FAST_FORWARD_BACKWARD = 102
    }
    /**
     * Enum for video call PiP window custom controls.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @since 12
     */
    enum VideoCallControlGroup {
        /**
         * Turn on/off the microphone.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        MICROPHONE_SWITCH = 201,
        /**
         * Hang up.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        HANG_UP_BUTTON = 202,
        /**
         * Turn on/off the camera
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        CAMERA_SWITCH = 203
    }
    /**
     * Enum for video meeting PiP window custom controls.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @since 12
     */
    enum VideoMeetingControlGroup {
        /**
         * Hang up.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        HANG_UP_BUTTON = 301,
        /**
         * Turn on/off the camera
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        CAMERA_SWITCH = 302,
        /**
         * Mute switch.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        MUTE_SWITCH = 303
    }
    /**
     * Describe picture-in-picture action event type.
     *
     * @typedef { PiPVideoActionEvent | PiPCallActionEvent | PiPMeetingActionEvent | PiPLiveActionEvent }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    type PiPActionEventType = PiPVideoActionEvent | PiPCallActionEvent | PiPMeetingActionEvent | PiPLiveActionEvent;
    /**
     * Describe picture-in-picture video template action event type.
     *
     * @typedef { 'playbackStateChanged' | 'nextVideo' | 'previousVideo' }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * Describe picture-in-picture video template action event type.
     *
     * @typedef { 'playbackStateChanged' | 'nextVideo' | 'previousVideo' | 'fastForward' | 'fastBackward' }
     * @syscap SystemCapability.Window.SessionManager
     * @since 12
     */
    type PiPVideoActionEvent = 'playbackStateChanged' | 'nextVideo' | 'previousVideo' | 'fastForward' | 'fastBackward';
    /**
     * Describe picture-in-picture call template action event type.
     *
     * @typedef { 'hangUp' | 'micStateChanged' | 'videoStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    type PiPCallActionEvent = 'hangUp' | 'micStateChanged' | 'videoStateChanged';
    /**
     * Describe picture-in-picture meeting template action event type.
     *
     * @typedef { 'hangUp' | 'voiceStateChanged' | 'videoStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    type PiPMeetingActionEvent = 'hangUp' | 'voiceStateChanged' | 'videoStateChanged';
    /**
     * Describe picture-in-picture live template action event type.
     *
     * @typedef { 'playbackStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    type PiPLiveActionEvent = 'playbackStateChanged';
    /**
     * Describe picture-in-picture control panel action event callback.
     *
     * @typedef { function } ControlPanelActionEventCallback
     * @param { PiPActionEventType } event - the event from controlPanel
     * @param { number } [status] - the status of control button
     * @syscap SystemCapability.Window.SessionManager
     * @since 12
     */
    type ControlPanelActionEventCallback = (event: PiPActionEventType, status?: number) => void;
    /**
     * PiPController
     *
     * @interface PiPController
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    interface PiPController {
        /**
         * Start picture-in-picture
         * @returns { Promise<void> } - The promise returned by the function
         * @throws { BusinessError } 1300012 - The PiP window state is abnormal.
         * @throws { BusinessError } 1300013 - Failed to create the PiP window.
         * @throws { BusinessError } 1300014 - PiP internal error.
         * @throws { BusinessError } 1300015 - Repeated PiP operation.
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        startPiP(): Promise<void>;
        /**
         * Stop picture-in-picture.
         * @returns { Promise<void> } - The promise returned by the function.
         * @throws { BusinessError } 1300011 - Failed to destroy the PiP window.
         * @throws { BusinessError } 1300012 - The PiP window state is abnormal.
         * @throws { BusinessError } 1300015 - Repeated PiP operation.
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        stopPiP(): Promise<void>;
        /**
         * Set if auto start picture-in-picture when back home
         * @param { boolean } enable - Enable auto start picture-in-picture when back home
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        setAutoStartEnabled(enable: boolean): void;
        /**
         * Update source content size to adjust PiP window aspect ratio.
         * @param { number } width - Indicate the width of the content. The width can consist of only digits and above 0.
         * @param { number } height - Indicate the height of the content. The height can consist of only digits and above 0.
         * @throws { BusinessError } 401 - Params error. Possible causes: 1. Mandatory parameters are left unspecified.
         *                                                                2. Incorrect parameter types.
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        updateContentSize(width: number, height: number): void;
        /**
         * Register picture-in-picture control event listener.
         * @param { 'stateChange' } type - Registration type, PiP lifecycle state change, 'stateChange'
         * @param { function } callback - Used to handle {'stateChange'} command
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        on(type: 'stateChange', callback: (state: PiPState, reason: string) => void): void;
        /**
         * Unregister picture-in-picture lifecycle event listener.
         * @param { 'stateChange' } type - Used to unregister listener for {'stateChange'} command
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        off(type: 'stateChange'): void;
        /**
         * Register picture-in-picture control event listener.
         * @param { 'controlPanelActionEvent' } type - Registration type, user action event, 'controlPanelActionEvent'
         * @param { function } callback - Used to handle {'controlPanelActionEvent'} command
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Register picture-in-picture control event listener.
         *
         * @param { 'controlPanelActionEvent' } type - Registration type, user action event, 'controlPanelActionEvent'
         * @param { ControlPanelActionEventCallback } callback - Used to handle {'controlPanelActionEvent'} command.
         * @syscap SystemCapability.Window.SessionManager
         * @since 12
         */
        on(type: 'controlPanelActionEvent', callback: ControlPanelActionEventCallback): void;
        /**
         * Unregister picture-in-picture lifecycle event listener
         * @param { 'controlPanelActionEvent' } type - Used to unregister listener for {'controlPanelActionEvent'} command
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        off(type: 'controlPanelActionEvent'): void;
    }
}
export default PiPWindow;
