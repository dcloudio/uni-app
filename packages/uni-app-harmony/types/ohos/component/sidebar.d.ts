/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * Sets the sidebar style of showing
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Sets the sidebar style of showing
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Sets the sidebar style of showing
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum SideBarContainerType {
    /**
     * The sidebar invisible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The sidebar invisible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The sidebar invisible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Embed,
    /**
     * The sidebar visible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The sidebar visible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The sidebar visible
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Overlay,
    /**
     * The sidebar AUTO
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The sidebar AUTO
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    AUTO
}
/**
 * Sets the sidebar position of showing
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Sets the sidebar position of showing
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Sets the sidebar position of showing
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum SideBarPosition {
    /**
     * The sidebar is on the Start of the container
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The sidebar is on the Start of the container
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The sidebar is on the Start of the container
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Start,
    /**
     * The sidebar is on the End of the container
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * The sidebar is on the End of the container
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The sidebar is on the End of the container
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    End
}
/**
 * Sets the control button style
 *
 * @interface ButtonStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Sets the control button style
 *
 * @interface ButtonStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Sets the control button style
 *
 * @interface ButtonStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface ButtonStyle {
    /**
     * Set the left of control button
     * default value is 16vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the left of control button
     * default value is 16vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the left of control button
     * default value is 16vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    left?: number;
    /**
     * Set the top of control button
     * default value is 48vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the top of control button
     * default value is 48vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the top of control button
     * default value is 48vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    top?: number;
    /**
     * Set the width of control button
     * default value is 32vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the width of control button
     * default value is 24vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the width of control button
     * default value is 24vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    width?: number;
    /**
     * Set the height of control button
     * default value is 32vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the height of control button
     * default value is 24vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the height of control button
     * default value is 24vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    height?: number;
    /**
     * Set the button icon when sidebar status has changed
     *
     * @type { ?({shown: string | PixelMap | Resource;
     * hidden: string | PixelMap | Resource;
     * switching?: string | PixelMap | Resource;}) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the button icon when sidebar status has changed
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the button icon when sidebar status has changed
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    icons?: {
        shown: string | PixelMap | Resource;
        hidden: string | PixelMap | Resource;
        switching?: string | PixelMap | Resource;
    };
}
/**
 * The construct function of sidebar
 *
 * @interface SideBarContainerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The construct function of sidebar
 *
 * @interface SideBarContainerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The construct function of sidebar
 *
 * @interface SideBarContainerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface SideBarContainerInterface {
    /**
     * Called when showing the sidebar of a block entry.
     *
     * @param { SideBarContainerType } type
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when showing the sidebar of a block entry.
     *
     * @param { SideBarContainerType } type
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when showing the sidebar of a block entry.
     *
     * @param { SideBarContainerType } type
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (type?: SideBarContainerType): SideBarContainerAttribute;
}
/**
 * Provides an interface for the style of a divider including stroke width, color, start margin
 * and end margin
 *
 * @interface DividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the style of a divider including stroke width, color, start margin
 * and end margin
 *
 * @interface DividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface DividerStyle {
    /**
     * Define the stroke width of the divider
     *
     * @type { Length }
     * @default 1vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the stroke width of the divider
     *
     * @type { Length }
     * @default 1vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    strokeWidth: Length;
    /**
     * Define the color of the divider
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the color of the divider
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    color?: ResourceColor;
    /**
     * Define the start margin of the divider
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the start margin of the divider
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    startMargin?: Length;
    /**
     * Define the end margin of the divider
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the end margin of the divider
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    endMargin?: Length;
}
/**
 * The attribute function of sidebar
 *
 * @extends CommonMethod<SideBarContainerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The attribute function of sidebar
 *
 * @extends CommonMethod<SideBarContainerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The attribute function of sidebar
 *
 * @extends CommonMethod<SideBarContainerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class SideBarContainerAttribute extends CommonMethod<SideBarContainerAttribute> {
    /**
     * Callback showControlButton function when setting the status of sidebar
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Callback showControlButton function when setting the status of sidebar
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Callback showControlButton function when setting the status of sidebar
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showSideBar(value: boolean): SideBarContainerAttribute;
    /**
     * Callback controlButton function when setting the style of button
     *
     * @param { ButtonStyle } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Callback controlButton function when setting the style of button
     *
     * @param { ButtonStyle } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Callback controlButton function when setting the style of button
     *
     * @param { ButtonStyle } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    controlButton(value: ButtonStyle): SideBarContainerAttribute;
    /**
     * Callback showControlButton function when setting the status of button
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Callback showControlButton function when setting the status of button
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Callback showControlButton function when setting the status of button
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showControlButton(value: boolean): SideBarContainerAttribute;
    /**
     * Trigger callback when sidebar style of showing change finished.
     *
     * @param { function } callback
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Trigger callback when sidebar style of showing change finished.
     *
     * @param { function } callback
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Trigger callback when sidebar style of showing change finished.
     *
     * @param { function } callback
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onChange(callback: (value: boolean) => void): SideBarContainerAttribute;
    /**
     * Sets the length of sidebar.
     * default value is 200vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the length of sidebar.
     * default value is 240vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the length of sidebar.
     * default value is 240vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    sideBarWidth(value: number): SideBarContainerAttribute;
    /**
     * Sets the min length of sidebar.
     * default value is 200vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the min length of sidebar.
     * default value is 240vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the min length of sidebar.
     * default value is 240vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    minSideBarWidth(value: number): SideBarContainerAttribute;
    /**
     * Sets the max length of sidebar.
     * default value is 280vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the max length of sidebar.
     * default value is 280vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the max length of sidebar.
     * default value is 280vp.
     *
     * @param { number } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxSideBarWidth(value: number): SideBarContainerAttribute;
    /**
     * Sets the length of sidebar.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Sets the length of sidebar.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the length of sidebar.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    sideBarWidth(value: Length): SideBarContainerAttribute;
    /**
     * Sets the min length of sidebar.
     * default value is 200vp.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Sets the min length of sidebar.
     * default value is 200vp.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the min length of sidebar.
     * default value is 200vp.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    minSideBarWidth(value: Length): SideBarContainerAttribute;
    /**
     * Sets the max length of sidebar.
     * default value is 280vp.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Sets the max length of sidebar.
     * default value is 280vp.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the max length of sidebar.
     * default value is 280vp.
     *
     * @param { Length } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxSideBarWidth(value: Length): SideBarContainerAttribute;
    /**
     * Sets whether to automatically hide when drag sidebar width is less than the minimum width.
     * default value is true.
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Sets whether to automatically hide when drag sidebar width is less than the minimum width.
     * default value is true.
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets whether to automatically hide when drag sidebar width is less than the minimum width.
     * default value is true.
     *
     * @param { boolean } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    autoHide(value: boolean): SideBarContainerAttribute;
    /**
     * Called when determining the location of the sidebar.
     * default value is Start.
     *
     * @param { SideBarPosition } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when determining the location of the sidebar.
     * default value is Start.
     *
     * @param { SideBarPosition } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when determining the location of the sidebar.
     * default value is Start.
     *
     * @param { SideBarPosition } value
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    sideBarPosition(value: SideBarPosition): SideBarContainerAttribute;
    /**
     * Set divider style for sideBarContainer
     *
     * @param { DividerStyle | null } value - indicates the style of the divider or whether to show the divider.
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set divider style for sideBarContainer
     *
     * @param { DividerStyle | null } value - indicates the style of the divider or whether to show the divider.
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    divider(value: DividerStyle | null): SideBarContainerAttribute;
    /**
     * Sets the min length of content.
     * default value is 360vp.
     *
     * @param { Dimension } value - min length of content.
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the min length of content.
     * default value is 360vp.
     *
     * @param { Dimension } value - min length of content.
     * @returns { SideBarContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    minContentWidth(value: Dimension): SideBarContainerAttribute;
}
/**
 * Defines SideBarContainer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines SideBarContainer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines SideBarContainer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const SideBarContainer: SideBarContainerInterface;
/**
 * Defines SideBarContainer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines SideBarContainer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines SideBarContainer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const SideBarContainerInstance: SideBarContainerAttribute;
