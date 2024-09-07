/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit DriverDevelopmentKit
 */
import type rpc from './@ohos.rpc';
import type Want from './@ohos.app.ability.Want';
import _DriverExtensionContext from './application/DriverExtensionContext';
/**
 * Define a DriverExtensionContext for store context.
 *
 * @typedef { _DriverExtensionContext }
 * @syscap SystemCapability.Driver.ExternalDevice
 * @since 10
 */
export type DriverExtensionContext = _DriverExtensionContext;
/**
 * class of driver extension ability.
 * @syscap SystemCapability.Driver.ExternalDevice
 * @StageModelOnly
 * @since 10
 */
export default class DriverExtensionAbility {
    /**
     * Indicates driver extension ability context.
     *
     * @type { DriverExtensionContext }
     * @syscap SystemCapability.Driver.ExternalDevice
     * @StageModelOnly
     * @since 10
     */
    context: DriverExtensionContext;
    /**
     * Called back when a driver extension is started for initialization.
     * @param { Want } want - Indicates the want of created driver extension.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @StageModelOnly
     * @since 10
     */
    onInit(want: Want): void;
    /**
     * Called back before a driver extension is destroyed.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @StageModelOnly
     * @since 10
     */
    onRelease(): void;
    /**
     * Called back when a driver extension is first connected to an ability.
     * @param { Want } want - Indicates connection information about the Driver ability.
     * @returns { rpc.RemoteObject | Promise<rpc.RemoteObject> } Rpc remoteObject.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @StageModelOnly
     * @since 10
     */
    onConnect(want: Want): rpc.RemoteObject | Promise<rpc.RemoteObject>;
    /**
     * Called back when all abilities connected to a driver extension are disconnected.
     * @param { Want } want - Indicates disconnection information about the driver extension.
     * @returns { void | Promise<void> }
     * @syscap SystemCapability.Driver.ExternalDevice
     * @StageModelOnly
     * @since 10
     */
    onDisconnect(want: Want): void | Promise<void>;
    /**
     * Called when dump client information is required.
     * It is recommended that developers don't DUMP sensitive information.
     * @param { Array<string> } params - Indicates th e params from command.
     * @returns { Array<string> } The dump info array.
     * @syscap SystemCapability.Driver.ExternalDevice
     * @StageModelOnly
     * @since 10
     */
    onDump(params: Array<string>): Array<string>;
}
