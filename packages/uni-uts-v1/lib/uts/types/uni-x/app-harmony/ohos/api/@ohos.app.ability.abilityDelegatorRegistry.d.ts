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
 * @kit TestKit
 */
import { AbilityDelegator as _AbilityDelegator } from './application/AbilityDelegator';
import { AbilityDelegatorArgs as _AbilityDelegatorArgs } from './application/abilityDelegatorArgs';
import { AbilityMonitor as _AbilityMonitor } from './application/AbilityMonitor';
import { ShellCmdResult as _ShellCmdResult } from './application/shellCmdResult';
/**
 * A global register used to store the AbilityDelegator and AbilityDelegatorArgs objects registered
 * during application startup.
 *
 * @namespace abilityDelegatorRegistry
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
/**
 * A global register used to store the AbilityDelegator and AbilityDelegatorArgs objects registered
 * during application startup.
 *
 * @namespace abilityDelegatorRegistry
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @since 10
 */
/**
 * A global register used to store the AbilityDelegator and AbilityDelegatorArgs objects registered
 * during application startup.
 *
 * @namespace abilityDelegatorRegistry
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace abilityDelegatorRegistry {
    /**
     * Get the AbilityDelegator object of the application.
     *
     * @returns { AbilityDelegator } Return the AbilityDelegator object initialized when the application is started.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Get the AbilityDelegator object of the application.
     *
     * @returns { AbilityDelegator } Return the AbilityDelegator object initialized when the application is started.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Get the AbilityDelegator object of the application.
     *
     * @returns { AbilityDelegator } Return the AbilityDelegator object initialized when the application is started.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getAbilityDelegator(): AbilityDelegator;
    /**
     * Get unit test arguments stored in the AbilityDelegatorArgs object.
     *
     * @returns { AbilityDelegatorArgs } Return the previously registered AbilityDelegatorArgs object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Get unit test arguments stored in the AbilityDelegatorArgs object.
     *
     * @returns { AbilityDelegatorArgs } Return the previously registered AbilityDelegatorArgs object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Get unit test arguments stored in the AbilityDelegatorArgs object.
     *
     * @returns { AbilityDelegatorArgs } Return the previously registered AbilityDelegatorArgs object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getArguments(): AbilityDelegatorArgs;
    /**
     * Describes all lifecycle states of an ability.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Describes all lifecycle states of an ability.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Describes all lifecycle states of an ability.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum AbilityLifecycleState {
        /**
         * Ability is in invalid state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        /**
         * Ability is in invalid state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Ability is in invalid state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        UNINITIALIZED,
        /**
         * Ability is in the created state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        /**
         * Ability is in the created state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Ability is in the created state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        CREATE,
        /**
         * Ability is in the foreground state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        /**
         * Ability is in the foreground state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Ability is in the foreground state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        FOREGROUND,
        /**
         * Ability is in the background state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        /**
         * Ability is in the background state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Ability is in the background state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        BACKGROUND,
        /**
         * Ability is in a destroyed state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        /**
         * Ability is in a destroyed state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Ability is in a destroyed state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        DESTROY
    }
    /**
     * A global test utility interface used for adding AbilityMonitor objects and control lifecycle states of abilities.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * A global test utility interface used for adding AbilityMonitor objects and control lifecycle states of abilities.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * A global test utility interface used for adding AbilityMonitor objects and control lifecycle states of abilities.
     *
     * @typedef { _AbilityDelegator }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type AbilityDelegator = _AbilityDelegator;
    /**
     * Store unit testing-related parameters, including test case names, and test runner name.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Store unit testing-related parameters, including test case names, and test runner name.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Store unit testing-related parameters, including test case names, and test runner name.
     *
     * @typedef { _AbilityDelegatorArgs }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type AbilityDelegatorArgs = _AbilityDelegatorArgs;
    /**
     * Provide methods for matching monitored Ability objects that meet specified conditions.
     * The most recently matched Ability objects will be saved in the AbilityMonitor object.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Provide methods for matching monitored Ability objects that meet specified conditions.
     * The most recently matched Ability objects will be saved in the AbilityMonitor object.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Provide methods for matching monitored Ability objects that meet specified conditions.
     * The most recently matched Ability objects will be saved in the AbilityMonitor object.
     *
     * @typedef { _AbilityMonitor }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export type AbilityMonitor = _AbilityMonitor;
    /**
     * A object that records the result of shell command executes.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * A object that records the result of shell command executes.
     *
     * @typedef { _ShellCmdResult }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    export type ShellCmdResult = _ShellCmdResult;
}
export default abilityDelegatorRegistry;
