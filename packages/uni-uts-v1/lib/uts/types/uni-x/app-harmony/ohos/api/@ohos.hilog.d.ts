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
/**
* Provides interfaces to generate system logs.
*
* @namespace hilog
* @syscap SystemCapability.HiviewDFX.HiLog
* @since 7
*/
/**
* Provides interfaces to generate system logs.
*
* @namespace hilog
* @syscap SystemCapability.HiviewDFX.HiLog
* @crossplatform
* @since 10
*/
/**
* Provides interfaces to generate system logs.
*
* @namespace hilog
* @syscap SystemCapability.HiviewDFX.HiLog
* @crossplatform
* @atomicservice
* @since 11
*/
declare namespace hilog {
    /**
     * Outputs debug-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @since 7
     */
    /**
     * Outputs debug-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @since 10
     */
    /**
     * Outputs debug-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function debug(domain: number, tag: string, format: string, ...args: any[]): void;
    /**
     * Outputs info-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @since 7
     */
    /**
     * Outputs info-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @since 10
     */
    /**
     * Outputs info-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function info(domain: number, tag: string, format: string, ...args: any[]): void;
    /**
     * Outputs warning-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @since 7
     */
    /**
     * Outputs warning-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @since 10
     */
    /**
     * Outputs warning-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function warn(domain: number, tag: string, format: string, ...args: any[]): void;
    /**
     * Outputs error-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @since 7
     */
    /**
     * Outputs error-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @since 10
     */
    /**
     * Outputs error-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function error(domain: number, tag: string, format: string, ...args: any[]): void;
    /**
     * Outputs fatal-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @since 7
     */
    /**
     * Outputs fatal-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @since 10
     */
    /**
     * Outputs fatal-level logs.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { string } format Indicates the log format string.
     * @param { any[] }args Indicates the log parameters.
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function fatal(domain: number, tag: string, format: string, ...args: any[]): void;
    /**
     * Checks whether logs of the specified tag, and level can be printed.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { LogLevel } level log level
     * @returns { boolean }
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @since 7
     */
    /**
     * Checks whether logs of the specified tag, and level can be printed.
     *
     * @param { number } domain Indicates the service domain, which is a hexadecimal integer ranging from 0x0 to 0xFFFF
     * @param { string } tag Identifies the log tag, length cannot exceed 32 bytes.
     * @param { LogLevel } level log level
     * @returns { boolean }
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @atomicservice
     * @since 11
     */
    function isLoggable(domain: number, tag: string, level: LogLevel): boolean;
    /**
     * Log level define
     *
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @since 7
     */
    /**
     * Log level define
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @since 10
     */
    /**
     * Log level define
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiLog
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enum LogLevel {
        /**
         * DEBUG Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @since 7
         */
        /**
         * DEBUG Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @since 10
         */
        /**
         * DEBUG Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        DEBUG = 3,
        /**
         * INFO Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @since 7
         */
        /**
         * INFO Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @since 10
         */
        /**
         * INFO Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        INFO = 4,
        /**
         * WARN Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @since 7
         */
        /**
         * WARN Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @since 10
         */
        /**
         * WARN Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        WARN = 5,
        /**
         * ERROR Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @since 7
         */
        /**
         * ERROR Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @since 10
         */
        /**
         * ERROR Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        ERROR = 6,
        /**
         * FATAL Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @since 7
         */
        /**
         * FATAL Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @since 10
         */
        /**
         * FATAL Log level define
         *
         * @syscap SystemCapability.HiviewDFX.HiLog
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        FATAL = 7
    }
}
export default hilog;
