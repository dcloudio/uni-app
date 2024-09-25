/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
 * function that returns item main size by index.
 *
 * @typedef { function } GetItemMainSizeByIndex
 * @param { number } index - the index of FlowItem
 * @returns { number } main size of the FlowItem at index
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare type GetItemMainSizeByIndex = (index: number) => number;
/**
 * Defines the water flow section options.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
*/
declare class SectionOptions {
    /**
     * The number of FlowItems in this section.
     *
     * @type { number } itemsCount - the number of FlowItems in this section
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    itemsCount: number;
    /**
     * The columns of this section in vertical layout, or rows in horizontal layout.
     *
     * @type { ?number } crossCount - cross count of this section
     * @default 1 one column in vertical layout, or one row in horizontal layout
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    crossCount?: number;
    /**
     * Asks the developer for the main size in vp of the flow item with the specified index.
     * The water flow layout uses the size measured after the flow item is created if not set.
     *
     * @type { ?GetItemMainSizeByIndex } onGetItemMainSizeByIndex - function that returns item main size by index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onGetItemMainSizeByIndex?: GetItemMainSizeByIndex;
    /**
     * Set the spacing between columns of this section.
     *
     * @type { ?Dimension } columnsGap - column gap of this section
     * same with columnsGap of WaterFlow if not set
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    columnsGap?: Dimension;
    /**
     * Set the spacing between rows of this section.
     *
     * @type { ?Dimension } rowsGap - row gap of this section
     * same with rowsGap of WaterFlow if not set
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    rowsGap?: Dimension;
    /**
     * Outer margin of this section.
     *
     * @type { ?(Margin | Dimension) } margin - outer margin of this section
     * @default {top: 0, right: 0, bottom: 0, left: 0}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    margin?: Margin | Dimension;
}
/**
 * Indicates the sections of WaterFlow.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class WaterFlowSections {
    /**
     * Creates an instance of WaterFlowSections.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor();
    /**
     * Changes sections in the WaterFlow by removing or replacing existing elements and/or adding new elements in place.
     *
     * @param { number } start - Zero-based index at which to start changing the sections.
     * @param { number } [deleteCount] - Indicating the number of sections in the WaterFlow to remove from start.
     * @param { Array<SectionOptions> } [sections] - The new sections to add to the WaterFlow, beginning from start.
     * @returns { boolean } Whether the splice was successful.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    splice(start: number, deleteCount?: number, sections?: Array<SectionOptions>): boolean;
    /**
     * Pushes a new section to the end of WaterFlow.
     *
     * @param { SectionOptions } section - new section options.
     * @returns { boolean } Whether the push was successful.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    push(section: SectionOptions): boolean;
    /**
     * Updates section at specified section index.
     *
     * @param { number } sectionIndex - index of section to be updated.
     * @param { SectionOptions } section - new section options.
     * @returns { boolean } Whether the update was successful.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    update(sectionIndex: number, section: SectionOptions): boolean;
    /**
     * Obtains all the section options in the WaterFlow.
     *
     * @returns { Array<SectionOptions> } Returns all the section options in the WaterFlow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    values(): Array<SectionOptions>;
    /**
     * Obtains the section counts in the WaterFlow.
     *
     * @returns { number } Returns section counts in the WaterFlow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    length(): number;
}
/**
 * Defines the water flow options.
 *
 * @interface WaterFlowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the water flow options.
 *
 * @interface WaterFlowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the water flow options.
 *
 * @interface WaterFlowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface WaterFlowOptions {
    /**
     * Describes the water flow footer.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Describes the water flow footer.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the water flow footer.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    footer?: CustomBuilder;
    /**
     * Describes the water flow scroller.
     *
     * @type { ?Scroller }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Describes the water flow scroller.
     *
     * @type { ?Scroller }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the water flow scroller.
     *
     * @type { ?Scroller }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scroller?: Scroller;
    /**
     * Describes the sections with different cross count that compose the water flow.
     *
     * @type { ?WaterFlowSections } sections - sections with different cross count
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    sections?: WaterFlowSections;
}
/**
 * Defines the water flow interface.
 *
 * @interface WaterFlowInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the water flow interface.
 *
 * @interface WaterFlowInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the water flow interface.
 *
 * @interface WaterFlowInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface WaterFlowInterface {
    /**
     * WaterFlow is returned when the parameter is transferred. Only support api: scrollToIndex
     *
     * @param { WaterFlowOptions } options
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * WaterFlow is returned when the parameter is transferred. Only support api: scrollToIndex
     *
     * @param { WaterFlowOptions } options
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * WaterFlow is returned when the parameter is transferred. Only support api: scrollToIndex
     *
     * @param { WaterFlowOptions } options
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (options?: WaterFlowOptions): WaterFlowAttribute;
}
/**
 * Defines the water flow attribute.
 *
 * @extends CommonMethod<WaterFlowAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the water flow attribute.
 *
 * @extends CommonMethod<WaterFlowAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the water flow attribute.
 *
 * @extends ScrollableCommonMethod<WaterFlowAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class WaterFlowAttribute extends ScrollableCommonMethod<WaterFlowAttribute> {
    /**
     * This parameter specifies the number of columns in the current waterflow.
     *
     * @param { string } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * This parameter specifies the number of columns in the current waterflow.
     *
     * @param { string } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * This parameter specifies the number of columns in the current waterflow.
     *
     * @param { string } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    columnsTemplate(value: string): WaterFlowAttribute;
    /**
     * This parameter specifies the min or max size of each item.
     *
     * @param { ConstraintSizeOptions } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * This parameter specifies the min or max size of each item.
     *
     * @param { ConstraintSizeOptions } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * This parameter specifies the min or max size of each item.
     *
     * @param { ConstraintSizeOptions } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    itemConstraintSize(value: ConstraintSizeOptions): WaterFlowAttribute;
    /**
     * Set the number of rows in the current waterflow.
     *
     * @param { string } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Set the number of rows in the current waterflow.
     *
     * @param { string } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the number of rows in the current waterflow.
     *
     * @param { string } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    rowsTemplate(value: string): WaterFlowAttribute;
    /**
     * Set the spacing between columns.
     *
     * @param { Length } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Set the spacing between columns.
     *
     * @param { Length } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the spacing between columns.
     *
     * @param { Length } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    columnsGap(value: Length): WaterFlowAttribute;
    /**
     * Set the spacing between rows.
     *
     * @param { Length } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Set the spacing between rows.
     *
     * @param { Length } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the spacing between rows.
     *
     * @param { Length } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    rowsGap(value: Length): WaterFlowAttribute;
    /**
     * Control layout direction of the WaterFlow.
     *
     * @param { FlexDirection } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Control layout direction of the WaterFlow.
     *
     * @param { FlexDirection } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Control layout direction of the WaterFlow.
     *
     * @param { FlexDirection } value
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    layoutDirection(value: FlexDirection): WaterFlowAttribute;
    /**
     * Called to setting the nested scroll options.
     *
     * @param { NestedScrollOptions } value - options for nested scrolling.
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Called to setting the nested scroll options.
     *
     * @param { NestedScrollOptions } value - options for nested scrolling.
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    nestedScroll(value: NestedScrollOptions): WaterFlowAttribute;
    /**
     * Called when setting whether to enable scroll by gesture or mouse.
     * @param { boolean } value
     * @returns { WaterFlowAttribute } The attribute of the waterflow
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when setting whether to enable scroll by gesture or mouse.
     * @param { boolean } value
     * @returns { WaterFlowAttribute } The attribute of the waterflow
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableScrollInteraction(value: boolean): WaterFlowAttribute;
    /**
     * Called to setting the friction.
     * @param { number | Resource } value - options for scrolling friction.
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called to setting the friction.
     * @param { number | Resource } value - options for scrolling friction.
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    friction(value: number | Resource): WaterFlowAttribute;
    /**
     * Called to set number of flow items to be preloaded (cached) in LazyForEach.
     * @param { number } value - number of flow items to be preloaded (cached).
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called to set number of flow items to be preloaded (cached) in LazyForEach.
     * @param { number } value - number of flow items to be preloaded (cached).
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    cachedCount(value: number): WaterFlowAttribute;
    /**
     * Called when the water flow begins to arrive.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the water flow begins to arrive.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the water flow begins to arrive.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onReachStart(event: () => void): WaterFlowAttribute;
    /**
     * Called when the water flow reaches the end.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the water flow reaches the end.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the water flow reaches the end.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onReachEnd(event: () => void): WaterFlowAttribute;
    /**
     * Called when scrolling begin each frame.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when scrolling begin each frame.
     *
     * @param { function } event
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollFrameBegin(event: (offset: number, state: ScrollState) => {
        offsetRemain: number;
    }): WaterFlowAttribute;
    /**
     * Called when the first or last item displayed in the waterflow changes.
     *
     * @param { function } event - Callback function, triggered when the first or last item
     * displayed in the waterflow changes.
     * "first": the index of the first item displayed in the waterflow,
     * "last": the index of the last item displayed in the waterflow.
     * @returns { WaterFlowAttribute } the attribute of the water flow.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollIndex(event: (first: number, last: number) => void): WaterFlowAttribute;
}
/**
 * Defines WaterFlow Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines WaterFlow Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines WaterFlow Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const WaterFlow: WaterFlowInterface;
/**
 * Defines WaterFlow Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines WaterFlow Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines WaterFlow Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const WaterFlowInstance: WaterFlowAttribute;
