/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { AsyncCallback } from './@ohos.base';
import * as _ErrorObserver from './application/ErrorObserver';
/**
 * This module provides the function of error manager.
 *
 * @namespace errorManager
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
/**
 * This module provides the function of error manager.
 *
 * @namespace errorManager
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @atomicservice
 * @since 11
 */
declare namespace errorManager {
    /**
     * Register error observer.
     *
     * @param { 'error' } type - error.
     * @param { ErrorObserver } observer - The error observer.
     * @returns { number } Returns the number code of the observer.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @throws { BusinessError } 16000003 - Id does not exist.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Register error observer.
     *
     * @param { 'error' } type - error.
     * @param { ErrorObserver } observer - The error observer.
     * @returns { number } Returns the number code of the observer.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @throws { BusinessError } 16000003 - Id does not exist.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    function on(type: 'error', observer: ErrorObserver): number;
    /**
     * Unregister error observer.
     *
     * @param { 'error' } type - error.
     * @param { number } observerId - Indicates the number code of the observer.
     * @param { AsyncCallback<void> } callback - The callback of off.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @throws { BusinessError } 16000003 - Id does not exist.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Unregister error observer.
     *
     * @param { 'error' } type - error.
     * @param { number } observerId - Indicates the number code of the observer.
     * @param { AsyncCallback<void> } callback - The callback of off.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @throws { BusinessError } 16000003 - Id does not exist.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    function off(type: 'error', observerId: number, callback: AsyncCallback<void>): void;
    /**
     * Unregister error observer.
     *
     * @param { 'error' } type - error.
     * @param { number } observerId - Indicates the number code of the observer.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @throws { BusinessError } 16000003 - Id does not exist.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Unregister error observer.
     *
     * @param { 'error' } type - error.
     * @param { number } observerId - Indicates the number code of the observer.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @throws { BusinessError } 16000003 - Id does not exist.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    function off(type: 'error', observerId: number): Promise<void>;
    /**
     * The observer will be called by system when an error occurs.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * The observer will be called by system when an error occurs.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    export type ErrorObserver = _ErrorObserver.default;
}
export default errorManager;
