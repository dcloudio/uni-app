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
 * @kit BasicServicesKit
 */
import { AsyncCallback } from './@ohos.base';
/**
 * Provides a mechanism to prevent the system from hibernating so that the applications can run in the background or
 * when the screen is off.
 * <p>{@link create} can be called to obtain a {@link RunningLock}.
 * <p>{@link hold} can be called to set the lock duration, during which the system will not hibernate. After the
 * lock duration times out, the lock is automatically released and the system hibernates if no other
 * {@link RunningLock} is set.
 *
 * @namespace runningLock
 * @syscap SystemCapability.PowerManager.PowerManager.Core
 * @since 7
 */
declare namespace runningLock {
    /**
     * Provides a mechanism to prevent the system from hibernating so that the applications can run in the background or
     * when the screen is off.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     */
    class RunningLock {
        /**
         * Prevents the system from hibernating and sets the lock duration.
         * This method requires the ohos.permission.RUNNING_LOCK permission.
         *
         * @permission ohos.permission.RUNNING_LOCK
         * @param { number } timeout Indicates the lock duration (ms). After the lock duration times out, the lock is automatically
         * released and the system hibernates if no other {@link RunningLock} is set.
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 7
         * @deprecated since 9
         * @useinstead RunningLock#hold
         */
        lock(timeout: number): void;
        /**
         * Prevents the system from hibernating and sets the lock duration.
         * This method requires the ohos.permission.RUNNING_LOCK permission.
         *
         * @permission ohos.permission.RUNNING_LOCK
         * @param { number } timeout Indicates the lock duration (ms). After the lock duration times out,
         * the lock is automatically released and the system hibernates if no other {@link RunningLock} is set.
         * timeout parameter must be of type number.
         * @throws { BusinessError } 201 – If the permission is denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Incorrect parameter types;
         * @throws { BusinessError } 4900101 - Failed to connect to the service.
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 9
         */
        hold(timeout: number): void;
        /**
         * Checks whether a lock is held or in use.
         *
         * @returns { boolean } Returns true if the lock is held or in use; returns false if the lock has been released.
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 7
         * @deprecated since 9
         * @useinstead RunningLock#isHolding
         */
        isUsed(): boolean;
        /**
         * Checks whether a lock is held or in use.
         *
         * @returns { boolean } Returns true if the lock is held or in use; returns false if the lock has been released.
         * @throws { BusinessError } 4900101 - Failed to connect to the service.
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 9
         */
        isHolding(): boolean;
        /**
         * Release the {@link RunningLock} that prevents the system from hibernating.
         * This method requires the ohos.permission.RUNNING_LOCK permission.
         *
         * @permission ohos.permission.RUNNING_LOCK
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 7
         * @deprecated since 9
         * @useinstead RunningLock#unhold
         */
        unlock(): void;
        /**
         * Release the {@link RunningLock} that prevents the system from hibernating.
         * This method requires the ohos.permission.RUNNING_LOCK permission.
         *
         * @permission ohos.permission.RUNNING_LOCK
         * @throws { BusinessError } 201 – If the permission is denied.
         * @throws { BusinessError } 4900101 - Failed to connect to the service.
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 9
         */
        unhold(): void;
    }
    /**
     * Enumerates the {@link RunningLock} types.
     * <p>Two {@link RunningLock} types are available: {@link BACKGROUND}, and {@link PROXIMITY_SCREEN_CONTROL}.
     * {@link BACKGROUND} ensures that applications can run in the background.
     * {@link PROXIMITY_SCREEN_CONTROL} determines whether to turn on or off the screen based on the proximity sensor.
     *
     * @enum { number }
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     */
    export enum RunningLockType {
        /**
         * Indicates the lock that prevents the system from hibernating.
         *
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 7
         * @deprecated since 10
         */
        BACKGROUND = 1,
        /**
         * Indicates the lock that determines whether to turn on or off the screen based on the proximity sensor.
         * For example, during a call, if the proximity sensor detects that the device is moving close to
         * the user's ear, the screen turns off; if the proximity sensor detects that the device is moving away
         * from the user's ear, the screen turns on.
         *
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 7
         */
        PROXIMITY_SCREEN_CONTROL
    }
    /**
     * Checks whether the specified {@link RunningLockType} is supported.
     *
     * @param { RunningLockType } type Indicates the specified {@link RunningLockType}.
     * @param { AsyncCallback<boolean> } callback Indicates the callback function contains the result whether the specified
     * {@link RunningLockType} is supported.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead RunningLock#isSupported
     */
    function isRunningLockTypeSupported(type: RunningLockType, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the specified {@link RunningLockType} is supported.
     *
     * @param { RunningLockType } type Indicates the specified {@link RunningLockType}.
     * @returns { Promise<boolean> } Returns true if the specified {@link RunningLockType} is supported;
     * returns false otherwise.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead RunningLock#isSupported
     */
    function isRunningLockTypeSupported(type: RunningLockType): Promise<boolean>;
    /**
     * Checks whether the specified {@link RunningLockType} is supported.
     *
     * @param { RunningLockType } type Indicates the specified {@link RunningLockType}.
     * the RunningLockType type is an enumeration class.
     * @returns { boolean } Whether the specified {@link RunningLockType} is supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Incorrect parameter types;
     * 2. Parameter verification failed.
     * @throws { BusinessError } 4900101 - Failed to connect to the service.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 9
     */
    function isSupported(type: RunningLockType): boolean;
    /**
     * Creates a {@link RunningLock} object.
     * <p>This method requires the ohos.permission.RUNNING_LOCK permission.
     * <p>The {@link RunningLock} object can be used to perform a lock operation to prevent the system from hibernating.
     *
     * @permission ohos.permission.RUNNING_LOCK
     * @param { string } name Indicates the {@link RunningLock} name. A recommended name consists of the package or class name and
     * a suffix.
     * @param { RunningLockType } type Indicates the {@link RunningLockType}.
     * @param { AsyncCallback<RunningLock> } callback Indicates the callback contains the {@link RunningLock} object.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead RunningLock#create
     */
    function createRunningLock(name: string, type: RunningLockType, callback: AsyncCallback<RunningLock>): void;
    /**
     * Creates a {@link RunningLock} object.
     * <p>This method requires the ohos.permission.RUNNING_LOCK permission.
     * <p>The {@link RunningLock} object can be used to perform a lock operation to prevent the system from hibernating.
     *
     * @permission ohos.permission.RUNNING_LOCK
     * @param { string } name Indicates the {@link RunningLock} name. A recommended name consists of the package or class name and
     * a suffix.
     * @param { RunningLockType } type Indicates the {@link RunningLockType}.
     * @returns { Promise<RunningLock> } Returns the {@link RunningLock} object.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead RunningLock#create
     */
    function createRunningLock(name: string, type: RunningLockType): Promise<RunningLock>;
    /**
     * Creates a {@link RunningLock} object.
     * <p>This method requires the ohos.permission.RUNNING_LOCK permission.
     * <p>The {@link RunningLock} object can be used to perform a lock operation to prevent the system from hibernating.
     *
     * @permission ohos.permission.RUNNING_LOCK
     * @param { string } name Indicates the {@link RunningLock} name. A recommended name consists of the package or
     * class name and a suffix.
     * name parameter must be of type string.
     * @param { RunningLockType } type Indicates the {@link RunningLockType}.
     * the RunningLockType type is an enumeration class.
     * @param { AsyncCallback<RunningLock> } callback Indicates the callback of {@link RunningLock} object.
     * AsyncCallback encapsulates a class of RunningLock type
     * @throws { BusinessError } 201 – If the permission is denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Parameter verification failed.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 9
     */
    function create(name: string, type: RunningLockType, callback: AsyncCallback<RunningLock>): void;
    /**
     * Creates a {@link RunningLock} object.
     * <p>This method requires the ohos.permission.RUNNING_LOCK permission.
     * <p>The {@link RunningLock} object can be used to perform a lock operation to prevent the system from hibernating.
     *
     * @permission ohos.permission.RUNNING_LOCK
     * @param { string } name Indicates the {@link RunningLock} name. A recommended name consists of the package or
     * class name and a suffix.
     * name parameter must be of type string.
     * @param { RunningLockType } type Indicates the {@link RunningLockType}.
     * the RunningLockType type is an enumeration class.
     * @returns { Promise<RunningLock> } The {@link RunningLock} object.
     * @throws { BusinessError } 201 – If the permission is denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Parameter verification failed.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 9
     */
    function create(name: string, type: RunningLockType): Promise<RunningLock>;
}
export default runningLock;
