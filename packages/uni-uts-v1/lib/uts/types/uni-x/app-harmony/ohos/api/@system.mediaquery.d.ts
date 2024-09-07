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
 * Defines the MediaQuery event.
 *
 * @interface MediaQueryEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the MediaQuery event.
 *
 * @interface MediaQueryEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface MediaQueryEvent {
    /**
     * The result of match result.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * The result of match result.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    matches: boolean;
}
/**
 * Defines the MediaQuery list info.
 *
 * @interface MediaQueryList
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the MediaQuery list info.
 *
 * @interface MediaQueryList
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface MediaQueryList {
    /**
     * Serialized media query condition.
     * This parameter is read-only.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Serialized media query condition.
     * This parameter is read-only.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    media?: string;
    /**
     * Whether the query is successful. True if the query condition is matched successfully, false otherwise.
     * This parameter is read-only.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Whether the query is successful. True if the query condition is matched successfully, false otherwise.
     * This parameter is read-only.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    matches?: boolean;
    /**
     * Called when the matches value changes.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Called when the matches value changes.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    onchange?: (matches: boolean) => void;
    /**
     * Adds a listening function to MediaQueryList.
     * The listening function must be added before onShow is called, that is, added to the onInit or onReady function.
     *
     * @param { function } callback
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Adds a listening function to MediaQueryList.
     * The listening function must be added before onShow is called, that is, added to the onInit or onReady function.
     *
     * @param { function } callback
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    addListener(callback: (event: MediaQueryEvent) => void): void;
    /**
     * Removes a listening function from MediaQueryList.
     *
     * @param { function } callback
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Removes a listening function from MediaQueryList.
     *
     * @param { function } callback
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    removeListener(callback: (event: MediaQueryEvent) => void): void;
}
/**
 * Defines the mediaquery interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 */
/**
 * Defines the mediaquery interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export default class MediaQuery {
    /**
     * Queries a media item and returns a MediaQueryList object.
     *
     * @param { string } condition
     * @returns { MediaQueryList }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     */
    /**
     * Queries a media item and returns a MediaQueryList object.
     *
     * @param { string } condition
     * @returns { MediaQueryList }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    static matchMedia(condition: string): MediaQueryList;
}
