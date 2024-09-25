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
 * Defines the Gauge component.
 *
 * @interface GaugeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the Gauge component.
 *
 * @interface GaugeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the Gauge component.
 *
 * @interface GaugeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the Gauge component.
 *
 * @interface GaugeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface GaugeInterface {
    /**
     * value:Current data value.
     * min: Current Segment Minimum Value
     * max: Current Segment Maximum Value
     *
     * @param { object } options
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * value:Current data value.
     * min: Current Segment Minimum Value
     * max: Current Segment Maximum Value
     *
     * @param { object } options
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * value:Current data value.
     * min: Current Segment Minimum Value
     * max: Current Segment Maximum Value
     *
     * @param { object } options
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * value:Current data value.
     * min: Current Segment Minimum Value
     * max: Current Segment Maximum Value
     *
     * @param { object } options
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (options: {
        value: number;
        min?: number;
        max?: number;
    }): GaugeAttribute;
}
/**
 * Defines the options of gauge track shadow.
 *
 * @interface GaugeShadowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines the options of gauge track shadow.
 *
 * @interface GaugeShadowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface GaugeShadowOptions extends MultiShadowOptions {
}
/**
 * Defines the options of gauge indicator.
 *
 * @interface GaugeIndicatorOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines the options of gauge indicator.
 *
 * @interface GaugeIndicatorOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface GaugeIndicatorOptions {
    /**
     * Current indicator icon path.
     *
     * @type { ?ResourceStr } option type - the current option type.
     * @default system style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Current indicator icon path.
     *
     * @type { ?ResourceStr } option type - the current option type.
     * @default system style.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    icon?: ResourceStr;
    /**
     * Current indicator space.
     *
     * @type { ?Dimension } indicator space - the current indicator space.
     * @default 8
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Current indicator space.
     *
     * @type { ?Dimension } indicator space - the current indicator space.
     * @default 8
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    space?: Dimension;
}
/**
 * GaugeConfiguration used by content modifier
 *
 * @interface GaugeConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface GaugeConfiguration extends CommonConfiguration<GaugeConfiguration> {
    /**
     * Current data value.
     *
     * @type { number } data value - the current data value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    value: number;
    /**
     * Current Segment Minimum Value.
     *
     * @type { number } segment minimum value - the current segment minimum value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    min: number;
    /**
     * Current Segment Maximum Value.
     *
     * @type { number } segment maximum value - the current segment maximum value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    max: number;
}
/**
 * @extends CommonMethod<GaugeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * @extends CommonMethod<GaugeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @extends CommonMethod<GaugeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @extends CommonMethod<GaugeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class GaugeAttribute extends CommonMethod<GaugeAttribute> {
    /**
     * Sets the value for the current profile.
     *
     * @param { number } value
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the value for the current profile.
     *
     * @param { number } value
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the value for the current profile.
     *
     * @param { number } value
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the value for the current profile.
     *
     * @param { number } value
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    value(value: number): GaugeAttribute;
    /**
     * Set the start angle. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the start angle. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set the start angle. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the start angle. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    startAngle(angle: number): GaugeAttribute;
    /**
     * Sets the end angle position. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the end angle position. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the end angle position. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the end angle position. Clock 0 is 0 degrees and clockwise is positive.
     *
     * @param { number } angle
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    endAngle(angle: number): GaugeAttribute;
    /**
     * Set the color of the chart. You can set the solid color and segmented gradient color.
     *
     * @param { Array<any> } colors
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set the color of the chart. You can set the solid color and segmented gradient color.
     *
     * @param { Array<any> } colors
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set the color of the chart. You can set the solid color and segmented gradient color.
     *
     * @param { Array<[ResourceColor, number]> } colors - section colors of gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the color of the chart. You can set the solid color and segmented gradient color.
     *
     * @param { ResourceColor | LinearGradient | Array<[ResourceColor | LinearGradient, number]> } colors - section colors of gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    colors(colors: ResourceColor | LinearGradient | Array<[
        ResourceColor | LinearGradient,
        number
    ]>): GaugeAttribute;
    /**
     * Sets the thickness of the ring chart.
     *
     * @param { Length } length
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the thickness of the ring chart.
     *
     * @param { Length } length
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the thickness of the ring chart.
     *
     * @param { Length } length
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the thickness of the ring chart.
     *
     * @param { Length } length
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    strokeWidth(length: Length): GaugeAttribute;
    /**
     * Sets description content of the ring chart.
     *
     * @param { CustomBuilder } value - description content builder of the gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Sets description content of the ring chart.
     *
     * @param { CustomBuilder } value - description content builder of the gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    description(value: CustomBuilder): GaugeAttribute;
    /**
     * Sets track shadow of the ring chart.
     *
     * @param { GaugeShadowOptions } value - track shadow options of the gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Sets track shadow of the ring chart.
     *
     * @param { GaugeShadowOptions } value - track shadow options of the gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    trackShadow(value: GaugeShadowOptions): GaugeAttribute;
    /**
     * Sets indicator options of the ring chart.
     *
     * @param { GaugeIndicatorOptions } value - indicator options of the gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Sets indicator options of the ring chart.
     *
     * @param { GaugeIndicatorOptions } value - indicator options of the gauge drawing.
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    indicator(value: GaugeIndicatorOptions): GaugeAttribute;
    /**
     * Set the content modifier of gauge.
     *
     * @param { ContentModifier<GaugeConfiguration> } modifier - The content modifier of gauge.
     * @returns { GaugeAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentModifier(modifier: ContentModifier<GaugeConfiguration>): GaugeAttribute;
    /**
     * Sets if mark to privacy sensitive.
     *
     * @param { Optional<boolean> } isPrivacySensitiveMode - indicates if mark to  privacy sensitive .
     * @returns { GaugeAttribute } returns the instance of the GaugeAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    privacySensitive(isPrivacySensitiveMode: Optional<boolean>): GaugeAttribute;
}
/**
 * Defines Gauge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Gauge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Gauge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Gauge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Gauge: GaugeInterface;
/**
 * Defines Gauge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Gauge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Gauge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Gauge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const GaugeInstance: GaugeAttribute;
