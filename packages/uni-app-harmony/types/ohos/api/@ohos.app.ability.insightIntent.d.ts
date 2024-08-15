/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
/**
 * interface of insightIntent.
 *
 * @namespace insightIntent
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @atomicservice
 * @since 11
 */
declare namespace insightIntent {
    /**
     * Enum for supported execute mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    enum ExecuteMode {
        /**
         * UIAbility foreground.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        UI_ABILITY_FOREGROUND = 0,
        /**
         * UIAbility background.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        UI_ABILITY_BACKGROUND = 1,
        /**
         * UIExtensionAbility.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 11
         */
        UI_EXTENSION_ABILITY = 2
    }
    /**
     * Result of intent execution.
     *
     * @typedef ExecuteResult
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    interface ExecuteResult {
        /**
         * Indicates result code.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        code: number;
        /**
         * Indicates execute result.
         *
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        result?: Record<string, Object>;
    }
}
export default insightIntent;
