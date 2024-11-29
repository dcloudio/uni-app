/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2024. All rights reserved.
 */
/**
 * @file Defines liveView capability.
 * @kit LiveViewKit
 */
import type { WantAgent } from '@ohos.wantAgent';
import type image from '@ohos.multimedia.image';
/**
 * Manages liveView.
 *
 * @namespace liveViewManager
 * @syscap SystemCapability.LiveView.LiveViewService
 * @StageModelOnly
 * @since 4.1.0(11)
 */
declare namespace liveViewManager {
    /**
     * Checks whether this application allows to create liveView.
     *
     * @returns { Promise<boolean> } Returns the result of obtaining liveView enable status in the form of Promise.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function isLiveViewEnabled(): Promise<boolean>;
    /**
     * start a liveView.
     *
     * @param { LiveView } liveView - a liveView.
     * @returns { Promise<LiveViewResult> } Returns the result of starting the liveView in the form of Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500004 - LiveView is not enabled.
     * @throws { BusinessError } 1003500005 - The right of liveView is not enabled.
     * @throws { BusinessError } 1003500006 - The liveView already exists.
     * @throws { BusinessError } 1003500007 - Couldn't connect to server.
     * @throws { BusinessError } 1003500008 - Over max number liveViews per second.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function startLiveView(liveView: LiveView): Promise<LiveViewResult>;
    /**
     * update the liveView.
     *
     * @param { LiveView } liveView - a liveView.
     * @returns { Promise<LiveViewResult> } Returns the result of updating the liveView in the form of Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500004 - LiveView is not enabled.
     * @throws { BusinessError } 1003500008 - Over max number liveViews per second.
     * @throws { BusinessError } 1003500009 - The liveView does not exist.
     * @throws { BusinessError } 1003500010 - The liveView has ended.
     * @throws { BusinessError } 1003500011 - The liveView sequence is incorrect.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function updateLiveView(liveView: LiveView): Promise<LiveViewResult>;
    /**
     * stop the liveView.
     *
     * @param { LiveView } liveView - a liveView.
     * @returns { Promise<LiveViewResult> } Returns the result of stopping the liveView in the form of Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500004 - LiveView is not enabled.
     * @throws { BusinessError } 1003500008 - Over max number liveViews per second.
     * @throws { BusinessError } 1003500009 - The liveView does not exist.
     * @throws { BusinessError } 1003500010 - The liveView has ended.
     * @throws { BusinessError } 1003500011 - The liveView sequence is incorrect.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function stopLiveView(liveView: LiveView): Promise<LiveViewResult>;
    /**
     * Obtains the active liveView by id.
     *
     * @param { number } id - the liveView id
     * @returns { Promise<LiveView> } Returns the liveView.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 1003500001 - Internal error.
     * @throws { BusinessError } 1003500002 - Marshalling or unmarshalling error.
     * @throws { BusinessError } 1003500003 - Failed to connect service.
     * @throws { BusinessError } 1003500009 - The liveView does not exist.
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function getActiveLiveView(id: number): Promise<LiveView>;
    /**
     * Defines a LiveView instance.
     *
     * @typedef LiveView
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LiveView {
        /**
         *  liveView id.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        id: number;
        /**
         * liveView scenario.
         *
         * @type { string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        event: string;
        /**
         * liveView sequence.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        sequence?: number;
        /**
         * Obtains the remind mode of the liveView. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isMute?: boolean;
        /**
         * The Timer of liveView.
         *
         * @type { ?LiveViewTimer }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        timer?: LiveViewTimer;
        /**
         * the liveView data.
         *
         * @type { LiveViewData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        liveViewData: LiveViewData;
    }
    /**
     * liveView data.
     *
     * @typedef LiveViewData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LiveViewData {
        /**
         * primary content of liveView.
         *
         * @type { PrimaryData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        primary: PrimaryData;
        /**
         * capsule content of liveView.
         *
         * @type { ?(TextCapsule | TimerCapsule | ProgressCapsule) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        capsule?: TextCapsule | TimerCapsule | ProgressCapsule;
        /**
         * external screen content of liveView.
         *
         * @type { ?ExternalData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        external?: ExternalData;
    }
    /**
     * Defines a primary data of liveView instance.
     *
     * @typedef PrimaryData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface PrimaryData {
        /**
         * the title of primary data of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * the content of primary data of liveView.
         *
         * @type { ?Array<RichText> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: Array<RichText>;
        /**
         * keep time when the liveView end.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        keepTime?: number;
        /**
         * The statics picture of liveView in lock screen.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        liveViewLockScreenPicture?: string | image.PixelMap;
        /**
         * The ability name of the liveview lock screen extension.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        liveViewLockScreenAbilityName?: string;
        /**
         * The paramters to create the liveview lock screen extension.
         *
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        liveViewLockScreenAbilityParameters?: Record<string, string>;
        /**
         * WantAgent instance to which the liveView will be clicked.
         *
         * @type { ?WantAgent }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        clickAction?: WantAgent;
        /**
         * extension Content of liveView.
         *
         * @type { ?ExtensionData }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        extensionData?: ExtensionData;
        /**
         * flexible layout content of liveView.
         * ProgressLayout is used when the templateType is 3.
         * PickupLayout is used when the templateType is 4.
         * FlightLayout is used when the templateType is 5.
         * ScoreLayout is used when the templateType is 7.
         *
         * @type { ?(ProgressLayout | PickupLayout | FlightLayout | ScoreLayout) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * flexible layout content of liveView.
         * ProgressLayout is used when the templateType is 3.
         * PickupLayout is used when the templateType is 4.
         * FlightLayout is used when the templateType is 5.
         * ScoreLayout is used when the templateType is 7.
         * NavigationLayout is used when the templateType is 8.
         *
         * @type { ?(ProgressLayout | PickupLayout | FlightLayout | ScoreLayout | NavigationLayout) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        layoutData?: ProgressLayout | PickupLayout | FlightLayout | ScoreLayout | NavigationLayout;
    }
    /**
     * Obtains the type of a liveView layout.
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum LayoutType {
        /**
         * basic type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_DEFAULT = -1,
        /**
         * progress type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_PROGRESS = 3,
        /**
         * pick up type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_PICKUP = 4,
        /**
         * flight type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_FLIGHT = 5,
        /**
         * score type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LAYOUT_TYPE_SCORE = 7,
        /**
         * navigation type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        LAYOUT_TYPE_NAVIGATION = 8
    }
    /**
     * Defines a extension area content of liveView instance.
     *
     * @typedef ExtensionData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ExtensionData {
        /**
         * the text of extension area content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        text?: string;
        /**
         * the type of extension area content.
         *
         * @type { ?ExtensionType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        type?: ExtensionType;
        /**
         * the picture of extension area content.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        pic?: string | image.PixelMap;
        /**
         * WantAgent instance to which the extension area will be clicked.
         *
         * @type { ?WantAgent }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        clickAction?: WantAgent;
    }
    /**
     * Define a basic capsule content of liveView instance.
     *
     * @typedef CapsuleData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface CapsuleData {
        /**
         * the type of capsule content of liveView.
         *
         * @type { CapsuleType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        type: CapsuleType;
        /**
         * the status of capsule content of liveView.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        status: number;
        /**
         * the icon of capsule content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        icon?: string | image.PixelMap;
        /**
         * the backgroundColor of capsule content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        backgroundColor?: string;
    }
    /**
     * Define a text capsule content of liveView instance, when the type is 1.
     *
     * @typedef TextCapsule
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface TextCapsule extends CapsuleData {
        /**
         * the title of capsule content of liveView..
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * the content of capsule content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: string;
    }
    /**
     * Define a timer capsule content of liveView instance, when the type is 2.
     *
     * @typedef TimerCapsule
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface TimerCapsule extends CapsuleData {
        /**
         * the content of capsule content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: string;
        /**
         * the time of capsule content of liveView.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        time?: number;
        /**
         * Indicates whether the capsule of the timer type is countdown，The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isCountdown?: boolean;
        /**
         * Indicates whether the capsule of the timer type pauses timing. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isPaused?: boolean;
    }
    /**
     * Define a progress capsule content of liveView instance, when the type is 2.
     *
     * @typedef ProgressCapsule
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ProgressCapsule extends CapsuleData {
        /**
         * Maximum progress value of the progress bar.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        max?: number;
        /**
         * current progress value of the progress bar.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        progress?: number;
        /**
         * Specifies whether the progress is displayed as a percentage or in other forms. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        indeterminate?: boolean;
    }
    /**
     * Define a external screen content of liveView instance.
     *
     * @typedef ExternalData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ExternalData {
        /**
         * the title of external screen content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * the content of external screen content of liveView.
         *
         * @type { ?Array<RichText> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: Array<RichText>;
        /**
         * the background type of external screen.
         *
         * @type { ?ExternalType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        type?: ExternalType;
        /**
         * the backgroundColor of external screen content of liveView.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        backgroundColor?: string;
        /**
         * the backgroundPicture of external screen content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        backgroundPicture?: string | image.PixelMap;
    }
    /**
     * Define a basic layout data of liveView instance.
     *
     * @typedef LayoutData
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LayoutData {
        /**
         * liveView template type.
         *
         * @type { LayoutType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        layoutType: LayoutType;
    }
    /**
     * Define a progress layout instance.
     *
     * @typedef ProgressLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ProgressLayout extends LayoutData {
        /**
         * the current value of progress layout.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        progress: number;
        /**
         * the color value of progress layout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        color?: string;
        /**
         * the backgroundColor value of progress layout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        backgroundColor?: string;
        /**
         * display type of indicator small icon, The default value is 0.
         * 0: The indicator icon is not displayed.
         * 1: displayed above the progress line.
         * 2: indicates that the display is overwritten on the progress line.
         *
         * @type { ?IndicatorType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        indicatorType?: IndicatorType;
        /**
         * indicator small icon.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        indicatorIcon?: string | image.PixelMap;
        /**
         * the lineType value of progress information, The default value is 0.
         * 0: display progress using dashed lines.
         * 1: display progress using solid lines.
         * 2: display progress using thick solid lines.
         *
         * @type { ?LineType }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        lineType?: LineType;
        /**
         * Node icon on the progress bar of the extend area
         *
         * @type { ?Array<string|image.PixelMap> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        nodeIcons?: Array<string | image.PixelMap>;
    }
    /**
     * Define the pickup layout data instance when the layoutType is 3.
     *
     * @typedef PickupLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface PickupLayout extends LayoutData {
        /**
         * The title of PickupLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * The content of PickupLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        content?: string;
        /**
         * underlineColor of the content.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        underlineColor?: string;
        /**
         * the desc picture of extend area content of liveView.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        descPic?: string | image.PixelMap;
    }
    /**
     * Define the flight layout data instance when the layoutType is 4.
     *
     * @typedef FlightLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface FlightLayout extends LayoutData {
        /**
         * The title on the left in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        firstTitle?: string;
        /**
         * The content on the left in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        firstContent?: string;
        /**
         * The title on the right in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        lastTitle?: string;
        /**
         * The content on the right in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        lastContent?: string;
        /**
         * Interval icon display in the middle of the FlightLayout
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        spaceIcon?: string | image.PixelMap;
        /**
         * Indicates whether to display the split line above the FlightLayout, The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isHorizontalLineDisplayed?: boolean;
        /**
         * Additional information in FlightLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        additionalText?: string;
    }
    /**
     * Define the score data instance when the layoutType is 7.
     *
     * @typedef ScoreLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ScoreLayout extends LayoutData {
        /**
         * The name on the left in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        hostName?: string;
        /**
         * The icon on the left in ScoreLayout.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        hostIcon?: string | image.PixelMap;
        /**
         * The score on the left in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        hostScore?: string;
        /**
         * The name on the right in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        guestName?: string;
        /**
         * The icon on the right in ScoreLayout.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        guestIcon?: string | image.PixelMap;
        /**
         * The score on the right in ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        guestScore?: string;
        /**
         * the score of Live activity, which is the description text at the top of the middle of the ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * the score of Live activity, which is the description text at the top of the middle of the ScoreLayout.
         *
         * @type { ?(string | Array<RichText>) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        competitionDesc?: string | Array<RichText>;
        /**
         * the score of Live activity, which is the competition time of the ScoreLayout.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        competitionTime?: string;
        /**
         * Indicates whether to display the split line above the ScoreLayout, The default value is true.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        isHorizontalLineDisplayed?: boolean;
    }
    /**
     * Define the navigation data instance when the layoutType is 8.
     *
     * @typedef NavigationLayout
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export interface NavigationLayout extends LayoutData {
        /**
         * Icons for all navigation directions.
         *
         * @type { ?Array<string|image.PixelMap> }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        navigationIcons?: Array<string | image.PixelMap>;
        /**
         * Cunrrent Navigation icon.
         *
         * @type { ?(string | image.PixelMap) }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        currentNavigationIcon?: string | image.PixelMap;
    }
    /**
     * Define a richText instance to display different text color.
     *
     * @typedef RichText
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface RichText {
        /**
         * text.
         *
         * @type { string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        text: string;
        /**
         * text color, the value is in the hexadecimal format of #ARGB.
         *
         * @type { ?string }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        textColor?: string;
    }
    /**
     * Display type of extension data. Default value is 0;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum ExtensionType {
        /**
         * default display type.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_DEFAULT = 0,
        /**
         * display type is common text.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_COMMON_TEXT = 1,
        /**
         * display type is capsule text.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_CAPSULE_TEXT = 2,
        /**
         * display type is the picture.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_PIC = 3,
        /**
         * display type is the icon of app.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        EXTENSION_TYPE_ICON = 4
    }
    /**
     * Display type of indicator. Default value is 0;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum IndicatorType {
        /**
         * The indicator icon is not displayed.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INDICATOR_TYPE_UNDISPLAYED = 0,
        /**
         * displayed above the progress line.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INDICATOR_TYPE_UP = 1,
        /**
         * indicates that the display is overwritten on the progress line.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INDICATOR_TYPE_OVERLAY = 2
    }
    /**
     * Display type of the progress bar in the layout. Default value is 0;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum LineType {
        /**
         * dotted lines progress.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LINE_TYPE_DOTTED_LINE = 0,
        /**
         * displayed above the progress line.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LINE_TYPE_NORMAL_SOLID_LINE = 1,
        /**
         * indicates that the display is overwritten on the progress line.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        LINE_TYPE_THICK_SOLID_LINE = 2
    }
    /**
     * Display type of capsule.
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum CapsuleType {
        /**
         * Text capsule.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        CAPSULE_TYPE_TEXT = 1,
        /**
         * Timer capsule.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        CAPSULE_TYPE_TIMER = 2,
        /**
         * progress capsule.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        CAPSULE_TYPE_PROGRESS = 3
    }
    /**
     * Indicates the return result of the data to operate liveView.
     *
     * @typedef LiveViewResult
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface LiveViewResult {
        /**
         * Indicates the result code returned after to start, update or end liveView.
         *
         * @type { number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        resultCode: number;
        /**
         * Indicates the message returned after to start, update or end liveView.
         *
         * @type { String }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        message: String;
    }
    /**
     * Define a timer instance to be used in liveView.
     *
     * @typedef LiveViewTimer
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export interface LiveViewTimer {
        /**
         * the time of liveView timer.
         *
         * @type { ?number }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        time?: number;
        /**
         * Indicates whether the timer type is countdown，The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        isCountdown?: boolean;
        /**
         * Indicates whether the timer type pauses timing. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        isPaused?: boolean;
    }
    /**
     * Background type of the external screen. Default value is background color;
     *
     * @enum { number }
     * @syscap SystemCapability.LiveView.LiveViewService
     * @StageModelOnly
     * @since 5.0.0(12)
     */
    export enum ExternalType {
        /**
         * The background type is background color.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        BACKGROUND_COLOR = 0,
        /**
         * The background type is background picture.
         *
         * @syscap SystemCapability.LiveView.LiveViewService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        BACKGROUND_PICTURE = 1
    }
}
export default liveViewManager;
