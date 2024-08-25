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
 * Defines the ColumnSplit component.
 *
 * @interface ColumnSplitInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the ColumnSplit component.
 *
 * @interface ColumnSplitInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the ColumnSplit component.
 *
 * @interface ColumnSplitInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ColumnSplitInterface {
    /**
     * Layout the subassemblies vertically and insert a horizontal divider line between each subassemblies.
     *
     * @returns { ColumnSplitAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Layout the subassemblies vertically and insert a horizontal divider line between each subassemblies.
     *
     * @returns { ColumnSplitAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Layout the subassemblies vertically and insert a horizontal divider line between each subassemblies.
     *
     * @returns { ColumnSplitAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (): ColumnSplitAttribute;
}
/**
 * Provides an interface for the style of a divider including start margin and end margin
 *
 * @interface ColumnSplitDividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the style of a divider including start margin and end margin
 *
 * @interface ColumnSplitDividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ColumnSplitDividerStyle {
    /**
     * Define the start margin of the divider
     *
     * @type { ?Dimension }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the start margin of the divider
     *
     * @type { ?Dimension }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    startMargin?: Dimension;
    /**
     * Define the end margin of the divider
     *
     * @type { ?Dimension }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the end margin of the divider
     *
     * @type { ?Dimension }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    endMargin?: Dimension;
}
/**
 * Defines the ColumnSplit component attribute functions.
 *
 * @extends CommonMethod<ColumnSplitAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the ColumnSplit component attribute functions.
 *
 * @extends CommonMethod<ColumnSplitAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the ColumnSplit component attribute functions.
 *
 * @extends CommonMethod<ColumnSplitAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class ColumnSplitAttribute extends CommonMethod<ColumnSplitAttribute> {
    /**
     * Indicates whether the split line can be dragged. The default value is false.
     *
     * @param { boolean } value
     * @returns { ColumnSplitAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Indicates whether the split line can be dragged. The default value is false.
     *
     * @param { boolean } value
     * @returns { ColumnSplitAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates whether the split line can be dragged. The default value is false.
     *
     * @param { boolean } value
     * @returns { ColumnSplitAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    resizeable(value: boolean): ColumnSplitAttribute;
    /**
     * Called when the ColumnSplit split line style is set.
     * @param { ColumnSplitDividerStyle | null } value - indicates the style of the indicator.
     * if value is set to null, the value of startMargin and endMargin is set to 0.0 by default.
     * @returns { ColumnSplitAttribute } the attribute of the ColumnSplit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the ColumnSplit split line style is set.
     * @param { ColumnSplitDividerStyle | null } value - indicates the style of the indicator.
     * if value is set to null, the value of startMargin and endMargin is set to 0.0 by default.
     * @returns { ColumnSplitAttribute } the attribute of the ColumnSplit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    divider(value: ColumnSplitDividerStyle | null): ColumnSplitAttribute;
}
/**
 * Defines ColumnSplit Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines ColumnSplit Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines ColumnSplit Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const ColumnSplitInstance: ColumnSplitAttribute;
/**
 * Defines ColumnSplit Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines ColumnSplit Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines ColumnSplit Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const ColumnSplit: ColumnSplitInterface;
