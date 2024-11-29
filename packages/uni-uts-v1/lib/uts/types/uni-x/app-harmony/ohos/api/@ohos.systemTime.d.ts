/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
import { AsyncCallback } from './@ohos.base';
/**
 * System time and timezone.
 *
 * @namespace systemTime
 * @syscap SystemCapability.MiscServices.Time
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.systemDateTime
 */
declare namespace systemTime {
    /**
     * Sets the system time.
     *
     * @permission ohos.permission.SET_TIME
     * @param { number } time - Target time stamp (ms)
     * @param { AsyncCallback<void> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 7
     * @deprecated since 9
     */
    function setTime(time: number, callback: AsyncCallback<void>): void;
    /**
     * Sets the system time.
     *
     * @permission ohos.permission.SET_TIME
     * @param { number } time - Target time stamp (ms)
     * @returns { Promise<void> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 7
     * @deprecated since 9
     */
    function setTime(time: number): Promise<void>;
    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     *
     * @param { boolean } isNano
     * @param { AsyncCallback<number> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getCurrentTime
     */
    function getCurrentTime(isNano: boolean, callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     *
     * @param { AsyncCallback<number> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getCurrentTime
     */
    function getCurrentTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     *
     * @param { boolean } isNano
     * @returns { Promise<number> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getCurrentTime
     */
    function getCurrentTime(isNano?: boolean): Promise<number>;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     *
     * @param { boolean } isNano
     * @param { AsyncCallback<number> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealActiveTime
     */
    function getRealActiveTime(isNano: boolean, callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     *
     * @param { AsyncCallback<number> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealActiveTime
     */
    function getRealActiveTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     *
     * @param { boolean } isNano
     * @returns { Promise<number> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealActiveTime
     */
    function getRealActiveTime(isNano?: boolean): Promise<number>;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     *
     * @param { boolean } isNano
     * @param { AsyncCallback<number> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealTime
     */
    function getRealTime(isNano: boolean, callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     *
     * @param { AsyncCallback<number> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealTime
     */
    function getRealTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     *
     * @param { boolean } isNano
     * @returns { Promise<number> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealTime
     */
    function getRealTime(isNano?: boolean): Promise<number>;
    /**
     * Sets the system time.
     *
     * @permission ohos.permission.SET_TIME
     * @param { Date } date - The target date
     * @param { AsyncCallback<void> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 7
     * @deprecated since 9
     */
    function setDate(date: Date, callback: AsyncCallback<void>): void;
    /**
     * Sets the system time.
     *
     * @permission ohos.permission.SET_TIME
     * @param { Date } date - The target date
     * @returns { Promise<void> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 7
     * @deprecated since 9
     */
    function setDate(date: Date): Promise<void>;
    /**
     * Obtains the system date.
     *
     * @param { AsyncCallback<Date> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getDate
     */
    function getDate(callback: AsyncCallback<Date>): void;
    /**
     * Obtains the system date.
     *
     * @returns { Promise<Date> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getDate
     */
    function getDate(): Promise<Date>;
    /**
     * Sets the system timezone.
     *
     * @permission ohos.permission.SET_TIME_ZONE
     * @param { string } timezone - The system timezone
     * @param { AsyncCallback<void> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 7
     * @deprecated since 9
     */
    function setTimezone(timezone: string, callback: AsyncCallback<void>): void;
    /**
     * Sets the system timezone.
     *
     * @permission ohos.permission.SET_TIME_ZONE
     * @param { string } timezone - The system timezone
     * @returns { Promise<void> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 7
     * @deprecated since 9
     */
    function setTimezone(timezone: string): Promise<void>;
    /**
     * Obtains the system timezone.
     *
     * @param { AsyncCallback<string> } callback
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getTimezone
     */
    function getTimezone(callback: AsyncCallback<string>): void;
    /**
     * Obtains the system timezone.
     *
     * @returns { Promise<string> }
     * @throws { BusinessError } -1 - Parameter check failed, permission denied, or system error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getTimezone
     */
    function getTimezone(): Promise<string>;
}
export default systemTime;
