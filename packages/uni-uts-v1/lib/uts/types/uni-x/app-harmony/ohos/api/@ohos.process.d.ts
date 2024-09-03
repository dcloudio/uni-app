/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * @kit ArkTS
 */
/**
 * The process is mainly used to obtain the relevant ID of the process, obtain and modify
 * the working directory of the process, exit and close the process.
 *
 * @namespace process
 * @syscap SystemCapability.Utils.Lang
 * @since 7
 */
/**
 * The process is mainly used to obtain the relevant ID of the process, obtain and modify
 * the working directory of the process, exit and close the process.
 *
 * @namespace process
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @since 10
 */
/**
 * The process is mainly used to obtain the relevant ID of the process, obtain and modify
 * the working directory of the process, exit and close the process.
 *
 * @namespace process
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace process {
    /**
     * Process is mainly used to obtain the relevant ID of the process, obtain and modify the
     * working directory of the process, exit and close the process.
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 9
     * @name ProcessManager
     */
    /**
     * Process is mainly used to obtain the relevant ID of the process, obtain and modify the
     * working directory of the process, exit and close the process.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     * @name ProcessManager
     */
    /**
     * Process is mainly used to obtain the relevant ID of the process, obtain and modify the
     * working directory of the process, exit and close the process.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     * @name ProcessManager
     */
    export class ProcessManager {
        /**
         * Returns a boolean whether the specified uid belongs to a particular application.
         *
         * @param { number } v - An id.
         * @returns { boolean } Return a boolean whether the specified uid belongs to a particular application.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Returns a boolean whether the specified uid belongs to a particular application.
         *
         * @param { number } v - An id.
         * @returns { boolean } Return a boolean whether the specified uid belongs to a particular application.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Returns a boolean whether the specified uid belongs to a particular application.
         *
         * @param { number } v - An id.
         * @returns { boolean } Return a boolean whether the specified uid belongs to a particular application.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        isAppUid(v: number): boolean;
        /**
         * Returns the uid based on the specified user name.
         *
         * @param { string } v - Process name.
         * @returns { number } Return the uid based on the specified user name.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Returns the uid based on the specified user name.
         *
         * @param { string } v - Process name.
         * @returns { number } Return the uid based on the specified user name.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Returns the uid based on the specified user name.
         *
         * @param { string } v - Process name.
         * @returns { number } Return the uid based on the specified user name.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getUidForName(v: string): number;
        /**
         * Returns the thread priority based on the specified tid.
         *
         * @param { number } v - The tid of the process.
         * @returns { number } Return the thread priority based on the specified tid.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Returns the thread priority based on the specified tid.
         *
         * @param { number } v - The tid of the process.
         * @returns { number } Return the thread priority based on the specified tid.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Returns the thread priority based on the specified tid.
         *
         * @param { number } v - The tid of the process.
         * @returns { number } Return the thread priority based on the specified tid.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getThreadPriority(v: number): number;
        /**
         * Returns the system configuration at runtime.
         *
         * @param { number } name - Parameters defined by the system configuration.
         * @returns { number } Return the system configuration at runtime.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Returns the system configuration at runtime.
         *
         * @param { number } name - Parameters defined by the system configuration.
         * @returns { number } Return the system configuration at runtime.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Returns the system configuration at runtime.
         *
         * @param { number } name - Parameters defined by the system configuration.
         * @returns { number } Return the system configuration at runtime.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getSystemConfig(name: number): number;
        /**
         * Returns the system value for environment variables.
         *
         * @param { string } name - Parameters defined by the system environment variables.
         * @returns { string } Return the system value for environment variables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Returns the system value for environment variables.
         *
         * @param { string } name - Parameters defined by the system environment variables.
         * @returns { string } Return the system value for environment variables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Returns the system value for environment variables.
         *
         * @param { string } name - Parameters defined by the system environment variables.
         * @returns { string } Return the system value for environment variables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        getEnvironmentVar(name: string): string;
        /**
         * Process exit
         *
         * @param { number } code - Process exit code.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Process exit
         *
         * @param { number } code - Process exit code.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Process exit
         *
         * @param { number } code - Process exit code.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        exit(code: number): void;
        /**
         * Return whether the signal was sent successfully
         *
         * @param { number } signal - Signal sent.
         * @param { number } pid - Send signal to target pid.
         * @returns { boolean } Return the result of the signal.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @since 9
         */
        /**
         * Return whether the signal was sent successfully
         *
         * @param { number } signal - Signal sent.
         * @param { number } pid - Send signal to target pid.
         * @returns { boolean } Return the result of the signal.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @since 10
         */
        /**
         * Return whether the signal was sent successfully
         *
         * @param { number } signal - Signal sent.
         * @param { number } pid - Send signal to target pid.
         * @returns { boolean } Return the result of the signal.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * 1.Mandatory parameters are left unspecified;
         * 2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        kill(signal: number, pid: number): boolean;
    }
    /**
     * Returns the digital user id of the process
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @since 7
     */
    /**
     * Returns the digital user id of the process
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns the digital user id of the process
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    const uid: number;
    /**
     * Return pid is The pid of the current process
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @since 7
     */
    /**
     * Return pid is The pid of the current process
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Return pid is The pid of the current process
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    const pid: number;
    /**
     * Returns the tid of the current thread.
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns the tid of the current thread.
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns the tid of the current thread.
     *
     * @constant
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    const tid: number;
    /**
     * Returns a boolean whether the process is isolated.
     *
     * @returns { boolean } Return boolean whether the process is isolated.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a boolean whether the process is isolated.
     *
     * @returns { boolean } Return boolean whether the process is isolated.
     * @syscap SystemCapability.Utils.Lang
     * @atomicservice
     * @since 11
     */
    function isIsolatedProcess(): boolean;
    /**
     * Returns a boolean whether the specified uid belongs to a particular application.
     *
     * @param { number } v - An id.
     * @returns { boolean } Return a boolean whether the specified uid belongs to a particular application.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.process.ProcessManager.isAppUid
     */
    function isAppUid(v: number): boolean;
    /**
     * Returns a boolean whether the process is running in a 64-bit environment.
     *
     * @returns { boolean } Return a boolean whether the process is running in a 64-bit environment.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns a boolean whether the process is running in a 64-bit environment.
     *
     * @returns { boolean } Return a boolean whether the process is running in a 64-bit environment.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns a boolean whether the process is running in a 64-bit environment.
     *
     * @returns { boolean } Return a boolean whether the process is running in a 64-bit environment.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function is64Bit(): boolean;
    /**
     * Returns the uid based on the specified user name.
     *
     * @param { string } v - Process name.
     * @returns { number } Return the uid based on the specified user name.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.process.ProcessManager.getUidForName
     */
    function getUidForName(v: string): number;
    /**
     * Returns the thread priority based on the specified tid.
     *
     * @param { number } v - The tid of the process.
     * @returns { number } Return the thread priority based on the specified tid.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.process.ProcessManager.getThreadPriority
     */
    function getThreadPriority(v: number): number;
    /**
     * Returns the elapsed real time (in milliseconds) taken from the start of the system to the start of the process.
     *
     * @returns { number } Return the start of the system to the start of the process.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns the elapsed real time (in milliseconds) taken from the start of the system to the start of the process.
     *
     * @returns { number } Return the start of the system to the start of the process.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns the elapsed real time (in milliseconds) taken from the start of the system to the start of the process.
     *
     * @returns { number } Return the start of the system to the start of the process.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getStartRealtime(): number;
    /**
     * Returns the cpu time (in milliseconds) from the time when the process starts to the current time.
     *
     * @returns { number } Return the cpu time (in milliseconds) from the time when the process starts to the current time.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     */
    /**
     * Returns the cpu time (in milliseconds) from the time when the process starts to the current time.
     *
     * @returns { number } Return the cpu time (in milliseconds) from the time when the process starts to the current time.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns the cpu time (in milliseconds) from the time when the process starts to the current time.
     *
     * @returns { number } Return the cpu time (in milliseconds) from the time when the process starts to the current time.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getPastCpuTime(): number;
    /**
     * Returns the system configuration at runtime.
     *
     * @param { number } name - Parameters defined by the system configuration.
     * @returns { number } Return the system configuration at runtime.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.process.ProcessManager.getSystemConfig
     */
    function getSystemConfig(name: number): number;
    /**
     * Returns the system value for environment variables.
     *
     * @param { string } name - Parameters defined by the system environment variables.
     * @returns { string } Return the system value for environment variables.
     * @syscap SystemCapability.Utils.Lang
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.process.ProcessManager.getEnvironmentVar
     */
    function getEnvironmentVar(name: string): string;
    /**
     * User Stored Events
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 7
     */
    /**
     * User Stored Events
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * User Stored Events
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * User Stored Events
     *
     * @typedef { function } EventListener
     * @param { Object } evt - User events
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type EventListener = (evt: Object) => void;
    /**
     * Abort current process
     *
     * @syscap SystemCapability.Utils.Lang
     * @since 7
     */
    /**
     * Abort current process
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Abort current process
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function abort(): void;
    /**
     * Process exit
     *
     * @param { number } code - Process exit code.
     * @syscap SystemCapability.Utils.Lang
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.process.ProcessManager.exit
     */
    function exit(code: number): void;
    /**
     * Returns the running time of the system
     *
     * @returns { number } Return the running time of the system.
     * @syscap SystemCapability.Utils.Lang
     * @since 7
     */
    /**
     * Returns the running time of the system
     *
     * @returns { number } Return the running time of the system.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @since 10
     */
    /**
     * Returns the running time of the system
     *
     * @returns { number } Return the running time of the system.
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function uptime(): number;
    /**
     * Return whether the signal was sent successfully
     *
     * @param { number } signal - Signal sent.
     * @param { number } pid - Send signal to target pid.
     * @returns { boolean } Return the result of the signal.
     * @syscap SystemCapability.Utils.Lang
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.process.ProcessManager.kill
     */
    function kill(signal: number, pid: number): boolean;
}
export default process;
