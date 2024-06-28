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
 * Declare the graphic format of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the graphic format of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the graphic format of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum BarMode {
    /**
     * The actual layout width of the TabBar is used. If the width exceeds the total width, you can slide the tabbar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The actual layout width of the TabBar is used. If the width exceeds the total width, you can slide the tabbar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The actual layout width of the TabBar is used. If the width exceeds the total width, you can slide the tabbar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Scrollable = 0,
    /**
     * The width of all TabBars is evenly allocated.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The width of all TabBars is evenly allocated.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The width of all TabBars is evenly allocated.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Fixed = 1
}
/**
 * Declare the animation mode of tab content.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare enum AnimationMode {
    /**
     * Start animation after tabcontent is fully measured.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    CONTENT_FIRST = 0,
    /**
     * Start animation before tabcontent is fully measured.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    ACTION_FIRST = 1,
    /**
     * Disable default animation.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    NO_ANIMATION = 2
}
/**
 * Declare the location of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the location of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the location of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum BarPosition {
    /**
     * When the vertical attribute method is set to true, the tab is on the left of the container. When the vertical property method is set to false, the tab is at the top of the container.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * When the vertical attribute method is set to true, the tab is on the left of the container. When the vertical property method is set to false, the tab is at the top of the container.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * When the vertical attribute method is set to true, the tab is on the left of the container. When the vertical property method is set to false, the tab is at the top of the container.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Start,
    /**
     * When the vertical attribute method is set to true, the tab is located on the right of the container. When the vertical property method is set to false, the tab is at the bottom of the container.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * When the vertical attribute method is set to true, the tab is located on the right of the container. When the vertical property method is set to false, the tab is at the bottom of the container.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * When the vertical attribute method is set to true, the tab is located on the right of the container. When the vertical property method is set to false, the tab is at the bottom of the container.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    End
}
/**
 * Declare the layout style of the tab bar items.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the layout style of the tab bar items.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum LayoutStyle {
    /**
     * The tab bar items are laid in the center of the tab bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The tab bar items are laid in the center of the tab bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    ALWAYS_CENTER = 0,
    /**
     * The tab bar items are laid in the tab bar by an average split.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The tab bar items are laid in the tab bar by an average split.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    ALWAYS_AVERAGE_SPLIT = 1,
    /**
     * The tab bar items are laid in the center of the bar when their total length is more than half of the tab bar.
     * Otherwise, they are laid in the center half of the tab bar with the same space between them.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The tab bar items are laid in the center of the bar when their total length is more than half of the tab bar.
     * Otherwise, they are laid in the center half of the tab bar with the same space between them.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    SPACE_BETWEEN_OR_CENTER = 2
}
/**
 * Provides methods for switching tabs.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides methods for switching tabs.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides methods for switching tabs.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class TabsController {
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
     * Called when the tab is switched.
     *
     * @param { number } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the tab is switched.
     *
     * @param { number } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the tab is switched.
     *
     * @param { number } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    changeIndex(value: number): void;
}
/**
 * Provides an interface for switching views.
 *
 * @interface TabsInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for switching views.
 *
 * @interface TabsInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for switching views.
 *
 * @interface TabsInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface TabsInterface {
    /**
     * Called when the view is switched.
     *
     * @param { object } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the view is switched.
     *
     * @param { object } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the view is switched.
     *
     * @param { object } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (value?: {
        barPosition?: BarPosition;
        index?: number;
        controller?: TabsController;
    }): TabsAttribute;
}
/**
 * Provides an interface for the style of an divider including stroke width, color, start margin
 * and end margin
 *
 * @interface DividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the style of an divider including stroke width, color, start margin
 * and end margin
 *
 * @interface DividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface DividerStyle {
    /**
     * Define the stroke width of the divider
     *
     * @type { Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the stroke width of the divider
     *
     * @type { Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    strokeWidth: Length;
    /**
     * Define the color of the divider
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the color of the divider
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    color?: ResourceColor;
    /**
     * Define the start margin of the divider
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the start margin of the divider
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    startMargin?: Length;
    /**
     * Define the end margin of the divider
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the end margin of the divider
     *
     * @type { ?Length }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    endMargin?: Length;
}
/**
 * Provides an interface for tabs animation.
 *
 * @interface TabsAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Provides an interface for tabs animation.
 *
 * @interface TabsAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface TabsAnimationEvent {
    /**
     * Offset of the current page to the start position of the tabs main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Offset of the current page to the start position of the tabs main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    currentOffset: number;
    /**
     * Offset of the target page to the start position of the tabs main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Offset of the target page to the start position of the tabs main axis. The unit is vp.
     *
     * @type { number }
     * @default 0.0 vp
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    targetOffset: number;
    /**
     * Start speed of the page-turning animation. The unit is vp/s.
     *
     * @type { number }
     * @default 0.0 vp/s
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Start speed of the page-turning animation. The unit is vp/s.
     *
     * @type { number }
     * @default 0.0 vp/s
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    velocity: number;
}
/**
 * Provides an interface for the grid column options of an tab bar including sm, md, lg, margin and gutter.
 *
 * @interface BarGridColumnOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the grid column options of an tab bar including sm, md, lg, margin and gutter.
 *
 * @interface BarGridColumnOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface BarGridColumnOptions {
    /**
     * Define the occupied column number when the screen is of small size
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the occupied column number when the screen is of small size
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    sm?: number;
    /**
     * Define the occupied column number when the screen is of middle size
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the occupied column number when the screen is of middle size
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    md?: number;
    /**
     * Define the occupied column number when the screen is of large size
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the occupied column number when the screen is of large size
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    lg?: number;
    /**
     * Define the margin size of the columns
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the margin size of the columns
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    margin?: Dimension;
    /**
     * Define the gutter size of the columns
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the gutter size of the columns
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    gutter?: Dimension;
}
/**
 * Provides an interface for the options for the scrollable bar mode including margin and nonScrollableLayoutStyle.
 *
 * @interface ScrollableBarModeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the options for the scrollable bar mode including margin and nonScrollableLayoutStyle.
 *
 * @interface ScrollableBarModeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ScrollableBarModeOptions {
    /**
     * Define the margin size of the bar items when the tab bar is scrollable.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the margin size of the bar items when the tab bar is scrollable.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    margin?: Dimension;
    /**
     * Define the layout style of the bar items when the tab bar is not scrollable.
     *
     * @type { ?LayoutStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the layout style of the bar items when the tab bar is not scrollable.
     *
     * @type { ?LayoutStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    nonScrollableLayoutStyle?: LayoutStyle;
}
/**
 * Defines the tabs attribute functions.
 *
 * @extends CommonMethod<TabsAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the tabs attribute functions.
 *
 * @extends CommonMethod<TabsAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the tabs attribute functions.
 *
 * @extends CommonMethod<TabsAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class TabsAttribute extends CommonMethod<TabsAttribute> {
    /**
     * Called when determining whether the tab is vertical.
     *
     * @param { boolean } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when determining whether the tab is vertical.
     *
     * @param { boolean } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when determining whether the tab is vertical.
     *
     * @param { boolean } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    vertical(value: boolean): TabsAttribute;
    /**
     * Called when determining the location of the bar chart.
     *
     * @param { BarPosition } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when determining the location of the bar chart.
     *
     * @param { BarPosition } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when determining the location of the bar chart.
     *
     * @param { BarPosition } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barPosition(value: BarPosition): TabsAttribute;
    /**
     * Called when judging whether page switching can be performed by sliding left and right.
     *
     * @param { boolean } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when judging whether page switching can be performed by sliding left and right.
     *
     * @param { boolean } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when judging whether page switching can be performed by sliding left and right.
     *
     * @param { boolean } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scrollable(value: boolean): TabsAttribute;
    /**
     * Called when the graphic format of the bar chart is selected as fixed mode.
     *
     * @param { BarMode.Fixed } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the graphic format of the bar chart is selected as fixed mode.
     *
     * @param { BarMode.Fixed } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barMode(value: BarMode.Fixed): TabsAttribute;
    /**
     * Called when the graphic format of the bar chart is selected as scrollable mode.
     *
     * @param { BarMode.Scrollable } value
     * @param { ScrollableBarModeOptions } [options] - options indicate the options for the scrollable bar mode
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the graphic format of the bar chart is selected as scrollable mode.
     *
     * @param { BarMode.Scrollable } value
     * @param { ScrollableBarModeOptions } [options] - options indicate the options for the scrollable bar mode
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barMode(value: BarMode.Scrollable, options: ScrollableBarModeOptions): TabsAttribute;
    /**
     * Called when the graphic format of the bar chart is selected.
     *
     * @param { BarMode } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the graphic format of the bar chart is selected.
     *
     * @param { BarMode } value
     * @param { ScrollableBarModeOptions } [options] - options indicate the options for the scrollable bar mode
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the graphic format of the bar chart is selected.
     *
     * @param { BarMode } value
     * @param { ScrollableBarModeOptions } [options] - options indicate the options for the scrollable bar mode
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barMode(value: BarMode, options?: ScrollableBarModeOptions): TabsAttribute;
    /**
     * Called when the width of the bar graph is set.
     * Notice: barWidth only supports Number type.
     *
     * @param { number } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the width of the bar graph is set.
     * Notice: barWidth only supports Number type on 7, supports Length type since 8.
     *
     * @param { Length } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the width of the bar graph is set.
     * Notice: barWidth only supports Number type on 7, supports Length type since 8.
     *
     * @param { Length } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the width of the bar graph is set.
     * Notice: barWidth only supports Number type on 7, supports Length type since 8.
     *
     * @param { Length } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barWidth(value: Length): TabsAttribute;
    /**
    * Called when the height of the bar graph is set.
    * Notice: barHeight only supports Number type.
    *
    * @param { number } value
    * @returns { TabsAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @since 7
    */
    /**
     * Called when the height of the bar graph is set.
     * Notice: barHeight only supports Number type on 7, supports Length type since 8.
     *
     * @param { Length } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the height of the bar graph is set.
     * Notice: barHeight only supports Number type on 7, supports Length type since 8.
     *
     * @param { Length } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the height of the bar graph is set.
     * Notice: barHeight only supports Number type on 7, supports Length type since 8.
     *
     * @param { Length } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barHeight(value: Length): TabsAttribute;
    /**
     * Called when the animation duration of the bar graph is set.
     *
     * @param { number } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the animation duration of the bar graph is set.
     *
     * @param { number } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the animation duration of the bar graph is set.
     *
     * @param { number } value
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    animationDuration(value: number): TabsAttribute;
    /**
     * Set animation mode.
     *
     * @param { Optional<AnimationMode> } mode - animation mode for tabs switch animation
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    animationMode(mode: Optional<AnimationMode>): TabsAttribute;
    /**
     * Called when the tab is switched.
     *
     * @param { function } event
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the tab is switched.
     *
     * @param { function } event
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the tab is switched.
     *
     * @param { function } event
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onChange(event: (index: number) => void): TabsAttribute;
    /**
     * Called when the tab is clicked.
     *
     * @param { function } event
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the tab is clicked.
     *
     * @param { function } event
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onTabBarClick(event: (index: number) => void): TabsAttribute;
    /**
     * Called when the tab content flip animation start.
     *
     * @param { function } handler -
     * "index": the index value of the tab that when animation start.
     * "targetIndex": the target index value of the tab that when animation start.
     * "event": the animation event callback info.
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the tab content flip animation start.
     *
     * @param { function } handler -
     * "index": the index value of the tab that when animation start.
     * "targetIndex": the target index value of the tab that when animation start.
     * "event": the animation event callback info.
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onAnimationStart(handler: (index: number, targetIndex: number, event: TabsAnimationEvent) => void): TabsAttribute;
    /**
     * Called when the tab content flip animation end.
     *
     * @param { function } handler -
     * "index": the index value of the tab that when animation start.
     * "event": the animation event callback info.
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when the tab content flip animation end.
     *
     * @param { function } handler -
     * "index": the index value of the tab that when animation start.
     * "event": the animation event callback info.
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onAnimationEnd(handler: (index: number, event: TabsAnimationEvent) => void): TabsAttribute;
    /**
     * Called when swiping the tab content with the gesture.
     *
     * @param { function } handler -
     * "index": the index value of the tab that when animation start.
     * "event": the animation event callback info.
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Called when swiping the tab content with the gesture.
     *
     * @param { function } handler -
     * "index": the index value of the tab that when animation start.
     * "event": the animation event callback info.
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onGestureSwipe(handler: (index: number, event: TabsAnimationEvent) => void): TabsAttribute;
    /**
     * Set whether the edges of tab bar are fading.
     *
     * @param { boolean } value - indicates whether the edges of tab bar are fading.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set whether the edges of tab bar are fading.
     *
     * @param { boolean } value - indicates whether the edges of tab bar are fading.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fadingEdge(value: boolean): TabsAttribute;
    /**
     * Set the divider between tab bar and tab content.
     *
     * @param { DividerStyle | null } value - indicates the style of the indicator.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the divider between tab bar and tab content.
     *
     * @param { DividerStyle | null } value - indicates the style of the indicator.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    divider(value: DividerStyle | null): TabsAttribute;
    /**
     * Set whether the tab bar overlaps with the tab content.
     *
     * @param { boolean } value - indicates whether the tab bar overlaps with the tab content.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set whether the tab bar overlaps with the tab content.
     *
     * @param { boolean } value - indicates whether the tab bar overlaps with the tab content.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barOverlap(value: boolean): TabsAttribute;
    /**
     * Set the background color of the tab bar.
     *
     * @param { ResourceColor } value - indicates the background color of the tab bar.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the background color of the tab bar.
     *
     * @param { ResourceColor } value - indicates the background color of the tab bar.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barBackgroundColor(value: ResourceColor): TabsAttribute;
    /**
     * Set the grid alignment options of the tab bar.
     *
     * @param { BarGridColumnOptions } value - indicates the bar grid alignment options.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set the grid alignment options of the tab bar.
     *
     * @param { BarGridColumnOptions } value - indicates the bar grid alignment options.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barGridAlign(value: BarGridColumnOptions): TabsAttribute;
    /**
     * Custom tab content transition animation.
     * When undefined is set, this interface does not take effect.
     *
     * @param { function } delegate - custom content transition animation.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Custom tab content transition animation.
     * When undefined is set, this interface does not take effect.
     *
     * @param { function } delegate - custom content transition animation.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    customContentTransition(delegate: (from: number, to: number) => TabContentAnimatedTransition | undefined): TabsAttribute;
    /**
     * Set the BlurStyle of the tab bar.
     *
     * @param { BlurStyle } value - indicates the  BlurStyle of the tab bar.
     * @returns { TabsAttribute } the attribute of the tabs
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    barBackgroundBlurStyle(value: BlurStyle): TabsAttribute;
    /**
     * Called when content will change.
     *
     * @param { function } handler
     * "currentIndex": the index value of the current tab.
     * "comingIndex": the index value of the tab that will change.
     * Tabs can change from currentIndex to comingIndex if function return true.
     * Tabs can not change from currentIndex to comingIndex if function return false.
     * @returns { TabsAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onContentWillChange(handler: (currentIndex: number, comingIndex: number) => boolean): TabsAttribute;
}
/**
 * Defines the Tab Content animated transition options.
 *
 * @interface TabContentAnimatedTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 * @form
 */
/**
 * Defines the Tab Content animated transition options.
 *
 * @interface TabContentAnimatedTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 * @form
 */
declare interface TabContentAnimatedTransition {
    /**
     * Defines the timeout of custom content transition animation. The unit is ms.
     * If TabContentTransitionProxy.finishTransition() is not invoked, use the timeout as animation end time.
     *
     * @type { ?number }
     * @default 1000 ms
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Defines the timeout of custom content transition animation. The unit is ms.
     * If TabContentTransitionProxy.finishTransition() is not invoked, use the timeout as animation end time.
     *
     * @type { ?number }
     * @default 1000 ms
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    timeout?: number;
    /**
     * Called when custom content transition animation start.
     *
     * @type { function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Called when custom content transition animation start.
     *
     * @type { function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    transition: (proxy: TabContentTransitionProxy) => void;
}
/**
 *  The proxy of TabContentAnimatedTransition.
 *
 * @interface TabContentTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 * @form
 */
/**
 *  The proxy of TabContentAnimatedTransition.
 *
 * @interface TabContentTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 * @form
 */
declare interface TabContentTransitionProxy {
    /**
     * The index of current tab content.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * The index of current tab content.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    from: number;
    /**
     * The index of target tab content.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * The index of target tab content.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    to: number;
    /**
     * Notifies Tabs component the custom content transition animation is complete.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    /**
     * Notifies Tabs component the custom content transition animation is complete.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 112
     * @form
     */
    finishTransition(): void;
}
/**
 * Defines Tabs Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Tabs Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Tabs Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const Tabs: TabsInterface;
/**
 * Defines Tabs Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Tabs Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Tabs Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const TabsInstance: TabsAttribute;
