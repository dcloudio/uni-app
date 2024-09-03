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
 * @kit BackgroundTasksKit
 */
import { AsyncCallback } from './@ohos.base';
/**
 * Work scheduler interface.
 *
 * @namespace workScheduler
 * @syscap SystemCapability.ResourceSchedule.WorkScheduler
 * @StageModelOnly
 * @since 9
 */
declare namespace workScheduler {
    /**
     * The info of work.
     *
     * @interface WorkInfo
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    export interface WorkInfo {
        /**
         * The id of the current work.
         *
         * @type { number }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        workId: number;
        /**
         * The bundle name of the current work.
         *
         * @type { string }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        bundleName: string;
        /**
         * The ability name of the current work.
         *
         * @type { string }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        abilityName: string;
        /**
         * Whether the current work will be saved.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        isPersisted?: boolean;
        /**
         * The network type of the current work.
         *
         * @type { ?NetworkType }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        networkType?: NetworkType;
        /**
         * Whether a charging state has been set for triggering the work.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        isCharging?: boolean;
        /**
         * The charger type based on which the work is triggered.
         *
         * @type { ?ChargingType }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        chargerType?: ChargingType;
        /**
         * The battery level for triggering a work.
         *
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        batteryLevel?: number;
        /**
         * The battery status for triggering a work.
         *
         * @type { ?BatteryStatus }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        batteryStatus?: BatteryStatus;
        /**
         * Whether a storage state has been set for triggering the work.
         *
         * @type { ?StorageRequest }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        storageRequest?: StorageRequest;
        /**
         * The interval at which the work is repeated.
         *
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        repeatCycleTime?: number;
        /**
         * Whether the work has been set to repeat at the specified interval.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        isRepeat?: boolean;
        /**
         * The repeat of the current work.
         *
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        repeatCount?: number;
        /**
         * Whether the device deep idle state has been set for triggering the work.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        isDeepIdle?: boolean;
        /**
         * The idle wait time based on which the work is triggered.
         *
         * @type { ?number }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        idleWaitTime?: number;
        /**
         * The parameters of the work. The value is only supported basic type(Number, String, Boolean).
         *
         * @type { ?Record<string, number | string | boolean> }
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        parameters?: Record<string, number | string | boolean>;
    }
    /**
     * Add a work to the queue. A work can be executed only when it meets the preset triggering condition
     * <p> and complies with the rules of work scheduler manager. </p>
     *
     * @param { WorkInfo } work - The info of work.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameters types; 3. Parameter verification failed.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @throws { BusinessError } 9700004 - Check on workInfo failed.
     * @throws { BusinessError } 9700005 - Calling startWork failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    function startWork(work: WorkInfo): void;
    /**
     * Stop a work.
     *
     * @param { WorkInfo } work - The info of work.
     * @param { boolean } needCancel - True if need to be canceled after being stopped, otherwise false.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameters types; 3. Parameter verification failed.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @throws { BusinessError } 9700004 - Check on workInfo failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    function stopWork(work: WorkInfo, needCancel?: boolean): void;
    /**
     * Obtains the work info of the wordId.
     *
     * @param { number } workId - The id of work.
     * @param { AsyncCallback<WorkInfo> } callback - The callback of the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @throws { BusinessError } 9700004 - Check on workInfo failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    function getWorkStatus(workId: number, callback: AsyncCallback<WorkInfo>): void;
    /**
     * Obtains the work info of the wordId.
     *
     * @param { number } workId - The id of work.
     * @returns { Promise<WorkInfo> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @throws { BusinessError } 9700004 - Check on workInfo failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    function getWorkStatus(workId: number): Promise<WorkInfo>;
    /**
     * Get all works of the calling application.
     *
     * @param { AsyncCallback<void> } callback - The callback of the function.
     * @returns { Array<WorkInfo> } the work info list.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameters types.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     * @deprecated since 10
     */
    function obtainAllWorks(callback: AsyncCallback<void>): Array<WorkInfo>;
    /**
     * Get all works of the calling application.
     *
     * @param { AsyncCallback<Array<WorkInfo>> } callback - The callback of the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameters types.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 10
     */
    function obtainAllWorks(callback: AsyncCallback<Array<WorkInfo>>): void;
    /**
     * Get all works of the calling application.
     *
     * @returns { Promise<Array<WorkInfo>> } The work info list.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameters types.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    function obtainAllWorks(): Promise<Array<WorkInfo>>;
    /**
     * Stop all and clear all works of the calling application.
     *
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameters types.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    function stopAndClearWorks(): void;
    /**
     * Check whether last work running is timeout. The interface is for repeating work.
     *
     * @param { number } workId - The id of work.
     * @param { AsyncCallback<void> } callback - The callback of the function.
     * @returns { boolean } true if last work running is timeout, otherwise false.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @throws { BusinessError } 9700004 - Check on workInfo failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     * @deprecated since 10
     */
    function isLastWorkTimeOut(workId: number, callback: AsyncCallback<void>): boolean;
    /**
     * Check whether last work running is timeout. The interface is for repeating work.
     *
     * @param { number } workId - The id of work.
     * @param { AsyncCallback<boolean> } callback - The callback of the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @throws { BusinessError } 9700004 - Check on workInfo failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 10
     */
    function isLastWorkTimeOut(workId: number, callback: AsyncCallback<boolean>): void;
    /**
     * Check whether last work running is timeout. The interface is for repeating work.
     *
     * @param { number } workId - The id of work.
     * @returns { Promise<boolean> } True if last work running is timeout, otherwise false.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
     * @throws { BusinessError } 9700001 - Memory operation failed.
     * @throws { BusinessError } 9700002 - Parcel operation failed.
     * @throws { BusinessError } 9700003 - System service operation failed.
     * @throws { BusinessError } 9700004 - Check on workInfo failed.
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     */
    function isLastWorkTimeOut(workId: number): Promise<boolean>;
    /**
     * Describes network type.
     *
     * @enum { number }
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     * @name NetworkType
    */
    export enum NetworkType {
        /**
         * Describes any network connection.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        NETWORK_TYPE_ANY = 0,
        /**
         * Describes a mobile network connection.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        NETWORK_TYPE_MOBILE,
        /**
         * Describes a wifi network connection.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        NETWORK_TYPE_WIFI,
        /**
         * Describes a bluetooth network connection.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        NETWORK_TYPE_BLUETOOTH,
        /**
         * Describes a wifi p2p network connection.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        NETWORK_TYPE_WIFI_P2P,
        /**
         * Describes a wifi wire network connection.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        NETWORK_TYPE_ETHERNET
    }
    /**
     * Describes charging type.
     *
     * @enum { number }
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     * @name ChargingType
    */
    export enum ChargingType {
        /**
         * Describes any charger is connected.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        CHARGING_PLUGGED_ANY = 0,
        /**
         * Describes ac charger is connected.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        CHARGING_PLUGGED_AC,
        /**
         * Describes usb charger is connected.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        CHARGING_PLUGGED_USB,
        /**
         * Describes wireless charger is connected.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        CHARGING_PLUGGED_WIRELESS
    }
    /**
     * Describes the battery status.
     *
     * @enum { number }
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     * @name BatteryStatus
    */
    export enum BatteryStatus {
        /**
         * Describes battery status is to low.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        BATTERY_STATUS_LOW = 0,
        /**
         * Describes battery status is to ok.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        BATTERY_STATUS_OKAY,
        /**
         * Describes battery status is to low or ok.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        BATTERY_STATUS_LOW_OR_OKAY
    }
    /**
     * Describes the storage request.
     *
     * @enum { number }
     * @syscap SystemCapability.ResourceSchedule.WorkScheduler
     * @StageModelOnly
     * @since 9
     * @name StorageRequest
    */
    export enum StorageRequest {
        /**
         * Describes storage is to low.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        STORAGE_LEVEL_LOW = 0,
        /**
         * Describes storage is to ok.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        STORAGE_LEVEL_OKAY,
        /**
         * Describes storage is to low or ok.
         *
         * @syscap SystemCapability.ResourceSchedule.WorkScheduler
         * @StageModelOnly
         * @since 9
         */
        STORAGE_LEVEL_LOW_OR_OKAY
    }
}
export default workScheduler;
