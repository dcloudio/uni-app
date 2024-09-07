/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit AbilityKit
 */
import Ability from './@ohos.app.ability.Ability';
import AbilityConstant from './@ohos.app.ability.AbilityConstant';
import UIAbilityContext from './application/UIAbilityContext';
import rpc from './@ohos.rpc';
import Want from './@ohos.app.ability.Want';
import window from './@ohos.window';
/**
 * The prototype of the listener function interface registered by the Caller.
 *
 * @typedef OnReleaseCallback
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 9
 */
export interface OnReleaseCallback {
    /**
     * Defines the callback of OnRelease.
     *
     * @param { string } msg - The notification event string listened to by the OnRelease.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    (msg: string): void;
}
/**
 * The prototype of the listener function interface registered by the Caller.
 *
 * @typedef OnRemoteStateChangeCallback
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 10
 */
export interface OnRemoteStateChangeCallback {
    /**
     * Defines the callback of OnRemoteStateChange.
     *
     * @param { string } msg - The notification event string listened to by the OnRemoteStateChange.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    (msg: string): void;
}
/**
 * The prototype of the message listener function interface registered by the Callee.
 *
 * @typedef CalleeCallback
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 9
 */
export interface CalleeCallback {
    /**
     * Defines the callback of Callee.
     *
     * @param { rpc.MessageSequence } indata - Notification indata to the callee.
     * @returns { rpc.Parcelable } Returns the callee's notification result indata.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    (indata: rpc.MessageSequence): rpc.Parcelable;
}
/**
 * The interface of a Caller.
 *
 * @interface Caller
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 9
 */
export interface Caller {
    /**
     * Notify the server of Parcelable type data.
     *
     * @param { string } method - The notification event string listened to by the callee.
     * @param { rpc.Parcelable } data - Notification data to the callee.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16200001 - Caller released. The caller has been released.
     * @throws { BusinessError } 16200002 - Callee invalid. The callee does not exist.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    call(method: string, data: rpc.Parcelable): Promise<void>;
    /**
     * Notify the server of Parcelable type data and return the notification result.
     *
     * @param { string } method - The notification event string listened to by the callee.
     * @param { rpc.Parcelable } data - Notification data to the callee.
     * @returns { Promise<rpc.MessageSequence> } Returns the callee's notification result data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16200001 - Caller released. The caller has been released.
     * @throws { BusinessError } 16200002 - Callee invalid. The callee does not exist.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    callWithResult(method: string, data: rpc.Parcelable): Promise<rpc.MessageSequence>;
    /**
     * Register the generic component server Stub (stub) disconnect listening notification.
     *
     * @throws { BusinessError } 16200001 - Caller released. The caller has been released.
     * @throws { BusinessError } 16200002 - Callee invalid. The callee does not exist.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    release(): void;
    /**
     * Register death listener notification callback.
     *
     * @param { OnReleaseCallback } callback - Register a callback function for listening for notifications.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16200001 - Caller released. The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onRelease(callback: OnReleaseCallback): void;
    /**
     * Register state changed listener notification callback of remote ability.
     *
     * @param { OnRemoteStateChangeCallback } callback - Register a callback function for listening for notifications.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types.
     * @throws { BusinessError } 16200001 - Caller released. The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    onRemoteStateChange(callback: OnRemoteStateChangeCallback): void;
    /**
     * Register death listener notification callback.
     *
     * @param { 'release' } type - release.
     * @param { OnReleaseCallback } callback - Register a callback function for listening for notifications.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16200001 - Caller released. The caller has been released.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    on(type: 'release', callback: OnReleaseCallback): void;
    /**
     * Unregister death listener notification callback.
     *
     * @param { 'release' } type - release.
     * @param { OnReleaseCallback } callback - Unregister a callback function for listening for notifications.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    off(type: 'release', callback: OnReleaseCallback): void;
    /**
     * Unregister all death listener notification callback.
     *
     * @param { 'release' } type - release.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    off(type: 'release'): void;
}
/**
 * The interface of a Callee.
 *
 * @interface Callee
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 9
 */
export interface Callee {
    /**
     * Register data listener callback.
     *
     * @param { string } method - A string registered to listen for notification events.
     * @param { CalleeCallback } callback - Register a callback function that listens for notification events.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16200004 - Method registered. The method has registered.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    on(method: string, callback: CalleeCallback): void;
    /**
     * Unregister data listener callback.
     *
     * @param { string } method - A string registered to listen for notification events.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16200005 - Method not registered. The method has not registered.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    off(method: string): void;
}
/**
 * The class of a UI ability.
 *
 * @extends Ability
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 9
 */
/**
 * The class of a UI ability.
 *
 * @extends Ability
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @crossplatform
 * @since 10
 */
/**
 * The class of a UI ability.
 *
 * @extends Ability
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export default class UIAbility extends Ability {
    /**
     * Indicates configuration information about an ability context.
     *
     * @type { UIAbilityContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Indicates configuration information about an ability context.
     *
     * @type { UIAbilityContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates configuration information about an ability context.
     *
     * @type { UIAbilityContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    context: UIAbilityContext;
    /**
     * Indicates ability launch want.
     *
     * @type { Want }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Indicates ability launch want.
     *
     * @type { Want }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    launchWant: Want;
    /**
     * Indicates ability last request want.
     *
     * @type { Want }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Indicates ability last request want.
     *
     * @type { Want }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    lastRequestWant: Want;
    /**
     * Call Service Stub Object.
     *
     * @type { Callee }
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    callee: Callee;
    /**
     * Called back when an ability is started for initialization.
     *
     * @param { Want } want - Indicates the want info of the created ability.
     * @param { AbilityConstant.LaunchParam } launchParam - Indicates the launch param.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when an ability is started for initialization.
     *
     * @param { Want } want - Indicates the want info of the created ability.
     * @param { AbilityConstant.LaunchParam } launchParam - Indicates the launch param.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when an ability is started for initialization.
     *
     * @param { Want } want - Indicates the want info of the created ability.
     * @param { AbilityConstant.LaunchParam } launchParam - Indicates the launch param.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void;
    /**
     * Called back when an ability window stage is created.
     *
     * @param { window.WindowStage } windowStage - Indicates the created WindowStage.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when an ability window stage is created.
     *
     * @param { window.WindowStage } windowStage - Indicates the created WindowStage.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when an ability window stage is created.
     *
     * @param { window.WindowStage } windowStage - Indicates the created WindowStage.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onWindowStageCreate(windowStage: window.WindowStage): void;
    /**
     * Called back when an ability window stage will destroy.
     *
     * @param { window.WindowStage } windowStage - Indicates the WindowStage that will be destroyed.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 12
     */
    onWindowStageWillDestroy(windowStage: window.WindowStage): void;
    /**
     * Called back when an ability window stage is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when an ability window stage is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when an ability window stage is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onWindowStageDestroy(): void;
    /**
     * Called back when an ability window stage is restored.
     *
     * @param { window.WindowStage } windowStage - window stage to restore
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when an ability window stage is restored.
     *
     * @param { window.WindowStage } windowStage - window stage to restore
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onWindowStageRestore(windowStage: window.WindowStage): void;
    /**
     * Called back before an ability is destroyed.
     *
     * @returns { void | Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back before an ability is destroyed.
     *
     * @returns { void | Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called back before an ability is destroyed.
     *
     * @returns { void | Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onDestroy(): void | Promise<void>;
    /**
     * Called back when the state of an ability changes to foreground.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when the state of an ability changes to foreground.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when the state of an ability changes to foreground.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onForeground(): void;
    /**
     * Called back when the state of an ability changes to background.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when the state of an ability changes to background.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called back when the state of an ability changes to background.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onBackground(): void;
    /**
     * Called back when an ability prepares to continue.
     *
     * @param { object } wantParam - Indicates the want parameter.
     * @returns { AbilityConstant.OnContinueResult } Return the result of onContinue.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when an ability prepares to continue.
     *
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @returns { AbilityConstant.OnContinueResult } Return the result of onContinue.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    /**
     * Called back when an ability prepares to continue.
     *
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @returns { AbilityConstant.OnContinueResult | Promise<AbilityConstant.OnContinueResult> } Return the result of onContinue, support promise.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 12
     */
    onContinue(wantParam: Record<string, Object>): AbilityConstant.OnContinueResult | Promise<AbilityConstant.OnContinueResult>;
    /**
     * Called when the launch mode of an ability is set to singleton.
     * This happens when you re-launch an ability that has been at the top of the ability stack.
     *
     * @param { Want } want - Indicates the want info of ability.
     * @param { AbilityConstant.LaunchParam } launchParam - Indicates the launch parameters.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called when the launch mode of an ability is set to singleton.
     * This happens when you re-launch an ability that has been at the top of the ability stack.
     *
     * @param { Want } want - Indicates the want info of ability.
     * @param { AbilityConstant.LaunchParam } launchParam - Indicates the launch parameters.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the launch mode of an ability is set to singleton.
     * This happens when you re-launch an ability that has been at the top of the ability stack.
     *
     * @param { Want } want - Indicates the want info of ability.
     * @param { AbilityConstant.LaunchParam } launchParam - Indicates the launch parameters.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void;
    /**
     * Called when dump client information is required.
     * It is recommended that developers don't DUMP sensitive information.
     *
     * @param { Array<string> } params - Indicates the params from command.
     * @returns { Array<string> } Return the dump info array.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called when dump client information is required.
     * It is recommended that developers don't DUMP sensitive information.
     *
     * @param { Array<string> } params - Indicates the params from command.
     * @returns { Array<string> } Return the dump info array.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onDump(params: Array<string>): Array<string>;
    /**
     * Called back when an ability prepares to save.
     *
     * @param { AbilityConstant.StateType } reason - state type when save.
     * @param { object } wantParam - Indicates the want parameter.
     * @returns { AbilityConstant.OnSaveResult } agree with the current UIAbility status or not.return 0 if ability
     *                                           agrees to save data successfully, otherwise errcode.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    /**
     * Called back when an ability prepares to save.
     *
     * @param { AbilityConstant.StateType } reason - state type when save.
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @returns { AbilityConstant.OnSaveResult } agree with the current UIAbility status or not.return 0 if ability
     *                                           agrees to save data successfully, otherwise errcode.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onSaveState(reason: AbilityConstant.StateType, wantParam: Record<string, Object>): AbilityConstant.OnSaveResult;
    /**
     * Called back when an ability shares data.
     *
     * @param { object } wantParam - Indicates the want parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    /**
     * Called back when an ability shares data.
     *
     * @param { Record<string, Object> } wantParam - Indicates the want parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onShare(wantParam: Record<string, Object>): void;
    /**
     * Called back when an ability prepare to terminate.
     *
     * @permission ohos.permission.PREPARE_APP_TERMINATE
     * @returns { boolean } Returns {@code true} if the ability need to top terminating; returns {@code false} if the
     *          ability need to terminate.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    /**
     * Called back when an ability prepare to terminate.
     *
     * @permission ohos.permission.PREPARE_APP_TERMINATE
     * @returns { boolean } Returns {@code true} if the ability need to top terminating; returns {@code false} if the
     *          ability need to terminate.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onPrepareToTerminate(): boolean;
    /**
     * Called back when back press is dispatched.
     *
     * @returns { boolean } Returns {@code true} means the ability will move to background when back is pressed;
     *          Returns {@code false} means the ability will be destroyed when back is pressed.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 10
     */
    /**
     * Called back when back press is dispatched.
     *
     * @returns { boolean } Returns {@code true} means the ability will move to background when back is pressed;
     *          Returns {@code false} means the ability will be destroyed when back is pressed.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    onBackPressed(): boolean;
}
