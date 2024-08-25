/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * Defines the size type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 9
 * @useinstead grid_col/[GridColColumnOption] and grid_row/[GridRowColumnOption]
 */
declare enum SizeType {
    /**
     * Select a value based on the device type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    Auto,
    /**
     * Select a value based on the device type.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    XS,
    /**
     * Small width type device.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    SM,
    /**
     * Medium width type device.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    MD,
    /**
     * Large width type device.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    LG
}
/**
 * Defines the options of GridContainer.
 *
 * @interface GridContainerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 9
 * @useinstead grid_col/[GridColOptions] and grid_row/[GridRowOptions]
 */
declare interface GridContainerOptions {
    /**
     * Sets the total number of columns in the current layout.
     *
     * @type { ?(number | "auto") }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    columns?: number | "auto";
    /**
     * Select the device width type.
     *
     * @type { ?SizeType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    sizeType?: SizeType;
    /**
     * Grid layout column spacing.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    gutter?: number | string;
    /**
     * Spacing on both sides of the grid layout.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    margin?: number | string;
}
/**
 * Defines the GridContainer component.
 *
 * @interface GridContainerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 9
 * @useinstead grid_col/[GridColInterface] and grid_row/[GridRowInterface]
 */
interface GridContainerInterface {
    /**
     * Defines the constructor of GridContainer.
     *
     * @param { GridContainerOptions } value
     * @returns { GridContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    (value?: GridContainerOptions): GridContainerAttribute;
}
/**
 * Defines the grid container attribute from inheritance Column
 *
 * @extends ColumnAttribute
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 9
 * @useinstead grid_col/[GridColAttribute] and grid_row/[GridRowAttribute]
 */
declare class GridContainerAttribute extends ColumnAttribute {
}
/**
 * Defines GridContainer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 9
 * @useinstead grid_col/[GridColColumnOption] and grid_row/[GridRowColumnOption]
 */
declare const GridContainer: GridContainerInterface;
/**
 * Defines GridContainer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 * @deprecated since 9
 * @useinstead grid_col/[GridColAttribute] and grid_row/[GridRowAttribute]
 */
declare const GridContainerInstance: GridContainerAttribute;
