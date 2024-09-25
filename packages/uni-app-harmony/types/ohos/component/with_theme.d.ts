/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * CustomTheme.
 *
 * @typedef {import('../api/@ohos.arkui.theme').CustomTheme} CustomTheme
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare type CustomTheme = import('../api/@ohos.arkui.theme').CustomTheme;
/**
 * Defines the struct of WithThemeOptions.
 *
 * @interface WithThemeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface WithThemeOptions {
    /**
    * Custom Theme.
    *
    * @type { ?CustomTheme }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    theme?: CustomTheme;
    /**
    * Theme Color Mode.
    *
    * @type { ?ThemeColorMode }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    colorMode?: ThemeColorMode;
}
/**
* Define the function of WithThemeInterface.
*
* @typedef { function } WithThemeInterface
* @param { WithThemeOptions } options
* @returns { WithThemeAttribute } withThemeAttribute object
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @since 12
*/
declare type WithThemeInterface = (options: WithThemeOptions) => WithThemeAttribute;
/**
* Defines the WithTheme attribute functions..
*
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
declare class WithThemeAttribute {
}
/**
* Defines WithTheme Logic Component.
*
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
declare const WithTheme: WithThemeInterface;
/**
* Defines WithTheme Logic Component Instance.
*
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
declare const WithThemeInstance: WithThemeAttribute;
