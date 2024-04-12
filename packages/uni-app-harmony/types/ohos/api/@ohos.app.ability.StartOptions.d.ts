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
 * StartOptions is the basic communication component of the system.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @since 9
 */
/**
 * StartOptions is the basic communication component of the system.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @atomicservice
 * @since 11
 */
export default class StartOptions {
    /**
     * The type of displayId
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    /**
     * The type of displayId
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    displayId?: number;
    /**
     * The target ability with animation or without
     *
     * @type { ?boolean }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    withAnimation?: boolean;
    /**
     * The left position of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    windowLeft?: number;
    /**
     * The top position of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    windowTop?: number;
    /**
     * The width of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    windowWidth?: number;
    /**
     * The height of window rectangle
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 11
     */
    windowHeight?: number;
}
