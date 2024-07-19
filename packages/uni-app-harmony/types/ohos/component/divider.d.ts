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
 * Provides a divider component to separate different content blocks/content elements.
 *
 * @interface DividerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides a divider component to separate different content blocks/content elements.
 *
 * @interface DividerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Provides a divider component to separate different content blocks/content elements.
 *
 * @interface DividerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides a divider component to separate different content blocks/content elements.
 *
 * @interface DividerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface DividerInterface {
    /**
     * Return Divider.
     *
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Return Divider.
     *
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Return Divider.
     *
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Return Divider.
     *
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (): DividerAttribute;
}
/**
 * Defines the Divider attribute functions.
 *
 * @extends CommonMethod<DividerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the Divider attribute functions.
 *
 * @extends CommonMethod<DividerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the Divider attribute functions.
 *
 * @extends CommonMethod<DividerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the Divider attribute functions.
 *
 * @extends CommonMethod<DividerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class DividerAttribute extends CommonMethod<DividerAttribute> {
    /**
     * Indicates whether to use a horizontal splitter or a vertical splitter.
     * The options are as follows: false: horizontal splitter; true: vertical splitter.
     *
     * @param { boolean } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Indicates whether to use a horizontal splitter or a vertical splitter.
     * The options are as follows: false: horizontal splitter; true: vertical splitter.
     *
     * @param { boolean } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates whether to use a horizontal splitter or a vertical splitter.
     * The options are as follows: false: horizontal splitter; true: vertical splitter.
     *
     * @param { boolean } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates whether to use a horizontal splitter or a vertical splitter.
     * The options are as follows: false: horizontal splitter; true: vertical splitter.
     *
     * @param { boolean } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    vertical(value: boolean): DividerAttribute;
    /**
     * Sets the color of the divider line.
     *
     * @param { ResourceColor } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the color of the divider line.
     *
     * @param { ResourceColor } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the color of the divider line.
     *
     * @param { ResourceColor } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the color of the divider line.
     *
     * @param { ResourceColor } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    color(value: ResourceColor): DividerAttribute;
    /**
     * Sets the width of the dividing line.
     *
     * @param { number | string } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the width of the dividing line.
     *
     * @param { number | string } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the width of the dividing line.
     *
     * @param { number | string } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the width of the dividing line.
     *
     * @param { number | string } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    strokeWidth(value: number | string): DividerAttribute;
    /**
     * Sets the end style of the split line. The default value is Butt.
     *
     * @param { LineCapStyle } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the end style of the split line. The default value is Butt.
     *
     * @param { LineCapStyle } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the end style of the split line. The default value is Butt.
     *
     * @param { LineCapStyle } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the end style of the split line. The default value is Butt.
     *
     * @param { LineCapStyle } value
     * @returns { DividerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    lineCap(value: LineCapStyle): DividerAttribute;
}
/**
 * Defines Divider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Divider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Divider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Divider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Divider: DividerInterface;
/**
 * Defines Divider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Divider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Divider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Divider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const DividerInstance: DividerAttribute;
