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
 * @kit AbilityKit
 */
import { AsyncCallback } from '../@ohos.base';
import UIAbility from '../@ohos.app.ability.UIAbility';
import AbilityStage from '../@ohos.app.ability.AbilityStage';
import { AbilityMonitor } from './AbilityMonitor';
import { AbilityStageMonitor } from './AbilityStageMonitor';
import Context from './Context';
import Want from '../@ohos.app.ability.Want';
import { ShellCmdResult } from './shellCmdResult';
/**
 * A global test utility interface used for adding AbilityMonitor objects and control lifecycle states of abilities.
 *
 * @interface AbilityDelegator
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
/**
 * A global test utility interface used for adding AbilityMonitor objects and control lifecycle states of abilities.
 *
 * @interface AbilityDelegator
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @since 10
 */
/**
 * A global test utility interface used for adding AbilityMonitor objects and control lifecycle states of abilities.
 *
 * @interface AbilityDelegator
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface AbilityDelegator {
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object
     * @param { AsyncCallback<void> } callback - The callback of addAbilityMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object
     * @param { AsyncCallback<void> } callback - The callback of addAbilityMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object
     * @param { AsyncCallback<void> } callback - The callback of addAbilityMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    addAbilityMonitor(monitor: AbilityMonitor, callback: AsyncCallback<void>): void;
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    addAbilityMonitor(monitor: AbilityMonitor): Promise<void>;
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Add an AbilityMonitor object for monitoring the lifecycle state changes of the specified ability in this process.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    addAbilityMonitorSync(monitor: AbilityMonitor): void;
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of addAbilityStageMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of addAbilityStageMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of addAbilityStageMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    addAbilityStageMonitor(monitor: AbilityStageMonitor, callback: AsyncCallback<void>): void;
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    addAbilityStageMonitor(monitor: AbilityStageMonitor): Promise<void>;
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Add an AbilityStageMonitor object for monitoring the lifecycle state changes of the specified abilityStage in this process.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - AddAbilityStageMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    addAbilityStageMonitorSync(monitor: AbilityStageMonitor): void;
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of removeAbilityMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of removeAbilityMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of removeAbilityMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    removeAbilityMonitor(monitor: AbilityMonitor, callback: AsyncCallback<void>): void;
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    removeAbilityMonitor(monitor: AbilityMonitor): Promise<void>;
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Remove a specified AbilityMonitor object from the application memory.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    removeAbilityMonitorSync(monitor: AbilityMonitor): void;
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of removeAbilityStageMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of removeAbilityStageMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<void> } callback - The callback of removeAbilityStageMonitor.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    removeAbilityStageMonitor(monitor: AbilityStageMonitor, callback: AsyncCallback<void>): void;
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    removeAbilityStageMonitor(monitor: AbilityStageMonitor): Promise<void>;
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Remove a specified AbilityStageMonitor object from the application memory.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - RemoveAbilityStageMonitorSync failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    removeAbilityStageMonitorSync(monitor: AbilityStageMonitor): void;
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    waitAbilityMonitor(monitor: AbilityMonitor, callback: AsyncCallback<UIAbility>): void;
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { number } timeout - Maximum wait time, in milliseconds.
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { number } timeout - Maximum wait time, in milliseconds.
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { number } timeout - Maximum wait time, in milliseconds.
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    waitAbilityMonitor(monitor: AbilityMonitor, timeout: number, callback: AsyncCallback<UIAbility>): void;
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { number } [timeout] - Maximum wait time, in milliseconds.
     * @returns { Promise<UIAbility> } Returns the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { number } [timeout] - Maximum wait time, in milliseconds.
     * @returns { Promise<UIAbility> } Returns the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Wait for and returns the Ability object that matches the conditions set in the given AbilityMonitor.
     *
     * @param { AbilityMonitor } monitor - AbilityMonitor object.
     * @param { number } [timeout] - Maximum wait time, in milliseconds.
     * @returns { Promise<UIAbility> } Returns the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    waitAbilityMonitor(monitor: AbilityMonitor, timeout?: number): Promise<UIAbility>;
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<AbilityStage> } callback - The callback is used to return the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<AbilityStage> } callback - The callback is used to return the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { AsyncCallback<AbilityStage> } callback - The callback is used to return the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    waitAbilityStageMonitor(monitor: AbilityStageMonitor, callback: AsyncCallback<AbilityStage>): void;
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { number } timeout - Maximum wait time, in milliseconds.
     * @param { AsyncCallback<AbilityStage> } callback - The callback is used to return the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { number } timeout - Maximum wait time, in milliseconds.
     * @param { AsyncCallback<AbilityStage> } callback - The callback is used to return the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { number } timeout - Maximum wait time, in milliseconds.
     * @param { AsyncCallback<AbilityStage> } callback - The callback is used to return the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    waitAbilityStageMonitor(monitor: AbilityStageMonitor, timeout: number, callback: AsyncCallback<AbilityStage>): void;
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { number } [timeout] - Maximum wait time, in milliseconds.
     * @returns { Promise<AbilityStage> } Returns the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { number } [timeout] - Maximum wait time, in milliseconds.
     * @returns { Promise<AbilityStage> } Returns the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Wait for and returns the AbilityStage object that matches the conditions set in the given AbilityStageMonitor.
     *
     * @param { AbilityStageMonitor } monitor - AbilityStageMonitor object.
     * @param { number } [timeout] - Maximum wait time, in milliseconds.
     * @returns { Promise<AbilityStage> } Returns the AbilityStage object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - WaitAbilityStageMonitor failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    waitAbilityStageMonitor(monitor: AbilityStageMonitor, timeout?: number): Promise<AbilityStage>;
    /**
     * Obtain the application context.
     *
     * @returns { Context } Returns the app Context.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Obtain the application context.
     *
     * @returns { Context } Returns the app Context.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtain the application context.
     *
     * @returns { Context } Returns the app Context.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getAppContext(): Context;
    /**
     * Obtain the lifecycle state of a specified ability.
     *
     * @param { UIAbility } ability - The Ability object.
     * @returns { number } Returns the state of the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Obtain the lifecycle state of a specified ability.
     *
     * @param { UIAbility } ability - The Ability object.
     * @returns { number } Returns the state of the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtain the lifecycle state of a specified ability.
     *
     * @param { UIAbility } ability - The Ability object.
     * @returns { number } Returns the state of the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getAbilityState(ability: UIAbility): number;
    /**
     * Obtain the ability that is currently being displayed in this process.
     *
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - GetCurrentTopAbility failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Obtain the ability that is currently being displayed in this process.
     *
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - GetCurrentTopAbility failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtain the ability that is currently being displayed in this process.
     *
     * @param { AsyncCallback<UIAbility> } callback - The callback is used to return the Ability object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - GetCurrentTopAbility failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getCurrentTopAbility(callback: AsyncCallback<UIAbility>): void;
    /**
     * Obtain the ability that is currently being displayed in this process.
     *
     * @returns { Promise<UIAbility> } Returns the Ability object.
     * @throws { BusinessError } 16000100 - GetCurrentTopAbility failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Obtain the ability that is currently being displayed in this process.
     *
     * @returns { Promise<UIAbility> } Returns the Ability object.
     * @throws { BusinessError } 16000100 - GetCurrentTopAbility failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtain the ability that is currently being displayed in this process.
     *
     * @returns { Promise<UIAbility> } Returns the Ability object.
     * @throws { BusinessError } 16000100 - GetCurrentTopAbility failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getCurrentTopAbility(): Promise<UIAbility>;
    /**
     * Start a new ability.
     *
     * @param { Want } want - Indicates the ability to start
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000005 - The specified process does not have the permission.
     * @throws { BusinessError } 16000006 - Cross-user operations are not allowed.
     * @throws { BusinessError } 16000008 - The crowdtesting application expires.
     * @throws { BusinessError } 16000009 - An ability cannot be started or stopped in Wukong mode.
     * @throws { BusinessError } 16000010 - The call with the continuation flag is forbidden.
     * @throws { BusinessError } 16000011 - The context does not exist.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000053 - The ability is not on the top of the UI.
     * @throws { BusinessError } 16000055 - Installation-free timed out.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Start a new ability.
     *
     * @param { Want } want - Indicates the ability to start
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000005 - The specified process does not have the permission.
     * @throws { BusinessError } 16000006 - Cross-user operations are not allowed.
     * @throws { BusinessError } 16000008 - The crowdtesting application expires.
     * @throws { BusinessError } 16000009 - An ability cannot be started or stopped in Wukong mode.
     * @throws { BusinessError } 16000010 - The call with the continuation flag is forbidden.
     * @throws { BusinessError } 16000011 - The context does not exist.
     * @throws { BusinessError } 16000012 - The application is controlled.
     * @throws { BusinessError } 16000013 - The application is controlled by EDM.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000053 - The ability is not on the top of the UI.
     * @throws { BusinessError } 16000055 - Installation-free timed out.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Start a new ability.
     *
     * @param { Want } want - Indicates the ability to start
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000005 - The specified process does not have the permission.
     * @throws { BusinessError } 16000006 - Cross-user operations are not allowed.
     * @throws { BusinessError } 16000008 - The crowdtesting application expires.
     * @throws { BusinessError } 16000009 - An ability cannot be started or stopped in Wukong mode.
     * @throws { BusinessError } 16000010 - The call with the continuation flag is forbidden.
     * @throws { BusinessError } 16000011 - The context does not exist.
     * @throws { BusinessError } 16000012 - The application is controlled.
     * @throws { BusinessError } 16000013 - The application is controlled by EDM.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000053 - The ability is not on the top of the UI.
     * @throws { BusinessError } 16000055 - Installation-free timed out.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    startAbility(want: Want, callback: AsyncCallback<void>): void;
    /**
     * Start a new ability.
     *
     * @param { Want } want - Indicates the ability to start
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000005 - The specified process does not have the permission.
     * @throws { BusinessError } 16000006 - Cross-user operations are not allowed.
     * @throws { BusinessError } 16000008 - The crowdtesting application expires.
     * @throws { BusinessError } 16000009 - An ability cannot be started or stopped in Wukong mode.
     * @throws { BusinessError } 16000010 - The call with the continuation flag is forbidden.
     * @throws { BusinessError } 16000011 - The context does not exist.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000053 - The ability is not on the top of the UI.
     * @throws { BusinessError } 16000055 - Installation-free timed out.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Start a new ability.
     *
     * @param { Want } want - Indicates the ability to start
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000005 - The specified process does not have the permission.
     * @throws { BusinessError } 16000006 - Cross-user operations are not allowed.
     * @throws { BusinessError } 16000008 - The crowdtesting application expires.
     * @throws { BusinessError } 16000009 - An ability cannot be started or stopped in Wukong mode.
     * @throws { BusinessError } 16000010 - The call with the continuation flag is forbidden.
     * @throws { BusinessError } 16000011 - The context does not exist.
     * @throws { BusinessError } 16000012 - The application is controlled.
     * @throws { BusinessError } 16000013 - The application is controlled by EDM.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000053 - The ability is not on the top of the UI.
     * @throws { BusinessError } 16000055 - Installation-free timed out.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Start a new ability.
     *
     * @param { Want } want - Indicates the ability to start
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000001 - The specified ability does not exist.
     * @throws { BusinessError } 16000002 - Incorrect ability type.
     * @throws { BusinessError } 16000004 - Can not start invisible component.
     * @throws { BusinessError } 16000005 - The specified process does not have the permission.
     * @throws { BusinessError } 16000006 - Cross-user operations are not allowed.
     * @throws { BusinessError } 16000008 - The crowdtesting application expires.
     * @throws { BusinessError } 16000009 - An ability cannot be started or stopped in Wukong mode.
     * @throws { BusinessError } 16000010 - The call with the continuation flag is forbidden.
     * @throws { BusinessError } 16000011 - The context does not exist.
     * @throws { BusinessError } 16000012 - The application is controlled.
     * @throws { BusinessError } 16000013 - The application is controlled by EDM.
     * @throws { BusinessError } 16000050 - Internal error.
     * @throws { BusinessError } 16000053 - The ability is not on the top of the UI.
     * @throws { BusinessError } 16000055 - Installation-free timed out.
     * @throws { BusinessError } 16200001 - The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    startAbility(want: Want): Promise<void>;
    /**
     * Invoke the Ability.onForeground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @param { AsyncCallback<void> } callback - The callback of doAbilityForeground.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityForeground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Invoke the Ability.onForeground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @param { AsyncCallback<void> } callback - The callback of doAbilityForeground.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityForeground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Invoke the Ability.onForeground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @param { AsyncCallback<void> } callback - The callback of doAbilityForeground.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityForeground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    doAbilityForeground(ability: UIAbility, callback: AsyncCallback<void>): void;
    /**
     * Invoke the Ability.onForeground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityForeground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Invoke the Ability.onForeground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityForeground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Invoke the Ability.onForeground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityForeground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    doAbilityForeground(ability: UIAbility): Promise<void>;
    /**
     * Invoke the Ability.onBackground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @param { AsyncCallback<void> } callback - The callback of doAbilityBackground.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityBackground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Invoke the Ability.onBackground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @param { AsyncCallback<void> } callback - The callback of doAbilityBackground.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityBackground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Invoke the Ability.onBackground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @param { AsyncCallback<void> } callback - The callback of doAbilityBackground.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityBackground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    doAbilityBackground(ability: UIAbility, callback: AsyncCallback<void>): void;
    /**
     * Invoke the Ability.onBackground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityBackground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Invoke the Ability.onBackground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityBackground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Invoke the Ability.onBackground() callback of a specified ability without changing its lifecycle state.
     *
     * @param { UIAbility } ability - The ability object.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - DoAbilityBackground failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    doAbilityBackground(ability: UIAbility): Promise<void>;
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information
     * @param { AsyncCallback<void> } callback - The callback of print.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information
     * @param { AsyncCallback<void> } callback - The callback of print.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information
     * @param { AsyncCallback<void> } callback - The callback of print.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    print(msg: string, callback: AsyncCallback<void>): void;
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    print(msg: string): Promise<void>;
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Prints log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    printSync(msg: string): void;
    /**
     * Execute the given command in the aa tools side.
     *
     * @param { string } cmd - Shell command
     * @param { AsyncCallback<ShellCmdResult> } callback - The callback of executeShellCommand.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * Execute the given command in the aa tools side.
     *
     * @param { string } cmd - Shell command
     * @param { AsyncCallback<ShellCmdResult> } callback - The callback of executeShellCommand.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    executeShellCommand(cmd: string, callback: AsyncCallback<ShellCmdResult>): void;
    /**
     * Execute the given command in the aa tools side.
     *
     * @param { string } cmd - Shell command
     * @param { number } timeoutSecs - Timeout, in seconds
     * @param { AsyncCallback<ShellCmdResult> } callback - The callback of executeShellCommand.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * Execute the given command in the aa tools side.
     *
     * @param { string } cmd - Shell command
     * @param { number } timeoutSecs - Timeout, in seconds
     * @param { AsyncCallback<ShellCmdResult> } callback - The callback of executeShellCommand.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    executeShellCommand(cmd: string, timeoutSecs: number, callback: AsyncCallback<ShellCmdResult>): void;
    /**
     * Execute the given command in the aa tools side.
     *
     * @param { string } cmd - Shell command
     * @param { number } [timeoutSecs] - Timeout, in seconds
     * @returns { Promise<ShellCmdResult> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * Execute the given command in the aa tools side.
     *
     * @param { string } cmd - Shell command
     * @param { number } [timeoutSecs] - Timeout, in seconds
     * @returns { Promise<ShellCmdResult> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    executeShellCommand(cmd: string, timeoutSecs?: number): Promise<ShellCmdResult>;
    /**
     * Finish the test and print log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @param { number } code - Result code.
     * @param { AsyncCallback<void> } callback - The callback of finishTest.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - FinishTest failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Finish the test and print log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @param { number } code - Result code.
     * @param { AsyncCallback<void> } callback - The callback of finishTest.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - FinishTest failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Finish the test and print log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @param { number } code - Result code.
     * @param { AsyncCallback<void> } callback - The callback of finishTest.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - FinishTest failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    finishTest(msg: string, code: number, callback: AsyncCallback<void>): void;
    /**
     * Finish the test and print log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @param { number } code - Result code.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - FinishTest failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Finish the test and print log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @param { number } code - Result code.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - FinishTest failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Finish the test and print log information to the unit testing console.
     * The total length of the log information to be printed cannot exceed 1000 characters.
     *
     * @param { string } msg - Log information.
     * @param { number } code - Result code.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000100 - FinishTest failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    finishTest(msg: string, code: number): Promise<void>;
    /**
     * Used to set a list of mock data.
     * @param { Record<string, string> } mockList - An object with string keys and string values. The keys represent the
     *                                              target path to be replaced and the values represent the path of the
     *                                              mock implementation to be used for the replacement.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    setMockList(mockList: Record<string, string>): void;
}
export default AbilityDelegator;
