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
import Want from '../@ohos.app.ability.Want';
/**
 * @typedef AbilityResult
 * @syscap SystemCapability.Ability.AbilityBase
 * @since 7
 */
/**
 * @typedef AbilityResult
 * @syscap SystemCapability.Ability.AbilityBase
 * @atomicservice
 * @since 11
 */
export interface AbilityResult {
    /**
     * Indicates the result code returned after the ability is destroyed. You can define the result
     * code to identify an error.
     *
     * @type { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 7
     */
    /**
     * Indicates the result code returned after the ability is destroyed. You can define the result
     * code to identify an error.
     *
     * @type { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @atomicservice
     * @since 11
     */
    resultCode: number;
    /**
     * Indicates the data returned after the ability is destroyed. You can define the data returned.
     * This parameter can be null.
     *
     * @type { ?Want }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 7
     */
    /**
     * Indicates the data returned after the ability is destroyed. You can define the data returned.
     * This parameter can be null.
     *
     * @type { ?Want }
     * @syscap SystemCapability.Ability.AbilityBase
     * @atomicservice
     * @since 11
     */
    want?: Want;
}
