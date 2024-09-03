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
/**
 * @file
 * @kit PerformanceAnalysisKit
 */
import type { AsyncCallback } from './@ohos.base';
/**
 * Provides the event logging function for applications to log the fault, statistical, security,
 * and user behavior events reported during running. Based on event information,
 * you will be able to analyze the running status of applications.
 *
 * @namespace hiAppEvent
 * @syscap SystemCapability.HiviewDFX.HiAppEvent
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.hiviewdfx.hiAppEvent
 */
declare namespace hiAppEvent {
    /**
     * Enumerate application event types.
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 7
     * @deprecated since 9
     */
    enum EventType {
        /**
         * Fault event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        FAULT = 1,
        /**
         * Statistic event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        STATISTIC = 2,
        /**
         * Security event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        SECURITY = 3,
        /**
         * User behavior event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        BEHAVIOR = 4
    }
    /**
     * Preset event.
     *
     * @namespace Event
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 7
     * @deprecated since 9
     */
    namespace Event {
        /**
         * User login event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        const USER_LOGIN: string;
        /**
         * User logout event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        const USER_LOGOUT: string;
        /**
         * Distributed service event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        const DISTRIBUTED_SERVICE_START: string;
    }
    /**
     * Preset param.
     *
     * @namespace Param
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 7
     * @deprecated since 9
     */
    namespace Param {
        /**
         * User id.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        const USER_ID: string;
        /**
         * Distributed service name.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        const DISTRIBUTED_SERVICE_NAME: string;
        /**
         * Distributed service instance id.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        const DISTRIBUTED_SERVICE_INSTANCE_ID: string;
    }
    /**
     * Write application event.
     *
     * @param { string } eventName Application event name.
     * @param { EventType } eventType Application event type.
     * @param { object } keyValues Application event key-value pair params.
     * @returns { Promise<void> } Return Promise.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 7
     * @deprecated since 9
     */
    function write(eventName: string, eventType: EventType, keyValues: object): Promise<void>;
    /**
     * Write application event.
     *
     * @param { string } eventName Application event name.
     * @param { EventType } eventType Application event type.
     * @param { object } keyValues Application event key-value pair params.
     * @param { AsyncCallback<void> } [callback] Callback function.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 7
     * @deprecated since 9
     */
    function write(eventName: string, eventType: EventType, keyValues: object, callback: AsyncCallback<void>): void;
    /**
     * Application event logging configuration interface.
     *
     * @param { ConfigOption } config Application event logging configuration item object.
     * @returns { boolean } Configuration result.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 7
     * @deprecated since 9
     */
    function configure(config: ConfigOption): boolean;
    /**
     * Describe the options for the configuration.
     *
     * @interface ConfigOption
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 7
     * @deprecated since 9
     */
    interface ConfigOption {
        /**
         * Configuration item: application event logging switch.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        disable?: boolean;
        /**
         * Configuration item: event file directory storage quota size.
         *
         * @type { ?string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 7
         * @deprecated since 9
         */
        maxStorage?: string;
    }
}
export default hiAppEvent;
