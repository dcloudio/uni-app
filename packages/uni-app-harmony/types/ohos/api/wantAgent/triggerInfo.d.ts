/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
 * Provides the information required for triggering a WantAgent.
 *
 * @typedef TriggerInfo
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 7
 */
export interface TriggerInfo {
    /**
     * Result code.
     *
     * @type { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    code: number;
    /**
     * Extra Want.
     * If flags in WantAgentInfo contain CONSTANT_FLAG, this parameter is invalid.
     * If flags contain REPLACE_ELEMENT, REPLACE_ACTION, REPLACE_URI, REPLACE_ENTITIES, and REPLACE_BUNDLE,
     * the element, action, uri, entities, and bundleName attributes of the Want specified in this parameter
     * will be used to replace the corresponding attributes in the original Want, respectively.
     * If this parameter is null, the original Want remains unchanged.
     *
     * @type { ?Want }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    want?: Want;
    /**
     * Permission required for a WantAgent recipient.
     * This parameter is valid only when the WantAgent is triggered to send common events.
     * If permission is null, no permission is required on the recipient.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    permission?: string;
    /**
     * Custom extra data you want to add for triggering a WantAgent.
     *
     * @type { ?object }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    extraInfo?: {
        [key: string]: any;
    };
    /**
     * Custom extra data you want to add for triggering a WantAgent.
     * The ability of this property is same as extraInfo. If both are set, this property will be used.
     *
     * @type { ?Record<string, Object> }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 11
     */
    extraInfos?: Record<string, Object>;
}
