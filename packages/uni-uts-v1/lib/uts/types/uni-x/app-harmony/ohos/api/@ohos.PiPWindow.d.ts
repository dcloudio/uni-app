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
import type { Callback } from './@ohos.base';
/**
 * Picture In Picture Window Manager
 *
 * @namespace PiPWindow
 * @syscap SystemCapability.Window.SessionManager
 * @since 11
 */
/**
 * Picture In Picture Window Manager
 *
 * @namespace PiPWindow
 * @syscap SystemCapability.Window.SessionManager
 * @atomicservice
 * @since 12
 */
declare namespace PiPWindow {
    /**
     * If picture-in-picture enabled in current OS.
     *
     * @returns { boolean } true if PictureInPicture enabled, otherwise false
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * If picture-in-picture enabled in current OS.
     *
     * @returns { boolean } true if PictureInPicture enabled, otherwise false
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
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
     * @atomicservice
     * @since 12
     */
    function create(config: PiPConfiguration): Promise<PiPController>;
    /**
     * PiPConfiguration
     *
     * @interface PiPConfiguration
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * PiPConfiguration
     *
     * @interface PiPConfiguration
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    interface PiPConfiguration {
        /**
         * Indicates window context.
         *
         * @type { BaseContext }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Indicates window context.
         *
         * @type { BaseContext }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        context: BaseContext;
        /**
         * Indicates the origin XComponentController.
         *
         * @type { XComponentController }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Indicates the origin XComponentController.
         *
         * @type { XComponentController }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        componentController: XComponentController;
        /**
         * Indicates navigation ID.
         *
         * @type { ?string }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Indicates navigation ID.
         *
         * @type { ?string }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        navigationId?: string;
        /**
         * Picture-in-picture template type.
         *
         * @type { ?PiPTemplateType }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Picture-in-picture template type.
         *
         * @type { ?PiPTemplateType }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        templateType?: PiPTemplateType;
        /**
         * Describes the width of content to be displayed in PiP window. For adjusting PiP window aspect ratio.
         *
         * @type { ?number }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Describes the width of content to be displayed in PiP window. For adjusting PiP window aspect ratio.
         *
         * @type { ?number }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        contentWidth?: number;
        /**
         * Describes the height of content to be displayed in PiP window. For adjusting PiP window aspect ratio.
         *
         * @type { ?number }
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Describes the height of content to be displayed in PiP window. For adjusting PiP window aspect ratio.
         *
         * @type { ?number }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        contentHeight?: number;
        /**
         * Describes the custom controls to be displayed in PiP window control panel. If the parameter is empty, only mandatory controls are displayed.
         *
         * @type { ?Array<PiPControlGroup> }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        controlGroups?: Array<PiPControlGroup>;
        /**
         * Describes the customUIController by which we can display a custom layout above pip content.
         *
         * @type { ?NodeController }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        customUIController?: NodeController;
    }
    /**
     * Describe the type of picture-in-picture.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * Describe the type of picture-in-picture.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum PiPTemplateType {
        /**
         * Indicates the content to show in picture-in-picture window is video play
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Indicates the content to show in picture-in-picture window is video play
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_PLAY,
        /**
         * Indicates the content to show in picture-in-picture window is video call
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Indicates the content to show in picture-in-picture window is video call
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_CALL,
        /**
         * Indicates the content to show in picture-in-picture window is video meeting
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Indicates the content to show in picture-in-picture window is video meeting
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_MEETING,
        /**
         * Indicates the content to show in picture-in-picture window is video live
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Indicates the content to show in picture-in-picture window is video live
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
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
    /**
     * Enum for PiP window callback event type.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum PiPState {
        /**
         * PiP window is about to start.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * PiP window is about to start.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        ABOUT_TO_START = 1,
        /**
         * PiP window started.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * PiP window started.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        STARTED = 2,
        /**
         * PiP window is about to stop.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * PiP window is about to stop.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        ABOUT_TO_STOP = 3,
        /**
         * PiP window stopped.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * PiP window stopped.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        STOPPED = 4,
        /**
         * Restore the original page from PiP window
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Restore the original page from PiP window
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        ABOUT_TO_RESTORE = 5,
        /**
         * Error message during start/stop.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Error message during start/stop.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        ERROR = 6
    }
    /**
     * Describe PiP window custom controls.
     *
     * @typedef { VideoPlayControlGroup | VideoCallControlGroup | VideoMeetingControlGroup | VideoLiveControlGroup }
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    type PiPControlGroup = VideoPlayControlGroup | VideoCallControlGroup | VideoMeetingControlGroup | VideoLiveControlGroup;
    /**
     * Enum for video play PiP window custom controls.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum VideoPlayControlGroup {
        /**
         * Previous/Next for video.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_PREVIOUS_NEXT = 101,
        /**
         * Forward/Backward for video.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FAST_FORWARD_BACKWARD = 102
    }
    /**
     * Enum for video call PiP window custom controls.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum VideoCallControlGroup {
        /**
         * Turn on/off the microphone.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        MICROPHONE_SWITCH = 201,
        /**
         * Hang up.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        HANG_UP_BUTTON = 202,
        /**
         * Turn on/off the camera
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        CAMERA_SWITCH = 203,
        /**
         * Mute switch.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        MUTE_SWITCH = 204
    }
    /**
     * Enum for video meeting PiP window custom controls.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum VideoMeetingControlGroup {
        /**
         * Hang up.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        HANG_UP_BUTTON = 301,
        /**
         * Turn on/off the camera
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        CAMERA_SWITCH = 302,
        /**
         * Mute switch.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        MUTE_SWITCH = 303,
        /**
         * Turn on/off the microphone.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        MICROPHONE_SWITCH = 304
    }
    /**
     * Enum for video Live PiP window custom controls.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum VideoLiveControlGroup {
        /**
         * Video play/pause control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_PLAY_PAUSE = 401,
        /**
         * Mute switch.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        MUTE_SWITCH = 402
    }
    /**
     * Enum for control status.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum PiPControlStatus {
        /**
         * The video is in play mode.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        PLAY = 1,
        /**
         * The video is in pause mode.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        PAUSE = 0,
        /**
         * A control with both open and closed states is in an open state.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        OPEN = 1,
        /**
         * A control with both open and closed states is in a close state.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        CLOSE = 0
    }
    /**
     * Enum for control type.
     *
     * @enum { number }.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum PiPControlType {
        /**
         * Video play/pause control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_PLAY_PAUSE = 0,
        /**
         * Previous video control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_PREVIOUS = 1,
        /**
         * Next video control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        VIDEO_NEXT = 2,
        /**
         * Fast-forward control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FAST_FORWARD = 3,
        /**
         * Fast-backward control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FAST_BACKWARD = 4,
        /**
         * Hang-up control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        HANG_UP_BUTTON = 5,
        /**
         * Microphone state switching control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        MICROPHONE_SWITCH = 6,
        /**
         * Camera state switching control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        CAMERA_SWITCH = 7,
        /**
         * Mute state switching control.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        MUTE_SWITCH = 8
    }
    /**
     * Describe picture-in-picture action event type.
     *
     * @typedef { PiPVideoActionEvent | PiPCallActionEvent | PiPMeetingActionEvent | PiPLiveActionEvent }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * Describe picture-in-picture action event type.
     *
     * @typedef { PiPVideoActionEvent | PiPCallActionEvent | PiPMeetingActionEvent | PiPLiveActionEvent }
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
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
     * @atomicservice
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
    /**
     * Describe picture-in-picture call template action event type.
     *
     * @typedef { 'hangUp' | 'micStateChanged' | 'videoStateChanged' | 'voiceStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    type PiPCallActionEvent = 'hangUp' | 'micStateChanged' | 'videoStateChanged' | 'voiceStateChanged';
    /**
     * Describe picture-in-picture meeting template action event type.
     *
     * @typedef { 'hangUp' | 'voiceStateChanged' | 'videoStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * Describe picture-in-picture meeting template action event type.
     *
     * @typedef { 'hangUp' | 'voiceStateChanged' | 'videoStateChanged' | 'micStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    type PiPMeetingActionEvent = 'hangUp' | 'voiceStateChanged' | 'videoStateChanged' | 'micStateChanged';
    /**
     * Describe picture-in-picture live template action event type.
     *
     * @typedef { 'playbackStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * Describe picture-in-picture live template action event type.
     *
     * @typedef { 'playbackStateChanged' | 'voiceStateChanged' }
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    type PiPLiveActionEvent = 'playbackStateChanged' | 'voiceStateChanged';
    /**
     * Describe picture-in-picture control panel action event callback.
     *
     * @typedef { function } ControlPanelActionEventCallback
     * @param { PiPActionEventType } event - the event from controlPanel
     * @param { number } [status] - the status of control button
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    type ControlPanelActionEventCallback = (event: PiPActionEventType, status?: number) => void;
    /**
     * Describe picture-in-picture control event callback.
     *
     * @interface ControlEventParam
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    interface ControlEventParam {
        /**
         * The type of control.
         *
         * @type { PiPControlType }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        controlType: PiPControlType;
        /**
         * The status of control.
         *
         * @type { ?PiPControlStatus }
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        status?: PiPControlStatus;
    }
    /**
     * PiPController
     *
     * @interface PiPController
     * @syscap SystemCapability.Window.SessionManager
     * @since 11
     */
    /**
     * PiPController
     *
     * @interface PiPController
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
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
        /**
         * Start picture-in-picture
         * @returns { Promise<void> } - The promise returned by the function
         * @throws { BusinessError } 1300012 - The PiP window state is abnormal.
         * @throws { BusinessError } 1300013 - Failed to create the PiP window.
         * @throws { BusinessError } 1300014 - PiP internal error.
         * @throws { BusinessError } 1300015 - Repeated PiP operation.
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
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
        /**
         * Stop picture-in-picture.
         * @returns { Promise<void> } - The promise returned by the function.
         * @throws { BusinessError } 1300011 - Failed to destroy the PiP window.
         * @throws { BusinessError } 1300012 - The PiP window state is abnormal.
         * @throws { BusinessError } 1300015 - Repeated PiP operation.
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        stopPiP(): Promise<void>;
        /**
         * Set if auto start picture-in-picture when back home
         * @param { boolean } enable - Enable auto start picture-in-picture when back home
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Set if auto start picture-in-picture when back home
         * @param { boolean } enable - Enable auto start picture-in-picture when back home
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
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
        /**
         * Update source content size to adjust PiP window aspect ratio.
         * @param { number } width - Indicate the width of the content. The width can consist of only digits and above 0.
         * @param { number } height - Indicate the height of the content. The height can consist of only digits and above 0.
         * @throws { BusinessError } 401 - Params error. Possible causes: 1. Mandatory parameters are left unspecified.
         *                                                                2. Incorrect parameter types.
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        updateContentSize(width: number, height: number): void;
        /**
         * Set dashboard control status.
         * @param { PiPControlType } controlType - Describe picture-in-picture control type.
         * @param { PiPControlStatus } status - Describe picture-in-picture control Status.
         * @throws { BusinessError } 401 - Params error. Possible causes: 1. Mandatory parameters are left unspecified.
         *                                                                2. Incorrect parameter types.
         *                                                                3. Parameter verification failed
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        updatePiPControlStatus(controlType: PiPControlType, status: PiPControlStatus): void;
        /**
         * Set Dashboard control enable status.
         * @param { PiPControlType } controlType - Describe picture-in-picture control type.
         * @param { boolean } enabled - Describe picture-in-picture control enable Status.
         * @throws { BusinessError } 401 - Params error. Possible causes: 1. Mandatory parameters are left unspecified.
         *                                                                2. Incorrect parameter types.
         *                                                                3. Parameter verification failed
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        setPiPControlEnabled(controlType: PiPControlType, enabled: boolean): void;
        /**
         * Register picture-in-picture control event listener.
         * @param { 'stateChange' } type - Registration type, PiP lifecycle state change, 'stateChange'
         * @param { function } callback - Used to handle {'stateChange'} command
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Register picture-in-picture control event listener.
         * @param { 'stateChange' } type - Registration type, PiP lifecycle state change, 'stateChange'
         * @param { function } callback - Used to handle {'stateChange'} command
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        on(type: 'stateChange', callback: (state: PiPState, reason: string) => void): void;
        /**
         * Unregister picture-in-picture lifecycle event listener.
         * @param { 'stateChange' } type - Used to unregister listener for {'stateChange'} command
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Unregister picture-in-picture lifecycle event listener.
         * @param { 'stateChange' } type - Used to unregister listener for {'stateChange'} command
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
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
         * @atomicservice
         * @since 12
         */
        on(type: 'controlPanelActionEvent', callback: ControlPanelActionEventCallback): void;
        /**
         * Unregister picture-in-picture lifecycle event listener
         * @param { 'controlPanelActionEvent' } type - Used to unregister listener for {'controlPanelActionEvent'} command
         * @syscap SystemCapability.Window.SessionManager
         * @since 11
         */
        /**
         * Unregister picture-in-picture lifecycle event listener
         * @param { 'controlPanelActionEvent' } type - Used to unregister listener for {'controlPanelActionEvent'} command
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        off(type: 'controlPanelActionEvent'): void;
        /**
         * Register picture-in-picture control event listener.
         *
         * @param { 'controlEvent' } type - Registration type, user action event, 'controlEvent'
         * @param { Callback<ControlEventParam> } callback - Used to handle {'controlEvent'} command.
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        on(type: 'controlEvent', callback: Callback<ControlEventParam>): void;
        /**
         * Unregister picture-in-picture control event listener
         * @param { 'controlEvent' } type - Used to unregister listener for {'controlEvent'} command
         * @param { Callback<ControlEventParam> } callback - Used to handle {'controlEvent'} command.
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        off(type: 'controlEvent', callback?: Callback<ControlEventParam>): void;
    }
}
export default PiPWindow;
