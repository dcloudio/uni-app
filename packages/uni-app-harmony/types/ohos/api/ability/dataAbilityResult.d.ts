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
/**
 * Indicates the return result of the data to be manipulated.
 *
 * @typedef DataAbilityResult
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @since 7
 */
export interface DataAbilityResult {
    /**
     * Indicates the path of data to operate.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    uri?: string;
    /**
     * Indicates the number of rows affected by the operation.
     *
     * @type { ?number }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    count?: number;
}
