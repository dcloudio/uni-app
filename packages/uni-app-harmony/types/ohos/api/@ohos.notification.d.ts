/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
import { AsyncCallback } from './@ohos.base';
import { NotificationRequest } from './notification/notificationRequest';
import { NotificationSlot } from './notification/notificationSlot';
/**
 * Manages notifications.
 * <p>Generally, only system applications have permissions on notification subscription and unsubscribe.
 * You can specify the content of a notification to be published and the content is carried by
 * {@link NotificationRequest}. A notification ID is unique in an application and must be specified
 * when using {@link NotificationRequest} to carry the notification content. If a notification
 * with this ID has been published and you need to use this ID to publish another notification,
 * the original notification will be updated. In addition, the notification ID can be used to cancel
 * a notification by calling the {@link #cancel(int)} method.
 *
 * @namespace notification
 * @syscap SystemCapability.Notification.Notification
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.notificationManager/notificationManager and ohos.notificationSubscribe/notificationSubscribe
 */
declare namespace notification {
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @param { AsyncCallback<void> } callback - callback function
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#publish
     */
    function publish(request: NotificationRequest, callback: AsyncCallback<void>): void;
    /**
     * Publishes a notification.
     * <p>If a notification with the same ID has been published by the current application and has not been deleted,
     * this method will update the notification.
     *
     * @param { NotificationRequest } request - notification request
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#publish
     */
    function publish(request: NotificationRequest): Promise<void>;
    /**
     * Cancel a notification with the specified ID.
     *
     * @param { number } id - of the notification to cancel, which must be unique in the application.
     * @param { AsyncCallback<void> } callback - callback function
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#cancel
     */
    function cancel(id: number, callback: AsyncCallback<void>): void;
    /**
     * Cancel a notification with the specified label and ID.
     *
     * @param { number } id - ID of the notification to cancel, which must be unique in the application.
     * @param { string } label - Label of the notification to cancel.
     * @param { AsyncCallback<void> } callback - callback function
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#cancel
     */
    function cancel(id: number, label: string, callback: AsyncCallback<void>): void;
    /**
     * Cancel a notification with the specified label and ID.
     *
     * @param { number } id - ID of the notification to cancel, which must be unique in the application.
     * @param { string } [label] - Label of the notification to cancel.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#cancel
     */
    function cancel(id: number, label?: string): Promise<void>;
    /**
     * Cancels all notifications of the current application.
     *
     * @param { AsyncCallback<void> } callback - The specified callback method.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#cancelAll
     */
    function cancelAll(callback: AsyncCallback<void>): void;
    /**
     * Cancels all notifications of the current application.
     *
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#cancelAll
     */
    function cancelAll(): Promise<void>;
    /**
     * Adds a slot type.
     *
     * @param { SlotType } type - Slot type to add.
     * @param { AsyncCallback<void> } callback - callback function
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#addSlot
     */
    function addSlot(type: SlotType, callback: AsyncCallback<void>): void;
    /**
     * Adds a slot type.
     *
     * @param { SlotType } type - Slot type to add.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#addSlot
     */
    function addSlot(type: SlotType): Promise<void>;
    /**
     * Obtains a notification slot of the specified slot type.
     *
     * @param { SlotType } slotType - Type of the notification slot to obtain.
     * @param { AsyncCallback<NotificationSlot> } callback - callback function
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getSlot
     */
    function getSlot(slotType: SlotType, callback: AsyncCallback<NotificationSlot>): void;
    /**
     * Obtains a notification slot of the specified slot type.
     *
     * @param { SlotType } slotType - Type of the notification slot to obtain.
     * @returns { Promise<NotificationSlot> } Returns the created {@link NotificationSlot}.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getSlot
     */
    function getSlot(slotType: SlotType): Promise<NotificationSlot>;
    /**
     * Obtains all NotificationSlot objects created by the current application.
     *
     * @param { AsyncCallback<Array<NotificationSlot>> } callback - Returns the result of obtaining all notification
     *                                                              channels for this application in the form of callback.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getSlots
     */
    function getSlots(callback: AsyncCallback<Array<NotificationSlot>>): void;
    /**
     * Obtains all NotificationSlot objects created by the current application.
     *
     * @returns { Promise<Array<NotificationSlot>> } Returns all notification slots of this application.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getSlots
     */
    function getSlots(): Promise<Array<NotificationSlot>>;
    /**
     * Removes a NotificationSlot of the specified SlotType created by the current application.
     *
     * @param { SlotType } slotType - Type of the NotificationSlot to remove.
     * @param { AsyncCallback<void> } callback - callback function
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#removeSlot
     */
    function removeSlot(slotType: SlotType, callback: AsyncCallback<void>): void;
    /**
     * Removes a NotificationSlot of the specified SlotType created by the current application.
     *
     * @param { SlotType } slotType - The types of notification channels are currently divided into social communication,
     *                              service reminders, content consulting, and other types
     * @returns { Promise<void> } Returns all notification slots of this application.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#removeSlot
     */
    function removeSlot(slotType: SlotType): Promise<void>;
    /**
     * Removes all NotificationSlot objects created by the current application.
     *
     * @param { AsyncCallback<void> } callback - Represents the specified callback method.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#removeAllSlots
     */
    function removeAllSlots(callback: AsyncCallback<void>): void;
    /**
     * Removes all NotificationSlot objects created by the current application.
     *
     * @returns { Promise<void> } Returns all notification slots of this application.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#removeAllSlots
     */
    function removeAllSlots(): Promise<void>;
    /**
     * Describes NotificationSlot types.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#SlotType
     */
    export enum SlotType {
        /**
         * NotificationSlot of an unknown type.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotType#UNKNOWN_TYPE
         */
        UNKNOWN_TYPE = 0,
        /**
         * NotificationSlot for social communication.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotType#SOCIAL_COMMUNICATION
         */
        SOCIAL_COMMUNICATION = 1,
        /**
         * NotificationSlot for service information.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotType#SERVICE_INFORMATION
         */
        SERVICE_INFORMATION = 2,
        /**
         * NotificationSlot for content information.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotType#CONTENT_INFORMATION
         */
        CONTENT_INFORMATION = 3,
        /**
         * NotificationSlot for other purposes.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotType#OTHER_TYPES
         */
        OTHER_TYPES = 0xFFFF
    }
    /**
     * Describes notification content types.
     *
     * @enum { string }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager.SlotType#ContentType
     */
    export enum ContentType {
        /**
         * Normal text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.ContentType#NOTIFICATION_CONTENT_BASIC_TEXT
         */
        NOTIFICATION_CONTENT_BASIC_TEXT,
        /**
         * Long text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.ContentType#NOTIFICATION_CONTENT_LONG_TEXT
         */
        NOTIFICATION_CONTENT_LONG_TEXT,
        /**
         * Picture-attached notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.ContentType#NOTIFICATION_CONTENT_PICTURE
         */
        NOTIFICATION_CONTENT_PICTURE,
        /**
         * Conversation notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.ContentType#NOTIFICATION_CONTENT_CONVERSATION
         */
        NOTIFICATION_CONTENT_CONVERSATION,
        /**
         * Multi-line text notification.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.ContentType#NOTIFICATION_CONTENT_MULTILINE
         */
        NOTIFICATION_CONTENT_MULTILINE
    }
    /**
     * Indicates the level of the slot
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#SlotLevel
     */
    export enum SlotLevel {
        /**
         * Indicates that the notification function is disabled.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotLevel#LEVEL_NONE
         */
        LEVEL_NONE = 0,
        /**
         * Indicates that the notification function is enabled but notification
         * icons are not displayed in the status bar, with no banner or prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotLevel#LEVEL_MIN
         */
        LEVEL_MIN = 1,
        /**
         * Indicates that the notification function is enabled and notification
         * icons are displayed in the status bar, with no banner or prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotLevel#LEVEL_LOW
         */
        LEVEL_LOW = 2,
        /**
         * Indicates that the notification function is enabled and notification
         * icons are displayed in the status bar, with no banner but with a prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotLevel#LEVEL_DEFAULT
         */
        LEVEL_DEFAULT = 3,
        /**
         * Indicates that the notification function is enabled and notification
         * icons are displayed in the status bar, with a banner and a prompt tone.
         *
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager.SlotLevel#LEVEL_HIGH
         */
        LEVEL_HIGH = 4
    }
    /**
     * Obtains the number of all active notifications.
     *
     * @param { AsyncCallback<number> } callback - Callback function to obtain the number of undelete notifications.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getActiveNotificationCount
     */
    function getActiveNotificationCount(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of all active notifications.
     *
     * @returns { Promise<number> } Returns the number of undelete notifications for the current application as promise.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getActiveNotificationCount
     */
    function getActiveNotificationCount(): Promise<number>;
    /**
     * Obtains an array of active notifications.
     *
     * @param { AsyncCallback<Array<NotificationRequest>> } callback - Retrieve the callback function for the current
     *                                                                 application notification list.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getActiveNotifications
     */
    function getActiveNotifications(callback: AsyncCallback<Array<NotificationRequest>>): void;
    /**
     * Obtains an array of active notifications.
     *
     * @returns { Promise<Array<NotificationRequest>> } Return to obtain the current application in the form of Promise.
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#getActiveNotifications
     */
    function getActiveNotifications(): Promise<Array<NotificationRequest>>;
    /**
     * Cancel the notification of a specified group for this application.
     *
     * @param { string } groupName - Notification group name, which needs to be specified through the NotificationRequest
     *                               object when publishing notifications.
     * @param { AsyncCallback<void> } callback - Cancel the callback function for notifications under the specified group
     * of this application.
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#cancelGroup
     */
    function cancelGroup(groupName: string, callback: AsyncCallback<void>): void;
    /**
     * Cancel the notification of a specified group for this application.
     *
     * @param { string } groupName - Notification group name.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#cancelGroup
     */
    function cancelGroup(groupName: string): Promise<void>;
    /**
     * Obtains whether the template is supported by the system.
     *
     * @param { string } templateName - Name of template to be Obtained
     * @param { AsyncCallback<boolean> } callback - callback function
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#isSupportTemplate
     */
    function isSupportTemplate(templateName: string, callback: AsyncCallback<boolean>): void;
    /**
     * Obtains whether the template is supported by the system.
     *
     * @param { string } templateName - Name of template to be Obtained
     * @returns { Promise<boolean> } The Promise method returns the result of whether the template exists.
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#isSupportTemplate
     */
    function isSupportTemplate(templateName: string): Promise<boolean>;
    /**
     * Request permission to send notification.
     *
     * @param { AsyncCallback<void> } callback - Application Request Notification Enable Callback Function.
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#requestEnableNotification
     */
    function requestEnableNotification(callback: AsyncCallback<void>): void;
    /**
     * Request permission to send notification.
     *
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#requestEnableNotification
     */
    function requestEnableNotification(): Promise<void>;
    /**
     * Obtains whether the device supports distributed notification.
     *
     * @param { AsyncCallback<boolean> } callback - Set whether the device supports callback functions for distributed
     *                                              notifications.
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#isDistributedEnabled
     */
    function isDistributedEnabled(callback: AsyncCallback<boolean>): void;
    /**
     * Obtains whether the device supports distributed notification.
     *
     * @returns { Promise<boolean> } Returns the result of obtaining whether distributed notifications are supported in
     *                               the form of Promise.
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#isDistributedEnabled
     */
    function isDistributedEnabled(): Promise<boolean>;
    /**
     * Describes a BundleOption.
     *
     * @typedef BundleOption
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#BundleOption
     */
    export interface BundleOption {
        /**
         * bundle name.
         *
         * @type { string }
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager#BundleOption
         */
        bundle: string;
        /**
         * user id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager#BundleOption
         */
        uid?: number;
    }
    /**
     * Describes a NotificationKey, which can be used to identify a notification.
     *
     * @typedef NotificationKey
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.notificationManager/notificationManager#NotificationKey
     */
    export interface NotificationKey {
        /**
         * Notify ID.
         *
         * @type { number }
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager#NotificationKey
         */
        id: number;
        /**
         * Notification label.
         *
         * @type { ?string }
         * @syscap SystemCapability.Notification.Notification
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.notificationManager/notificationManager#NotificationKey
         */
        label?: string;
    }
}
export default notification;
