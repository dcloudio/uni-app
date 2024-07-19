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
 * Content scroll direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Content scroll direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Content scroll direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum ScrollDirection {
    /**
     * Vertical scrolling is supported.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Vertical scrolling is supported.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Vertical scrolling is supported.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Vertical,
    /**
     * Horizontal scrolling is supported.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Horizontal scrolling is supported.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Horizontal scrolling is supported.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Horizontal,
    /**
     * Free scrolling is supported.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    Free,
    /**
     * Non-scrollable.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Non-scrollable.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Non-scrollable.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    None
}
/**
 * ScrollAlign.
 *
 * @enum { number } ScrollAlign
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * ScrollAlign.
 *
 * @enum { number } ScrollAlign
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum ScrollAlign {
    /**
     * Start position alignment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Start position alignment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    START,
    /**
     * Center alignment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Center alignment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    CENTER,
    /**
     * End position alignment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * End position alignment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    END,
    /**
     * Scroll the minimum distance to fully display the specified item.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Scroll the minimum distance to fully display the specified item.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    AUTO
}
/**
 * OffsetResult info.
 *
 * @interface OffsetResult
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface OffsetResult {
    /**
     * The X-axis offset.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    xOffset: number;
    /**
     * The y-axis offset.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    yOffset: number;
}
/**
 * Define scroll edge options
 *
 * @interface ScrollEdgeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ScrollEdgeOptions {
    /**
     * The fasten speed of scrolling to the edge, unit is vp/s.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    velocity?: number;
}
/**
 * Define scrollToIndex options
 *
 * @interface ScrollToIndexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface ScrollToIndexOptions {
    /**
     * The extra offset of scrolling to the index, unit is vp.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    extraOffset?: LengthMetrics;
}
/**
 * Provides custom animation parameters.
 *
 * @interface ScrollAnimationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface ScrollAnimationOptions {
    /**
     * Set the duration of the animation.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    duration?: number;
    /**
     * Set the curve of the animation.
     *
     * @type { ?(Curve | ICurve) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    curve?: Curve | ICurve;
    /**
     * Set whether the animation can over the boundary.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    canOverScroll?: boolean;
}
/**
 * OffsetOptions info.
 *
 * @interface OffsetOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface OffsetOptions {
    /**
     * The X-axis offset.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    xOffset?: Dimension;
    /**
     * The y-axis offset.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    yOffset?: Dimension;
}
/**
 * Scroller
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Scroller
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Scroller
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class Scroller {
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
     */
    /**
     * constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    constructor();
    /**
     * Called when the setting slides to the specified position.
     *
     * @param { object } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the setting slides to the specified position.
     *
     * @param { object } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the setting slides to the specified position.
     *
     * @param { object } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollTo(value: {
        /**
         * The X-axis offset.
         *
         * @type { number | string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * The X-axis offset.
         *
         * @type { number | string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        xOffset: number | string;
        /**
         * The Y-axis offset.
         *
         * @type { number | string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * The Y-axis offset.
         *
         * @type { number | string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        yOffset: number | string;
        /**
         * Descriptive animation.
         *
         * @type { ?({ duration?: number; curve?: Curve | ICurve } | boolean) } The object type provides custom animation parameters
         * and the boolean type enables default spring animation.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Descriptive animation.
         *
         * @type { ?({ duration?: number; curve?: Curve | ICurve } | boolean) } The object type provides custom animation parameters
         * and the boolean type enables default spring animation.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Descriptive animation.
         *
         * @type { ?( ScrollAnimationOptions | boolean) } The ScrollAnimationOptions type provides custom animation parameters
         * and the boolean type enables default spring animation.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        animation?: ScrollAnimationOptions | boolean;
    });
    /**
     * Called when scrolling to the edge of the container.
     *
     * @param { Edge } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when scrolling to the edge of the container.
     *
     * @param { Edge } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when scrolling to the edge of the container.
     *
     * @param { Edge } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Called when scrolling to the edge of the container.
     *
     * @param { Edge } value - Edge type of the container.
     * @param { ScrollEdgeOptions } [options] - Options of scrolling to edge.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    scrollEdge(value: Edge, options?: ScrollEdgeOptions);
    /**
     * Fling the scroll view.
     *
     * @param { number } velocity - initial velocity of fling, in vp/s.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100004 - Controller not bound to component.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fling(velocity: number): void;
    /**
     * Called when page turning mode is set.
     *
     * @param { object } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when page turning mode is set.
     *
     * @param { object } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when page turning mode is set.
     *
     * @param { object } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollPage(value: {
        next: boolean;
    });
    /**
     * Called when page turning mode is set.
     *
     * @param { object } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     */
    scrollPage(value: {
        next: boolean;
        direction?: Axis;
    });
    /**
     * Called when viewing the scroll offset.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when viewing the scroll offset.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when viewing the scroll offset.
     *
     * @returns { OffsetResult }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    currentOffset(): OffsetResult;
    /**
     * Called when sliding to the specified index.
     *
     * @param { number } value
     * @param { boolean } smooth
     * @param { ScrollAlign } align
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when sliding to the specified index.
     *
     * @param { number } value - Index to jump to.
     * @param { boolean } smooth - If true, scroll to index item with animation. If false, scroll to index item without animation.
     * @param { ScrollAlign } align - Sets the alignment mode of a specified index.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when sliding to the specified index.
     *
     * @param { number } value - Index to jump to.
     * @param { boolean } smooth - If true, scroll to index item with animation. If false, scroll to index item without animation.
     * @param { ScrollAlign } align - Sets the alignment mode of a specified index.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Scroll to the specified index.
     *
     * @param { number } value - Index to jump to.
     * @param { boolean } [smooth] - If true, scroll to index item with animation. If false, scroll to index item without animation.
     * @param { ScrollAlign } [align] - Sets the alignment mode of a specified index.
     * @param { options } [ScrollToIndexOptions] - Sets the options of a specified index, such as extra offset.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    scrollToIndex(value: number, smooth?: boolean, align?: ScrollAlign, options?: ScrollToIndexOptions);
    /**
     * Called when the setting slides by offset.
     *
     * @param { Length } dx
     * @param { Length } dy
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the setting slides by offset.
     *
     * @param { Length } dx
     * @param { Length } dy
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the setting slides by offset.
     *
     * @param { Length } dx
     * @param { Length } dy
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollBy(dx: Length, dy: Length);
    /**
     * Indicates whether the component scrolls to the end position.
     *
     * @returns { boolean } Returns whether the component scrolls to the end position.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates whether the component scrolls to the end position.
     *
     * @returns { boolean } Returns whether the component scrolls to the end position.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    isAtEnd(): boolean;
    /**
     * Get child item size and position.
     *
     * @param { number } index - Index of the item.
     * @returns { RectResult } Returns the size and position.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100004 - Controller not bound to component.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Get child item size and position.
     *
     * @param { number } index - Index of the item.
     * @returns { RectResult } Returns the size and position.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100004 - Controller not bound to component.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getItemRect(index: number): RectResult;
}
/**
 * Define scroll snap options
 *
 * @interface ScrollSnapOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Define scroll snap options
 *
 * @interface ScrollSnapOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare interface ScrollSnapOptions {
    /**
     * Set scroll snap alignment.
     *
     * @type { ScrollSnapAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set scroll snap alignment.
     *
     * @type { ScrollSnapAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    snapAlign: ScrollSnapAlign;
    /**
     * Set snap positions. When the type of snapPositions is Dimension, Scroll content is paginated by an integer
     * multiple of snapPositions. When the type of snapPositions is Array<number>, Scroll content is paginated based
     * on the array of snapPositions.
     *
     * @type { ?(Dimension | Array<Dimension>) }
     * @default 100%
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set snap positions. When the type of snapPositions is Dimension, Scroll content is paginated by an integer
     * multiple of snapPositions. When the type of snapPositions is Array<number>, Scroll content is paginated based
     * on the array of snapPositions.
     *
     * @type { ?(Dimension | Array<Dimension>) }
     * @default 100%
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    snapPagination?: Dimension | Array<Dimension>;
    /**
     * Set whether the beginning of the Scroll content counts an a snap.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set whether the beginning of the Scroll content counts an a snap.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    enableSnapToStart?: boolean;
    /**
     * Set whether the end of the Scroll content counts an a snap.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set whether the end of the Scroll content counts an a snap.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    enableSnapToEnd?: boolean;
}
/**
 * Provides interfaces for scrollable containers.
 *
 * @interface ScrollInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides interfaces for scrollable containers.
 *
 * @interface ScrollInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides interfaces for scrollable containers.
 *
 * @interface ScrollInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ScrollInterface {
    /**
     * Called when a scrollable container is set.
     *
     * @param { Scroller } scroller
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when a scrollable container is set.
     *
     * @param { Scroller } scroller
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when a scrollable container is set.
     *
     * @param { Scroller } scroller
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (scroller?: Scroller): ScrollAttribute;
}
/**
 * Defines the scroll attribute functions.
 *
 * @extends CommonMethod<ScrollAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the scroll attribute functions.
 *
 * @extends CommonMethod<ScrollAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the scroll attribute functions.
 *
 * @extends ScrollableCommonMethod<ScrollAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class ScrollAttribute extends ScrollableCommonMethod<ScrollAttribute> {
    /**
     * Called when the scroll method is slid.
     *
     * @param { ScrollDirection } value
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the scroll method is slid.
     *
     * @param { ScrollDirection } value
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the scroll method is slid.
     *
     * @param { ScrollDirection } value
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollable(value: ScrollDirection): ScrollAttribute;
    /**
     * Called when the setting slides to the specified position.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the setting slides to the specified position.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the setting slides to the specified position.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @deprecated since 12
     * @useinstead scroll/Scroll#onWillScroll
     *
     */
    onScroll(event: (xOffset: number, yOffset: number) => void): ScrollAttribute;
    /**
     * Called when the Scroll will scroll.
     *
     * @param { ScrollOnWillScrollCallback } handler - callback of Scroll
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onWillScroll(handler: ScrollOnWillScrollCallback): ScrollAttribute;
    /**
     * Called when the Scroll did scroll.
     *
     * @param { ScrollOnScrollCallback } handler - callback of Scroll,
     * xOffset and yOffset are offsets this frame did scroll, scrollState is current scroll state.
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onDidScroll(handler: ScrollOnScrollCallback): ScrollAttribute;
    /**
     * Called when scrolling to the edge of the container.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when scrolling to the edge of the container.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when scrolling to the edge of the container.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollEdge(event: (side: Edge) => void): ScrollAttribute;
    /**
     * Called when scrolling start.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when scrolling start.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when scrolling start.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollStart(event: () => void): ScrollAttribute;
    /**
     * Called when scrolling has stopped.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 9
     * @useinstead scroll/Scroll#onScrollStop
     */
    onScrollEnd(event: () => void): ScrollAttribute;
    /**
     * Called when scrolling has stopped.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when scrolling has stopped.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when scrolling has stopped.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollStop(event: () => void): ScrollAttribute;
    /**
     * Called when the status of the scroll bar is set.
     *
     * @param { BarState } barState
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the status of the scroll bar is set.
     *
     * @param { BarState } barState
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the status of the scroll bar is set.
     *
     * @param { BarState } barState
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollBar(barState: BarState): ScrollAttribute;
    /**
     * Called when the color of the scroll bar is set.
     *
     * @param { Color | number | string } color
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the color of the scroll bar is set.
     *
     * @param { Color | number | string } color
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the color of the scroll bar is set.
     *
     * @param { Color | number | string } color
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollBarColor(color: Color | number | string): ScrollAttribute;
    /**
     * Called when the width of the scroll bar is set.
     *
     * @param { number | string } value
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the width of the scroll bar is set.
     *
     * @param { number | string } value
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the width of the scroll bar is set.
     *
     * @param { number | string } value
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollBarWidth(value: number | string): ScrollAttribute;
    /**
     * Called when the sliding effect is set.
     *
     * @param { EdgeEffect } edgeEffect
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the sliding effect is set.
     *
     * @param { EdgeEffect } edgeEffect
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the sliding effect is set.
     *
     * @param { EdgeEffect } edgeEffect
     * @param { EdgeEffectOptions } options
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    edgeEffect(edgeEffect: EdgeEffect, options?: EdgeEffectOptions): ScrollAttribute;
    /**
     * Called when scrolling begin each frame.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when scrolling begin each frame.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when scrolling begin each frame.
     *
     * @param { function } event
     * @returns { ScrollAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onScrollFrameBegin(event: (offset: number, state: ScrollState) => {
        offsetRemain: number;
    }): ScrollAttribute;
    /**
     * Called to setting the nested scroll options.
     *
     * @param { NestedScrollOptions } value - options for nested scrolling.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Called to setting the nested scroll options.
     *
     * @param { NestedScrollOptions } value - options for nested scrolling.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    nestedScroll(value: NestedScrollOptions): ScrollAttribute;
    /**
     * Called when setting whether to enable scroll by gesture or mouse.
     *
     * @param { boolean } value
     * @returns { ScrollAttribute } The attribute of the scroll
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when setting whether to enable scroll by gesture or mouse.
     *
     * @param { boolean } value
     * @returns { ScrollAttribute } The attribute of the scroll
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableScrollInteraction(value: boolean): ScrollAttribute;
    /**
     * Called to setting the friction.
     *
     * @param { number | Resource } value - options for scrolling friction.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called to setting the friction.
     *
     * @param { number | Resource } value - options for scrolling friction.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    friction(value: number | Resource): ScrollAttribute;
    /**
     * Called to setting the scroll snap options.
     *
     * @param { ScrollSnapOptions } value - options for scroll snap.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Called to setting the scroll snap options.
     *
     * @param { ScrollSnapOptions } value - options for scroll snap.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    scrollSnap(value: ScrollSnapOptions): ScrollAttribute;
    /**
     * Determines whether the scroll view stops on multiples of the content size when the user scrolls.
     *
     * @param { boolean } value - A boolean value determines whether paging is enabled for scroll.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Determines whether the scroll view stops on multiples of the content size when the user scrolls.
     *
     * @param { boolean } value - A boolean value determines whether paging is enabled for scroll.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    enablePaging(value: boolean): ScrollAttribute;
    /**
     * Called to setting the initial offset
     *
     * @param { OffsetOptions } value - options for scroll initial offset.
     * @returns { ScrollAttribute } the attribute of the scroll.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    initialOffset(value: OffsetOptions): ScrollAttribute;
}
/**
 * callback of Scroll, using in onDidScroll.
 *
 * @typedef { function } ScrollOnScrollCallback
 * @param { number } xOffset - horizontal offset this frame did scroll.
 * @param { number } yOffset - vertical offset this frame did scroll.
 * @param { ScrollState } scrollState - current scroll state.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare type ScrollOnScrollCallback = (xOffset: number, yOffset: number, scrollState: ScrollState) => void;
/**
  * Called before scroll to allow developer to control real offset the Scroll can scroll.
  *
  * @typedef { function } ScrollOnWillScrollCallback
  * @param { number } xOffset - horizontal offset this frame will scroll, which may or may not be reached.
  * @param { number } yOffset - vertical offset this frame will scroll, which may or may not be reached.
  * @param { ScrollState } scrollState - current scroll state.
  * @param { ScrollSource } scrollSource - source of current scroll.
  * @returns { void | OffsetResult } the remain offset for the Scroll,
  *     same as (xOffset, yOffset) when no OffsetResult is returned.
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @since 12
  */
declare type ScrollOnWillScrollCallback = (xOffset: number, yOffset: number, scrollState: ScrollState, scrollSource: ScrollSource) => void | OffsetResult;
/**
 * Defines Scroll Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Scroll Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Scroll Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const Scroll: ScrollInterface;
/**
 * Defines Scroll Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Scroll Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Scroll Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const ScrollInstance: ScrollAttribute;
