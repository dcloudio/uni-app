/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { AsyncCallback } from './@ohos.base';
import Want from './@ohos.app.ability.Want';
import { WantAgentInfo as _WantAgentInfo } from './wantAgent/wantAgentInfo';
import { TriggerInfo as _TriggerInfo } from './wantAgent/triggerInfo';
/**
 * Provide the method obtain trigger, cancel, and compare and to obtain
 * the bundle name, UID of an {@link WantAgent} object.
 *
 * @namespace wantAgent
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
declare namespace wantAgent {
    /**
     * Obtains the bundle name of a WantAgent.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @param { AsyncCallback<string> } callback - The callback is used to return the bundle name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getBundleName(agent: WantAgent, callback: AsyncCallback<string>): void;
    /**
     * Obtains the bundle name of a WantAgent.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @returns { Promise<string> } Returns the bundle name.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getBundleName(agent: WantAgent): Promise<string>;
    /**
     * Obtains the UID of a WantAgent.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @param { AsyncCallback<number> } callback - The callback is used to return the UID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getUid(agent: WantAgent, callback: AsyncCallback<number>): void;
    /**
     * Obtains the UID of a WantAgent.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @returns { Promise<number> } Returns the UID.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getUid(agent: WantAgent): Promise<number>;
    /**
     * Cancel a WantAgent. Only the application that creates the WantAgent can cancel it.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @param { AsyncCallback<void> } callback - The callback of cancel.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function cancel(agent: WantAgent, callback: AsyncCallback<void>): void;
    /**
     * Cancel a WantAgent. Only the application that creates the WantAgent can cancel it.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function cancel(agent: WantAgent): Promise<void>;
    /**
     * Triggers a WantAgent.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @param { TriggerInfo } triggerInfo - Indicates the information required for triggering a WantAgent.
     * @param { AsyncCallback<CompleteData> } [callback] - The callback is used to return the CompleteData.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function trigger(agent: WantAgent, triggerInfo: TriggerInfo, callback?: AsyncCallback<CompleteData>): void;
    /**
     * Checks whether two WantAgent objects are equal.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @param { WantAgent } otherAgent - Indicates the other WantAgent.
     * @param { AsyncCallback<boolean> } callback - Returns true if the two WantAgents are the same.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function equal(agent: WantAgent, otherAgent: WantAgent, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether two WantAgent objects are equal.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @param { WantAgent } otherAgent - Indicates the other WantAgent.
     * @returns { Promise<boolean> } Returns true if the two WantAgents are the same.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function equal(agent: WantAgent, otherAgent: WantAgent): Promise<boolean>;
    /**
     * Obtains a WantAgent object.
     *
     * @param { WantAgentInfo } info - Information about the WantAgent object to obtain.
     * @param { AsyncCallback<WantAgent> } callback - The callback is used to return the created WantAgent.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getWantAgent(info: WantAgentInfo, callback: AsyncCallback<WantAgent>): void;
    /**
     * Obtains a WantAgent object.
     *
     * @param { WantAgentInfo } info - Information about the WantAgent object to obtain.
     * @returns { Promise<WantAgent> } Returns the created WantAgent.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getWantAgent(info: WantAgentInfo): Promise<WantAgent>;
    /**
     * Obtains the {@link OperationType} of a {@link WantAgent}.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @param { AsyncCallback<number> } callback - The callback is used to return the OperationType of the WantAgent.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000015 - Service timeout.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getOperationType(agent: WantAgent, callback: AsyncCallback<number>): void;
    /**
     * Obtains the {@link OperationType} of a {@link WantAgent}.
     *
     * @param { WantAgent } agent - Indicates the WantAgent.
     * @returns { Promise<number> } Returns the OperationType of the WantAgent.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16000007 - Service busy, there are concurrent tasks, waiting for retry.
     * @throws { BusinessError } 16000015 - Service timeout.
     * @throws { BusinessError } 16000151 - Invalid wantagent object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getOperationType(agent: WantAgent): Promise<number>;
    /**
     * Enumerates flags for using a WantAgent.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export enum WantAgentFlags {
        /**
         * Indicates that the WantAgent can be used only once.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        ONE_TIME_FLAG = 0,
        /**
         * Indicates that null is returned if the WantAgent does not exist.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        NO_BUILD_FLAG,
        /**
         * Indicates that the existing WantAgent should be canceled before a new object is generated.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        CANCEL_PRESENT_FLAG,
        /**
         * Indicates that the system only replaces the extra data of the existing WantAgent with that of the new object.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        UPDATE_PRESENT_FLAG,
        /**
         * Indicates that the created WantAgent should be immutable.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        CONSTANT_FLAG,
        /**
         * Indicates that the current value of element can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        REPLACE_ELEMENT,
        /**
         * Indicates that the current value of action can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        REPLACE_ACTION,
        /**
         * Indicates that the current value of uri can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        REPLACE_URI,
        /**
         * Indicates that the current value of entities can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        REPLACE_ENTITIES,
        /**
         * Indicates that the current value of packageName can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        REPLACE_BUNDLE
    }
    /**
     * Identifies the operation for using a WantAgent, such as starting an ability or sending a common event.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export enum OperationType {
        /**
         * Unknown operation.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        UNKNOWN_TYPE = 0,
        /**
         * Starts an ability with a UI.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        START_ABILITY,
        /**
         * Starts multiple abilities with a UI.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        START_ABILITIES,
        /**
         * Starts an ability without a UI.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        START_SERVICE,
        /**
         * Sends a common event.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        SEND_COMMON_EVENT
    }
    /**
     * Describes the data returned by after wantAgent.trigger is called.
     *
     * @typedef CompleteData
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export interface CompleteData {
        /**
         * Triggered WantAgent.
         *
         * @type { WantAgent }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        info: WantAgent;
        /**
         * Existing Want that is triggered.
         *
         * @type { Want }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        want: Want;
        /**
         * Request code used to trigger the WantAgent.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        finalCode: number;
        /**
         * Final data collected by the common event.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        finalData: string;
        /**
         * Extra data collected by the common event.
         *
         * @type { ?object }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        /**
         * Extra data collected by the common event.
         *
         * @type { ?Record<string, Object> }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 11
         */
        extraInfo?: Record<string, Object>;
    }
    /**
     * Provides the information required for triggering a WantAgent.
     *
     * @typedef { _TriggerInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export type TriggerInfo = _TriggerInfo;
    /**
     * Provides the information required for triggering a WantAgent.
     *
     * @typedef { _WantAgentInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export type WantAgentInfo = _WantAgentInfo;
}
/**
 * WantAgent object.
 *
 * @typedef { object }
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
export type WantAgent = object;
export default wantAgent;
