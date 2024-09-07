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
import { AsyncCallback } from './@ohos.base';
import { StartAbilityParameter } from './ability/startAbilityParameter';
import { DataAbilityHelper } from './ability/dataAbilityHelper';
import { NotificationRequest } from './notification/notificationRequest';
import { ConnectOptions } from './ability/connectOptions';
import Want from './@ohos.app.ability.Want';
/**
 * A Particle Ability represents an ability with service.
 *
 * @namespace particleAbility
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 7
 */
declare namespace particleAbility {
    /**
     * Service ability uses this method to start a specific ability.
     *
     * @param { StartAbilityParameter } parameter - Indicates the ability to start.
     * @param { AsyncCallback<void> } callback - Returns the result of starting Ability in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function startAbility(parameter: StartAbilityParameter, callback: AsyncCallback<void>): void;
    /**
     * Service ability uses this method to start a specific ability.
     *
     * @param { StartAbilityParameter } parameter - Indicates the ability to start.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function startAbility(parameter: StartAbilityParameter): Promise<void>;
    /**
     * Destroys this service ability.
     *
     * @param { AsyncCallback<void> } callback - Return the result of stopping Ability in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function terminateSelf(callback: AsyncCallback<void>): void;
    /**
     * Destroys this service ability.
     *
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function terminateSelf(): Promise<void>;
    /**
     * Obtains the dataAbilityHelper.
     *
     * @param { string } uri - Indicates the path of the file to open.
     * @returns { DataAbilityHelper } Returns the dataAbilityHelper.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function acquireDataAbilityHelper(uri: string): DataAbilityHelper;
    /**
     * Keep this Service ability in the background and display a notification bar.
     *
     * @permission ohos.permission.KEEP_BACKGROUND_RUNNING
     * @param { number } id - Identifies the notification bar information.
     * @param { NotificationRequest } request - Indicates the notificationRequest instance containing information
     *                                          for displaying a notification bar.
     * @param { AsyncCallback<void> } callback - returns the result of starting a long-term task in the form of callback.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager/backgroundTaskManager#startBackgroundRunning
     */
    function startBackgroundRunning(id: number, request: NotificationRequest, callback: AsyncCallback<void>): void;
    /**
     * Keep this Service ability in the background and display a notification bar.
     *
     * @permission ohos.permission.KEEP_BACKGROUND_RUNNING
     * @param { number } id - Identifies the notification bar information.
     * @param { NotificationRequest } request - Indicates the notificationRequest instance containing information
     *                                          for displaying a notification bar.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager/backgroundTaskManager#startBackgroundRunning
     */
    function startBackgroundRunning(id: number, request: NotificationRequest): Promise<void>;
    /**
     * Cancel background running of this ability to free up system memory.
     *
     * @param { AsyncCallback<void> } callback - Returns the result of canceling a long-term task in the form of callback.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager/backgroundTaskManager#stopBackgroundRunning
     */
    function cancelBackgroundRunning(callback: AsyncCallback<void>): void;
    /**
     * Cancel background running of this ability to free up system memory.
     *
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.ResourceSchedule.BackgroundTaskManager.ContinuousTask
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.resourceschedule.backgroundTaskManager/backgroundTaskManager#stopBackgroundRunning
     */
    function cancelBackgroundRunning(): Promise<void>;
    /**
     * Connects an ability to a Service ability.
     *
     * @param { Want } request - Indicates the Service ability to connect.
     * @param { ConnectOptions } options - Callback object for the client. If this parameter is null,
     *                                   an exception is thrown.
     * @returns { number } unique identifier of the connection between the client and the service side.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function connectAbility(request: Want, options: ConnectOptions): number;
    /**
     * Disconnects ability to a Service ability.
     *
     * @param { number } connection - the connection id returned from connectAbility api.
     * @param { AsyncCallback<void> } callback - Returns the disconnection result in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function disconnectAbility(connection: number, callback: AsyncCallback<void>): void;
    /**
     * Disconnects ability to a Service ability.
     *
     * @param { number } connection - the connection id returned from connectAbility api.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function disconnectAbility(connection: number): Promise<void>;
    /**
     * Obtain the errorCode.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    export enum ErrorCode {
        /**
         * Invalid parameter.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        INVALID_PARAMETER = -1
    }
}
export default particleAbility;
