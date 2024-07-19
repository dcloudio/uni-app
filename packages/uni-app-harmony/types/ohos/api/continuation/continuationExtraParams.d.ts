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
import continuationManager from '../@ohos.continuation.continuationManager';
/**
 * Indicates the description of additional parameters for continuation.
 *
 * @typedef ContinuationExtraParams
 * @syscap SystemCapability.Ability.DistributedAbilityManager
 * @since 8
 */
/**
 * Indicates the description of additional parameters for continuation.
 *
 * @typedef ContinuationExtraParams
 * @syscap SystemCapability.Ability.DistributedAbilityManager
 * @atomicservice
 * @since 11
 */
export interface ContinuationExtraParams {
    /**
     * Indicates the type of devices to be matched.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Indicates the type of devices to be matched.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    deviceType?: Array<string>;
    /**
     * Indicates the bundle name of the target application where the ability will be hopped.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Indicates the bundle name of the target application where the ability will be hopped.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    targetBundle?: string;
    /**
     * Indicates the description used for device filtering.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Indicates the description used for device filtering.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    description?: string;
    /**
     * Parameters used for filtering devices, type must be { [key: string]: any }.
     *
     * @type { ?any }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Parameters used for filtering devices, type must be { [key: string]: any }.
     *
     * @type { ?any }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    filter?: any;
    /**
     * Mode of continuation.
     *
     * @type { ?continuationManager.ContinuationMode }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Mode of continuation.
     *
     * @type { ?continuationManager.ContinuationMode }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    continuationMode?: continuationManager.ContinuationMode;
    /**
     * Authentication extra infos.
     *
     * @type { ?object }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Authentication extra infos.
     *
     * @type { ?object }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    /**
     * Authentication extra infos.
     *
     * @type { ?Record<string, Object> }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    authInfo?: Record<string, Object>;
}
