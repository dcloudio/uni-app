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
 */
import { AsyncCallback, Callback } from './@ohos.base';
import Want from './@ohos.app.ability.Want';
import { WantAgentInfo } from './wantAgent/wantAgentInfo';
import { TriggerInfo } from './wantAgent/triggerInfo';
/**
 * Provide the method obtain trigger, cancel, and compare and to obtain
 * the bundle name, UID of an {@link WantAgent} object.
 *
 * @namespace wantAgent
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.app.ability.wantAgent/wantAgent
 */
declare namespace wantAgent {
    /**
     * Obtains the bundle name of a WantAgent.
     *
     * @param { WantAgent } agent - whose bundle name to obtain.
     * @param { AsyncCallback<string> } callback - A callback method to obtain the package name of the WantAgent instance.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#getBundleName
     */
    function getBundleName(agent: WantAgent, callback: AsyncCallback<string>): void;
    /**
     * Obtains the bundle name of a WantAgent.
     *
     * @param { WantAgent } agent - whose bundle name to obtain.
     * @returns { Promise<string> } Returns the bundle name of the {@link WantAgent} if any.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#getBundleName
     */
    function getBundleName(agent: WantAgent): Promise<string>;
    /**
     * Obtains the UID of a WantAgent.
     *
     * @param { WantAgent } agent - whose UID to obtain.
     * @param { AsyncCallback<number> } callback - Create a callback method for WantAgent.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#getUid
     */
    function getUid(agent: WantAgent, callback: AsyncCallback<number>): void;
    /**
     * Obtains the UID of a WantAgent.
     *
     * @param { WantAgent } agent - whose UID to obtain.
     * @returns { Promise<number> } Returns the UID of the {@link WantAgent} if any; returns {@code -1} otherwise.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#getUid
     */
    function getUid(agent: WantAgent): Promise<number>;
    /**
     * Cancel a WantAgent. Only the application that creates the WantAgent can cancel it.
     *
     * @param { WantAgent } agent - to cancel.
     * @param { AsyncCallback<void> } callback - Cancel the callback method for Want in WantAgent.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#cancel
     */
    function cancel(agent: WantAgent, callback: AsyncCallback<void>): void;
    /**
     * Cancel a WantAgent. Only the application that creates the WantAgent can cancel it.
     *
     * @param { WantAgent } agent - to cancel.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#cancel
     */
    function cancel(agent: WantAgent): Promise<void>;
    /**
     * Triggers a WantAgent.
     *
     * @param { WantAgent } agent - to trigger.
     * @param { TriggerInfo } triggerInfo - parameters.
     * @param { Callback<CompleteData> } [callback] - Indicates the callback method to be called after
     *                                                the {@link WantAgent} is triggered.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#trigger
     */
    function trigger(agent: WantAgent, triggerInfo: TriggerInfo, callback?: Callback<CompleteData>): void;
    /**
     * Checks whether two WantAgent objects are equal.
     *
     * @param { WantAgent } agent - to compare.
     * @param { WantAgent } otherAgent - WantAgent Object.
     * @param { AsyncCallback<boolean> } callback - Callback method for determining whether two WantAgent instances are
     *                                              equal.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#equal
     */
    function equal(agent: WantAgent, otherAgent: WantAgent, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether two WantAgent objects are equal.
     *
     * @param { WantAgent } agent - to compare.
     * @param { WantAgent } otherAgent - WantAgent Object.
     * @returns { Promise<boolean> } Returns {@code true} If the two objects are the same; returns {@code false} otherwise.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#equal
     */
    function equal(agent: WantAgent, otherAgent: WantAgent): Promise<boolean>;
    /**
     * Obtains a WantAgent object.
     *
     * @param { WantAgentInfo } info - about the WantAgent object to obtain.
     * @param { AsyncCallback<WantAgent> } callback - Callback method for obtaining the user ID of WantAgent instance.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#getWantAgent
     */
    function getWantAgent(info: WantAgentInfo, callback: AsyncCallback<WantAgent>): void;
    /**
     * Obtains a WantAgent object.
     *
     * @param { WantAgentInfo } info - about the WantAgent object to obtain.
     * @returns { Promise<WantAgent> } Returns the created {@link WantAgent} object.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#getWantAgent
     */
    function getWantAgent(info: WantAgentInfo): Promise<WantAgent>;
    /**
     * Enumerates flags for using a WantAgent.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#WantAgentFlags
     */
    export enum WantAgentFlags {
        /**
         * Indicates that the WantAgent can be used only once.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#ONE_TIME_FLAG
         */
        ONE_TIME_FLAG = 0,
        /**
         * Indicates that null is returned if the WantAgent does not exist.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#NO_BUILD_FLAG
         */
        NO_BUILD_FLAG,
        /**
         * Indicates that the existing WantAgent should be canceled before a new object is generated.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#CANCEL_PRESENT_FLAG
         */
        CANCEL_PRESENT_FLAG,
        /**
         * Indicates that the system only replaces the extra data of the existing WantAgent with that of the new object.
         * This flag is valid only when OperationType is set to START_ABILITY, START_SERVICE, or SEND_COMMON_EVENT.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#UPDATE_PRESENT_FLAG
         */
        UPDATE_PRESENT_FLAG,
        /**
         * Indicates that the created WantAgent should be immutable.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#CONSTANT_FLAG
         */
        CONSTANT_FLAG,
        /**
         * Indicates that the current value of element can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#REPLACE_ELEMENT
         */
        REPLACE_ELEMENT,
        /**
         * Indicates that the current value of action can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#REPLACE_ACTION
         */
        REPLACE_ACTION,
        /**
         * Indicates that the current value of uri can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#REPLACE_URI
         */
        REPLACE_URI,
        /**
         * Indicates that the current value of entities can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#REPLACE_ENTITIES
         */
        REPLACE_ENTITIES,
        /**
         * Indicates that the current value of packageName can be replaced when the WantAgent is triggered.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.WantAgentFlags#REPLACE_BUNDLE
         */
        REPLACE_BUNDLE
    }
    /**
     * Identifies the operation for using a WantAgent, such as starting an ability or sending a common event.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#OperationType
     */
    export enum OperationType {
        /**
         * Unknown operation.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.OperationType#UNKNOWN_TYPE
         */
        UNKNOWN_TYPE = 0,
        /**
         * Starts an ability with a UI.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.OperationType#START_ABILITY
         */
        START_ABILITY,
        /**
         * Starts multiple abilities with a UI.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.OperationType#START_ABILITIES
         */
        START_ABILITIES,
        /**
         * Starts an ability without a UI.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.OperationType#START_SERVICE
         */
        START_SERVICE,
        /**
         * Sends a common event.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.OperationType#SEND_COMMON_EVENT
         */
        SEND_COMMON_EVENT
    }
    /**
     * Describes the data returned by after wantAgent.trigger is called.
     *
     * @typedef CompleteData
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.app.ability.wantAgent/wantAgent#CompleteData
     */
    export interface CompleteData {
        /**
         * Triggered WantAgent.
         *
         * @type { WantAgent }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.CompleteData#info
         */
        info: WantAgent;
        /**
         * Existing Want that is triggered.
         *
         * @type { Want }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.CompleteData#want
         */
        want: Want;
        /**
         * Request code used to trigger the WantAgent.
         *
         * @type { number }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.CompleteData#finalCode
         */
        finalCode: number;
        /**
         * Final data collected by the common event.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.CompleteData#finalData
         */
        finalData: string;
        /**
         * Extra data collected by the common event.
         *
         * @type { ?object }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.app.ability.wantAgent/wantAgent.CompleteData#extraInfo
         */
        extraInfo?: {
            [key: string]: any;
        };
    }
}
/**
 * WantAgent object.
 *
 * @typedef { object }
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 7
 */
/**
 * WantAgent object.
 *
 * @typedef { object }
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @atomicservice
 * @since 12
 */
export type WantAgent = object;
export default wantAgent;
