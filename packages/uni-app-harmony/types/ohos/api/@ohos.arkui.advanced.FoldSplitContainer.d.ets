/*
* Copyright (C) 2024 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file Defines FoldSplitContainer component.
 * @kit ArkUI
 */
import display from '@ohos.display';
import window from '@ohos.window';
import { Callback } from '@ohos.base';
/**
 * Position enum of the extra region
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export declare enum ExtraRegionPosition {
    /**
     * The extra region position is in the top.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    TOP = 1,
    /**
     * The extra region position is in the bottom.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    BOTTOM = 2
}
/**
 * The layout options for the container when the foldable screen is expanded.
 *
 * @interface ExpandedRegionLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export interface ExpandedRegionLayoutOptions {
    /**
     * The ratio of the widths of two areas in the horizontal direction.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    horizontalSplitRatio?: number;
    /**
     * The ratio of the heights of two areas in the vertical direction.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    verticalSplitRatio?: number;
    /**
     * Does the extended area span from top to bottom within the container?
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    isExtraRegionPerpendicular?: boolean;
    /**
     * Specify the position of the extra area when the extra area does not vertically span the container.
     *
     * @type { ?ExtraRegionPosition }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    extraRegionPosition?: ExtraRegionPosition;
}
/**
 * The layout options for the container when the foldable screen is in hover mode.
 *
 * @interface SemiFoldedRegionLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export interface HoverModeRegionLayoutOptions {
    /**
     * The ratio of the widths of two areas in the horizontal direction.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    horizontalSplitRatio?: number;
    /**
     * Does the foldable screen display an extra area when it's in the half-folded state?
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    showExtraRegion?: boolean;
    /**
     * Specify the position of the extra area when the foldable screen is in the half-folded state.
     *
     * @type { ?ExtraRegionPosition }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    extraRegionPosition?: ExtraRegionPosition;
}
/**
 * The layout options for the container when the foldable screen is folded.
 *
 * @interface FoldedRegionLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export interface FoldedRegionLayoutOptions {
    /**
     * The ratio of the heights of two areas in the vertical direction.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    verticalSplitRatio?: number;
}
/**
 * Preset split ratio.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export declare enum PresetSplitRatio {
    /**
     * 1:1
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    LAYOUT_1V1 = 1,
    /**
     * 2:3
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    LAYOUT_2V3 = 0.6666666666666666,
    /**
     * 3:2
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    LAYOUT_3V2 = 1.5
}
/**
 * The status of hover mode.
 *
 * @interface HoverStatus
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export interface HoverModeStatus {
    /**
     * The fold status of devices.
     *
     * @type { display.FoldStatus }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    foldStatus: display.FoldStatus;
    /**
     * Is the app currently in hover mode?
     * In hover mode, the upper half of the screen is used for display, and the lower half is used for operation.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    isHoverMode: boolean;
    /**
     * The angle of rotation applied.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    appRotation: number;
    /**
     * The status of window.
     *
     * @type { window.WindowStatusType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    windowStatusType: window.WindowStatusType;
}
/**
 * The handler of onHoverStatusChange event
 *
 * @typedef { function } OnHoverStatusChangeHandler
 * @param { HoverModeStatus } status - The status of hover mode
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export type OnHoverStatusChangeHandler = (status: HoverModeStatus) => void;
/**
 * Defines FoldSplitContainer container.
 *
 * @interface FoldSplitContainer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
@Component
export declare struct FoldSplitContainer {
    /**
     * The builder function which will be rendered in the major region of container.
     *
     * @type { Callback<void> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    @BuilderParam
    primary: Callback<void>;
    /**
     * The builder function which will be rendered in the minor region of container.
     *
     * @type { Callback<void> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    @BuilderParam
    secondary: Callback<void>;
    /**
     * The builder function which will be rendered in the extra region of container.
     *
     * @type { ?Callback<void> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    @BuilderParam
    extra?: Callback<void>;
    /**
     * The layout options for the container when the foldable screen is expanded.
     *
     * @type { ExpandedRegionLayoutOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    @Prop
    expandedLayoutOptions: ExpandedRegionLayoutOptions;
    /**
     * The layout options for the container when the foldable screen is in hover mode.
     *
     * @type { HoverModeRegionLayoutOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    @Prop
    hoverModeLayoutOptions: HoverModeRegionLayoutOptions;
    /**
     * The layout options for the container when the foldable screen is folded.
     *
     * @type { FoldedRegionLayoutOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    @Prop
    foldedLayoutOptions: FoldedRegionLayoutOptions;
    /**
     * The animation options of layout
     *
     * @type { ?(AnimateParam | null) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    @Prop
    animationOptions?: AnimateParam | null;
    /**
     * The callback function that is triggered when the foldable screen enters or exits hover mode.
     * In hover mode, the upper half of the screen is used for display, and the lower half is used for operation.
     *
     * @type { ?OnHoverStatusChangeHandler }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    onHoverStatusChange?: OnHoverStatusChangeHandler;
}
