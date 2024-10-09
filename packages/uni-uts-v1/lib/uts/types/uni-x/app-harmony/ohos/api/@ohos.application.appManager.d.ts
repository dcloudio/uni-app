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
 */
import { AsyncCallback } from './@ohos.base';
import { ProcessRunningInfo } from './application/ProcessRunningInfo';
/**
 * This module provides the function of app manager service.
 *
 * @namespace appManager
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.app.ability.appManager/appManager
 */
declare namespace appManager {
    /**
     * Is user running in stability test.
     *
     * @param { AsyncCallback<boolean> } callback - Returns whether the current stability testing scenario is in progress.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#isRunningInStabilityTest
     */
    function isRunningInStabilityTest(callback: AsyncCallback<boolean>): void;
    /**
     * Is user running in stability test.
     *
     * @returns { Promise<boolean> } Returns true if user is running stability test.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#isRunningInStabilityTest
     */
    function isRunningInStabilityTest(): Promise<boolean>;
    /**
     * Get information about running processes
     *
     * @permission ohos.permission.GET_RUNNING_INFO
     * @returns { Promise<Array<ProcessRunningInfo>> } Returns the array of {@link ProcessRunningInfo}.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#getRunningProcessInformation
     */
    function getProcessRunningInfos(): Promise<Array<ProcessRunningInfo>>;
    /**
     * Get information about running processes
     *
     * @permission ohos.permission.GET_RUNNING_INFO
     * @param { AsyncCallback<Array<ProcessRunningInfo>> } callback - Obtain information about running processes.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#getRunningProcessInformation
     */
    function getProcessRunningInfos(callback: AsyncCallback<Array<ProcessRunningInfo>>): void;
    /**
     * Is it a ram-constrained device
     *
     * @returns { Promise<boolean> } whether a ram-constrained device.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#isRamConstrainedDevice
     */
    function isRamConstrainedDevice(): Promise<boolean>;
    /**
     * Is it a ram-constrained device
     *
     * @param { AsyncCallback<boolean> } callback - Returns whether the current device is a RAM restricted device.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#isRamConstrainedDevice
     */
    function isRamConstrainedDevice(callback: AsyncCallback<boolean>): void;
    /**
     * Get the memory size of the application
     *
     * @returns { Promise<number> } application memory size.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#getAppMemorySize
     */
    function getAppMemorySize(): Promise<number>;
    /**
     * Get the memory size of the application
     *
     * @param { AsyncCallback<number> } callback - application memory size in M.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.appManager/appManager#getAppMemorySize
     */
    function getAppMemorySize(callback: AsyncCallback<number>): void;
}
export default appManager;
