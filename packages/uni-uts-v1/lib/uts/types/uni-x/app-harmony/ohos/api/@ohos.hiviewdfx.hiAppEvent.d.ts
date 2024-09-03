/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
 * @since 9
 */
/**
 * Provides the event logging function for applications to log the fault, statistical, security,
 * and user behavior events reported during running. Based on event information,
 * you will be able to analyze the running status of applications.
 *
 * @namespace hiAppEvent
 * @syscap SystemCapability.HiviewDFX.HiAppEvent
 * @atomicservice
 * @since 11
 */
declare namespace hiAppEvent {
    /**
     * Enumerate application event types.
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Enumerate application event types.
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    enum EventType {
        /**
         * Fault event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Fault event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        FAULT = 1,
        /**
         * Statistic event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Statistic event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        STATISTIC = 2,
        /**
         * Security event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Security event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        SECURITY = 3,
        /**
         * User behavior event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * User behavior event.
         *
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        BEHAVIOR = 4
    }
    /**
     * Preset domain.
     *
     * @namespace domain
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    namespace domain {
        /**
         * the domain of operating system.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const OS: string;
    }
    /**
     * Preset event.
     *
     * @namespace event
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Preset event.
     *
     * @namespace event
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    namespace event {
        /**
         * User login event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * User login event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const USER_LOGIN: string;
        /**
         * User logout event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * User logout event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const USER_LOGOUT: string;
        /**
         * Distributed service event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Distributed service event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const DISTRIBUTED_SERVICE_START: string;
        /**
         * crash event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const APP_CRASH: string;
        /**
         * freeze event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const APP_FREEZE: string;
        /**
         * launch event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        const APP_LAUNCH: string;
        /**
         * scroll jank event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        const SCROLL_JANK: string;
        /**
         * cpu usage high event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        const CPU_USAGE_HIGH: string;
        /**
         * battery usage event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        const BATTERY_USAGE: string;
        /**
         * resource overlimit event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        const RESOURCE_OVERLIMIT: string;
        /**
         * address sanitizer event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        const ADDRESS_SANITIZER: string;
        /**
         * main thread jank event.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        const MAIN_THREAD_JANK: string;
    }
    /**
     * Preset param.
     *
     * @namespace param
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Preset param.
     *
     * @namespace param
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    namespace param {
        /**
         * User id.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * User id.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const USER_ID: string;
        /**
         * Distributed service name.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Distributed service name.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const DISTRIBUTED_SERVICE_NAME: string;
        /**
         * Distributed service instance id.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Distributed service instance id.
         *
         * @constant
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        const DISTRIBUTED_SERVICE_INSTANCE_ID: string;
    }
    /**
     * Application event logging configuration interface.
     *
     * @param { ConfigOption } config Application event logging configuration item object.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 11103001 - Invalid max storage quota value.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Application event logging configuration interface.
     *
     * @param { ConfigOption } config Application event logging configuration item object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 11103001 - Invalid max storage quota value.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function configure(config: ConfigOption): void;
    /**
     * Describe the options for the configuration.
     *
     * @interface ConfigOption
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Describe the options for the configuration.
     *
     * @interface ConfigOption
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface ConfigOption {
        /**
         * Configuration item: application event logging switch.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Configuration item: application event logging switch.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        disable?: boolean;
        /**
         * Configuration item: event file directory storage quota size.
         *
         * @type { ?string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Configuration item: event file directory storage quota size.
         *
         * @type { ?string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        maxStorage?: string;
    }
    /**
     * Definition of written application event information.
     *
     * @interface AppEventInfo
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Definition of written application event information.
     *
     * @interface AppEventInfo
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface AppEventInfo {
        /**
         * The domain of the event.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The domain of the event.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        domain: string;
        /**
         * The name of the event.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The name of the event.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * The type of the event.
         *
         * @type { EventType }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The type of the event.
         *
         * @type { EventType }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        eventType: EventType;
        /**
         * The params of the event.
         *
         * @type { object }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The params of the event.
         *
         * @type { object }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        params: object;
    }
    /**
     * Write application event.
     *
     * @param { AppEventInfo } info Application event information to be written.
     * @returns { Promise<void> } Return Promise.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 11100001 - Function disabled.
     * @throws { BusinessError } 11101001 - Invalid event domain.
     * @throws { BusinessError } 11101002 - Invalid event name.
     * @throws { BusinessError } 11101003 - Invalid number of event parameters.
     * @throws { BusinessError } 11101004 - Invalid string length of the event parameter.
     * @throws { BusinessError } 11101005 - Invalid event parameter name.
     * @throws { BusinessError } 11101006 - Invalid array length of the event parameter.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Write application event.
     *
     * @param { AppEventInfo } info Application event information to be written.
     * @returns { Promise<void> } Return Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 11100001 - Function disabled.
     * @throws { BusinessError } 11101001 - Invalid event domain.
     * @throws { BusinessError } 11101002 - Invalid event name.
     * @throws { BusinessError } 11101003 - Invalid number of event parameters.
     * @throws { BusinessError } 11101004 - Invalid string length of the event parameter.
     * @throws { BusinessError } 11101005 - Invalid event parameter name.
     * @throws { BusinessError } 11101006 - Invalid array length of the event parameter.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function write(info: AppEventInfo): Promise<void>;
    /**
     * Write application event.
     *
     * @param { AppEventInfo } info Application event information to be written.
     * @param { AsyncCallback<void> } callback Callback function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 11100001 - Function disabled.
     * @throws { BusinessError } 11101001 - Invalid event domain.
     * @throws { BusinessError } 11101002 - Invalid event name.
     * @throws { BusinessError } 11101003 - Invalid number of event parameters.
     * @throws { BusinessError } 11101004 - Invalid string length of the event parameter.
     * @throws { BusinessError } 11101005 - Invalid event parameter name.
     * @throws { BusinessError } 11101006 - Invalid array length of the event parameter.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Write application event.
     *
     * @param { AppEventInfo } info Application event information to be written.
     * @param { AsyncCallback<void> } callback Callback function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 11100001 - Function disabled.
     * @throws { BusinessError } 11101001 - Invalid event domain.
     * @throws { BusinessError } 11101002 - Invalid event name.
     * @throws { BusinessError } 11101003 - Invalid number of event parameters.
     * @throws { BusinessError } 11101004 - Invalid string length of the event parameter.
     * @throws { BusinessError } 11101005 - Invalid event parameter name.
     * @throws { BusinessError } 11101006 - Invalid array length of the event parameter.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function write(info: AppEventInfo, callback: AsyncCallback<void>): void;
    /**
     * Indicates possible parameter types.
     *
     * @typedef {number | string | boolean | Array<string>}
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 12
     */
    type ParamType = number | string | boolean | Array<string>;
    /**
     * It is used to set custom parameters for events, including both system-subscribed events and custom events.
     * Existing parameter will be overwritten, and non-existing parameter will be created.
     *
     * @param { Record<string, ParamType> } params The parameters of the event.
     * @param { string } domain The domain of the event.
     * @param { string } name The name of the event.
     * @returns { Promise<void> } Return Promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 11101007 - The number of parameter keys exceeds the limit.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 12
     */
    function setEventParam(params: Record<string, ParamType>, domain: string, name?: string): Promise<void>;
    /**
     * Definition of the read event package.
     *
     * @interface AppEventPackage
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Definition of the read event package.
     *
     * @interface AppEventPackage
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface AppEventPackage {
        /**
         * The id of the package.
         *
         * @type { number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The id of the package.
         *
         * @type { number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        packageId: number;
        /**
         * The number of events contained in the package.
         *
         * @type { number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The number of events contained in the package.
         *
         * @type { number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        row: number;
        /**
         * The total size of events contained in the package.
         *
         * @type { number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The total size of events contained in the package.
         *
         * @type { number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        size: number;
        /**
         * The events data contained in the package.
         *
         * @type { string[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The events data contained in the package.
         *
         * @type { string[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        data: string[];
        /**
         * The event json format data contained in the package.
         *
         * @type { Array<AppEventInfo> }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        appEventInfos: Array<AppEventInfo>;
    }
    /**
     * Definition of event holder object, which is used to read the event data monitored by the watcher.
     *
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Definition of event holder object, which is used to read the event data monitored by the watcher.
     *
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    class AppEventPackageHolder {
        /**
         * Constructor for AppEventPackageHolder.
         *
         * @param { string } watcherName Name of the watcher to read.
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Constructor for AppEventPackageHolder.
         *
         * @param { string } watcherName Name of the watcher to read.
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        constructor(watcherName: string);
        /**
         * Set the threshold size per read.
         *
         * @param { number } size Threshold size.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11104001 - Invalid size value.
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Set the threshold size per read.
         *
         * @param { number } size Threshold size.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 11104001 - Invalid size value.
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        setSize(size: number): void;
        /**
         * Set the number of rows per read.
         *
         * @param { number } size Row size.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 11104001 - Invalid size value.
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        setRow(size: number): void;
        /**
         * Read the event data monitored by the watcher.
         *
         * @returns { AppEventPackage } The read event package.
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * Read the event data monitored by the watcher.
         *
         * @returns { AppEventPackage } The read event package.
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        takeNext(): AppEventPackage;
    }
    /**
     * Definition of the condition for triggering callback when the watcher monitors event data.
     *
     * @interface TriggerCondition
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Definition of the condition for triggering callback when the watcher monitors event data.
     *
     * @interface TriggerCondition
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface TriggerCondition {
        /**
         * The number of write events that trigger callback.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The number of write events that trigger callback.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        row?: number;
        /**
         * The size of write events that trigger callback.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The size of write events that trigger callback.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        size?: number;
        /**
         * The interval for triggering callback.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The interval for triggering callback.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        timeOut?: number;
    }
    /**
     * Definition of event filter object, which is used to filter events monitored by the watcher.
     *
     * @interface AppEventFilter
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Definition of event filter object, which is used to filter events monitored by the watcher.
     *
     * @interface AppEventFilter
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface AppEventFilter {
        /**
         * The name of the event domain to be monitored by the watcher.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The name of the event domain to be monitored by the watcher.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        domain: string;
        /**
         * The types of the events to be monitored by the watcher.
         *
         * @type { ?EventType[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The types of the events to be monitored by the watcher.
         *
         * @type { ?EventType[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        eventTypes?: EventType[];
        /**
         * The names of the events to be monitored by the watcher.
         *
         * @type { ?string[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        names?: string[];
    }
    /**
     * Definition of event group.
     *
     * @interface AppEventGroup
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface AppEventGroup {
        /**
         * The name of the event.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * The event array which is group by the name.
         *
         * @type { Array<AppEventInfo> }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        appEventInfos: Array<AppEventInfo>;
    }
    /**
     * Definition of event watcher object, which is used to monitor written event data.
     *
     * @interface Watcher
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Definition of event watcher object, which is used to monitor written event data.
     *
     * @interface Watcher
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface Watcher {
        /**
         * The name of watcher.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The name of watcher.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * The condition for triggering callback.
         *
         * @type { ?TriggerCondition }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The condition for triggering callback.
         *
         * @type { ?TriggerCondition }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        triggerCondition?: TriggerCondition;
        /**
         * The event filters for monitoring events.
         *
         * @type { ?AppEventFilter[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The event filters for monitoring events.
         *
         * @type { ?AppEventFilter[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        appEventFilters?: AppEventFilter[];
        /**
         * The callback function of watcher.
         *
         * @type { ?function }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @since 9
         */
        /**
         * The callback function of watcher.
         *
         * @type { ?function }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        onTrigger?: (curRow: number, curSize: number, holder: AppEventPackageHolder) => void;
        /**
         * The callback function, when watcher receive the event.
         *
         * @type { ?function }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        onReceive?: (domain: string, appEventGroups: Array<AppEventGroup>) => void;
    }
    /**
     * Add event watcher.
     *
     * @param { Watcher } watcher Watcher object for monitoring events.
     * @returns { AppEventPackageHolder } Holder object, which is used to read the monitoring data of the watcher.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 11102001 - Invalid watcher name.
     * @throws { BusinessError } 11102002 - Invalid filtering event domain.
     * @throws { BusinessError } 11102003 - Invalid row value.
     * @throws { BusinessError } 11102004 - Invalid size value.
     * @throws { BusinessError } 11102005 - Invalid timeout value.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Add event watcher.
     *
     * @param { Watcher } watcher Watcher object for monitoring events.
     * @returns { AppEventPackageHolder } Holder object, which is used to read the monitoring data of the watcher.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 11102001 - Invalid watcher name.
     * @throws { BusinessError } 11102002 - Invalid filtering event domain.
     * @throws { BusinessError } 11102003 - Invalid row value.
     * @throws { BusinessError } 11102004 - Invalid size value.
     * @throws { BusinessError } 11102005 - Invalid timeout value.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function addWatcher(watcher: Watcher): AppEventPackageHolder;
    /**
     * Remove event watcher.
     *
     * @param { Watcher } watcher Watcher object for monitoring events.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 11102001 - Invalid watcher name.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Remove event watcher.
     *
     * @param { Watcher } watcher Watcher object for monitoring events.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 11102001 - Invalid watcher name.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function removeWatcher(watcher: Watcher): void;
    /**
     * Clear all local logging data of the application.
     *
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @since 9
     */
    /**
     * Clear all local logging data of the application.
     *
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function clearData(): void;
    /**
     * Set user ID.
     *
     * @param { string } name The key of the user ID.
     * @param { string } value The value of the user ID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function setUserId(name: string, value: string): void;
    /**
     * Get user ID.
     *
     * @param { string } name The key of the user ID.
     * @returns { string } the user ID value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function getUserId(name: string): string;
    /**
     * Set user property.
     *
     * @param { string } name The key of the user property.
     * @param { string } value The value of the user property.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function setUserProperty(name: string, value: string): void;
    /**
     * Get user property.
     *
     * @param { string } name The key of the user property.
     * @returns { string } the user property value.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function getUserProperty(name: string): string;
    /**
     * Describe the event config to be reported by processor.
     *
     * @interface AppEventReportConfig
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface AppEventReportConfig {
        /**
         * The domain of the event.
         *
         * @type { ?string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        domain?: string;
        /**
         * The name of the event.
         *
         * @type { ?string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        name?: string;
        /**
         * The realtime report event.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        isRealTime?: boolean;
    }
    /**
     * Definition of the processor.
     *
     * @interface Processor
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    interface Processor {
        /**
         * The name of the processor.
         *
         * @type { string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * The processor enable the developer to debug.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        debugMode?: boolean;
        /**
         * The server location which used for the processor to receive the data, defined by the processor.
         *
         * @type { ?string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        routeInfo?: string;
        /**
         * The app ID is provided by the processor.
         *
         * @type { ?string }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        appId?: string;
        /**
         * The processor report the event when start.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        onStartReport?: boolean;
        /**
         * The processor report the event when the application onBackground.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        onBackgroundReport?: boolean;
        /**
         * The processor report the event according to the period.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        periodReport?: number;
        /**
         * The processor report the event according to the batch size.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        batchReport?: number;
        /**
         * The user ID names which the processor can report.
         *
         * @type { ?string[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        userIds?: string[];
        /**
         * The user property names which the processor can report.
         *
         * @type { ?string[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        userProperties?: string[];
        /**
         * The events which the processor can report.
         *
         * @type { ?AppEventReportConfig[] }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 11
         */
        eventConfigs?: AppEventReportConfig[];
        /**
         * The processor config id.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        configId?: number;
        /**
         * The processor set custom config data.
         *
         * @type { ?Record<string, string> }
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @atomicservice
         * @since 12
         */
        customConfigs?: Record<string, string>;
    }
    /**
     * Add the processor, who can report the event.
     *
     * @param { Processor } processor The instance which report the event
     * @returns { number }  The processor unique ID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function addProcessor(processor: Processor): number;
    /**
     * Remove the processor.
     *
     * @param { number } id The processor unique ID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @static
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @atomicservice
     * @since 11
     */
    function removeProcessor(id: number): void;
}
export default hiAppEvent;
