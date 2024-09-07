/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
import { AsyncCallback } from './@ohos.base';
import { CommonEventData } from './commonEvent/commonEventData';
import { CommonEventSubscriber } from './commonEvent/commonEventSubscriber';
import { CommonEventSubscribeInfo } from './commonEvent/commonEventSubscribeInfo';
import { CommonEventPublishData } from './commonEvent/commonEventPublishData';
/**
 * Common event definition
 *
 * @namespace commonEvent
 * @syscap SystemCapability.Notification.CommonEvent
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.commonEventManager/commonEventManager
 */
declare namespace commonEvent {
    /**
     * Publishes an ordered, sticky, or standard common event.
     *
     * @param { string } event - name of the common event.
     * @param { AsyncCallback<void> } callback - Specified callback method.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.commonEventManager/commonEventManager#publish
     */
    function publish(event: string, callback: AsyncCallback<void>): void;
    /**
     * Publishes an ordered, sticky, or standard common event.
     *
     * @param { string } event - name of the common event.
     * @param { CommonEventPublishData } options - Indicate the CommonEventPublishData containing the common event content
     *                                             and attributes.
     * @param { AsyncCallback<void> } callback - Specified callback method.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.commonEventManager/commonEventManager#publish
     */
    function publish(event: string, options: CommonEventPublishData, callback: AsyncCallback<void>): void;
    /**
     * creates a CommonEventSubscriber for the SubscriberInfo.
     *
     * @param { CommonEventSubscribeInfo } subscribeInfo - Indicates the information of the subscriber.
     * @param { AsyncCallback<CommonEventSubscriber> } callback - Specified callback method.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.commonEventManager/commonEventManager#createSubscriber
     */
    function createSubscriber(subscribeInfo: CommonEventSubscribeInfo, callback: AsyncCallback<CommonEventSubscriber>): void;
    /**
     * create the CommonEventSubscriber for the SubscriberInfo.
     *
     * @param { CommonEventSubscribeInfo } subscribeInfo - Indicates the information of the subscriber.
     * @returns { Promise<CommonEventSubscriber> } Returns common event subscriber object
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.commonEventManager/commonEventManager#createSubscriber
     */
    function createSubscriber(subscribeInfo: CommonEventSubscribeInfo): Promise<CommonEventSubscriber>;
    /**
     * subscribe an ordered, sticky, or standard common event.
     *
     * @param { CommonEventSubscriber } subscriber - Indicate the subscriber of the common event.
     * @param { AsyncCallback<CommonEventData> } callback - Specified callback method.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.commonEventManager/commonEventManager#subscribe
     */
    function subscribe(subscriber: CommonEventSubscriber, callback: AsyncCallback<CommonEventData>): void;
    /**
     * unsubscribe from an ordered, sticky, or standard common event.
     *
     * @param { CommonEventSubscriber } subscriber - Indicate the subscriber of the common event.
     * @param { AsyncCallback<void> } [callback] - Specified callback method.
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.commonEventManager/commonEventManager#unsubscribe
     */
    function unsubscribe(subscriber: CommonEventSubscriber, callback?: AsyncCallback<void>): void;
    /**
     * the event type that the commonEvent supported
     *
     * @enum { string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.commonEventManager/commonEventManager#Support
     */
    export enum Support {
        /**
         * This commonEvent means when the device is booted or system upgrade completed, and only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BOOT_COMPLETED
         */
        COMMON_EVENT_BOOT_COMPLETED = 'usual.event.BOOT_COMPLETED',
        /**
         * This commonEvent means when the device finnish booting, but still in the locked state.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_LOCKED_BOOT_COMPLETED
         */
        COMMON_EVENT_LOCKED_BOOT_COMPLETED = 'usual.event.LOCKED_BOOT_COMPLETED',
        /**
         * This commonEvent means when the device is shutting down, note: turn off, not sleeping.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_SHUTDOWN
         */
        COMMON_EVENT_SHUTDOWN = 'usual.event.SHUTDOWN',
        /**
         * This commonEvent means when the charging state, level and so on about the battery.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BATTERY_CHANGED
         */
        COMMON_EVENT_BATTERY_CHANGED = 'usual.event.BATTERY_CHANGED',
        /**
         * This commonEvent means when the device in low battery state..
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BATTERY_LOW
         */
        COMMON_EVENT_BATTERY_LOW = 'usual.event.BATTERY_LOW',
        /**
         * This commonEvent means when the battery level is an ok state.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BATTERY_OKAY
         */
        COMMON_EVENT_BATTERY_OKAY = 'usual.event.BATTERY_OKAY',
        /**
         * This commonEvent means when the other power is connected to the device.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_POWER_CONNECTED
         */
        COMMON_EVENT_POWER_CONNECTED = 'usual.event.POWER_CONNECTED',
        /**
         * This commonEvent means when the other power is removed from the device.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_POWER_DISCONNECTED
         */
        COMMON_EVENT_POWER_DISCONNECTED = 'usual.event.POWER_DISCONNECTED',
        /**
         * This commonEvent means when the screen is turned off.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_SCREEN_OFF
         */
        COMMON_EVENT_SCREEN_OFF = 'usual.event.SCREEN_OFF',
        /**
         * This commonEvent means when the device is awakened and interactive.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_SCREEN_ON
         */
        COMMON_EVENT_SCREEN_ON = 'usual.event.SCREEN_ON',
        /**
         * This commonEvent means when the thermal state level change
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_THERMAL_LEVEL_CHANGED
         */
        COMMON_EVENT_THERMAL_LEVEL_CHANGED = 'usual.event.THERMAL_LEVEL_CHANGED',
        /**
         * This commonEvent means when the user is present after the device is awakened.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_PRESENT
         */
        COMMON_EVENT_USER_PRESENT = 'usual.event.USER_PRESENT',
        /**
         * This commonEvent means when the current time is changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_TIME_TICK
         */
        COMMON_EVENT_TIME_TICK = 'usual.event.TIME_TICK',
        /**
         * This commonEvent means when the time is set.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_TIME_CHANGED
         */
        COMMON_EVENT_TIME_CHANGED = 'usual.event.TIME_CHANGED',
        /**
         * This commonEvent means when the current date is changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DATE_CHANGED
         */
        COMMON_EVENT_DATE_CHANGED = 'usual.event.DATE_CHANGED',
        /**
         * This commonEvent means when the time zone is changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_TIMEZONE_CHANGED
         */
        COMMON_EVENT_TIMEZONE_CHANGED = 'usual.event.TIMEZONE_CHANGED',
        /**
         * This commonEvent means when the dialog to dismiss.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_CLOSE_SYSTEM_DIALOGS
         */
        COMMON_EVENT_CLOSE_SYSTEM_DIALOGS = 'usual.event.CLOSE_SYSTEM_DIALOGS',
        /**
         * This commonEvent means when a new application package is installed on the device.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_ADDED
         */
        COMMON_EVENT_PACKAGE_ADDED = 'usual.event.PACKAGE_ADDED',
        /**
         * This commonEvent means when a new version application package is installed on the device and
         * replace the old version.the data contains the name of the package.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_REPLACED
         */
        COMMON_EVENT_PACKAGE_REPLACED = 'usual.event.PACKAGE_REPLACED',
        /**
         * This commonEvent means when a new version application package is installed on the device and
         * replace the old version, it does not contain additional data and only be sent to the replaced application.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_MY_PACKAGE_REPLACED
         */
        COMMON_EVENT_MY_PACKAGE_REPLACED = 'usual.event.MY_PACKAGE_REPLACED',
        /**
         * This commonEvent means when an existing application package is removed from the device.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_REMOVED
         */
        COMMON_EVENT_PACKAGE_REMOVED = 'usual.event.PACKAGE_REMOVED',
        /**
         * This commonEvent means when an existing application package is removed from the device.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BUNDLE_REMOVED
         */
        COMMON_EVENT_BUNDLE_REMOVED = 'usual.event.BUNDLE_REMOVED',
        /**
         * This commonEvent means when an existing application package is completely removed from the device.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_FULLY_REMOVED
         */
        COMMON_EVENT_PACKAGE_FULLY_REMOVED = 'usual.event.PACKAGE_FULLY_REMOVED',
        /**
         * This commonEvent means when an existing application package has been changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_CHANGED
         */
        COMMON_EVENT_PACKAGE_CHANGED = 'usual.event.PACKAGE_CHANGED',
        /**
         * This commonEvent means the user has restarted a package, and all of its processes have been killed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_RESTARTED
         */
        COMMON_EVENT_PACKAGE_RESTARTED = 'usual.event.PACKAGE_RESTARTED',
        /**
         * This commonEvent means the user has cleared the package data.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_DATA_CLEARED
         */
        COMMON_EVENT_PACKAGE_DATA_CLEARED = 'usual.event.PACKAGE_DATA_CLEARED',
        /**
         * This commonEvent means the packages have been suspended.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGES_SUSPENDED
         */
        COMMON_EVENT_PACKAGES_SUSPENDED = 'usual.event.PACKAGES_SUSPENDED',
        /**
         * This commonEvent means the packages have been un-suspended.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGES_UNSUSPENDED
         */
        COMMON_EVENT_PACKAGES_UNSUSPENDED = 'usual.event.PACKAGES_UNSUSPENDED',
        /**
         * This commonEvent Sent to a package that has been suspended by the system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_MY_PACKAGE_SUSPENDED
         */
        COMMON_EVENT_MY_PACKAGE_SUSPENDED = 'usual.event.MY_PACKAGE_SUSPENDED',
        /**
         * Sent to a package that has been un-suspended.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_MY_PACKAGE_UNSUSPENDED
         */
        COMMON_EVENT_MY_PACKAGE_UNSUSPENDED = 'usual.event.MY_PACKAGE_UNSUSPENDED',
        /**
         * A user id has been removed from the system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_UID_REMOVED
         */
        COMMON_EVENT_UID_REMOVED = 'usual.event.UID_REMOVED',
        /**
         * The application is first launched after installed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_FIRST_LAUNCH
         */
        COMMON_EVENT_PACKAGE_FIRST_LAUNCH = 'usual.event.PACKAGE_FIRST_LAUNCH',
        /**
         * Sent by system package verifier when a package need to be verified.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_NEEDS_VERIFICATION
         */
        COMMON_EVENT_PACKAGE_NEEDS_VERIFICATION = 'usual.event.PACKAGE_NEEDS_VERIFICATION',
        /**
         * Sent by system package verifier when a package is verified.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_PACKAGE_VERIFIED
         */
        COMMON_EVENT_PACKAGE_VERIFIED = 'usual.event.PACKAGE_VERIFIED',
        /**
         * Resources for a set of packages (which were previously unavailable) are currently
         * available since the media on which they exist is available.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_EXTERNAL_APPLICATIONS_AVAILABLE
         */
        COMMON_EVENT_EXTERNAL_APPLICATIONS_AVAILABLE = 'usual.event.EXTERNAL_APPLICATIONS_AVAILABLE',
        /**
         * Resources for a set of packages are currently unavailable since the media on which they exist is unavailable.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManage/commonEventManager.Support#COMMON_EVENT_EXTERNAL_APPLICATIONS_UNAVAILABLE
         */
        COMMON_EVENT_EXTERNAL_APPLICATIONS_UNAVAILABLE = 'usual.event.EXTERNAL_APPLICATIONS_UNAVAILABLE',
        /**
         * The device configuration such as orientation,locale have been changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_CONFIGURATION_CHANGED
         */
        COMMON_EVENT_CONFIGURATION_CHANGED = 'usual.event.CONFIGURATION_CHANGED',
        /**
         * The current device's locale has changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_LOCALE_CHANGED
         */
        COMMON_EVENT_LOCALE_CHANGED = 'usual.event.LOCALE_CHANGED',
        /**
         *  Indicates low memory condition notification acknowledged by user and package management should be started.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_MANAGE_PACKAGE_STORAGE
         */
        COMMON_EVENT_MANAGE_PACKAGE_STORAGE = 'usual.event.MANAGE_PACKAGE_STORAGE',
        /**
         * Sent by the smart function when the system in drive mode.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DRIVE_MODE
         */
        COMMON_EVENT_DRIVE_MODE = 'common.event.DRIVE_MODE',
        /**
         * Sent by the smart function when the system in home mode.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_HOME_MODE
         */
        COMMON_EVENT_HOME_MODE = 'common.event.HOME_MODE',
        /**
         * Sent by the smart function when the system in office mode.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_OFFICE_MODE
         */
        COMMON_EVENT_OFFICE_MODE = 'common.event.OFFICE_MODE',
        /**
         * Remind new user of preparing to start.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_STARTED
         */
        COMMON_EVENT_USER_STARTED = 'usual.event.USER_STARTED',
        /**
         * Remind previous user of that the service has been the background.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_BACKGROUND
         */
        COMMON_EVENT_USER_BACKGROUND = 'usual.event.USER_BACKGROUND',
        /**
         * Remind new user of that the service has been the foreground.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_FOREGROUND
         */
        COMMON_EVENT_USER_FOREGROUND = 'usual.event.USER_FOREGROUND',
        /**
         * Remind new user of that the service has been switched to new user.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_SWITCHED
         */
        COMMON_EVENT_USER_SWITCHED = 'usual.event.USER_SWITCHED',
        /**
         * Remind new user of that the service has been starting.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_STARTING
         */
        COMMON_EVENT_USER_STARTING = 'usual.event.USER_STARTING',
        /**
         * Remind new user of that the service has been unlocked.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_UNLOCKED
         */
        COMMON_EVENT_USER_UNLOCKED = 'usual.event.USER_UNLOCKED',
        /**
         * Remind new user of that the service has been stopping.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_STOPPING
         */
        COMMON_EVENT_USER_STOPPING = 'usual.event.USER_STOPPING',
        /**
         * Remind new user of that the service has stopped.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_STOPPED
         */
        COMMON_EVENT_USER_STOPPED = 'usual.event.USER_STOPPED',
        /**
         * HW id login successfully.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_HWID_LOGIN
         */
        COMMON_EVENT_HWID_LOGIN = 'common.event.HWID_LOGIN',
        /**
         * HW id logout successfully.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_HWID_LOGOUT
         */
        COMMON_EVENT_HWID_LOGOUT = 'common.event.HWID_LOGOUT',
        /**
         * HW id is invalid.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_HWID_TOKEN_INVALID
         */
        COMMON_EVENT_HWID_TOKEN_INVALID = 'common.event.HWID_TOKEN_INVALID',
        /**
         * HW id logs off.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_HWID_LOGOFF
         */
        COMMON_EVENT_HWID_LOGOFF = 'common.event.HWID_LOGOFF',
        /**
         * WIFI state.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_POWER_STATE
         */
        COMMON_EVENT_WIFI_POWER_STATE = 'usual.event.wifi.POWER_STATE',
        /**
         * WIFI scan results.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_SCAN_FINISHED
         */
        COMMON_EVENT_WIFI_SCAN_FINISHED = 'usual.event.wifi.SCAN_FINISHED',
        /**
         * WIFI RSSI change.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_RSSI_VALUE
         */
        COMMON_EVENT_WIFI_RSSI_VALUE = 'usual.event.wifi.RSSI_VALUE',
        /**
         * WIFI connect state.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_CONN_STATE
         */
        COMMON_EVENT_WIFI_CONN_STATE = 'usual.event.wifi.CONN_STATE',
        /**
         * WIFI hotspot state.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_HOTSPOT_STATE
         */
        COMMON_EVENT_WIFI_HOTSPOT_STATE = 'usual.event.wifi.HOTSPOT_STATE',
        /**
         * WIFI ap sta join.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_AP_STA_JOIN
         */
        COMMON_EVENT_WIFI_AP_STA_JOIN = 'usual.event.wifi.WIFI_HS_STA_JOIN',
        /**
         * WIFI ap sta join.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_AP_STA_LEAVE
         */
        COMMON_EVENT_WIFI_AP_STA_LEAVE = 'usual.event.wifi.WIFI_HS_STA_LEAVE',
        /**
         * Indicates Wi-Fi MpLink state notification acknowledged by binding or unbinding MpLink.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_MPLINK_STATE_CHANGE
         */
        COMMON_EVENT_WIFI_MPLINK_STATE_CHANGE = 'usual.event.wifi.mplink.STATE_CHANGE',
        /**
         * Indicates Wi-Fi P2P connection state notification acknowledged by connecting or disconnected P2P.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_P2P_CONN_STATE
         */
        COMMON_EVENT_WIFI_P2P_CONN_STATE = 'usual.event.wifi.p2p.CONN_STATE_CHANGE',
        /**
         * Indicates that the Wi-Fi P2P state change.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_P2P_STATE_CHANGED
         */
        COMMON_EVENT_WIFI_P2P_STATE_CHANGED = 'usual.event.wifi.p2p.STATE_CHANGE',
        /**
         * Indicates that the Wi-Fi P2P peers state change.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_P2P_PEERS_STATE_CHANGED
         */
        COMMON_EVENT_WIFI_P2P_PEERS_STATE_CHANGED = 'usual.event.wifi.p2p.DEVICES_CHANGE',
        /**
         * Indicates that the Wi-Fi P2P discovery state change.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_P2P_PEERS_DISCOVERY_STATE_CHANGED
         */
        COMMON_EVENT_WIFI_P2P_PEERS_DISCOVERY_STATE_CHANGED = 'usual.event.wifi.p2p.PEER_DISCOVERY_STATE_CHANGE',
        /**
         * Indicates that the Wi-Fi P2P current device state change.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_P2P_CURRENT_DEVICE_STATE_CHANGED
         */
        COMMON_EVENT_WIFI_P2P_CURRENT_DEVICE_STATE_CHANGED = 'usual.event.wifi.p2p.CURRENT_DEVICE_CHANGE',
        /**
         * Indicates that the Wi-Fi P2P group info is changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_WIFI_P2P_GROUP_STATE_CHANGED
         */
        COMMON_EVENT_WIFI_P2P_GROUP_STATE_CHANGED = 'usual.event.wifi.p2p.GROUP_STATE_CHANGED',
        /**
         * bluetooth.handsfree.ag.connect.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_CONNECT_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_CONNECT_STATE_UPDATE = 'usual.event.bluetooth.handsfree.ag.CONNECT_STATE_UPDATE',
        /**
         * bluetooth.handsfree.ag.current.device.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_CURRENT_DEVICE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_CURRENT_DEVICE_UPDATE = 'usual.event.bluetooth.handsfree.ag.CURRENT_DEVICE_UPDATE',
        /**
         * bluetooth.handsfree.ag.audio.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_AUDIO_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_AUDIO_STATE_UPDATE = 'usual.event.bluetooth.handsfree.ag.AUDIO_STATE_UPDATE',
        /**
         * bluetooth.a2dpsource.connect.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CONNECT_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CONNECT_STATE_UPDATE = 'usual.event.bluetooth.a2dpsource.CONNECT_STATE_UPDATE',
        /**
         * bluetooth.a2dpsource.current.device.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CURRENT_DEVICE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CURRENT_DEVICE_UPDATE = 'usual.event.bluetooth.a2dpsource.CURRENT_DEVICE_UPDATE',
        /**
         * bluetooth.a2dpsource.playing.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSOURCE_PLAYING_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSOURCE_PLAYING_STATE_UPDATE = 'usual.event.bluetooth.a2dpsource.PLAYING_STATE_UPDATE',
        /**
         * bluetooth.a2dpsource.avrcp.connect.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSOURCE_AVRCP_CONNECT_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSOURCE_AVRCP_CONNECT_STATE_UPDATE = 'usual.event.bluetooth.a2dpsource.AVRCP_CONNECT_STATE_UPDATE',
        /**
         * bluetooth.a2dpsource.codec.value.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CODEC_VALUE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CODEC_VALUE_UPDATE = 'usual.event.bluetooth.a2dpsource.CODEC_VALUE_UPDATE',
        /**
         * bluetooth.remotedevice.discovered.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_DISCOVERED
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_DISCOVERED = 'usual.event.bluetooth.remotedevice.DISCOVERED',
        /**
         * bluetooth.remotedevice.class.value.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CLASS_VALUE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CLASS_VALUE_UPDATE = 'usual.event.bluetooth.remotedevice.CLASS_VALUE_UPDATE',
        /**
         * bluetooth.remotedevice.acl.connected.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_ACL_CONNECTED
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_ACL_CONNECTED = 'usual.event.bluetooth.remotedevice.ACL_CONNECTED',
        /**
         * bluetooth.remotedevice.acl.disconnected.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_ACL_DISCONNECTED
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_ACL_DISCONNECTED = 'usual.event.bluetooth.remotedevice.ACL_DISCONNECTED',
        /**
         * bluetooth.remotedevice.name.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_NAME_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_NAME_UPDATE = 'usual.event.bluetooth.remotedevice.NAME_UPDATE',
        /**
         * bluetooth.remotedevice.pair.state.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIR_STATE
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIR_STATE = 'usual.event.bluetooth.remotedevice.PAIR_STATE',
        /**
         * bluetooth.remotedevice.battery.value.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_BATTERY_VALUE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_BATTERY_VALUE_UPDATE = 'usual.event.bluetooth.remotedevice.BATTERY_VALUE_UPDATE',
        /**
         * bluetooth.remotedevice.sdp.result.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_SDP_RESULT
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_SDP_RESULT = 'usual.event.bluetooth.remotedevice.SDP_RESULT',
        /**
         * bluetooth.remotedevice.uuid.value.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_UUID_VALUE
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_UUID_VALUE = 'usual.event.bluetooth.remotedevice.UUID_VALUE',
        /**
         * bluetooth.remotedevice.pairing.req.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIRING_REQ
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIRING_REQ = 'usual.event.bluetooth.remotedevice.PAIRING_REQ',
        /**
         * bluetooth.remotedevice.pairing.cancel.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIRING_CANCEL
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIRING_CANCEL = 'usual.event.bluetooth.remotedevice.PAIRING_CANCEL',
        /**
         * bluetooth.remotedevice.connect.req.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_REQ
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_REQ = 'usual.event.bluetooth.remotedevice.CONNECT_REQ',
        /**
         * bluetooth.remotedevice.connect.reply.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_REPLY
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_REPLY = 'usual.event.bluetooth.remotedevice.CONNECT_REPLY',
        /**
         * bluetooth.remotedevice.connect.cancel.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_CANCEL
         */
        COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_CANCEL = 'usual.event.bluetooth.remotedevice.CONNECT_CANCEL',
        /**
         * bluetooth.handsfreeunit.connect.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_CONNECT_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_CONNECT_STATE_UPDATE = 'usual.event.bluetooth.handsfreeunit.CONNECT_STATE_UPDATE',
        /**
         * bluetooth.handsfreeunit.audio.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AUDIO_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AUDIO_STATE_UPDATE = 'usual.event.bluetooth.handsfreeunit.AUDIO_STATE_UPDATE',
        /**
         * bluetooth.handsfreeunit.ag.common.event.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AG_COMMON_EVENT
         */
        COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AG_COMMON_EVENT = 'usual.event.bluetooth.handsfreeunit.AG_COMMON_EVENT',
        /**
         * bluetooth.handsfreeunit.ag.call.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AG_CALL_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AG_CALL_STATE_UPDATE = 'usual.event.bluetooth.handsfreeunit.AG_CALL_STATE_UPDATE',
        /**
         * bluetooth.host.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HOST_STATE_UPDATE = 'usual.event.bluetooth.host.STATE_UPDATE',
        /**
         * bluetooth.host.req.discoverable.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_REQ_DISCOVERABLE
         */
        COMMON_EVENT_BLUETOOTH_HOST_REQ_DISCOVERABLE = 'usual.event.bluetooth.host.REQ_DISCOVERABLE',
        /**
         * bluetooth.host.req.enable.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_REQ_ENABLE
         */
        COMMON_EVENT_BLUETOOTH_HOST_REQ_ENABLE = 'usual.event.bluetooth.host.REQ_ENABLE',
        /**
         * bluetooth.host.req.disable.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_REQ_DISABLE
         */
        COMMON_EVENT_BLUETOOTH_HOST_REQ_DISABLE = 'usual.event.bluetooth.host.REQ_DISABLE',
        /**
         * bluetooth.host.scan.mode.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_SCAN_MODE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HOST_SCAN_MODE_UPDATE = 'usual.event.bluetooth.host.SCAN_MODE_UPDATE',
        /**
         * bluetooth.host.discovery.stated.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_DISCOVERY_STARTED
         */
        COMMON_EVENT_BLUETOOTH_HOST_DISCOVERY_STARTED = 'usual.event.bluetooth.host.DISCOVERY_STARTED',
        /**
         * bluetooth.host.discovery.finished.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_DISCOVERY_FINISHED
         */
        COMMON_EVENT_BLUETOOTH_HOST_DISCOVERY_FINISHED = 'usual.event.bluetooth.host.DISCOVERY_FINISHED',
        /**
         * bluetooth.host.name.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_HOST_NAME_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_HOST_NAME_UPDATE = 'usual.event.bluetooth.host.NAME_UPDATE',
        /**
         * bluetooth.a2dp.connect.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSINK_CONNECT_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSINK_CONNECT_STATE_UPDATE = 'usual.event.bluetooth.a2dpsink.CONNECT_STATE_UPDATE',
        /**
         * bluetooth.a2dp.playing.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSINK_PLAYING_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSINK_PLAYING_STATE_UPDATE = 'usual.event.bluetooth.a2dpsink.PLAYING_STATE_UPDATE',
        /**
         * bluetooth.a2dp.audio.state.update.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_BLUETOOTH_A2DPSINK_AUDIO_STATE_UPDATE
         */
        COMMON_EVENT_BLUETOOTH_A2DPSINK_AUDIO_STATE_UPDATE = 'usual.event.bluetooth.a2dpsink.AUDIO_STATE_UPDATE',
        /**
         * Nfc state change.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_NFC_ACTION_ADAPTER_STATE_CHANGED
         */
        COMMON_EVENT_NFC_ACTION_ADAPTER_STATE_CHANGED = 'usual.event.nfc.action.ADAPTER_STATE_CHANGED',
        /**
         * Nfc field on detected.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_NFC_ACTION_RF_FIELD_ON_DETECTED
         */
        COMMON_EVENT_NFC_ACTION_RF_FIELD_ON_DETECTED = 'usual.event.nfc.action.RF_FIELD_ON_DETECTED',
        /**
         * Nfc field off detected.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_NFC_ACTION_RF_FIELD_OFF_DETECTED
         */
        COMMON_EVENT_NFC_ACTION_RF_FIELD_OFF_DETECTED = 'usual.event.nfc.action.RF_FIELD_OFF_DETECTED',
        /**
         * Sent when stop charging battery.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DISCHARGING
         */
        COMMON_EVENT_DISCHARGING = 'usual.event.DISCHARGING',
        /**
         * Sent when start charging battery.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_CHARGING
         */
        COMMON_EVENT_CHARGING = 'usual.event.CHARGING',
        /**
         * Sent when device's idle mode changed
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DEVICE_IDLE_MODE_CHANGED
         */
        COMMON_EVENT_DEVICE_IDLE_MODE_CHANGED = 'usual.event.DEVICE_IDLE_MODE_CHANGED',
        /**
         * Sent when device's power save mode changed
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_POWER_SAVE_MODE_CHANGED
         */
        COMMON_EVENT_POWER_SAVE_MODE_CHANGED = 'usual.event.POWER_SAVE_MODE_CHANGED',
        /**
         * User added.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_ADDED
         */
        COMMON_EVENT_USER_ADDED = 'usual.event.USER_ADDED',
        /**
         * User removed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USER_REMOVED
         */
        COMMON_EVENT_USER_REMOVED = 'usual.event.USER_REMOVED',
        /**
         * Sent when ability is added.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_ABILITY_ADDED
         */
        COMMON_EVENT_ABILITY_ADDED = 'common.event.ABILITY_ADDED',
        /**
         * Sent when ability is removed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_ABILITY_REMOVED
         */
        COMMON_EVENT_ABILITY_REMOVED = 'common.event.ABILITY_REMOVED',
        /**
         * Sent when ability is updated.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_ABILITY_UPDATED
         */
        COMMON_EVENT_ABILITY_UPDATED = 'common.event.ABILITY_UPDATED',
        /**
         * Gps mode state changed.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_LOCATION_MODE_STATE_CHANGED
         */
        COMMON_EVENT_LOCATION_MODE_STATE_CHANGED = 'usual.event.location.MODE_STATE_CHANGED',
        /**
         * The ivi is about to go into sleep state when the ivi is turned off power.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_SLEEP
         */
        COMMON_EVENT_IVI_SLEEP = 'common.event.IVI_SLEEP',
        /**
         * The ivi is slept and notify the app stop playing.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_PAUSE
         */
        COMMON_EVENT_IVI_PAUSE = 'common.event.IVI_PAUSE',
        /**
         * The ivi is standby and notify the app stop playing.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_STANDBY
         */
        COMMON_EVENT_IVI_STANDBY = 'common.event.IVI_STANDBY',
        /**
         * The app stop playing and save state.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_LASTMODE_SAVE
         */
        COMMON_EVENT_IVI_LASTMODE_SAVE = 'common.event.IVI_LASTMODE_SAVE',
        /**
         * The ivi is voltage abnormal.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_VOLTAGE_ABNORMAL
         */
        COMMON_EVENT_IVI_VOLTAGE_ABNORMAL = 'common.event.IVI_VOLTAGE_ABNORMAL',
        /**
         * The ivi temperature is too high.
         * This is a protected common event that can only be sent by system.this common event will be delete later,
         * please use COMMON_EVENT_IVI_TEMPERATURE_ABNORMAL.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_HIGH_TEMPERATURE
         */
        COMMON_EVENT_IVI_HIGH_TEMPERATURE = 'common.event.IVI_HIGH_TEMPERATURE',
        /**
         * The ivi temperature is extreme high.
         * This is a protected common event that can only be sent by system.this common event will be delete later,
         * please use COMMON_EVENT_IVI_TEMPERATURE_ABNORMAL.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_EXTREME_TEMPERATURE
         */
        COMMON_EVENT_IVI_EXTREME_TEMPERATURE = 'common.event.IVI_EXTREME_TEMPERATURE',
        /**
         * The ivi temperature is abnormal.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_TEMPERATURE_ABNORMAL
         */
        COMMON_EVENT_IVI_TEMPERATURE_ABNORMAL = 'common.event.IVI_TEMPERATURE_ABNORMAL',
        /**
         * The ivi voltage is recovery.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_VOLTAGE_RECOVERY
         */
        COMMON_EVENT_IVI_VOLTAGE_RECOVERY = 'common.event.IVI_VOLTAGE_RECOVERY',
        /**
         * The ivi temperature is recovery.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_TEMPERATURE_RECOVERY
         */
        COMMON_EVENT_IVI_TEMPERATURE_RECOVERY = 'common.event.IVI_TEMPERATURE_RECOVERY',
        /**
         * The battery service is active.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_IVI_ACTIVE
         */
        COMMON_EVENT_IVI_ACTIVE = 'common.event.IVI_ACTIVE',
        /**
         * The usb device attached.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USB_DEVICE_ATTACHED
         */
        COMMON_EVENT_USB_DEVICE_ATTACHED = 'usual.event.hardware.usb.action.USB_DEVICE_ATTACHED',
        /**
         * The usb device detached.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USB_DEVICE_DETACHED
         */
        COMMON_EVENT_USB_DEVICE_DETACHED = 'usual.event.hardware.usb.action.USB_DEVICE_DETACHED',
        /**
         * The usb accessory attached.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USB_ACCESSORY_ATTACHED
         */
        COMMON_EVENT_USB_ACCESSORY_ATTACHED = 'usual.event.hardware.usb.action.USB_ACCESSORY_ATTACHED',
        /**
         * The usb accessory detached.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_USB_ACCESSORY_DETACHED
         */
        COMMON_EVENT_USB_ACCESSORY_DETACHED = 'usual.event.hardware.usb.action.USB_ACCESSORY_DETACHED',
        /**
         * The external storage was removed.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DISK_REMOVED
         */
        COMMON_EVENT_DISK_REMOVED = 'usual.event.data.DISK_REMOVED',
        /**
         * The external storage was unmounted.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DISK_UNMOUNTED
         */
        COMMON_EVENT_DISK_UNMOUNTED = 'usual.event.data.DISK_UNMOUNTED',
        /**
         * The external storage was mounted.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DISK_MOUNTED
         */
        COMMON_EVENT_DISK_MOUNTED = 'usual.event.data.DISK_MOUNTED',
        /**
         * The external storage was bad removal.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DISK_BAD_REMOVAL
         */
        COMMON_EVENT_DISK_BAD_REMOVAL = 'usual.event.data.DISK_BAD_REMOVAL',
        /**
         * The external storage was unmountable.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DISK_UNMOUNTABLE
         */
        COMMON_EVENT_DISK_UNMOUNTABLE = 'usual.event.data.DISK_UNMOUNTABLE',
        /**
         * The external storage was eject.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_DISK_EJECT
         */
        COMMON_EVENT_DISK_EJECT = 'usual.event.data.DISK_EJECT',
        /**
         * The visible of account was updated.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_VISIBLE_ACCOUNTS_UPDATED
         */
        COMMON_EVENT_VISIBLE_ACCOUNTS_UPDATED = 'usual.event.data.VISIBLE_ACCOUNTS_UPDATED',
        /**
         * Account was deleted.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_ACCOUNT_DELETED
         */
        COMMON_EVENT_ACCOUNT_DELETED = 'usual.event.data.ACCOUNT_DELETED',
        /**
         * Foundation was ready.
         * This is a protected common event that can only be sent by system.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_FOUNDATION_READY
         */
        COMMON_EVENT_FOUNDATION_READY = 'common.event.FOUNDATION_READY',
        /**
         * Indicates the common event Action indicating that the airplane mode status of the device changes.
         * Users can register this event to listen to the change of the airplane mode status of the device.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_AIRPLANE_MODE_CHANGED
         */
        COMMON_EVENT_AIRPLANE_MODE_CHANGED = 'usual.event.AIRPLANE_MODE',
        /**
         * sent by the window manager service when the window mode is split.
         *
         * @syscap SystemCapability.Notification.CommonEvent
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.commonEventManager/commonEventManager.Support#COMMON_EVENT_SPLIT_SCREEN
         */
        COMMON_EVENT_SPLIT_SCREEN = 'common.event.SPLIT_SCREEN'
    }
}
export default commonEvent;
