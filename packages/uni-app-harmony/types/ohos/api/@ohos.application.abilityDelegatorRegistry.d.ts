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
import { AbilityDelegator } from './application/AbilityDelegator';
import { AbilityDelegatorArgs } from './application/abilityDelegatorArgs';
/**
 * A global register used to store the AbilityDelegator and AbilityDelegatorArgs objects registered
 * during application startup.
 *
 * @namespace abilityDelegatorRegistry
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry
 */
declare namespace abilityDelegatorRegistry {
    /**
     * Get the AbilityDelegator object of the application.
     *
     * @returns { AbilityDelegator } the AbilityDelegator object initialized when the application is started.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry#getAbilityDelegator
     */
    function getAbilityDelegator(): AbilityDelegator;
    /**
     * Get unit test parameters stored in the AbilityDelegatorArgs object.
     *
     * @returns { AbilityDelegatorArgs } the previously registered AbilityDelegatorArgs object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry#getArguments
     */
    function getArguments(): AbilityDelegatorArgs;
    /**
     * Describes all lifecycle states of an ability.
     *
     * @enum { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry#AbilityLifecycleState
     */
    export enum AbilityLifecycleState {
        /**
         * Indicates an invalid state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry.AbilityLifecycleState
         *             #UNINITIALIZED
         */
        UNINITIALIZED,
        /**
         * Indicates that the Ability is in the created state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry.AbilityLifecycleState#CREATE
         */
        CREATE,
        /**
         * Indicates that Ability is in the foreground state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry.AbilityLifecycleState#FOREGROUND
         */
        FOREGROUND,
        /**
         * Indicates that the Ability is in the background state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry.AbilityLifecycleState#BACKGROUND
         */
        BACKGROUND,
        /**
         * Indicates that the Ability is in a destroyed state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.app.ability.abilityDelegatorRegistry/abilityDelegatorRegistry.AbilityLifecycleState#DESTROY
         */
        DESTROY
    }
}
export default abilityDelegatorRegistry;
