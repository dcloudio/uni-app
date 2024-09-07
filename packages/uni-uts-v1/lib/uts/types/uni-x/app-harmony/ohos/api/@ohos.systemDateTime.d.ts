/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
 * @namespace systemDateTime
 * @syscap SystemCapability.MiscServices.Time
 * @since 9
 */
declare namespace systemDateTime {
    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     *
     * @param { boolean } isNano - True if the result is in nanoseconds, otherwise in milliseconds
     * @param { AsyncCallback<number> } callback - The callback of getCurrentTime
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getCurrentTime(isNano: boolean, callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     *
     * @param { AsyncCallback<number> } callback - The callback of getCurrentTime
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getCurrentTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     *
     * @param { boolean } isNano - True if the result is in nanoseconds, otherwise in milliseconds
     * @returns { Promise<number> } The promise returned by the function
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getCurrentTime(isNano?: boolean): Promise<number>;
    /**
     * Obtains the number of timestamp that have elapsed since the Unix epoch.
     *
     * @param { boolean } [ isNanoseconds ] - True if the result is in nanoseconds, otherwise in milliseconds
     * @returns { number } The timestamp returned of getTime.
     * @syscap SystemCapability.MiscServices.Time
     * @since 10
     */
    function getTime(isNanoseconds?: boolean): number;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     *
     * @param { boolean } isNano - True if the result is in nanoseconds., otherwise in milliseconds
     * @param { AsyncCallback<number> } callback - The callback of getRealActiveTime
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getRealActiveTime(isNano: boolean, callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     *
     * @param { AsyncCallback<number> } callback - The callback of getRealActiveTime
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getRealActiveTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     *
     * @param { boolean } [isNano] - True if the result is in nanoseconds, otherwise in milliseconds
     * @returns { Promise<number> } The promise returned by the function
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getRealActiveTime(isNano?: boolean): Promise<number>;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     *
     * @param { boolean } isNano - True if the result is in nanoseconds, otherwise in milliseconds
     * @param { AsyncCallback<number> } callback - The callback of getRealTime
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getRealTime(isNano: boolean, callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     *
     * @param { AsyncCallback<number> } callback - The callback of getRealTime
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getRealTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     *
     * @param { boolean } [isNano] - True if the result is in nanoseconds, otherwise in milliseconds
     * @returns { Promise<number> } The promise returned by the function
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Incorrect parameter types;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 12
     */
    function getRealTime(isNano?: boolean): Promise<number>;
    /**
     * Indicates time type.
     *
     * @enum { number } TimeType
     * @syscap SystemCapability.MiscServices.Time
     * @since 10
     */
    enum TimeType {
        /**
         * Indicates the time elapsed since the system was booted, including deep sleep time.
         *
         * @syscap SystemCapability.MiscServices.Time
         * @since 10
         */
        STARTUP,
        /**
         * Indicates the time elapsed since the system was booted, not including deep sleep time.
         *
         * @syscap SystemCapability.MiscServices.Time
         * @since 10
         */
        ACTIVE
    }
    /**
     * Obtains the number of milliseconds since the system has been running.
     *
     * @param { TimeType } timeType - indicates the type of get uptime. It can only be `STARTUP` or `ACTIVE`.
     * @param { boolean } [ isNanoseconds ] - True if the result is in nanoseconds, otherwise in milliseconds
     * @returns { number } The timestamp returned of getUpTime.
     * @syscap SystemCapability.MiscServices.Time
     * @since 10
     */
    /**
     * Obtains the number of milliseconds since the system has been running.
     *
     * @param { TimeType } timeType - indicates the type of get uptime. It can only be `STARTUP` or `ACTIVE`.
     * @param { boolean } [ isNanoseconds ] - True if the result is in nanoseconds, otherwise in milliseconds
     * @returns { number } The timestamp returned of getUpTime.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types;
     *     3. Parameter verification failed. This error code was added due to missing issues.
     * @syscap SystemCapability.MiscServices.Time
     * @since 12
     */
    function getUptime(timeType: TimeType, isNanoseconds?: boolean): number;
    /**
     * Obtains the system date.
     *
     * @param { AsyncCallback<Date> } callback - The callback of getDate
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.System error;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 10
     * @useinstead new Date()
     */
    function getDate(callback: AsyncCallback<Date>): void;
    /**
     * Obtains the system date.
     *
     * @returns { Promise<Date> } The promise returned by the function
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.System error;
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     * @deprecated since 10
     * @useinstead new Date()
     */
    function getDate(): Promise<Date>;
    /**
     * Obtains the system time zone.
     *
     * @param { AsyncCallback<string> } callback - The callback of getTimezone
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.System error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     */
    /**
     * Obtains the system time zone.
     *
     * @param { AsyncCallback<string> } callback - The callback of getTimezone
     * @syscap SystemCapability.MiscServices.Time
     * @since 12
     */
    function getTimezone(callback: AsyncCallback<string>): void;
    /**
     * Obtains the system time zone.
     *
     * @returns { Promise<string> } The promise returned by the function
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.System error.
     * @syscap SystemCapability.MiscServices.Time
     * @since 9
     */
    /**
     * Obtains the system time zone.
     *
     * @returns { Promise<string> } The promise returned by the function
     * @syscap SystemCapability.MiscServices.Time
     * @since 12
     */
    function getTimezone(): Promise<string>;
    /**
     * Obtains the system time zone.
     *
     * @returns { string } The timezone returned of getTimezoneSync.
     * @syscap SystemCapability.MiscServices.Time
     * @since 10
     */
    function getTimezoneSync(): string;
}
export default systemDateTime;
