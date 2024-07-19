/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * @file
 * @kit ArkUI
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type colorSpaceManager from './@ohos.graphics.colorSpaceManager';
import type hdrCapability from './@ohos.graphics.hdrCapability';
/**
 * Interface of display manager.
 *
 * @namespace display
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 * @since 7
 */
/**
 * Interface of display manager.
 *
 * @namespace display
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 * @crossplatform
 * @since 10
 */
/**
 * Interface of display manager.
 *
 * @namespace display
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace display {
    /**
     * Obtain the default display.
     *
     * @param { AsyncCallback<Display> } callback the result of display
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.display#getDefaultDisplaySync
     */
    function getDefaultDisplay(callback: AsyncCallback<Display>): void;
    /**
     * Obtain the default display.
     *
     * @returns { Promise<Display> } the result of display
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.display#getDefaultDisplaySync
     */
    function getDefaultDisplay(): Promise<Display>;
    /**
     * Obtain the default display.
     *
     * @returns { Display } the result of display
     * @throws { BusinessError } 1400001 - Invalid display or screen.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    /**
     * Obtain the default display.
     *
     * @returns { Display } the result of display
     * @throws { BusinessError } 1400001 - Invalid display or screen.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtain the default display.
     *
     * @returns { Display } the result of display
     * @throws { BusinessError } 1400001 - Invalid display or screen.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function getDefaultDisplaySync(): Display;
    /**
     * Obtain all displays.
     *
     * @param { AsyncCallback<Array<Display>> } callback the result of all displays
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.display#getAllDisplays
     */
    function getAllDisplay(callback: AsyncCallback<Array<Display>>): void;
    /**
     * Obtain all displays.
     *
     * @returns { Promise<Array<Display>> } the result of all displays
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.display#getAllDisplays
     */
    function getAllDisplay(): Promise<Array<Display>>;
    /**
     * Obtain all displays.
     *
     * @param { AsyncCallback<Array<Display>> } callback the result of all displays
     * @throws { BusinessError } 1400001 - Invalid display or screen.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    function getAllDisplays(callback: AsyncCallback<Array<Display>>): void;
    /**
     * Obtain all displays.
     *
     * @returns { Promise<Array<Display>> } the result of all displays
     * @throws { BusinessError } 1400001 - Invalid display or screen.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    function getAllDisplays(): Promise<Array<Display>>;
    /**
     * Register the callback for display changes.
     *
     * @param { 'add' | 'remove' | 'change' } type the event of display change
     * @param { Callback<number> } callback the display id of changed
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     */
    /**
     * Register the callback for display changes.
     *
     * @param { 'add' | 'remove' | 'change' } type the event of display change
     * @param { Callback<number> } callback the display id of changed
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @atomicservice
     * @since 12
     */
    function on(type: 'add' | 'remove' | 'change', callback: Callback<number>): void;
    /**
     * Unregister the callback for display changes.
     *
     * @param { 'add' | 'remove' | 'change' } type the event of display change event
     * @param { Callback<number> } callback the display id of changed
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     */
    /**
     * Unregister the callback for display changes.
     *
     * @param { 'add' | 'remove' | 'change' } type the event of display change event
     * @param { Callback<number> } callback the display id of changed
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @atomicservice
     * @since 12
     */
    function off(type: 'add' | 'remove' | 'change', callback?: Callback<number>): void;
    /**
     * Check whether the device is foldable.
     *
     * @returns { boolean } true means the device is foldable.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    function isFoldable(): boolean;
    /**
     * Get the current fold status of the foldable device.
     *
     * @returns { FoldStatus } fold status of device.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    function getFoldStatus(): FoldStatus;
    /**
     * Register the callback for fold status changes.
     *
     * @param { 'foldStatusChange' } type the event of fold status changes
     * @param { Callback<FoldStatus> } callback Callback used to return the current fold status of device
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    /**
     * Register the callback for fold status changes.
     *
     * @param { 'foldStatusChange' } type the event of fold status changes
     * @param { Callback<FoldStatus> } callback Callback used to return the current fold status of device
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function on(type: 'foldStatusChange', callback: Callback<FoldStatus>): void;
    /**
     * Unregister the callback for fold status changes.
     *
     * @param { 'foldStatusChange' } type the event of fold status changes
     * @param { Callback<FoldStatus> } callback Callback used to return the current fold status of device
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    /**
     * Unregister the callback for fold status changes.
     *
     * @param { 'foldStatusChange' } type the event of fold status changes
     * @param { Callback<FoldStatus> } callback Callback used to return the current fold status of device
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function off(type: 'foldStatusChange', callback?: Callback<FoldStatus>): void;
    /**
     * Register the callback for fold angle changes.
     *
     * @param { 'foldAngleChange' } type the event of fold angle changes.
     * @param { Callback<Array<number>> } callback Callback used to return the current fold angle of device.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function on(type: 'foldAngleChange', callback: Callback<Array<number>>): void;
    /**
     * Unregister the callback for fold angle changes.
     *
     * @param { 'foldAngleChange' } type the event of fold angle changes.
     * @param { Callback<Array<number>> } callback Callback used to return the current fold angle of device.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function off(type: 'foldAngleChange', callback?: Callback<Array<number>>): void;
    /**
     * Register the callback for device capture status changes.
     *
     * @param { 'captureStatusChange' } type the event of capture status changes.
     * @param { Callback<boolean> } callback Callback used to return the device capture status.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function on(type: 'captureStatusChange', callback: Callback<boolean>): void;
    /**
     * Unregister the callback for device capture status changes.
     *
     * @param { 'captureStatusChange' } type the event of capture status changes.
     * @param { Callback<boolean> } callback Callback used to return the device capture status.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function off(type: 'captureStatusChange', callback?: Callback<boolean>): void;
    /**
     * Check whether the device is captured.
     *
     * @returns { boolean } true means the device is captured.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 12
     */
    function isCaptured(): boolean;
    /**
     * Get the display mode of the foldable device.
     *
     * @returns { FoldDisplayMode } display mode of the foldable device.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    function getFoldDisplayMode(): FoldDisplayMode;
    /**
     * Register the callback for fold display mode changes.
     *
     * @param { 'foldDisplayModeChange' } type the event of fold display mode changes
     * @param { Callback<FoldDisplayMode> } callback Callback used to return the current fold display mode
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    /**
     * Register the callback for fold display mode changes.
     *
     * @param { 'foldDisplayModeChange' } type the event of fold display mode changes
     * @param { Callback<FoldDisplayMode> } callback Callback used to return the current fold display mode
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function on(type: 'foldDisplayModeChange', callback: Callback<FoldDisplayMode>): void;
    /**
     * Unregister the callback for fold display mode changes.
     *
     * @param { 'foldDisplayModeChange' } type the event of fold display mode changes
     * @param { Callback<FoldDisplayMode> } callback Callback used to return the current fold display mode
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    /**
     * Unregister the callback for fold display mode changes.
     *
     * @param { 'foldDisplayModeChange' } type the event of fold display mode changes
     * @param { Callback<FoldDisplayMode> } callback Callback used to return the current fold display mode
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    function off(type: 'foldDisplayModeChange', callback?: Callback<FoldDisplayMode>): void;
    /**
     * Get the fold crease region in the current display mode.
     *
     * @returns { FoldCreaseRegion } fold crease region in the current display mode.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    function getCurrentFoldCreaseRegion(): FoldCreaseRegion;
    /**
     * Enumerates the fold status.
     *
     * @enum { number }
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    /**
     * Enumerates the fold status.
     *
     * @enum { number }
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum FoldStatus {
        /**
         * Fold Status Unknown.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Fold Status Unknown.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_STATUS_UNKNOWN = 0,
        /**
         * Fold Status Expanded.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Fold Status Expanded.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_STATUS_EXPANDED,
        /**
         * Fold Status Folded.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Fold Status Folded.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_STATUS_FOLDED,
        /**
         * Fold Status Half Folded.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Fold Status Half Folded.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_STATUS_HALF_FOLDED
    }
    /**
     * Enumerates the fold display mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    /**
     * Enumerates the fold display mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Window.SessionManager
     * @atomicservice
     * @since 12
     */
    enum FoldDisplayMode {
        /**
         * Unknown Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Unknown Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_DISPLAY_MODE_UNKNOWN = 0,
        /**
         * Full Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Full Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_DISPLAY_MODE_FULL,
        /**
         * Main Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Main Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_DISPLAY_MODE_MAIN,
        /**
         * Sub Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Sub Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_DISPLAY_MODE_SUB,
        /**
         * Coordination Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        /**
         * Coordination Display.
         *
         * @syscap SystemCapability.Window.SessionManager
         * @atomicservice
         * @since 12
         */
        FOLD_DISPLAY_MODE_COORDINATION
    }
    /**
     * Enumerates the display states.
     *
     * @enum { number }
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     */
    enum DisplayState {
        /**
         * Unknown.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        STATE_UNKNOWN = 0,
        /**
         * Screen off.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        STATE_OFF,
        /**
         * Screen on.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        STATE_ON,
        /**
         * Doze, but it will update for some important system messages.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        STATE_DOZE,
        /**
         * Doze and not update.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        STATE_DOZE_SUSPEND,
        /**
         * VR node.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        STATE_VR,
        /**
         * Screen on and not update.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        STATE_ON_SUSPEND
    }
    /**
     * Enumerates the display orientation.
     *
     * @enum { number }
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @crossplatform
     * @since 10
     */
    enum Orientation {
        /**
         * Indicate that the display content is in portrait mode.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        PORTRAIT = 0,
        /**
         * Indicate that the display content is in landscape mode.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        LANDSCAPE = 1,
        /**
         * Indicate that the display content is in the opposite direction of the portrait mode.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        PORTRAIT_INVERTED = 2,
        /**
         * Indicate that the display content is in the opposite direction of the landscape mode.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        LANDSCAPE_INVERTED = 3
    }
    /**
     * Fold Crease Region
     *
     * @interface FoldCreaseRegion
     * @syscap SystemCapability.Window.SessionManager
     * @since 10
     */
    interface FoldCreaseRegion {
        /**
         * The display ID is used to identify the screen where the crease is located.
         *
         * @readonly
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        readonly displayId: number;
        /**
         * Crease Region.
         *
         * @readonly
         * @syscap SystemCapability.Window.SessionManager
         * @since 10
         */
        readonly creaseRects: Array<Rect>;
    }
    /**
     * Rectangle
     *
     * @interface Rect
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    interface Rect {
        /**
         * The X-axis coordinate of the upper left vertex of the rectangle, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        left: number;
        /**
         * The Y-axis coordinate of the upper left vertex of the rectangle, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        top: number;
        /**
         * Width of the rectangle, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        width: number;
        /**
         * Height of the rectangle, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        height: number;
    }
    /**
     * Curved area rects of the waterfall display.
     *
     * @interface WaterfallDisplayAreaRects
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    interface WaterfallDisplayAreaRects {
        /**
         * Indicates the size of left side curved area of the waterfall screen.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        readonly left: Rect;
        /**
         * Indicates the size of right side curved area of the waterfall screen.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        readonly right: Rect;
        /**
         * Indicates the size of top side curved area of the waterfall screen.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        readonly top: Rect;
        /**
         * Indicates the size of bottom side curved area of the waterfall screen.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        readonly bottom: Rect;
    }
    /**
     * Cutout information of the display.
     *
     * @interface CutoutInfo
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    interface CutoutInfo {
        /**
         * Bounding rectangles of the cutout areas of the display.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        readonly boundingRects: Array<Rect>;
        /**
         * Rectangles of curved parts on each side of a waterfall display.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        readonly waterfallDisplayAreaRects: WaterfallDisplayAreaRects;
    }
    /**
     * Define properties of the display. They cannot be updated automatically.
     *
     * @interface Display
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     */
    /**
     * Define properties of the display. They cannot be updated automatically.
     *
     * @interface Display
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Define properties of the display. They cannot be updated automatically.
     *
     * @interface Display
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface Display {
        /**
         * Display ID.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        /**
         * Display ID.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        id: number;
        /**
         * Display name.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        name: string;
        /**
         * The display is alive.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        alive: boolean;
        /**
         * The state of display.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        state: DisplayState;
        /**
         * Refresh rate, in Hz.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        refreshRate: number;
        /**
         * Rotation degrees of the display.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        /**
         * Rotation degrees of the display.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @atomicservice
         * @since 11
         */
        rotation: number;
        /**
         * Display width, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        /**
         * Display width, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Display width, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        width: number;
        /**
         * Display height, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        /**
         * Display height, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Display height, in pixels.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        height: number;
        /**
         * Display resolution.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        /**
         * Display resolution.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 11
         */
        densityDPI: number;
        /**
         * Display orientation.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 10
         */
        orientation: Orientation;
        /**
         * Display density, in pixels. The value for a low-resolution display is 1.0.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        /**
         * Display density, in pixels. The value for a low-resolution display is 1.0.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        densityPixels: number;
        /**
         * Text scale density of the display.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        /**
         * Text scale density of the display.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @crossplatform
         * @since 11
         */
        scaledDensity: number;
        /**
         * DPI on the x-axis.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        xDPI: number;
        /**
         * DPI on the y-axis.
         *
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 7
         */
        yDPI: number;
        /**
         * All supported color spaces.
         *
         * @type { Array<colorSpaceManager.ColorSpace> }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 11
         */
        colorSpaces: Array<colorSpaceManager.ColorSpace>;
        /**
         * All supported HDR formats.
         *
         * @type { Array<hdrCapability.HDRFormat> }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 11
         */
        hdrFormats: Array<hdrCapability.HDRFormat>;
        /**
         * Obtain the cutout info of the display.
         *
         * @param { AsyncCallback<CutoutInfo> } callback
         * @throws { BusinessError } 1400001 - Invalid display or screen.
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        getCutoutInfo(callback: AsyncCallback<CutoutInfo>): void;
        /**
         * Obtain the cutout info of the display.
         *
         * @returns { Promise<CutoutInfo> }
         * @throws { BusinessError } 1400001 - Invalid display or screen.
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @since 9
         */
        getCutoutInfo(): Promise<CutoutInfo>;
    }
}
export default display;
