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
 * @kit ArkUI
 */

/// <reference path="../component/common.d.ts" />
/// <reference path="../component/enums.d.ts" />
/// <reference path="../component/action_sheet.d.ts" />
/// <reference path="../component/alert_dialog.d.ts" />
/// <reference path="../component/date_picker.d.ts" />
/// <reference path="../component/time_picker.d.ts" />
/// <reference path="../component/text_picker.d.ts" />
import font from './@ohos.font';
import mediaQuery from './@ohos.mediaquery';
import type inspector from './@ohos.arkui.inspector';
import type observer from './@ohos.arkui.observer';
import promptAction from './@ohos.promptAction';
import router from './@ohos.router';
import type componentUtils from './@ohos.arkui.componentUtils';
import type { AnimatorOptions, AnimatorResult } from './@ohos.animator';
import type { Callback, AsyncCallback } from './@ohos.base';
import type { Color, FontStyle, Nullable } from 'CommonEnums';
import type { AnimateParam, KeyframeAnimateParam, KeyframeState } from 'AnimateToParam';
import { ActionSheetOptions } from 'actionSheetParam';
import { AlertDialogParamWithConfirm, AlertDialogParamWithButtons, AlertDialogParamWithOptions } from 'AlertDialogParam';
import { DatePickerDialogOptions } from 'DatePickerDialogParam';
import { TimePickerDialogOptions } from 'TimePickerDialogParam';
import { TextPickerDialogOptions } from 'textPickerDialogParam';
import type { CustomBuilder, DragItemInfo, DragEvent } from 'DragControllerParam';
import type dragController from './@ohos.arkui.dragController';
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
export class Router {
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushUrl.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     *
     * @param { router.RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100002 - if the uri is not exist.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     *
     * @param { router.RouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if can not get the delegate, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if can not get the delegate, only throw in standard system.
     * @throws { BusinessError } 200002 - if the uri is not exist.
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
     * Pop up alert dialog to ask whether to back.
     *
     * @param { router.EnableAlertOptions } options - Options.
     * @throws { BusinessError } 401 - if the type of the parameter is not object or the type of the message is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Pop up alert dialog to ask whether to back.
     *
     * @param { router.EnableAlertOptions } options - Options.
     * @throws { BusinessError } 401 - if the type of the parameter is not object or the type of the message is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of pushNamedRoute.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
    */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @param { AsyncCallback<void> } callback - the callback of pushNamedRoute.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
    */
    /**
     * Navigates to a specified page in the application based on the page URL and parameters.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @throws { BusinessError } 100003 - if the pages are pushed too much.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { AsyncCallback<void> } callback - the callback of replaceNamedRoute.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     * @param { router.NamedRouterOptions } options - Options.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if can not get the delegate, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Replaces the current page with another one in the application. The current page is destroyed after replacement.
     * @param { router.NamedRouterOptions } options - Options.
     * @param { router.RouterMode } mode - RouterMode.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
     * @throws { BusinessError } 100001 - if can not get the delegate, only throw in standard system.
     * @throws { BusinessError } 100004 - if the named route is not exist.
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
     * @throws { BusinessError } 401 - if the type of message is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Displays the notification text.
     *
     * @param { promptAction.ShowToastOptions } options - Options.
     * @throws { BusinessError } 401 - if the type of message is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
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
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @param { AsyncCallback<promptAction.ShowDialogSuccessResponse> } callback - the callback of showDialog.
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showDialog(options: promptAction.ShowDialogOptions, callback: AsyncCallback<promptAction.ShowDialogSuccessResponse>): void;
    /**
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @returns { Promise<promptAction.ShowDialogSuccessResponse> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Displays the dialog box.
     *
     * @param { promptAction.ShowDialogOptions } options - Options.
     * @returns { Promise<promptAction.ShowDialogSuccessResponse> } the promise returned by the function.
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
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
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
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
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
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
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Displays the menu.
     *
     * @param { promptAction.ActionMenuOptions } options - Options.
     * @returns { Promise<promptAction.ActionMenuSuccessResponse> } callback - the callback of showActionMenu.
     * @throws { BusinessError } 401 - if the number of parameters is not 1 or the type of parameters is incorrect.
     * @throws { BusinessError } 100001 - if UI execution context not found.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showActionMenu(options: promptAction.ActionMenuOptions): Promise<promptAction.ActionMenuSuccessResponse>;
}
/**
 * Register callbacks to observe ArkUI behavior.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export class UIObserver {
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    on(type: 'navDestinationUpdate', options: {
        navigationId: ResourceStr;
    }, callback: Callback<observer.NavDestinationInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<observer.NavDestinationInfo> } callback - The callback function to remove. If not provided, all callbacks for the given event type and
     *                                                             navigation ID will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    off(type: 'navDestinationUpdate', callback?: Callback<observer.NavDestinationInfo>): void;
    /**
     * Registers a callback function to be called when the router page in a ui context is updated.
     *
     * @param { 'routerPageUpdate' } type - The type of event to listen for. Must be 'routerPageUpdate'.
     * @param { Callback<observer.RouterPageInfo> } callback - The callback function to be called when the router page is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
    off(type: 'routerPageUpdate', callback?: Callback<observer.RouterPageInfo>): void;
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
 * interface AtomicServiceBar
 * @interface AtomicServiceBar
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
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
    setBackgroundColor(color: Nullable<Color | number | string>): void;
    /**
     * Set the title of the bar.
     *
     * @param { string } content - the content of the bar.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    setTitleContent(content: string): void;
    /**
     * Set the font style of the bar's title.
     *
     * @param { FontStyle } font - the font style of the bar's title.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    setTitleFontStyle(font: FontStyle): void;
    /**
     * Set the color of the icon on the bar.
     *
     * @param { Nullable< Color | number | string> } color - the color to set to icon, undefined indicates using default.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    setIconColor(color: Nullable<Color | number | string>): void;
}
/**
 * class DragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 11
 */
export class DragController {
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<{ event: DragEvent, extraParams: string }> } callback - Callback that contains
     * the drag event information.
     * @throws { BusinessError } 401 - if the parameters checking failed.
     * @throws { BusinessError } 100001 - if some internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: dragController.DragInfo, callback: AsyncCallback<{
        event: DragEvent;
        extraParams: string;
    }>): void;
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<{ event: DragEvent, extraParams: string }> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - if the parameters checking failed.
     * @throws { BusinessError } 100001 - if some internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: dragController.DragInfo): Promise<{
        event: DragEvent;
        extraParams: string;
    }>;
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts displayed when the objects are dragged.
     * @param { dragController.DragInfo } dragInfo - Information about the drag event.
     * @returns { dragController.DragAction } one drag action object
     * @throws { BusinessError } 401 - if the parameters checking failed.
     * @throws { BusinessError } 100001 - if some internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    createDragAction(customArray: Array<CustomBuilder | DragItemInfo>, dragInfo: dragController.DragInfo): dragController.DragAction;
    /**
     * Get a drag preview object.
     * @returns { dragController.DragPreview } A drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    getDragPreview(): dragController.DragPreview;
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
    getUIObserver(): UIObserver;
    /**
     * Create an animator object for custom animation.
     *
     * @param { AnimatorOptions } options - Options.
     * @returns { AnimatorResult }
     * @throws { BusinessError } 401 - if parameter error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Create an animator object for custom animation.
     *
     * @param { AnimatorOptions } options - Options.
     * @returns { AnimatorResult }
     * @throws { BusinessError } 401 - if parameter error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    createAnimator(options: AnimatorOptions): AnimatorResult;
    /**
     * Defining animation function
     *
     * @param { AnimateParam } value - animateTo parameters.
     * @param { function } event
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Defining animation function
     *
     * @param { AnimateParam } value - animateTo parameters.
     * @param { function } event
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
     * set KeyboardAvoidMode.
     *
     * @param { KeyboardAvoidMode } value - The mode of keyboard avoid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    setKeyboardAvoidMode(value: KeyboardAvoidMode): void;
    /**
     * get KeyboardAvoidMode.
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
    getDragController(): DragController;
    /**
     * Defining keyframe animation function.
     *
     * @param { KeyframeAnimateParam } param - overall animation parameters
     * @param { Array<KeyframeState> } keyframes - all keyframe states
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    keyframeAnimateTo(param: KeyframeAnimateParam, keyframes: Array<KeyframeState>): void;
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
