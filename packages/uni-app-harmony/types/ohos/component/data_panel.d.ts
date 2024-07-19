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
 * DataPanelType enum
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * DataPanelType enum
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * DataPanelType enum
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * DataPanelType enum
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum DataPanelType {
    /**
     * Line Type
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Line Type
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Line Type
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Line Type
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Line,
    /**
     * Line Rainbow
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Line Rainbow
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Line Rainbow
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Line Rainbow
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Circle
}
/**
 * ColorStop type
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * ColorStop type
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare type ColorStop = {
    /**
     * Color property.
     * @type { ResourceColor } color - the color value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Color property.
     * @type { ResourceColor } color - the color value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    color: ResourceColor;
    /**
     * Offset property.
     * @type { Length } offset - the color offset.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Offset property.
     * @type { Length } offset - the color offset.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    offset: Length;
};
/**
 * LinearGradient class
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * LinearGradient class
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class LinearGradient {
    /**
     * Constructor.
     *
     * @param { ColorStop[] } colorStops - the LinearGradient constructor parameter.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Constructor.
     *
     * @param { ColorStop[] } colorStops - the LinearGradient constructor parameter.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    constructor(colorStops: ColorStop[]);
}
/**
 * Defines the options of Shadow.
 *
 * @interface DataPanelShadowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the options of Shadow.
 *
 * @interface DataPanelShadowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface DataPanelShadowOptions extends MultiShadowOptions {
    /**
     * Current shadow colors.
     *
     * @type { ?Array<ResourceColor | LinearGradient> }
     * @default Consistent with valueColors
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Current shadow colors.
     *
     * @type { ?Array<ResourceColor | LinearGradient> }
     * @default Consistent with valueColors
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    colors?: Array<ResourceColor | LinearGradient>;
}
/**
 * Defines the options of DataPanel.
 *
 * @interface DataPanelOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of DataPanel.
 *
 * @interface DataPanelOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the options of DataPanel.
 *
 * @interface DataPanelOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the options of DataPanel.
 *
 * @interface DataPanelOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface DataPanelOptions {
    /**
     * Current data value. the max length is 9.
     *
     * @type { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Current data value. the max length is 9.
     *
     * @type { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Current data value. the max length is 9.
     *
     * @type { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Current data value. the max length is 9.
     *
     * @type { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    values: number[];
    /**
     * Maximum value of the current data.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Maximum value of the current data.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Maximum value of the current data.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Maximum value of the current data.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    max?: number;
    /**
     * DataPanel Type
     *
     * @type { ?DataPanelType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * DataPanel Type
     *
     * @type { ?DataPanelType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * DataPanel Type
     *
     * @type { ?DataPanelType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * DataPanel Type
     *
     * @type { ?DataPanelType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    type?: DataPanelType;
}
/**
 * Defines the DataPanel component.
 *
 * @interface DataPanelInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the DataPanel component.
 *
 * @interface DataPanelInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the DataPanel component.
 *
 * @interface DataPanelInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the DataPanel component.
 *
 * @interface DataPanelInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface DataPanelInterface {
    /**
     * Return a DataPanel.
     *
     * @param { DataPanelOptions } options
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Return a DataPanel.
     *
     * @param { DataPanelOptions } options
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Return a DataPanel.
     *
     * @param { DataPanelOptions } options
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Return a DataPanel.
     *
     * @param { DataPanelOptions } options
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (options: DataPanelOptions): DataPanelAttribute;
}
/**
 * DataPanelConfiguration used by dataPanel content modifier
 *
 * @interface DataPanelConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface DataPanelConfiguration extends CommonConfiguration<DataPanelConfiguration> {
    /**
     * Current data value. the max length is 9.
     *
     * @type { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    values: number[];
    /**
     * Maximum value of the current data.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    maxValue: number;
}
/**
 * Defines the DataPanel attribute functions.
 *
 * @extends CommonMethod
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the DataPanel attribute functions.
 *
 * @extends CommonMethod
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the DataPanel attribute functions.
 *
 * @extends CommonMethod
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the DataPanel attribute functions.
 *
 * @extends CommonMethod<DataPanelAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class DataPanelAttribute extends CommonMethod<DataPanelAttribute> {
    /**
     * Disable the special effect of the data ratio chart.
     *
     * @param { boolean } value
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Disable the special effect of the data ratio chart.
     *
     * @param { boolean } value
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Disable the special effect of the data ratio chart.
     *
     * @param { boolean } value
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Disable the special effect of the data ratio chart.
     *
     * @param { boolean } value
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    closeEffect(value: boolean): DataPanelAttribute;
    /**
     * Set the value colors of the data ratio chart.
     *
     * @param { Array<ResourceColor | LinearGradient> } value - the value colors of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the value colors of the data ratio chart.
     *
     * @param { Array<ResourceColor | LinearGradient> } value - the value colors of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    valueColors(value: Array<ResourceColor | LinearGradient>): DataPanelAttribute;
    /**
     * Set track background color of the data ratio chart.
     *
     * @param { ResourceColor } value - track background color of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set track background color of the data ratio chart.
     *
     * @param { ResourceColor } value - track background color of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    trackBackgroundColor(value: ResourceColor): DataPanelAttribute;
    /**
     * Set the stroke width of the data ratio chart.
     *
     * @param { Length } value - the stroke width of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the stroke width of the data ratio chart.
     *
     * @param { Length } value - the stroke width of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    strokeWidth(value: Length): DataPanelAttribute;
    /**
     * Set the shadow width of the data ratio chart.
     *
     * @param { DataPanelShadowOptions } value - the track shadow width of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the shadow width of the data ratio chart.
     *
     * @param { DataPanelShadowOptions } value - the track shadow width of the data ratio chart.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    trackShadow(value: DataPanelShadowOptions): DataPanelAttribute;
    /**
     * Set the content modifier of data panel.
     *
     * @param { ContentModifier<DataPanelConfiguration> } modifier - The content modifier of data panel.
     * @returns { DataPanelAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentModifier(modifier: ContentModifier<DataPanelConfiguration>): DataPanelAttribute;
}
/**
 * Defines DataPanel Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines DataPanel Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines DataPanel Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines DataPanel Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const DataPanel: DataPanelInterface;
/**
 * Defines DataPanel Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines DataPanel Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines DataPanel Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines DataPanel Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const DataPanelInstance: DataPanelAttribute;
