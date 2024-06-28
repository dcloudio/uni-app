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
 * Declare the type of status button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Declare the type of status button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Declare the type of status button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Declare the type of status button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum ToggleType {
    /**
     * Checkbox
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Checkbox
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Checkbox
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Checkbox
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Checkbox,
    /**
     * Switch
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Switch
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Switch
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Switch
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Switch,
    /**
     * Button
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Button
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Button
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Button
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Button
}
/**
 * Defines the switch style.
 *
 * @interface SwitchStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface SwitchStyle {
    /**
     * Set the radius of the point of the switch.
     *
     * @type { ?(number | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    pointRadius?: number | Resource;
    /**
     * Set the color of the unselected switch.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    unselectedColor?: ResourceColor;
    /**
     * Set the color of the point of the switch.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    pointColor?: ResourceColor;
    /**
     * Set the border radius of the track of the switch.
     *
     * @type { ?(number | Resource) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    trackBorderRadius?: number | Resource;
}
/**
 * ToggleConfiguration used by toggle Modifier
 *
 * @interface ToggleConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ToggleConfiguration extends CommonConfiguration<ToggleConfiguration> {
    /**
     * Indicates whether the Toggle is on.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    isOn: boolean;
    /**
     * Indicates whether the Toggle is enabled.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    enabled: boolean;
    /**
     * Trigger toggle select change
     *
     * @type { Callback<boolean> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    triggerChange: Callback<boolean>;
}
/**
 * Defines the toggle interface.
 *
 * @interface ToggleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the toggle interface.
 *
 * @interface ToggleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the toggle interface.
 *
 * @interface ToggleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the toggle interface.
 *
 * @interface ToggleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface ToggleInterface {
    /**
     * Set parameters to obtain the toggle.
     *
     * @param { object } options
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set parameters to obtain the toggle.
     *
     * @param { object } options
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set parameters to obtain the toggle.
     *
     * @param { object } options
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set parameters to obtain the toggle.
     *
     * @param { object } options
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (options: {
        type: ToggleType;
        isOn?: boolean;
    }): ToggleAttribute;
}
/**
 * Defines the toggle attribute functions
 *
 * @extends CommonMethod<ToggleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the toggle attribute functions
 *
 * @extends CommonMethod<ToggleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the toggle attribute functions
 *
 * @extends CommonMethod<ToggleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the toggle attribute functions
 *
 * @extends CommonMethod<ToggleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class ToggleAttribute extends CommonMethod<ToggleAttribute> {
    /**
     * Called when the selected state of the component changes.
     *
     * @param { function } callback
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the selected state of the component changes.
     *
     * @param { function } callback
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the selected state of the component changes.
     *
     * @param { function } callback
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the selected state of the component changes.
     *
     * @param { function } callback
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onChange(callback: (isOn: boolean) => void): ToggleAttribute;
    /**
     * Set the content modifier of toggle.
     *
     * @param { ContentModifier<ToggleConfiguration> } modifier - The content modifier of toggle.
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentModifier(modifier: ContentModifier<ToggleConfiguration>): ToggleAttribute;
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } value
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } value
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } value
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } value
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    selectedColor(value: ResourceColor): ToggleAttribute;
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } color
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } color
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } color
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the color of the selected button is set.
     *
     * @param { ResourceColor } color
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    switchPointColor(color: ResourceColor): ToggleAttribute;
    /**
     * Set the style of the switch.
     *
     * @param { SwitchStyle } value
     * @returns { ToggleAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    switchStyle(value: SwitchStyle): ToggleAttribute;
}
/**
 * Defines Toggle Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Toggle Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Toggle Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Toggle Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Toggle: ToggleInterface;
/**
 * Defines Toggle Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Toggle Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Toggle Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Toggle Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const ToggleInstance: ToggleAttribute;
