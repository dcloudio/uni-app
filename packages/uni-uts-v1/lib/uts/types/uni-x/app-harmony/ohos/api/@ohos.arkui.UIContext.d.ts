/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
import font from './@ohos.font';
import mediaQuery from './@ohos.mediaquery';
import type inspector from './@ohos.arkui.inspector';
import type observer from './@ohos.arkui.observer';
import promptAction from './@ohos.promptAction';
import router from './@ohos.router';
import type componentUtils from './@ohos.arkui.componentUtils';
import { ComponentContent, FrameNode } from './@ohos.arkui.node';
import type { AnimatorOptions, AnimatorResult } from './@ohos.animator';
import type { Callback, AsyncCallback } from './@ohos.base';
import { MeasureOptions } from './@ohos.measure';
import type componentSnapshot from './@ohos.arkui.componentSnapshot';
import type dragController from './@ohos.arkui.dragController';
import image from './@ohos.multimedia.image';
import type common from './@ohos.app.ability.common';
import type pointer from './@ohos.multimodalInput.pointer';
/**
 * class Font
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * class Font
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export class Font {
    /**
     * Register a customized font in the FontManager.
     *
     * @param { font.FontOptions } options - FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Register a customized font in the FontManager.
     *
     * @param { font.FontOptions } options - FontOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    registerFont(options: font.FontOptions): void;
    /**
     * Gets a list of fonts supported by system.
     * @returns { Array<string> } A list of font names
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Gets a list of fonts supported by system.
     * @returns { Array<string> } A list of font names
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    getSystemFontList(): Array<string>;
    /**
     * Get font details according to the font name.
     * @param { string } fontName - font name
     * @returns { font.FontInfo } Returns the font info
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get font details according to the font name.
     * @param { string } fontName - font name
     * @returns { font.FontInfo } Returns the font info
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    getFontByName(fontName: string): font.FontInfo;
}
/**
 * class MediaQuery
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * class MediaQuery
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export class MediaQuery {
    /**
     * Sets the media query criteria and returns the corresponding listening handle
     *
     * @param { string } condition - media conditions
     * @returns { mediaQuery.MediaQueryListener } the corresponding listening handle
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the media query criteria and returns the corresponding listening handle
     *
     * @param { string } condition - media conditions
     * @returns { mediaQuery.MediaQueryListener } the corresponding listening handle
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    matchMediaSync(condition: string): mediaQuery.MediaQueryListener;
}
/**
 * class UIInspector
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * class UIInspector
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export class UIInspector {
    /**
     * Sets the component after layout or draw criteria and returns the corresponding listening handle
     * @param { string } id - component id.
     * @returns { inspector.ComponentObserver } create listener for observer component event.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the component after layout or draw criteria and returns the corresponding listening handle
     * @param { string } id - component id.
     * @returns { inspector.ComponentObserver } create listener for observer component event.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    createComponentObserver(id: string): inspector.ComponentObserver;
}
/**
 * class Router
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * class Router
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * class Router
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class Router {
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { router.RouterOptions } options - Options.
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
     * @param { router.RouterOptions } options - Options.
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
    pushUrl(options: router.RouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { router.RouterOptions } options - Options.
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
     * @param { router.RouterOptions } options - Options.
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
    pushUrl(options: router.RouterOptions): Promise<void>;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
    pushUrl(options: router.RouterOptions, mode: router.RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
    pushUrl(options: router.RouterOptions, mode: router.RouterMode): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    replaceUrl(options: router.RouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    replaceUrl(options: router.RouterOptions): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    replaceUrl(options: router.RouterOptions, mode: router.RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Failed to get the delegate. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Failed to get the delegate. This error code is thrown only in the standard system.
     * @throws { BusinessError } 200002 - Uri error. The URI of the page to be used for replacement is incorrect or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    replaceUrl(options: router.RouterOptions, mode: router.RouterMode): Promise<void>;
    /**
     * Returns to the previous page or a specified page.
     *
     * @param { router.RouterOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Returns to the previous page or a specified page.
     *
     * @param { router.RouterOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    back(options?: router.RouterOptions): void;
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
    back(index: number, params?: Object): void;
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
    clear(): void;
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
    getLength(): string;
    /**
     * Obtains information about the current page state.
     *
     * @returns { router.RouterState } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains information about the current page state.
     *
     * @returns { router.RouterState } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getState(): router.RouterState;
    /**
     * Obtains page information by index.
     *
     * @param { number } index - Index of page.
     * @returns { router.RouterState | undefined } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getStateByIndex(index: number): router.RouterState | undefined;
    /**
     * Obtains page information by url.
     *
     * @param { string } url - URL of page.
     * @returns { Array<router.RouterState> } Page state.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getStateByUrl(url: string): Array<router.RouterState>;
    /**
     * Pop up alert dialog to ask whether to back.
     *
     * @param { router.EnableAlertOptions } options - Options.
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
     * Pop up alert dialog to ask whether to back.
     *
     * @param { router.EnableAlertOptions } options - Options.
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
    showAlertBeforeBackPage(options: router.EnableAlertOptions): void;
    /**
     * Hide alert before back page.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Hide alert before back page.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    hideAlertBeforeBackPage(): void;
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
    getParams(): Object;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
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
     * @param { router.NamedRouterOptions } options - Options.
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
    pushNamedRoute(options: router.NamedRouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
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
     * @param { router.NamedRouterOptions } options - Options.
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
    pushNamedRoute(options: router.NamedRouterOptions): Promise<void>;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
    pushNamedRoute(options: router.NamedRouterOptions, mode: router.RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
    pushNamedRoute(options: router.NamedRouterOptions, mode: router.RouterMode): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     * @param { router.NamedRouterOptions } options - Options.
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
     * @param { router.NamedRouterOptions } options - Options.
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
    replaceNamedRoute(options: router.NamedRouterOptions, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     * @param { router.NamedRouterOptions } options - Options.
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
     * @param { router.NamedRouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    replaceNamedRoute(options: router.NamedRouterOptions): Promise<void>;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of replaceNamedRoute.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - The UI execution context is not found. This error code is thrown only in the standard system.
     * @throws { BusinessError } 100004 - Named route error. The named route does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    replaceNamedRoute(options: router.NamedRouterOptions, mode: router.RouterMode, callback: AsyncCallback<void>): void;
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
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
    replaceNamedRoute(options: router.NamedRouterOptions, mode: router.RouterMode): Promise<void>;
}
/**
 * class PromptAction
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * class PromptAction
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export class PromptAction {
    /**
     * Displays the notification text.
     *
     * @param { promptAction.ShowToastOptions } options - Options.
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
     * Displays the notification text.
     *
     * @param { promptAction.ShowToastOptions } options - Options.
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
    showToast(options: promptAction.ShowToastOptions): void;
    /**
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @param { AsyncCallback<promptAction.ShowDialogSuccessResponse> } callback - the callback of showDialog.
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
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @param { AsyncCallback<promptAction.ShowDialogSuccessResponse> } callback - the callback of showDialog.
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
    /**
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @param { AsyncCallback<promptAction.ShowDialogSuccessResponse> } callback - the callback of showDialog.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    showDialog(options: promptAction.ShowDialogOptions, callback: AsyncCallback<promptAction.ShowDialogSuccessResponse>): void;
    /**
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @returns { Promise<promptAction.ShowDialogSuccessResponse> } the promise returned by the function.
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
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @returns { Promise<promptAction.ShowDialogSuccessResponse> } the promise returned by the function.
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
    showDialog(options: promptAction.ShowDialogOptions): Promise<promptAction.ShowDialogSuccessResponse>;
    /**
     * Displays the menu.
     *
     * @param { promptAction.ActionMenuOptions } options - Options.
     * @param { promptAction.ActionMenuSuccessResponse } callback - the callback of showActionMenu.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @deprecated since 11
     * @useinstead showActionMenu
     */
    showActionMenu(options: promptAction.ActionMenuOptions, callback: promptAction.ActionMenuSuccessResponse): void;
    /**
     * Displays the menu.
     *
     * @param { promptAction.ActionMenuOptions } options - Options.
     * @param { AsyncCallback<promptAction.ActionMenuSuccessResponse> } callback - the callback of showActionMenu.
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
    showActionMenu(options: promptAction.ActionMenuOptions, callback: AsyncCallback<promptAction.ActionMenuSuccessResponse>): void;
    /**
     * Displays the menu.
     *
     * @param { promptAction.ActionMenuOptions } options - Options.
     * @returns { Promise<promptAction.ActionMenuSuccessResponse> } callback - the callback of showActionMenu.
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
     * Displays the menu.
     *
     * @param { promptAction.ActionMenuOptions } options - Options.
     * @returns { Promise<promptAction.ActionMenuSuccessResponse> } callback - the callback of showActionMenu.
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
    showActionMenu(options: promptAction.ActionMenuOptions): Promise<promptAction.ActionMenuSuccessResponse>;
    /**
     * Open the custom dialog with frameNode.
     *
     * @param { ComponentContent<T> } dialogContent - the content of custom dialog.
     * @param { promptAction.BaseDialogOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 103301 - the ComponentContent is incorrect.
     * @throws { BusinessError } 103302 - Dialog content already exists.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    openCustomDialog<T extends Object>(dialogContent: ComponentContent<T>, options?: promptAction.BaseDialogOptions): Promise<void>;
    /**
     * Update the custom dialog with frameNode.
     *
     * @param { ComponentContent<T> } dialogContent - the content of custom dialog.
     * @param { promptAction.BaseDialogOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 103301 - the ComponentContent is incorrect.
     * @throws { BusinessError } 103303 - the ComponentContent cannot be found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    updateCustomDialog<T extends Object>(dialogContent: ComponentContent<T>, options: promptAction.BaseDialogOptions): Promise<void>;
    /**
     * Close the custom dialog with frameNode.
     *
     * @param { ComponentContent<T> } dialogContent - the content of custom dialog.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 103301 - the ComponentContent is incorrect.
     * @throws { BusinessError } 103303 - the ComponentContent cannot be found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    closeCustomDialog<T extends Object>(dialogContent: ComponentContent<T>): Promise<void>;
    /**
     * Open the custom dialog.
     *
     * @param { promptAction.CustomDialogOptions } options - Options.
     * @returns { Promise<number> } return the dialog id that will be used by closeCustomDialog.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    openCustomDialog(options: promptAction.CustomDialogOptions): Promise<number>;
    /**
     * Close the custom dialog.
     *
     * @param { number } dialogId - the dialog id that returned by openCustomDialog.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    closeCustomDialog(dialogId: number): void;
}
/**
 * Defines the callback type used in UIObserver watch click event.
 * The value of event indicates the information of ClickEvent.
 * The value of node indicates the frameNode which will receive the event.
 *
 * @typedef { function } ClickEventListenerCallback
 * @param { ClickEvent } event - the information of ClickEvent
 * @param { FrameNode } [node] - the information of frameNode
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare type ClickEventListenerCallback = (event: ClickEvent, node?: FrameNode) => void;
/**
 * Defines the callback type used in UIObserver watch gesture.
 * The value of event indicates the information of gesture.
 * The value of node indicates the frameNode which will receive the event.
 *
 * @typedef { function } GestureEventListenerCallback
 * @param { GestureEvent } event - the information of GestureEvent
 * @param { FrameNode } [node] - the information of frameNode
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare type GestureEventListenerCallback = (event: GestureEvent, node?: FrameNode) => void;
/**
 * Defines the PageInfo type.
 * The value of routerPageInfo indicates the information of the router page, or undefined if the
 * frameNode does not have router page information. And the value of navDestinationInfo indicates
 * the information of the navDestination, or undefined if the frameNode does not have navDestination
 * information.
 *
 * @interface PageInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface PageInfo {
    /**
     * the property of router page information.
     *
     * @type { ?observer.RouterPageInfo }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    routerPageInfo?: observer.RouterPageInfo;
    /**
     * the property of navDestination information.
     *
     * @type { ?observer.NavDestinationInfo }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    navDestinationInfo?: observer.NavDestinationInfo;
}
/**
 * Register callbacks to observe ArkUI behavior.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Register callbacks to observe ArkUI behavior.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class UIObserver {
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { object } options - Specify the id of observed navigation.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'navDestinationUpdate', options: {
        navigationId: ResourceStr;
    }, callback: Callback<observer.NavDestinationInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { object } options - Specify the id of observed navigation.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to remove. If not provided, all callbacks for the given event type and
     *                                                             navigation ID will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to remove. If not provided, all callbacks for the given event type and
     *                                                             navigation ID will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'navDestinationUpdate', options: {
        navigationId: ResourceStr;
    }, callback?: Callback<observer.NavDestinationInfo>): void;
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'navDestinationUpdate', callback: Callback<observer.NavDestinationInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate'} type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { Callback<observer.NavDestinationInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate'} type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { Callback<observer.NavDestinationInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'navDestinationUpdate', callback?: Callback<observer.NavDestinationInfo>): void;
    /**
     * Registers a callback function to be called when the scroll event start or stop.
     *
     * @param { 'scrollEvent' } type - The type of event to listen for. Must be 'scrollEvent'.
     * @param { observer.ObserverOptions } options - The options object.
     * @param { Callback<observer.ScrollEventInfo> } callback - The callback function to be called when the scroll event start or stop.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'scrollEvent', options: observer.ObserverOptions, callback: Callback<observer.ScrollEventInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'scrollEvent' } type - The type of event to remove the listener for. Must be 'scrollEvent'.
     * @param { observer.ObserverOptions } options - The options object.
     * @param { Callback<observer.ScrollEventInfo> } callback - The callback function to remove. If not provided, all callbacks for the given event type and
     *                                                    scroll ID will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'scrollEvent', options: observer.ObserverOptions, callback?: Callback<observer.ScrollEventInfo>): void;
    /**
     * Registers a callback function to be called when the scroll event start or stop.
     *
     * @param { 'scrollEvent' } type - The type of event to listen for. Must be 'scrollEvent'.
     * @param { Callback<observer.ScrollEventInfo> } callback - The callback function to be called when the scroll event start or stop.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'scrollEvent', callback: Callback<observer.ScrollEventInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'scrollEvent'} type - The type of event to remove the listener for. Must be 'scrollEvent'.
     * @param { Callback<observer.ScrollEventInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                      will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'scrollEvent', callback?: Callback<observer.ScrollEventInfo>): void;
    /**
     * Registers a callback function to be called when the router page in a ui context is updated.
     *
     * @param { 'routerPageUpdate' } type - The type of event to listen for. Must be 'routerPageUpdate'.
     * @param { Callback<observer.RouterPageInfo> } callback - The callback function to be called when the router page is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Registers a callback function to be called when the router page in a ui context is updated.
     *
     * @param { 'routerPageUpdate' } type - The type of event to listen for. Must be 'routerPageUpdate'.
     * @param { Callback<observer.RouterPageInfo> } callback - The callback function to be called when the router page is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'routerPageUpdate', callback: Callback<observer.RouterPageInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'routerPageUpdate' } type - The type of event to remove the listener for. Must be 'routerPageUpdate'.
     * @param { Callback<observer.RouterPageInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'routerPageUpdate' } type - The type of event to remove the listener for. Must be 'routerPageUpdate'.
     * @param { Callback<observer.RouterPageInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'routerPageUpdate', callback?: Callback<observer.RouterPageInfo>): void;
    /**
     * Registers a callback function to be called when the screen density in a ui context is updated.
     *
     * @param { 'densityUpdate' } type - The type of event to listen for. Must be 'densityUpdate'.
     * @param { Callback<observer.DensityInfo> } callback - The callback function to be called when the screen density is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'densityUpdate', callback: Callback<observer.DensityInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'densityUpdate' } type - The type of event to remove the listener for. Must be 'densityUpdate'.
     * @param { Callback<observer.DensityInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                        will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'densityUpdate', callback?: Callback<observer.DensityInfo>): void;
    /**
   * Registers a callback function to be called when the draw command will be drawn.
   *
   * @param { 'willDraw' } type - The type of event to listen for. Must be 'willDraw'.
   * @param { Callback<void> } callback - The callback function to be called when the draw command will be drawn.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
    on(type: 'willDraw', callback: Callback<void>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'willDraw' } type - The type of event to remove the listener for. Must be 'willDraw'.
     * @param { Callback<void> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                        will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'willDraw', callback?: Callback<void>): void;
    /**
 * Registers a callback function to be called when the layout is done.
 *
 * @param { 'didLayout' } type - The type of event to listen for. Must be 'didLayout'.
 * @param { Callback<void> } callback - The callback function to be called when the layout is done.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
    on(type: 'didLayout', callback: Callback<void>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'didLayout' } type - The type of event to remove the listener for. Must be 'didLayout'.
     * @param { Callback<void> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                        will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'didLayout', callback?: Callback<void>): void;
    /**
     * Registers a callback function to be called when the navigation switched to a new navDestination.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to listen for. Must be 'navDestinationSwitch'.
     * @param { Callback<observer.NavDestinationSwitchInfo> } callback - The callback function to be called when
     *                                                                   the navigation switched to a new navDestination.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'navDestinationSwitch', callback: Callback<observer.NavDestinationSwitchInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to remove the listener for. Must be 'navDestinationSwitch'.
     * @param { Callback<observer.NavDestinationSwitchInfo> } [callback] - The callback function to remove. If not provided,
     *                                                                     all callbacks for the given event type will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'navDestinationSwitch', callback?: Callback<observer.NavDestinationSwitchInfo>): void;
    /**
     * Registers a callback function to be called when the navigation switched to a new navDestination.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to listen for. Must be 'navDestinationSwitch'.
     * @param { observer.NavDestinationSwitchObserverOptions } observerOptions - Options.
     * @param { Callback<observer.NavDestinationSwitchInfo> } callback - The callback function to be called when the
     *                                                                   navigation switched to a new navDestination.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'navDestinationSwitch', observerOptions: observer.NavDestinationSwitchObserverOptions, callback: Callback<observer.NavDestinationSwitchInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to remove the listener for. Must be 'navDestinationSwitch'.
     * @param { observer.NavDestinationSwitchObserverOptions } observerOptions - Options.
     * @param { Callback<observer.NavDestinationSwitchInfo> } [callback] - The callback function to remove. If not provided,
     *                                                                     all callbacks for the given event type will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'navDestinationSwitch', observerOptions: observer.NavDestinationSwitchObserverOptions, callback?: Callback<observer.NavDestinationSwitchInfo>): void;
    /**
     * Registers a callback function to be called before clickEvent is called.
     *
     * @param { 'willClick' } type - The type of event to listen for.
     * @param { ClickEventListenerCallback } callback - The callback function to be called
     *                                                  when the clickEvent will be trigger or after.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'willClick', callback: ClickEventListenerCallback): void;
    /**
     * Removes a callback function to be called before clickEvent is called.
     *
     * @param { 'willClick' } type - The type of event to remove the listener for.
     * @param { ClickEventListenerCallback } [callback] - The callback function to remove. If not provided,
     *                                                    all callbacks for the given event type will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'willClick', callback?: ClickEventListenerCallback): void;
    /**
     * Registers a callback function to be called after clickEvent is called.
     *
     * @param { 'didClick' } type - The type of event to listen for.
     * @param { ClickEventListenerCallback } callback - The callback function to be called
     *                                                  when the clickEvent will be trigger or after.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'didClick', callback: ClickEventListenerCallback): void;
    /**
     * Removes a callback function to be called after clickEvent is called.
     *
     * @param { 'didClick' } type - The type of event to remove the listener for.
     * @param { ClickEventListenerCallback } [callback] - The callback function to remove. If not provided,
     *                                                    all callbacks for the given event type will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'didClick', callback?: ClickEventListenerCallback): void;
    /**
     * Registers a callback function to be called before tapGesture is called.
     *
     * @param { 'willClick' } type - The type of event to listen for.
     * @param { GestureEventListenerCallback } callback - The callback function to be called
     *                                                    when the clickEvent will be trigger or after.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'willClick', callback: GestureEventListenerCallback): void;
    /**
     * Removes a callback function to be called before tapGesture is called.
     *
     * @param { 'willClick' } type - The type of event to remove the listener for.
     * @param { GestureEventListenerCallback } [callback] - The callback function to remove. If not provided,
     *                                                      all callbacks for the given event type will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'willClick', callback?: GestureEventListenerCallback): void;
    /**
     * Registers a callback function to be called after tapGesture is called.
     *
     * @param { 'didClick' } type - The type of event to listen for.
     * @param { GestureEventListenerCallback } callback - The callback function to be called
     *                                                    when the clickEvent will be trigger or after.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    on(type: 'didClick', callback: GestureEventListenerCallback): void;
    /**
     * Removes a callback function to be called after tapGesture is called.
     *
     * @param { 'didClick' } type - The type of event to remove the listener for.
     * @param { GestureEventListenerCallback } [callback] - The callback function to remove. If not provided,
     *                                                      all callbacks for the given event type will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    off(type: 'didClick', callback?: GestureEventListenerCallback): void;
}
/**
 * class ComponentUtils
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * class ComponentUtils
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export class ComponentUtils {
    /**
     * Provide the ability to obtain the coordinates and size of component drawing areas.
     *
     * @param { string } id - ID of the component whose attributes are to be obtained.
     * @returns { componentUtils.ComponentInfo } the object of ComponentInfo.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Provide the ability to obtain the coordinates and size of component drawing areas.
     *
     * @param { string } id - ID of the component whose attributes are to be obtained.
     * @returns { componentUtils.ComponentInfo } the object of ComponentInfo.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    getRectangleById(id: string): componentUtils.ComponentInfo;
}
/**
 * class OverlayManager
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class OverlayManager {
    /**
     * Add the ComponentContent to the OverlayManager.
     *
     * @param { ComponentContent } content - The content will be added to the OverlayManager.
     * @param { number } [ index ] - The index at which to add the ComponentContent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    addComponentContent(content: ComponentContent, index?: number): void;
    /**
     * Remove the ComponentContent from the OverlayManager.
     *
     * @param { ComponentContent } content - The content will be removed from the OverlayManager.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    removeComponentContent(content: ComponentContent): void;
    /**
     * Show the ComponentContent.
     *
     * @param { ComponentContent } content - The content will be shown.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    showComponentContent(content: ComponentContent): void;
    /**
     * Hide the ComponentContent.
     *
     * @param { ComponentContent } content - The content will be hidden.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    hideComponentContent(content: ComponentContent): void;
    /**
     * Show all ComponentContents on the OverlayManager.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    showAllComponentContents(): void;
    /**
     * Hide all ComponentContents on the OverlayManager.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    hideAllComponentContents(): void;
}
/**
 * interface AtomicServiceBar
 * @interface AtomicServiceBar
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * interface AtomicServiceBar
 * @interface AtomicServiceBar
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface AtomicServiceBar {
    /**
     * Set the visibility of the bar, except the icon.
     *
     * @param { boolean } visible - whether this bar is visible.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    setVisible(visible: boolean): void;
    /**
     * Set the background color of the bar.
     *
     * @param { Nullable< Color | number | string> } color - the color to set, undefined indicates using default.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Set the background color of the bar.
     *
     * @param { Nullable< Color | number | string> } color - the color to set, undefined indicates using default.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setBackgroundColor(color: Nullable<Color | number | string>): void;
    /**
     * Set the title of the bar.
     *
     * @param { string } content - the content of the bar.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Set the title of the bar.
     *
     * @param { string } content - the content of the bar.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setTitleContent(content: string): void;
    /**
     * Set the font style of the bar's title.
     *
     * @param { FontStyle } font - the font style of the bar's title.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Set the font style of the bar's title.
     *
     * @param { FontStyle } font - the font style of the bar's title.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setTitleFontStyle(font: FontStyle): void;
    /**
     * Set the color of the icon on the bar.
     *
     * @param { Nullable< Color | number | string> } color - the color to set to icon, undefined indicates using default.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Set the color of the icon on the bar.
     *
     * @param { Nullable< Color | number | string> } color - the color to set to icon, undefined indicates using default.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setIconColor(color: Nullable<Color | number | string>): void;
}
/**
 * Represents a dynamic synchronization scene.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export class DynamicSyncScene {
    /**
     * Sets the FrameRateRange of the DynamicSyncScene.
     *
     * @param { ExpectedFrameRateRange } range - The range of frameRate.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setFrameRateRange(range: ExpectedFrameRateRange): void;
    /**
     * Gets the FrameRateRange of the DynamicSyncScene.
     *
     * @returns { ExpectedFrameRateRange } The range of frameRate.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    getFrameRateRange(): ExpectedFrameRateRange;
}
/**
 * Represents a dynamic synchronization scene of Swiper.
 *
 * @extends DynamicSyncScene
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export class SwiperDynamicSyncScene extends DynamicSyncScene {
    /**
    * Type of the SwiperDynamicSyncSceneType.
    * @type { SwiperDynamicSyncSceneType }
    * @readonly
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @atomicservice
    * @since 12
    */
    readonly type: SwiperDynamicSyncSceneType;
}
/**
 * class DragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 11
 */
