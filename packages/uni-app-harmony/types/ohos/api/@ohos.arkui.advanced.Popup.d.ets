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
/**
 * Defines the popup text options
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface PopupTextOptions {
    /**
     * Set the text display content.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the text display content.
    * @type { ResourceStr }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    text: ResourceStr;
    /**
     * Set the text font size.
     * @type { ?(number | string | Resource) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the text font size.
    * @type { ?(number | string | Resource) }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontSize?: number | string | Resource;
    /**
     * Set the text font color.
     * @type { ?ResourceColor }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the text font color.
    * @type { ?ResourceColor }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontColor?: ResourceColor;
    /**
     * Set the text font weight.
     * @type { ?(number | FontWeight | string) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the text font weight.
    * @type { ?(number | FontWeight | string) }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontWeight?: number | FontWeight | string;
}
/**
 * Defines the popup button options
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines the popup button options
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface PopupButtonOptions {
    /**
     * Set the button display content.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the button display content.
    * @type { ResourceStr }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    text: ResourceStr;
    /**
     * Set the button callback.
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the button callback.
    * @type { ?function }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    action?: () => void;
    /**
     * Set the button font size.
     * @type { ?(number | string | Resource) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the button font size.
    * @type { ?(number | string | Resource) }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontSize?: number | string | Resource;
    /**
     * Set the button font color.
     * @type { ?ResourceColor }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the button font color.
    * @type { ?ResourceColor }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fontColor?: ResourceColor;
}
/**
 * Defines the popup icon options
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines the popup icon options
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
export interface PopupIconOptions {
    /**
     * Set the icon image.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the icon image.
    * @type { ResourceStr }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    image: ResourceStr;
    /**
     * Set the icon width.
     * @type { ?Dimension }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the icon width.
    * @type { ?Dimension }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    width?: Dimension;
    /**
     * Set the icon height.
     * @type { ?Dimension }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the icon height.
    * @type { ?Dimension }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    height?: Dimension;
    /**
     * Set the icon fill color.
     * @type { ?ResourceColor }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the icon fill color.
    * @type { ?ResourceColor }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    fillColor?: ResourceColor;
    /**
     * Set the icon border radius.
     * @type { ?(Length | BorderRadiuses) }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
    * Set the icon border radius.
    * @type { ?(Length | BorderRadiuses) }.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    borderRadius?: Length | BorderRadiuses;
}
/**
 * Defines the popup options.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Defines the popup options.
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
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
    /**
    * The icon of Popup.
    *
    * @type { ?PopupIconOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
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
    /**
    * The title of Popup.
    *
    * @type { ?PopupTextOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
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
    /**
    * The message of Popup.
    *
    * @type { PopupTextOptions }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
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
    /**
    * The show close of Popup.
    *
    * @type { ?(boolean | Resource) }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
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
    /**
    * The close button callback of Popup.
    *
    * @type { ?() => void }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
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
    /**
    * The buttons of Popup.
    *
    * @type { ?[PopupButtonOptions?, PopupButtonOptions?] }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12
    */
    buttons?: [
        PopupButtonOptions?,
        PopupButtonOptions?
    ];
    /**
     * Indicates the attribute of the current popup direction.
     *
     * @type { ?Direction }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    direction?: Direction;
}
/**
 * Build function of popup.
 *
 * @param { PopupOptions } options - popup option.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
* Build function of popup.
*
* @param { PopupOptions } options - popup option.
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12
*/
@Builder
export declare function Popup(options: PopupOptions): void;
