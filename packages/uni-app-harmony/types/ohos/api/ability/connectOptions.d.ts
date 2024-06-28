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
import { ElementName } from '../bundleManager/ElementName';
import rpc from './../@ohos.rpc';
/**
 * As an input parameter when connecting a specified background service, it is used to receive
 * state changes during the connection.
 *
 * @interface ConnectOptions
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 7
 */
export interface ConnectOptions {
    /**
     * The callback interface was connect successfully.
     *
     * @param { ElementName } elementName - The element name of the service ability
     * @param { rpc.IRemoteObject } remote - The remote object instance
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    /**
     * The callback interface was connect successfully.
     *
     * @param { ElementName } elementName - The ohos.bundleManager.ElementName object of the service ability
     * @param { rpc.IRemoteObject } remote - The remote object instance
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 12
     */
    onConnect(elementName: ElementName, remote: rpc.IRemoteObject): void;
    /**
     * The callback interface was disconnect successfully.
     *
     * @param { ElementName } elementName - The element name of the service ability
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    /**
     * The callback interface was disconnect successfully.
     *
     * @param { ElementName } elementName - The ohos.bundleManager.ElementName object of the service ability
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 12
     */
    onDisconnect(elementName: ElementName): void;
    /**
     * The callback interface was connect failed.
     *
     * @param { number } code - The error code of the failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 7
     */
    onFailed(code: number): void;
}
