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
 * Sets the initial state of the slidable panel.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Sets the initial state of the slidable panel.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Sets the initial state of the slidable panel.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @deprecated since 12
 */
declare enum PanelMode {
    /**
     * Minimum state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Minimum state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Minimum state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    Mini,
    /**
     * SHalf-screen-like status
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * SHalf-screen-like status
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * SHalf-screen-like status
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    Half,
    /**
     * Class Full Screen Status.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Class Full Screen Status.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Class Full Screen Status.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    Full
}
/**
 * Sets the type of sliding panel.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Sets the type of sliding panel.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Sets the type of sliding panel.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @deprecated since 12
 */
declare enum PanelType {
    /**
     * The switch between the minibar and full-screen display is provided.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The switch between the minibar and full-screen display is provided.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The switch between the minibar and full-screen display is provided.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    Minibar = 0,
    /**
     * Permanent content display class.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Permanent content display class.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Permanent content display class.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    Foldable = 1,
    /**
     * Temporary content display area.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Temporary content display area.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Temporary content display area.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    Temporary = 2,
    /**
     * Custom content display area.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Custom content display area.
     * The switchover effect is provided in three sizes: large (full-screen), medium (half-screen), and small.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    CUSTOM = 3
}
/**
 * Enum for custom content display area.
 *
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enum for custom content display area.
 *
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @deprecated since 12
 */
declare enum PanelHeight {
    /**
     * The Panel adapts to the content height.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The Panel adapts to the content height.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    WRAP_CONTENT = 'wrapContent'
}
/**
 * Provides a sliding panel interface.
 *
 * @interface PanelInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides a sliding panel interface.
 *
 * @interface PanelInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides a sliding panel interface.
 *
 * @interface PanelInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @deprecated since 12
 */
interface PanelInterface {
    /**
     * Called when the panel slidable panel pops up.
     *
     * @param { boolean } show
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the panel slidable panel pops up.
     *
     * @param { boolean } show
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the panel slidable panel pops up.
     *
     * @param { boolean } show
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    (show: boolean): PanelAttribute;
}
/**
 * @extends CommonMethod<PanelAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Pane Attribute.
 *
 * @extends CommonMethod<PanelAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Pane Attribute.
 *
 * @extends CommonMethod<PanelAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @deprecated since 12
 */
declare class PanelAttribute extends CommonMethod<PanelAttribute> {
    /**
     * Called when the initial state of the slidable panel is set.
     *
     * @param { PanelMode } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the initial state of the slidable panel is set.
     *
     * @param { PanelMode } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the initial state of the slidable panel is set.
     *
     * @param { PanelMode } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    mode(value: PanelMode): PanelAttribute;
    /**
     * Called when the slidable panel type is set.
     *
     * @param { PanelType } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the slidable panel type is set.
     *
     * @param { PanelType } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the slidable panel type is set.
     *
     * @param { PanelType } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    type(value: PanelType): PanelAttribute;
    /**
     * Called when determining whether dragbar exists.
     *
     * @param { boolean } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when determining whether dragbar exists.
     *
     * @param { boolean } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when determining whether dragbar exists.
     *
     * @param { boolean } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    dragBar(value: boolean): PanelAttribute;
    /**
     * Sets the height. It is valid only when PanelType is set to Custom.
     * @param {Dimension | PanelHeight} value - value - Content height to set.
     * @returns { PanelAttribute } Returns the component attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the height. It is valid only when PanelType is set to Custom.
     * @param {Dimension | PanelHeight} value - value - Content height to set.
     * @returns { PanelAttribute } Returns the component attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    customHeight(value: Dimension | PanelHeight): PanelAttribute;
    /**
     * Called when the height in the full state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the height in the full state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the height in the full state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    fullHeight(value: number | string): PanelAttribute;
    /**
     * Called when the height in the half state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the height in the half state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the height in the half state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    halfHeight(value: number | string): PanelAttribute;
    /**
     * Called when the height in the mini state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the height in the mini state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the height in the mini state is specified.
     *
     * @param { number | string } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    miniHeight(value: number | string): PanelAttribute;
    /**
     * Called when the panel slidable panel pops up.
     *
     * @param { boolean } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the panel slidable panel pops up.
     *
     * @param { boolean } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the panel slidable panel pops up.
     *
     * @param { boolean } value
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    show(value: boolean): PanelAttribute;
    /**
     * Called when the panel background mask is requested.
     *
     * @param { ResourceColor } color
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the panel background mask is requested.
     *
     * @param { ResourceColor } color
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the panel background mask is requested.
     *
     * @param { ResourceColor } color
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    backgroundMask(color: ResourceColor): PanelAttribute;
    /**
     * Called when the panel show close icon.
     *
     * @param { boolean } value - used to set whether to display the close icon.
     * @returns { PanelAttribute } return the component attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Called when the panel show close icon.
     *
     * @param { boolean } value - used to set whether to display the close icon.
     * @returns { PanelAttribute } return the component attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    showCloseIcon(value: boolean): PanelAttribute;
    /**
     * Called when the state of the slidable panel changes.
     *
     * @param { function } event
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the state of the slidable panel changes.
     *
     * @param { function } event
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the state of the slidable panel changes.
     *
     * @param { function } event
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    onChange(event: (
    /**
     * Width of content area.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Width of content area.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    width: number, 
    /**
     * Height of content area.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Height of content area.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    height: number, 
    /**
     * Initial state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Initial state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    mode: PanelMode) => void): PanelAttribute;
    /**
     * Called when height of the panel is changed
     *
     * @param { function } callback
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when height of the panel is changed
     *
     * @param { function } callback
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when height of the panel is changed
     *
     * @param { function } callback
     * @returns { PanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     */
    onHeightChange(callback: (value: number) => void): PanelAttribute;
}
/**
 * Defines Panel Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Panel Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Panel Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @deprecated since 12
 * @useinstead bindSheet
 */
declare const Panel: PanelInterface;
/**
 * Defines Panel Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Panel Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Panel Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @deprecated since 12
 */
declare const PanelInstance: PanelAttribute;
