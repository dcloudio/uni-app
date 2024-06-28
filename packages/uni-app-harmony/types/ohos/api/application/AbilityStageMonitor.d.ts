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
/**
 * Provide methods for matching monitored AbilityStage objects that meet specified conditions.
 * The most recently matched AbilityStage objects will be saved in the AbilityStageMonitor object.
 *
 * @typedef AbilityStageMonitor
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
/**
 * Provide methods for matching monitored AbilityStage objects that meet specified conditions.
 * The most recently matched AbilityStage objects will be saved in the AbilityStageMonitor object.
 *
 * @typedef AbilityStageMonitor
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @since 10
 */
/**
 * Provide methods for matching monitored AbilityStage objects that meet specified conditions.
 * The most recently matched AbilityStage objects will be saved in the AbilityStageMonitor object.
 *
 * @typedef AbilityStageMonitor
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface AbilityStageMonitor {
    /**
     * The module name of the abilityStage to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * The module name of the abilityStage to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * The module name of the abilityStage to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    moduleName: string;
    /**
     * The source path of the abilityStage to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * The source path of the abilityStage to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * The source path of the abilityStage to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    srcEntrance: string;
}
export default AbilityStageMonitor;
