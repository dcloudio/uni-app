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
/**
 * Enum for the counter type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare enum CounterType {
    /**
     * List counter.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    LIST = 0,
    /**
     * Compact counter.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    COMPACT = 1,
    /**
     * Inline counter.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    INLINE = 2,
    /**
     * Date inline counter.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    INLINE_DATE = 3
}
/**
 * Defines the common options.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare class CommonOptions {
    /**
     * Set the focusable of the counter component.
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    focusable?: boolean;
    /**
     * Set the step of the couter component, ranges greater than or equal to 1
     *
     * @type { ?number }
     * @default 1
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    step?: number;
    /**
     * Trigger a mouse hover event at the increased button.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onHoverIncrease?: (isHover: boolean) => void;
    /**
     * Trigger a mouse hover event at the decreased button.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onHoverDecrease?: (isHover: boolean) => void;
}
/**
 * Defines the inline style options.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare class InlineStyleOptions extends CommonOptions {
    /**
     * Set initial value of the counter component, ranges from min to max.
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    value?: number;
    /**
     * Set minimum value of the counter component
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    min?: number;
    /**
     * Set maximum value of the counter component
     *
     * @type { ?number }
     * @default 999
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    max?: number;
    /**
     * Set text width  of the counter component,  ranges greater than or equal to 0
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    textWidth?: number;
    /**
     * Trigger a event when the value of the counter has been changed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onChange?: (value: number) => void;
}
/**
 * Defines the number style options.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare class NumberStyleOptions extends InlineStyleOptions {
    /**
     * Set the label of the counter component.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    label?: ResourceStr;
    /**
     * Trigger a event when the increased button got focus.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onFocusIncrease?: () => void;
    /**
     * Trigger a event when the decreased button got focus.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onFocusDecrease?: () => void;
    /**
     * Trigger a event when the increased button lose focus.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onBlurIncrease?: () => void;
    /**
     * Trigger a event when the decreased button lose focus.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onBlurDecrease?: () => void;
}
/**
 * Defines the date data.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare class DateData {
    /**
     * The year of the DateData, ranges from 1 to 5000.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    year: number;
    /**
     * The month of the DateData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    month: number;
    /**
     * The day of the DateData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    day: number;
    /**
     * Constructor of the DateData.
     *
     * @param { number } year - set the year of the DateData.
     * @param { number } month - set the month of the DateData.
     * @param { number } day - set the day of the DateData.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    constructor(year: number, month: number, day: number);
    /**
     * Convert the date data to string.
     *
     * @returns { string } date data in string form.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    toString(): string;
}
/**
 * Defines the date style options.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare class DateStyleOptions extends CommonOptions {
    /**
     * Set the year of the counter component, ranges from 1 to 5000.
     *
     * @type { ?number }
     * @default 1
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    year?: number;
    /**
     * Set the month of the counter component.
     *
     * @type { ?number }
     * @default 1
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    month?: number;
    /**
     * Set the day of the counter component.
     *
     * @type { ?number }
     * @default 1
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    day?: number;
    /**
     * Trigger a event when the date of the counter has been changed.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onDateChange?: (date: DateData) => void;
}
/**
 * Defines the counter options.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
declare class CounterOptions {
    /**
     * Set the type of the counter component.
     *
     * @type { CounterType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    type: CounterType;
    /**
     * Set the counter attribute of the LIST or COMPACT counter component.
     *
     * @type { ?NumberStyleOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    numberOptions?: NumberStyleOptions;
    /**
     * Set the counter attribute of the INLINE counter component.
     *
     * @type { ?InlineStyleOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    inlineOptions?: InlineStyleOptions;
    /**
     * Set the counter attribute of the INLINE_DATE counter component.
     *
     * @type { ?DateStyleOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    dateOptions?: DateStyleOptions;
}
/**
 * Defines Counter Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
@Component
declare struct CounterComponent {
    /**
     * The options of a counter component.
     *
     * @type { CounterOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    @Prop
    options: CounterOptions;
}
export { CounterComponent, CounterOptions, DateData, CounterType };
