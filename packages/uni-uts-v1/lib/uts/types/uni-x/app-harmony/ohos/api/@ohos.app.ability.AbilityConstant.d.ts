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
/**
 * The definition of AbilityConstant.
 *
 * @namespace AbilityConstant
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @since 9
 */
/**
 * The definition of AbilityConstant.
 *
 * @namespace AbilityConstant
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @crossplatform
 * @since 10
 */
/**
 * The definition of AbilityConstant.
 *
 * @namespace AbilityConstant
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace AbilityConstant {
    /**
     * Interface of launch param.
     *
     * @typedef LaunchParam
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * Interface of launch param.
     *
     * @typedef LaunchParam
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @crossplatform
     * @since 10
     */
    /**
     * Interface of launch param.
     *
     * @typedef LaunchParam
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export interface LaunchParam {
        /**
         * Indicates launch reason.
         *
         * @type { LaunchReason }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Indicates launch reason.
         *
         * @type { LaunchReason }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates launch reason.
         *
         * @type { LaunchReason }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        launchReason: LaunchReason;
        /**
         * Indicates last exit reason.
         *
         * @type { LastExitReason }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Indicates last exit reason.
         *
         * @type { LastExitReason }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates last exit reason.
         *
         * @type { LastExitReason }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        lastExitReason: LastExitReason;
        /**
         * Indicates last exit detailed reason.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 12
         */
        lastExitMessage: string;
    }
    /**
     * Type of launch reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * Type of launch reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @crossplatform
     * @since 10
     */
    /**
     * Type of launch reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum LaunchReason {
        /**
         * Unknown reason.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @since 10
         */
        /**
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        UNKNOWN = 0,
        /**
         * Start ability through the startAbility interface.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Start ability through the startAbility interface.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        START_ABILITY = 1,
        /**
         * Start ability through the startAbilityByCall interface.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Start ability through the startAbilityByCall interface.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        CALL = 2,
        /**
         * Start ability through cross-end device migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Start ability through cross-end device migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        CONTINUATION = 3,
        /**
         * After the application is restored, the ability is automatically restored and started when the application fails.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * After the application is restored, the ability is automatically restored and started when the application fails.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        APP_RECOVERY = 4,
        /**
         * Start ability through the acquireShareData interface.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Start ability through the acquireShareData interface.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        SHARE = 5,
        /**
         * Start ability by booting it up.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 11
         */
        AUTO_STARTUP = 8,
        /**
         * Start ability through the insight intent interface.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        INSIGHT_INTENT = 9
    }
    /**
     * Type of last exit reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * Type of last exit reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @crossplatform
     * @since 10
     */
    /**
     * Type of last exit reason.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum LastExitReason {
        /**
         * Exit reason : Unknown. The reason for the last exit of the target application is not recorded in the application
         *               framework.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Exit reason : Unknown. The reason for the last exit of the target application is not recorded in the application
         *               framework.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @since 10
         */
        /**
         * Exit reason : Unknown. The reason for the last exit of the target application is not recorded in the application
         *               framework.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        UNKNOWN = 0,
        /**
         * Exit reason : Ability is not responding.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         * @deprecated since 10
         * @useinstead AbilityConstant.LastExitReason#APP_FREEZE
         */
        ABILITY_NOT_RESPONDING = 1,
        /**
         * Exit reason : normally. App exit due to user active close.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Exit reason : normally. App exit due to user active close.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        NORMAL = 2,
        /**
         * Exit reason : cpp crash. The app exit due to native exception signal.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Exit reason : cpp crash. The app exit due to native exception signal.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        CPP_CRASH = 3,
        /**
         * Exit reason : js error. App exit due to js error.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Exit reason : js error. App exit due to js error.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        JS_ERROR = 4,
        /**
         * Exit reason : app freeze. App exit due to appFreeze error.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Exit reason : app freeze. App exit due to appFreeze error.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        APP_FREEZE = 5,
        /**
         * Exit reason : performance control. App exit due to system performance issues, such as device low memory.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Exit reason : performance control. App exit due to system performance issues, such as device low memory.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        PERFORMANCE_CONTROL = 6,
        /**
         * Exit reason : resource control. App exit due to resource usage violation, such as exceed cpu/io/memory usage.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Exit reason : resource control. App exit due to resource usage violation, such as exceed cpu/io/memory usage.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        RESOURCE_CONTROL = 7,
        /**
         * Exit reason : upgrade. App exit due to upgrade.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Exit reason : upgrade. App exit due to upgrade.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        UPGRADE = 8
    }
    /**
     * Type of onContinue result.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * Type of onContinue result.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @atomicservice
     * @since 11
     */
    export enum OnContinueResult {
        /**
         * Agree to the result of Ability migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Agree to the result of Ability migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        AGREE = 0,
        /**
         * Reject to the result of Ability migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Reject to the result of Ability migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        REJECT = 1,
        /**
         * Mismatch to the result of Ability migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Mismatch to the result of Ability migration.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        MISMATCH = 2
    }
    /**
     * Type of memory level.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * Type of memory level.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @atomicservice
     * @since 11
     */
    export enum MemoryLevel {
        /**
         * Memory footprint is moderate.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Memory footprint is moderate.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        MEMORY_LEVEL_MODERATE = 0,
        /**
         * Low memory footprint.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Low memory footprint.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        MEMORY_LEVEL_LOW = 1,
        /**
         * High memory footprint.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * High memory footprint.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        MEMORY_LEVEL_CRITICAL = 2
    }
    /**
     * Type of window mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 12
     */
    export enum WindowMode {
        /**
         * Full screen mode.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 12
         */
        WINDOW_MODE_FULLSCREEN = 1,
        /**
         * Primary screen in split-screen mode. If the screen is horizontal, it means the left split screen.
         * It is valid only in intra-app redirection scenarios.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 12
         */
        WINDOW_MODE_SPLIT_PRIMARY = 100,
        /**
         * Secondary screen in split-screen mode. If the screen is horizontal, it means the right split screen.
         * It is valid only in intra-app redirection scenarios.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 12
         */
        WINDOW_MODE_SPLIT_SECONDARY = 101
    }
    /**
     * Type of onSave result.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * Type of onSave result.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @atomicservice
     * @since 11
     */
    export enum OnSaveResult {
        /**
         * Always agree to save the state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Always agree to save the state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        ALL_AGREE = 0,
        /**
         * Refuse to migrate the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Refuse to migrate the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        CONTINUATION_REJECT = 1,
        /**
         * Migration mismatch.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Migration mismatch.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        CONTINUATION_MISMATCH = 2,
        /**
         * Agree to restore the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Agree to restore the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        RECOVERY_AGREE = 3,
        /**
         * Refuse to restore the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Refuse to restore the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        RECOVERY_REJECT = 4,
        /**
         * Always refuses to save the state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Always refuses to save the state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        ALL_REJECT
    }
    /**
     * Type of save state.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 9
     */
    /**
     * Type of save state.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @atomicservice
     * @since 11
     */
    export enum StateType {
        /**
         * Migrate and save the state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * Migrate and save the state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        CONTINUATION = 0,
        /**
         * App recovery to restore the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 9
         */
        /**
         * App recovery to restore the saved state.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        APP_RECOVERY = 1
    }
    /**
     * Continue state.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 10
     */
    /**
     * Continue state.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @atomicservice
     * @since 11
     */
    export enum ContinueState {
        /**
         * Mission continuable active.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Mission continuable inactive.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        ACTIVE = 0,
        /**
         * Mission continuable inactive.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @since 10
         */
        /**
         * Mission continuable inactive.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @stagemodelonly
         * @atomicservice
         * @since 11
         */
        INACTIVE = 1
    }
}
export default AbilityConstant;
