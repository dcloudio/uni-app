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
 * Provides interfaces to manage power.
 *
 * @namespace power
 * @syscap SystemCapability.PowerManager.PowerManager.Core
 * @since 7
 */
declare namespace power {
    /**
     * Restarts the system.
     * <p>This method requires the ohos.permission.REBOOT permission.
     *
     * @permission ohos.permission.REBOOT
     * @param { string } reason Indicates the restart reason. For example, "updater" indicates entering the updater mode
     * after the restart. If the parameter is not specified, the system enters the normal mode after the restart.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead power#reboot
     */
    function rebootDevice(reason: string): void;
    /**
     * Checks whether the screen of a device is on or off.
     *
     * @param { AsyncCallback<boolean> } callback Returns true if the screen is on; returns false otherwise.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead power#isActive
     */
    function isScreenOn(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the screen of a device is on or off.
     *
     * @returns { Promise<boolean> } Returns true if the screen is on; returns false otherwise.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead power#isActive
     */
    function isScreenOn(): Promise<boolean>;
    /**
     * Checks whether the device is active.
     * <p>
     * The screen will be on if device is active, screen will be off otherwise.
     *
     * @returns { boolean } Returns true if the device is active; returns false otherwise.
     * @throws { BusinessError } 4900101 - Failed to connect to the service.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 9
     */
    function isActive(): boolean;
    /**
     * Obtains the power mode of the current device. For details, see {@link DevicePowerMode}.
     *
     * @returns { DevicePowerMode } The power mode {@link DevicePowerMode} of current device .
     * @throws { BusinessError } 4900101 - Failed to connect to the service.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 9
     */
    function getPowerMode(): DevicePowerMode;
    /**
     * Returns true if the device is currently in idle mode.
     *
     * @returns { boolean } Returns true if the device is in idle mode; returns false otherwise.
     * @throws { BusinessError } 4900101 - Failed to connect to the service.
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 10
     */
    function isStandby(): boolean;
    /**
     * Power mode of a device.
     *
     * @enum { number }
     * @syscap SystemCapability.PowerManager.PowerManager.Core
     * @since 9
     */
    export enum DevicePowerMode {
        /**
         * Normal power mode
         *
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 9
         */
        MODE_NORMAL = 600,
        /**
         * Power save mode
         *
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 9
         */
        MODE_POWER_SAVE,
        /**
         * Performance power mode
         *
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 9
         */
        MODE_PERFORMANCE,
        /**
         * Extreme power save mode
         *
         * @syscap SystemCapability.PowerManager.PowerManager.Core
         * @since 9
         */
        MODE_EXTREME_POWER_SAVE
    }
}
export default power;