/**
 * class DragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export class DragController {
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<{ event: DragEvent, extraParams: string }> } callback - Callback that contains
     * the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<dragController.DragEventParam> } callback - Callback that contains
     * the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: dragController.DragInfo, callback: AsyncCallback<dragController.DragEventParam>): void;
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<{ event: DragEvent, extraParams: string }> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<dragController.DragEventParam> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: dragController.DragInfo): Promise<dragController.DragEventParam>;
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts displayed when the objects are dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @returns { dragController.DragAction } one drag action object
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts displayed when the objects are dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @returns { dragController.DragAction } one drag action object
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    createDragAction(customArray: Array<CustomBuilder | DragItemInfo>, dragInfo: dragController.DragInfo): dragController.DragAction;
    /**
     * Get a drag preview object, which provides the functions of setting color or updating animation and has no effect in OnDrop and OnDragEnd callback.
     * @returns { dragController.DragPreview } A drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Get a drag preview object.
     * @returns { dragController.DragPreview } A drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    getDragPreview(): dragController.DragPreview;
    /**
     * Enable drag event strict reporting for drag enter and leave notification in nested situation.
     * For example, the parent and child both register the onDragEnter/onDragLeave events, if this
     * flag is enabled, the parent will be notified with leave event, and the child will notified with
     * enter event at the same time, when user drag action is passing through the parent and enter the
     * scope of the child.
     * Please be noted, the default value of the flag is false, it means, for the same situation, the
     * parent will not receive the leave notification, just the child can get the enter event, which is
     * not fully strict.
     * @param { boolean } enable - Indicating enable drag event strict reporting or not.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setDragEventStrictReportingEnabled(enable: boolean): void;
}
/**
 * class MeasureUtils
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class MeasureUtils {
    /**
     * Obtains the width of the specified text in a single line layout.
     *
     * @param { MeasureOptions } options - Options.
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    measureText(options: MeasureOptions): number;
    /**
     * Obtains the width and height of the specified text in a single line layout.
     *
     * @param { MeasureOptions } options - Options of measure area occupied by text.
     * @returns { SizeOptions } width and height for text to display
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    measureTextSize(options: MeasureOptions): SizeOptions;
}
/**
 * class FocusController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export class FocusController {
    /**
     * clear focus to the root container.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    clearFocus(): void;
    /**
     * request focus to the specific component.
     * @param { string } key - the inspector key of the component.
     * @throws { BusinessError } 150001 - the component cannot be focused.
     * @throws { BusinessError } 150002 - This component has an unfocusable ancestor.
     * @throws { BusinessError } 150003 - the component is not on tree or does not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    requestFocus(key: string): void;
}
/**
 * Pointer style.
 *
 * @typedef {pointer.PointerStyle} PointerStyle
 * @syscap SystemCapability.MultimodalInput.Input.Pointer
 * @atomicservice
 * @since 12
 */
