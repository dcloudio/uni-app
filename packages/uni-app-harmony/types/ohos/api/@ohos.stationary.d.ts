/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @kit MultimodalAwarenessKit
 */
import type { Callback } from './@ohos.base';
/**
 * Declares a namespace that provides APIs to report the device status.
 *
 * @namespace stationary
 * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
 * @since 9
 */
declare namespace stationary {
    /**
     * Declares a response interface to receive the device status.
     *
     * @interface ActivityResponse
     * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
     * @since 9
     */
    interface ActivityResponse {
        /**
         * Declares a response interface to receive the device status.
         *
         * @type { ActivityState }
         * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
         * @since 9
         */
        state: ActivityState;
    }
    /**
     * Declares the device status type.
     *
     * @typedef { 'still' | 'relativeStill' }
     * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
     * @since 9
     */
    type ActivityType = 'still' | 'relativeStill';
    /**
     * Enumerates the device status events.
     *
     * @enum {number}
     * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
     * @since 9
     */
    enum ActivityEvent {
        /**
         * Event indicating entering device status.
         *
         * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
         * @since 9
         */
        ENTER = 1,
        /**
         * Event indicating exiting device status.
         *
         * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
         * @since 9
         */
        EXIT = 2,
        /**
         * Event indicating entering and exiting device status.
         *
         * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
         * @since 9
         */
        ENTER_EXIT = 3
    }
    /**
     * Enumerates the device status state.
     *
     * @enum {number}
     * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
     * @since 9
     */
    enum ActivityState {
        /**
         * Entering device status.
         *
         * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
         * @since 9
         */
        ENTER = 1,
        /**
         * Exiting device status.
         *
         * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
         * @since 9
         */
        EXIT = 2
    }
    /**
     * Subscribes to the device status.
     *
     * @param { ActivityType } activity Indicates the device status type. For details, see {@code type: ActivityType}.
     * @param { ActivityEvent } event Indicates the device status event.
     * @param { number } reportLatencyNs Indicates the event reporting period.
     * @param { Callback<ActivityResponse> } callback Indicates the callback for receiving reported data.
     * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
     * @since 9
     */
    function on(activity: ActivityType, event: ActivityEvent, reportLatencyNs: number, callback: Callback<ActivityResponse>): void;
    /**
     * Obtains the device status.
     *
     * @param { ActivityType } activity Indicates the device status type. For details, see {@code type: ActivityType}.
     * @param { Callback<ActivityResponse> } callback Indicates the callback for receiving reported data.
     * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
     * @since 9
     */
    function once(activity: ActivityType, callback: Callback<ActivityResponse>): void;
    /**
     * Unsubscribes from the device status.
     *
     * @param { ActivityType } activity Indicates the device status type. For details, see {@code type: ActivityType}.
     * @param { ActivityEvent } event Indicates the device status event.
     * @param { Callback<ActivityResponse> } callback Indicates the callback for receiving reported data.
     * @syscap SystemCapability.Msdp.DeviceStatus.Stationary
     * @since 9
     */
    function off(activity: ActivityType, event: ActivityEvent, callback?: Callback<ActivityResponse>): void;
}
export default stationary;
