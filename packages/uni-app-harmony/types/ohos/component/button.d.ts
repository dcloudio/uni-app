/*
 * Copyright (c) 2021-2024 Huawei Device Co., Ltd.
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
 * Provides a button component.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides a button component.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Provides a button component.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides a button component.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum ButtonType {
    /**
     * Capsule button (rounded corners default to half the height).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Capsule button (rounded corners default to half the height).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Capsule button (rounded corners default to half the height).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Capsule button (rounded corners default to half the height).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Capsule,
    /**
     * Round buttons.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Round buttons.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Round buttons.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Round buttons.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Circle,
    /**
     * Common button (no rounded corners by default).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Common button (no rounded corners by default).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Common button (no rounded corners by default).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Common button (no rounded corners by default).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Normal
}
/**
 * Enum for button style type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 * @form
 */
/**
 * Enum for button style type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 * @form
 */
declare enum ButtonStyleMode {
    /**
     * Normal button (with normal background color).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Normal button (with normal background color).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    NORMAL = 0,
    /**
     * Emphasized button (with emphasized background color).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Emphasized button (with emphasized background color).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    EMPHASIZED = 1,
    /**
     * Textual button (with none background color).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Textual button (with none background color).
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    TEXTUAL = 2
}
/**
 * Enum for button role.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 12
 */
declare enum ButtonRole {
    /**
     * Normal button.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    NORMAL = 0,
    /**
     * Error button.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    ERROR = 1
}
/**
 * Defines the callback type used in ButtonConfiguration.
 *
 * @typedef {function} ButtonTriggerClickCallback
 * @param { number } xPos - The value of xPos is x coordinate.
 * @param { number } yPos - The value of yPos is y coordinate.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare type ButtonTriggerClickCallback = (xPos: number, yPos: number) => void;
/**
 * ButtonConfiguration used by button content modifier.
 *
 * @interface ButtonConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ButtonConfiguration extends CommonConfiguration<ButtonConfiguration> {
    /**
     * Button with inner text label.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    label: string;
    /**
     * Indicates whether the button is pressed.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    pressed: boolean;
    /**
     * Trigger button click x coordinate and y coordinate.
     *
     * @type { ButtonTriggerClickCallback }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    triggerClick: ButtonTriggerClickCallback;
}
/**
 * Enum for Control Size.
 *
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 * @form
 */
/**
 * Enum for Control Size.
 *
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 * @form
 */
declare enum ControlSize {
    /**
     * The component size is small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * The component size is small.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    SMALL = 'small',
    /**
     * The component size is normal.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * The component size is normal.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    NORMAL = 'normal'
}
/**
 * Defines the button options.
 *
 * @interface ButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the button options.
 *
 * @interface ButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the button options.
 *
 * @interface ButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the button options.
 *
 * @interface ButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface ButtonOptions {
    /**
     * Describes the button style.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Describes the button style.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Describes the button style.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Describes the button style.
     *
     * @type { ?ButtonType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    type?: ButtonType;
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    stateEffect?: boolean;
    /**
     * Describes the button style.
     *
     * @type { ?ButtonStyleMode }
     * @default ButtonStyleMode.EMPHASIZED
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Describes the button style.
     *
     * @type { ?ButtonStyleMode }
     * @default ButtonStyleMode.EMPHASIZED
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    buttonStyle?: ButtonStyleMode;
    /**
     * Describes the button size.
     *
     * @type { ?ControlSize }
     * @default ControlSize.NORMAL
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Describes the button size.
     *
     * @type { ?ControlSize }
     * @default ControlSize.NORMAL
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    controlSize?: ControlSize;
    /**
     * Describes the button role.
     *
     * @type { ?ButtonRole }
     * @default ButtonRole.NORMAL
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    role?: ButtonRole;
}
/**
 * Defines the Button Component.
 *
 * @interface ButtonInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the Button Component.
 *
 * @interface ButtonInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the Button Component.
 *
 * @interface ButtonInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the Button Component.
 *
 * @interface ButtonInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface ButtonInterface {
    /**
     * Button object
     *
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Button object
     *
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Button object
     *
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Button object
     *
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (): ButtonAttribute;
    /**
     * Create Button with Text child.
     *
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Create Button with Text child.
     *
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create Button with Text child.
     *
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create Button with Text child.
     *
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (options: ButtonOptions): ButtonAttribute;
    /**
     * Create Button with inner text label.
     *
     * @param { ResourceStr } label
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Create Button with inner text label.
     *
     * @param { ResourceStr } label
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create Button with inner text label.
     *
     * @param { ResourceStr } label
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create Button with inner text label.
     *
     * @param { ResourceStr } label
     * @param { ButtonOptions } options
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (label: ResourceStr, options?: ButtonOptions): ButtonAttribute;
}
/**
 * LabelStyle object.
 *
 * @interface LabelStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * LabelStyle object.
 *
 * @interface LabelStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface LabelStyle {
    /**
     * overflow mode.
     *
     * @type { ?TextOverflow }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * overflow mode.
     *
     * @type { ?TextOverflow }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    overflow?: TextOverflow;
    /**
     * Label max lines.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Label max lines.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxLines?: number;
    /**
     * Min font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Min font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    minFontSize?: number | ResourceStr;
    /**
     * Max font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Max font size for adapted height.
     *
     * @type { ?(number | ResourceStr) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxFontSize?: number | ResourceStr;
    /**
     * Adapt text height option.
     *
     * @type { ?TextHeightAdaptivePolicy }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Adapt text height option.
     *
     * @type { ?TextHeightAdaptivePolicy }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    heightAdaptivePolicy?: TextHeightAdaptivePolicy;
    /**
     * Font style.
     *
     * @type { ?Font }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Font style.
     *
     * @type { ?Font }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    font?: Font;
}
/**
 * Defines the button attribute functions.
 *
 * @extends CommonMethod<ButtonAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the button attribute functions.
 *
 * @extends CommonMethod<ButtonAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the button attribute functions.
 *
 * @extends CommonMethod<ButtonAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the button attribute functions.
 *
 * @extends CommonMethod<ButtonAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class ButtonAttribute extends CommonMethod<ButtonAttribute> {
    /**
     * Describes the button style.
     *
     * @param { ButtonType } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Describes the button style.
     *
     * @param { ButtonType } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Describes the button style.
     *
     * @param { ButtonType } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Describes the button style.
     *
     * @param { ButtonType } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    type(value: ButtonType): ButtonAttribute;
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @param { boolean } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @param { boolean } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @param { boolean } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
     *
     * @param { boolean } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    stateEffect(value: boolean): ButtonAttribute;
    /**
     * Describes the button style.
     *
     * @param { ButtonStyleMode } value - button style mode
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Describes the button style.
     *
     * @param { ButtonStyleMode } value - button style mode
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    buttonStyle(value: ButtonStyleMode): ButtonAttribute;
    /**
     * Set the Button size.
     *
     * @param { ControlSize } value - control size
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Set the Button size.
     *
     * @param { ControlSize } value - control size
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    controlSize(value: ControlSize): ButtonAttribute;
    /**
     * Set the Button role.
     *
     * @param { ButtonRole } value - button role
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    role(value: ButtonRole): ButtonAttribute;
    /**
     * Text color.
     *
     * @param { ResourceColor } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Text color.
     *
     * @param { ResourceColor } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text color.
     *
     * @param { ResourceColor } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text color.
     *
     * @param { ResourceColor } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fontColor(value: ResourceColor): ButtonAttribute;
    /**
     * Text size.
     *
     * @param { Length } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Text size.
     *
     * @param { Length } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text size.
     *
     * @param { Length } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text size.
     *
     * @param { Length } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fontSize(value: Length): ButtonAttribute;
    /**
     * Font weight.
     *
     * @param { number | FontWeight | string } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Font weight.
     *
     * @param { number | FontWeight | string } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Font weight.
     *
     * @param { number | FontWeight | string } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Font weight.
     *
     * @param { number | FontWeight | string } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fontWeight(value: number | FontWeight | string): ButtonAttribute;
    /**
     * Font style.
     *
     * @param { FontStyle } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Font style.
     *
     * @param { FontStyle } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Font style.
     *
     * @param { FontStyle } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Font style.
     *
     * @param { FontStyle } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fontStyle(value: FontStyle): ButtonAttribute;
    /**
     * Font family.
     *
     * @param { string | Resource } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Font family.
     *
     * @param { string | Resource } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Font family.
     *
     * @param { string | Resource } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Font family.
     *
     * @param { string | Resource } value
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fontFamily(value: string | Resource): ButtonAttribute;
    /**
     * Set the content modifier of button.
     *
     * @param { ContentModifier<ButtonConfiguration> } modifier - The content modifier of button.
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentModifier(modifier: ContentModifier<ButtonConfiguration>): ButtonAttribute;
    /**
     * Set button label style.
     *
     * @param { LabelStyle } value - The label style configuration on button.
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set button label style.
     *
     * @param { LabelStyle } value - The label style configuration on button.
     * @returns { ButtonAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    labelStyle(value: LabelStyle): ButtonAttribute;
}
/**
 * Defines Button Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Button Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Button Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Button Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Button: ButtonInterface;
/**
 * Defines Button Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Button Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Button Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Button Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const ButtonInstance: ButtonAttribute;
