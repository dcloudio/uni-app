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
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum BadgePosition {
    /**
     * The dot is displayed vertically centered on the right.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The dot is displayed vertically centered on the right.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The dot is displayed vertically centered on the right.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The dot is displayed vertically centered on the right.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    RightTop,
    /**
     * Dots are displayed in the upper right corner.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Dots are displayed in the upper right corner.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Dots are displayed in the upper right corner.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Dots are displayed in the upper right corner.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Right,
    /**
     * The dot is displayed in the left vertical center.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The dot is displayed in the left vertical center.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The dot is displayed in the left vertical center.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The dot is displayed in the left vertical center.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Left
}
/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface BadgeStyle {
    /**
     * Text Color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Text Color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text Color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text Color
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    color?: ResourceColor;
    /**
     * Text size.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Text size.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text size.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text size.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fontSize?: number | string;
    /**
     * Size of a badge.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Size of a badge.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Size of a badge.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Size of a badge.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    badgeSize?: number | string;
    /**
     * Color of the badge.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Color of the badge.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Color of the badge.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Color of the badge.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    badgeColor?: ResourceColor;
    /**
     * Define the border color of the badge.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the border color of the badge.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    borderColor?: ResourceColor;
    /**
     * Define the border width of the badge.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the border width of the badge.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    borderWidth?: Length;
    /**
     * Define the font weight of the badge.
     *
     * @type { ?(number | FontWeight | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the font weight of the badge.
     *
     * @type { ?(number | FontWeight | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontWeight?: number | FontWeight | string;
}
/**
 * Defines the base param of badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the base param of badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the base param of badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the base param of badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface BadgeParam {
    /**
     * Set the display position of the prompt point.
     *
     * @type { ?(BadgePosition) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set the display position of the prompt point.
     *
     * @type { ?(BadgePosition) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set the display position of the prompt point.
     *
     * @type { ?(BadgePosition | Position) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the display position of the prompt point.
     *
     * @type { ?(BadgePosition | Position) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    position?: BadgePosition | Position;
    /**
     * Defines the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @type { BadgeStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Defines the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @type { BadgeStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Defines the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @type { BadgeStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Defines the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @type { BadgeStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    style: BadgeStyle;
}
/**
 * Defines the badge param with count and maxCount.
 *
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the badge param with count and maxCount.
 *
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the badge param with count and maxCount.
 *
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the badge param with count and maxCount.
 *
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface BadgeParamWithNumber extends BadgeParam {
    /**
     * Set the number of reminder messages.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set the number of reminder messages.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set the number of reminder messages.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the number of reminder messages.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    count: number;
    /**
     * Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    maxCount?: number;
}
/**
 * Defines the badge param with string value.
 *
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the badge param with string value.
 *
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the badge param with string value.
 *
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the badge param with string value.
 *
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface BadgeParamWithString extends BadgeParam {
    /**
     * Text string of the prompt content.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Text string of the prompt content.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text string of the prompt content.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text string of the prompt content.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    value: string;
}
/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface BadgeInterface {
    /**
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * count: Set the number of reminder messages.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithNumber } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * count: Set the number of reminder messages.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithNumber } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * count: Set the number of reminder messages.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithNumber } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * count: Set the number of reminder messages.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithNumber } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (value: BadgeParamWithNumber): BadgeAttribute;
    /**
     * value: Text string of the prompt content.
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithString } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * value: Text string of the prompt content.
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithString } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * value: Text string of the prompt content.
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithString } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * value: Text string of the prompt content.
     * position: Set the display position of the prompt point.
     * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
     * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
     *
     * @param { BadgeParamWithString } value
     * @returns { BadgeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (value: BadgeParamWithString): BadgeAttribute;
}
/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class BadgeAttribute extends CommonMethod<BadgeAttribute> {
}
/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Badge: BadgeInterface;
/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const BadgeInstance: BadgeAttribute;
