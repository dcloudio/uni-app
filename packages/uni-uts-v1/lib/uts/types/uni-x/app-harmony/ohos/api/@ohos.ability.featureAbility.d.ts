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
import Want from './@ohos.app.ability.Want';
import { StartAbilityParameter } from './ability/startAbilityParameter';
import { AbilityResult } from './ability/abilityResult';
import { AppVersionInfo as _AppVersionInfo } from './app/appVersionInfo';
import { Context as _Context } from './app/context';
import { DataAbilityHelper } from './ability/dataAbilityHelper';
import { ConnectOptions } from './ability/connectOptions';
import { ProcessInfo as _ProcessInfo } from './app/processInfo';
import window from './@ohos.window';
/**
 * A Feature Ability represents an ability with a UI and is designed to interact with users.
 *
 * @namespace featureAbility
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 6
 */
declare namespace featureAbility {
    /**
     * Obtain the want sent from the source ability.
     *
     * @param { AsyncCallback<Want> } callback - Indicates the ability to start.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 6
     */
    function getWant(callback: AsyncCallback<Want>): void;
    /**
     * Obtain the want sent from the source ability.
     *
     * @returns { Promise<Want> } The promise form returns the Want result
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 6
     */
    function getWant(): Promise<Want>;
    /**
     * Starts a new ability.
     *
     * @param { StartAbilityParameter } parameter - Indicates the ability to start.
     * @param { AsyncCallback<number> } callback - Returns the result of starting Ability in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 6
     */
    function startAbility(parameter: StartAbilityParameter, callback: AsyncCallback<number>): void;
    /**
     * Starts a new ability.
     *
     * @param { StartAbilityParameter } parameter - Indicates the ability to start.
     * @returns { Promise<number> } The promise form returns the Ability result
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 6
     */
    function startAbility(parameter: StartAbilityParameter): Promise<number>;
    /**
     * Obtains the application context.
     *
     * @returns { Context } Returns the application context.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 6
     */
    function getContext(): Context;
    /**
     * Starts an ability and returns the execution result when the ability is destroyed.
     *
     * @param { StartAbilityParameter } parameter - Indicates the ability to start.
     * @param { AsyncCallback<AbilityResult> } callback - Returns the result of starting Ability in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function startAbilityForResult(parameter: StartAbilityParameter, callback: AsyncCallback<AbilityResult>): void;
    /**
     * Starts an ability and returns the execution result when the ability is destroyed.
     *
     * @param { StartAbilityParameter } parameter - Indicates the ability to start.
     * @returns { Promise<AbilityResult> } Returns the {@link AbilityResult}.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function startAbilityForResult(parameter: StartAbilityParameter): Promise<AbilityResult>;
    /**
     * Destroys the Page ability while returning the specified result code and data to the caller.
     *
     * @param { AbilityResult } parameter - Indicates the result to return.
     * @param { AsyncCallback<void> } callback - Return the result of stopping Ability in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function terminateSelfWithResult(parameter: AbilityResult, callback: AsyncCallback<void>): void;
    /**
     * Destroys the Page ability while returning the specified result code and data to the caller.
     *
     * @param { AbilityResult } parameter - Indicates the result to return.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function terminateSelfWithResult(parameter: AbilityResult): Promise<void>;
    /**
     * Destroys this Page ability.
     *
     * @param { AsyncCallback<void> } callback - Returns the stop ability result in the form of a callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function terminateSelf(callback: AsyncCallback<void>): void;
    /**
     * Destroys this Page ability.
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
     * Checks whether the main window of this ability has window focus.
     *
     * @param { AsyncCallback<boolean> } callback - Returns the result in the form of callback.If this ability currently
     *                                              has window focus,return true otherwise,return false.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function hasWindowFocus(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the main window of this ability has window focus.
     *
     * @returns { Promise<boolean> } Returns {@code true} if this ability currently has window focus;
     *                               returns {@code false} otherwise.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function hasWindowFocus(): Promise<boolean>;
    /**
     * Connects the current ability to an ability using the AbilityInfo.AbilityType.SERVICE template.
     *
     * @param { Want } request - The element name of the service ability
     * @param { ConnectOptions } options - The remote object instance
     * @returns { number } Returns the number code of the ability connected
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function connectAbility(request: Want, options: ConnectOptions): number;
    /**
     * Disconnects ability to a Service ability.
     *
     * @param { number } connection - The number code of the ability connected
     * @param { AsyncCallback<void> } callback - Returns the disconnection result in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function disconnectAbility(connection: number, callback: AsyncCallback<void>): void;
    /**
     * Disconnects ability to a Service ability.
     *
     * @param { number } connection - The number code of the ability connected
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function disconnectAbility(connection: number): Promise<void>;
    /**
     * Obtains the window corresponding to the current ability.
     *
     * @param { AsyncCallback<window.Window> } callback - Returns the window corresponding to the current ability
     *                                                    in the form of callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function getWindow(callback: AsyncCallback<window.Window>): void;
    /**
     * Obtains the window corresponding to the current ability.
     *
     * @returns { Promise<window.Window> } Returns the window corresponding to the current ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    function getWindow(): Promise<window.Window>;
    /**
     * Enum for the window configuration.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    export enum AbilityWindowConfiguration {
        /**
         * Undefined window format.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        WINDOW_MODE_UNDEFINED = 0,
        /**
         * Full screen.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        WINDOW_MODE_FULLSCREEN = 1,
        /**
         * If the screen is horizontally oriented, it indicates left split, and if the screen is vertically oriented,
         * it indicates upper split.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        WINDOW_MODE_SPLIT_PRIMARY = 100,
        /**
         * If the screen is horizontally oriented, it indicates right split, and if the screen is vertically oriented,
         * it indicates bottom split.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        WINDOW_MODE_SPLIT_SECONDARY = 101,
        /**
         * Suspended window.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        WINDOW_MODE_FLOATING = 102
    }
    /**
     * Enum for the special start setting used in starting ability.
     *
     * @enum { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    export enum AbilityStartSetting {
        /**
         * The parameter name for the window display size attribute.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        BOUNDS_KEY = 'abilityBounds',
        /**
         * The parameter name of the window display mode attribute.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        WINDOW_MODE_KEY = 'windowMode',
        /**
         * The window displays the parameter name of the device ID attribute.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        DISPLAY_ID_KEY = 'displayId'
    }
    /**
     * Enum for the error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    export enum ErrorCode {
        /**
         * There are no errors.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        NO_ERROR = 0,
        /**
         * Invalid parameter.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        INVALID_PARAMETER = -1,
        /**
         * Unable to find ABILITY.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        ABILITY_NOT_FOUND = -2,
        /**
         * Permission denied.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        PERMISSION_DENY = -3
    }
    /**
     * Enum for the operation type of data.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    export enum DataAbilityOperationType {
        /**
         * Insert type.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        TYPE_INSERT = 1,
        /**
         * Modify the type.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        TYPE_UPDATE = 2,
        /**
         * Delete type.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        TYPE_DELETE = 3,
        /**
         * Declaration type.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
         * @FAModelOnly
         * @since 7
         */
        TYPE_ASSERT = 4
    }
    /**
     * The context of an ability or an application. It allows access to
     * application-specific resources, request and verification permissions.
     * Can only be obtained through the ability.
     *
     * @typedef { _Context }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 9
     */
    export type Context = _Context;
    /**
     * Defines an AppVersionInfo object.
     *
     * @typedef { _AppVersionInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 9
     */
    export type AppVersionInfo = _AppVersionInfo;
    /**
     * This process information about an application.
     *
     * @typedef { _ProcessInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     * @since 9
     */
    export type ProcessInfo = _ProcessInfo;
}
export default featureAbility;
