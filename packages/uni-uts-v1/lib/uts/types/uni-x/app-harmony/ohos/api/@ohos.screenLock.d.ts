/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * systemScreenLock
 *
 * @namespace screenLock
 * @syscap SystemCapability.MiscServices.ScreenLock
 * @since 7
 */
declare namespace screenLock {
    /**
     * Checks whether the screen is currently locked.
     *
     * @param { AsyncCallback<boolean> } callback - the callback of isScreenLocked.
     * @syscap SystemCapability.MiscServices.ScreenLock
     * @since 7
     * @deprecated since 9
     */
    function isScreenLocked(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the screen is currently locked.
     *
     * @returns { Promise<boolean> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.ScreenLock
     * @since 7
     * @deprecated since 9
     */
    function isScreenLocked(): Promise<boolean>;
    /**
     * Checks whether the screen lock of the current device is secure.
     *
     * @param { AsyncCallback<boolean> } callback - the callback of isSecureMode.
     * @syscap SystemCapability.MiscServices.ScreenLock
     * @since 7
     * @deprecated since 9
     */
    function isSecureMode(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the screen lock of the current device is secure.
     *
     * @returns { Promise<boolean> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.ScreenLock
     * @since 7
     * @deprecated since 9
     */
    function isSecureMode(): Promise<boolean>;
    /**
     * Unlock the screen.
     *
     * @param { AsyncCallback<void> } callback - the callback of unlockScreen.
     * @syscap SystemCapability.MiscServices.ScreenLock
     * @since 7
     * @deprecated since 9
     */
    function unlockScreen(callback: AsyncCallback<void>): void;
    /**
     * Unlock the screen.
     *
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.ScreenLock
     * @since 7
     * @deprecated since 9
     */
    function unlockScreen(): Promise<void>;
}
export default screenLock;
