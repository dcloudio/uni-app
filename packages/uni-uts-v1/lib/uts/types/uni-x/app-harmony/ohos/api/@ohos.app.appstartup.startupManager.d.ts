/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
 * @kit AbilityKit
 */
import StartupConfig from './@ohos.app.appstartup.StartupConfig';
/**
 * Startup task manager.
 *
 * @namespace startupManager
 * @syscap SystemCapability.Ability.AppStartup
 * @stagemodelonly
 * @since 12
 */
declare namespace startupManager {
    /**
     * Runs startup tasks.
     *
     * @param { Array<string> } startupTasks - Indicates all tasks ready to run.
     * @param { StartupConfig } [config] - Indicates the configuration of startup tasks.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 28800001 - Startup task or its dependency not found.
     * @throws { BusinessError } 28800002 - The startup tasks have circular dependencies.
     * @throws { BusinessError } 28800003 - An error occurred while running the startup tasks.
     * @throws { BusinessError } 28800004 - Running startup tasks timeout.
     *
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    function run(startupTasks: Array<string>, config?: StartupConfig): Promise<void>;
    /**
     * Removes all startup tasks result.
     *
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    function removeAllStartupTaskResults(): void;
    /**
     * Obtains specific startup task result.
     *
     * @param { string } startupTask - Indicates name of specific startup task.
     * @returns { Object } The result of specific startup task.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    function getStartupTaskResult(startupTask: string): Object;
    /**
     * Obtains whether specific startup task has already been initialized.
     *
     * @param { string } startupTask - Indicates name of specific startup task.
     * @returns { boolean } Whether specific startup task has already been initialized.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    function isStartupTaskInitialized(startupTask: string): boolean;
    /**
     * Removes specific startup task result.
     *
     * @param { string } startupTask - Indicates name of specific startup task.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    function removeStartupTaskResult(startupTask: string): void;
}
export default startupManager;
