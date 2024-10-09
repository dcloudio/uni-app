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
 * @kit AbilityKit
 */
import UIAbility from '../@ohos.app.ability.UIAbility';
/**
 * Provide methods for matching monitored Ability objects that meet specified conditions.
 * The most recently matched Ability objects will be saved in the AbilityMonitor object.
 *
 * @interface AbilityMonitor
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
/**
 * Provide methods for matching monitored Ability objects that meet specified conditions.
 * The most recently matched Ability objects will be saved in the AbilityMonitor object.
 *
 * @interface AbilityMonitor
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @since 10
 */
/**
 * Provide methods for matching monitored Ability objects that meet specified conditions.
 * The most recently matched Ability objects will be saved in the AbilityMonitor object.
 *
 * @interface AbilityMonitor
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface AbilityMonitor {
    /**
     * The name of the ability to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * The name of the ability to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * The name of the ability to monitor.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    abilityName: string;
    /**
     * The name of the module to monitor.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * The name of the module to monitor.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * The name of the module to monitor.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    moduleName?: string;
    /**
     * Called back when the ability is created for initialization.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Called back when the ability is created for initialization.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when the ability is created for initialization.
     *
     * @type { ?function }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onAbilityCreate?: (ability: UIAbility) => void;
    /**
     * Called back when the state of the ability changes to foreground.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Called back when the state of the ability changes to foreground.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when the state of the ability changes to foreground.
     *
     * @type { ?function }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onAbilityForeground?: (ability: UIAbility) => void;
    /**
     * Called back when the state of the ability changes to background.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Called back when the state of the ability changes to background.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when the state of the ability changes to background.
     *
     * @type { ?function }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onAbilityBackground?: (ability: UIAbility) => void;
    /**
     * Called back before the ability is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Called back before the ability is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Called back before the ability is destroyed.
     *
     * @type { ?function }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onAbilityDestroy?: (ability: UIAbility) => void;
    /**
     * Called back when an ability window stage is created.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Called back when an ability window stage is created.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when an ability window stage is created.
     *
     * @type { ?function }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onWindowStageCreate?: (ability: UIAbility) => void;
    /**
     * Called back when an ability window stage is restored.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Called back when an ability window stage is restored.
     *
     * @type { ?function }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    onWindowStageRestore?: (ability: UIAbility) => void;
    /**
     * Called back when an ability window stage is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Called back when an ability window stage is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when an ability window stage is destroyed.
     *
     * @type { ?function }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onWindowStageDestroy?: (ability: UIAbility) => void;
}
export default AbilityMonitor;
