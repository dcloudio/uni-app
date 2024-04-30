/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import AbilityConstant from './@ohos.app.ability.AbilityConstant';
import { Configuration } from './@ohos.app.ability.Configuration';
/**
 * The class of an ability.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 9
 */
/**
 * The class of an ability.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @atomicservice
 * @since 11
 */
export default class Ability {
    /**
     * Called when the system configuration is updated.
     *
     * @param { Configuration } newConfig - Indicates the updated configuration.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called when the system configuration is updated.
     *
     * @param { Configuration } newConfig - Indicates the updated configuration.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onConfigurationUpdate(newConfig: Configuration): void;
    /**
     * Called when the system has determined to trim the memory, for example, when the ability is running in the
     * background and there is no enough memory for running as many background processes as possible.
     *
     * @param { AbilityConstant.MemoryLevel } level - Indicates the memory trim level, which shows the current memory
     *                                                usage status.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called when the system has determined to trim the memory, for example, when the ability is running in the
     * background and there is no enough memory for running as many background processes as possible.
     *
     * @param { AbilityConstant.MemoryLevel } level - Indicates the memory trim level, which shows the current memory
     *                                                usage status.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onMemoryLevel(level: AbilityConstant.MemoryLevel): void;
}
