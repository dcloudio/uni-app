/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

import { AsyncCallback } from './@ohos.base';
/**
 * @namespace router
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * @namespace router
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * @namespace router
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace router {
    /**
     * Router Mode
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Router Mode
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Router Mode
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum RouterMode {
        /**
         * Default route mode.
         * The page will be added to the top of the page stack.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         */
        /**
         * Default route mode.
         * The page will be added to the top of the page stack.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Default route mode.
         * The page will be added to the top of the page stack.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        Standard,
        /**
         * Single route mode.
         * If the target page already has the same url page in the page stack,
         * the same url page closest to the top of the stack will be moved to the top of the stack.
         * If the target page url does not exist in the page stack, route will use default route mode.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         */
        /**
         * Single route mode.
         * If the target page already has the same url page in the page stack,
         * the same url page closest to the top of the stack will be moved to the top of the stack.
         * If the target page url does not exist in the page stack, route will use default route mode.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Single route mode.
         * If the target page already has the same url page in the page stack,
         * the same url page closest to the top of the stack will be moved to the top of the stack.
         * If the target page url does not exist in the page stack, route will use default route mode.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        Single
    }
    /**
     * @typedef RouterOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 8
     */
    /**
     * @typedef RouterOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 11
     */
    interface RouterOptions {
        /**
         * URI of the destination page, which supports the following formats:
         * 1. Absolute path of the page, which is provided by the pages list in the config.json file.
         *    Example:
         *      pages/index/index
         *      pages/detail/detail
         * 2. Particular path. If the URI is a slash (/), the home page is displayed.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Lite
         * @since 8
         */
        /**
         * URI of the destination page, which supports the following formats:
         * 1. Absolute path of the page, which is provided by the pages list in the config.json file.
         *    Example:
         *      pages/index/index
         *      pages/detail/detail
         * 2. Particular path. If the URI is a slash (/), the home page is displayed.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Lite
         * @atomicservice
         * @since 11
         */
        url: string;
        /**
         * Data that needs to be passed to the destination page during navigation.
         * After the destination page is displayed, the parameter can be directly used for the page.
         * For example, this.data1 (data1 is the key value of the params used for page navigation.)
         *
         * @type { ?Object }
         * @syscap SystemCapability.ArkUI.ArkUI.Lite
         * @since 8
         */
        /**
         * Data that needs to be passed to the destination page during navigation.
         * After the destination page is displayed, the parameter can be directly used for the page.
         * For example, this.data1 (data1 is the key value of the params used for page navigation.)
         *
         * @type { ?Object }
         * @syscap SystemCapability.ArkUI.ArkUI.Lite
         * @atomicservice
         * @since 11
         */
        params?: Object;
    }
    /**
     * @typedef RouterState
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * @typedef RouterState
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * @typedef RouterState
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface RouterState {
        /**
         * Index of the current page in the stack.
         * NOTE: The index starts from 1 from the bottom to the top of the stack.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * Index of the current page in the stack.
         * NOTE: The index starts from 1 from the bottom to the top of the stack.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Index of the current page in the stack.
         * NOTE: The index starts from 1 from the bottom to the top of the stack.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        index: number;
        /**
         * Name of the current page, that is, the file name.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * Name of the current page, that is, the file name.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the current page, that is, the file name.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * Path of the current page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * Path of the current page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Path of the current page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        path: string;
        /**
         * Data that passed to the destination page during navigation.
         *
         * @type { Object }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        params: Object;
    }
    /**
     * @typedef EnableAlertOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * @typedef EnableAlertOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * @typedef EnableAlertOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface EnableAlertOptions {
        /**
         * dialog context.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 8
         */
        /**
         * dialog context.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * dialog context.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        message: string;
    }
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.router.router#pushUrl
     */
    function push(options: RouterOptions): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushUrl(options: RouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushUrl(options: RouterOptions): Promise<void>;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushUrl(options: RouterOptions, mode: RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100002 - Uri error. The URI of the page to redirect is incorrect or does not exist
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushUrl(options: RouterOptions, mode: RouterMode): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.router.router#replaceUrl
     */
    function replace(options: RouterOptions): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 9
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 11
     */
    function replaceUrl(options: RouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 9
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 11
     */
    function replaceUrl(options: RouterOptions): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 9
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 11
     */
    function replaceUrl(options: RouterOptions, mode: RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Failed to get the delegate. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 9
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Failed to get the delegate. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 11
     */
    function replaceUrl(options: RouterOptions, mode: RouterMode): Promise<void>;
    /**
     * Returns to the previous page or a specified page.
     *
     * @param { RouterOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Returns to the previous page or a specified page.
     *
     * @param { RouterOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Returns to the previous page or a specified page.
     *
     * @param { RouterOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function back(options?: RouterOptions): void;
    /**
      * Returns to the specified page.
      *
      * @param { number } index - index of page.
      * @param { Object } [params] - params of page.
      * @syscap SystemCapability.ArkUI.ArkUI.Full
      * @crossplatform
      * @atomicservice
      * @since 12
      */
    function back(index: number, params?: Object): void;
    /**
     * Clears all historical pages and retains only the current page at the top of the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Clears all historical pages and retains only the current page at the top of the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Clears all historical pages and retains only the current page at the top of the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function clear(): void;
    /**
     * Obtains the number of pages in the current stack.
     *
     * @returns { string } Number of pages in the stack. The maximum value is 32.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Obtains the number of pages in the current stack.
     *
     * @returns { string } Number of pages in the stack. The maximum value is 32.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the number of pages in the current stack.
     *
     * @returns { string } Number of pages in the stack. The maximum value is 32.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getLength(): string;
    /**
     * Obtains information about the current page state.
     *
     * @returns { RouterState } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Obtains information about the current page state.
     *
     * @returns { RouterState } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains information about the current page state.
     *
     * @returns { RouterState } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getState(): RouterState;
    /**
    * Obtains page information by index.
    *
    * @param { number } index - Index of page.
    * @returns { RouterState | undefined } Page state.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    function getStateByIndex(index: number): RouterState | undefined;
    /**
     * Obtains page information by url.
     *
     * @param { string } url - URL of page.
     * @returns { Array<RouterState> } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function getStateByUrl(url: string): Array<RouterState>;
    /**
     * Pop up dialog to ask whether to back
     *
     * @param { EnableAlertOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.router.router#showAlertBeforeBackPage
     */
    function enableAlertBeforeBackPage(options: EnableAlertOptions): void;
    /**
     * Pop up alert dialog to ask whether to back
     *
     * @param { EnableAlertOptions } options - Options.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Pop up alert dialog to ask whether to back
     *
     * @param { EnableAlertOptions } options - Options.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Pop up alert dialog to ask whether to back
     *
     * @param { EnableAlertOptions } options - Options.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function showAlertBeforeBackPage(options: EnableAlertOptions): void;
    /**
     * Cancel enableAlertBeforeBackPage
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.router.router#hideAlertBeforeBackPage
     */
    function disableAlertBeforeBackPage(): void;
    /**
     * Hide alert before back page
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Hide alert before back page
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Hide alert before back page
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function hideAlertBeforeBackPage(): void;
    /**
     * Obtains information about the current page params.
     *
     * @returns { Object } Page params.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Obtains information about the current page params.
     *
     * @returns { Object } Page params.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains information about the current page params.
     *
     * @returns { Object } Page params.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getParams(): Object;
    /**
     * @typedef NamedRouterOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * @typedef NamedRouterOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface NamedRouterOptions {
        /**
         * Name of the destination named route.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Name of the destination named route.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * Data that needs to be passed to the destination page during navigation.
         *
         * @type { ?Object }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Data that needs to be passed to the destination page during navigation.
         *
         * @type { ?Object }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        params?: Object;
    }
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushNamedRoute(options: NamedRouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushNamedRoute(options: NamedRouterOptions): Promise<void>;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of pushNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of pushNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushNamedRoute(options: NamedRouterOptions, mode: RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @throws { BusinessError } 100003 - Page stack error. Too many pages are pushed.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function pushNamedRoute(options: NamedRouterOptions, mode: RouterMode): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function replaceNamedRoute(options: NamedRouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function replaceNamedRoute(options: NamedRouterOptions): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of replaceNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of replaceNamedRoute.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function replaceNamedRoute(options: NamedRouterOptions, mode: RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Failed to get the delegate. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { NamedRouterOptions } options - Options.
     * @param { RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Failed to get the delegate. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function replaceNamedRoute(options: NamedRouterOptions, mode: RouterMode): Promise<void>;
}
export default router;