export type PointerStyle = pointer.PointerStyle;
/**
 * class CursorController
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class CursorController {
    /**
     * Restore default cursor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    restoreDefault(): void;
    /**
     * Set cursor style.
     *
     * @param { PointerStyle } value - cursor style enum.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    setCursor(value: PointerStyle): void;
}
/**
 * class ContextMenuController
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class ContextMenuController {
    /**
     * Close context menu.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    close(): void;
}
/**
 * Class FrameCallback
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export abstract class FrameCallback {
    /**
     * Call when a new display frame is being rendered.
     *
     * @param { number } frameTimeInNano - The frame time in nanoseconds.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    abstract onFrame(frameTimeInNano: number): void;
}
/**
 * The base context of an ability or an application. It allows access to
 * application-specific resources.
 *
 * @typedef { common.Context } Context
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export type Context = common.Context;
/**
 * class ComponentSnapshot
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export class ComponentSnapshot {
    /**
       * Get a component snapshot by component id.
       *
       * @param { string } id - Target component ID, set by developer through .id attribute.
       * @param { AsyncCallback<image.PixelMap> } callback - Callback that contains the snapshot in PixelMap format.
       * @param { componentSnapshot.SnapshotOptions } [options] - Define the snapshot options.
       * @throws { BusinessError } 401 - Parameter error. Possible causes:
       * <br> 1. Mandatory parameters are left unspecified.
       * <br> 2. Incorrect parameters types.
       * <br> 3. Parameter verification failed.
       * @throws { BusinessError } 100001 - Invalid ID.
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 12
       */
    get(id: string, callback: AsyncCallback<image.PixelMap>, options?: componentSnapshot.SnapshotOptions): void;
    /**
     * Get a component snapshot by component id.
     *
     * @param { string } id - Target component ID, set by developer through .id attribute.
     * @param { componentSnapshot.SnapshotOptions } [options] - Define the snapshot options.
     * @returns { Promise<image.PixelMap> } A Promise with the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Invalid ID.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    get(id: string, options?: componentSnapshot.SnapshotOptions): Promise<image.PixelMap>;
    /**
     * Generate a snapshot from a custom component builder.
     *
     * @param { CustomBuilder } builder - Builder function of a custom component.
     * @param { AsyncCallback<image.PixelMap> } callback - Callback that contains the snapshot in PixelMap format.
     * @param { number } [delay] - Defines the delay time to render the snapshot.
     * @param { boolean } [checkImageStatus] - Defines if check the image decoding status before taking snapshot.
     * @param { componentSnapshot.SnapshotOptions } [options] - Define the snapshot options.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The builder is not a valid build function.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    createFromBuilder(builder: CustomBuilder, callback: AsyncCallback<image.PixelMap>, delay?: number, checkImageStatus?: boolean, options?: componentSnapshot.SnapshotOptions): void;
    /**
     * Generate a snapshot from a custom component builder.
     *
     * @param { CustomBuilder } builder - Builder function of a custom component.
     * @param { number } [delay] - Defines the delay time to render the snapshot.
     * @param { boolean } [checkImageStatus] - Defines if check the image decoding status before taking snapshot.
     * @param { componentSnapshot.SnapshotOptions } [options] - Define the snapshot options.
     * @returns { Promise<image.PixelMap> } A Promise with the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The builder is not a valid build function.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    createFromBuilder(builder: CustomBuilder, delay?: number, checkImageStatus?: boolean, options?: componentSnapshot.SnapshotOptions): Promise<image.PixelMap>;
}
/**
 * class UIContext
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * class UIContext
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export class UIContext {
    /**
     * get object font.
     *
     * @returns { Font } object Font.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * get object font.
     *
     * @returns { Font } object Font.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getFont(): Font;
    /**
     * get object mediaQuery.
     *
     * @returns { MediaQuery } object MediaQuery.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * get object mediaQuery.
     *
     * @returns { MediaQuery } object MediaQuery.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getMediaQuery(): MediaQuery;
    /**
     * get object UIInspector.
     * @returns { UIInspector } object UIInspector.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * get object UIInspector.
     * @returns { UIInspector } object UIInspector.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getUIInspector(): UIInspector;
    /**
     * get the filtered attributes of the component tree.
     * @param { Array<string> } [filters] - the list of filters used to filter out component tree to be obtained.
     * @returns { string } the specified attributes of the component tree in json string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getFilteredInspectorTree(filters?: Array<string>): string;
    /**
     * get the filtered attributes of the component tree with the specified id and depth
     * @param { string } id - ID of the specified component tree to be obtained.
     * @param { number } depth - depth of the component tree to be obtained.
     * @param { Array<string> } [filters] - the list of filters used to filter out component tree to be obtained.
     * @returns { string } the specified attributes of the component tree in json string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getFilteredInspectorTreeById(id: string, depth: number, filters?: Array<string>): string;
    /**
     * get object router.
     *
     * @returns { Router } object Router.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * get object router.
     *
     * @returns { Router } object Router.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getRouter(): Router;
    /**
     * get object PromptAction.
     *
     * @returns { PromptAction } object PromptAction.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * get object PromptAction.
     *
     * @returns { PromptAction } object PromptAction.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getPromptAction(): PromptAction;
    /**
     * get object ComponentUtils.
     * @returns { ComponentUtils } object ComponentUtils.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * get object ComponentUtils.
     * @returns { ComponentUtils } object ComponentUtils.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getComponentUtils(): ComponentUtils;
    /**
     * Get the UI observer.
     *
     * @returns { UIObserver } The UI observer.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Get the UI observer.
     *
     * @returns { UIObserver } The UI observer.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getUIObserver(): UIObserver;
    /**
     * Get object OverlayManager.
     *
     * @returns { OverlayManager } object OverlayManager.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getOverlayManager(): OverlayManager;
    /**
     * Create an animator object for custom animation.
     *
     * @param { AnimatorOptions } options - Options.
     * @returns { AnimatorResult }
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Create an animator object for custom animation.
     *
     * @param { AnimatorOptions } options - Options.
     * @returns { AnimatorResult }
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    createAnimator(options: AnimatorOptions): AnimatorResult;
    /**
     * Defining animation function
     *
     * @param { AnimateParam } value - parameters for animation.
     * @param { function } event - the closure base on which, the system will create animation automatically
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Defining animation function
     *
     * @param { AnimateParam } value - parameters for animation.
     * @param { function } event - the closure base on which, the system will create animation automatically
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    animateTo(value: AnimateParam, event: () => void): void;
    /**
     * alertDialog display.
     *
     * @param { AlertDialogParamWithConfirm | AlertDialogParamWithButtons | AlertDialogParamWithOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * alertDialog display.
     *
     * @param { AlertDialogParamWithConfirm | AlertDialogParamWithButtons | AlertDialogParamWithOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showAlertDialog(options: AlertDialogParamWithConfirm | AlertDialogParamWithButtons | AlertDialogParamWithOptions): void;
    /**
     * actionSheet display.
     *
     * @param { ActionSheetOptions } value - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * actionSheet display.
     *
     * @param { ActionSheetOptions } value - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showActionSheet(value: ActionSheetOptions): void;
    /**
     * datePickerDialog display.
     *
     * @param { DatePickerDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * datePickerDialog display.
     *
     * @param { DatePickerDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showDatePickerDialog(options: DatePickerDialogOptions): void;
    /**
     * timePickerDialog display.
     *
     * @param { TimePickerDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * timePickerDialog display.
     *
     * @param { TimePickerDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showTimePickerDialog(options: TimePickerDialogOptions): void;
    /**
     * textPickerDialog display.
     *
     * @param { TextPickerDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * textPickerDialog display.
     *
     * @param { TextPickerDialogOptions } options - Options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showTextPickerDialog(options: TextPickerDialogOptions): void;
    /**
     * Run custom functions inside the UIContext scope.
     *
     * @param { function } callback - The function called through UIContext.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Run custom functions inside the UIContext scope.
     *
     * @param { function } callback - The function called through UIContext.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    runScopedTask(callback: () => void): void;
    /**
     * Set KeyboardAvoidMode. The default mode is KeyboardAvoidMode.OFFSET
     *
     * @param { KeyboardAvoidMode } value - The mode of keyboard avoid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    setKeyboardAvoidMode(value: KeyboardAvoidMode): void;
    /**
     * Get KeyboardAvoidMode.
     * @returns { KeyboardAvoidMode } The mode of keyboard avoid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getKeyboardAvoidMode(): KeyboardAvoidMode;
    /**
     * Get AtomicServiceBar.
     * @returns { Nullable<AtomicServiceBar> } The atomic service bar.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getAtomicServiceBar(): Nullable<AtomicServiceBar>;
    /**
     * Get DragController.
     * @returns { DragController } the DragController
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Get DragController.
     * @returns { DragController } the DragController
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    getDragController(): DragController;
    /**
      * Get MeasureUtils.
      * @returns { MeasureUtils } the MeasureUtils
      * @syscap SystemCapability.ArkUI.ArkUI.Full
      * @crossplatform
      * @atomicservice
      * @since 12
      */
    getMeasureUtils(): MeasureUtils;
    /**
     * Defining keyframe animation function.
     *
     * @param { KeyframeAnimateParam } param - overall animation parameters
     * @param { Array<KeyframeState> } keyframes - all keyframe states
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Defining keyframe animation function.
     *
     * @param { KeyframeAnimateParam } param - overall animation parameters
     * @param { Array<KeyframeState> } keyframes - all keyframe states
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    keyframeAnimateTo(param: KeyframeAnimateParam, keyframes: Array<KeyframeState>): void;
    /**
     * Get FocusController.
     * @returns { FocusController } the FocusController
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    getFocusController(): FocusController;
    /**
     * Get FrameNode by id.
     *
     * @param { string } id - The id of FrameNode.
     * @returns { FrameNode | null } The instance of FrameNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getFrameNodeById(id: string): FrameNode | null;
    /**
     * Get the FrameNode attached to current window by id.
     *
     * @param { string } id - The id of FrameNode.
     * @returns { FrameNode | null } The instance of FrameNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getAttachedFrameNodeById(id: string): FrameNode | null;
    /**
     * Get FrameNode by uniqueId.
     *
     * @param { number } id - The uniqueId of the FrameNode.
     * @returns { FrameNode | null } - The FrameNode with the target uniqueId, or null if the frameNode is not existed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getFrameNodeByUniqueId(id: number): FrameNode | null;
    /**
     * Get page information of the frameNode with uniqueId.
     *
     * @param { number } id - The uniqueId of the target FrameNode.
     * @returns { PageInfo } - The page information of the frameNode with the target uniqueId, includes
     * navDestination and router page information. If the frame node does not have navDestination and
     * router page information, it will return an empty object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getPageInfoByUniqueId(id: number): PageInfo;
    /**
     * Get navigation information of the frameNode with uniqueId.
     *
     * @param { number } id - The uniqueId of the target FrameNode.
     * @returns { observer.NavigationInfo | undefined } - The navigation information of the frameNode with the
     * target uniqueId, or undefined if the frameNode is not existed or does not have navigation information.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getNavigationInfoByUniqueId(id: number): observer.NavigationInfo | undefined;
    /**
     * Get object cursor controller.
     *
     * @returns { CursorController } object cursor controller.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getCursorController(): CursorController;
    /**
     * Get object context menu controller.
     *
     * @returns { ContextMenuController } object context menu controller.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getContextMenuController(): ContextMenuController;
    /**
     * Get ComponentSnapshot.
     * @returns { ComponentSnapshot } the ComponentSnapshot
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    getComponentSnapshot(): ComponentSnapshot;
    /**
     * Converts a value in vp units to a value in px.
     * @param { number } value
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    vp2px(value: number): number;
    /**
     * Converts a value in px units to a value in vp.
     * @param { number } value
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    px2vp(value: number): number;
    /**
     * Converts a value in fp units to a value in px.
     * @param { number } value
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    fp2px(value: number): number;
    /**
     * Converts a value in px units to a value in fp.
     * @param { number } value
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    px2fp(value: number): number;
    /**
     * Converts a value in lpx units to a value in px.
     * @param { number } value
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    lpx2px(value: number): number;
    /**
     * Converts a value in px units to a value in lpx.
     * @param { number } value
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    px2lpx(value: number): number;
    /**
     * Get current LocalStorage shared from stage.
     *
     * @returns { LocalStorage | undefined }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getSharedLocalStorage(): LocalStorage | undefined;
    /**
     * Obtains context of the ability.
     *
     * @returns { Context | undefined }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getHostContext(): Context | undefined;
    /**
     * Get the name of current window.
     *
     * @returns { string | undefined } The name of current window, or undefined if the window doesn't exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getWindowName(): string | undefined;
    /**
     * Open the BindSheet.
     *
     * @param { ComponentContent<T> } bindSheetContent - The content of BindSheet.
     * @param { SheetOptions } sheetOptions - The options of sheet.
     * @param { number } targetId - The uniqueId of the FrameNode to which BindSheet is attached.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 120001 - The bindSheetContent is incorrect.
     * @throws { BusinessError } 120002 - The bindSheetContent already exists.
     * @throws { BusinessError } 120004 - The targetId does not exist.
     * @throws { BusinessError } 120005 - The node of targetId is not in the component tree.
     * @throws { BusinessError } 120006 - The node of targetId is not a child of the page node or NavDestination node.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    openBindSheet<T extends Object>(bindSheetContent: ComponentContent<T>, sheetOptions?: SheetOptions, targetId?: number): Promise<void>;
    /**
     * Update the BindSheet with sheetOptions.
     *
     * @param { ComponentContent<T> } bindSheetContent - The content of BindSheet.
     * @param { SheetOptions } sheetOptions - The update options of sheet.
     * @param { boolean } partialUpdate - If true, only the specified properties in the sheetOptions are updated,
     *                                    otherwise the rest of the properties are overwritten with the default values.
     *                                    Default value is false.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 120001 - The bindSheetContent is incorrect.
     * @throws { BusinessError } 120003 - The bindSheetContent cannot be found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    updateBindSheet<T extends Object>(bindSheetContent: ComponentContent<T>, sheetOptions: SheetOptions, partialUpdate?: boolean): Promise<void>;
    /**
     * Close the BindSheet.
     *
     * @param { ComponentContent<T> } bindSheetContent - The content of BindSheet.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 120001 - The bindSheetContent is incorrect.
     * @throws { BusinessError } 120003 - The bindSheetContent cannot be found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    closeBindSheet<T extends Object>(bindSheetContent: ComponentContent<T>): Promise<void>;
    /**
     * Post a frame callback to run on the next frame.
     *
     * @param { FrameCallback } frameCallback - The frame callback to run on the next frame.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    postFrameCallback(frameCallback: FrameCallback): void;
    /**
     * Post a frame callback to run on the next frame after the specified delay.
     *
     * @param { FrameCallback } frameCallback - The frame callback to run on the next frame.
     * @param { number } delayTime - The delay time in milliseconds,
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    postDelayedFrameCallback(frameCallback: FrameCallback, delayTime: number): void;
    /**
     * Require DynamicSyncScene by id.
     *
     * @param { string } id - The id of DynamicSyncScene.
     * @returns { Array<DynamicSyncScene>} The instance of SwiperDynamicSyncScene.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    requireDynamicSyncScene(id: string): Array<DynamicSyncScene>;
}
/**
 * Enum of KeyBoardAvoidMethodType
 *
 * @enum { number } KeyBoardAvoidMethodType
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export const enum KeyboardAvoidMode {
    /**
    * Default Type, offset the whole page when keyBoard height changed.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 11
    */
    OFFSET = 0,
    /**
     * Resize Type, resize the page when keyBoard height changed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    RESIZE = 1
}
/**
 * Enum of SwiperDynamicSyncSceneType
 *
 * @enum { number } SwiperDynamicSyncSceneType
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export const enum SwiperDynamicSyncSceneType {
    /**
     * Scene type is GESTURE.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    GESTURE = 0,
    /**
     * Scene type is ANIMATION.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    ANIMATION = 1
}
