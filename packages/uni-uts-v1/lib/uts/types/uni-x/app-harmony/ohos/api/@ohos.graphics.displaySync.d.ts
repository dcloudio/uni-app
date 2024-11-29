/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit ArkGraphics2D
 */
import type { Callback } from './@ohos.base';
/**
 * Provides functions of applying an independent draw frame rate used for drawing the UI.
 *
 * @namespace displaySync
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 11
 */
declare namespace displaySync {
    /**
     * Provides the IntervalInfo interface, which includes timestamp and targetTimestamp.
     * @interface IntervalInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    interface IntervalInfo {
        /**
         * The timestamp means the current drawing frame time.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        timestamp: number;
        /**
         * The timestamp means the next drawing frame time.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        targetTimestamp: number;
    }
    /**
     * Provides the DisplaySync interface, which can be used to control
     * the frequency of triggering callback function.
     * @interface DisplaySync
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    interface DisplaySync {
        /**
         * The expected frame rate of dynamical rate range.
         * If the function isn't be called. The DisplaySync's
         * minimum/maximum/expected rate default value is 60.
         * @param { ExpectedFrameRateRange } rateRange - Indicates ExpectedFrameRateRange.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * or check ExpectedFrameRateRange if valid.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        setExpectedFrameRateRange(rateRange: ExpectedFrameRateRange): void;
        /**
         * Registers a callback with the corresponding query condition by using the handle.
         * This callback is triggered when DisplaySync dispatching.
         * @param { 'frame' } type - The type of event to remove the listener for. Must be 'frame'.
         * @param { Callback<IntervalInfo> } callback - The callback function to be called when DisplaySync dispatching.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        on(type: 'frame', callback: Callback<IntervalInfo>): void;
        /**
         * Deregisters a callback with the corresponding query condition by using the handle.
         * This callback is triggered when DisplaySync dispatching.
         * @param { 'frame' } type - The type of event to remove the listener for. Must be 'frame'.
         * @param { Callback<IntervalInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
         *                                                will be removed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        off(type: 'frame', callback?: Callback<IntervalInfo>): void;
        /**
         * Add DisplaySync to Pipeline. It means that
         * the callback function be enabled.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        start(): void;
        /**
         * Delete DisplaySync from Pipeline. It means that
         * the callback function be disabled.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        stop(): void;
    }
    /**
     * Create a new DisplaySync object.
     * @returns { DisplaySync } DisplaySync
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    function create(): DisplaySync;
}
export default displaySync;
