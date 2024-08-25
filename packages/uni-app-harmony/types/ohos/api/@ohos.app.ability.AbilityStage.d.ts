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
import AbilityStageContext from './application/AbilityStageContext';
import Want from './@ohos.app.ability.Want';
import { Configuration } from './@ohos.app.ability.Configuration';
/**
 * The class of an ability stage.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @since 9
 */
/**
 * The class of an ability stage.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @crossplatform
 * @since 10
 */
/**
 * The class of an ability stage.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export default class AbilityStage {
    /**
     * Indicates configuration information about context.
     *
     * @type { AbilityStageContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * Indicates configuration information about context.
     *
     * @type { AbilityStageContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates configuration information about context.
     *
     * @type { AbilityStageContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    context: AbilityStageContext;
    /**
     * Called back when an ability stage is started for initialization.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when an ability stage is started for initialization.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when an ability stage is started for initialization.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCreate(): void;
    /**
     * Called back when start specified ability.
     *
     * @param { Want } want - Indicates the want info of started ability.
     * @returns { string } The user returns an ability string ID. If the ability of this ID has been started before,
     *         do not create a new instance and pull it back to the top of the stack.
     *         Otherwise, create a new instance and start it.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when start specified ability.
     *
     * @param { Want } want - Indicates the want info of started ability.
     * @returns { string } The user returns an ability string ID. If the ability of this ID has been started before,
     *         do not create a new instance and pull it back to the top of the stack.
     *         Otherwise, create a new instance and start it.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onAcceptWant(want: Want): string;
    /**
     * Called back when start UIAbility in specified process.
     *
     * @param { Want } want - Indicates the want info of started ability.
     * @returns { string } The user returns an process string ID. If the process of this ID has been created before,
     *         let the ability run in this process. Otherwise, create a new process.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    onNewProcessRequest(want: Want): string;
    /**
     * Called when the system configuration is updated.
     *
     * @param { Configuration } newConfig - Indicates the updated configuration.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called when the system configuration is updated.
     *
     * @param { Configuration } newConfig - Indicates the updated configuration.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the system configuration is updated.
     *
     * @param { Configuration } newConfig - Indicates the updated configuration.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onConfigurationUpdate(newConfig: Configuration): void;
    /**
     * Called when the system has determined to trim the memory, for example, when the ability is running in the
     * background and there is no enough memory for running as many background processes as possible.
     *
     * @param { AbilityConstant.MemoryLevel } level - Indicates the memory trim level, which shows the current memory usage status.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called when the system has determined to trim the memory, for example, when the ability is running in the
     * background and there is no enough memory for running as many background processes as possible.
     *
     * @param { AbilityConstant.MemoryLevel } level - Indicates the memory trim level, which shows the current memory usage status.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onMemoryLevel(level: AbilityConstant.MemoryLevel): void;
    /**
     * Called back when an ability stage is Destroyed.
     * Will not call the onDestroy function when killing a process or crashing abnormally.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 12
     */
    onDestroy(): void;
}
