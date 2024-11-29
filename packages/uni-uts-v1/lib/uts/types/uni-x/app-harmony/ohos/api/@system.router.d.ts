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
 * Defines the option of router.
 *
 * @interface RouterOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.router#RouterOptions
 */
export interface RouterOptions {
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
     * @since 3
     * @deprecated since 8
     */
    uri: string;
    /**
     * Data that needs to be passed to the destination page during navigation.
     * After the destination page is displayed, the parameter can be directly used for the page.
     * For example, this.data1 (data1 is the key value of the params used for page navigation.)
     *
     * @type { ?Object }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     * @deprecated since 8
     */
    params?: Object;
}
/**
 * Defines the option of router back.
 *
 * @interface BackRouterOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 8
 * @useinstead ohos.router#RouterOptions
 */
export interface BackRouterOptions {
    /**
     * Returns to the page of the specified path.
     * If the page with the specified path does not exist in the page stack, router.back() is called by default.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     */
    uri?: string;
    /**
     * Data that needs to be passed to the destination page during navigation.
     *
     * @type { ?Object }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 7
     * @deprecated since 8
     */
    params?: Object;
}
/**
 * Defines the state of router.
 *
 * @interface RouterState
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.router#RouterState
 */
export interface RouterState {
    /**
     * Index of the current page in the stack.
     * NOTE: The index starts from 1 from the bottom to the top of the stack.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    index: number;
    /**
     * Name of the current page, that is, the file name.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    name: string;
    /**
     * Path of the current page.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    path: string;
}
/**
 * Defines the option of EnableAlertBeforeBackPage.
 *
 * @interface EnableAlertBeforeBackPageOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 6
 * @deprecated since 8
 * @useinstead ohos.router#RouterState
 */
export interface EnableAlertBeforeBackPageOptions {
    /**
     * dialog context.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    message: string;
    /**
     * Called when the dialog box is displayed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    success?: (errMsg: string) => void;
    /**
     * Called when the operation is cancelled.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    cancel?: (errMsg: string) => void;
    /**
     * Called when the dialog box is closed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    complete?: () => void;
}
/**
 * Defines the option of DisableAlertBeforeBackPage.
 *
 * @interface DisableAlertBeforeBackPageOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 6
 * @deprecated since 8
 * @useinstead ohos.router#RouterOptions
 */
export interface DisableAlertBeforeBackPageOptions {
    /**
     * Called when the dialog box is displayed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    success?: (errMsg: string) => void;
    /**
     * Called when the operation is cancelled.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    cancel?: (errMsg: string) => void;
    /**
     * Called when the dialog box is closed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    complete?: () => void;
}
/**
 * Define ParamsInterface.
 *
 * @typedef { object } ParamsInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 8
 */
type ParamsInterface = {
    [key: string]: Object;
};
/**
 * Defines the Router interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.router#router
 */
export default class Router {
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { RouterOptions } options Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    static push(options: RouterOptions): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { RouterOptions } options Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     * @deprecated since 8
     */
    static replace(options: RouterOptions): void;
    /**
     * Returns to the previous page or a specified page.
     *
     * @param { BackRouterOptions } options Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    static back(options?: BackRouterOptions): void;
    /**
     * Obtains information about the current page params.
     *
     * @returns { ParamsInterface } Page params.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     */
    static getParams(): ParamsInterface;
    /**
     * Clears all historical pages and retains only the current page at the top of the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    static clear(): void;
    /**
     * Obtains the number of pages in the current stack.
     *
     * @returns { string } Number of pages in the stack. The maximum value is 32.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    static getLength(): string;
    /**
     * Obtains information about the current page state.
     *
     * @returns { RouterState } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 3
     * @deprecated since 8
     */
    static getState(): RouterState;
    /**
     * Pop up dialog to ask whether to back
     *
     * @param { EnableAlertBeforeBackPageOptions } options Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    static enableAlertBeforeBackPage(options: EnableAlertBeforeBackPageOptions): void;
    /**
     * cancel enableAlertBeforeBackPage
     *
     * @param { DisableAlertBeforeBackPageOptions } options Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 6
     * @deprecated since 8
     */
    static disableAlertBeforeBackPage(options?: DisableAlertBeforeBackPageOptions): void;
}
