/*
 * Copyright (c) 2021-2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
 * @file Information carried when a notification is sent
 * @kit NotificationKit
 */
import notification from '../@ohos.notification';
import image from '../@ohos.multimedia.image';
import type notificationManager from '../@ohos.notificationManager';
import { WantAgent } from '../@ohos.wantAgent';
import { NotificationContent } from './notificationContent';
import { NotificationActionButton } from './notificationActionButton';
import { NotificationTemplate } from './notificationTemplate';
import { NotificationFlags } from './notificationFlags';
/**
 * Defines a NotificationRequest instance.
 *
 * @typedef NotificationRequest
 * @syscap SystemCapability.Notification.Notification
 * @since 7
 */
/**
 * Defines a NotificationRequest instance.
 *
 * @typedef NotificationRequest
 * @syscap SystemCapability.Notification.Notification
 * @crossplatform
 * @since 12
 */
export interface NotificationRequest {
    /**
     * Notification content.
     *
     * @type { NotificationContent }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Notification content.
     *
     * @type { NotificationContent }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    content: NotificationContent;
    /**
     * Notification ID.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Notification ID.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    id?: number;
    /**
     * Globally unique notification message ID defined by application.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.Notification
     * @since 12
     */
    appMessageId?: string;
    /**
     * Notification slot type.
     *
     * @type { ?notification.SlotType }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 11
     * @useinstead NotificationRequest#notificationSlotType
     */
    slotType?: notification.SlotType;
    /**
     * Notification slot type.
     *
     * @type { ?notificationManager.SlotType }
     * @syscap SystemCapability.Notification.Notification
     * @since 11
     */
    notificationSlotType?: notificationManager.SlotType;
    /**
     * Whether the notification is an ongoing notification.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Whether the notification is an ongoing notification.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    isOngoing?: boolean;
    /**
     * Whether the notification can be removed.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    isUnremovable?: boolean;
    /**
     * Time when the notification is sent.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Time when the notification is sent.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    deliveryTime?: number;
    /**
     * Whether the notification is automatically cleared.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Whether the notification is automatically cleared.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    tapDismissed?: boolean;
    /**
     * Time when the notification is automatically cleared.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Time when the notification is automatically cleared.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    autoDeletedTime?: number;
    /**
     * WantAgent instance to which the notification will be redirected after being clicked.
     *
     * @type { ?WantAgent }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    wantAgent?: WantAgent;
    /**
     * Extended parameter.
     *
     * @type { ?object }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    extraInfo?: {
        [key: string]: any;
    };
    /**
     * Background color of the notification.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    color?: number;
    /**
     * Whether the notification background color can be enabled.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    colorEnabled?: boolean;
    /**
     * Whether the notification triggers an alert only once.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Whether the notification triggers an alert only once.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    isAlertOnce?: boolean;
    /**
     * Whether to display the stopwatch.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    isStopwatch?: boolean;
    /**
     * Whether to display the countdown time.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    isCountDown?: boolean;
    /**
     * Whether the notification is displayed as a floating icon.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    isFloatingIcon?: boolean;
    /**
     * Notification label.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    label?: string;
    /**
     * Notification badge type.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    badgeIconStyle?: number;
    /**
     * Whether to display the time when the notification is delivered.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    /**
     * Whether to display the time when the notification is delivered.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    showDeliveryTime?: boolean;
    /**
     * Buttons in the notification. Up to two buttons are allowed.
     *
     * @type { ?Array<NotificationActionButton> }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    actionButtons?: Array<NotificationActionButton>;
    /**
     * Small notification icon.
     *
     * @type { ?image.PixelMap }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    smallIcon?: image.PixelMap;
    /**
     * Large notification icon.
     *
     * @type { ?image.PixelMap }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    largeIcon?: image.PixelMap;
    /**
     * The group information for this notification.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    /**
     * The group information for this notification.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    groupName?: string;
    /**
     * Read-only name of the package for which a notification is created.
     *
     * @type { ?string }
     * @readonly
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    readonly creatorBundleName?: string;
    /**
     * Read-only UID of the notification creator.
     *
     * @type { ?number }
     * @readonly
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    readonly creatorUid?: number;
    /**
     * Read-only PID of the notification creator.
     *
     * @type { ?number }
     * @readonly
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    readonly creatorPid?: number;
    /**
     * Read-only UserId of the notification creator.
     *
     * @type { ?number }
     * @readonly
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    readonly creatorUserId?: number;
    /**
     * Obtain the prompt tone resource path of the notification.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.Notification
     * @since 12
     */
    sound?: string;
    /**
     * Obtains the unique hash code of a notification in the current application.
     *
     * @type { ?string }
     * @readonly
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    readonly hashCode?: string;
    /**
     * Obtains the template of this notification.
     *
     * @type { ?NotificationTemplate }
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    template?: NotificationTemplate;
    /**
     * The options to distributed notification.
     *
     * @type { ?DistributedOptions }
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    distributedOption?: DistributedOptions;
    /**
     * Obtains the set of identifiers for the notification.
     *
     * @type { ?NotificationFlags }
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    readonly notificationFlags?: NotificationFlags;
    /**
     * WantAgent instance to which the notification will be redirected when removing notification.
     *
     * @type { ?WantAgent }
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    removalWantAgent?: WantAgent;
    /**
     * Number of notifications displayed on the app icon.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    /**
     * Number of notifications displayed on the app icon.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @crossplatform
     * @since 12
     */
    badgeNumber?: number;
}
/**
 * Describes distributed options.
 *
 * @typedef DistributedOptions
 * @syscap SystemCapability.Notification.Notification
 * @since 8
 */
export interface DistributedOptions {
    /**
     * Obtains whether is the distributed notification.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    isDistributed?: boolean;
    /**
     * Obtains the types of devices to which the notification can be synchronized.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    supportDisplayDevices?: Array<string>;
    /**
     * Obtains the devices on which notifications can be open.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    supportOperateDevices?: Array<string>;
}
