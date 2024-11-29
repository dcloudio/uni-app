/*
 * Copyright (c) 2020 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */
/**
 * @typedef Result
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface Result {
    /**
     * Result code.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    code: number;
    /**
     * Returned data.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    data: object;
}
/**
 * @typedef SubscribeMessageResponse
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface SubscribeMessageResponse {
    /**
     * Peer device ID.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    deviceId: string;
    /**
     * Name of the bundle where the peer ability has been located. The name is case sensitive.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    bundleName: string;
    /**
     * Peer ability name, which is case sensitive.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    abilityName: string;
    /**
     * Messages received from the device.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    message: string;
}
/**
 * @typedef CallAbilityParam
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface CallAbilityParam {
    /**
     * Name of the bundle where the ability has been located. The name is case sensitive and must be the same as that on the AA side.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    bundleName: string;
    /**
     * Ability name, which is case sensitive and must be the same as that on the AA side.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    abilityName: string;
    /**
     * Ability operation code, which defines the service function of an AA and must be consistent with the AA side.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    messageCode: number;
    /**
     * Ability type. Different types of abilities have different implementation on the AA side.
     * 0: Ability, which has an independent lifecycle. The FA starts and requests an AA through an RPC. Such type of abilities are used to provide basic services for multiple FAs to call or are used when the abilities should run in the background.
     * 1: Internal ability, which shares the same process with the FA and communicates with it by calling internal functions. Such type of abilities are used in scenarios that require low response latency and cannot be called by other FAs.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    abilityType: number;
    /**
     * Data sent to the ability. The data to carry differs depending on the service to be processed and its field name must be consistent with the AA side.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    data?: object;
    /**
     * Whether the request is synchronous or asynchronous. The synchronous mode is used by default. Currently, the asynchronous mode is available only for internal abilities.
     * 0: Synchronous mode (default value)
     * 1: Asynchronous mode
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    syncOption?: number;
}
/**
 * @typedef SubscribeAbilityEventParam
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface SubscribeAbilityEventParam {
    /**
     * Name of the bundle where the ability has been located. The name is case sensitive and must be the same as that on the AA side.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    bundleName: string;
    /**
     * Ability name, which is case sensitive and must be the same as that on the AA side.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    abilityName: string;
    /**
     * Ability operation code, which defines the service function of an AA and must be consistent with the AA side.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    messageCode: number;
    /**
     * Ability type. Different types of abilities have different implementation on the AA side.
     * 0: Ability, which has an independent lifecycle. The FA starts and requests an AA through an RPC. Such type of abilities are used to provide basic services for multiple FAs to call or are used when the abilities should run in the background.
     * 1: Internal ability, which shares the same process with the FA and communicates with it by calling internal functions. Such type of abilities are used in scenarios that require low response latency and cannot be called by other FAs.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    abilityType: number;
    /**
     * Whether the request is synchronous or asynchronous. The synchronous mode is used by default. Currently, the asynchronous mode is available only for internal abilities.
     * 0: Synchronous mode (default value)
     * 1: Asynchronous mode
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    syncOption?: number;
}
/**
 * @typedef SendMessageOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface SendMessageOptions {
    /**
     * Destination device ID.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    deviceId: string;
    /**
     * Name of the destination bundle where the ability has been located. The name is case sensitive.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    bundleName: string;
    /**
     * Destination ability name, which is case sensitive.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    abilityName: string;
    /**
     * Messages sent to the destination device.
     * A maximum of 1 KB of data can be transmitted at a time.
     * If more than 1 KB of data needs to be transmitted, split the messages into multiple parts to transmit.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    message?: string;
    /**
     * Called when the messages are sent successfully.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    success?: () => void;
    /**
     * Called when the messages fail to be sent.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    complete?: () => void;
}
/**
 * @typedef SubscribeMessageOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface SubscribeMessageOptions {
    /**
     * Called when the messages are sent successfully.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    success?: (data: SubscribeMessageResponse) => void;
    /**
     * Called when the messages fail to be sent.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @typedef RequestParams
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface RequestParams {
    /**
     * The name of the bundle to start. It should be used with abilityname and case sensitive.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    bundleName?: string;
    /**
     * Ability name, which is case sensitive.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    abilityName?: string;
    /**
     * The list of entities to which the FA to be called. If it is not filled in, all entity lists will be found by default. It should be used with action.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    entities?: Array<string>;
    /**
     * Without specifying the bundle name and ability name, you can start the application according to other properties with action.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    action?: string;
    /**
     * If more than one FA meets the conditions, the user can select the device from the popup.
     * 0: Default. Select the FA to start from the local and remote devices.
     * 1: start FA from the local device.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    deviceType?: number;
    /**
     * Data sent to the ability which need to be serializable.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    data?: object;
    /**
     * Configuration switch when start FA.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    flag?: number;
    /**
     * Specify the url of the page which the FA to be called. Use home page directly by default.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    url?: string;
}
/**
 * @typedef FinishWithResultParams
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 */
export interface FinishWithResultParams {
    /**
     * Result code.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    code: number;
    /**
     * Returned data.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    result: object;
}
/**
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 5
 * @deprecated since 8
 * @useinstead ohos.ability.featureAbility.FeatureAbility
 */
export declare class FeatureAbility {
    /**
     * Start a FA without callback result.
     * @param { RequestParams } request - Indicates the request param.
     * @returns { Promise<Result> } A Promise object is returned, which contains the result of whether to call Ability's interface successfully.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     * @useinstead ohos.ability.featureAbility.FeatureAbility#startAbility
     */
    static startAbility(request: RequestParams): Promise<Result>;
    /**
     * Start a FA with callback result.
     * @param { RequestParams } request - Indicates the request param.
     * @returns { Promise<Result> } A Promise object is returned, which contains the result of the data FA returned.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     * @useinstead ohos.ability.featureAbility.FeatureAbility#startAbilityForResult
     */
    static startAbilityForResult(request: RequestParams): Promise<Result>;
    /**
     * FA call the interface to destroy itself and set the result as parameters.
     * @param { FinishWithResultParams } param - Indicates the request param.
     * @returns { Promise<Result> } A Promise object is returned, which contains the result whether to callback successfully.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     * @useinstead ohos.ability.featureAbility.FeatureAbility#terminateSelfWithResult
     */
    static finishWithResult(param: FinishWithResultParams): Promise<Result>;
    /**
     * Get device information list.
     * @param { number } flag - Default 0, get the information list of all devices in the network.
     * @returns { Promise<Result> } A Promise object is returned, which contains the result whether the device information list is obtained successfully.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static getDeviceList(flag: number): Promise<Result>;
    /**
     * Calls an AA.
     * @param { CallAbilityParam } param - Indicates the request param.
     * @returns { Promise<string> } A Promise object is returned, which contains the result data returned by the AA. The result is a JSON string.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static callAbility(param: CallAbilityParam): Promise<string>;
    /**
     * Start FA migration.
     * @returns { Promise<Result> } A Promise object is returned, which contains the result data returned by the AA. The result is a JSON string.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static continueAbility(): Promise<Result>;
    /**
     * Subscribe to events of an AA.
     * @param { SubscribeAbilityEventParam } param - Indicates the request param.
     * @param { Function } func - Indicates the event reporting callback.
     * @returns { Promise<string> } A Promise object is returned, which contains the result data returned by the AA. The result is a JSON string.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static subscribeAbilityEvent(param: SubscribeAbilityEventParam, func: Function): Promise<string>;
    /**
     * Unsubscribe from events of an AA.
     * @param { SubscribeAbilityEventParam } param - Indicates the request param.
     * @returns { Promise<string> } A Promise object is returned, which contains the result data returned by the AA. The result is a JSON string.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static unsubscribeAbilityEvent(param: SubscribeAbilityEventParam): Promise<string>;
    /**
     * Sends messages to the destination device.
     * @param { SendMessageOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static sendMsg(options: SendMessageOptions): void;
    /**
     * Listens for messages sent from other devices.
     * @param { SubscribeMessageOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static subscribeMsg(options: SubscribeMessageOptions): void;
    /**
     * Cancel the listening for messages sent from other devices.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 5
     * @deprecated since 8
     */
    static unsubscribeMsg(): void;
}
