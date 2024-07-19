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
 * The options to help grid layout
 *
 * @interface GridLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The options to help grid layout
 *
 * @interface GridLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface GridLayoutOptions {
    /**
     * The size of most grid items, in [rows, columns], generally [1, 1]
     *
     * @type { [number, number] } regularSize
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The size of most grid items, in [rows, columns], generally [1, 1]
     *
     * @type { [number, number] } regularSize
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    regularSize: [
        number,
        number
    ];
    /**
     * The indexes of grid items with irregular size.
     *
     * @type { ?number[] } irregularIndexes
     * @default number[] no irregular grid item
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The indexes of grid items with irregular size.
     *
     * @type { ?number[] } irregularIndexes
     * @default number[] no irregular grid item
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    irregularIndexes?: number[];
    /**
     * Called to return the size of the irregular grid items with the specified index in [rows, columns].
     *
     * @type { ?function } onGetIrregularSizeByIndex,
     * all irregular grid items will occupy an entire line if not set
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called to return the size of the irregular grid items with the specified index in [rows, columns].
     *
     * @type { ?function } onGetIrregularSizeByIndex,
     * all irregular grid items will occupy an entire line if not set
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onGetIrregularSizeByIndex?: (index: number) => [
        number,
        number
    ];
    /**
     * Called to return the size of the grid items with the specified index in
     * [rowStart, columnStart, rowSpan, columnSpan].
     *
     * @type { ?function } onGetRectByIndex
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called to return the size of the grid items with the specified index in
     * [rowStart, columnStart, rowSpan, columnSpan].
     *
     * @type { ?function } onGetRectByIndex
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onGetRectByIndex?: (index: number) => [
        number,
        number,
        number,
        number
    ];
}
/**
 * Defines the grid interface.
 *
 * @interface GridInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the grid interface.
 *
 * @interface GridInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the grid interface.
 *
 * @interface GridInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface GridInterface {
    /**
     * Grid is returned when the parameter is transferred.
     *
     * @param { Scroller } scroller
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Grid is returned when the parameter is transferred.
     *
     * @param { Scroller } scroller - Controller bound to the grid
     * @param { GridLayoutOptions } layoutOptions - The options to help grid layout
     * @returns { GridAttribute } The attribute of the grid
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Grid is returned when the parameter is transferred.
     *
     * @param { Scroller } scroller - Controller bound to the grid
     * @param { GridLayoutOptions } layoutOptions - The options to help grid layout
     * @returns { GridAttribute } The attribute of the grid
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (scroller?: Scroller, layoutOptions?: GridLayoutOptions): GridAttribute;
}
/**
 * The enum of property layoutDirection
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The enum of property layoutDirection
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The enum of property layoutDirection
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum GridDirection {
    /**
     * The row direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The row direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The row direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Row,
    /**
     * The column direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The column direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The column direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Column,
    /**
     * The row reverse direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The row reverse direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The row reverse direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    RowReverse,
    /**
     * The column reverse direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The column reverse direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The column reverse direction.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    ColumnReverse
}
/**
 * The attribute of scrollbar to compute scrollbar position and height.
 *
 * @interface ComputedBarAttribute
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The attribute of scrollbar to compute scrollbar position and height.
 *
 * @interface ComputedBarAttribute
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface ComputedBarAttribute {
    /**
     * The offset of the grid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The offset of the grid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    totalOffset: number;
    /**
     * The range of the grid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The range of the grid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    totalLength: number;
}
/**
 * Defines the grid attribute functions.
 *
 * @extends CommonMethod<GridAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the grid attribute functions.
 *
 * @extends CommonMethod<GridAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the grid attribute functions.
 *
 * @extends ScrollableCommonMethod<GridAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class GridAttribute extends ScrollableCommonMethod<GridAttribute> {
    /**
     * This parameter specifies the number of columns in the current grid layout.
     *
     * @param { string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * This parameter specifies the number of columns in the current grid layout.
     *
     * @param { string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * This parameter specifies the number of columns in the current grid layout.
     *
     * @param { string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    columnsTemplate(value: string): GridAttribute;
    /**
     * Lets you set the number of rows in the current grid layout,
     *
     * @param { string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Lets you set the number of rows in the current grid layout,
     *
     * @param { string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Lets you set the number of rows in the current grid layout,
     *
     * @param { string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    rowsTemplate(value: string): GridAttribute;
    /**
     * Allows you to set the spacing between columns.
     *
     * @param { Length } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Allows you to set the spacing between columns.
     *
     * @param { Length } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Allows you to set the spacing between columns.
     *
     * @param { Length } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    columnsGap(value: Length): GridAttribute;
    /**
     * Lets you set the spacing between rows.
     *
     * @param { Length } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Lets you set the spacing between rows.
     *
     * @param { Length } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Lets you set the spacing between rows.
     *
     * @param { Length } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    rowsGap(value: Length): GridAttribute;
    /**
     * This parameter specifies the width of the scroll bar.
     *
     * @param { number | string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * This parameter specifies the width of the scroll bar.
     *
     * @param { number | string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * This parameter specifies the width of the scroll bar.
     *
     * @param { number | string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollBarWidth(value: number | string): GridAttribute;
    /**
     * Sets the color of the scroll bar.
     *
     * @param { Color | number | string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the color of the scroll bar.
     *
     * @param { Color | number | string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the color of the scroll bar.
     *
     * @param { Color | number | string } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollBarColor(value: Color | number | string): GridAttribute;
    /**
     * Lets you set the spacing between rows.
     *
     * @param { BarState } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Lets you set the spacing between rows.
     *
     * @param { BarState } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Lets you set the spacing between rows.
     *
     * @param { BarState } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollBar(value: BarState): GridAttribute;
    /**
     * Set scrollbar position.
     *
     * @param { function } event - callback of grid scroll,
     * index is the current first displayed item, offset is the grid offset,
     * return ComputedBarAttribute to update scrollbar position and height.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set scrollbar position.
     *
     * @param { function } event - callback of grid scroll,
     * index is the current first displayed item, offset is the grid offset,
     * return ComputedBarAttribute to update scrollbar position and height.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollBarUpdate(event: (index: number, offset: number) => ComputedBarAttribute): GridAttribute;
    /**
     * Called when the first item displayed in the grid changes.
     *
     * @param { function } event - of grid scroll,
     * first is the index of the first item of the grid.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the first or last item displayed in the grid changes.
     *
     * @param { function } event - of grid scroll,
     * first is the index of the first item displayed in the grid,
     * last is the index of the last item displayed in the grid.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the first or last item displayed in the grid changes.
     *
     * @param { function } event - of grid scroll,
     * first is the index of the first item displayed in the grid,
     * last is the index of the last item displayed in the grid.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollIndex(event: (first: number, last: number) => void): GridAttribute;
    /**
     * cached Count
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * cached Count
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * cached Count
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    cachedCount(value: number): GridAttribute;
    /**
     * editMode
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * editMode
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * editMode
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    editMode(value: boolean): GridAttribute;
    /**
     * Called when judging whether it is multiSelectable.
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when judging whether it is multiSelectable.
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when judging whether it is multiSelectable.
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    multiSelectable(value: boolean): GridAttribute;
    /**
     * maxCount
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * maxCount
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * maxCount
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maxCount(value: number): GridAttribute;
    /**
     * minCount
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * minCount
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * minCount
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    minCount(value: number): GridAttribute;
    /**
     * cellLength
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * cellLength
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * cellLength
     *
     * @param { number } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    cellLength(value: number): GridAttribute;
    /**
     * Control GridDirection of the grid.
     *
     * @param { GridDirection } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Control GridDirection of the grid.
     *
     * @param { GridDirection } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Control GridDirection of the grid.
     *
     * @param { GridDirection } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    layoutDirection(value: GridDirection): GridAttribute;
    /**
     * Control if the grid supports animation.
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Control if the grid supports animation.
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Control if the grid supports animation.
     *
     * @param { boolean } value
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    supportAnimation(value: boolean): GridAttribute;
    /**
     * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
     * (To be triggered, press and hold for 170 milliseconds (ms))
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
     * (To be triggered, press and hold for 170 milliseconds (ms))
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
     * (To be triggered, press and hold for 170 milliseconds (ms))
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onItemDragStart(event: (event: ItemDragInfo, itemIndex: number) => (() => any) | void): GridAttribute;
    /**
     * After binding, a callback is triggered when the component is dragged to the range of the component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * After binding, a callback is triggered when the component is dragged to the range of the component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * After binding, a callback is triggered when the component is dragged to the range of the component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onItemDragEnter(event: (event: ItemDragInfo) => void): GridAttribute;
    /**
     * After binding, a callback is triggered when the drag moves within the range of a placeable component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * After binding, a callback is triggered when the drag moves within the range of a placeable component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * After binding, a callback is triggered when the drag moves within the range of a placeable component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onItemDragMove(event: (event: ItemDragInfo, itemIndex: number, insertIndex: number) => void): GridAttribute;
    /**
     * After binding, a callback is triggered when the component is dragged out of the component range.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * After binding, a callback is triggered when the component is dragged out of the component range.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * After binding, a callback is triggered when the component is dragged out of the component range.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onItemDragLeave(event: (event: ItemDragInfo, itemIndex: number) => void): GridAttribute;
    /**
     * The component bound to this event can be used as the drag release target.
     * This callback is triggered when the drag behavior is stopped within the scope of the component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The component bound to this event can be used as the drag release target.
     * This callback is triggered when the drag behavior is stopped within the scope of the component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The component bound to this event can be used as the drag release target.
     * This callback is triggered when the drag behavior is stopped within the scope of the component.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onItemDrop(event: (event: ItemDragInfo, itemIndex: number, insertIndex: number, isSuccess: boolean) => void): GridAttribute;
    /**
     * Called when the sliding effect is set.
     *
     * @param { EdgeEffect } value - Scroll effect. For details, see EdgeEffect.
     * @returns { GridAttribute } The attribute of the grid
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the sliding effect is set.
     *
     * @param { EdgeEffect } value
     * @param { EdgeEffectOptions } options
     * @returns { GridAttribute } The attribute of the grid
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    edgeEffect(value: EdgeEffect, options?: EdgeEffectOptions): GridAttribute;
    /**
     * Called to setting the nested scroll options.
     *
     * @param { NestedScrollOptions } value - options for nested scrolling.
     * @returns { GridAttribute } the attribute of the grid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Called to setting the nested scroll options.
     *
     * @param { NestedScrollOptions } value - options for nested scrolling.
     * @returns { GridAttribute } the attribute of the grid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    nestedScroll(value: NestedScrollOptions): GridAttribute;
    /**
     * Called when setting whether to enable scroll by gesture or mouse.
     *
     * @param { boolean } value
     * @returns { GridAttribute } The attribute of the grid
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when setting whether to enable scroll by gesture or mouse.
     *
     * @param { boolean } value
     * @returns { GridAttribute } The attribute of the grid
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableScrollInteraction(value: boolean): GridAttribute;
    /**
     * Called to setting the friction.
     *
     * @param { number | Resource } value - options for scrolling friction.
     * @returns { GridAttribute } the attribute of the grid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called to setting the friction.
     *
     * @param { number | Resource } value - options for scrolling friction.
     * @returns { GridAttribute } the attribute of the grid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    friction(value: number | Resource): GridAttribute;
    /**
     * Called When sliding the grid.
     *
     * @param { function } event - callback of grid scroll,
     * scrollOffset is offset per frame scrolling, ScrollState is current sliding state.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called When sliding the grid.
     *
     * @param { function } event - callback of grid scroll,
     * scrollOffset is offset per frame scrolling, ScrollState is current sliding state.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     * @useinstead common.ScrollableCommonMethod#onDidScroll
     */
    onScroll(event: (scrollOffset: number, scrollState: ScrollState) => void): GridAttribute;
    /**
     * Called when the grid begins to arrive.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the grid begins to arrive.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onReachStart(event: () => void): GridAttribute;
    /**
     * Called when the grid reaches the end.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the grid reaches the end.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onReachEnd(event: () => void): GridAttribute;
    /**
     * Called when the slider start.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the slider start.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollStart(event: () => void): GridAttribute;
    /**
     * Called when the slider stops.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the slider stops.
     *
     * @param { function } event
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollStop(event: () => void): GridAttribute;
    /**
     * Called when scrolling begin each frame.
     *
     * @param { function } event - callback of grid scroll,
     * offset is the amount of sliding that is about to occur, state is current sliding state,
     * return number to actual sliding offset.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when scrolling begin each frame.
     *
     * @param { function } event - callback of grid scroll,
     * offset is the amount of sliding that is about to occur, state is current sliding state,
     * return number to actual sliding offset.
     * @returns { GridAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollFrameBegin(event: (offset: number, state: ScrollState) => {
        offsetRemain: number;
    }): GridAttribute;
}
/**
 * Defines Grid Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Grid Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Grid Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const Grid: GridInterface;
/**
 * Defines Grid Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Grid Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Grid Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const GridInstance: GridAttribute;
