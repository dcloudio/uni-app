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
 * Defines the options of Flex.
 *
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of Flex.
 *
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the options of Flex.
 *
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the options of Flex.
 *
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface FlexOptions {
    /**
     * Sets the horizontal layout of elements.
     *
     * @type { ?FlexDirection }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the horizontal layout of elements.
     *
     * @type { ?FlexDirection }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the horizontal layout of elements.
     *
     * @type { ?FlexDirection }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the horizontal layout of elements.
     *
     * @type { ?FlexDirection }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    direction?: FlexDirection;
    /**
     * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
     *
     * @type { ?FlexWrap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
     *
     * @type { ?FlexWrap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
     *
     * @type { ?FlexWrap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
     *
     * @type { ?FlexWrap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    wrap?: FlexWrap;
    /**
     * The alignment format of the subassembly on the Flex container spindle.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The alignment format of the subassembly on the Flex container spindle.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The alignment format of the subassembly on the Flex container spindle.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The alignment format of the subassembly on the Flex container spindle.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    justifyContent?: FlexAlign;
    /**
     * Alignment Format for Subassembly on Flex Container Cross Axis.
     *
     * @type { ?ItemAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Alignment Format for Subassembly on Flex Container Cross Axis.
     *
     * @type { ?ItemAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Alignment Format for Subassembly on Flex Container Cross Axis.
     *
     * @type { ?ItemAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Alignment Format for Subassembly on Flex Container Cross Axis.
     *
     * @type { ?ItemAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    alignItems?: ItemAlign;
    /**
     * The alignment of multiple lines of content when there is extra space in the cross axis.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The alignment of multiple lines of content when there is extra space in the cross axis.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The alignment of multiple lines of content when there is extra space in the cross axis.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The alignment of multiple lines of content when there is extra space in the cross axis.
     *
     * @type { ?FlexAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    alignContent?: FlexAlign;
    /**
     * The space to be inserted, either horizontally or vertically,
     * between two adjacent components in the Flex container.
     *
     * @type { ?FlexSpaceOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    space?: FlexSpaceOptions;
}
/**
 * The space to be inserted, either horizontally or vertically,
 * between two adjacent components in the Flex container.
 *
 * @interface FlexSpaceOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface FlexSpaceOptions {
    /**
     * Defines the main space property.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    main?: LengthMetrics;
    /**
     * Defines the cross space property.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    cross?: LengthMetrics;
}
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface FlexInterface {
    /**
     * Defines the constructor of Flex.
     *
     * @param { FlexOptions } value
     * @returns { FlexAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Defines the constructor of Flex.
     *
     * @param { FlexOptions } value
     * @returns { FlexAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Defines the constructor of Flex.
     *
     * @param { FlexOptions } value
     * @returns { FlexAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Defines the constructor of Flex.
     *
     * @param { FlexOptions } value
     * @returns { FlexAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (value?: FlexOptions): FlexAttribute;
}
/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class FlexAttribute extends CommonMethod<FlexAttribute> {
}
/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Flex: FlexInterface;
/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const FlexInstance: FlexAttribute;
