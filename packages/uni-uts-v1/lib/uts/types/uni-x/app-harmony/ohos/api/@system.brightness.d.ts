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
 * @interface BrightnessResponse
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export interface BrightnessResponse {
    /**
     * Screen brightness, which ranges from 1 to 255.
     *
     * @type { number }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    value: number;
}
/**
 * @interface GetBrightnessOptions
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export interface GetBrightnessOptions {
    /**
     * Called when the current screen brightness is obtained.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    success?: (data: BrightnessResponse) => void;
    /**
     * Called when the current screen brightness fails to be obtained.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    complete?: () => void;
}
/**
 * @interface SetBrightnessOptions
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export interface SetBrightnessOptions {
    /**
     * Screen brightness. The value is an integer ranging from 1 to 255.
     * If the value is less than or equal to 0, value 1 will be used.
     * If the value is greater than 255, value 255 will be used.
     * If the value contains decimals, the integral part of the value will be used.
     * For example, if value is 8.1 is set, value 8 will be used.
     *
     * @type { number }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    value: number;
    /**
     * Called when the setting is successful.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    success?: () => void;
    /**
     * Called when the setting fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    complete?: () => void;
}
/**
 * @interface BrightnessModeResponse
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export interface BrightnessModeResponse {
    /**
     * The value can be 0 or 1.
     * 0: The screen brightness is manually adjusted.
     * 1: The screen brightness is automatically adjusted.
     *
     * @type { number }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    mode: number;
}
/**
 * @interface GetBrightnessModeOptions
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export interface GetBrightnessModeOptions {
    /**
     * Called when the screen brightness adjustment mode is obtained.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    success?: (data: BrightnessModeResponse) => void;
    /**
     * Called when the screen brightness adjustment mode fails to be obtained.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    complete?: () => void;
}
/**
 * @interface SetBrightnessModeOptions
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export interface SetBrightnessModeOptions {
    /**
     * The screen brightness mode.
     * 0: The screen brightness is manually adjusted.
     * 1: The screen brightness is automatically adjusted.
     *
     * @type { number }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    mode: number;
    /**
     * Called when the setting is successful.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    success?: () => void;
    /**
     * Called when the setting fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    complete?: () => void;
}
/**
 * @interface SetKeepScreenOnOptions
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export interface SetKeepScreenOnOptions {
    /**
     * Whether to always keep the screen on.
     *
     * @type { boolean }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    keepScreenOn: boolean;
    /**
     * Called when the setting is successful.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    success?: () => void;
    /**
     * Called when the setting fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    complete?: () => void;
}
/**
 * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
 * @since 3
 * @deprecated since 7
 */
export default class Brightness {
    /**
     * Obtains the current screen brightness.
     *
     * @param { GetBrightnessOptions } options Options.
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    static getValue(options?: GetBrightnessOptions): void;
    /**
     * Sets the screen brightness.
     *
     * @param { SetBrightnessOptions } options Options.
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    static setValue(options?: SetBrightnessOptions): void;
    /**
     * Obtains the screen brightness adjustment mode.
     *
     * @param { GetBrightnessModeOptions } options Options.
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    static getMode(options?: GetBrightnessModeOptions): void;
    /**
     * Sets the screen brightness adjustment mode.
     *
     * @param { SetBrightnessModeOptions } options Options.
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    static setMode(options?: SetBrightnessModeOptions): void;
    /**
     * Sets whether to always keep the screen on.
     *
     * @param { SetKeepScreenOnOptions } options Options.
     * @syscap SystemCapability.PowerManager.DisplayPowerManager.Lite
     * @since 3
     * @deprecated since 7
     */
    static setKeepScreenOn(options?: SetKeepScreenOnOptions): void;
}
