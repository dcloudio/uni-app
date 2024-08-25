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
 * Provides methods for switching components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides methods for switching components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides methods for switching components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class SwiperController {
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor();
    /**
     * Called when the next child component is displayed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the next child component is displayed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the next child component is displayed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    showNext();
    /**
     * Called when the previous subcomponent is displayed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the previous subcomponent is displayed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the previous subcomponent is displayed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    showPrevious();
    /**
     * Controlling Swiper to change to the specified subcomponent.
     *
     * @param { number } index - the index of item to be redirected.
     * @param { boolean } useAnimation - If true, swipe to index item with animation. If false, swipe to index item without animation.
     *      The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     * @form
     */
    changeIndex(index: number, useAnimation?: boolean);
    /**
     * Called when need to stop the swiper animation.
     *
     * @param { function } callback
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when need to stop the swiper animation.
     *
     * @param { function } callback
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when need to stop the swiper animation.
     *
     * @param { function } callback
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    finishAnimation(callback?: () => void);
}
/**
 * Defines the indicator class.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the indicator class.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class Indicator<T> {
    /**
     * Set the indicator to the left.
     *
     * @param { Length } value - the indicator to the left.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator to the left.
     *
     * @param { Length } value - the indicator to the left.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    left(value: Length): T;
    /**
     * Set the indicator to the top.
     *
     * @param { Length } value - the indicator to the top.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator to the top.
     *
     * @param { Length } value - the indicator to the top.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    top(value: Length): T;
    /**
     * Set the indicator to the right.
     *
     * @param { Length } value - the indicator to the right.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator to the right.
     *
     * @param { Length } value - the indicator to the right.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    right(value: Length): T;
    /**
     * Set the indicator to the bottom.
     *
     * @param { Length } value - the indicator to the bottom.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator to the bottom.
     *
     * @param { Length } value - the indicator to the bottom.
     * @returns { T }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    bottom(value: Length): T;
    /**
     * DotIndicator class object.
     *
     * @returns { DotIndicator }
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * DotIndicator class object.
     *
     * @returns { DotIndicator }
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    static dot(): DotIndicator;
    /**
     * DigitIndicator class object.
     *
     * @returns { DigitIndicator }
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * DigitIndicator class object.
     *
     * @returns { DigitIndicator }
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    static digit(): DigitIndicator;
}
/**
 * Define DotIndicator, the indicator type is dot.
 *
 * @extends Indicator<DotIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Define DotIndicator, the indicator type is dot.
 *
 * @extends Indicator<DotIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class DotIndicator extends Indicator<DotIndicator> {
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor();
    /**
     * Set the indicator item width.
     *
     * @param { Length } value - the indicator item width.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator item width.
     *
     * @param { Length } value - the indicator item width.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    itemWidth(value: Length): DotIndicator;
    /**
     * Set the indicator item height.
     *
     * @param { Length } value - the indicator item height.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator item height.
     *
     * @param { Length } value - the indicator item height.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    itemHeight(value: Length): DotIndicator;
    /**
     * Set the indicator item width when selected.
     *
     * @param { Length } value - the indicator item width when selected.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator item width when selected.
     *
     * @param { Length } value - the indicator item width when selected.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    selectedItemWidth(value: Length): DotIndicator;
    /**
     * Set the indicator item height when selected.
     *
     * @param { Length } value - the indicator item height when selected.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator item height when selected.
     *
     * @param { Length } value - the indicator item height when selected.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    selectedItemHeight(value: Length): DotIndicator;
    /**
     * Setting indicator style mask.
     *
     * @param { boolean } value - the indicator item mask.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Setting indicator style mask.
     *
     * @param { boolean } value - the indicator item mask.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    mask(value: boolean): DotIndicator;
    /**
     * Set the indicator color.
     *
     * @param { ResourceColor } value - the indicator item color.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the indicator color.
     *
     * @param { ResourceColor } value - the indicator item color.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    color(value: ResourceColor): DotIndicator;
    /**
     * Set the navigation point color.
     *
     * @param { ResourceColor } value - the indicator item when selected.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the navigation point color.
     *
     * @param { ResourceColor } value - the indicator item when selected.
     * @returns { DotIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    selectedColor(value: ResourceColor): DotIndicator;
}
/**
 * Set Swiper column count adaptation.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 * @form
 */
/**
 * Set Swiper column count adaptation.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 * @form
 */
declare type SwiperAutoFill = {
    /**
     * Set minSize size.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     * @form
     */
    /**
     * Set minSize size.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     * @form
     */
    minSize: VP;
};
/**
 * Define DigitIndicator, the indicator type is digit.
 *
 * @extends Indicator<DigitIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Define DigitIndicator, the indicator type is digit.
 *
 * @extends Indicator<DigitIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class DigitIndicator extends Indicator<DigitIndicator> {
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor();
    /**
     * Set font color of the digital indicator.
     *
     * @param { ResourceColor } value - the indicator font color.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set font color of the digital indicator.
     *
     * @param { ResourceColor } value - the indicator font color.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fontColor(value: ResourceColor): DigitIndicator;
    /**
     * Set font color of the digital indicator when selected.
     *
     * @param { ResourceColor } value - the indicator font color when selected.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set font color of the digital indicator when selected.
     *
     * @param { ResourceColor } value - the indicator font color when selected.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    selectedFontColor(value: ResourceColor): DigitIndicator;
    /**
     * Set the digital indicator font (just support font size and weight).
     *
     * @param { Font } value - the indicator font size and weight.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the digital indicator font (just support font size and weight).
     *
     * @param { Font } value - the indicator font size and weight.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    digitFont(value: Font): DigitIndicator;
    /**
     * Set the digital indicator font (just support font size and weight).
     *
     * @param { Font } value - the indicator font size and weight when selected.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the digital indicator font (just support font size and weight).
     *
     * @param { Font } value - the indicator font size and weight when selected.
     * @returns { DigitIndicator }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    selectedDigitFont(value: Font): DigitIndicator;
}
/**
 * Arrow object.
 *
 * @interface ArrowStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Arrow object.
 *
 * @interface ArrowStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface ArrowStyle {
    /**
     * Is show the arrow background or not.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Is show the arrow background or not.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showBackground?: boolean;
    /**
     * When the indicator show, set the arrow position is side of the indicator or in the middle of content area.
     * The arrow is displayed on side of the indicator, if the value is false.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * When the indicator show, set the arrow position is side of the indicator or in the middle of content area.
     * The arrow is displayed on side of the indicator, if the value is false.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    isSidebarMiddle?: boolean;
    /**
     * The arrow background size.
     * The size of the arrow is three-quarters of the background size, when the background is displayed.
     *
     * @type { ?Length }
     * @default When isSidebarMiddle is false, the default value is 24vp, Otherwise,the default value is 32vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The arrow background size.
     * The size of the arrow is three-quarters of the background size, when the background is displayed.
     *
     * @type { ?Length }
     * @default When isSidebarMiddle is false, the default value is 24vp, Otherwise,the default value is 32vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    backgroundSize?: Length;
    /**
     * The arrow background background color.
     *
     * @type { ?ResourceColor }
     * @default When isSidebarMiddle is false, the default value is #00000000, Otherwise,the default value is #19182431
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The arrow background background color.
     *
     * @type { ?ResourceColor }
     * @default When isSidebarMiddle is false, the default value is #00000000, Otherwise, the default value is #19182431
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    backgroundColor?: ResourceColor;
    /**
     * The arrow size.
     * The arrow size can be set, when the background is not displayed.
     * The size of the arrow is three-quarters of the background size, when the background is displayed.
     *
     * @type { ?Length }
     * @default When isSidebarMiddle is false, the default value is 18vp, Otherwise, the default value is 24vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The arrow size.
     * The arrow size can be set, when the background is not displayed.
     * The size of the arrow is three-quarters of the background size, when the background is displayed.
     *
     * @type { ?Length }
     * @default When isSidebarMiddle is false, the default value is 18vp, Otherwise, the default value is 24vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    arrowSize?: Length;
    /**
     * The arrow color.
     *
     * @type { ?ResourceColor }
     * @default #182431
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The arrow color.
     *
     * @type { ?ResourceColor }
     * @default #182431
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    arrowColor?: ResourceColor;
}
/**
 * Declare the size of the swiper on the spindle.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the size of the swiper on the spindle.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Declare the size of the swiper on the spindle.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum SwiperDisplayMode {
    /**
     * Carousel map extension.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     * @useinstead SwiperDisplayMode#STRETCH
     * @form
     */
    Stretch,
    /**
     * The rotation chart is self linear.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     * @useinstead SwiperDisplayMode#AUTO_LINEAR
     * @form
     */
    AutoLinear,
    /**
     * Carousel map extension.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Carousel map extension.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    STRETCH,
    /**
     * The rotation chart is self linear.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The rotation chart is self linear.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11
     * @deprecated since 12
     * @useinstead Scroller#scrollTo
     */
    AUTO_LINEAR
}
/**
 * Provides an interface for sliding containers.
 *
 * @interface SwiperInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for sliding containers.
 *
 * @interface SwiperInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides an interface for sliding containers.
 *
 * @interface SwiperInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface SwiperInterface {
    /**
     * Called when a sliding container is set.
     *
     * @param { SwiperController } controller
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when a sliding container is set.
     *
     * @param { SwiperController } controller
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when a sliding container is set.
     *
     * @param { SwiperController } controller
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (controller?: SwiperController): SwiperAttribute;
}
/**
 * Setting indicator style navigation.
 *
 * @interface IndicatorStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 * @deprecated since 10
 */
