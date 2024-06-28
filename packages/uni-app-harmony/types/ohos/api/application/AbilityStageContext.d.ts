/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
import { HapModuleInfo } from '../bundleManager/HapModuleInfo';
import { Configuration } from '../@ohos.app.ability.Configuration';
import Context from './Context';
/**
 * The context of an abilityStage. It allows access to abilityStage-specific resources.
 *
 * @extends Context
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @since 9
 */
/**
 * The context of an abilityStage. It allows access to abilityStage-specific resources.
 *
 * @extends Context
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @crossplatform
 * @since 10
 */
/**
 * The context of an abilityStage. It allows access to abilityStage-specific resources.
 *
 * @extends Context
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export default class AbilityStageContext extends Context {
    /**
     * Indicates configuration information about an module.
     *
     * @type { HapModuleInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 9
     */
    /**
     * Indicates configuration information about an module.
     *
     * @type { HapModuleInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates configuration information about an module.
     *
     * @type { HapModuleInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    currentHapModuleInfo: HapModuleInfo;
    /**
     * Indicates configuration information.
     *
     * @type { Configuration }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 9
     */
    /**
     * Indicates configuration information.
     *
     * @type { Configuration }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates configuration information.
     *
     * @type { Configuration }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    config: Configuration;
}
