/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023. All rights reserved.
 */
/**
 * @file Defines common data object of push.
 * @kit PushKit
 */
import type image from '@ohos.multimedia.image';
/**
 * Common data object of push.
 * @namespace pushCommon
 * @syscap SystemCapability.Push.PushService
 * @StageModelOnly
 * @since 4.0.0(10)
 */
declare namespace pushCommon {
    /**
     * class of push payload.
     * @typedef PushPayload
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    export interface PushPayload {
        /**
         * The type of push payload.
         * @type { string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.0.0(10)
         */
        type: string;
        /**
         * The data of push payload.
         * @type { string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.0.0(10)
         */
        data: string;
    }
    /**
     * The profile type of application.
     * @enum { number }
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.0.0(10)
     */
    export enum AppProfileType {
        /**
         * Profile type of os distributed account.
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.0.0(10)
         */
        PROFILE_TYPE_OS_DISTRIBUTED_ACCOUNT = 1,
        /**
         * Profile type of application account.
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.0.0(10)
         */
        PROFILE_TYPE_APPLICATION_ACCOUNT = 2
    }
    /**
     * Class of remote notification information.
     *
     * @typedef RemoteNotificationInfo
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface RemoteNotificationInfo extends PushPayload {
        /**
         * Notification ID.
         * @type { number }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        id: number;
    }
    /**
     * Class of remote notification content.
     *
     * @typedef RemoteNotificationContent
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface RemoteNotificationContent {
        /**
         * Title of remote notification.
         *
         * @type { string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Title of remote notification.
         *
         * @type { ?string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        title?: string;
        /**
         * Content of remote notification.
         *
         * @type { string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        /**
         * Content of remote notification.
         *
         * @type { ?string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        text?: string;
        /**
         * Overlay icon of remote notification.
         *
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        overlayIcon?: image.PixelMap;
        /**
         * Number of remote notifications displayed on the app icon.
         *
         * @type { ?number }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        badgeNumber?: number;
        /**
         * Number of remote notifications displayed on the app icon.
         *
         * @type { ?number }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 5.0.0(12)
         */
        setBadgeNumber?: number;
        /**
         * Data that can be replaced when the notification is clicked.
         *
         * @type { ?RemoteWantAgent }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        wantAgent?: RemoteWantAgent;
    }
    /**
     * Class of voip information.
     *
     * @typedef VoIPInfo
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface VoIPInfo extends PushPayload {
        /**
         * VoIP call ID.
         * @type { string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        callId: string;
    }
    /**
     * Class of remote want agent.
     *
     * @typedef RemoteWantAgent
     * @syscap SystemCapability.Push.PushService
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface RemoteWantAgent {
        /**
         * Ability Name of RemoteWantAgent.
         *
         * @type { string }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        abilityName: string;
        /**
         * The parameters of RemoteWantAgent.
         *
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.Push.PushService
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        parameters?: Record<string, Object>;
    }
}
export default pushCommon;
