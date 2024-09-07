/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * This module provides the capability to monitor leakage of JS objects.
 *
 * @namespace jsLeakWatcher
 * @syscap SystemCapability.HiviewDFX.HiChecker
 * @since 12
 */
declare namespace jsLeakWatcher {
    /**
     * Enable or disable jsLeakWatcher.
     *
     * @param { boolean } isEnable - True is enable jsLeakWatcher, false is disable jsLeakWatcher.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function enable(isEnable: boolean): void;
    /**
     * Register an object that needs to be monitored.
     *
     * @param { object } obj - Object being monitored.
     * @param { string } msg - Customized object information.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function watch(obj: object, msg: string): void;
    /**
     * Check suspected leaked objects.
     *
     * @returns { string } List of suspected leaked objects in JSON format.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function check(): string;
    /**
     * Dump leak list and heap snapshot.
     *
     * @param { string } filePath - Directory for exporting files.
     * @returns { Array<string> } The array of exported results, index 0 is leakListFileName, index 1 is heapSnapShotFileName.
     * @throws { BusinessError } 401 - Parameter error. The filepath is invalid.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 12
     */
    function dump(filePath: string): Array<string>;
}
export default jsLeakWatcher;