declare interface IndicatorStyle {
    /**
     * Set the indicator to the left.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    left?: Length;
    /**
     * Set the indicator to the top.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    top?: Length;
    /**
     * Set the indicator to the right.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    right?: Length;
    /**
     * Set the indicator to the bottom.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    bottom?: Length;
    /**
     * Set the indicator size.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    size?: Length;
    /**
     * Setting indicator style mask.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    mask?: boolean;
    /**
     * Set the indicator color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    color?: ResourceColor;
    /**
     * Set the navigation point color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    selectedColor?: ResourceColor;
}
/**
 * Provides an interface for swiper animation.
 *
 * @interface SwiperAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for swiper animation.
 *
 * @interface SwiperAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface SwiperAnimationEvent {
    /**
     * Offset of the current page to the start position of the swiper main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Offset of the current page to the start position of the swiper main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    currentOffset: number;
    /**
     * Offset of the target page to the start position of the swiper main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Offset of the target page to the start position of the swiper main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    targetOffset: number;
    /**
     * Start speed of the page-turning animation. The unit is vp/s.
     *
     * @type { number }
     * @default 0.0 vp/s
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Start speed of the page-turning animation. The unit is vp/s.
     *
     * @type { number }
     * @default 0.0 vp/s
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    velocity: number;
}
/**
 * Swiper nested scroll nested mode

 * @enum { number } SwiperNestedScrollMode
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare enum SwiperNestedScrollMode {
    /**
     * Only Self response scrolling.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    SELF_ONLY = 0,
    /**
     * Self priority response scrolling.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    SELF_FIRST = 1
}
/**
 * Defines the swiper attribute functions.
 *
 * @extends CommonMethod<SwiperAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the swiper attribute functions.
 *
 * @extends CommonMethod<SwiperAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the swiper attribute functions.
 *
 * @extends CommonMethod<SwiperAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class SwiperAttribute extends CommonMethod<SwiperAttribute> {
    /**
     * Called when the index value of the displayed subcomponent is set in the container.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the index value of the displayed subcomponent is set in the container.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the index value of the displayed subcomponent is set in the container.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    index(value: number): SwiperAttribute;
    /**
     * Called when setting whether the subcomponent plays automatically.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when setting whether the subcomponent plays automatically.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when setting whether the subcomponent plays automatically.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    autoPlay(value: boolean): SwiperAttribute;
    /**
     * Called when the time interval for automatic playback is set.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the time interval for automatic playback is set.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the time interval for automatic playback is set.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    interval(value: number): SwiperAttribute;
    /**
     * Called when you set whether the navigation point indicator is enabled.
     *
     * @param { boolean } value - show indicator of the swiper indicator.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set indicator is enabled, or set type style.
     *
     * @param { DotIndicator | DigitIndicator | boolean } value - the style value or show indicator of the swiper indicator.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set indicator is enabled, or set type style.
     *
     * @param { DotIndicator | DigitIndicator | boolean } value - the style value or show indicator of the swiper indicator.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    indicator(value: DotIndicator | DigitIndicator | boolean): SwiperAttribute;
    /**
     * Set arrow is enabled, or set the arrow style.
     *
     * @param { ArrowStyle | boolean } value - arrow is displayed or set the arrow style.
     * @param { boolean } isHoverShow - arrow is display when mouse hover in indicator hotspot.
     * @returns { SwiperAttribute } return the component attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set arrow is enabled, or set the arrow style.
     *
     * @param { ArrowStyle | boolean } value - arrow is displayed or set the arrow style.
     * @param { boolean } isHoverShow - arrow is display when mouse hover in indicator hotspot.
     * @returns { SwiperAttribute } return the component attribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    displayArrow(value: ArrowStyle | boolean, isHoverShow?: boolean): SwiperAttribute;
    /**
     * Called when setting whether to turn on cyclic sliding.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when setting whether to turn on cyclic sliding.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when setting whether to turn on cyclic sliding.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    loop(value: boolean): SwiperAttribute;
    /**
     * Called when the animation duration of the switch is set.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the animation duration of the switch is set.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the animation duration of the switch is set.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    duration(value: number): SwiperAttribute;
    /**
     * Called when setting whether to slide vertically.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when setting whether to slide vertically.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when setting whether to slide vertically.
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    vertical(value: boolean): SwiperAttribute;
    /**
     * Called when the size of the rotation chart is set.
     *
     * @param { number | string } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the size of the rotation chart is set.
     *
     * @param { number | string } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the size of the rotation chart is set.
     *
     * @param { number | string } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    itemSpace(value: number | string): SwiperAttribute;
    /**
     * Called when setting the size of the swiper container on the spindle.
     *
     * @param { SwiperDisplayMode } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when setting the size of the swiper container on the spindle.
     *
     * @param { SwiperDisplayMode } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when setting the size of the swiper container on the spindle.
     *
     * @param { SwiperDisplayMode } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    displayMode(value: SwiperDisplayMode): SwiperAttribute;
    /**
     * Called when setting the cached count of the swiper container one side.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when setting the cached count of the swiper container one side.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when setting the cached count of the swiper container one side.
     *
     * @param { number } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    cachedCount(value: number): SwiperAttribute;
    /**
     * This command is invoked when the number of subcomponents is set.
     *
     * @param { number | string } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * This command is invoked when the number of subcomponents is set.
     *
     * @param { number | string | SwiperAutoFill } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * This command is invoked when the number of subcomponents is set.
     *
     * If swipeByGroup is set to true:
     * 1、All sub-items are grouped from index 0.
     * 2、The number of sub-items in each group is the value of displayCount.
     * 3、If the number of sub-items in the last group is less than displayCount, placeholder items are added to supplement the number of last group.
     * 4、Placeholder items do not display any content and are only used as placeholders.
     * 5、When turning pages, turn pages by group.
     *
     * @param { number | string | SwiperAutoFill } value
     * @param { boolean } [swipeByGroup] - if swipe by group.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    displayCount(value: number | string | SwiperAutoFill, swipeByGroup?: boolean): SwiperAttribute;
    /**
     * Invoked when setting the sliding effect
     *
     * @param { EdgeEffect } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Invoked when setting the sliding effect
     *
     * @param { EdgeEffect } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Invoked when setting the sliding effect
     *
     * @param { EdgeEffect } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    effectMode(value: EdgeEffect): SwiperAttribute;
    /**
     * Called when sliding is disableSwipe
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when sliding is disableSwipe
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when sliding is disableSwipe
     *
     * @param { boolean } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    disableSwipe(value: boolean): SwiperAttribute;
    /**
     * Called when sliding is curve
     *
     * @param { Curve | string } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when sliding is curve
     * Curve is an enumeration type for common curves
     * ICurve is a curve object
     *
     * @param { Curve | string | ICurve } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when sliding is curve
     * Curve is an enumeration type for common curves
     * ICurve is a curve object
     *
     * @param { Curve | string | ICurve } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    curve(value: Curve | string | ICurve): SwiperAttribute;
    /**
     * Called when the index value changes.
     *
     * @param { function } event
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the index value changes.
     *
     * @param { function } event
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the index value changes.
     *
     * @param { function } event
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onChange(event: (index: number) => void): SwiperAttribute;
    /**
     * Setting indicator style navigation.
     *
     * @param { IndicatorStyle } value
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     * @deprecated since 10
     */
    indicatorStyle(value?: IndicatorStyle): SwiperAttribute;
    /**
     * The previous margin which can be used to expose a small portion of the previous item.
     *
     * @param { Length } value - The length of previous margin.
     * @returns { SwiperAttribute } The attribute of the swiper.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The previous margin which can be used to expose a small portion of the previous item.
     *
     * @param { Length } value - The length of previous margin.
     * @returns { SwiperAttribute } The attribute of the swiper.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    prevMargin(value: Length): SwiperAttribute;
    /**
     * The next margin which can be used to expose a small portion of the latter item.
     *
     * @param { Length } value - The length of next margin.
     * @returns { SwiperAttribute } The attribute of the swiper.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The next margin which can be used to expose a small portion of the latter item.
     *
     * @param { Length } value - The length of next margin.
     * @returns { SwiperAttribute } The attribute of the swiper.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    nextMargin(value: Length): SwiperAttribute;
    /**
     * Called when the swiper animation start.
     *
     * @param { function } event - the index value of the swiper page that when animation start.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the swiper animation start.
     *
     * @param { function } event
     * "index": the index value of the swiper page that when animation start.
     * "targetIndex": the target index value of the swiper page that when animation start.
     * "extraInfo": the extra callback info.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the swiper animation start.
     *
     * @param { function } event
     * "index": the index value of the swiper page that when animation start.
     * "targetIndex": the target index value of the swiper page that when animation start.
     * "extraInfo": the extra callback info.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onAnimationStart(event: (index: number, targetIndex: number, extraInfo: SwiperAnimationEvent) => void): SwiperAttribute;
    /**
     * Called when the swiper animation end.
     *
     * @param { function } event - the index value of the swiper page that when animation end.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the swiper animation end.
     *
     * @param { function } event
     * "index": the index value of the swiper page that when animation end.
     * "extraInfo": the extra callback info.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the swiper animation end.
     *
     * @param { function } event
     * "index": the index value of the swiper page that when animation end.
     * "extraInfo": the extra callback info.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onAnimationEnd(event: (index: number, extraInfo: SwiperAnimationEvent) => void): SwiperAttribute;
    /**
     * Called when the swiper swipe with the gesture.
     *
     * @param { function } event
     * "index": the index value of the swiper page before gesture swipe.
     * "extraInfo": the extra callback info.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the swiper swipe with the gesture.
     *
     * @param { function } event
     * "index": the index value of the swiper page before gesture swipe.
     * "extraInfo": the extra callback info.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onGestureSwipe(event: (index: number, extraInfo: SwiperAnimationEvent) => void): SwiperAttribute;
    /**
     * Called to setting the nested scroll mode.
     *
     * @param { SwiperNestedScrollMode } value - mode for nested scrolling.
     * @returns { SwiperAttribute } the attribute of the swiper.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    nestedScroll(value: SwiperNestedScrollMode): SwiperAttribute;
    /**
     * Custom swiper content transition animation.
     *
     * @param { SwiperContentAnimatedTransition } transition - custom content transition animation.
     * @returns { SwiperAttribute } the attribute of the swiper.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    customContentTransition(transition: SwiperContentAnimatedTransition): SwiperAttribute;
    /**
     * Called when the swiper content did scroll.
     *
     * @param { ContentDidScrollCallback } handler - callback of scroll,
     * selectedIndex is the index value of the swiper content selected before animation start.
     * index is the index value of the swiper content.
     * position is the moving ratio of the swiper content from the start position of the swiper main axis.
     * mainAxisLength is the swiper main axis length for calculating position.
     * @returns { SwiperAttribute } the attribute of the swiper.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onContentDidScroll(handler: ContentDidScrollCallback): SwiperAttribute;
    /**
     * Setting whether the indicator is interactive.
     *
     * @param { boolean } value - Whether the indicator is interactive.
     * @returns { SwiperAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    indicatorInteractive(value: boolean): SwiperAttribute;
}
/**
 * Defines the swiper content animated transition options.
 *
 * @interface SwiperContentAnimatedTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface SwiperContentAnimatedTransition {
    /**
     * Defines the timeout of custom content transition animation after the page is moved out of the swiper. The unit is ms.
     * If SwiperContentTransitionProxy.finishTransition() is not invoked, use the timeout as animation end time.
     *
     * @type { ?number }
     * @default 0 ms
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    timeout?: number;
    /**
     * Called when custom content transition animation start.
     *
     * @type { Callback<SwiperContentTransitionProxy> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    transition: Callback<SwiperContentTransitionProxy>;
}
/**
 * The proxy of SwiperContentAnimatedTransition.
 *
 * @interface SwiperContentTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface SwiperContentTransitionProxy {
    /**
     * the index value of the swiper content selected before animation start.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    selectedIndex: number;
    /**
     * The index value of the swiper content.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    index: number;
    /**
     * the moving ratio of the swiper content from the start position of the swiper main axis.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    position: number;
    /**
     * the swiper main axis length for calculating position.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    mainAxisLength: number;
    /**
     * Notifies Swiper page the custom content transition animation is complete.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    finishTransition(): void;
}
/**
 * The callback of onContentDidScroll.
 *
 * @typedef { Function } ContentDidScrollCallback
 * @param { number } selectedIndex - the index value of the swiper content selected before animation start.
 * @param { number } index - the index value of the swiper content.
 * @param { number } position - the moving ratio of the swiper content from the start position of the swiper main axis.
 * @param { number } mainAxisLength - the swiper main axis length for calculating position.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare type ContentDidScrollCallback = (selectedIndex: number, index: number, position: number, mainAxisLength: number) => void;
/**
 * Defines Swiper Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Swiper Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Swiper Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Swiper: SwiperInterface;
/**
 * Defines Swiper Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Swiper Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Swiper Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const SwiperInstance: SwiperAttribute;
