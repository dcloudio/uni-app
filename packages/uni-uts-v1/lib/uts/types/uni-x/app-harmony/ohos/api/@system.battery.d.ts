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
 * @file
 * @kit BasicServicesKit
 */
/**
 * @interface BatteryResponse
 * @syscap SystemCapability.PowerManager.BatteryManager.Lite
 * @since 3
 * @deprecated since 6
 */
export interface BatteryResponse {
    /**
     * Whether the battery is being charged.
     *
     * @type { boolean }
     * @syscap SystemCapability.PowerManager.BatteryManager.Lite
     * @since 3
     * @deprecated since 6
     */
    charging: boolean;
    /**
     * Current battery level, which ranges from 0.00 to 1.00.
     *
     * @type { number }
     * @syscap SystemCapability.PowerManager.BatteryManager.Lite
     * @since 3
     * @deprecated since 6
     */
    level: number;
}
/**
 * @interface GetStatusOptions
 * @syscap SystemCapability.PowerManager.BatteryManager.Lite
 * @since 3
 * @deprecated since 6
 */
export interface GetStatusOptions {
    /**
     * Called when the current charging state and battery level are obtained.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.BatteryManager.Lite
     * @since 3
     * @deprecated since 6
     */
    success?: (data: BatteryResponse) => void;
    /**
     * Called when the current charging state and battery level fail to be obtained.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.BatteryManager.Lite
     * @since 3
     * @deprecated since 6
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.BatteryManager.Lite
     * @since 3
     * @deprecated since 6
     */
    complete?: () => void;
}
/**
 * @syscap SystemCapability.PowerManager.BatteryManager.Lite
 * @since 3
 * @deprecated since 6
 */
export default class Battery {
    /**
     * Obtains the current charging state and battery level.
     *
     * @param { GetStatusOptions } options Options.
     * @syscap SystemCapability.PowerManager.BatteryManager.Lite
     * @since 3
     * @deprecated since 6
     */
    static getStatus(options?: GetStatusOptions): void;
}
