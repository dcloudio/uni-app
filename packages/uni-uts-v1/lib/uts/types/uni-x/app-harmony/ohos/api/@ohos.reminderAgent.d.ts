/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * @file
 * @kit BackgroundTasksKit
 */
import { AsyncCallback } from './@ohos.base';
import notification from './@ohos.notification';
import { NotificationSlot } from './notification/notificationSlot';
/**
 * Providers static methods for managing reminders, including publishing or canceling a reminder.
 * adding or removing a notification slot, and obtaining or cancelling all reminders of the current application.
 *
 * @namespace reminderAgent
 * @syscap SystemCapability.Notification.ReminderAgent
 * @since 7
 * @deprecated since 9
 * @useinstead reminderAgentManager
 */
declare namespace reminderAgent {
    /**
     * Publishes a scheduled reminder.
     *
     * @permission ohos.permission.PUBLISH_AGENT_REMINDER
     * @param { ReminderRequest } reminderReq Indicates the reminder instance to publish.
     * @param { AsyncCallback<number> } callback Indicates the callback function.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.publishReminder
     */
    function publishReminder(reminderReq: ReminderRequest, callback: AsyncCallback<number>): void;
    /**
     * Publishes a scheduled reminder.
     *
     * @permission ohos.permission.PUBLISH_AGENT_REMINDER
     * @param { ReminderRequest } reminderReq Indicates the reminder instance to publish.
     * @returns { Promise<number> } reminder id.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.publishReminder
     */
    function publishReminder(reminderReq: ReminderRequest): Promise<number>;
    /**
     * Cancels a reminder.
     *
     * @param { number } reminderId Indicates the reminder id.
     * @param { AsyncCallback<void> } callback Indicates the callback function.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.cancelReminder
     */
    function cancelReminder(reminderId: number, callback: AsyncCallback<void>): void;
    /**
     * Cancels a reminder.
     *
     * @param { number } reminderId Indicates the reminder id.
     * @returns { Promise<void> }
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.cancelReminder
     */
    function cancelReminder(reminderId: number): Promise<void>;
    /**
     * Obtains all the valid reminders of current application.
     *
     * @param { AsyncCallback<Array<ReminderRequest>> } callback Indicates the callback function.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.getValidReminders
     */
    function getValidReminders(callback: AsyncCallback<Array<ReminderRequest>>): void;
    /**
     * Obtains all the valid reminders of current application.
     *
     * @returns { Promise<Array<ReminderRequest>> } Reminder Common information.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.getValidReminders
     */
    function getValidReminders(): Promise<Array<ReminderRequest>>;
    /**
     * Cancels all the reminders of current application.
     *
     * @param { AsyncCallback<void> } callback Indicates the callback function.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.cancelAllReminders
     */
    function cancelAllReminders(callback: AsyncCallback<void>): void;
    /**
     * Cancels all the reminders of current application.
     *
     * @returns { Promise<void> }
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.cancelAllReminders
     */
    function cancelAllReminders(): Promise<void>;
    /**
     * Add notification slot.
     *
     * @param { NotificationSlot } slot Indicates the slot.
     * @param { AsyncCallback<void> } callback Indicates the callback function.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.addNotificationSlot
     */
    function addNotificationSlot(slot: NotificationSlot, callback: AsyncCallback<void>): void;
    /**
     * Add notification slot.
     *
     * @param { NotificationSlot } slot Indicates the slot.
     * @returns { Promise<void> }
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.addNotificationSlot
     */
    function addNotificationSlot(slot: NotificationSlot): Promise<void>;
    /**
     * Deletes a created notification slot based on the slot type.
     *
     * @param { notification.SlotType } slotType Indicates the type of the slot.
     * @param { AsyncCallback<void> } callback Indicates the callback function.
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.removeNotificationSlot
     */
    function removeNotificationSlot(slotType: notification.SlotType, callback: AsyncCallback<void>): void;
    /**
     * Deletes a created notification slot based on the slot type.
     *
     * @param { notification.SlotType } slotType Indicates the type of the slot.
     * @returns { Promise<void> }
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.removeNotificationSlot
     */
    function removeNotificationSlot(slotType: notification.SlotType): Promise<void>;
    /**
     * Declares action button type.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ActionButtonType
     */
    export enum ActionButtonType {
        /**
         * Button for closing the reminder.
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ActionButtonType.ACTION_BUTTON_TYPE_CLOSE
         */
        ACTION_BUTTON_TYPE_CLOSE = 0,
        /**
         * Button for snoozing the reminder.
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ActionButtonType.ACTION_BUTTON_TYPE_SNOOZE
         */
        ACTION_BUTTON_TYPE_SNOOZE = 1
    }
    /**
     * Declares reminder type.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ReminderType
     */
    export enum ReminderType {
        /**
         * Countdown reminder.
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderType.REMINDER_TYPE_TIMER
         */
        REMINDER_TYPE_TIMER = 0,
        /**
         * Calendar reminder.
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderType.REMINDER_TYPE_CALENDAR
         */
        REMINDER_TYPE_CALENDAR = 1,
        /**
         * Alarm reminder.
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM
         */
        REMINDER_TYPE_ALARM = 2
    }
    /**
     * Action button information. The button will show on displayed reminder.
     *
     * @interface ActionButton
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ActionButton
     */
    interface ActionButton {
        /**
         * Text on the button.
         * @type { string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ActionButton.title
         */
        title: string;
        /**
         * Button type.
         * @type { ActionButtonType }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ActionButton.type
         */
        type: ActionButtonType;
    }
    /**
     * Want agent information.
     * It will switch to target ability when you click the displayed reminder.
     *
     * @interface WantAgent
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.WantAgent
     */
    interface WantAgent {
        /**
         * Name of the package redirected to when the reminder notification is clicked.
         * @type { string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.WantAgent.pkgName
         */
        pkgName: string;
        /**
         * Name of the ability that is redirected to when the reminder notification is clicked.
         * @type { string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.WantAgent.abilityName
         */
        abilityName: string;
    }
    /**
     * Max screen want agent information.
     *
     * @interface MaxScreenWantAgent
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.MaxScreenWantAgent
     */
    interface MaxScreenWantAgent {
        /**
         * Name of the package that is automatically started when the reminder arrives and the device is not in use.
         * @type { string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.MaxScreenWantAgent.pkgName
         */
        pkgName: string;
        /**
         * Name of the ability that is automatically started when the reminder arrives and the device is not in use.
         * @type { string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.MaxScreenWantAgent.abilityName
         */
        abilityName: string;
    }
    /**
     * Reminder Common information.
     *
     * @interface ReminderRequest
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ReminderRequest
     */
    interface ReminderRequest {
        /**
         * Type of the reminder.
         * @type { ReminderType }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.reminderType
         */
        reminderType: ReminderType;
        /**
         * Action button displayed on the reminder notification.
         * (The parameter is optional. Up to two buttons are supported).
         * @type { ?[ActionButton?, ActionButton?] }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.actionButton
         */
        actionButton?: [
            ActionButton?,
            ActionButton?
        ];
        /**
         * Information about the ability that is redirected to when the notification is clicked.
         * @type { ?WantAgent }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.wantAgent
         */
        wantAgent?: WantAgent;
        /**
         * Information about the ability that is automatically started when the reminder arrives.
         * If the device is in use, a notification will be displayed.
         * @type { ?MaxScreenWantAgent }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.maxScreenWantAgent
         */
        maxScreenWantAgent?: MaxScreenWantAgent;
        /**
         * Ringing duration.
         * @type { ?number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.ringDuration
         */
        ringDuration?: number;
        /**
         * Number of reminder snooze times.
         * @type { ?number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.snoozeTimes
         */
        snoozeTimes?: number;
        /**
         * Reminder snooze interval.
         * @type { ?number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.timeInterval
         */
        timeInterval?: number;
        /**
         * Reminder title.
         * @type { ?string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.title
         */
        title?: string;
        /**
         * Reminder content.
         * @type { ?string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.content
         */
        content?: string;
        /**
         * Content to be displayed when the reminder is expired.
         * @type { ?string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.expiredContent
         */
        expiredContent?: string;
        /**
         * Content to be displayed when the reminder is snoozing.
         * @type { ?string }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.snoozeContent
         */
        snoozeContent?: string;
        /**
         * notification id. If there are reminders with the same ID, the later one will overwrite the earlier one.
         * @type { ?number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.notificationId
         */
        notificationId?: number;
        /**
         * Type of the slot used by the reminder.
         * @type { ?notification.SlotType }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequest.slotType
         */
        slotType?: notification.SlotType;
    }
    /**
     * @interface ReminderRequestCalendar
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ReminderRequestCalendar
     */
    interface ReminderRequestCalendar extends ReminderRequest {
        /**
         * Reminder time.
         * @type { LocalDateTime }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestCalendar.dateTime
         */
        dateTime: LocalDateTime;
        /**
         * Month in which the reminder repeats.
         * @type { ?Array<number> }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestCalendar.repeatMonths
         */
        repeatMonths?: Array<number>;
        /**
         * Date on which the reminder repeats.
         * @type { ?Array<number> }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestCalendar.repeatDays
         */
        repeatDays?: Array<number>;
    }
    /**
     * Alarm reminder information.
     *
     * @interface ReminderRequestAlarm
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ReminderRequestAlarm
     */
    interface ReminderRequestAlarm extends ReminderRequest {
        /**
         * Hour portion of the reminder time.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestAlarm.hour
         */
        hour: number;
        /**
         * minute portion of the remidner time.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestAlarm.minute
         */
        minute: number;
        /**
         * Days of a week when the reminder repeates.
         * @type { ?Array<number> }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestAlarm.daysOfWeek
         */
        daysOfWeek?: Array<number>;
    }
    /**
     * CountDown reminder information.
     *
     * @interface ReminderRequestTimer
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ReminderRequestTimer
     */
    interface ReminderRequestTimer extends ReminderRequest {
        /**
         * value of triggerTimeInSeconds.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestTimer.triggerTimeInSeconds
         */
        triggerTimeInSeconds: number;
    }
    /**
     * Local DateTime information.
     *
     * @interface LocalDateTime
     * @syscap SystemCapability.Notification.ReminderAgent
     * @since 7
     * @deprecated since 9
     * @useinstead reminderAgentManager.ReminderRequestTimer
     */
    interface LocalDateTime {
        /**
         * value of year.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestTimer.year
         */
        year: number;
        /**
         * value of month.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestTimer.month
         */
        month: number;
        /**
         * value of day.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestTimer.day
         */
        day: number;
        /**
         * value of hour.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestTimer.hour
         */
        hour: number;
        /**
         * value of minute.
         * @type { number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestTimer.minute
         */
        minute: number;
        /**
         * value of second.
         * @type { ?number }
         * @syscap SystemCapability.Notification.ReminderAgent
         * @since 7
         * @deprecated since 9
         * @useinstead reminderAgentManager.ReminderRequestTimer.second
         */
        second?: number;
    }
}
export default reminderAgent;
