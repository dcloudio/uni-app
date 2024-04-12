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
 * This module provides the Network Response.
 * @interface NetworkResponse
 * @syscap SystemCapability.Communication.NetManager.Core
 * @since 3
 */
export interface NetworkResponse {
    /**
     * Network type. The values can be 2G, 3G, 4G, WiFi, or none.
     * @type {string}
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 3
     */
    type: string;
    /**
     * Whether the billing is based on the data volume.
     * @type {boolean}
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 3
     */
    metered: boolean;
}
/**
 * @syscap SystemCapability.Communication.NetManager.Core
 * @since 3
 */
export default class Network {
    /**
     * Obtains the network type.
     * @param { object } options - Options.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 3
     */
    static getType(options?: {
        /**
         * Called when the network type is obtained.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 3
         */
        success?: (data: NetworkResponse) => void;
        /**
         * Called when the network type fails to be obtained.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 3
         */
        fail?: (data: any, code: number) => void;
        /**
         * Called when the execution is completed.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 3
         */
        complete?: () => void;
    }): void;
    /**
     * Listens to the network connection state. If this method is called multiple times, the last call takes effect.
     * @param { object } options - Options.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 3
     */
    static subscribe(options?: {
        /**
         * Called when the network connection state changes.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 3
         */
        success?: (data: NetworkResponse) => void;
        /**
         * Called when the listening fails.
         * @syscap SystemCapability.Communication.NetManager.Core
         * @since 3
         */
        fail?: (data: any, code: number) => void;
    }): void;
    /**
     * Cancels listening to the network connection state.
     * @syscap SystemCapability.Communication.NetManager.Core
     * @since 3
     */
    static unsubscribe(): void;
}
