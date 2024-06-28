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
import wantAgent from '../@ohos.wantAgent';
import type abilityWantAgent from '../@ohos.app.ability.wantAgent';
/**
 * Provides the information required for triggering a WantAgent.
 *
 * @typedef WantAgentInfo
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 7
 */
export interface WantAgentInfo {
    /**
     * An array of all Wants for starting abilities or sending common events. Only Wants can be displayed.
     *
     * @type { Array<Want> }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    wants: Array<Want>;
    /**
     * Type of the action specified in a Want.
     *
     * @type { ?wantAgent.OperationType }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 11
     * @useinstead WantAgentInfo#actionType
     */
    operationType?: wantAgent.OperationType;
    /**
     * Type of the action specified in a Want.
     *
     * @type { ?abilityWantAgent.OperationType }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 11
     */
    actionType?: abilityWantAgent.OperationType;
    /**
     * Request code defined by the user.
     *
     * @type { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    requestCode: number;
    /**
     * An array of flags for using the WantAgent.
     *
     * @type { ?Array<wantAgent.WantAgentFlags> }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 11
     * @useinstead WantAgentInfo#actionFlags
     */
    wantAgentFlags?: Array<wantAgent.WantAgentFlags>;
    /**
     * An array of flags for using the WantAgent.
     *
     * @type { ?Array<abilityWantAgent.WantAgentFlags> }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 11
     */
    actionFlags?: Array<abilityWantAgent.WantAgentFlags>;
    /**
     * Extra information about how the Want starts an ability.
     * If there is no extra information to set, this constant can be left empty.
     *
     * @type { ?object }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    extraInfo?: {
        [key: string]: any;
    };
    /**
     * Extra information about how the Want starts an ability.
     * If there is no extra information to set, this constant can be left empty.
     * The ability of this property is same as extraInfo. If both are set, this property will be used.
     *
     * @type { ?Record<string, Object> }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 11
     */
    extraInfos?: Record<string, Object>;
}
