/*
 * Copyright (c) 2020 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */
/**
 * Defines the AppResponse info.
 *
 * @interface AppResponse
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 3
 */
/**
 * Defines the AppResponse info.
 *
 * @interface AppResponse
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @atomicservice
 * @since 12
 */
export interface AppResponse {
    /**
     * Application bundleName.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     */
    /**
     * Application bundleName.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    appID: string;
    /**
     * Application name.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Application name.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    appName: string;
    /**
     * Application version name.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Application version name.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    versionName: string;
    /**
     * Application version.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Application version.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    versionCode: number;
}
/**
 * Defines the option of screenOnVisible interface.
 *
 * @interface ScreenOnVisibleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the option of screenOnVisible interface.
 *
 * @interface ScreenOnVisibleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface ScreenOnVisibleOptions {
    /**
     * Whether to keep the application visible. The default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Whether to keep the application visible. The default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    visible?: boolean;
    /**
     * Called when the application always keeps visible.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Called when the application always keeps visible.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    success?: () => void;
    /**
     * Called when the application fails to keep visible.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Called when the application fails to keep visible.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    complete?: () => void;
}
/**
 * Defines the option of RequestFullWindow interface.
 *
 * @interface RequestFullWindowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the option of RequestFullWindow interface.
 *
 * @interface RequestFullWindowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface RequestFullWindowOptions {
    /**
     * Defines the number of animation options.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Defines the number of animation options.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    duration: number;
}
/**
 * Defines the app class info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 3
 */
/**
 * Defines the app class info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @atomicservice
 * @since 12
 */
export default class App {
    /**
     * Obtains the declared information in the config.json file of an application.
     *
     * @returns { AppResponse }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Obtains the declared information in the config.json file of an application.
     *
     * @returns { AppResponse }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    static getInfo(): AppResponse;
    /**
     * Destroys the current ability.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Destroys the current ability.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    static terminate(): void;
    /**
     * Keeps the application visible after the screen is waken up.
     * This method prevents the system from returning to the home screen when the screen is locked.
     *
     * @param { ScreenOnVisibleOptions } options
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    static screenOnVisible(options?: ScreenOnVisibleOptions): void;
    /**
     * Requests the application to run in full window.
     * In some scenarios, such as semi-modal FA, the FA runs in non-full window.
     * In this case, you can call this API.
     * This API is invalid for an application already in full-window mode.
     *
     * @param { RequestFullWindowOptions } options Transition time from non-full window to full window, in milliseconds.
     * By default, the value is in direct proportion to the distance between the non-full window and the full window.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     * @useinstead startAbility
     */
    static requestFullWindow(options?: RequestFullWindowOptions): void;
    /**
     * Set image cache capacity of decoded image count.
     * if not set, the application will not cache any decoded image.
     *
     * @param { number } value - capacity of decoded image count.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set image cache capacity of decoded image count.
     * if not set, the application will not cache any decoded image.
     *
     * @param { number } value - capacity of decoded image count.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    static setImageCacheCount(value: number): void;
    /**
     * Set image cache capacity of raw image data size in bytes before decode.
     * if not set, the application will not cache any raw image data.
     *
     * @param { number } value - capacity of raw image data size in bytes.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set image cache capacity of raw image data size in bytes before decode.
     * if not set, the application will not cache any raw image data.
     *
     * @param { number } value - capacity of raw image data size in bytes.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    static setImageRawDataCacheSize(value: number): void;
    /**
     * Set image file cache size in bytes on disk before decode.
     * if not set, the application will cache 100MB image files on disk.
     *
     * @param { number } value - capacity of raw image data size in bytes.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set image file cache size in bytes on disk before decode.
     * if not set, the application will cache 100MB image files on disk.
     *
     * @param { number } value - capacity of raw image data size in bytes.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    static setImageFileCacheSize(value: number): void;
}
