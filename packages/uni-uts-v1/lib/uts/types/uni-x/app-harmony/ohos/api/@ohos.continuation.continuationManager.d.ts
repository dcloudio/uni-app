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
import { Callback } from './@ohos.base';
import { AsyncCallback } from './@ohos.base';
import type { ContinuationResult as _ContinuationResult } from './continuation/continuationResult';
import type { ContinuationExtraParams as _ContinuationExtraParams } from './continuation/continuationExtraParams';
/**
 * Provides methods for interacting with the continuation manager service, including methods for registering and
 * Unregister the ability to hop, updating the device connection state, and showing the list of devices
 * that can be selected for hopping.
 *
 * @namespace continuationManager
 * @syscap SystemCapability.Ability.DistributedAbilityManager
 * @since 8
 */
/**
 * Provides methods for interacting with the continuation manager service, including methods for registering and
 * Unregister the ability to hop, updating the device connection state, and showing the list of devices
 * that can be selected for hopping.
 *
 * @namespace continuationManager
 * @syscap SystemCapability.Ability.DistributedAbilityManager
 * @atomicservice
 * @since 11
 */
declare namespace continuationManager {
    /**
     * Called when the user selects devices from the candidate device list.
     * You can implement your own processing logic in this callback to initiate the hop process.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceSelected' } type - deviceSelected.
     * @param { number } token - Registered token.
     * @param { Callback<Array<ContinuationResult>> } callback - Called when the user selects a device from the device
     *                                                         selection module, returning the device ID,device type,
     *                                                         and device name for developers to use
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Called when the user selects devices from the candidate device list.
     * You can implement your own processing logic in this callback to initiate the hop process.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceSelected' } type - deviceSelected.
     * @param { number } token - Registered token.
     * @param { Callback<Array<ContinuationResult>> } callback - Called when the user selects a device from the device
     *                                                         selection module, returning the device ID,device type,
     *                                                         and device name for developers to use
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function on(type: 'deviceSelected', token: number, callback: Callback<Array<ContinuationResult>>): void;
    /**
     * Called when devices are disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceSelected' } type - deviceSelected.
     * @param { number } token - Registered token.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Called when devices are disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceSelected' } type - deviceSelected.
     * @param { number } token - Registered token.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function off(type: 'deviceSelected', token: number): void;
    /**
     * Called when devices are disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceUnselected' } type - deviceUnselected.
     * @param { number } token - Registered token.
     * @param { Callback<Array<ContinuationResult>> } callback - Called when the user disconnects the device from the
     *                                                           device selection module, returning the device ID,
     *                                                           device type, and device name for developers to use
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Called when devices are disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceUnselected' } type - deviceUnselected.
     * @param { number } token - Registered token.
     * @param { Callback<Array<ContinuationResult>> } callback - Called when the user disconnects the device from the
     *                                                           device selection module, returning the device ID,
     *                                                           device type, and device name for developers to use
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function on(type: 'deviceUnselected', token: number, callback: Callback<Array<ContinuationResult>>): void;
    /**
     * Called when devices are disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceUnselected' } type - deviceUnselected.
     * @param { number } token - Registered token.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Called when devices are disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { 'deviceUnselected' } type - deviceUnselected.
     * @param { number } token - Registered token.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function off(type: 'deviceUnselected', token: number): void;
    /**
     * Called when the user selects a device from the candidate device list.
     * You can implement your own processing logic in this callback to initiate the hop process.
     *
     * @param { 'deviceConnect' } type - deviceConnect.
     * @param { Callback<ContinuationResult> } callback - Called when the user selects a device from the device selection
     *                                                    module, returning the device ID,device type, and device name for
     *                                                    developers to use.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#on
     */
    function on(type: 'deviceConnect', callback: Callback<ContinuationResult>): void;
    /**
     * Called when the user selects a device from the candidate device list.
     * You can implement your own processing logic in this callback to initiate the hop process.
     *
     * @param { 'deviceConnect' } type - deviceConnect.
     * @param { Callback<ContinuationResult> } [callback] - Called when the user selects a device from the device
     *                                                      selection module, returning the device ID,device type,
     *                                                      and device name for developers to use.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#off
     */
    function off(type: 'deviceConnect', callback?: Callback<ContinuationResult>): void;
    /**
     * Called when a device is disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @param { 'deviceDisconnect' } type - deviceDisconnect.
     * @param { Callback<string> } callback - Called when the user disconnects the device from the device selection
     *                                        module, returning the device ID for developers to use.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#on
     */
    function on(type: 'deviceDisconnect', callback: Callback<string>): void;
    /**
     * Called when a device is disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @param { 'deviceDisconnect' } type - deviceDisconnect.
     * @param { Callback<string> } [callback] - Called when the user selects a device from the device selection module,
     *                                          returning the device ID,device type, and device name for developers to use.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#off
     */
    function off(type: 'deviceDisconnect', callback?: Callback<string>): void;
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @param { AsyncCallback<number> } callback - The AsyncCallback form returns the token generated after connecting to
     *                                             the flow management service.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#registerContinuation
     */
    function register(callback: AsyncCallback<number>): void;
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @param { ContinuationExtraParams } options - Indicates the {@link ExtraParams} object containing the extra
     *                                              parameters used to filter the list of available devices.
     * @param { AsyncCallback<number> } callback - The AsyncCallback form returns the token generated after
     *                                             connecting to the flow management service.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#registerContinuation
     */
    function register(options: ContinuationExtraParams, callback: AsyncCallback<number>): void;
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @param { ContinuationExtraParams } [options] - Indicates the {@link ExtraParams} object containing the extra
     *                                                parameters used to filter the list of available devices.
     * @returns { Promise<number> } callback Indicates the callback to be invoked when the continuation manager service
     *                              is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#registerContinuation
     */
    function register(options?: ContinuationExtraParams): Promise<number>;
    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @param { number } token - Indicates the registration token of the ability.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#unregisterContinuation
     */
    function unregister(token: number, callback: AsyncCallback<void>): void;
    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @param { number } token - Indicates the registration token of the ability.
     * @returns { Promise<void> } callback Indicates the callback to be invoked when the continuation manager
     *                            service is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#unregisterContinuation
     */
    function unregister(token: number): Promise<void>;
    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @param { number } token - Indicates the registration token of the ability.
     * @param { string } deviceId - Indicates the ID of the device whose connection state is to be updated.
     * @param { DeviceConnectState } status - Indicates the connection state to update.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#updateContinuationState
     */
    function updateConnectStatus(token: number, deviceId: string, status: DeviceConnectState, callback: AsyncCallback<void>): void;
    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @param { number } token - Indicates the registration token of the ability.
     * @param { string } deviceId - Indicates the ID of the device whose connection state is to be updated.
     * @param { DeviceConnectState } status - Indicates the connection state to update.
     * @returns { Promise<void> } callback Indicates the callback to be invoked when the continuation
     *                            manager service is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#updateContinuationState
     */
    function updateConnectStatus(token: number, deviceId: string, status: DeviceConnectState): Promise<void>;
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @param { number } token - Indicates the registration token of the ability.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#startContinuationDeviceManager
     */
    function startDeviceManager(token: number, callback: AsyncCallback<void>): void;
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @param { number } token - Indicates the registration token of the ability.
     * @param { ContinuationExtraParams } options - Indicates the extraParams object containing the extra parameters
     *                                            used to filter the list of available devices. This parameter is null.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#startContinuationDeviceManager
     */
    function startDeviceManager(token: number, options: ContinuationExtraParams, callback: AsyncCallback<void>): void;
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @param { number } token - Indicates the registration token of the ability.
     * @param { ContinuationExtraParams } [options] - Indicates the extraParams object containing the extra parameters
     *                                                used to filter the list of available devices. This parameter is null.
     * @returns { Promise<void> } callback Indicates the callback to be invoked when the continuation manager service
     *                            is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager/continuationManager#startContinuationDeviceManager
     */
    function startDeviceManager(token: number, options?: ContinuationExtraParams): Promise<void>;
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { AsyncCallback<number> } callback - The AsyncCallback form returns the token generated after connecting to
     *                                             the flow management service.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600003 - The number of token registration times has reached the upper limit.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { AsyncCallback<number> } callback - The AsyncCallback form returns the token generated after connecting to
     *                                             the flow management service.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600003 - The number of token registration times has reached the upper limit.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function registerContinuation(callback: AsyncCallback<number>): void;
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { ContinuationExtraParams } options - Indicates the {@link ExtraParams} object containing extra parameters
     *                                              used to filter the list of available devices.
     * @param { AsyncCallback<number> } callback - The AsyncCallback form returns the token generated after connecting to
     *                                             flow management service.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600003 - The number of token registration times has reached the upper limit.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { ContinuationExtraParams } options - Indicates the {@link ExtraParams} object containing extra parameters
     *                                              used to filter the list of available devices.
     * @param { AsyncCallback<number> } callback - The AsyncCallback form returns the token generated after connecting to
     *                                             flow management service.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600003 - The number of token registration times has reached the upper limit.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function registerContinuation(options: ContinuationExtraParams, callback: AsyncCallback<number>): void;
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { ContinuationExtraParams } [options] - Indicates the {@link ExtraParams} object containing the extra
     *                                                parameters used to filter the list of available devices.
     * @returns { Promise<number> } callback Indicates the callback to be invoked when the continuation manager
     *                              service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Incorrect parameter types
     * <br>2. Parameter verification failed;
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600003 - The number of token registration times has reached the upper limit.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { ContinuationExtraParams } [options] - Indicates the {@link ExtraParams} object containing the extra
     *                                                parameters used to filter the list of available devices.
     * @returns { Promise<number> } callback Indicates the callback to be invoked when the continuation manager
     *                              service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Incorrect parameter types;
     * <br>2. Parameter verification failed;
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600003 - The number of token registration times has reached the upper limit.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function registerContinuation(options?: ContinuationExtraParams): Promise<number>;
    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { AsyncCallback<void> } callback - The AsyncCallback form returns token generated after connecting to flow
     *                                           management service.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { AsyncCallback<void> } callback - The AsyncCallback form returns token generated after connecting to flow
     *                                           management service.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function unregisterContinuation(token: number, callback: AsyncCallback<void>): void;
    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function unregisterContinuation(token: number): Promise<void>;
    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { string } deviceId - Indicates the ID of the device whose connection state is to be updated.
     * @param { DeviceConnectState } status - Indicates the connection state to update.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { string } deviceId - Indicates the ID of the device whose connection state is to be updated.
     * @param { DeviceConnectState } status - Indicates the connection state to update.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function updateContinuationState(token: number, deviceId: string, status: DeviceConnectState, callback: AsyncCallback<void>): void;
    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { string } deviceId - Indicates the ID of the device whose connection state is to be updated.
     * @param { DeviceConnectState } status - Indicates the connection state to update.
     * @returns { Promise<void> } callback Indicates the callback to be invoked when the continuation manager service
     *                            is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { string } deviceId - Indicates the ID of the device whose connection state is to be updated.
     * @param { DeviceConnectState } status - Indicates the connection state to update.
     * @returns { Promise<void> } callback Indicates the callback to be invoked when the continuation manager service
     *                            is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function updateContinuationState(token: number, deviceId: string, status: DeviceConnectState): Promise<void>;
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { AsyncCallback<void> } callback - AsyncCallback returns the interface call result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function startContinuationDeviceManager(token: number, callback: AsyncCallback<void>): void;
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { ContinuationExtraParams } options - Indicates the extraParams object containing the extra parameters
     *                                            used to filter list of available devices. This parameter can be null.
     * @param { AsyncCallback<void> } callback - AsyncCallback form returns the interface call result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { ContinuationExtraParams } options - Indicates the extraParams object containing the extra parameters
     *                                            used to filter list of available devices. This parameter can be null.
     * @param { AsyncCallback<void> } callback - AsyncCallback form returns the interface call result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function startContinuationDeviceManager(token: number, options: ContinuationExtraParams, callback: AsyncCallback<void>): void;
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { ContinuationExtraParams } [options] - Indicates extraParams object containing extra parameters used to
     *                                                filter the list of available devices. This parameter can be null.
     * @returns { Promise<void> } callback Indicates the callback to be invoked when continuation manager service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Incorrect parameter types
     * <br>2. Parameter verification failed;
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param { number } token - Indicates the registration token of the ability.
     * @param { ContinuationExtraParams } [options] - Indicates extraParams object containing extra parameters used to
     *                                                filter the list of available devices. This parameter can be null.
     * @returns { Promise<void> } callback Indicates the callback to be invoked when continuation manager service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Incorrect parameter types;
     * <br>2. Parameter verification failed;
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    function startContinuationDeviceManager(token: number, options?: ContinuationExtraParams): Promise<void>;
    /**
     * Device connection status data structure.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Device connection status data structure.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    export enum DeviceConnectState {
        /**
         * Initial state of device connection.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @since 8
         */
        /**
         * Initial state of device connection.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @atomicservice
         * @since 11
         */
        IDLE = 0,
        /**
         * Device connection status.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @since 8
         */
        /**
         * Device connection status.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @atomicservice
         * @since 11
         */
        CONNECTING = 1,
        /**
         * The device is connected.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @since 8
         */
        /**
         * The device is connected.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @atomicservice
         * @since 11
         */
        CONNECTED = 2,
        /**
         * The device is disconnected.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @since 8
         */
        /**
         * The device is disconnected.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @atomicservice
         * @since 11
         */
        DISCONNECTING = 3
    }
    /**
     * Indicates the description of additional parameters for continuation.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    /**
     * Indicates the description of additional parameters for continuation.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    export enum ContinuationMode {
        /**
         * Collaboration with a single device.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @since 8
         */
        /**
         * Collaboration with a single device.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @atomicservice
         * @since 11
         */
        COLLABORATION_SINGLE = 0,
        /**
         * Collaboration with multiple devices.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @since 8
         */
        /**
         * Collaboration with multiple devices.
         *
         * @syscap SystemCapability.Ability.DistributedAbilityManager
         * @atomicservice
         * @since 11
         */
        COLLABORATION_MULTIPLE = 1
    }
    /**
     * Indicates the description of transfer results for continuation.
     *
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 10
     */
    /**
     * Indicates the description of transfer results for continuation.
     * @typedef { _ContinuationResult }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    export type ContinuationResult = _ContinuationResult;
    /**
     * Indicates the description of additional parameters for continuation.
     *
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 10
     */
    /**
     * Indicates the description of additional parameters for continuation.
     * @typedef { _ContinuationExtraParams }
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @atomicservice
     * @since 11
     */
    export type ContinuationExtraParams = _ContinuationExtraParams;
}
export default continuationManager;
