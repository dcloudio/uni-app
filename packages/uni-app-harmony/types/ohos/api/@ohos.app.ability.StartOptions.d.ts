/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
import contextConstant from "./@ohos.app.ability.contextConstant";
/**
 * StartOptions is the basic communication component of the system.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @since 9
 */
/**
 * StartOptions is the basic communication component of the system.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @atomicservice
 * @since 11
 */
export default class StartOptions {
    /**
     * The type of {@link ohos.app.ability.AbilityConstant#WindowMode}
     * {@link ohos.app.ability.AbilityConstant#WindowMode.WINDOW_MODE_SPLIT_PRIMARY} and
     * {@link ohos.app.ability.AbilityConstant#WindowMode.WINDOW_MODE_SPLIT_SECONDARY} are
     * valid only in intra-app redirection scenarios.
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 12
     */
    windowMode?: number;
    /**
     * The type of displayId
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * The type of displayId
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @atomicservice
     * @since 11
     */
    displayId?: number;
    /**
     * The target ability with animation or without
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    withAnimation?: boolean;
    /**
     * The left position of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    windowLeft?: number;
    /**
     * The top position of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    windowTop?: number;
    /**
     * The width of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    windowWidth?: number;
    /**
     * The height of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    windowHeight?: number;
    /**
     * The process mode.
     * This property only takes effect when calling UIAbilityContext.startAbility.
     * The properties processMode and startupVisibility must be set simultaneously.
     *
     * @type { ?contextConstant.ProcessMode }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 12
     */
    processMode?: contextConstant.ProcessMode;
    /**
     * The ability visibility after the new process startup.
     * This property only takes effect when calling UIAbilityContext.startAbility.
     * The properties processMode and startupVisibility must be set simultaneously.
     *
     * @type { ?contextConstant.StartupVisibility }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 12
     */
    startupVisibility?: contextConstant.StartupVisibility;
}
