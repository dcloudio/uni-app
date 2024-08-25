/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved.
 */
/**
 * @file This module is used for AI component textReader
 * @kit SpeechKit
 * @bundle com.huawei.hmsapp.hiai.hsp/textReaderHsp/Index 5.0.0(12)
 * */
import image from '@ohos.multimedia.image';
import common from '@ohos.app.ability.common';
import window from '@ohos.window';
/**
 * This module provides text-to-speech reader component
 * The application module is developed through the system-level hsp.
 *
 * @namespace TextReader
 * @syscap SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
declare namespace TextReader {
    /**
     * Initialize textReader including player and model initialization.
     *
     * @param { common.BaseContext } context - Indicates the application context.
     * @param { ReaderParam } - readParams, Indicates the params for text reader.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not
     * have permission "ohos.permission.KEEP_BACKGROUND_RUNNING".
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600011 - Initialize failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function init(context: common.BaseContext, readParams: ReaderParam): Promise<void>;
    /**
     * release the resources of textReader.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function release(): Promise<void>;
    /**
     * Pull up the textReader player panel and start playing audio streams from the indicated article Id.
     * @param { ReadInfo[] } readInfoList - Indicates the list of readInfo data.
     * @param { ?string } articleId - Indicates the article id.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - Text-to-speech engine error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AVSession error.
     * @throws { BusinessError } 1010600017 - Other error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function start(readInfoList: ReadInfo[], articleId?: string): Promise<void>;
    /**
     * Close the textReader player panel and stop playing audio streams.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function stop(): Promise<void>;
    /**
     * Pause audio stream playback.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function pause(): void;
    /**
     * Resume audio stream playback.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600013 - TTS speak error.
     * @throws { BusinessError } 1010600014 - AudioRenderer play error.
     * @throws { BusinessError } 1010600015 - Audio decode error.
     * @throws { BusinessError } 1010600016 - AvSession error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function resume(): void;
    /**
     * Play previous article.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600017 - playPrev failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function playPrev(): void;
    /**
     * Play next article.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @throws { BusinessError } 1010600018 - playNext failed.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function playNext(): void;
    /**
     * Hide the textReader player panel.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function hidePanel(): void;
    /**
     * Show the textReader player panel.
     * @throws { BusinessError } 1010600012 - The TextReader is not initialized.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function showPanel(): void;
    /**
     * Query the reading state of the indicated article id.
     * @param { ?string } id - Indicates the article id.
     * @returns { ReadState } - ReadState is returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function queryReadState(id?: string): ReadState;
    /**
     * Set the content of the indicated article id.
     * @param { string } id - Indicates the article id.
     * @param { ?string } content - Indicates the article content.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function setArticleContent(id: string, content?: string): void;
    /**
     * Set the article of the indicated article id.
     * @param { ReadInfo } readInfo - The article info include image and content.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function setArticle(readInfo: ReadInfo): void;
    /**
     * Load more articles and set them to the playlist
     * @param { ReadInfo[] } readInfos - Indicates the list of articles to be loaded.
     * @param { boolean } isEnd - Indicates if no more content needed to be loaded.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function loadMore(readInfos: ReadInfo[], isEnd: boolean): void;
    /**
     * Register player action callback
     * @param { 'setArticle' } type - Registration Type, 'setArticle'
     * @param { Callback<string> } callback - Callback is invoked when the setArticle event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'setArticle', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'setArticle' } type - Registration Type, 'setArticle'
     * @param { Callback<string> } [callback] - Callback is invoked when the setArticle event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'setArticle', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'clickArticle' } type - Registration Type, 'clickArticle'
     * @param { Callback<string> } callback - Callback is invoked when the clickArticle event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'clickArticle', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'clickArticle' } type - Registration Type, 'clickArticle'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickArticle event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'clickArticle', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'clickAuthor' } type - Registration Type, 'clickAuthor'
     * @param { Callback<string> } callback - Callback is invoked when the clickAuthor event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'clickAuthor', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'clickAuthor' } type - Registration Type, 'clickAuthor'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickAuthor event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'clickAuthor', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'clickNotification' } type - Registration Type, 'clickNotification'
     * @param { Callback<string> } callback - Callback is invoked when the clickNotification event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'clickNotification', callback: Callback<string>): void;
    /**
     * Unregister reader action callback
     * @param { 'clickNotification' } type - Registration Type, 'clickNotification'
     * @param { Callback<string> } [callback] - Callback is invoked when the clickNotification event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'clickNotification', callback?: Callback<string>): void;
    /**
     * Register reader action callback
     * @param { 'showPanel' } type - Registration Type, 'showPanel'
     * @param { Callback<void> } callback - Callback is invoked when the showPanel event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'showPanel', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'showPanel' } type - Registration Type, 'showPanel'
     * @param { Callback<void> } [callback] - Callback is invoked when the showPanel event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'showPanel', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'hidePanel' } type - Registration Type, 'hidePanel'
     * @param { Callback<void> } callback - Callback is invoked when the hidePanel event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'hidePanel', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'hidePanel' } type - Registration Type, 'hidePanel'
     * @param { Callback<void> } [callback] - Callback is invoked when the hidePanel event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'hidePanel', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'stop' } type - Registration Type, 'stop'
     * @param { Callback<void> } callback - Callback is invoked when the stop event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'stop', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'stop' } type - Registration Type, 'stop'
     * @param { Callback<void> } [callback] - Callback is invoked when the stop event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'stop', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'release' } type - Registration Type, 'release'
     * @param { Callback<void> } callback - Callback is invoked when the release event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'release', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'release' } type - Registration Type, 'release'
     * @param { Callback<void> } [callback] - Callback is invoked when the release event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'release', callback?: Callback<void>): void;
    /**
     * Register reader action callback
     * @param { 'stateChange' } type - Registration Type, 'stateChange'
     * @param { Callback<ReadState> } callback - Callback is invoked when the stateChange event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'stateChange', callback: Callback<ReadState>): void;
    /**
     * Unregister reader action callback
     * @param { 'stateChange' } type - Registration Type, 'stateChange'
     * @param { Callback<ReadState> } [callback] - Callback is invoked when the stateChange event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'stateChange', callback?: Callback<ReadState>): void;
    /**
     * Register reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<void> } callback - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'requestMore', callback: Callback<void>): void;
    /**
     * Unregister reader action callback
     * @param { 'requestMore' } type - Registration Type, 'requestMore'
     * @param { Callback<void> } [callback] - Callback is invoked when the requestMore event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'requestMore', callback?: Callback<void>): void;
    /**
     * Register reader event callback
     * @param { 'eventNotification' } type - Registration Type, 'eventNotification'
     * @param { Callback<NotificationEvent> } callback - Callback is invoked when the eventNotification event
     * is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'eventNotification', callback: Callback<NotificationEvent>): void;
    /**
     * Unregister reader event callback
     * @param { 'eventNotification' } type - Registration Type, 'eventNotification'
     * @param { Callback<NotificationEvent> } [callback] - Callback is invoked when the eventNotification event
     * is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'eventNotification', callback?: Callback<NotificationEvent>): void;
    /**
     * Register reader event callback
     * @param { 'eventPanel' } type - Registration Type, 'eventPanel'
     * @param { Callback<PanelEvent> } callback - Callback is invoked when the eventPanel event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'eventPanel', callback: Callback<PanelEvent>): void;
    /**
     * Unregister reader event callback
     * @param { 'eventPanel' } type - Registration Type, 'eventPanel'
     * @param { Callback<PanelEvent> } [callback] - Callback is invoked when the eventPanel event is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'eventPanel', callback?: Callback<PanelEvent>): void;
    /**
     * Register reader event callback
     * @param { 'eventReadList' } type - Registration Type, 'eventReadList'
     * @param { Callback<Array<ListEventState>> } callback - Callback is invoked when the eventReadList event
     * is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function on(type: 'eventReadList', callback: Callback<Array<ListEventState>>): void;
    /**
     * Unregister reader event callback
     * @param { 'eventReadList' } type - Registration Type, 'eventReadList'
     * @param { Callback<Array<ListEventState>> } [callback] - Callback is invoked when the eventReadList event
     * is triggered.
     * @throws { BusinessError } 401 - parameter check failed
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    function off(type: 'eventReadList', callback?: Callback<Array<ListEventState>>): void;
    /**
     * The business brand information.
     *
     * @interface BusinessBrandInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface BusinessBrandInfo {
        /**
         * Brand name displayed on the panel
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        panelName?: string;
        /**
         * Icon displayed on the panel
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        panelIcon?: ResourceStr;
        /**
         * Icon displayed on the the notification bar
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        notificationIcon?: ResourceStr;
        /**
         * Brand name displayed on the notification bar
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        notificationName?: string;
    }
    /**
     * Reader parameters for initialzation.
     *
     * @interface ReaderParam
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface ReaderParam {
        /**
         * Display brand name, default to no
         * @type { boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        isVoiceBrandVisible: boolean;
        /**
         * Business branch information
         * @type { ?BusinessBrandInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        businessBrandInfo?: BusinessBrandInfo;
        /**
         * Whether to set the fast forward/backward function to fast forward/backward for 15 seconds,
         * default to no, that is, fast forward/backward the previous and next sentences
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        isFastForward?: boolean;
        /**
         * Whether to use the feature of keeping back ground running.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        keepBackgroundRunning?: boolean;
        /**
         * Whether to support online audio stream synthesis, default to no
         * mode: 0, online audio stream synthesis
         * mode: 1, offline audio stream synthesis
         * @type { ?number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        online?: number;
    }
    /**
     * Text information structure, representing the attributes of text content and click ability.
     *
     * @interface TextInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface TextInfo {
        /**
         * Text content
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        text: string;
        /**
         * The click ability of the text content
         * @type { boolean }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        isClickable: boolean;
    }
    /**
     * The content information to be read aloud
     *
     * @interface ReadInfo
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface ReadInfo {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        id: string;
        /**
         * Title of the article
         * @type { TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        title: TextInfo;
        /**
         * Author of the article
         * @type { ?TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        author?: TextInfo;
        /**
         * Date of the article
         * @type { ?TextInfo }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        date?: TextInfo;
        /**
         * Cover image of the article
         * Format：PixelMap
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        image?: image.PixelMap;
        /**
         * Body information of the article
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        bodyInfo?: string;
        /**
         * Category of the article
         * @type { ?string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        category?: string;
    }
    /**
     * Notification business events
     *
     * @interface NotificationEvent
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface NotificationEvent {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        id: string;
        /**
         * Type of the notification business events
         * 1: Notification，
         * 2: Broadcasting center
         * @type { number }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        type: number;
        /**
         * Notification bar or broadcast control center click event code
         * NBC_01：Play button click
         * NBC_02：Pause button click
         * NBC_03：Close button click
         * NBC_04：Prev button click
         * NBC_05：Next button click
         * NBC_06：Article cover click
         * NBC_07：Article title click
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        click: string;
    }
    /**
     * Play panel events.
     *
     * @interface PanelEvent
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface PanelEvent {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        id: string;
        /**
         * Panel click event code
         * BPC_01：Panel-Play button click
         * BPC_02：Panel-Pause button click
         * BPC_03：Panel-Play prev button click
         * BPC_04：Panel-Play next button click
         * BPC_05：Panel-Play speed button click
         * BPC_06：Panel-Person button click
         * BPC_07：Panel-Article list button click
         * BPC_08：Panel-Title click
         * BPC_09：Panel-Author click
         * BPC_10：Panel-close panel active (close button click of close slide)
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        click: string;
    }
    /**
     * Play list event.
     *
     * @interface ListEventState
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface ListEventState {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        id: string;
    }
    /**
     * Reading state.
     *
     * @interface ReadState
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    interface ReadState {
        /**
         * ID of the article
         * @type { string }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        id: string;
        /**
         * State code of indicated article
         * @type { ReadStateCode }
         * @syscap SystemCapability.AI.Component.TextReader
         * @since 5.0.0(12)
         */
        state: ReadStateCode;
    }
}
export default TextReader;
/**
 * Reading State Enumeration.
 *
 * @enum { number }
 * @syscap  SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
export enum ReadStateCode {
    /**
     * Playing state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    PLAYING = 1,
    /**
     * Pause state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    PAUSED = 2,
    /**
     * Play completed state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    COMPLETED = 3,
    /**
     * Not play yet / stop state.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    WAITING = 4,
    /**
     * Not in read list.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    NOT_IN_READ_LIST = 5
}
/**
 * Window manager used for setting window stage.
 *
 * @class WindowManager
 * @syscap SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
export class WindowManager {
    /**
     * Set the window stage to window manager
     * @param { window.WindowStage } windowStage - Indicates the window stage of the ability.
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    public static setWindowStage(windowStage: window.WindowStage): void;
    /**
     * Get the window stage from window manager
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    public static getWindowStage(): window.WindowStage;
}
/**
 * Component of text reader icon.
 *
 * @Component TextReaderIcon
 * @syscap SystemCapability.AI.Component.TextReader
 * @since 5.0.0(12)
 */
@Component
export struct TextReaderIcon {
    /**
     * @type { ReadStateCode }
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    @Link
    readState: ReadStateCode;
    /**
     * @syscap SystemCapability.AI.Component.TextReader
     * @since 5.0.0(12)
     */
    build(): void;
}
