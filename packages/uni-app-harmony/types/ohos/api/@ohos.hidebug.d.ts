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
 * @kit PerformanceAnalysisKit
 */
/**
 * Provide interfaces related to debugger access and obtaining CPU,
 * memory and other virtual machine information during runtime for JS programs
 *
 * @namespace hidebug
 * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
 * @since 8
 */
declare namespace hidebug {
    /**
     * Get total native heap memory size
     *
     * @returns { bigint } Returns total native heap memory size.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     */
    function getNativeHeapSize(): bigint;
    /**
     * Get Native heap memory allocation size.
     * @returns { bigint } Returns native heap memory allocation size.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     */
    function getNativeHeapAllocatedSize(): bigint;
    /**
     * Get Native heap memory free size
     *
     * @returns { bigint } Returns native heap memory free size.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     */
    function getNativeHeapFreeSize(): bigint;
    /**
     * Get the virtual set size memory of the application process
     * @returns { bigint } Returns application process virtual set size memory information.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 11
     */
    function getVss(): bigint;
    /**
     * Get application process proportional set size memory information
     *
     * @returns { bigint } Returns application process proportional set size memory information.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     */
    function getPss(): bigint;
    /**
     * Obtains the size of the shared dirty memory of a process.
     *
     * @returns { bigint } Returns the size of the shared dirty memory.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     */
    function getSharedDirty(): bigint;
    /**
     * Obtains the size of the private dirty memory of a process.
     * @returns { bigint } Returns the size of the private dirty memory.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 9
     */
    function getPrivateDirty(): bigint;
    /**
     * Obtains the cpu usage percent of a process.
     *
     * @returns { number } Returns the cpu usage of a process.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 9
     */
    function getCpuUsage(): number;
    /**
     * Start CPU Profiling.
     * The input parameter is a user-defined file name, excluding the file suffix.
     * The generated file is in the files folder under the application directory.
     * Such as "/data/accounts/account_0/appdata/[package name]/files/cpuprofiler-xxx.json"
     *
     * @param { string } filename - Indicates the user-defined file name,  excluding the file suffix.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.hidebug/hidebug.startJsCpuProfiling
     */
    function startProfiling(filename: string): void;
    /**
     * Stop CPU Profiling.
     * It takes effect only when the CPU profiler is turned on
     *
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.hidebug/hidebug.stopJsCpuProfiling
     */
    function stopProfiling(): void;
    /**
     * Dump JS Virtual Machine Heap Snapshot.
     * The input parameter is a user-defined file name, excluding the file suffix.
     * The generated file is in the files folder under the application directory.
     * Such as "/data/accounts/account_0/appdata/[package name]/files/xxx.heapsnapshot"
     *
     * @param { string } filename - Indicates the user-defined file name, excluding the file suffix.
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.hidebug/hidebug.dumpJsHeapData
     */
    function dumpHeapData(filename: string): void;
    /**
     * Start CPU Profiling.
     * The input parameter is a user-defined file name, excluding the file suffix.
     * The generated file is in the files folder under the application directory.
     *
     * @param { string } filename - Indicates the user-defined file name,  excluding the file suffix.
     * @throws {BusinessError} 401 - the parameter check failed
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 9
     */
    function startJsCpuProfiling(filename: string): void;
    /**
     * Stop CPU Profiling.
     * It takes effect only when the CPU profiler is turned on
     *
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 9
     */
    function stopJsCpuProfiling(): void;
    /**
     * Dump JS Virtual Machine Heap Snapshot.
     * The input parameter is a user-defined file name, excluding the file suffix.
     * The generated file is in the files folder under the application directory.
     *
     * @param { string } filename - Indicates the user-defined file name, excluding the file suffix.
     * @throws {BusinessError} 401 - the parameter check failed
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 9
     */
    function dumpJsHeapData(filename: string): void;
    /**
     * Get a debugging dump of a system service by service id.
     * It need dump permission.
     *
     * @permission ohos.permission.DUMP
     * @param { number } serviceid - Indicates the id of the service ability.
     * @param { number } fd - The file descriptor.
     * @param { Array<string> } args - The args list of the system ability dump interface.
     * @throws {BusinessError} 401 - the parameter check failed
     * @throws {BusinessError} 11400101 - the service id is invalid
     * @syscap SystemCapability.HiviewDFX.HiProfiler.HiDebug
     * @since 9
     */
    function getServiceDump(serviceid: number, fd: number, args: Array<string>): void;
}
export default hidebug;
