/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
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
 * Defines the popup text options
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface PopupTextOptions {
    /**
     * Set the text display content.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    text: ResourceStr;
    /**
     * Set the text font size.
     * @type { ?(number | string | Resource) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontSize?: number | string | Resource;
    /**
     * Set the text font color.
     * @type { ?ResourceColor }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontColor?: ResourceColor;
    /**
     * Set the text font weight.
     * @type { ?(number | FontWeight | string) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontWeight?: number | FontWeight | string;
}
/**
 * Defines the popup button options
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface PopupButtonOptions {
    /**
     * Set the button display content.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    text: ResourceStr;
    /**
     * Set the button callback.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    action?: () => void;
    /**
     * Set the button font size.
     * @type { ?(number | string | Resource) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontSize?: number | string | Resource;
    /**
     * Set the button font color.
     * @type { ?ResourceColor }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fontColor?: ResourceColor;
}
/**
 * Defines the popup icon options
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface PopupIconOptions {
    /**
     * Set the icon image.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    image: ResourceStr;
    /**
     * Set the icon width.
     * @type { ?Dimension }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    width?: Dimension;
    /**
     * Set the icon height.
     * @type { ?Dimension }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    height?: Dimension;
    /**
     * Set the icon fill color.
     * @type { ?ResourceColor }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    fillColor?: ResourceColor;
    /**
     * Set the icon border radius.
     * @type { ?(Length | BorderRadiuses) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    borderRadius?: Length | BorderRadiuses;
}
/**
 * Defines the popup options.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface PopupOptions {
    /**
     * The icon of Popup.
     *
     * @type { ?PopupIconOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    icon?: PopupIconOptions;
    /**
     * The title of Popup.
     *
     * @type { ?PopupTextOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    title?: PopupTextOptions;
    /**
     * The message of Popup.
     *
     * @type { PopupTextOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    message: PopupTextOptions;
    /**
     * The show close of Popup.
     *
     * @type { ?(boolean | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    showClose?: boolean | Resource;
    /**
     * The close button callback of Popup.
     *
     * @type { ?() => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onClose?: () => void;
    /**
     * The buttons of Popup.
     *
     * @type { ?[PopupButtonOptions?, PopupButtonOptions?] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    buttons?: [
        PopupButtonOptions?,
        PopupButtonOptions?
    ];
}
/**
 * Build function of popup.
 *
 * @param { PopupOptions } options - popup option.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
@Builder
export declare function Popup(options: PopupOptions): void;
