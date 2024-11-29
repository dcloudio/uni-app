/*
 * Copyright (c) 2022  Huawei Device Co., Ltd.
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
 * @kit BackgroundTasksKit
 */
import { AsyncCallback } from './@ohos.base';
/**
 * Provides methods for managing bundle usage statistics,
 * including the methods for querying bundle usage information and state data.
 * <p>You can use the methods defined in this class to query
 * the usage history and states of bundles in a specified period.
 * The system stores the query result in a {@link BundleStateInfo} or {@link BundleActiveState} instance and
 * then returns it to you.
 *
 * @namespace bundleState
 * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.resourceschedule.usageStatistics
 */
declare namespace bundleState {
    /**
     * @interface BundleStateInfo
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.BundleStatsInfo
     */
    interface BundleStateInfo {
        /**
         * The identifier of BundleStateInfo.
         * @type { number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        id: number;
        /**
         * The total duration, in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        abilityInFgTotalTime?: number;
        /**
         * The last time when the application was accessed, in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        abilityPrevAccessTime?: number;
        /**
         * The last time when the application was visible in the foreground, in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        abilityPrevSeenTime?: number;
        /**
         * The total duration, in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        abilitySeenTotalTime?: number;
        /**
         * The bundle name of the application.
         * @type { ?string }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        bundleName?: string;
        /**
         * The total duration, in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        fgAbilityAccessTotalTime?: number;
        /**
         * The last time when the foreground application was accessed, in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        fgAbilityPrevAccessTime?: number;
        /**
         * The time of the first bundle usage record in this {@code BundleActiveInfo} object,
         * in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        infosBeginTime?: number;
        /**
         * The time of the last bundle usage record in this {@code BundleActiveInfo} object,
         * in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        infosEndTime?: number;
        /**
         * Merges a specified {@link BundleActiveInfo} object with this {@link BundleActiveInfo} object.
         * The bundle name of both objects must be the same.
         *
         * @param { BundleStateInfo } toMerge Indicates the {@link BundleActiveInfo} object to merge.
         * If the bundle names of the two {@link BundleActiveInfo} objects are different.
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        merge(toMerge: BundleStateInfo): void;
    }
    /**
     * @typedef BundleActiveState
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.BundleEvents
     */
    interface BundleActiveState {
        /**
         * The usage priority group of the application.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        appUsagePriorityGroup?: number;
        /**
         * The bundle name.
         * @type { ?string }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        bundleName?: string;
        /**
         * The shortcut ID.
         * @type { ?string }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        indexOfLink?: string;
        /**
         * The class name.
         * @type { ?string }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        nameOfClass?: string;
        /**
         * The time when this state occurred, in milliseconds.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        stateOccurredTime?: number;
        /**
         * The state type.
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        stateType?: number;
    }
    /**
     * Checks whether the application with a specified bundle name is in the idle state.
     *
     * @param { string } bundleName Indicates the bundle name of the application to query.
     * @param { AsyncCallback<boolean> } callback - the callback of isIdleState.
     * <p> boolean value is true mean the application is idle in a particular period; false mean otherwise.
     * The time range of the particular period is defined by the system, which may be hours or days.</p>
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.AppGroup
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.isIdleState
     */
    function isIdleState(bundleName: string, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the application with a specified bundle name is in the idle state.
     *
     * @param { string } bundleName Indicates the bundle name of the application to query.
     * @returns { Promise<boolean> } the promise returned by isIdleState.
     * <p> boolean value is true mean the application is idle in a particular period; false mean otherwise.
     * The time range of the particular period is defined by the system, which may be hours or days.</p>
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.AppGroup
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.isIdleState
     */
    function isIdleState(bundleName: string): Promise<boolean>;
    /**
     * Queries the usage priority group of the calling application.
     * <p>The priority defined in a priority group restricts the resource usage of an application,
     * for example, restricting the running of background tasks. </p>
     *
     * @param { AsyncCallback<number> } callback - the callback of queryAppUsagePriorityGroup.
     * <p> Returns the app group of the calling application.</p>
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.AppGroup
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.queryAppGroup
     */
    function queryAppUsagePriorityGroup(callback: AsyncCallback<number>): void;
    /**
     * Queries the usage priority group of the calling application.
     * <p>The priority defined in a priority group restricts the resource usage of an application,
     * for example, restricting the running of background tasks. </p>
     *
     * @returns { Promise<number> } the promise returned by queryAppUsagePriorityGroup.
     * <p> Returns the app group of the calling application.</p>
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.AppGroup
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.queryAppGroup
     */
    function queryAppUsagePriorityGroup(): Promise<number>;
    /**
     * @typedef BundleActiveInfoResponse
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.BundleStatsMap
     */
    interface BundleActiveInfoResponse {
        [key: string]: BundleStateInfo;
    }
    /**
     * Declares interval type.
     *
     * @enum { number }
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.IntervalType
     */
    export enum IntervalType {
        /**
         * Indicates the interval type that will determine the optimal interval based on the start and end time.
         *
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        BY_OPTIMIZED = 0,
        /**
         * Indicates the daily interval.
         *
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        BY_DAILY = 1,
        /**
         * Indicates the weekly interval.
         *
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        BY_WEEKLY = 2,
        /**
         * Indicates the monthly interval.
         *
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        BY_MONTHLY = 3,
        /**
         * Indicates the annually interval.
         *
         * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
         * @since 7
         * @deprecated since 9
         */
        BY_ANNUALLY = 4
    }
    /**
     * Queries state data of the current bundle within a specified period.
     *
     * @param { number } begin Indicates the start time of the query period, in milliseconds.
     * @param { number } end Indicates the end time of the query period, in milliseconds.
     * @param { AsyncCallback<Array<BundleActiveState>> } callback - the state data of the current bundle.
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.queryCurrentBundleEvents
     */
    function queryCurrentBundleActiveStates(begin: number, end: number, callback: AsyncCallback<Array<BundleActiveState>>): void;
    /**
     * Queries state data of the current bundle within a specified period.
     *
     * @param { number } begin Indicates the start time of the query period, in milliseconds.
     * @param { number } end Indicates the end time of the query period, in milliseconds.
     * @returns { Promise<Array<BundleActiveState>> } the state data of the current bundle.
     * @syscap SystemCapability.ResourceSchedule.UsageStatistics.App
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.usageStatistics.queryCurrentBundleEvents
     */
    function queryCurrentBundleActiveStates(begin: number, end: number): Promise<Array<BundleActiveState>>;
}
export default bundleState;
